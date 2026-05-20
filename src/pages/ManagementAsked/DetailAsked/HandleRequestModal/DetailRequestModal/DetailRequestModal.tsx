import React, { Fragment, useState, useEffect, useMemo, useRef, useContext } from "react";
import { IActionModal } from "model/OtherModel";
import Icon from "components/icon";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import { isDifferenceObj, convertToId, convertToFileName, trimContent } from "reborn-util";
import "./DetailRequestModal.scss";
import BusinessProcessService from "services/BusinessProcessService";
import { handDownloadFileOrigin, showToast } from "utils/common";
import Button from "components/button/button";
import { useNavigate } from "react-router-dom";
import { ContextType, UserContext } from "contexts/userContext";
import TextArea from "components/textarea/textarea";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function DetailRequestModal({ onShow, onHide, data }) {
  console.log('data222', data);
  
    
    const navigation = useNavigate();
    const { dataBranch } = useContext(UserContext) as ContextType;
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
    const [isLoading, setIsLoading] = useState(true);    
    const [content, setContent] = useState("");
    const [listAttactment, setListAttactment] = useState([]);

    useEffect(() => {
        if(onShow && data){
          setContent(data?.content);

          const attachmentsData = data?.attachments ? JSON.parse(data.attachments) : [];
          setListAttactment(
            attachmentsData.map(item => {
              return {
                type: item.extension,
                fileUrl: item.fileUrl,
                fileName: item.fileName,
                fileSize: item.fileSize
              }
            })
          )
        }
    }, [onShow, data,])

  const onSubmit = async (config) => {
  
      setIsSubmit(true);
      const body = {
        //   nodeId: contextData?.nodeId,
        //   processId: contextData?.processId,
        //   processCode: 'YCMS',
        //   potId: contextData?.potId,
        //   config: JSON.stringify(config),
        //   // workId: dataWork.id
        //   serviceNodeId: onSchedule == 1 ? 'Activity_099ol6y' : 'Activity_1en9gf7'
      }

      console.log('body', body);

      const response = await BusinessProcessService.purchaseRequestApprove(body);

      if (response.code === 0) {
          showToast(`Tạo yêu cầu thành công`, "success");
          handleClear(true); 

      } else {
          showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      }
      setIsSubmit(false);
  }

  const actions = useMemo<IActionModal>(
    () => ({
      actions_right: {
        buttons: [
            {
                title: "Gửi phân công làm rõ yêu cầu",
                type: "submit",
                color: "primary",
                disabled: isSubmit, 
                // || !isDifferenceObj(formData, values),
                is_loading: isSubmit,
            },
            
        ],
      },
    }),
    [
        isSubmit,
        data,
    ]
  );

  const showDialogConfirmCancel = () => {
    const contentDialog: IContentDialog = {
      color: "warning",
      className: "dialog-cancel",
      isCentered: true,
      isLoading: false,
      title: <Fragment>{`Hủy bỏ thao tác`}</Fragment>,
      message: <Fragment>Bạn có chắc chắn muốn hủy bỏ? Thao tác này không thể khôi phục.</Fragment>,
      cancelText: "Quay lại",
      cancelAction: () => {
        setShowDialog(false);
        setContentDialog(null);
      },
      defaultText: "Xác nhận",
      defaultAction: () => {
        handleClear(false);
        setShowDialog(false);
        setContentDialog(null);
      },
    };
    setContentDialog(contentDialog);
    setShowDialog(true);
  };

  const handleClear = (acc) => {
    onHide(acc);
    setContent("");
    setListAttactment([]);
  }

  const [downloadAll, setDownloadAll] = useState(false);
  // Hàm để tải và nén các file
  const downloadAndZipFiles = async (listFile) => {
    const zip = new JSZip();
    const folder = zip.folder("files");

    // Tải từng file và thêm vào file nén
    for (const url of listFile) {
      const response = await fetch(url.fileUrl);
      const blob = await response.blob();
      const fileName = url.fileName;
      folder.file(fileName, blob);
    }

    // Tạo file nén và tải xuống
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "files.zip");
    });
    setDownloadAll(false);
  };

  const handleDownloadAll = () => {
    setDownloadAll(true);
    downloadAndZipFiles(listAttactment);
  };


  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        size="md"
        toggle={() => !isSubmit && handleClear(false)}
        className="modal-detail-request"
      >
        <form className="form-detail-request" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader title={`Chi tiết yêu cầu`} toggle={() => !isSubmit && handleClear(false)} />
          <ModalBody>
            <div className='container_detail_request-modal'>
              <div className="body-request">
                <div className="box-title">
                    <span style={{fontSize: 16, fontWeight: '500'}}>Yêu cầu làm rõ</span>
                </div>

                <div className="content-request">
                    <div style={{width: '100%'}}>
                        <TextArea
                            label="Nội dung yêu cầu làm rõ"
                            value={content}
                            placeholder="Yêu cầu làm rõ"
                            fill={true}
                            required={false}
                            disabled={true}
                            // onClick={(e) => handleChangeContent(e)}
                            // onChange={(e) => handleChangeContent(e)}
                            // maxLength={459}
                        />
                    </div>

                    {listAttactment && listAttactment.length > 0 ? 
                      <div className="attachment-list">
                          <div style={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
                              <span style={{fontSize: 12, fontWeight: '500'}}>Tệp đính kèm</span>
                              <div
                                  className="button-download-all"
                                  onClick={() => {
                                      handleDownloadAll();
                                  }}
                                  >
                                  <Icon name="DownLoadNew" />
                                  Tải xuống tất cả
                              </div>
                          </div>

                          {listAttactment && listAttactment.length > 0 ? 
                              listAttactment.map((item, index) => (
                                  <div key={index} 
                                  className="item-attachment"
                                  onDoubleClick={() => {
                                      window.open(`${process.env.APP_LINK}/app/view_document?name=${item.fileName}&url=${item.fileUrl}`, "_blank", "noopener,noreferrer");
                                  }}
                                  >
                                      {item?.type == "image" ? (
                                          <img src={item?.fileUrl} width={36} height={36}/>
                                      ) : (
                                          <Icon name="FileXls" />
                                      )}
                                      {/* <Icon name='FileXls'/> */}
                                      <div className="data-file">
                                          <span style={{fontSize: 14, fontWeight: '500'}}>{item?.fileName ? trimContent(item?.fileName, 50, true, true) : ``}{item?.fileName?.length > 50 ? `.${item?.type}` : ''}</span>
                                          <div>
                                              <span style={{fontSize: 12, fontWeight: '400', color: '#999999'}}>{item?.fileSize ? item?.fileSize : ``}</span>
                                          </div>
                                      </div>
                                      <div 
                                          style={{ cursor: 'pointer'}}
                                          onClick={() => {
                                              handDownloadFileOrigin(item.fileUrl, item.fileName);
                                          }}
                                      >
                                          <Icon name='DownLoadNew' style={{width: '2rem', height: '2rem'}}/>
                                      </div>
                                  </div>
                              ))
                              : null
                          }
                      </div>
                    : null}
                </div>
              </div>
            </div>
          </ModalBody>
          {/* <ModalFooter actions={actions} /> */}
        </form>
      </Modal>
      <Dialog content={contentDialog} isOpen={showDialog} />
      
    </Fragment>
  );
}

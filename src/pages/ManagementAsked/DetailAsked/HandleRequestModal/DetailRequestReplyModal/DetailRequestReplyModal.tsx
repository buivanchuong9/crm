import React, { Fragment, useState, useEffect, useMemo, useRef, useContext } from "react";
import { IActionModal } from "model/OtherModel";
import Icon from "components/icon";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import { isDifferenceObj, convertToId, convertToFileName, trimContent } from "reborn-util";
import "./DetailRequestReplyModal.scss";
import BusinessProcessService from "services/BusinessProcessService";
import { formatFileSize, handDownloadFileOrigin, showToast } from "utils/common";
import Button from "components/button/button";
import { useNavigate } from "react-router-dom";
import { IEmployeeFilterRequest } from "model/employee/EmployeeRequestModel";
import { ContextType, UserContext } from "contexts/userContext";
import EmployeeService from "services/EmployeeService";
import { IEmployeeResponse } from "model/employee/EmployeeResponseModel";
import SelectCustom from "components/selectCustom/selectCustom";
import TextArea from "components/textarea/textarea";
import { uploadDocumentFormData } from "utils/document";
import FileService from "services/FileService";
import ManagementAskedService from "services/ManagementAskedService";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import moment from "moment";

export default function DetailRequestReplyModal({ onShow, onHide, data, dataAsked }) {
    
    const navigation = useNavigate();
    const { dataBranch } = useContext(UserContext) as ContextType;
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
    const [isLoading, setIsLoading] = useState(true);    
    const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);
    const [showProgress, setShowProgress] = useState<number>(0);
    const [content, setContent] = useState('');
    const [listAttactment, setListAttactment] = useState([]);
    console.log('listAttactment', listAttactment);

    //nội dùng câu hỏi cần làm rõ
    const [listAttactmentRequest, setListAttactmentRequest] = useState([]);
    const [contentRequest, setContentRequest] = useState('');

    useEffect(() => {
        if(onShow && data){
            setContentRequest(data?.content);

          const attachmentsData = data?.attachments ? JSON.parse(data.attachments) : [];
          setListAttactmentRequest(
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


    const getAnswerSave = async (detailId) => {
        
        const response = await ManagementAskedService.getDetailReply(detailId);
        if (response.code === 0) {
            const result = response.result;
            setContent(result.content || "");

            const attachmentsData = result?.attachments ? JSON.parse(result.attachments) : [];
            if(attachmentsData && attachmentsData.length > 0){
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
        } else {
          showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
        }
    };


    useEffect(() => {
        if(onShow && data){
            getAnswerSave(data?.id);
        }
    }, [onShow, data])

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    const body = {
      attachments: JSON.stringify(listAttactment) || '[]',
      content: content,
      detailId: data?.id,
      status: 0
    }

    console.log('body', body);

    const response = await ManagementAskedService.saveReply(body);

    if (response.code === 0) {
        showToast(`Lưu thông tin trả lời thành công`, "success");
        handleUpdateStatusResponse(data?.id);
    } else {
        showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }

    setIsSubmit(false);
  }

    //Update trạng thái của yêu cầu làm rõ
    const handleUpdateStatusResponse = async (detailId) => {
      const body = {
        id: detailId,
        status: 2,
      };
  
      const response = await ManagementAskedService.updateStatusClarification(body);    
      if (response.code === 0) {
        handleClear(true); 
      } else {
        showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      }
    };

  const actions = useMemo<IActionModal>(
    () => ({
      actions_right: {
        buttons: [
          ...(dataAsked?.status === 3 ? [] : [
            {
              title: "Lưu",
              type: "submit",
              color: "primary",
              disabled: isSubmit, 
              // || !isDifferenceObj(formData, values),
              is_loading: isSubmit,
              // callback: () => {}
            },
          ] as any),
        ],
      },
    }),
    [
        isSubmit,
        data,
        dataAsked
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
    setListAttactment([]);
    setListAttactmentRequest([]);
    setContent('');
  }

  //! đoạn này xử lý hình ảnh
  const handleUploadDocument = (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    const checkFile = file.type;
    setIsLoadingFile(true);
    if (checkFile.startsWith("image")) {
      handUploadFile(file);
    }

    if (checkFile.startsWith("application")) {
      uploadDocumentFormData(file, onSuccess, onError, onProgress);
    }
  };

  //* Xử lý tài liệu
  const onSuccess = (data) => {
    if (data) {
      const result = {
        fileUrl: data.fileUrl,
        type: data.extension,
        fileName: data.fileName,
        fileSize: data.fileSize
      };

      setListAttactment([result,...listAttactment]);
      setIsLoadingFile(false);
    }
  };

  const onError = (message) => {
    setIsLoadingFile(false);
    showToast(message.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau !", "error");
  };

  const onProgress = (percent) => {
    if (percent) {
      setShowProgress(percent.toFixed(0));
    }
  };

  useEffect(() => {
    if (isLoadingFile === false) {
      setShowProgress(0);
    }
  }, [isLoadingFile]);

  const [dragging, setDragging] = useState<boolean>(false);

  function handleDragStart(e) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);

    const newFiles = [...listAttactment];
    const droppedFiles: any = Array.from(e.dataTransfer.files);
    console.log('droppedFiles', droppedFiles);
    
    droppedFiles.forEach((file) => {
      // const checkFile = file?.name.split("?")[0].split("#")[0].split(".").pop();      
      // if (checkFile !== "xlsx") {
      //   showToast("File không đúng định dạng. Vui lòng kiểm tra lại !", "warning");
      //   return;
      // }

      const checkFile = file.type;

      if (!newFiles.find((f) => f.fileName === file.name)) {
        setIsLoadingFile(true);
        if (checkFile.startsWith("image")) {
          handUploadFile(file);
        }
    
        if (checkFile.startsWith("application")) {
          uploadDocumentFormData(file, onSuccess, onError, onProgress);
        }
      }
    });

    setListAttactment(newFiles);
  }

  const handUploadFile = async (file) => {
    await FileService.uploadFile({ data: file, onSuccess: processUploadSuccess, onError: uploadError, onProgress });
  };

  const processUploadSuccess = (data) => {
    const result = data?.fileUrl;
    const changeResult = {
      fileUrl: result,
      type: "image",
      fileName: data.fileName,
      fileSize: data?.fileSize
    };
    setListAttactment([changeResult,...listAttactment]);
    setIsLoadingFile(false);
  };

  const uploadError = (message) => {
    setIsLoadingFile(false);
    showToast(message.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau !", "error");
  };

  const handleRemoveImageItem = (idx) => {
    const result = [...listAttactment];
    result.splice(idx, 1);
    setListAttactment(result);
  };

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

  const handleDownloadAll = (listAttactment) => {
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
        size="xxl"
        toggle={() => !isSubmit && handleClear(false)}
        className="modal-detail-reply-request"
      >
        <form className="form-detail-reply-request" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader title={`Chi tiết yêu cầu`} toggle={() => !isSubmit && handleClear(false)} />
          <ModalBody>
            <div className='container_reply_request-modal'>

                <div className="container-request">
                    <div className="content-request">
                        <div style={{marginBottom: '1.6rem'}}>
                            <span style={{fontSize: 16, fontWeight: '500'}}>Yêu cầu làm rõ</span>
                        </div>
                        <div style={{width: '100%'}}>
                            <TextArea
                                label="Nội dung yêu cầu làm rõ"
                                value={contentRequest}
                                placeholder="Yêu cầu làm rõ"
                                fill={true}
                                required={false}
                                disabled={true}
                                // onClick={(e) => handleChangeContent(e)}
                                // onChange={(e) => handleChangeContent(e)}
                                // maxLength={459}
                            />
                        </div>

                        {listAttactmentRequest && listAttactmentRequest.length > 0 ? 
                            <div className="attachment-list">
                                <div style={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
                                    <span style={{fontSize: 12, fontWeight: '500'}}>Tệp đính kèm</span>
                                    <div
                                        className="button-download-all"
                                        onClick={() => {
                                            handleDownloadAll(listAttactmentRequest);
                                        }}
                                    >
                                        <Icon name="DownLoadNew" />
                                        Tải xuống tất cả
                                    </div>
                                </div>

                                {listAttactmentRequest && listAttactmentRequest.length > 0 ? 
                                    listAttactmentRequest.map((item, index) => (
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
                                                    <span style={{fontSize: 12, fontWeight: '400', color: '#999999'}}>{item?.fileSize ? formatFileSize(item?.fileSize) : ``}</span>
                                                </div>
                                            </div>
                                            <div 
                                                style={{ cursor: 'pointer'}}
                                                onClick={() => {
                                                    // handleRemoveImageItem(index);
                                                }}
                                            >
                                                <Icon name='DownLoadNew' style={{width: '2rem', height: '2rem'}}/>
                                            </div>
                                        </div>
                                    ))
                                    : null
                                }
                            </div>
                        : null }
                    </div>

                    <div className="line-column">
                        <div className="line"/>
                    </div>

                    <div className="content-reply">
                        <div style={{marginBottom: '1.6rem'}}>
                            <span style={{fontSize: 16, fontWeight: '500'}}>Trả lời yêu cầu làm rõ</span>
                        </div>
                        <div style={{width: '100%'}}>
                            <TextArea
                                name="note"
                                value={content}
                                label="Trả lời yêu cầu làm rõ"
                                fill={true}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setContent(value);
                                }}
                                placeholder="Nhập trả lời"
                                disabled={dataAsked?.status === 3 ? true : false}
                            />
                        </div>

                        <div className="attachments">
                            <label className="title-attachment">Tệp đính kèm</label>
                            {dataAsked?.status === 3 ? null :
                              <div 
                                  className={"wrapper-list-image"}
                                  draggable="true"
                                  onDragEnter={handleDragEnter}
                                  onDragOver={handleDragOver}
                                  onDragLeave={handleDragLeave}
                                  onDrop={handleDrop}
                                  onDragStart={handleDragStart}
                              >
                              {/* <div className={listAttactment.length >= 5 ? "list-image-scroll" : "wrapper-list-image"}> */}
                                  <div style={{ width: '100%', display:'flex', justifyContent:'center'}}>
                                      <label htmlFor="imageUpload" className="action-upload-image">
                                          <div className={`wrapper-upload`}>
                                              <div>
                                                  <Icon name="UploadRox" />
                                              </div>
                                              <div>
                                                  Nhấn hoặc thả vào để tải lên
                                              </div>
                                          </div>
                                      </label>
                                  </div>
                              </div>
                            }

                            {listAttactment && listAttactment.length > 0 ? 
                                <div style={{marginTop: '1rem'}}>
                                    <span style={{fontSize: 12, fontWeight: '500', color: '#939394'}}>Đã tải lên</span>
                                </div>
                            : null}

                            <div className="list-attachment">
                                {isLoadingFile ? 
                                    <div className="item-attachment">
                                        <Icon name='FileXls'/>
                                        <div className="data-file">
                                            <span style={{fontSize: 14, fontWeight: '500'}}>Đang tải...</span>
                                            <div className="container-loading">
                                                <div className="item-loading" style={{width: `${showProgress}%`}}/>
                                            </div>
                                        </div>
                                    </div>
                                : null}
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
                                                style={{marginTop: '-1rem', cursor: 'pointer'}}
                                                onClick={() => {
                                                    handleRemoveImageItem(index);
                                                }}
                                            >
                                                <Icon name='Times' style={{width: '2rem', height: '2rem'}}/>
                                            </div>
                                        </div>
                                    ))
                                    : null
                                }
                                
                            </div>
                            <input
                                type="file"
                                accept="image/*,.xlsx,.xls,.doc,.docx,.ppt,.pptx,.txt,.pdf"
                                className="d-none"
                                id="imageUpload"
                                onChange={(e) => handleUploadDocument(e)}
                            />
                        </div>
                    </div>
                </div>

            </div>
          </ModalBody>
          <ModalFooter actions={actions} />
        </form>
      </Modal>

      <Dialog content={contentDialog} isOpen={showDialog} />
      
    </Fragment>
  );
}

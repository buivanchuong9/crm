import React, { Fragment, useState, useEffect, useMemo, useRef, useContext } from "react";
import { IActionModal } from "model/OtherModel";
import Icon from "components/icon";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import "./ModalHistoryClarification.scss";
import BusinessProcessService from "services/BusinessProcessService";
import { formatFileSize, handDownloadFileOrigin, showToast } from "utils/common";
import { useNavigate } from "react-router-dom";
import TextArea from "components/textarea/textarea";
import AttachmentComponent from "components/AttachmentComponent/AttachmentComponent";
import TenderPackageService from "services/TenderPackageService";
import moment from "moment";
import Loading from "components/loading";

export default function ModalHistoryClarification({ onShow, onHide, data }) {  
    
    const navigation = useNavigate();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
    const [isLoading, setIsLoading] = useState(true);    
    const [content, setContent] = useState("");
    const [listAttactment, setListAttactment] = useState([]);

    const [listHistory, setListHistory] = useState([]);
    console.log('listHistory', listHistory);
    
    const getListHistory = async (id) => {
      setIsLoading(true);
      const params = {
        packageId: id
      }
      const response = await TenderPackageService.listGeneralClarification(params);
      if (response.code === 0) {
          const result = response.result;
          if(result && result.length > 0){
            setListHistory(result.map(item => {
              return {
                ...item,
                attachments: JSON.parse(item.attachments)
              }
            }))
          }
      } else {
        showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      }
      setIsLoading(false);
    };

    useEffect(() => {
        if(onShow && data){
          getListHistory(data.id);
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
                title:"Đóng",
                color: "primary",
                variant: "outline",
                disabled: isSubmit,
                callback: () => {
                    handleClear(false);
                },
            },
            {
                title: "Tổng hợp mới",
                // type: "submit",
                color: "primary",
                disabled: isSubmit, 
                // || !isDifferenceObj(formData, values),
                is_loading: isSubmit,
                callback: () => {
                    handleClear(true);
                },
            },
        ],
      },
    }),
    [
        isSubmit,
        data
    ]
  );


  const handleClear = (acc) => {
    onHide(acc);
    setListHistory([]);
  }

  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        size="md"
        toggle={() => !isSubmit && handleClear(false)}
        className="modal-history-clarification"
      >
        <form className="form-history-clarification">
          <ModalHeader title={`Lịch sử gửi tổng hợp làm rõ HSMT`} toggle={() => !isSubmit && handleClear(false)} />
          <ModalBody>
            {!isLoading ? 
              <div className='list-history-clarification'>
                {listHistory && listHistory.length > 0 ? 
                  listHistory.map((item, index) => (
                    <div className="item-history">
                      <div className="header-title">
                        <div>
                            <span style={{fontSize: 14, fontWeight: '500'}}>Tổng hợp làm rõ lần {index + 1}</span>
                        </div>
                        <div className="time-history">
                            <span style={{fontSize: 12, fontWeight: '400', color: '#939394'}}>{item.createdTime ? moment(item.createdTime).format('DD/MM/YYYY - HH:mm') : ''}</span>
                        </div>
                      </div>
                      <div className="container-content">
                          <TextArea
                            name='content'
                            label="Nội dung"
                            value={item.content}
                            placeholder="Nhập nôi dung"
                            fill={true}
                            disabled={true}
                            required={false}
                            // onChange={(e) => {
                            //     const value = e.target.value;
                            //     setContent(value);
                            // }}
                            // onChange={(e) => handleChangeContent(e)}
                            // maxLength={459}
                          />
                      </div>

                      <AttachmentComponent
                        listAttactment={item.attachments}
                        setListAttactment={() => {}}
                        disAddAttachment={true}
                        dowloadButton={true}
                      />
                  
                  </div>
                  ))
                : null}
              </div>
            : <Loading/>}
          </ModalBody>
          <ModalFooter actions={actions} />
        </form>
      </Modal>
      <Dialog content={contentDialog} isOpen={showDialog} />
      
    </Fragment>
  );
}

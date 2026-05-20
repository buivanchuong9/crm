import React, { Fragment, useState, useEffect, useMemo, useRef, useContext } from "react";
import { IActionModal } from "model/OtherModel";
import Icon from "components/icon";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import "./ModalExtendHistory.scss";
import BusinessProcessService from "services/BusinessProcessService";
import { formatFileSize, handDownloadFileOrigin, showToast } from "utils/common";
import { useNavigate } from "react-router-dom";
import TextArea from "components/textarea/textarea";
import AttachmentComponent from "components/AttachmentComponent/AttachmentComponent";
import TenderPackageService from "services/TenderPackageService";
import moment from "moment";
import Loading from "components/loading";
import DatePickerCustom from "components/datepickerCustom/datepickerCustom";

export default function ModalExtendHistory({ onShow, onHide, data }) {  
    
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
        packageId: id,
        limit: 100
      }
      const response = await TenderPackageService.listExtensionHistory(params);
      if (response.code === 0) {
          const result = response.result.items;
          if(result && result.length > 0){
            setListHistory(result.map(item => {
              return {
                ...item,
                attachments: item.attachments && JSON.parse(item.attachments) ? JSON.parse(item.attachments) : []
              }
            }));
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
                title: "Gia hạn mới",
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
        className="modal-extend-history"
      >
        <form className="form-extend-history">
          <ModalHeader title={`Lịch sử gia hạn gói thầu`} toggle={() => !isSubmit && handleClear(false)} />
          <ModalBody>
            {!isLoading ? 
              <div className='list-extend-history'>
                {listHistory && listHistory.length > 0 ? 
                  listHistory.map((item, index) => (
                    <div className="item-history">
                      <div className="header-title">
                        <div>
                            <span style={{fontSize: 14, fontWeight: '500'}}>Gia hạn lần {listHistory.length - index}</span>
                        </div>
                        <div className="time-history">
                            <span style={{fontSize: 12, fontWeight: '400', color: '#939394'}}>{item.createdTime ? moment(item.createdTime).format('DD/MM/YYYY - HH:mm') : ''}</span>
                        </div>
                      </div>

                      <div className="container-time">
                        <div className="form-time">
                            <DatePickerCustom
                              name="fromTime"
                              fill={true}
                              label={'Thời gian cũ'}
                              value={item.oldTime ? moment(item.oldTime).format("DD/MM/YYYY HH:mm") : ''}
                              disabled={true}
                              // onChange={(e) => handleChangeValueFromTime(e)}
                              placeholder="Thời gian cũ"
                              iconPosition="left"
                              icon={<Icon name="Calendar" />}
                              hasSelectTime= {true}
                            />
                        </div>
                        <div style={{marginTop: '2rem'}}>
                            <Icon name='ArrowRightLarge'/>
                        </div>
                        <div className="form-time">
                            <DatePickerCustom
                              name="fromTime"
                              fill={true}
                              label={'Thời gian mới'}
                              value={item.newTime ? moment(item.newTime).format("DD/MM/YYYY HH:mm") : ''}
                              disabled={true}
                              // onChange={(e) => handleChangeValueFromTime(e)}
                              placeholder="Từ ngày"
                              iconPosition="left"
                              icon={<Icon name="Calendar" />}
                              hasSelectTime= {true}
                            />
                        </div>
                      </div>
                      <div className="container-content">
                          <TextArea
                            name='content'
                            label="Lý do"
                            value={item.note}
                            placeholder="Nhập lý do"
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
                  :
                  <div style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <span style={{fontSize: 16, fontWeight: '400'}}>Chưa có lịch sửa gia hạn</span>
                  </div>
                }
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

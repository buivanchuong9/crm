import React, { Fragment, useState, useEffect, useCallback, useMemo, useContext } from "react";
import { IActionModal } from "model/OtherModel";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import { showToast } from "utils/common";
import "./ConfirmCreateModal.scss";
import NummericInput from "components/input/numericInput";
import _ from "lodash";
import NegotiationService from "services/NegotiationService";

export default function ConfirmCreateModal(props: any) {
  const { onShow, onHide, data } = props;
  
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);

  const [valueProcess, setValueProcess] = useState({
    id: '',
    day: '',
    hour: '',
    minute: '',
  })    


  const onSubmit = async (e) => {
    e && e.preventDefault();

    if(!valueProcess?.day && !valueProcess?.hour && !valueProcess?.minute){
      showToast(`Thời gian đàm phán không được để trống`, "error");
      return;
    }

    setIsSubmit(true);
    
    const body = {
      round: data?.round,
      packageId: data?.packageId,
      negotiationTimeDay: +valueProcess?.day,
      negotiationTimeHour: +valueProcess?.hour,
      negotiationTimeMinute: +valueProcess?.minute,
      packageName: data?.packageName,
      projectName: data?.projectName,
      projectId: data?.projectId,
      negotiationBidderIds: data?.negotiationBidderIds,
    };    
    
    const resutlResponseTime = await NegotiationService.createNegotiation(body);
    if (resutlResponseTime.code === 0) {
      onHide(true);
      showToast(`Xác nhận vòng đàm phán thành công`, "success");
    } else {
      showToast((resutlResponseTime.message) ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setIsSubmit(false);
    handClearForm();
  };

  const handClearForm = () => {
    onHide(false);
    setIsSubmit(false);  

    setValueProcess({
      id: '',
      day: '',
      hour: '',
      minute: '',
    })  
  };

  const actions = useMemo<IActionModal>(
    () => ({
      actions_right: {
        buttons: [
          {
            title: "Huỷ",
            color: "primary",
            variant: "outline",
            disabled: isSubmit,
            callback: () => {
              handClearForm()
                // _.isEqual(formData.values, valueSetting) ? handClearForm() : showDialogConfirmCancel();
            },
          },
          {
            title: 'Áp dụng',
            type: "submit",
            color: "primary",
            disabled:
              isSubmit,
            is_loading: isSubmit,
          },
        ],
      },
    }),
    [isSubmit]
  );

  const showDialogConfirmCancel = () => {
    const contentDialog: IContentDialog = {
      color: "warning",
      className: "dialog-cancel",
      isCentered: true,
      isLoading: false,
      title: <Fragment>{`Hủy bỏ thao tác cài đặt`}</Fragment>,
      message: <Fragment>Bạn có chắc chắn muốn hủy bỏ? Thao tác này không thể khôi phục.</Fragment>,
      cancelText: "Quay lại",
      cancelAction: () => {
        setShowDialog(false);
        setContentDialog(null);
      },
      defaultText: "Xác nhận",
      defaultAction: () => {
        setShowDialog(false);
        setContentDialog(null);
        handClearForm();
      },
    };
    setContentDialog(contentDialog);
    setShowDialog(true);
  };



  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        toggle={() => !isSubmit && onHide(false)}
        className="modal-confirm-create"
        size="sm"
      >
        <form className="form-confirm-create" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader title={`Xác nhận tạo vòng đàm phán`} toggle={() => !isSubmit && handClearForm()} />
          <ModalBody>
            <div className="confirm-create">
                <div className="box_line_date">
                    <span className="title_time">Thời gian đàm phán <span style={{color: 'red'}}>*</span></span>
                    <div className="box_setting_time">
                        <div className="box_time">
                            <div className="form-group">
                                <NummericInput
                                    name="score"
                                    id="score"
                                    fill={false}
                                    value={valueProcess.day}
                                    onBlur={(e) => {
                                      const body = {
                                        ...valueProcess,
                                        day: e.target.value
                                      }                                    
                                    }}
                                    onChange={(e) => {
                                        const value = e.target.value || ''
                                        setValueProcess({ ...valueProcess, day: value});
                                    }}
                                />
                            </div>
                            <div>
                                <span className="title_time">ngày</span>
                            </div>
                        </div>

                        <div className="box_time">
                            <div className="form-group">
                                <NummericInput
                                    name="score"
                                    id="score"
                                    fill={false}
                                    value={valueProcess.hour}
                                    onBlur={(e) => {
                                      const body = {
                                        ...valueProcess,
                                        hour: e.target.value
                                      }                                                                        
                                    }}
                                    onChange={(e) => {
                                        const value = e.target.value || ''
                                        setValueProcess({ ...valueProcess, hour: value});
                                    }}
                                />
                            </div>
                            <div>
                                <span className="title_time">giờ</span>
                            </div>
                        </div>

                        <div className="box_time">
                            <div className="form-group">
                                <NummericInput
                                    name="score"
                                    id="score"
                                    fill={false}
                                    value={valueProcess.minute}
                                    onBlur={(e) => {
                                      const body = {
                                        ...valueProcess,
                                        minute: e.target.value
                                      }                                    
                                    }}
                                    onChange={(e) => {
                                        const value = e.target.value || ''
                                        setValueProcess({ ...valueProcess, minute: value});
                                    }}
                                />
                            </div>
                            <div>
                                <span className="title_time">phút</span>
                            </div>
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

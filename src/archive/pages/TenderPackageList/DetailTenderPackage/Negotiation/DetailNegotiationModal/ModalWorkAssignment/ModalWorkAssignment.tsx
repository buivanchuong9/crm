import React, { Fragment, useState, useEffect, useMemo } from "react";
import { showToast } from "utils/common";
import "./ModalWorkAssignment.scss";
import { IActionModal } from "model/OtherModel";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import NummericInput from "components/input/numericInput";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import WorkOrderService from "services/WorkOrderService";
import EmployeeService from "services/EmployeeService";
import SelectCustom from "components/selectCustom/selectCustom";
import ImageThirdGender from "assets/images/third-gender.png";

export default function ModalWorkAssignment(props: any) {
    //isBatch: Thêm hàng loạt cơ hội (thêm nhanh từ màn hình danh sách khách hàng)
    const { onShow, onHide, data } = props;
  
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
    const [selectedUser, setSelectedUser] = useState(null);

  
    useEffect(() => {
      if (data && onShow) {
        // getDetailServiceLevel(dataNode?.id);
      }
    }, [data, onShow])
  
    const [valueResponse, setValueResponse] = useState({
      id: '',
      day: '',
      hour: '',
      minute: '',
    })
  
    const [valueProcess, setValueProcess] = useState({
      id: '',
      day: '',
      hour: '',
      minute: '',
    })
  
  
    const onSubmit = async (e) => {
        e && e.preventDefault();
    
        if (!valueResponse?.day && !valueResponse?.hour && !valueResponse?.minute) {
        showToast(`Thời gian phản hồi không được để trống`, "error");
        return;
        }
        if (!valueProcess?.day && !valueProcess?.hour && !valueProcess?.minute) {
        showToast(`Thời gian xử lý không được để trống`, "error");
        return;
        }

        if (!selectedUser?.id) {
            showToast(`Chưa chọn người nhận việc`, "error");
        return;
        }
    
        setIsSubmit(true);
    
        const responseTimeDay = +valueResponse?.day;
        const responseTimeHour = +valueResponse?.hour;
        const responseTimeMinute = +valueResponse?.minute;
    
        const processingTimeDay = +valueProcess?.day;
        const processingTimeHour = +valueProcess?.hour;
        const processingTimeMinute = +valueProcess?.minute;
    
        const packageId = data?.packageId;
        const managerId = data?.managerId;
        const potId = data?.potId;
        const roundEvaluation = data?.roundEvaluation || 1;
        const employeeId = selectedUser?.id;
        const negotiationId = data?.negotiationId;
        const note = data?.note;
        const attachments = data?.attachments;
        const organizationId = data.organizationId;

  
        const bodyList = {
            potId: potId,
            employeeId: employeeId,
            managerId: managerId,
            responseTimeDay: responseTimeDay,
            responseTimeHour: responseTimeHour,
            responseTimeMinute: responseTimeMinute,
            processingTimeDay: processingTimeDay,
            processingTimeHour: processingTimeHour,
            processingTimeMinute: processingTimeMinute,
            packageId: packageId,
            organizationId: organizationId,
            roundEvaluation: roundEvaluation,
            negotiationId: negotiationId,
            note: note,
            attachments: attachments
        }
    
        const resutlResponseTime = await WorkOrderService.assignNegotiationWork(bodyList);
            if (resutlResponseTime.code === 0) {
              onHide(resutlResponseTime?.result);
              showToast(`Phân công công việc thành công`, "success");
              setIsSubmit(false);
              handClearForm();
            } else {
              showToast((resutlResponseTime.message) ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
              setIsSubmit(false);
            }
    };
  
  const loadedOptionEmployee = async (search, loadedOptions, { page }) => {
    const res = await EmployeeService.list({ name: search, page, limit: 10 });
    if (res.code !== 0) return { options: [], hasMore: false };
    return {
      options: res.result.items.map(item => ({
        value: item.id,
        label: item.name,
        avatar: item.avatar,
      })),
      hasMore: res.result.loadMoreAble,
      additional: { page: page + 1 },
    };
  };

  const formatOptionLabelEmployee = ({ label, avatar }) => (
    <div className="selected--item">
      <div className="avatar"><img src={avatar || ImageThirdGender} alt={label} /></div>
      {label}
    </div>
  );
  
    const handClearForm = () => {
      onHide(false);
      setIsSubmit(false);
  
      setValueResponse({
        id: '',
        day: '',
        hour: '',
        minute: '',
      })
  
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
                handClearForm();
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
  
    return (
      <Fragment>
        <Modal
          isFade={true}
          isOpen={onShow}
          isCentered={true}
          staticBackdrop={true}
          toggle={() => !isSubmit && onHide(false)}
          className="modal-work-assignment"
          size="md"
        >
          <form className="form-work-assignment" onSubmit={(e) => onSubmit(e)}>
            <ModalHeader title={`Phân công công việc`} toggle={() => !isSubmit && handClearForm()} />
            <ModalBody>
                <div className="confirm-work-assignment">
                    <div className="user-adjuster">
                        <label className="label">Người nhận việc <span style={{ color: 'red' }}>*</span></label>
                        <div className="dropdown-wrapper">
                          <SelectCustom
                            id="employeeId"
                            name="Người nhận việc"
                            value={
                                selectedUser ? {
                                    value: selectedUser.id,
                                    label: selectedUser.name,
                                    avatar: selectedUser.avatar,
                                } : null
                            }
                            options={[]}
                            placeholder="Chọn người nhận việc"
                            fill={true}
                            loadOptionsPaginate={loadedOptionEmployee}
                            additional={{ page: 1 }}
                            isAsyncPaginate={true}
                            isFormatOptionLabel={true}
                            formatOptionLabel={formatOptionLabelEmployee}
                            onChange={(e) => {
                                const userSelected = {
                                  id: e.value,
                                  name: e.label,
                                  avatar: e.avatar,
                                };
                                setSelectedUser(userSelected);
                              }}
                          />
                        </div>
                    </div>
                    <div className="box_line_date">
                        <span className="title_time">Thời gian phản hồi <span style={{ color: 'red' }}>*</span></span>
                        <div className="box_setting_time">
                            <div className="box_time">
                            <div className="form-group">
                                <NummericInput
                                name="score"
                                id="score"
                                // label="Số lượng thực tế"
                                fill={false}
                                value={valueResponse.day}
                                // disabled={disable}
                                onBlur={(e) => {
                                    const body = {
                                    ...valueResponse,
                                    day: e.target.value
                                    }
                                    // if(body.day){
                                    //   updateResponseTime(body);
                                    // }                                 
                                }}
                                onChange={(e) => {
                                    const value = e.target.value || ''
                                    setValueResponse({ ...valueResponse, day: value });
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
                                value={valueResponse.hour}
                                // disabled={disable}
                                onBlur={(e) => {
                                    const body = {
                                    ...valueResponse,
                                    hour: e.target.value
                                    }                         
        
                                }}
                                onChange={(e) => {
                                    const value = e.target.value || ''
                                    setValueResponse({ ...valueResponse, hour: value });
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
                                value={valueResponse.minute}
                                onBlur={(e) => {
                                    const body = {
                                    ...valueResponse,
                                    minute: e.target.value
                                    }                      
                                }}
                                onChange={(e) => {
                                    const value = e.target.value || ''
                                    setValueResponse({ ...valueResponse, minute: value });
                                }}
                                />
                            </div>
                            <div>
                                <span className="title_time">phút</span>
                            </div>
                            </div>
        
                        </div>
                    </div>
                    <div className="box_line_date">
                        <span className="title_time">Thời gian xử lý <span style={{ color: 'red' }}>*</span></span>
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
                                    setValueProcess({ ...valueProcess, day: value });
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
                                    setValueProcess({ ...valueProcess, hour: value });
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
                                    setValueProcess({ ...valueProcess, minute: value });
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
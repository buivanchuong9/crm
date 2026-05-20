import React, { Fragment, useState, useEffect, useCallback, useMemo } from "react";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import FieldCustomize from "components/fieldCustomize/fieldCustomize";
import { IActionModal } from "model/OtherModel";
import { IFieldCustomize, IFormData, IValidation } from "model/FormModel";
import { useActiveElement } from "utils/hookCustom";
import Validate, { handleChangeValidate } from "utils/validate";
import { showToast } from "utils/common";
import { isDifferenceObj } from "reborn-util";
import "./NotificationSettingModal.scss";
import ButtonOnOff from "components/ButtonOnOff/ButtonOnOff";
import { is } from "bpmn-js/lib/util/ModelUtil";
import NotificationTemplateService from "services/NotificationTemplateService";
import Input from "components/input/input";
import NummericInput from "components/input/numericInput";
import Icon from "components/icon";

export default function NotificationSettingModal(props: any) {
  const { onShow, onHide} = props;

  const focusedElement = useActiveElement();

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
  const [data, setData] = useState(null);
  const [dataConfig, setDataConfig] = useState({
    response: '',
    process: ''
  })

//   console.log('dataConfig', dataConfig);

  const getDetailSetting = async () => {    
    const response = await NotificationTemplateService.detailSettingNotify();

    if (response.code == 0) {
      const result = response.result;
      const duesoonConfig = result.duesoonConfig && JSON.parse(result.duesoonConfig) || '';
      setData(result);
      if(duesoonConfig){
        setDataConfig(duesoonConfig);
      }
      
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  useEffect(() => {
    if(onShow){
        getDetailSetting();
    }
  }, [onShow])
  

  const values = useMemo(
    () =>
      ({
        id: data?.id ?? 0,
        overdue: data?.overdue ?? 1,
        duesoon: data?.duesoon ?? 1,
        duesoonConfig: data?.duesoonConfig ?? null,
        emailChannel: data?.emailChannel ?? 1
      } as any),
    [data, onShow]
  );

  const [formData, setFormData] = useState<IFormData>({ values: values });

  useEffect(() => {
    setFormData({ ...formData, values: values, errors: {} });
    setIsSubmit(false);

    return () => {
      setIsSubmit(false);
    };
  }, [values]);

  const onSubmit = async (e) => {
    e.preventDefault();

    // const errors = Validate(validations, formData, [...listFieldBasic]);
    // if (Object.keys(errors).length > 0) {
    //   setFormData((prevState) => ({ ...prevState, errors: errors }));
    //   return;
    // }

    const body: any = {
      ...(formData.values as any),
      ...(data ? { id: data.id } : {}),
      duesoonConfig: formData?.values?.duesoon == 1 ? JSON.stringify(dataConfig) : null
    };

    setIsSubmit(true);

    const response = await NotificationTemplateService.updateSettingNotify(body);

    if (response.code === 0) {
      showToast(`Cài đặt thông báo thành công`, "success");
      handClearForm(true);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      setIsSubmit(false);
    }
  };

  const handClearForm = (acc) => {
    onHide(acc);
    setDataConfig({
        response: '',
        process: ''
    });
  };

  const actions = useMemo<any>(
    () => ({
      actions_right: {
        buttons: [
          {
            title: "Hủy",
            color: "primary",
            variant: "outline",
            disabled: isSubmit,
            callback: () => {
              !isDifferenceObj(formData.values, values) ? handClearForm(false) : showDialogConfirmCancel();
            },
          },
          {
            title: "Xác nhận",
            type: "submit",
            color: "primary",
            disabled:
              isSubmit ||
              (!isDifferenceObj(formData.values, values) &&
              (formData?.values?.duesoon == 1 ? ((!dataConfig.process || !dataConfig.response) ? true : false) : '')),
            //   (formData.errors && Object.keys(formData.errors).length > 0),
            is_loading: isSubmit,
          },
        ],
      },
    }),
    [formData, values, isSubmit, dataConfig]
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
        handClearForm(false);
        setShowDialog(false);
        setContentDialog(null);
      },
    };
    setContentDialog(contentDialog);
    setShowDialog(true);
  };

  const checkKeyDown = useCallback(
    (e) => {
      const { keyCode } = e;
      if (keyCode === 27 && !showDialog) {
        if (isDifferenceObj(formData.values, values)) {
          showDialogConfirmCancel();
          if (focusedElement instanceof HTMLElement) {
            focusedElement.blur();
          }
        } else {
          onHide(false);
        }
      }
    },
    [formData]
  );

  useEffect(() => {
    window.addEventListener("keydown", checkKeyDown);

    return () => {
      window.removeEventListener("keydown", checkKeyDown);
    };
  }, [checkKeyDown]);

  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        toggle={() => !isSubmit && handClearForm(false)}
        className="modal-notification-setting"
        size="sm"
      >
        <form className="form-notification-setting-group" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader
            title={`Cài đặt thông báo`}
            toggle={() => {
              !isSubmit && handClearForm(false);
            }}
          />
          <ModalBody>
            <div className="list-form-group">
              <div className="list-field-item list-field-basic">
                <div className="status_active">
                  <div>
                    <span style={{ fontSize: 14, fontWeight: "500" }}>Quá hạn</span>
                  </div>
                  <ButtonOnOff
                    checked={formData?.values?.overdue == 1 ? true : false}
                    onChange={(value) => {
                      if (value) {
                        setFormData({ ...formData, values: { ...formData?.values, overdue: 1 } });
                      } else {
                        setFormData({ ...formData, values: { ...formData?.values, overdue: 0 } });
                      }
                    }}
                  />
                </div>

                <div className="status_active">
                  <div>
                    <span style={{ fontSize: 14, fontWeight: "500" }}>Sắp đến hạn</span>
                  </div>
                  <ButtonOnOff
                    checked={formData?.values?.duesoon == 1 ? true : false}
                    onChange={(value) => {
                      if (value) {
                        setFormData({ ...formData, values: { ...formData?.values, duesoon: 1 } });
                      } else {
                        setFormData({ ...formData, values: { ...formData?.values, duesoon: 0 } });
                      }
                      setDataConfig({
                        response: '',
                        process: ''
                      });
                    }}
                  />
                </div>

                {formData?.values?.duesoon == 1 ? 
                    <div className="container-setting-timer">
                        <div className="box-response">
                            <div className="title">
                                <span style={{fontSize: 12, fontWeight: '500'}}>Tỷ lệ OLA phản hồi</span>
                                <Icon name='GuideTime'/>
                            </div>
                            <div className="setting-time">
                                <div className="box-input">
                                    <NummericInput
                                        name=""
                                        id=""
                                        label=""
                                        placeholder=""
                                        fill={false}
                                        value={dataConfig.response}
                                        onValueChange={(e) => {
                                            const value = e.floatValue;
                                            setDataConfig({...dataConfig, response: value});
                                        }}
                                        maxValue={99}
                                    />
                                    <div>
                                        <span style={{fontSize: 20}}>%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="box-process">
                            <div className="title">
                                <span style={{fontSize: 12, fontWeight: '500'}}>Tỷ lệ OLA xử lý</span>
                                <Icon name='GuideTime'/>
                            </div>
                            <div className="setting-time">
                                <div className="box-input">
                                    <NummericInput
                                        name=""
                                        id=""
                                        label=""
                                        placeholder=""
                                        fill={false}
                                        value={dataConfig.process}
                                        onValueChange={(e) => {
                                            const value = e.floatValue;
                                            setDataConfig({...dataConfig, process: value});
                                        }}
                                        maxValue={99}
                                    />
                                    <div>
                                        <span style={{fontSize: 20}}>%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                : null}

                <div className="status_active">
                  <div>
                    <span style={{ fontSize: 14, fontWeight: "500" }}>Gửi thông báo đến email</span>
                  </div>
                  <ButtonOnOff
                    checked={formData?.values?.emailChannel == 1 ? true : false}
                    onChange={(value) => {
                      if (value) {
                        setFormData({ ...formData, values: { ...formData?.values, emailChannel: 1 } });
                      } else {
                        setFormData({ ...formData, values: { ...formData?.values, emailChannel: 0 } });
                      }
                    }}
                  />
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

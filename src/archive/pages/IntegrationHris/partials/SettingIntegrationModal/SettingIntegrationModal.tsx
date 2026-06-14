import React, { Fragment, useState, useEffect, useCallback, useMemo } from "react";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import { IFormData } from "model/FormModel";
import { useActiveElement } from "utils/hookCustom";
import { showToast } from "utils/common";
import { isDifferenceObj } from "reborn-util";
import "./SettingIntegrationModal.scss";
import Icon from "components/icon";
import RadioList from "components/radio/radioList";
import DatePickerCustom from "components/datepickerCustom/datepickerCustom";
import TimePickerCustom from "components/TimePickerCustom/TimePickerCustom";
import moment from "moment";
import CheckboxList from "components/checkbox/checkboxList";
import HrisService from "services/HrisService";

export default function SettingIntegrationModal(props: any) {
  const { onShow, onHide } = props;
  const focusedElement = useActiveElement();

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
  const [data, setData] = useState(null);
  const [dataConfig, setDataConfig] = useState({
    response: '',
    process: ''
  });

  const getDetailSetting = async () => {
    try {
      const response = await HrisService.getScheduleConfig();

      if (response.code === 0) {
        const result = response.result;
        setData(result);
      } else {
        showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      }
    } catch {
      showToast("Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  useEffect(() => {
    if (onShow) {
      getDetailSetting();
    }
  }, [onShow]);

  const scheduleType = useMemo(
    () => (data?.type === 'day' ? '1' : '2'),
    [data]
  );

  const values = useMemo(
    () => ({
      id: data?.id ?? 0,
      perfomance: scheduleType,
      time: data?.hour ? moment(`${data?.hour}:${data?.minute}`, "HH:mm").format("HH:mm") : '12:00',
      day: data?.dayOfWeek || "",
    }),
    [data, scheduleType]
  );

  useEffect(() => {
    setFormData({ ...formData, values: values, errors: {} });
    setIsSubmit(false);

    return () => {
      setIsSubmit(false);
    };
  }, [values]);

  const [formData, setFormData] = useState<IFormData>({ values: values });

  const onSubmit = async (e) => {
    e.preventDefault();

    // Nếu type là 'week', set dayOfWeek = ""
    const body = {
      id: formData.values.id,
      hour: formData.values.time.split(":")[0],
      minute: formData.values.time.split(":")[1],
      type: formData.values.perfomance === '1' ? 'day' : 'week',
      dayOfWeek: formData.values.perfomance === '2' ? "" : formData.values.day,
    };

    console.log("====>>> body: ", body);

    setIsSubmit(true);

    try {
      const response = await HrisService.updateScheduleConfig(body);

      if (response.code === 0) {
        showToast(`Cài đặt thông báo thành công`, "success");
        handClearForm(true);
      } else {
        showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
        setIsSubmit(false);
      }
    } catch {
      showToast("Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      handClearForm(true);
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
            title: "Áp dụng",
            type: "submit",
            color: "primary",
            disabled:
              isSubmit ||
              (!isDifferenceObj(formData.values, values)),
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

  const generateDayOptions = () => {
    return [
      { value: "2", label: "Thứ 2" },
      { value: "3", label: "Thứ 3" },
      { value: "4", label: "Thứ 4" },
      { value: "5", label: "Thứ 5" },
      { value: "6", label: "Thứ 6" },
      { value: "7", label: "Thứ 7" },
      { value: "1", label: "Chủ nhật" },
    ];
  };

  const frequencyOptions = () => {
    return [
      { value: '1', label: 'Hàng ngày' },
    { value: '2', label: 'Hàng tuần' }
    ];
  };

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
        className="modal-setting-integration"
        size="sm"
      >
        <form className="form-setting-integration" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader
            title={`Cấu hình tích hợp HRIS`}
            toggle={() => {
              !isSubmit && handClearForm(false);
            }}
          />
          <ModalBody>
            <div className="list-form-group">
              <div className="list-field-item list-field-basic">
                <div className="form-group">
                  <RadioList
                    options={frequencyOptions()}
                    required={true}
                    title="Tần suất"
                    name="type_handle"
                    value={formData?.values.perfomance}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData({ ...formData, values: { ...formData.values, perfomance: value } });
                    }}
                  />
                </div>

                <div className="container-setting-timer">
                  {formData?.values.perfomance === '1' && (
                    <div>
                      <CheckboxList
                        title=""
                        options={generateDayOptions()}
                        value={formData?.values.day}
                        onChange={(e) => {
                          setFormData({ ...formData, values: { ...formData.values, day: e } });
                        }}
                      />
                    </div>
                  )}
                  <div style={{ width: '100%' }}>
                    <TimePickerCustom
                      value={formData?.values.time}
                      onChange={(time) => {
                        setFormData({
                          ...formData,
                          values: {
                            ...formData.values,
                            time: time,
                          },
                        });
                      }}
                      disabled={false}
                      label="Giờ, phút"
                      icon={<Icon name="Calendar" />}
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

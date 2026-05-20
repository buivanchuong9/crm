import React, { Fragment, useState, useEffect, useCallback, useMemo } from "react";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import FieldCustomize from "components/fieldCustomize/fieldCustomize";
import { IActionModal } from "model/OtherModel";
import { IFieldCustomize, IFormData, IValidation } from "model/FormModel";
import { useActiveElement } from "utils/hookCustom";
import Validate, { handleChangeValidate } from "utils/validate";
import { showToast } from "utils/common";
import { createArrayFromTo, isDifferenceObj } from "reborn-util";
import "./AddHolidayModal.scss";
import Icon from "components/icon";
import moment from "moment";
import SelectCustom from "components/selectCustom/selectCustom";
import WorkTimeService from "services/WorkTimeService";
import Input from "components/input/input";
import RadioList from "components/radio/radioList";
import DatePickerCustom from "components/datepickerCustom/datepickerCustom";

export default function AddHolidayModal(props: any) {
  const { onShow, onHide, data } = props;

  const focusedElement = useActiveElement();

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
  const [dataDay, setDataDay] = useState(null);
  const [dataMonth, setDataMonth] = useState(null);

  const values = useMemo(
    () =>
      ({
        id: data?.id ?? 0,
        holidayName: data?.holidayName ?? "",
        holidayDate: data?.holidayDate ?? "",
        holidayDay: data?.holidayDay ?? "",
        holidayMonth: data?.holidayMonth ?? "",
        isFixed: data?.isFixed?.toString() ?? "1",
        startDate: data?.startDate ?? "",
        endDate: data?.endDate ?? "",
      } as any),
    [data, onShow]
  );

  const [formData, setFormData] = useState<IFormData>({ values: values });
  // console.log('formData', formData);

  const validations: IValidation[] = [
    {
      name: "name",
      rules: "required",
    },
    // {
    //   name: "dayOfWeek",
    //   rules: "required|min:1|max:7",
    // },
    // {
    //   name: "position",
    //   rules: "required|min:0",
    // }
  ];

  const listFieldBasic = useMemo(
    () =>
      [
        {
          label: "Tên ngày nghỉ",
          name: "holidayName",
          type: "text",
          fill: true,
          required: true,
        },
      ] as IFieldCustomize[],
    [formData?.values]
  );

  useEffect(() => {
    setFormData({ ...formData, values: values, errors: {} });
    setIsSubmit(false);

    return () => {
      setIsSubmit(false);
    };
  }, [values]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData?.values.holidayName) {
      showToast("Tên ngày nghỉ không được để trống", "error");
      return;
    }
    if (formData?.values.isFixed === "1" && !formData?.values.holidayDay && !formData?.values.holidayMonth) {
      showToast("Thời gian nghỉ không được để trống", "error");
      return;
    }

    if (formData?.values.isFixed === "0" && !formData?.values.startDate) {
      showToast("Ngày bắt đầu không được để trống", "error");
      return;
    }

    if (formData?.values.isFixed === "0" && !formData?.values.endDate) {
      showToast("Ngày kết thúc không được để trống", "error");
      return;
    }

    // const errors = Validate(validations, formData, [...listFieldBasic]);
    // if (Object.keys(errors).length > 0) {
    //   setFormData((prevState) => ({ ...prevState, errors: errors }));
    //   return;
    // }

    setIsSubmit(true);

    const body: any = {
      ...(formData.values as any),
      // ...(data ? { id: data.id } : {}),
    };

    const response = await WorkTimeService.updateHoliday(body);

    if (response.code === 0) {
      showToast(`${data ? "Cập nhật" : "Tạo"} ngày nghỉ thành công`, "success");
      onHide(true);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      setIsSubmit(false);
    }
  };

  const handClearForm = () => {
    onHide(false);
  };

  const actions = useMemo<IActionModal>(
    () => ({
      actions_right: {
        buttons: [
          {
            title: "Hủy",
            color: "primary",
            variant: "outline",
            disabled: isSubmit,
            callback: () => {
              !isDifferenceObj(formData.values, values) ? handClearForm() : showDialogConfirmCancel();
            },
          },
          {
            title: "Áp dụng",
            type: "submit",
            color: "primary",
            disabled: isSubmit || !isDifferenceObj(formData.values, values) || (formData.errors && Object.keys(formData.errors).length > 0),
            is_loading: isSubmit,
          },
        ],
      },
    }),
    [formData, values, isSubmit]
  );

  const showDialogConfirmCancel = () => {
    const contentDialog: IContentDialog = {
      color: "warning",
      className: "dialog-cancel",
      isCentered: true,
      isLoading: false,
      title: <Fragment>{`Hủy bỏ thao tác ${data ? "chỉnh sửa" : "thêm mới"}`}</Fragment>,
      message: <Fragment>Bạn có chắc chắn muốn hủy bỏ? Thao tác này không thể khôi phục.</Fragment>,
      cancelText: "Quay lại",
      cancelAction: () => {
        setShowDialog(false);
        setContentDialog(null);
      },
      defaultText: "Xác nhận",
      defaultAction: () => {
        onHide(false);
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

  //! đoạn này xử lý lấy tháng
  const [months] = useState<any[]>(
    createArrayFromTo(1, 12).map((item, idx) => {
      if (item < 10) {
        return {
          value: +`0${item}`,
          label: `0${item}`,
        };
      }

      return {
        value: +item,
        label: item,
      };
    })
  );

  //! đoạn này xử lý lấy ngày
  const [days] = useState<any[]>(
    createArrayFromTo(1, 31).map((item, idx) => {
      if (item < 10) {
        return {
          value: +`0${item}`,
          label: `0${item}`,
        };
      }

      return {
        value: +item,
        label: item,
      };
    })
  );

  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        toggle={() => !isSubmit && onHide(false)}
        className="modal-add-holiday"
        // size="lg"
      >
        <form className="form-add-holiday" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader
            title={`${data ? "Chỉnh sửa" : "Tạo"} ngày nghỉ`}
            toggle={() => {
              !isSubmit && onHide(false);
            }}
          />
          <ModalBody>
            <div className="list-form-group">
              {/* <div className="list-field-item"> */}
              <div className="form-group">
                <Input
                  label="Tên ngày nghỉ"
                  name="holidayName"
                  fill={true}
                  required={true}
                  value={formData?.values?.holidayName}
                  placeholder="Nhập tên ngày nghỉ"
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, values: { ...formData?.values, holidayName: value } });
                  }}
                />
              </div>
              <div className="form-group">
                <RadioList
                  options={[
                    {
                      value: "1",
                      label: "Cố định",
                    },
                    {
                      value: "0",
                      label: "Không cố định",
                    },
                  ]}
                  // className="options-auth"
                  required={true}
                  title="Loại ngày nghỉ"
                  name="isFixed"
                  value={formData.values.isFixed}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "1") {
                      setFormData({
                        ...formData,
                        values: {
                          ...formData?.values,
                          isFixed: value,
                          startTime: "",
                          endTime: "",
                        },
                      });
                    } else {
                      setFormData({
                        ...formData,
                        values: {
                          ...formData?.values,
                          isFixed: value,
                          holidayDay: "",
                          holidayMonth: "",
                        },
                      });
                    }
                  }}
                />
              </div>

              {formData.values.isFixed === "1" ? (
                // <div className="field__special" style={{width: '100%'}}>
                //     <DatePickerCustom
                //         label="Chọn ngày nghỉ"
                //         name="holidayDate"
                //         fill={true}
                //         required={true}
                //         isFmtText={true}
                //         value={formData.values.holidayDate ?  moment(formData.values.holidayDate).format("DD/MM/YYYY") : ''}
                //         onChange={(e) => {
                //             setFormData({ ...formData, values: { ...formData?.values, holidayDate: e } });
                //         }}
                //         // disabled={formData.never !== "1"}
                //         placeholder="DD/MM/YYYY"
                //     />
                // </div>
                <div className="field__special">
                  <SelectCustom
                    placeholder="Chọn ngày"
                    name="foundingDay"
                    fill={true}
                    label="Ngày"
                    required={true}
                    // value={formData.values.holidayDate ? +formData.values.holidayDate.split("/")[0] : null}
                    value={formData.values.holidayDay}
                    options={days}
                    onChange={(e) => {
                      // const currentValue = formData.values.holidayDate ? formData.values.holidayDate.split("/") : [];
                      // const dayValue = +e.value < 10 ? `0${e.value}` : e.value;
                      // setFormData({ ...formData, values: { ...formData?.values, holidayDate: `${dayValue}/${currentValue[1] || ''}` } });
                      const dayValue = e.value;
                      setFormData({ ...formData, values: { ...formData?.values, holidayDay: dayValue } });
                    }}
                    className="founded__day"
                  />

                  <SelectCustom
                    placeholder="Chọn tháng"
                    name="foundingMonth"
                    fill={true}
                    label="Tháng"
                    required={true}
                    // value={formData.values.holidayDate ? +formData.values.holidayDate.split("/")[1] : null}
                    value={formData.values.holidayMonth}
                    options={months}
                    onChange={(e) => {
                      // const currentValue = formData.values.holidayDate ? formData.values.holidayDate.split("/") : [];
                      // const dayValue = +e.value < 10 ? `0${e.value}` : e.value;
                      // setFormData({ ...formData, values: { ...formData?.values, holidayDate: `${currentValue[0] || ''}/${dayValue}` } });
                      const dayValue = e.value;
                      setFormData({ ...formData, values: { ...formData?.values, holidayMonth: dayValue } });
                    }}
                    className="founded_month"
                  />
                </div>
              ) : null}

              {formData.values.isFixed === "0" ? (
                <div className="form-group">
                  <DatePickerCustom
                    label="Ngày bắt đầu"
                    name="startDate"
                    fill={true}
                    required={true}
                    isFmtText={true}
                    value={formData.values.startDate ? moment(formData.values.startDate).format("DD/MM/YYYY") : ""}
                    onChange={(e) => {
                      setFormData({ ...formData, values: { ...formData?.values, startDate: e } });
                    }}
                    // disabled={formData.never !== "1"}
                    placeholder="DD/MM/YYYY"
                    maxDate={formData.values.endDate}
                    icon={<Icon name="Calendar" />}
                    iconPosition="right"
                  />
                </div>
              ) : null}
              {formData.values.isFixed === "0" ? (
                <div className="form-group">
                  <DatePickerCustom
                    label="Ngày kết thúc"
                    name="endDate"
                    fill={true}
                    required={true}
                    isFmtText={true}
                    value={formData.values.endDate ? moment(formData.values.endDate).format("DD/MM/YYYY") : ""}
                    onChange={(e) => {
                      setFormData({ ...formData, values: { ...formData?.values, endDate: e } });
                    }}
                    // disabled={formData.never !== "1"}
                    placeholder="DD/MM/YYYY"
                    minDate={formData.values.startDate}
                    icon={<Icon name="Calendar" />}
                    iconPosition="right"
                  />
                </div>
              ) : null}
              {/* </div> */}
            </div>
          </ModalBody>
          <ModalFooter actions={actions} />
        </form>
      </Modal>
      <Dialog content={contentDialog} isOpen={showDialog} />
    </Fragment>
  );
}

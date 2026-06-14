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
import "./SettingWorkTimeModal.scss";
import Icon from "components/icon";
import moment from "moment";
import SelectCustom from "components/selectCustom/selectCustom";
import WorkTimeService from "services/WorkTimeService";
import Input from "components/input/input";
import _ from "lodash";
import ButtonOnOff from "components/ButtonOnOff/ButtonOnOff";
import Checkbox from "components/checkbox/checkbox";

export default function SettingWorkTimeModal(props: any) {
  const { onShow, onHide, dataShift } = props;
  console.log("dataShift", dataShift);

  const focusedElement = useActiveElement();

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
  const [shiftName, setShiftName] = useState(null);
  const [active, setActive] = useState(1);

  //ca mặc định
  const [isDefault, setIsDefault] = useState(0);

  const getListDayOfWeek = async (id) => {
    const params = {
      shiftId: id,
    };
    const response = await WorkTimeService.listWorkDay(params);

    if (response.code == 0) {
      const result = response.result;
      if (result && result.length > 0) {
        const data = result.map((item) => {
          return {
            ...item,
            label:
              item.dayOfWeek === 2
                ? "Thứ 2"
                : item.dayOfWeek === 3
                ? "Thứ 3"
                : item.dayOfWeek === 4
                ? "Thứ 4"
                : item.dayOfWeek === 5
                ? "Thứ 5"
                : item.dayOfWeek === 6
                ? "Thứ 6"
                : item.dayOfWeek === 7
                ? "Thứ 7"
                : item.dayOfWeek === 1
                ? "Chủ nhật"
                : "",

            morningStartTime: item.fmtMorningStartTime || "",
            morningEndTime: item.fmtMorningEndTime || "",
            afternoonStartTime: item.fmtAfternoonStartTime || "",
            afternoonEndTime: item.fmtAfternoonEndTime || "",
          };
        });

        const newData = data.filter((el) => el.dayOfWeek !== 1);
        const sunday = data.filter((el) => el.dayOfWeek === 1);
        newData.sort((a, b) => a.dayOfWeek - b.dayOfWeek);
        // setFormData([...newData, ...sunday]);
        setDayOfWeek([...newData, ...sunday]);
      } else {
        setDayOfWeek(defaultValue);
        // setFormData(dayOfWeek)
      }
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  useEffect(() => {
    if (dataShift?.id && onShow) {
      getListDayOfWeek(dataShift?.id);
      setShiftName(dataShift?.name);
      setActive(dataShift?.active);
      setIsDefault(dataShift?.isDefault || 0);
    } else {
      setFormData(dayOfWeek);
    }
  }, [dataShift, onShow]);

  const defaultValue = [
    {
      id: "",
      dayOfWeek: 2,
      label: "Thứ 2",
      morningStartTime: "",
      morningEndTime: "",
      afternoonStartTime: "",
      afternoonEndTime: "",
      isWorkingDay: 1,
    },
    {
      id: "",
      dayOfWeek: 3,
      label: "Thứ 3",
      morningStartTime: "",
      morningEndTime: "",
      afternoonStartTime: "",
      afternoonEndTime: "",
      isWorkingDay: 1,
    },
    {
      id: "",
      dayOfWeek: 4,
      label: "Thứ 4",
      morningStartTime: "",
      morningEndTime: "",
      afternoonStartTime: "",
      afternoonEndTime: "",
      isWorkingDay: 1,
    },
    {
      id: "",
      dayOfWeek: 5,
      label: "Thứ 5",
      morningStartTime: "",
      morningEndTime: "",
      afternoonStartTime: "",
      afternoonEndTime: "",
      isWorkingDay: 1,
    },
    {
      id: "",
      dayOfWeek: 6,
      label: "Thứ 6",
      morningStartTime: "",
      morningEndTime: "",
      afternoonStartTime: "",
      afternoonEndTime: "",
      isWorkingDay: 1,
    },
    {
      id: "",
      dayOfWeek: 7,
      label: "Thứ 7",
      morningStartTime: "",
      morningEndTime: "",
      afternoonStartTime: "",
      afternoonEndTime: "",
      isWorkingDay: 0,
    },
    {
      id: "",
      dayOfWeek: 1,
      label: "Chủ nhật",
      morningStartTime: "",
      morningEndTime: "",
      afternoonStartTime: "",
      afternoonEndTime: "",
      isWorkingDay: 0,
    },
  ];

  const [dayOfWeek, setDayOfWeek] = useState(defaultValue);
  console.log("dayOfWeek", dayOfWeek);

  const [formData, setFormData] = useState(dayOfWeek);
  // console.log('formData', formData);

  useEffect(() => {
    setFormData(dayOfWeek);
    setIsSubmit(false);

    return () => {
      setIsSubmit(false);
    };
  }, [dayOfWeek]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsSubmit(true);

    const bodyName = {
      id: dataShift?.id,
      name: shiftName,
      active: active,
      isDefault: isDefault,
    };

    const responseName = await WorkTimeService.updateShift(bodyName);
    if (responseName.code === 0) {
      const resultCreateShift = responseName.result;

      const body = formData.map((item) => {
        return {
          // ...item,
          id: item.id,
          dayOfWeek: item.dayOfWeek,
          morningStartTime: item.morningStartTime,
          morningEndTime: item.morningEndTime,
          afternoonStartTime: item.afternoonStartTime,
          afternoonEndTime: item.afternoonEndTime,
          isWorkingDay: item.isWorkingDay,
          shiftId: dataShift?.id || resultCreateShift.id,
        };
      });

      const arrPromise = [];

      body.map((item) => {
        const promise = new Promise((resolve, reject) => {
          WorkTimeService.updateWorkDay(item).then((res) => {
            resolve(res);
          });
        });

        arrPromise.push(promise);
      });

      Promise.all(arrPromise).then((result) => {
        if (result.filter((el) => el.code !== 0).length > 0) {
          showToast("Có lỗi xảy ra. Vui lòng thử lại sau", "error");
          return;
        }
        if (result.length > 0) {
          showToast("Cài đặt ca làm việc thành công", "success");
          handClearForm(true);
        } else {
          showToast("Có lỗi xảy ra. Vui lòng thử lại sau", "error");
          setIsSubmit(false);
        }
      });
    } else {
      showToast(responseName.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      setIsSubmit(false);
    }
  };

  const handClearForm = (acc) => {
    onHide(acc);
    setDayOfWeek(defaultValue);
    setShiftName(null);
    setActive(1);
    setIsDefault(0);
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
              //   !isDifferenceObj(formData.values, values) ? handClearForm() : showDialogConfirmCancel();
              _.isEqual(formData, dayOfWeek) ? handClearForm(false) : showDialogConfirmCancel();
            },
          },
          {
            title: "Áp dụng",
            type: "submit",
            color: "primary",
            disabled:
              isSubmit ||
              (_.isEqual(formData, dayOfWeek) &&
                _.isEqual(dataShift?.name || null, shiftName) &&
                _.isEqual(dataShift?.isDefault || 0, isDefault) &&
                _.isEqual(dataShift?.active === 0 || dataShift?.active ? dataShift?.active : 1, active)) ||
              formData.filter((el) => !el.morningStartTime && el.isWorkingDay === 1).length > 0 ||
              formData.filter((el) => !el.morningEndTime && el.isWorkingDay === 1).length > 0 ||
              formData.filter((el) => !el.afternoonStartTime && el.isWorkingDay === 1).length > 0 ||
              formData.filter((el) => !el.afternoonEndTime && el.isWorkingDay === 1).length > 0,
            // !isDifferenceObj(formData.values, values) || (formData.errors && Object.keys(formData.errors).length > 0),
            is_loading: isSubmit,
          },
        ],
      },
    }),
    [formData, dayOfWeek, isSubmit, dataShift, shiftName, active, isDefault]
  );

  const showDialogConfirmCancel = () => {
    const contentDialog: IContentDialog = {
      color: "warning",
      className: "dialog-cancel",
      isCentered: true,
      isLoading: false,
      title: <Fragment>{`Hủy bỏ thao tác ${dataShift ? "chỉnh sửa" : "thêm mới"}`}</Fragment>,
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
        if (!_.isEqual(formData, dayOfWeek)) {
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

  const [time, setTime] = useState(""); // Lưu trữ chuỗi giờ
  const [error, setError] = useState(""); // Xử lý thông báo lỗi

  const handleChange = (e, index, type) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Chỉ cho phép nhập số
    let formattedTime = value;

    if (value.length > 2) {
      // Tự động chèn dấu ":" sau 2 chữ số đầu tiên
      formattedTime = `${value.slice(0, 2)}:${value.slice(2, 4)}`;
    }

    if (value.length > 4) {
      // Giới hạn nhập không quá 4 ký tự (HHMM)
      formattedTime = `${value.slice(0, 2)}:${value.slice(2, 4)}`;
    }

    setFormData((current) =>
      current.map((obj, idx) => {
        if (index === idx) {
          if (type === "morningStartTime") {
            return { ...obj, morningStartTime: formattedTime };
          }

          if (type === "morningEndTime") {
            return { ...obj, morningEndTime: formattedTime };
          }

          if (type === "afternoonStartTime") {
            return { ...obj, afternoonStartTime: formattedTime };
          }

          if (type === "afternoonEndTime") {
            return { ...obj, afternoonEndTime: formattedTime };
          }
        }
        return obj;
      })
    );

    // Xóa lỗi nếu đang nhập hợp lệ
    setError("");
  };

  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        toggle={() => !isSubmit && handClearForm(false)}
        className="modal-setting-work-time"
        // size="lg"
      >
        <form className="form-setting-work-time" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader
            title={`Thêm mới ca làm việc`}
            toggle={() => {
              !isSubmit && handClearForm(false);
            }}
          />
          <ModalBody>
            <div className="list-form-group">
              <div className="shift_name">
                <span style={{ fontSize: 16, fontWeight: "500" }}>
                  Tên ca làm việc <span style={{ color: "red" }}>*</span>
                </span>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <Input
                  id="shiftName"
                  name="shiftName"
                  label=""
                  fill={true}
                  required={false}
                  placeholder="Nhập tên ca làm việc"
                  value={shiftName}
                  onChange={(e) => {
                    const value = e.target.value;
                    setShiftName(value);
                  }}
                  // maxLength={5}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <Checkbox
                  label="Ca mặc định"
                  checked={isDefault === 1 ? true : false}
                  onChange={(e) => {
                    const value = +e.target.checked;
                    setIsDefault(value);
                  }}
                />
              </div>

              {/* <div className="shift_name">
                    <span style={{fontSize: 16, fontWeight: '500'}}>Ngày làm việc trong tuần</span>
                </div> */}
              <div className="status_active">
                <div>
                  <span style={{ fontSize: 14, fontWeight: "500" }}>Trạng thái hoạt động</span>
                </div>
                <ButtonOnOff
                  checked={active == 1 ? true : false}
                  onChange={(value) => {
                    if (value) {
                      setActive(1);
                    } else {
                      setActive(0);
                    }
                  }}
                />
              </div>

              <div className="list_day_week">
                {formData?.length > 0
                  ? formData.map((item, index) => (
                      <div key={index} className="item_day">
                        <div className="box_name_day">
                          <span className="name_day">{item.label}:</span>
                        </div>

                        <div className="box_part">
                          <div className="box_morning">
                            <span style={{ fontSize: 14, fontWeight: "500", width: "20%" }}>Buổi sáng:</span>
                            <div className="box_time">
                              <div className="time">
                                <Input
                                  id="morningStartTime"
                                  name="morningStartTime"
                                  label=""
                                  fill={false}
                                  required={false}
                                  placeholder="hh:mm"
                                  value={item.morningStartTime}
                                  onChange={(e) => handleChange(e, index, "morningStartTime")}
                                  maxLength={5}
                                />
                              </div>
                              <div>
                                <Icon name="Minus" style={{ width: 10, height: 10, fill: "#B7B8B9" }} />
                              </div>
                              <div className="time">
                                <Input
                                  id="morningEndTime"
                                  name="morningEndTime"
                                  label=""
                                  fill={false}
                                  required={false}
                                  placeholder="hh:mm"
                                  value={item.morningEndTime}
                                  onChange={(e) => handleChange(e, index, "morningEndTime")}
                                  maxLength={5}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="box_afternoon">
                            <span style={{ fontSize: 14, fontWeight: "500", width: "20%" }}>Buổi chiều:</span>
                            <div className="box_time">
                              <div className="time">
                                <Input
                                  id=""
                                  name=""
                                  label=""
                                  fill={false}
                                  required={false}
                                  placeholder="hh:mm"
                                  value={item.afternoonStartTime}
                                  onChange={(e) => handleChange(e, index, "afternoonStartTime")}
                                  maxLength={5}
                                />
                              </div>
                              <div>
                                <Icon name="Minus" style={{ width: 10, height: 10, fill: "#B7B8B9" }} />
                              </div>
                              <div className="time">
                                <Input
                                  id=""
                                  name=""
                                  label=""
                                  fill={false}
                                  required={false}
                                  placeholder="hh:mm"
                                  value={item.afternoonEndTime}
                                  onChange={(e) => handleChange(e, index, "afternoonEndTime")}
                                  maxLength={5}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
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

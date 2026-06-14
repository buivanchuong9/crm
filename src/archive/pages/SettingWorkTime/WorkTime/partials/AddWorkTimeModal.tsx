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
import "./AddWorkTimeModal.scss";
import Icon from "components/icon";
import moment from "moment";
import SelectCustom from "components/selectCustom/selectCustom";
import WorkTimeService from "services/WorkTimeService";

export default function AddWorkTimeModal(props: any) {
  const { onShow, onHide, data } = props;

  const focusedElement = useActiveElement();

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
  // const [dayOfWeek, setDayOfWeek] = useState(null);
  const [checkDayOfWeek, setCheckDayOfWeek] = useState(false);

  const values = useMemo(
    () =>
      ({
        id: data?.id ?? 0,
        name: data?.name ?? "",
        // dayOfWeek: data?.dayOfWeek ?? "",
        // isWorkingDay: data?.isWorkingDay ?? '1',
        // startTime: data?.startTime ?? "",
        // endTime: data?.endTime ?? "",
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

  // const startDay = moment(formData.values.startTime).format("DD/MM/YYYY");
  // const endDay = moment(formData.values.endTime).format("DD/MM/YYYY");

  const listFieldBasic = useMemo(
    () =>
      [
        {
          label: "Tên ca làm việc",
          name: "name",
          type: "text",
          fill: true,
          required: true,
        },
        // {
        //   name: "dayOfWeek",
        //   type: "custom",
        //   snippet: (
        //     <SelectCustom
        //       id="dayOfWeek"
        //       name="dayOfWeek"
        //       label="Ngày trong tuần"
        //       options={[
        //         {
        //           value: 1,
        //           label: 'Chủ nhật'
        //         }
        //       ]}
        //       special={true}
        //       fill={true}
        //       value={dayOfWeek}
        //       required={true}
        //       onChange={(e) => {
        //         setDayOfWeek(e);
        //         setFormData({...formData, values: {...formData.values, dayOfWeek: e.value}})
        //       }}
        //       isAsyncPaginate={false}
        //       isFormatOptionLabel={false}
        //       placeholder="Chọn ngày trong tuần"
        //       // additional={{
        //       //   page: 1,
        //       // }}
        //       // loadOptionsPaginate={loadedOptionEmployee}
        //       // formatOptionLabel={formatOptionLabelEmployee}
        //       error={checkDayOfWeek}
        //       message="Ngày trong tuần không được bỏ trống"
        //       // isLoading={data?.consultantId ? isLoadingEmployee : null}
        //     />
        //   ),
        // },
        // {
        //   label: "Ngày trong tuần",
        //   name: "dayOfWeek",
        //   type: "number",
        //   fill: true,
        //   required: true,
        // },
        // {
        //   label: "",
        //   name: "isWorkingDay",
        //   type: "radio",
        //   options:
        //       [
        //           {
        //               value: "1",
        //               label: "Ngày làm việc",
        //           },
        //           {
        //               value: "0",
        //               label: "Ngày nghỉ",
        //           },
        //       ],

        //   fill: true,
        //   required: true,
        // },
        // {
        //   label: "Thời gian bắt đầu",
        //   name: "startTime",
        //   type: "date",
        //   fill: true,
        //   required: true,
        //   icon: <Icon name="Calendar" />,
        //   iconPosition: "left",
        //   isWarning: startDay > endDay,
        //   onlyTime: true,
        //   placeholder: "Nhập thời gian bắt đầu",
        //   messageWarning: "Thời gian bắt đầu nhỏ hơn thời gian kết thúc",
        //   // onChange: (date: any) => {
        //   //     setFormData({ ...formData, startTime: moment(date).format("HH:mm") });
        //   // }
        // },
        // {
        //   label: "Thời gian kết thúc",
        //   name: "endTime",
        //   type: "date",
        //   fill: true,
        //   required: true,
        //   icon: <Icon name="Calendar" />,
        //   iconPosition: "left",
        //   isWarning: endDay < startDay,
        //   onlyTime: true,
        //   placeholder: "Nhập thời gian kết thúc",
        //   messageWarning: "Thời gian kết thúc lớn hơn thời gian bắt đầu",
        // },
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

    const errors = Validate(validations, formData, [...listFieldBasic]);
    if (Object.keys(errors).length > 0) {
      setFormData((prevState) => ({ ...prevState, errors: errors }));
      return;
    }

    setIsSubmit(true);

    const body: any = {
      ...(formData.values as any),
      // ...(data ? { id: data.id } : {}),
    };

    const response = await WorkTimeService.updateShift(body);

    if (response.code === 0) {
      showToast(`${data ? "Cập nhật" : "Tạo"} ca làm việc thành công`, "success");
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
            title: data ? "Cập nhật" : "Tạo mới",
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

  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        toggle={() => !isSubmit && onHide(false)}
        className="modal-add-work-time"
        // size="lg"
      >
        <form className="form-add-work-time" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader
            title={`${data ? "Chỉnh sửa" : "Tạo"} ca làm việc`}
            toggle={() => {
              !isSubmit && onHide(false);
            }}
          />
          <ModalBody>
            <div className="list-form-group">
              <div className="list-field-item list-field-basic">
                {listFieldBasic.map((field, index) => (
                  <FieldCustomize
                    key={index}
                    field={field}
                    handleUpdate={(value) => handleChangeValidate(value, field, formData, validations, listFieldBasic, setFormData)}
                    formData={formData}
                  />
                ))}
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

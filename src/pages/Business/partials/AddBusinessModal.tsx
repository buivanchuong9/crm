import React, { Fragment, useState, useEffect, useCallback, useMemo } from "react";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import FieldCustomize from "components/fieldCustomize/fieldCustomize";
import { IActionModal } from "model/OtherModel";
import { IFieldCustomize, IFormData, IValidation } from "model/FormModel";
import { useActiveElement } from "utils/hookCustom";
import Validate, { handleChangeValidate } from "utils/validate";
import { getPermissions, showToast } from "utils/common";
import { isDifferenceObj } from "reborn-util";
import "./AddBusinessModal.scss";
import BusinessCategoryService from "services/BusinessCategoryService";
import ButtonOnOff from "components/ButtonOnOff/ButtonOnOff";
import { is } from "bpmn-js/lib/util/ModelUtil";

export default function AddBusinessModal(props: any) {
  const { onShow, onHide, data, isView, setIsView } = props;

  const focusedElement = useActiveElement();

  const [permissions, setPermissions] = useState(getPermissions());
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);

  const values = useMemo(
    () =>
      ({
        id: data?.id ?? 0,
        location: data?.location ?? 0,
        name: data?.name ?? "",
        active: data?.active ?? 1,
      } as any),
    [data, onShow]
  );

  const [formData, setFormData] = useState<IFormData>({ values: values });

  const validations: IValidation[] = [
    {
      name: "reason",
      rules: "required",
    },
    // {
    //   name: "codd",
    //   rules: "required|min:0",
    // }
  ];

  const listFieldBasic = useMemo(
    () =>
      [
        // {
        //     label: "Mã ngành nghề kinh doanh",
        //     name: "code",
        //     type: "text",
        //     fill: true,
        //     required: true,
        // },
        {
          label: "Tên ngành nghề kinh doanh",
          name: "name",
          type: "text",
          disabled: isView,
          fill: true,
          required: true,
        },
      ] as IFieldCustomize[],
    [formData?.values, isView]
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

    const body: any = {
      ...(formData.values as any),
      ...(data ? { id: data.id } : {}),
    };

    setIsSubmit(true);

    const response = await BusinessCategoryService.update(body);

    if (response.code === 0) {
      showToast(`${data ? "Cập nhật" : "Thêm mới"} ngành nghề kinh doanh thành công`, "success");
      onHide(true);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      setIsSubmit(false);
    }
  };

  const handClearForm = () => {
    onHide(false);
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
              !isDifferenceObj(formData.values, values) ? handClearForm() : showDialogConfirmCancel();
            },
          },
          ...(isView
            ? [
                ...(permissions["LIST_BUSINESS_CATEGORY_UPDATE"] == 1 ? [
                  {
                    title: "Chỉnh sửa",
                    color: "primary",
                    type: "button",
                    callback: () => {
                      setIsView(false);
                    },
                  },
                ] : [])
                
              ]
            : [
                {
                  title: "Áp dụng",
                  type: "submit",
                  color: "primary",
                  disabled:
                    isSubmit ||
                    !isDifferenceObj(formData.values, values) ||
                    (formData.errors && Object.keys(formData.errors).length > 0) ||
                    !formData.values.name,
                  is_loading: isSubmit,
                },
              ]),
        ],
      },
    }),
    [formData, values, isSubmit, isView]
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
        className="modal-add-reason"
        size="sm"
      >
        <form className="form-add-reason-group" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader
            title={`${data ? "Chỉnh sửa" : "Thêm mới"} ngành nghề kinh doanh`}
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

                <div className="status_active">
                  <div>
                    <span style={{ fontSize: 14, fontWeight: "500" }}>Trạng thái hoạt động</span>
                  </div>
                  <ButtonOnOff
                    disabled={isView}
                    checked={formData?.values?.active == 1 ? true : false}
                    onChange={(value) => {
                      if (value) {
                        setFormData({ ...formData, values: { ...formData?.values, active: 1 } });
                      } else {
                        setFormData({ ...formData, values: { ...formData?.values, active: 0 } });
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

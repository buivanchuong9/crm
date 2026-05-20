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
import "./ModalAddProcurementType.scss";
import ButtonOnOff from "components/ButtonOnOff/ButtonOnOff";
import ProcurementTypeService from "services/ProcurementTypeService";
import SelectCustom from "components/selectCustom/selectCustom";

export default function ModalAddProcurementType(props: any) {
  const { onShow, onHide, data, isView, setIsView } = props;

  const focusedElement = useActiveElement();

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
  const [requestGroupData, setRequestGroupData] = useState(null);
  const [permissions, setPermissions] = useState(getPermissions());

  useEffect(() => {
    if(onShow && data){
      setRequestGroupData({value: data?.requestGroupId, label: data?.requestGroupName});
    }
  }, [data, onShow])
  const values = useMemo(
    () =>
    ({
      id: data?.id ?? 0,
      name: data?.name ?? "",
      requestGroupId: data?.requestGroupId ?? null,
      status: data?.status ?? 1,
    } as any),
    [data, onShow]
  );

  const [formData, setFormData] = useState<IFormData>({ values: values });  

  const validations: IValidation[] = [
    {
      name: "name",
      rules: "required",
    },
    // {
    //   name: "codd",
    //   rules: "required|min:0",
    // }
  ];

  const loadedOptionGroupProcument = async (search, loadedOptions, { page }) => {
    const param: any = {
      name: search,
      page: page,
      limit: 10,
    };

    console.log('param', param);
    const response = await ProcurementTypeService.listProcurementGroup(param);

    if (response.code === 0) {
      const dataOption = response.result.items;

      return {
        options: [
          ...(dataOption.length > 0
            ? dataOption.map((item) => {
              return {
                value: item.id,
                label: item.name,
              };
            })
            : []),
        ],
        hasMore: response.result.loadMoreAble,
        additional: {
          page: page + 1,
        },
      };
    }

    return { options: [], hasMore: false };
  };

  const listFieldBasic = useMemo(
    () =>
      [
        // {
        //     label: "Mã nguyên nhân",
        //     name: "code",
        //     type: "text",
        //     fill: true,
        //     required: true,
        // },
        {
            label: "Tên loại yêu cầu mua sắm",
            name: "name",
            type: "text",
            fill: true,
            required: true,
            disabled: isView,
        },
        {
          name: "requestGroupId",
          type: "custom",
          snippet: (
            <SelectCustom
              id="requestGroupId"
              name="requestGroupId"
              label="Nhóm yêu cầu mua sắm"
              options={[]}
              fill={true}
              value={requestGroupData}
              required={true}
              disabled={isView}
              onChange={(e) => {
                setRequestGroupData(e);
                setFormData({ ...formData, values: { ...formData?.values, requestGroupId: e.value } });
              }}
              isAsyncPaginate={true}
              isFormatOptionLabel={true}
              placeholder="Chọn nhóm yêu cầu mua sắm"
              additional={{
                page: 1,
              }}
              loadOptionsPaginate={loadedOptionGroupProcument}
              // formatOptionLabel={formatOptionLabelEmployee}
              // error={checkFieldEmployee}
              // message="Người phụ trách không được bỏ trống"
            />
          ),
        },
      ] as IFieldCustomize[],
    [formData?.values, requestGroupData, isView]
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
      ...(data ? { id: data.id } : {}),
    };

    const response = await ProcurementTypeService.update(body);

    if (response.code === 0) {
      showToast(`${data ? "Cập nhật" : "Thêm mới"} loại yêu cầu mua sắm thành công`, "success");
      handClearForm(true);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      setIsSubmit(false);
    }
  };

  const handClearForm = (acc) => {
    onHide(acc);
    setRequestGroupData(null);
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
              !isDifferenceObj(formData.values, values) ? handClearForm(false) : showDialogConfirmCancel();
            },
          },
          ...(isView
            ? [
                ...(permissions["LIST_PURCHASE_REQUEST_TYPE_UPDATE"] == 1 ? [
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
                disabled: isSubmit 
                    || !isDifferenceObj(formData.values, values) 
                    || (formData.errors && Object.keys(formData.errors).length > 0)
                    || !formData.values.name.trim()
                    || !formData.values.requestGroupId,
                is_loading: isSubmit,
              },
              ] as any),
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
        className="modal-add-procurement-type"
        size="sm"
      >
        <form className="form-add-procurement-type-group" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader
            title={`${isView ? 'Xem chi tiết' : data ? "Chỉnh sửa" : "Thêm mới"} loại yêu cầu mua sắm`}
            toggle={() => {
              !isSubmit && handClearForm(false);
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
                    <span style={{fontSize: 14, fontWeight:'500'}}>Trạng thái hoạt động</span>
                  </div>
                  <ButtonOnOff
                    disabled={isView}
                    checked={formData?.values?.status == 1 ? true : false}
                    onChange={(value) => {
                      if (value) {
                        setFormData({ ...formData, values: { ...formData?.values, status: 1 } });
                      } else {
                        setFormData({ ...formData, values: { ...formData?.values, status: 0 } });
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

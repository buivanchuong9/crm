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
import "./ModalAddWorkCategory.scss";
import ButtonOnOff from "components/ButtonOnOff/ButtonOnOff";
import UnitService from "services/UnitService";
import MaterialService from "services/MaterialService";
import SelectCustom from "components/selectCustom/selectCustom";
import WorkCategoryService from "services/WorkCategoryService";

export default function ModalAddWorkCategory(props: any) {
  const { onShow, onHide, data, isView, setIsView } = props;
  console.log('data', data);

  const focusedElement = useActiveElement();
  const [permissions, setPermissions] = useState(getPermissions());
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
  const [dataUnit, setDataUnit] = useState(null);
  useEffect(() => {
    if(data?.unitId && onShow){
      setDataUnit({value: data.unitId, label: data.unitCode});
    }
  }, [data, onShow]);

  const values = useMemo(
    () =>
    ({
      id: data?.id ?? 0,
      name: data?.name ?? "",
      code: data?.code ?? "",
      unitId: data?.unitId ?? "",
      active: data?.active ?? 1,
    } as any),
    [data, onShow]
  );

  const [formData, setFormData] = useState<IFormData>({ values: values });  

  const validations: IValidation[] = [
    {
        name: "code",
        rules: "required",
    },
    {
        name: "name",
        rules: "required",
    },
  ];

  const loadedOptionUnit = async (search, loadedOptions, { page }) => {
    const param: any = {
      name: search,
      page: page,
      limit: 10,
      status: 1
    };

    const response = await UnitService.list(param);

    if (response.code === 0) {
      const dataOption = response.result.items;

      return {
        options: [
          ...(dataOption.length > 0
            ? dataOption.map((item) => {
                return {
                  value: item.id,
                  label: item.code,
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
        {
            label: "Mã công việc",
            name: "code",
            type: "text",
            fill: true,
            required: true,
            disabled: isView || data?.used === 1,
        },
        {
            label: "Tên công việc",
            name: "name",
            type: "text",
            fill: true,
            required: true,
            disabled: isView,
        },
        {
            name: "unitId",
            type: "custom",
            snippet: (
              <SelectCustom
                id="unitId"
                name="unitId"
                label="Đon vị tính"
                fill={true}
                disabled= {isView}
                required={true}
                options={[]}
                value={dataUnit}
                onChange={(e) => {
                    setDataUnit(e);
                    setFormData({...formData, values: {...formData.values, unitId: e.value}});
                }}
                isAsyncPaginate={true}
                isFormatOptionLabel={true}
                loadOptionsPaginate={loadedOptionUnit}
                placeholder="Chọn đơn vị tính"
                additional={{
                  page: 1,
                }}
                // formatOptionLabel={formatOptionLabelParticipants}
              />
            ),
          },
      ] as IFieldCustomize[],
    [formData?.values, dataUnit, isView, data]
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

    const response = await WorkCategoryService.update(body);

    if (response.code === 0) {
      showToast(`${data ? "Cập nhật" : "Thêm mới"} công việc thành công`, "success");
      handClearForm(true);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      setIsSubmit(false);
    }
  };

  const handClearForm = (acc) => {
    onHide(acc);
    setDataUnit(null);
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
                ...(permissions["LIST_WORK_CATEGORY_UPDATE"] == 1 ? [
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
                        || !formData.values.code.trim()
                        || !formData.values.name.trim()
                        || !dataUnit,
                    is_loading: isSubmit,
                  },
            ] as any),
        ],
      },
    }),
    [formData, values, isSubmit, isView, dataUnit]
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
        className="modal-add-work-category"
        size="sm"
      >
        <form className="form-add-work-category-group" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader
            title={`${isView ? 'Xem chi tiết' : data ? "Chỉnh sửa" : "Thêm mới"} công việc`}
            toggle={() => {
              !isSubmit && handClearForm(false);
            }}
          />
          <ModalBody>
            <div className="list-form-group">
              <div className="list-field-item list-unit-basic">
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
                    checked={formData?.values?.active == 1 ? true : false}
                    disabled={isView}
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

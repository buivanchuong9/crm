import React, { Fragment, useState, useEffect, useCallback, useMemo, useContext } from "react";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import FieldCustomize from "components/fieldCustomize/fieldCustomize";
import { IActionModal } from "model/OtherModel";
import { IFieldCustomize, IFormData, IValidation } from "model/FormModel";
import { useActiveElement } from "utils/hookCustom";
import Validate, { handleChangeValidate } from "utils/validate";
import { showToast } from "utils/common";
import { isDifferenceObj } from "reborn-util";
import "./ModalAddProjectRealty.scss";
import ButtonOnOff from "components/ButtonOnOff/ButtonOnOff";
import SelectCustom from "components/selectCustom/selectCustom";
import AreaService from "services/AreaService";
import InvestorService from "services/InvestorService";
import ProjectRealtyService from "services/ProjectRealtyService";
import ProjectCatalogService from "services/ProjectCatalogService";
import { ContextType, UserContext } from "contexts/userContext";
import DepartmentService from "services/DepartmentService";

export default function ModalAddProjectRealty(props: any) {
  const { onShow, onHide, data } = props;

  const focusedElement = useActiveElement();
  const { dataBranch } = useContext(UserContext) as ContextType;

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
  const [dataCity, setDataCity] = useState(null);
  const [dataDistrict, setDataDistrict] = useState(null);
  const [dataSubdistrict, setDataSubdistrict] = useState(null);
  const [dataProjectCatolog, setDataProjectCatalog] = useState(null);
  const [dataInvestor, setDataInvestor] = useState(null);
  const [dataDepartment, setDataDepartment] = useState(null);

  useEffect(() => {
    if (data && onShow) {
      if (data.cityId) {
        setDataCity({ value: data.cityId, label: data.cityName });
      }
      if (data.districtId) {
        setDataDistrict({ value: data.districtId, label: data.districtName });
      }
      if (data.subdistrictId) {
        setDataSubdistrict({ value: data.subdistrictId, label: data.subdistrictName });
      }
      if (data.pclId) {
        setDataProjectCatalog({ value: data.pclId, label: data.pclName });
      }
      if (data.investorId) {
        setDataInvestor({ value: data.investorId, label: data.investorName });
      }
      if (data.departmentId) {
        setDataDepartment({ value: data.departmentId, label: data.departmentName });
      }
    }
  }, [data, onShow]);

  const values = useMemo(
    () =>
      ({
        id: data?.id ?? 0,
        name: data?.name ?? "",
        code: data?.code ?? "",
        address: data?.address ?? "",
        cityId: data?.cityId ?? "",
        districtId: data?.districtId ?? "",
        subdistrictId: data?.subdistrictId ?? "",
        contact: data?.contact ?? "",
        pclId: data?.pclId ?? "",
        investorId: data?.investorId ?? "",
        departmentId: data?.departmentId ?? "",
        totalArea: data?.totalArea ?? "",
        status: data?.status ?? 1,
      } as any),
    [data, onShow]
  );

  const [formData, setFormData] = useState<IFormData>({ values: values });
  // console.log('formData', formData);

  const validations: IValidation[] = [
    {
      name: "taxCode",
      rules: "required",
    },
    {
      name: "name",
      rules: "required",
    },
    {
      name: "address",
      rules: "required",
    },
  ];

  const loadedOptionCity = async (search, loadedOptions, { page }) => {
    const param: any = {
      name: search,
      page: page,
      limit: 100,
      parentId: 0,
    };

    const response = await AreaService.list(param);

    if (response.code === 0) {
      const dataOption = response.result;

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

  const loadedOptionDistrict = async (search, loadedOptions, { page }) => {
    const param: any = {
      name: search,
      page: page,
      limit: 1000,
      parentId: dataCity?.value,
    };

    const response = await AreaService.list(param);

    if (response.code === 0) {
      const dataOption = response.result;

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

  const loadedOptionSubdistrict = async (search, loadedOptions, { page }) => {
    const param: any = {
      name: search,
      page: page,
      limit: 1000,
      parentId: dataDistrict?.value,
    };

    const response = await AreaService.list(param);

    if (response.code === 0) {
      const dataOption = response.result;

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

  useEffect(() => {
    if (dataCity?.value) {
      loadedOptionDistrict("", undefined, { page: 1 });
    }
  }, [dataCity]);

  useEffect(() => {
    if (dataDistrict?.value) {
      loadedOptionSubdistrict("", undefined, { page: 1 });
    }
  }, [dataDistrict]);

  const loadedOptionProjectCatalog = async (search, loadedOptions, { page }) => {
    const param: any = {
      name: search,
      page: page,
      limit: 10,
      status: 1,
    };

    const response = await ProjectCatalogService.list(param);

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

  const loadedOptionInvestor = async (search, loadedOptions, { page }) => {
    const param: any = {
      name: search,
      page: page,
      limit: 10,
      status: 1,
    };

    const response = await InvestorService.list(param);

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

  const loadedOptionDepartment = async (search, loadedOptions, { page }) => {
    const param: any = {
      name: search,
      page: page,
      limit: 1000,
      branchId: dataBranch.value,
    };

    const response = await DepartmentService.list(param);

    if (response.code === 0) {
      const dataOption = response.result;

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
        {
          label: "Mã dự án",
          name: "code",
          type: "text",
          fill: true,
          required: true,
        },
        {
          label: "Tên dự án",
          name: "name",
          type: "text",
          fill: true,
          required: true,
        },
        {
          name: "cityId",
          type: "custom",
          snippet: (
            <SelectCustom
              id="cityId"
              name="cityId"
              label="Tỉnh/Thành phố"
              fill={true}
              options={[]}
              value={dataCity}
              onChange={(e) => {
                setDataCity(e);
                setDataDistrict(null);
                setDataSubdistrict(null);
                setFormData({ ...formData, values: { ...formData.values, cityId: e.value, districtId: "", subdistrictId: "" } });
              }}
              isAsyncPaginate={true}
              isFormatOptionLabel={true}
              loadOptionsPaginate={loadedOptionCity}
              placeholder="Chọn tỉnh/thành phố"
              additional={{
                page: 1,
              }}
              // formatOptionLabel={formatOptionLabelParticipants}
            />
          ),
        },
        {
          name: "districtId",
          type: "custom",
          snippet: (
            <SelectCustom
              key={dataCity?.value}
              id="districtId"
              name="districtId"
              label="Quận/huyện"
              fill={true}
              options={[]}
              value={dataDistrict}
              onChange={(e) => {
                setDataDistrict(e);
                setDataSubdistrict(null);
                setFormData({ ...formData, values: { ...formData.values, districtId: e.value, subdistrictId: "" } });
              }}
              isAsyncPaginate={true}
              isFormatOptionLabel={true}
              loadOptionsPaginate={loadedOptionDistrict}
              placeholder="Chọn quận/huyện"
              additional={{
                page: 1,
              }}
              disabled={dataCity?.value ? false : true}
              // formatOptionLabel={formatOptionLabelParticipants}
            />
          ),
        },
        {
          name: "subdistrictId",
          type: "custom",
          snippet: (
            <SelectCustom
              key={dataDistrict?.value}
              id="subdistrictId"
              name="subdistrictId"
              label="Phường/xã"
              fill={true}
              options={[]}
              value={dataSubdistrict}
              onChange={(e) => {
                setDataSubdistrict(e);
                setFormData({ ...formData, values: { ...formData.values, subdistrictId: e.value } });
              }}
              isAsyncPaginate={true}
              isFormatOptionLabel={true}
              loadOptionsPaginate={loadedOptionSubdistrict}
              placeholder="Chọn phường/xã"
              additional={{
                page: 1,
              }}
              disabled={dataDistrict?.value ? false : true}
              // formatOptionLabel={formatOptionLabelParticipants}
            />
          ),
        },
        {
          label: "Địa chỉ",
          name: "address",
          type: "text",
          fill: true,
          required: true,
        },
        {
          name: "pclId",
          type: "custom",
          snippet: (
            <SelectCustom
              id="pclId"
              name="pclId"
              label="Loại dự án"
              fill={true}
              options={[]}
              value={dataProjectCatolog}
              onChange={(e) => {
                setDataProjectCatalog(e);
                setFormData({ ...formData, values: { ...formData.values, pclId: e.value } });
              }}
              isAsyncPaginate={true}
              isFormatOptionLabel={true}
              loadOptionsPaginate={loadedOptionProjectCatalog}
              placeholder="Chọn loại dự án"
              additional={{
                page: 1,
              }}
              // formatOptionLabel={formatOptionLabelParticipants}
            />
          ),
        },
        {
          name: "investorId",
          type: "custom",
          snippet: (
            <SelectCustom
              id="investorId"
              name="investorId"
              label="Chủ đầu tư"
              fill={true}
              options={[]}
              value={dataInvestor}
              onChange={(e) => {
                setDataInvestor(e);
                setFormData({ ...formData, values: { ...formData.values, investorId: e.value } });
              }}
              isAsyncPaginate={true}
              isFormatOptionLabel={true}
              loadOptionsPaginate={loadedOptionInvestor}
              placeholder="Chọn chủ đầu tư"
              additional={{
                page: 1,
              }}
              // formatOptionLabel={formatOptionLabelParticipants}
            />
          ),
        },

        {
          name: "departmentId",
          type: "custom",
          snippet: (
            <SelectCustom
              id="departmentId"
              name="departmentId"
              label="Phòng/ban quản lý"
              fill={true}
              options={[]}
              value={dataDepartment}
              onChange={(e) => {
                setDataDepartment(e);
                setFormData({ ...formData, values: { ...formData.values, departmentId: e.value } });
              }}
              isAsyncPaginate={true}
              isFormatOptionLabel={true}
              loadOptionsPaginate={loadedOptionDepartment}
              placeholder="Chọn phòng/ban quản lý"
              additional={{
                page: 1,
              }}
              // formatOptionLabel={formatOptionLabelParticipants}
            />
          ),
        },

        {
          label: "Quy mô dự án",
          name: "totalArea",
          type: "text",
          fill: true,
          required: false,
        },
      ] as IFieldCustomize[],
    [formData?.values, dataCity, dataDistrict, dataSubdistrict, dataProjectCatolog, dataDepartment, dataInvestor]
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

    const response = await ProjectRealtyService.update(body);

    if (response.code === 0) {
      showToast(`${data ? "Cập nhật" : "Thêm mới"} dự án thành công`, "success");
      handClearForm(true);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      setIsSubmit(false);
    }
  };

  const handClearForm = (acc) => {
    onHide(acc);
    setDataCity(null);
    setDataDistrict(null);
    setDataSubdistrict(null);
    setDataProjectCatalog(null);
    setDataInvestor(null);
    setDataDepartment(null);
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
          {
            title: "Áp dụng",
            type: "submit",
            color: "primary",
            disabled:
              isSubmit ||
              !isDifferenceObj(formData.values, values) ||
              (formData.errors && Object.keys(formData.errors).length > 0) ||
              !formData.values.code ||
              !formData.values.name ||
              !formData.values.address,
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
        toggle={() => !isSubmit && handClearForm(false)}
        className="modal-add-project-reatly"
        size="sm"
      >
        <form className="form-add-project-reatly-group" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader
            title={`${data ? "Chỉnh sửa" : "Thêm mới"} dự án`}
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
                    <span style={{ fontSize: 14, fontWeight: "500" }}>Trạng thái hoạt động</span>
                  </div>
                  <ButtonOnOff
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

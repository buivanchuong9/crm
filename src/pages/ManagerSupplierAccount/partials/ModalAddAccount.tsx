import React, { Fragment, useState, useEffect, useCallback, useMemo } from "react";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import FieldCustomize from "components/fieldCustomize/fieldCustomize";
import { IFieldCustomize, IFormData, IValidation } from "model/FormModel";
import { useActiveElement } from "utils/hookCustom";
import Validate, { handleChangeValidate } from "utils/validate";
import { formatFileSize, showToast } from "utils/common";
import { isDifferenceObj, trimContent } from "reborn-util";
import "./ModalAddAccount.scss";
import ButtonOnOff from "components/ButtonOnOff/ButtonOnOff";
import SelectCustom from "components/selectCustom/selectCustom";
import SupplierService from "services/SupplierService";
import FileService from "services/FileService";
import { uploadDocumentFormData } from "utils/document";
import _, { at, get, set } from "lodash";
import { use } from "i18next";
import ModalViewDocument from "pages/MiddleWork/partials/ListWork/partials/DetailWork/partials/ModalViewDocument/ModalViewDocument";
import ModalAcceptAccount from "../ModalAcceptAccount/ModalAcceptAccount";
import SupplierAccountService from "services/SupplierAccountService";

export default function ModalAddAccount(props: any) {
  const { onShow, onHide, data, setIsView, isView, dataAccount } = props;
  console.log("dataAccount", dataAccount);

  const focusedElement = useActiveElement();

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
  const [dataSupplier, setDataSupplier] = useState(null);
  const [isAcceptAccount, setIsAcceptAccount] = useState(false);
  const [typeAccept, setTypeAccept] = useState(null);

  useEffect(() => {
    if (dataAccount && onShow) {
      setDataSupplier({ value: dataAccount.organizationId, label: dataAccount.organizationId });
      setDataContact({ value: dataAccount.contactId, label: dataAccount.contactId });
      getDetaitOrg(dataAccount.organizationId);
    }
  }, [dataAccount, onShow]);

  const getDetaitOrg = async (id) => {
    const response = await SupplierService.detail(id);

    if (response.code == 0) {
      const result = response.result;
      const contactOrg = result.contactOrg ? JSON.parse(result.contactOrg) : [];
      if (contactOrg.length > 0) {
        const contactList = contactOrg.map((item) => {
          return { value: item.id, label: item.id + " - " + item.name, name: item.name, phone: item.phone };
        });
        setOptionContact(contactList);
      }
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  const values = useMemo(
    () =>
      ({
        id: dataAccount?.id ?? 0,
        name: data?.orgName ?? dataAccount?.organizationName ?? "",
        taxCode: data?.taxCode ?? dataAccount?.organizationTaxCode ?? "",
        contactName: data?.contactName ?? dataAccount?.name ?? "",
        contactPhone: data?.contactPhone ?? dataAccount?.phone ?? "",
        organizationId: data?.organizationId ?? dataAccount?.organizationId ?? "",
        email: data?.contactEmail ?? dataAccount?.email ?? "",
        contactId: data?.contactId ?? dataAccount?.contactId ?? "",
        supplierId: data?.id ?? dataAccount?.supplierId ?? "",
        userId: data?.userId ?? dataAccount?.userId ?? "",
        active: data?.active ?? dataAccount?.active ?? 1,
      } as any),
    [data, onShow, dataAccount]
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
  ];

  const loadedOptionSupplier = async (search, loadedOptions, { page }) => {
    const param: any = {
      name: search,
      page: page,
      limit: 10,
    };

    const response = await SupplierService.list(param);

    if (response.code === 0) {
      const dataOption = response.result.items;

      return {
        options: [
          ...(dataOption.length > 0
            ? dataOption.map((item) => {
                return {
                  value: item.id,
                  label: item.id + " - " + item.name,
                  listContact: JSON.parse(item.contactOrg),
                  taxCode: item.taxCode,
                  name: item.name,
                  phone: item.phone,
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

  const [dataContact, setDataContact] = useState(null);
  const [optionContact, setOptionContact] = useState([]);
  console.log("optionContact", optionContact);

  const listFieldBasic = useMemo(
    () =>
      [
        {
          label: "Email/Tên tài khoản",
          name: "email",
          type: "text",
          disabled: isView,
          fill: true,
          required: true,
        },
        {
          name: "organizationId",
          type: "custom",
          snippet: (
            <SelectCustom
              id="organizationId"
              name="orgId"
              label="Mã nhà thầu"
              fill={true}
              options={[]}
              value={dataSupplier}
              disabled={isView}
              required={true}
              onChange={(e) => {
                setDataSupplier({ value: e.value, label: e.value });
                setDataContact(null);
                setFormData({
                  ...formData,
                  values: {
                    ...formData.values,
                    organizationId: e.value,
                    taxCode: e.taxCode,
                    name: e.name,
                    contactId: "",
                    contactName: "",
                    contactPhone: "",
                  },
                });
                setOptionContact(
                  e.listContact.map((item) => ({ value: item.id, label: item.id + " - " + item.name, name: item.name, phone: item.phone }))
                );
              }}
              isAsyncPaginate={true}
              isFormatOptionLabel={true}
              loadOptionsPaginate={loadedOptionSupplier}
              placeholder="Chọn nhà thầu"
              additional={{
                page: 1,
              }}
              // formatOptionLabel={formatOptionLabel}
            />
          ),
        },
        {
          label: "Mã số thuế",
          name: "taxCode",
          disabled: true,
          type: "number",
          thousandSeparator: false,
          fill: true,
          // required: true,
        },
        {
          label: "Tên nhà thầu",
          name: "name",
          disabled: true,
          type: "text",
          fill: true,
        },

        {
          name: "contactId",
          type: "custom",
          snippet: (
            <SelectCustom
              id="contactId"
              name="contactId"
              label="Mã người liên hệ"
              fill={true}
              options={optionContact}
              special={true}
              value={dataContact}
              disabled={!dataSupplier || isView}
              required={true}
              onChange={(e) => {
                setDataContact({ value: e.value, label: e.value });
                setFormData({ ...formData, values: { ...formData.values, contactId: e.value, contactName: e.name, contactPhone: e.phone } });
              }}
              isAsyncPaginate={false}
              isFormatOptionLabel={false}
              // loadOptionsPaginate={loadedOptionSupplier}
              placeholder="Chọn mã người liên hệ"
              // additional={{
              //   page: 1,
              // }}
              // formatOptionLabel={formatOptionLabel}
            />
          ),
        },
        // {
        //   name: "contactId",
        //   type: "select",
        //   label: "Mã người liên hệ",
        //   options: optionContact,
        //   disabled: !dataSupplier,
        //   fill: true,
        // },
        {
          label: "Tên người liên hệ",
          name: "contactName",
          type: "text",
          disabled: true,
          fill: true,
          required: false,
        },
        {
          label: "Số điện thoại người liên hệ",
          name: "contactPhone",
          type: "text",
          disabled: true,
          fill: true,
          required: false,
        },
      ] as IFieldCustomize[],
    [formData?.values, dataSupplier, isView, optionContact, dataContact]
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

    if (formData.values.active === 1) {
      setTypeAccept("active");
      setIsAcceptAccount(true);
      return;
    }

    onActive();
  };

  const onActive = async () => {
    const body: any = {
      id: formData.values.id,
      organizationId: formData.values.organizationId,
      email: formData.values.email,
      contactId: formData.values.contactId,
      supplierId: formData.values.supplierId,
      active: formData.values.active,
    };

    setIsSubmit(true);

    const response = await SupplierAccountService.update(body);

    if (response.code === 0) {
      showToast(`${data ? "Cập nhật" : "Thêm mới"} tài khoản`, "success");
      handClearForm(true);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      setIsSubmit(false);
    }
  };

  const handClearForm = (acc) => {
    onHide(acc);
    setDataSupplier(null);
    setDataContact(null);
    setOptionContact([]);
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

          ...(dataAccount?.active === 1
            ? [
                {
                  title: "Đổi mật khẩu",
                  type: "button",
                  color: "primary",
                  variant: "outline",
                  callback: () => {
                    setIsAcceptAccount(true);
                    setTypeAccept("change");
                  },
                },
              ]
            : []),

          ...(dataAccount?.active === 1
            ? []
            : [
                ...(isView
                  ? [
                      {
                        title: "Chỉnh sửa",
                        type: "button",
                        color: "primary",
                        callback: () => setIsView(false),
                      },
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
                          !formData.values.taxCode ||
                          !formData.values.name ||
                          !formData.values.organizationId ||
                          !formData.values.contactId ||
                          !formData.values.email,
                        is_loading: isSubmit,
                      },
                    ]),
              ]),
        ],
      },
    }),
    [formData, values, isSubmit, data, isView, dataAccount]
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
        className="modal-add-account"
        size="md"
      >
        <form className="form-add-account-group" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader
            title={`${isView ? "Xem chi tiết" : dataAccount ? "Chỉnh sửa" : "Thêm mới"} tài khoản`}
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

      <ModalAcceptAccount
        onShow={isAcceptAccount}
        data={dataAccount}
        typeAccept={typeAccept}
        isAddNew={true}
        onHide={(reload) => {
          if (reload) {
            // getListInvestor(params);
            onActive();
          }
          setIsAcceptAccount(false);
          setTypeAccept(null);
        }}
      />

      <Dialog content={contentDialog} isOpen={showDialog} />
    </Fragment>
  );
}

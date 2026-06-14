import React, { Fragment, useState, useEffect, useCallback, useMemo } from "react";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import FieldCustomize from "components/fieldCustomize/fieldCustomize";
import { IActionModal } from "model/OtherModel";
import { IFieldCustomize, IFormData, IValidation } from "model/FormModel";
import { useActiveElement } from "utils/hookCustom";
import Validate, { handleChangeValidate } from "utils/validate";
import { formatFileSize, getPermissions, showToast } from "utils/common";
import { isDifferenceObj, trimContent } from "reborn-util";
import "./ModalAddSupplier.scss";
import ButtonOnOff from "components/ButtonOnOff/ButtonOnOff";
import SelectCustom from "components/selectCustom/selectCustom";
import AreaService from "services/AreaService";
import SupplierService from "services/SupplierService";
import Input from "components/input/input";
import Button from "components/button/button";
import Icon from "components/icon";
import TextArea from "components/textarea/textarea";
import FileUpload from "components/fileUpload/fileUpload";
import FileService from "services/FileService";
import { uploadDocumentFormData } from "utils/document";
import BusinessCategoryService from "services/BusinessCategoryService";
import _, { at, get, set } from "lodash";
import { use } from "i18next";
import ModalViewDocument from "pages/MiddleWork/partials/ListWork/partials/DetailWork/partials/ModalViewDocument/ModalViewDocument";

export default function ModalAddSupplier(props: any) {
  const { onShow, onHide, data, setIsView, isView, showFromGrid, supplierId } = props;

  const focusedElement = useActiveElement();

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
  const [dataCity, setDataCity] = useState(null);
  const [dataDistrict, setDataDistrict] = useState(null);
  const [dataSubdistrict, setDataSubdistrict] = useState(null);
  const [dataBusiness, setDataBusiness] = useState(null);
  const [permissions, setPermissions] = useState(getPermissions());
  const [listContact, setListContact] = useState([
    {
      id: 0,
      name: "",
      position: "",
      phone: "",
      email: "",
      isDefault: 1,
    },
  ]);
  const [profile, setProfile] = useState({
    note: "",
    attachments: [],
  });

  const [listAttactment, setListAttactment] = useState([]);

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
      if (data.businessId) {
        setDataBusiness({ value: data.businessId, label: data.businessName });
      }
      setProfile(data?.capacityProfile ? JSON.parse(data.capacityProfile) : { note: "", attachments: [] });
      setListContact(data?.contactOrg ? JSON.parse(data.contactOrg) : []);
      setListAttactment(data?.capacityProfile ? JSON.parse(data.capacityProfile)?.attachments : []);
    }
  }, [data, onShow]);

  const values = useMemo(
    () =>
      ({
        id: data?.id ?? 0,
        name: data?.name ?? "",
        taxCode: data?.taxCode ?? "",
        address: data?.address ?? "",
        cityId: data?.cityId ?? "",
        districtId: data?.districtId ?? "",
        subdistrictId: data?.subdistrictId ?? "",
        contactOrg: data?.contactOrg ?? "",
        capacityProfile: data?.capacityProfile ?? "",
        type: data?.type == 2 ? "2" : "1",
        legalRepresentative: data?.legalRepresentative ?? "",
        businessId: data?.businessId ?? "",
        businessName: data?.businessName ?? "",
        active: data?.active ?? 1,
        cityName: data?.cityName ?? "",
        districtName: data?.districtName ?? "",
        subdistrictName: data?.subdistrictName ?? "",
      } as any),
    [data, onShow]
  );

  const [formData, setFormData] = useState<IFormData>({ values: values });

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

  const loadedOptionBusiness = async (search, loadedOptions, { page }) => {
    const param: any = {
      name: search,
      page: page,
      limit: 100,
      active: 1,
    };

    const response = await BusinessCategoryService.list(param);

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

  const listFieldBasic = useMemo(
    () =>
      [
        {
          label: "Loại nhà cung cấp",
          name: "type",
          type: "radio",
          disabled: isView,
          options: [
            {
              value: "1",
              label: "Tổ chức",
            },
            {
              value: "2",
              label: "Cá nhân",
            },
          ],
        },
        {
          label: "Tên nhà cung cấp",
          name: "name",
          type: "text",
          disabled: isView,
          fill: true,
          required: true,
        },
        {
          label: "Mã số thuế/CCCD",
          name: "taxCode",
          disabled: isView,
          type: "number",
          thousandSeparator: false,
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
              disabled={isView}
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
              disabled={isView || (dataCity?.value ? false : true)}
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
              disabled={isView || (dataDistrict?.value ? false : true)}
              // formatOptionLabel={formatOptionLabelParticipants}
            />
          ),
        },
        {
          label: "Địa chỉ",
          name: "address",
          type: "text",
          disabled: isView,
          fill: true,
          required: false,
        },
        {
          label: "Đại diện pháp lý",
          name: "legalRepresentative",
          type: "text",
          disabled: isView,
          fill: true,
          required: false,
        },
        {
          name: "businessId",
          type: "custom",
          snippet: (
            <SelectCustom
              id="businessId"
              name="businessId"
              label="Ngành nghề kinh doanh chính"
              fill={true}
              options={[]}
              value={dataBusiness}
              disabled={isView}
              onChange={(e) => {
                setDataBusiness(e);
                setFormData({ ...formData, values: { ...formData.values, businessId: e.value } });
              }}
              isAsyncPaginate={true}
              isFormatOptionLabel={true}
              loadOptionsPaginate={loadedOptionBusiness}
              placeholder="Chọn ngành nghề kinh doanh chính"
              additional={{
                page: 1,
              }}
              // formatOptionLabel={formatOptionLabelParticipants}
            />
          ),
        },
      ] as IFieldCustomize[],
    [formData?.values, dataCity, dataDistrict, dataSubdistrict, dataBusiness, isView]
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

    let listContactTemp = listContact.map((item) => {
      return {
        ...item,
        id: item.id ? item.id : 0,
      };
    });

    const body: any = {
      ...(formData.values as any),
      ...(data ? { id: data.id } : {}),
      ...(profile ? { capacityProfile: JSON.stringify(profile) } : {}),
      ...(listContactTemp ? { contactOrg: JSON.stringify(listContactTemp) } : {}),
    };

    setIsSubmit(true);

    const response = await SupplierService.update(body);

    if (response.code === 0) {
      showToast(`${data ? "Cập nhật" : "Thêm mới"} nhà cung cấp thành công`, "success");
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
    setDataBusiness(null);
    setProfile({ note: "", attachments: [] });
    setListContact([
      {
        id: 0,
        name: "",
        position: "",
        phone: "",
        email: "",
        isDefault: 1,
      },
    ]);
    setListAttactment([]);
    setHeaderTab(1);
  };

  const actions = useMemo<any>(
    () => ({
      actions_right: {
        buttons: [
          {
            title: showFromGrid ? "Đóng" : "Hủy",
            color: "primary",
            variant: "outline",
            disabled: isSubmit,
            callback: () => {
              !isDifferenceObj(formData.values, values) ? handClearForm(false) : showDialogConfirmCancel();
            },
          },
          ...(showFromGrid
            ? []
            : [
                ...(isView
                  ? [
                      ...(permissions["LIST_SUPPLIER_UPDATE"] == 1 ? [
                        {
                          title: "Chỉnh sửa",
                          type: "button",
                          color: "primary",
                          callback: () => setIsView(false),
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
                          (!isDifferenceObj(formData.values, values) &&
                            (data?.capacityProfile ? _.isEqual(JSON.parse(data.capacityProfile), profile) : "") &&
                            (data?.contactOrg ? _.isEqual(JSON.parse(data.contactOrg), listContact) : "")) ||
                          (formData.errors && Object.keys(formData.errors).length > 0) ||
                          !formData.values.taxCode ||
                          !formData.values.name,
                        is_loading: isSubmit,
                      },
                    ]),
              ]),
        ],
      },
    }),
    [formData, values, isSubmit, profile, data, listContact, isView, showFromGrid]
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

  const [headerTab, setHeaderTab] = useState(1);
  const dataHeaderTab = [
    {
      value: 1,
      label: "Thông tin chung",
    },
    {
      value: 2,
      label: "Người liên hệ",
    },
    {
      value: 3,
      label: "Hồ sơ năng lực",
    },
  ];

  const baseContact = {
    name: "",
    position: "",
    phone: "",
    email: "",
    isDefault: 0,
  };

  useEffect(() => {
    if (listAttactment?.length) {
      setProfile({ ...profile, attachments: listAttactment });
    }
  }, [listAttactment]);
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);
  const [showProgress, setShowProgress] = useState<number>(0);

  const handleRemoveImageItem = (idx) => {
    const result = [...listAttactment];
    result.splice(idx, 1);
    setListAttactment(result);
  };

  useEffect(() => {
    if (isLoadingFile === false) {
      setShowProgress(0);
    }
  }, [isLoadingFile]);

  const processUploadSuccess = (data) => {
    const result = data?.fileUrl;
    const changeResult = {
      url: result,
      type: "image",
    };
    setListAttactment([...listAttactment, changeResult]);
  };

  const handUploadFile = async (file) => {
    await FileService.uploadFile({ data: file, onSuccess: processUploadSuccess });
  };

  const onSuccess = (data) => {
    if (data) {
      const result = {
        fileUrl: data.fileUrl,
        type: data.extension,
        fileName: data.fileName,
        fileSize: data.fileSize
      };

      setListAttactment([result, ...listAttactment]);
      setIsLoadingFile(false);
    }
  };

  const onError = (message) => {
    setIsLoadingFile(false);
    showToast(message.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau !", "error");
  };

  const onProgress = (percent) => {
    if (percent) {
      setShowProgress(percent.toFixed(0));
    }
  };
  //! đoạn này xử lý hình ảnh
  const handleUploadDocument = (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    const checkFile = file.type;
    setIsLoadingFile(true);
    if (checkFile.startsWith("image")) {
      handUploadFile(file);
    }

    if (checkFile.startsWith("application")) {
      uploadDocumentFormData(file, onSuccess, onError, onProgress);
    }
  };

  const [isModalViewDocument, setIsModalViewDocument] = useState(false);
  const [dataDoc, setDataDoc] = useState(null);

  const handleDeleteContact = async (id, index) => {
    if (id) {
      const response = await SupplierService.deleteContact(id);
      if (response.code === 0) {
        setListContact(listContact.filter((item, idx) => idx !== index));
        showToast("Xóa người liên hệ thành công", "success");
      } else {
        showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      }
    } else {
      setListContact(listContact.filter((item, idx) => idx !== index));
    }
  };

  useEffect(() => {
    if (showFromGrid) {
      setHeaderTab(3);
      if (supplierId) {
        getDetailSupplier(supplierId);
      }
    }
  }, [showFromGrid, onShow]);

  const getDetailSupplier = async (id) => {
    const response = await SupplierService.detail(id);
    if (response.code === 0) {
      const result = response.result;
      if (result.cityId) {
        setDataCity({ value: result.cityId, label: result.cityName });
      }
      if (result.districtId) {
        setDataDistrict({ value: result.districtId, label: result.districtName });
      }
      if (result.subdistrictId) {
        setDataSubdistrict({ value: result.subdistrictId, label: result.subdistrictName });
      }
      if (result.businessId) {
        setDataBusiness({ value: result.businessId, label: result.businessName });
      }
      setProfile(result?.capacityProfile ? JSON.parse(result.capacityProfile) : { note: "", attachments: [] });
      setListContact(result?.contactOrg ? JSON.parse(result.contactOrg) : []);
      setListAttactment(result?.capacityProfile ? JSON.parse(result.capacityProfile)?.attachments : []);
      setFormData({
        ...formData,
        values: {
          ...result,
          type: result?.type == 2 ? "2" : "1",
        },
      });
    }
  };

  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        toggle={() => !isSubmit && handClearForm(false)}
        className="modal-add-supplier"
        size="md"
      >
        <form className="form-add-supplier-group" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader
            title={`${showFromGrid ? "Thông tin" : data ? "Chỉnh sửa" : "Thêm mới"} nhà cung cấp`}
            toggle={() => {
              !isSubmit && handClearForm(false);
            }}
          />
          <ModalBody>
            <div className="list-form-group">
              <div className="header_tab">
                {dataHeaderTab.map((item, index) => (
                  <div
                    key={index}
                    className={item.value === headerTab ? "item_tab_active" : "item_tab_inactive"}
                    onClick={() => {
                      setHeaderTab(item.value);
                      // setIsShowFilter(false);
                    }}
                  >
                    <span className="label">{item.label}</span>
                  </div>
                ))}
              </div>
              {headerTab === 1 ? (
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
              ) : headerTab === 2 ? (
                <>
                  {listContact?.length ? (
                    <div className="list-field-item form-contact">
                      {listContact.map((contact, index) => (
                        <div key={index} className="form-contact--item">
                          {listContact?.length > 1 && !showFromGrid && !isView ? (
                            <div
                              className="trash"
                              onClick={() => {
                                handleDeleteContact(contact.id, index);
                              }}
                            >
                              <Icon name="Trash"></Icon>
                            </div>
                          ) : null}
                          <Input
                            name="name"
                            label={"Họ và tên người liên hệ"}
                            value={contact?.name}
                            fill={true}
                            disabled={isView}
                            onChange={(e) => {
                              setListContact(
                                listContact.map((item, idx) => {
                                  if (idx === index) {
                                    return { ...item, name: e.target.value };
                                  }
                                  return item;
                                })
                              );
                            }}
                            placeholder="Nhập họ và tên người liên hệ"
                          ></Input>
                          <Input
                            name="position"
                            label={"Chức vụ"}
                            value={contact?.position}
                            fill={true}
                            disabled={isView}
                            onChange={(e) => {
                              setListContact(
                                listContact.map((item, idx) => {
                                  if (idx === index) {
                                    return { ...item, position: e.target.value };
                                  }
                                  return item;
                                })
                              );
                            }}
                            placeholder="Nhập chức vụ"
                          ></Input>
                          <Input
                            name="phone"
                            label={"Số điện thoại"}
                            value={contact?.phone}
                            fill={true}
                            disabled={isView}
                            onChange={(e) => {
                              setListContact(
                                listContact.map((item, idx) => {
                                  if (idx === index) {
                                    return { ...item, phone: e.target.value };
                                  }
                                  return item;
                                })
                              );
                            }}
                            placeholder="Nhập số điện thoại"
                          ></Input>
                          <Input
                            name="email"
                            label={"Email"}
                            value={contact?.email}
                            fill={true}
                            disabled={isView}
                            onChange={(e) => {
                              setListContact(
                                listContact.map((item, idx) => {
                                  if (idx === index) {
                                    return { ...item, email: e.target.value };
                                  }
                                  return item;
                                })
                              );
                            }}
                            placeholder="Nhập email"
                          ></Input>
                          <div className="status_active">
                            <div>
                              <span style={{ fontSize: 14, fontWeight: "500" }}>Mặc định</span>
                            </div>
                            <ButtonOnOff
                              disabled={isView}
                              checked={listContact[index]?.isDefault == 1 ? true : false}
                              onChange={(value) => {
                                setListContact(
                                  listContact.map((item, idx) => {
                                    if (value) {
                                      if (idx === index) {
                                        return { ...item, isDefault: 1 };
                                      } else {
                                        return { ...item, isDefault: 0 };
                                      }
                                    } else {
                                      if (idx === index) {
                                        return { ...item, isDefault: 0 };
                                      }
                                    }
                                  })
                                );
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {isView ? null : (
                    <div className="button_add">
                      <div
                        className="button_add--contact"
                        onClick={() => {
                          setListContact([...listContact, baseContact]);
                        }}
                      >
                        + Thêm người liên hệ
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="list-field-item form-upload">
                  <div className="form-upload--item">
                    <TextArea
                      name="note"
                      disabled={isView}
                      label={"Ghi chú"}
                      placeholder="Nhập ghi chú"
                      fill={true}
                      value={profile.note}
                      onChange={(e) => {
                        setProfile({ ...profile, note: e.target.value });
                      }}
                    ></TextArea>
                  </div>
                  <div className="form-upload--item">
                    <div className="attachments">
                      <label className="title-attachment">Tài liệu đính kèm</label>
                      {isView ? null : (
                        <div className={"wrapper-list-image"}>
                          {/* <div className={listAttactment.length >= 5 ? "list-image-scroll" : "wrapper-list-image"}> */}
                          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <label htmlFor="imageUpload" className="action-upload-image">
                              <div className={`wrapper-upload`}>
                                <div>
                                  <Icon name="UploadRox" />
                                </div>
                                <div>Nhấn hoặc thả vào để tải lên</div>
                              </div>
                            </label>
                          </div>
                        </div>
                      )}

                      <div className="list-attachment">
                        {isLoadingFile ? (
                          <div className="item-attachment">
                            <Icon name="FileXls" />
                            <div className="data-file">
                              <span style={{ fontSize: 14, fontWeight: "500" }}>Đang tải...</span>
                              <div className="container-loading">
                                <div className="item-loading" style={{ width: `${showProgress}%` }} />
                              </div>
                            </div>
                          </div>
                        ) : null}
                        {listAttactment && listAttactment.length > 0
                          ? listAttactment.map((item, index) => (
                              <div key={index} 
                                className="item-attachment"
                                onClick={() => {
                                  window.open(`${process.env.APP_LINK}/app/view_document?name=${item.fileName}&url=${item.fileUrl}`, "_blank", "noopener,noreferrer");
                                  window.parent.postMessage({ 
                                    type: "VIEW_DOCUMENT_TAB", 
                                    dataLink: `${process.env.APP_LINK}/app/view_document?name=${item.fileName}&url=${item.fileUrl}`,
                                  }, "*");
                                }}
                              >
                                {item?.type == "image" ? <img src={item?.fileUrl} width={36} height={36} /> : <Icon name="FileXls" />}
                                {/* <Icon name='FileXls'/> */}
                                <div
                                  className="data-file"
                                  onClick={() => {
                                    // setIsModalViewDocument(true);
                                    setDataDoc({
                                      fileUrl: item.fileUrl,
                                      fileName: item.fileName,
                                    });
                                  }}
                                >
                                  <div style={{ fontSize: 14, fontWeight: "500" }}>
                                    <span className="file-name">{item?.fileName ? item?.fileName : ``}</span>
                                    {/* <span>{item?.fileName.length > 50 ? `.${item?.type}` : ""}</span> */}
                                  </div>
                                  <div>
                                    <span style={{ fontSize: 12, fontWeight: "400", color: "#999999" }}>{item?.fileSize ? formatFileSize(item?.fileSize) : ``}</span>
                                  </div>
                                </div>
                                {!showFromGrid && !isView ? (
                                  <div
                                    style={{ marginTop: "-1rem", cursor: "pointer" }}
                                    onClick={() => {
                                      handleRemoveImageItem(index);
                                    }}
                                  >
                                    <Icon name="Times" style={{ width: "2rem", height: "2rem" }} />
                                  </div>
                                ) : null}
                              </div>
                            ))
                          : null}
                      </div>
                      <input
                        type="file"
                        accept="image/*,.xlsx,.xls,.doc,.docx,.ppt,.pptx,.txt,.pdf"
                        className="d-none"
                        id="imageUpload"
                        onChange={(e) => handleUploadDocument(e)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter actions={actions} />
        </form>
      </Modal>
      <ModalViewDocument
        onShow={isModalViewDocument}
        dataDoc={dataDoc}
        onHide={(reload) => {
          if (reload) {
          }
          setIsModalViewDocument(false);
          setDataDoc(null);
        }}
      />
      <Dialog content={contentDialog} isOpen={showDialog} />
    </Fragment>
  );
}

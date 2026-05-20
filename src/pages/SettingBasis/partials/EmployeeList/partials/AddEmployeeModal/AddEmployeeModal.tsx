import React, { useState, useEffect, useMemo, Fragment, useCallback, useContext } from "react";
import { IActionModal, IOption } from "model/OtherModel";
import { IFieldCustomize, IFormData, IValidation } from "model/FormModel";
import { AddEmployeeModalProps } from "model/employee/PropsModel";
import { IEmployeeRequest } from "model/employee/EmployeeRequestModel";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import FieldCustomize from "components/fieldCustomize/fieldCustomize";
import FileUpload from "components/fileUpload/fileUpload";
import Validate, { handleChangeValidate } from "utils/validate";
import { EMAIL_REGEX, PHONE_REGEX } from "utils/constant";
import { SelectOptionData } from "utils/selectCommon";
import { useActiveElement } from "utils/hookCustom";
import { showToast } from "utils/common";
import { isDifferenceObj } from "reborn-util";
import EmployeeService from "services/EmployeeService";
import DepartmentService from "services/DepartmentService";
import { IBeautyBranchFilterRequest } from "model/beautyBranch/BeautyBranchRequestModel";
import BeautyBranchService from "services/BeautyBranchService";
import { ContextType, UserContext } from "contexts/userContext";
import TextArea from "components/textarea/textarea";
import SelectCustom from "components/selectCustom/selectCustom";
import Icon from "components/icon";

import "./AddEmployeeModal.scss";
import WorkTimeService from "services/WorkTimeService";

export default function AddEmployeeModal(props: AddEmployeeModalProps) {
  const { onShow, onHide, data } = props;

  const focusedElement = useActiveElement();

  const checkUserRoot = localStorage.getItem("user.root");

  const { dataBranch } = useContext(UserContext) as ContextType;

  const [dataLstEmployeeRole, setDataLstEmployeeRole] = useState(null);

  const handleDetailEmployee = async (id: number) => {
    if (!id) return;

    const response = await EmployeeService.detail(id);
    if (response.code === 0) {
      const result = (response.result?.lstEmployeeRole || []).map((item) => {
        return {
          departmentId: item.departmentId,
          departmentValue: item.departmentName,
          jteId: item.id,
          jteValue: item.title,
        };
      });

      setLstRole(result.length > 0 ? result : [defaultRole]);

      setDataLstEmployeeRole(() => {
        return JSON.stringify(
          result.map((item) => {
            return {
              departmentId: item.departmentId,
              jteId: item.jteId,
            };
          })
        );
      });

      if (response.result.shiftId) {
        setDataShift({ value: response.result.shiftId, label: response.result.shiftName });
      }
    }
  };

  useEffect(() => {
    if (data && onShow) {
      handleDetailEmployee(data.id);
    }
  }, [data, onShow]);

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);

  //? đoạn này lấy danh sách chi nhánh
  const [listBeautyBranch, setListBeautyBranch] = useState<IOption[]>(null);
  const [isLoadingBeautyBranch, setIsLoadingBeautyBranch] = useState<boolean>(false);

  //? đoạn này lấy danh sách phòng ban
  const [listDepartment, setListDepartment] = useState<IOption[]>(null);
  const [isLoadingDepartment, setIsLoadingDepartment] = useState<boolean>(false);

  //? đoạn này lấy danh sách chức vụ phụ thuộc vào phòng ban
  const [listJobTitle, setListJobTitle] = useState<IOption[]>(null);
  const [isLoadingJobTitle, setIsLoadingJobTitle] = useState<boolean>(false);

  //? đoạn này lấy danh sách người quản lý
  const [listManager, setListManager] = useState<IOption[]>(null);
  const [isLoadingManager, setIsLoadingManager] = useState<boolean>(false);

  //Ca làm việc
  const [dataShift, setDataShift] = useState(null);

  const [dataDepartment, setDataDepartment] = useState(null);
  const loadedOptionDepartment = async (search, loadedOptions, { page }) => {
    const param: any = {
      name: search,
      page: page,
      limit: 10,
    };

    const response = await DepartmentService.list(param);

    if (response.code === 0) {
      const dataOption = response.result || [];

      return {
        options: [
          ...(dataOption.length > 0
            ? dataOption.map((item) => {
                return {
                  value: item.id,
                  label: item.name,
                  branchId: item.branchId,
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
  const handleChangeDepartment = (e) => {
    getDetailDepartment(e.value);
    setDataDepartment(e);
    setDataManager(null);
    setFormData({ ...formData, values: { ...formData?.values, departmentId: e.value, branchId: e.branchId, managerId: null, jteId: null } });
  };

  //Chọn người quản lý trực tiếp
  const [dataManager, setDataManager] = useState(null);
  const loadedOptionManager = async (search, loadedOptions, { page }) => {
    const param: any = {
      name: search,
      page: page,
      limit: 10,
      departmentId: formData?.values.departmentId,
    };

    const response = await EmployeeService.list(param);

    if (response.code === 0) {
      const dataOption = response.result.items || [];

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

  const handleChangeManager = (e) => {
    setDataManager(e);
    setFormData({ ...formData, values: { ...formData?.values, managerId: e.value } });
  };

  //! đoạn này xử lý vấn đề call api chi nhánh

  // const [branchId, setBranchId] = useState(null);

  // const branchList = async () => {
  //   const param: IBeautyBranchFilterRequest = {
  //     name: "",
  //     page: 1,
  //     limit: 10,
  //   };
  //   const response = await BeautyBranchService.list(param);

  //   if (response.code === 0) {
  //     const dataOption = response.result.items;
  //     if (dataOption?.length === 1) {
  //       setBranchId(dataOption[0].id);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (!data?.branchId && !data?.id) {
  //     branchList();
  //   } else {
  //     setBranchId(null);
  //   }
  // }, [data, onShow]);

  // const onSelectOpenBeautyBranch = async () => {
  //   if (!listBeautyBranch || listBeautyBranch.length === 0) {
  //     setIsLoadingBeautyBranch(true);
  //     const dataOption = await SelectOptionData("beautyBranch");
  //     if (dataOption) {
  //       setListBeautyBranch([...(dataOption.length > 0 ? dataOption : [])]);
  //     }
  //     setIsLoadingBeautyBranch(false);
  //   }
  // };

  //? đoạn này kiểm tra điều kiện call api chi nhánh
  // useEffect(() => {
  //   if (data?.branchId && checkUserRoot == "1") {
  //     onSelectOpenBeautyBranch();
  //   }
  //   if (data?.branchId == null && !data?.id) {
  //     if (branchId && checkUserRoot == "1") {
  //       onSelectOpenBeautyBranch();
  //     } else {
  //       setListBeautyBranch([]);
  //     }
  //   }
  // }, [data, checkUserRoot, branchId]);

  //! đoạn này xử lý vấn đề call api người giám sát nhân viên
  // const onSelectOpenManager = async () => {
  //   if (!listManager || listManager.length === 0) {
  //     setIsLoadingManager(true);
  //     // const dataOption = await SelectOptionData("employeeId", { branchId: dataBranch.value });
  //     const dataOption = await SelectOptionData("employeeId");
  //     if (dataOption) {
  //       setListManager([...(dataOption.length > 0 ? dataOption : [])]);
  //     }
  //     setIsLoadingManager(false);
  //   }
  // };

  //? đoạn này kiểm tra điều kiện call api người giám sát nhân viên
  // useEffect(() => {
  //   if (data?.managerId && onShow) {
  //     onSelectOpenManager();
  //   }

  //   if (data?.managerId === null) {
  //     setListManager([]);
  //   }
  // }, [data, onShow]);

  //! đoạn này xử lý vấn đề call api phòng ban
  // const onSelectOpenDepartment = async () => {
  //   if (!listDepartment || listDepartment.length === 0) {
  //     setIsLoadingDepartment(true);
  //     // const dataOption = await SelectOptionData("department", { branchId: dataBranch.value });
  //     const dataOption = await SelectOptionData("department");
  //     if (dataOption) {
  //       setListDepartment([...(dataOption.length > 0 ? dataOption : [])]);
  //     }
  //     setIsLoadingDepartment(false);
  //   }
  // };

  //? đoạn này kiểm tra điều kiện call api phòng ban
  // useEffect(() => {
  //   if (data?.departmentId && onShow) {
  //     onSelectOpenDepartment();
  //   }

  //   if (data?.departmentId === null) {
  //     setListDepartment([]);
  //   }
  // }, [data, onShow]);

  const values = useMemo(
    () =>
      ({
        name: data?.name ?? "",
        phone: data?.phone ?? "",
        email: data?.email ?? "",
        address: data?.address ?? "",
        jteId: data?.jteId ?? null,
        departmentId: data?.departmentId ?? null,
        managerId: data?.managerId ?? null,
        status: data?.status?.toString() ?? "1",
        viewMode: data?.viewMode?.toString() ?? "1",
        viewCustomerMode: data?.viewCustomerMode?.toString() ?? "2",
        branchId: data?.branchId ?? null,
        avatar: data?.avatar ?? "",
        sip: data?.sip ?? "",
        roles: dataLstEmployeeRole ?? "[]",
        shiftId: data?.shiftId ?? null,
      } as IEmployeeRequest),
    [data, onShow, dataLstEmployeeRole]
  );

  const validations: IValidation[] = [
    {
      name: "name",
      rules: "required",
    },
    {
      name: "phone",
      rules: "nullable|regex",
    },
    {
      name: "branchId",
      rules: "required",
    },
    {
      name: "departmentId",
      rules: "required",
    },
    {
      name: "jteId",
      rules: "required",
    },
  ];

  const listFieldInfoBasicEmployee: IFieldCustomize[] = [
    {
      label: "Họ tên",
      name: "name",
      type: "text",
      fill: true,
      required: true,
    },
    {
      label: "Điện thoại",
      name: "phone",
      type: "text",
      fill: true,
      regex: new RegExp(PHONE_REGEX),
      messageErrorRegex: "Số điện thoại không đúng định dạng",
      // required: true,
    },
    {
      label: "Email",
      name: "email",
      type: "text",
      fill: true,
      regex: new RegExp(EMAIL_REGEX),
      iconPosition: "right",
      // icon: data?.id && data?.emailMasked && (!isShowEmail ? <Icon name="EyeSlash" /> : <Icon name="Eye" />),
      // iconClickEvent: () => setIsShowEmail(!isShowEmail),
      messageErrorRegex: "Email không đúng định dạng",
      required: true,
    },
    // {
    //   label: "Địa chỉ",
    //   name: "address",
    //   type: "textarea",
    //   fill: true,
    // },
  ];

  const [formData, setFormData] = useState<IFormData>({
    values: values,
  });

  // console.log('formData', formData);

  useEffect(() => {
    if (formData?.values.departmentId) {
      loadedOptionManager("", undefined, { page: 1 });
    }
  }, [formData]);

  const defaultRole = {
    departmentId: null,
    departmentValue: null,
    jteId: null,
    jteValue: null,
  };

  const [lstRole, setLstRole] = useState([defaultRole]);

  const [lstDepartment, setLstDepartment] = useState([]);
  const [isLoadingAddDepartment, setIsLoadingAddDepartment] = useState<boolean>(false);
  const [lstJteId, setLstJteId] = useState([]);

  const onSelectOpenAddDepartment = async () => {
    setIsLoadingAddDepartment(true);

    const dataOption = await SelectOptionData("department");
    if (dataOption) {
      setLstDepartment([...(dataOption.length > 0 ? dataOption : [])]);
    }

    setIsLoadingAddDepartment(false);
  };

  const handDetailJte = async (id: number) => {
    const response = await DepartmentService.detail(id);
    if (response.code === 0) {
      const result = (response.result.jobTitles || []).map((item) => {
        return {
          value: item.id,
          label: item.title,
        };
      });
      setLstJteId(result);
    } else {
      setLstJteId([]);
    }
  };

  const handChangeValueAddDepartment = (e, idx) => {
    const value = e.value;
    handDetailJte(value);

    setLstRole((prev) =>
      prev.map((item, index) => {
        if (idx === index) {
          return {
            ...item,
            departmentId: e.value,
            departmentValue: e.label,
            jteId: null,
            jteValue: "",
          };
        }

        return item;
      })
    );
  };

  const handChangeValueAddJte = (e, idx) => {
    setLstRole((prev) =>
      prev.map((item, index) => {
        if (idx === index) {
          return {
            ...item,
            jteId: e.value,
            jteValue: e.label,
          };
        }

        return item;
      })
    );
  };

  const handleDeteleRole = (idx) => {
    const newData = [...lstRole];
    newData.splice(idx, 1);

    setLstRole(newData);
  };

  const loadedOptionShift = async (search, loadedOptions, { page }) => {
    const param: any = {
      name: search,
      page: page,
      limit: 10,
      active: 1,
    };

    const response = await WorkTimeService.listShift(param);

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

  const listFieldEnhance = useMemo(
    () =>
      [
        // {
        //   label: "Phòng ban",
        //   name: "departmentId",
        //   type: "select",
        //   options: listDepartment,
        //   onMenuOpen: onSelectOpenDepartment,
        //   isLoading: isLoadingDepartment,
        //   fill: true,
        //   required: true,
        //   onChange: (e) => handleChangeValueDepartment(e),
        // },
        {
          name: "departmentId",
          type: "custom",
          snippet: (
            <SelectCustom
              id="departmentId"
              name="departmentId"
              label="Phòng ban"
              required={true}
              fill={true}
              options={[]}
              value={dataDepartment}
              onChange={(e) => handleChangeDepartment(e)}
              isAsyncPaginate={true}
              isFormatOptionLabel={true}
              loadOptionsPaginate={loadedOptionDepartment}
              placeholder="Chọn phòng ban"
              additional={{
                page: 1,
              }}
              // formatOptionLabel={formatOptionLabelEmployee}
            />
          ),
        },
        // {
        //   label: "Người quản lý trực tiếp",
        //   name: "managerId",
        //   type: "select",
        //   options: listManager,
        //   onMenuOpen: onSelectOpenManager,
        //   isLoading: isLoadingManager,
        //   fill: true,
        // },
        {
          name: "managerId",
          type: "custom",
          snippet: (
            <SelectCustom
              key={formData?.values.departmentId}
              id="managerId"
              name="managerId"
              label="Người quản lý trực tiếp"
              // required={true}
              fill={true}
              options={[]}
              value={dataManager}
              onChange={(e) => handleChangeManager(e)}
              isAsyncPaginate={true}
              isFormatOptionLabel={true}
              loadOptionsPaginate={loadedOptionManager}
              placeholder="Chọn người quản lý"
              additional={{
                page: 1,
              }}
              // formatOptionLabel={formatOptionLabelEmployee}
            />
          ),
        },
        {
          label: "Chức danh",
          name: "jteId",
          type: "select",
          fill: true,
          required: true,
          options: listJobTitle,
          isLoading: isLoadingJobTitle,
          disabled: !formData?.values?.departmentId,
        },
        {
          label: "Số máy nhánh",
          name: "sip",
          type: "text",
          fill: true,
          required: false,
          disabled: !formData?.values?.departmentId,
        },
        {
          name: "shiftId",
          type: "custom",
          snippet: (
            <div style={{ width: "100%" }}>
              <SelectCustom
                id="participants"
                name="participants"
                label="Ca làm việc"
                fill={true}
                options={[]}
                value={dataShift}
                onChange={(e) => {
                  setDataShift(e);
                  setFormData({ ...formData, values: { ...formData.values, shiftId: e.value } });
                }}
                isAsyncPaginate={true}
                isFormatOptionLabel={true}
                loadOptionsPaginate={loadedOptionShift}
                placeholder="Chọn ca làm việc"
                additional={{
                  page: 1,
                }}
              />
            </div>
          ),
        },
        {
          type: "custom",
          name: "add_role",
          snippet: (
            <div className="box__add--role">
              <label>Thêm vai trò</label>

              <div className="lst__role">
                {lstRole.map((item, idx) => {
                  const lstOptionDepartment = lstDepartment
                    .filter((el) => el.value !== formData?.values.departmentId)
                    .filter((ul) => {
                      return !lstRole.some((k) => k.departmentId === ul.value);
                    });

                  return (
                    <div key={idx} className={"item-role"}>
                      <div className="item-role--info">
                        <div className="form-group">
                          <SelectCustom
                            name="addDepartmentId"
                            label="Phòng ban"
                            value={
                              item.departmentId
                                ? {
                                    value: item.departmentId,
                                    label: item.departmentValue,
                                  }
                                : null
                            }
                            options={lstOptionDepartment}
                            fill={true}
                            required={true}
                            special={true}
                            onChange={(e) => handChangeValueAddDepartment(e, idx)}
                            onMenuOpen={onSelectOpenAddDepartment}
                            placeholder="Chọn phòng ban"
                            isLoading={isLoadingAddDepartment}
                            disabled={!formData?.values?.departmentId}
                          />
                        </div>
                        <div className="form-group">
                          <SelectCustom
                            name="addJteId"
                            label="Chức danh"
                            fill={true}
                            value={
                              item.jteId
                                ? {
                                    value: item.jteId,
                                    label: item.jteValue,
                                  }
                                : null
                            }
                            special={true}
                            required={true}
                            options={lstJteId}
                            onChange={(e) => handChangeValueAddJte(e, idx)}
                            placeholder="Chọn chức danh"
                            disabled={!formData?.values?.departmentId}
                          />
                        </div>
                      </div>
                      <div className="item-role--action">
                        <div
                          className="action-item action-item--add"
                          onClick={() => formData?.values?.departmentId && setLstRole([...lstRole, defaultRole])}
                          style={!formData?.values?.departmentId ? { opacity: "0.6" } : {}}
                        >
                          <Icon name="PlusCircleFill" />
                        </div>
                        {lstRole.length > 1 && (
                          <div className="action-item action-item--delete" onClick={() => handleDeteleRole(idx)}>
                            <Icon name="Trash" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ),
        },
        {
          label: "Trạng thái",
          name: "status",
          type: "radio",
          options: [
            {
              value: "1",
              label: "Đang làm việc",
            },
            ...(data?.id
              ? [
                  {
                    value: "2",
                    label: "Đã nghỉ",
                  },
                ]
              : []),
          ],
          fill: true,
        },
        // {
        //   label: "Quyền xem khách hàng",
        //   name: "viewCustomerMode",
        //   type: "radio",
        //   options: [
        //     {
        //       value: "1",
        //       label: "Tất cả",
        //     },
        //     {
        //       value: "2",
        //       label: "Phạm vi quản lý",
        //     },
        //   ],
        //   fill: true,
        // },
        // {
        //   label: "Quyền xem doanh thu",
        //   name: "viewMode",
        //   type: "radio",
        //   options: [
        //     {
        //       value: "1",
        //       label: "Tất cả",
        //     },
        //     {
        //       value: "2",
        //       label: "Theo phòng",
        //     },
        //     {
        //       value: "3",
        //       label: "Theo ngày",
        //     },
        //   ],
        //   fill: true,
        // },
      ] as IFieldCustomize[],
    [
      listDepartment,
      isLoadingDepartment,
      listManager,
      isLoadingManager,
      listJobTitle,
      isLoadingJobTitle,
      listBeautyBranch,
      isLoadingBeautyBranch,
      data,
      onShow,
      formData.values,
      lstRole,
      defaultRole,
      lstDepartment,
      lstJteId,
      isLoadingAddDepartment,
      dataShift,
      dataManager,
      dataDepartment,
    ]
  );

  const handleChangeValueDepartment = (e) => {
    getDetailDepartment(e.value);
    setFormData({ ...formData, values: { ...formData?.values, brarnchId: e.value } });
  };

  //! đoạn này xử lý vấn đề call chi tiết một phòng ban đề lấy chức danh
  const getDetailDepartment = async (id) => {
    setIsLoadingJobTitle(true);
    const response = await DepartmentService.detail(id);
    if (response.code === 0) {
      const result = (response.result.jobTitles || []).map((item) => {
        return {
          value: item.id,
          label: item.title,
        };
      });
      setListJobTitle(result);
    } else {
      setListJobTitle([]);
    }
    setIsLoadingJobTitle(false);
  };

  //call api chi tiết nhân viên lấy về thông

  //! đoạn này xử lý vấn đề trong trường hợp cập nhật
  //  sau khi đã có id phòng ban rồi thì lấy luôn chức danh thuộc phòng ban đó
  useEffect(() => {
    if (data && onShow) {
      if (data?.departmentId) {
        getDetailDepartment(data?.departmentId);
        setDataDepartment({ value: data?.departmentId, label: data?.departmentName });
      }
      if (data.managerId) {
        setDataManager({ value: data?.managerId, label: data?.managerName });
      }
    }
  }, [data, onShow]);

  useEffect(() => {
    setFormData({ ...formData, values: values, errors: {} });
    setIsSubmit(false);

    return () => {
      setIsSubmit(false);
    };
  }, [values]);

  useEffect(() => {
    if (lstRole && lstRole.length > 0) {
      const changeLstRole = lstRole.map((item) => {
        return {
          departmentId: item.departmentId,
          jteId: item.jteId,
        };
      });

      setFormData({ ...formData, values: { ...formData?.values, roles: JSON.stringify(changeLstRole) } });
    }
  }, [lstRole]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const errors = Validate(validations, formData, [...listFieldInfoBasicEmployee, ...listFieldEnhance]);

    if (Object.keys(errors).length > 0) {
      setFormData((prevState) => ({ ...prevState, errors: errors }));
      return;
    }

    setIsSubmit(true);

    const body: IEmployeeRequest = {
      ...(data ? { id: data?.id } : {}),
      ...(formData.values as IEmployeeRequest),
    };

    const response = await EmployeeService.update(body);

    if (response.code === 0) {
      showToast(`${data ? "Cập nhật" : "Thêm mới"} nhân viên thành công`, "success");
      handleClearForm(true);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      setIsSubmit(false);
    }
  };

  const handleClearForm = (acc) => {
    onHide(acc);
    setLstRole([defaultRole]);
    setListJobTitle(null);
    setDataLstEmployeeRole(null);
    setDataShift(null);
    setDataDepartment(null);
    setDataManager(null);
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
              !isDifferenceObj(formData.values, values) ? handleClearForm(false) : showDialogConfirmCancel();
            },
          },
          {
            title: data ? "Cập nhật" : "Tạo mới",
            type: "submit",
            color: "primary",
            disabled:
              isSubmit ||
              (!isDifferenceObj(formData.values, values) && !isDifferenceObj(values.shiftId, dataShift)) ||
              (formData.errors && Object.keys(formData.errors).length > 0),
            is_loading: isSubmit,
          },
        ],
      },
    }),
    [formData, values, isSubmit, dataShift]
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
        handleClearForm(false);
        setShowDialog(false);
        setContentDialog(null);
        setListJobTitle(null);
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
          handleClearForm(false);
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
        isOpen={onShow}
        isFade={true}
        staticBackdrop={true}
        isCentered={true}
        toggle={() => !isSubmit && handleClearForm(false)}
        className="modal-add-emplyee"
      >
        <form className="form-emplyee-group" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader title={`${data ? "Chỉnh sửa" : "Thêm mới"} nhân viên`} toggle={() => !isSubmit && handleClearForm(false)} />
          <ModalBody>
            <div className="wrapper-coupled">
              <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                <div className="form-group">
                  <FileUpload type="avatar" label="Ảnh đại diện" formData={formData} setFormData={setFormData} />
                </div>
                {/* <div className="list-form-basic"> */}
                <div style={{ width: "65%" }}>
                  {listFieldInfoBasicEmployee.map((field, index) => (
                    <FieldCustomize
                      key={index}
                      field={field}
                      handleUpdate={(value) => handleChangeValidate(value, field, formData, validations, listFieldInfoBasicEmployee, setFormData)}
                      formData={formData}
                    />
                  ))}
                </div>
                {/* </div> */}
              </div>
              <div className="info__employee">
                {/* <div className="form-group">
                  <FileUpload type="avatar" label="Ảnh đại diện" formData={formData} setFormData={setFormData} />
                </div> */}
                <div className="form-group">
                  <TextArea
                    name="address"
                    value={formData?.values?.address}
                    label="Địa chỉ"
                    fill={true}
                    onChange={(e) => setFormData({ ...formData, values: { ...formData.values, address: e.target.value } })}
                    placeholder="Nhập địa chỉ"
                  />
                </div>
              </div>
              <div className="list-form-enhance">
                {listFieldEnhance.map((field, index) => (
                  <FieldCustomize
                    key={index}
                    field={field}
                    handleUpdate={(value) => handleChangeValidate(value, field, formData, validations, listFieldEnhance, setFormData)}
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

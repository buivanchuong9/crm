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
import "./ModalAddNotificationTemplate.scss";
import BusinessCategoryService from "services/BusinessCategoryService";
import ButtonOnOff from "components/ButtonOnOff/ButtonOnOff";
import { is } from "bpmn-js/lib/util/ModelUtil";
import Input from "components/input/input";
import RebornEditor from "components/editor/reborn";
import { serialize } from "utils/editor";
import RadioList from "components/radio/radioList";
import SelectCustom from "components/selectCustom/selectCustom";
import { ContextType, UserContext } from "contexts/userContext";
import EmployeeService from "services/EmployeeService";
import DepartmentService from "services/DepartmentService";
import NotificationTemplateService from "services/NotificationTemplateService";

export default function ModalAddNotificationTemplate(props: any) {
  const { onShow, onHide, data } = props;

  const focusedElement = useActiveElement();
  const { dataBranch } = useContext(UserContext) as ContextType;

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
  //! lấy nội dung email
  const [checkContentEmail, setCheckContentEmail] = useState<string>("");
  //   console.log('checkContentEmail', checkContentEmail);

  const [contentEmail, setContentEmail] = useState<string>("");
  console.log("contentEmail", contentEmail);

  const [dataTargetConfig, setDataTargetConfig] = useState([]);
  const [checkTitle, setCheckTitle] = useState(false);
  const [checkTargetConfig, setCheckTargetConfig] = useState(false);

  useEffect(() => {
    if (onShow && data) {
      setContentEmail(data.content);
      if (data.targetConfig && JSON.parse(data.targetConfig)) {
        setDataTargetConfig(JSON.parse(data.targetConfig));
      }
    }
  }, [onShow, data]);

  const values = useMemo(
    () =>
      ({
        id: data?.id ?? 0,
        title: data?.title ?? "",
        content: data?.content ?? "",
        targetType: data?.targetType.toString() ?? "2",
        targetConfig: data?.targetConfig ?? "[]",
        timeSendConfig: data?.timeSendConfig ?? "",
        employeeId: data?.employeeId ?? "",
      } as any),
    [data, onShow]
  );

  const [formData, setFormData] = useState<IFormData>({ values: values });
  // console.log('formData', formData);

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

  //   const listFieldBasic = useMemo(
  //     () =>
  //       [
  //         // {
  //         //     label: "Mã ngành nghề kinh doanh",
  //         //     name: "code",
  //         //     type: "text",
  //         //     fill: true,
  //         //     required: true,
  //         // },
  //         {
  //           label: "Tên ngành nghề kinh doanh",
  //           name: "name",
  //           type: "text",
  //           disabled: isView,
  //           fill: true,
  //           required: true,
  //         },
  //       ] as IFieldCustomize[],
  //     [formData?.values, isView]
  //   );

  useEffect(() => {
    setFormData({ ...formData, values: values, errors: {} });
    setIsSubmit(false);

    return () => {
      setIsSubmit(false);
    };
  }, [values]);

  //! đoạn này thay đổi giá trị văn bản
  const handleChangeContentEmail = (dataConent) => {
    console.log("dataConent", dataConent[0].children[0].text);
    setCheckContentEmail(dataConent[0].children[0].text || "");

    const convertContent = serialize({ children: dataConent });
    setContentEmail(convertContent);
    setFormData({ ...formData, values: { ...formData?.values, content: convertContent } });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // const errors = Validate(validations, formData, [...listFieldBasic]);
    // if (Object.keys(errors).length > 0) {
    //   setFormData((prevState) => ({ ...prevState, errors: errors }));
    //   return;
    // }

    const body: any = {
      ...(formData.values as any),
      ...(data ? { id: data.id } : {}),
      targetConfig: JSON.stringify(dataTargetConfig),
      content: contentEmail,
    };

    setIsSubmit(true);

    const response = await NotificationTemplateService.update(body);

    if (response.code === 0) {
      showToast(`${data ? "Cập nhật" : "Thêm mới"} thông báo thành công`, "success");
      handleClear(true);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      setIsSubmit(false);
    }
  };

  const actions = useMemo<any>(
    () => ({
      actions_right: {
        buttons: [
          {
            title: data ? "Đóng" : "Hủy",
            color: "primary",
            variant: "outline",
            disabled: isSubmit,
            callback: () => {
              !isDifferenceObj(formData.values, values) ? handleClear(false) : showDialogConfirmCancel();
            },
          },

          ...(data
            ? []
            : [
                {
                  title: "Gửi",
                  type: "submit",
                  color: "primary",
                  disabled:
                    isSubmit ||
                    !isDifferenceObj(formData.values, values) ||
                    (formData.errors && Object.keys(formData.errors).length > 0) ||
                    !formData.values.title ||
                    !checkContentEmail ||
                    (formData.values.targetType === "2" || formData.values.targetType === "3" ? (dataTargetConfig.length === 0 ? true : false) : ""),
                  is_loading: isSubmit,
                },
              ]),
        ],
      },
    }),
    [formData, values, isSubmit, dataTargetConfig, contentEmail, checkContentEmail, data]
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
        handleClear(false);
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

  const loadedOptionEmployee = async (search, loadedOptions, { page }) => {
    const param = {
      name: search,
      page: page,
      limit: 10,
      // branchId: dataBranch.value,
    };

    const response = await EmployeeService.list(param);

    if (response.code === 0) {
      const dataOption = response.result.items;

      return {
        options: [
          ...(dataOption.length > 0
            ? dataOption.map((item) => {
                return {
                  value: item.id,
                  label: item.name,
                  avatar: item.avatar,
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
      limit: 10,
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

  const handleClear = (acc) => {
    onHide(acc);
    setTimeout(() => {
      setContentEmail("");
    }, 1500);
    setDataTargetConfig([]);
    setCheckTitle(false);
    setCheckTargetConfig(false);
  };

  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        toggle={() => !isSubmit && handleClear(false)}
        className="modal-add-notification-template"
        size="lg"
      >
        <form className="form-add-notification-template-group" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader
            title={`${data ? "Thông tin" : "Tạo"} thông báo`}
            toggle={() => {
              !isSubmit && handleClear(false);
            }}
          />
          <ModalBody>
            <div className="list-form-group">
              <div className="list-field-item list-field-basic">
                <div className="form-group">
                  <Input
                    fill={true}
                    label="Tiêu đề"
                    required={true}
                    value={formData?.values.title}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData({ ...formData, values: { ...formData.values, title: value } });
                    }}
                    placeholder="Nhập tiêu đề"
                    error={checkTitle}
                    message="Tiêu đề không được để trống"
                    disabled={data ? true : false}
                  />
                </div>

                <div className="form-group">
                  <div style={{ marginBottom: "0.6rem" }}>
                    <span style={{ fontSize: 14, fontWeight: "700" }}>
                      Nội dung thông báo <span style={{ color: "red" }}>*</span>
                    </span>
                  </div>
                  <RebornEditor
                    name="content"
                    fill={true}
                    initialValue={contentEmail ? contentEmail : ""}
                    //   initialValue={formData.values.content ? formData.values.content : ""}
                    onChangeContent={(e) => handleChangeContentEmail(e)}
                    readOnly={data ? true : false}
                  />
                </div>

                <div className="form-group">
                  <RadioList
                    name="targetType"
                    title="Chọn người nhận"
                    options={[
                      {
                        value: "2",
                        label: "Cá nhân",
                      },
                      {
                        value: "3",
                        label: "Phòng ban",
                      },
                      {
                        value: "1",
                        label: "Tất cả",
                      },
                    ]}
                    value={formData.values.targetType}
                    onChange={(e) => {
                      setFormData({ ...formData, values: { ...formData.values, targetType: e.target.value } });
                      setDataTargetConfig([]);
                      setCheckTargetConfig(false);
                    }}
                    disabled={data ? true : false}
                  />
                </div>

                {formData.values?.targetType !== "1" ? (
                  <div className="target_object">
                    {formData.values?.targetType === "2" ? (
                      <div>
                        <SelectCustom
                          key={formData.values?.targetType}
                          id="employeeId"
                          name="employeeId"
                          label="Cá nhân nhận thông báo"
                          fill={true}
                          required={true}
                          error={checkTargetConfig}
                          isMulti={true}
                          message="Cá nhân nhận thông báo không được bỏ trống"
                          options={[]}
                          value={dataTargetConfig}
                          onChange={(e) => {
                            setDataTargetConfig(e);
                          }}
                          isAsyncPaginate={true}
                          placeholder="Chọn người"
                          additional={{
                            page: 1,
                          }}
                          loadOptionsPaginate={loadedOptionEmployee}
                          disabled={data ? true : false}
                        />
                      </div>
                    ) : (
                      <div>
                        <SelectCustom
                          key={formData.values?.targetType}
                          id="departmentId"
                          name="departmentId"
                          label="Phòng ban nhận thông báo"
                          fill={true}
                          required={true}
                          error={checkTargetConfig}
                          isMulti={true}
                          message="Phòng ban nhận thông báo không được bỏ trống"
                          options={[]}
                          value={dataTargetConfig}
                          onChange={(e) => {
                            setDataTargetConfig(e);
                          }}
                          isAsyncPaginate={true}
                          placeholder="Chọn phòng ban"
                          additional={{
                            page: 1,
                          }}
                          loadOptionsPaginate={loadedOptionDepartment}
                          disabled={data ? true : false}
                        />
                      </div>
                    )}
                  </div>
                ) : null}
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

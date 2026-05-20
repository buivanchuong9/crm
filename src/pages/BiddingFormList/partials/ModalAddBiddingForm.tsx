import React, { Fragment, useState, useEffect, useMemo, useRef, useContext } from "react";
import { IActionModal, IOption } from "model/OtherModel";
import Icon from "components/icon";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import "./ModalAddBiddingForm.scss";
import { formatFileSize, getSearchParameters, handDownloadFileOrigin, showToast } from "utils/common";
import { useNavigate } from "react-router-dom";
import ModalConfirm from "components/ModalConfirm/ModalConfirm";
import SelectCustom from "components/selectCustom/selectCustom";
import FieldListService from "services/FieldListService";
import Input from "components/input/input";
import ProjectCatalogService from "services/ProjectCatalogService";
import ProcurementTypeService from "services/ProcurementTypeService";
import { IFormData } from "model/FormModel";
import BiddingFormService from "services/BiddingFormService";
import { isDifferenceObj } from "reborn-util";
import { EMAIL_REGEX, PHONE_REGEX_NEW } from "utils/constant";
import moment from "moment";
import { Parser } from "formula-functionizer";
import CustomerService from "services/CustomerService";
import ReasonListBpmService from "services/ReasonListBpmService";
import ProjectRealtyService from "services/ProjectRealtyService";
import UnitService from "services/UnitService";
import MaterialService from "services/MaterialService";
import BusinessCategoryService from "services/BusinessCategoryService";
import SupplierService from "services/SupplierService";
import InvestorService from "services/InvestorService";
import ProcurementService from "services/ProcurementService";
import { v4 as uuidv4 } from "uuid";
import { useOnClickOutside } from "utils/hookCustom";
import Button from "components/button/button";
import Popover from "components/popover/popover";
import ActionRow from "pages/BPM/GridForm/partials/ActionRowPopup/ActionRow";
import TextArea from "components/textarea/textarea";
import NummericInput from "components/input/numericInput";
import Checkbox from "components/checkbox/checkbox";
import DatePickerCustom from "components/datepickerCustom/datepickerCustom";
import SelectLookup from "pages/BPM/GridFormSetting/partials/SelectLookup/SelectLookup";
import ModalAddColumn from "./ModalAddColumn/ModalAddColumn";
import WorkCategoryService from "services/WorkCategoryService";
import _ from "lodash";
import GridService from "services/GridService";
import ModalSetingNo from "../../BPM/GridForm/partials/ModalSetingNo"
import Tippy from "@tippyjs/react";
import ModalExport from "./ModalExport/ModalExport";
import ModalImport from "./ModalImport/ModalImport";

export default function ModalAddBiddingForm({ onShow, onHide, data, isView, setIsView, titleType }) {
  const parser = new Parser();
  const navigation = useNavigate();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);
  const [showProgress, setShowProgress] = useState<number>(0);
  const [isModalConfirm, setIsModalConfirm] = useState(false);

  const [fieldData, setFieldData] = useState(null);
  const [typeProject, setTypeProject] = useState(null);
  const [typePackage, setTypePackage] = useState(null);
  const title = "Danh mục";
  const [dataRowInit, setDataRowInit] = useState([]);
  const [dataRow, setDataRow] = useState([]);
  console.log("dataRow123", dataRow); 

  useEffect(() => {
    if (data?.id && onShow) {
      setFieldData({ value: data?.fieldId, label: data?.fieldName });
      setTypeProject({ value: data?.projectTypeId, label: data?.projectTypeName });
      setTypePackage({ value: data?.procurementTypeId, label: data?.procurementTypeName });

      const header = data?.header ? JSON.parse(data?.header) : [];
      if (header && header.length > 0) {
        setListColumn(header);
      } else {
        setListColumn([]);
      }

      const dataRowGet = data?.data ? JSON.parse(data?.data) : [];
      console.log("dataRowGet", dataRowGet);

      if (dataRowGet && dataRowGet.length > 0) {
        setDataRowInit(dataRowGet);
        setDataRow(dataRowGet);
      } else {
        setDataRow([]);
      }
    }
  }, [data, onShow]);

  const values = useMemo(
    () =>
    ({
      name: data?.name ?? "",
      // key: data?.key ?? '',
      documentType: data?.documentType ?? "",
      fieldId: data?.fieldId ?? "",
      projectTypeId: data?.projectTypeId ?? "",
      procurementTypeId: data?.procurementTypeId ?? null,
      data: data?.data,
      header: data?.header,
    } as any),
    [data, onShow]
  );

  const [formData, setFormData] = useState<IFormData>({ values: values });

  useEffect(() => {
    setFormData({ ...formData, values: values, errors: {} });
    setIsSubmit(false);

    return () => {
      setIsSubmit(false);
    };
  }, [values]);

  const loadedOptionField = async (search, loadedOptions, { page }) => {
    const param: any = {
      name: search,
      page: page,
      limit: 10,
      status: 1,
    };

    const response = await FieldListService.list(param);

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

  const loadedOptionProcurementType = async (search, loadedOptions, { page }) => {
    const param: any = {
      name: search,
      page: page,
      limit: 10,
      status: 1,
    };

    const response = await ProcurementTypeService.list(param);

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

  //   useEffect(() => {
  //     loadedOptionPackage("", undefined, { page: 1 });
  //   }, [fieldData])

  const onSubmit = async (e) => {
    e.preventDefault();
    // if(!content){
    //   showToast(`Nội dung không được để trống`, "error");
    //   return;
    // }

    setIsSubmit(true);
    const body = {
      ...(formData.values as any),
      ...(data ? { id: data.id } : {}),
      data: JSON.stringify(dataRow),
      header: JSON.stringify(listColumn),
    };

    console.log("body", body);

    const response = await BiddingFormService.update(body);

    if (response.code === 0) {
      const message = titleType === "UPDATE" ? "Chỉnh sửa mẫu hồ sơ mời thầu thành công" : "Thêm biểu mẫu hồ sơ mời thầu thành công"
      showToast(`${message}`, "success");
      handleClear(true);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setIsSubmit(false);
  };

  const handClearForm = () => {
    onHide(false);
  };
  
  const actions = useMemo<IActionModal>(
    () => ({
      actions_right: {
        buttons: [
          {
            title: "Huỷ",
            color: "primary",
            variant: "outline",
            disabled: isSubmit,
            callback: () => {
              !isDifferenceObj(formData.values, values) ? handClearForm() : showDialogConfirmCancel();
            },
          },

          ...(isView
            ? []
            : ([
              {
                title: "Áp dụng",
                type: "submit",
                color: "primary",
                disabled:
                  isSubmit ||
                  !isDifferenceObj(formData.values, values) && _.isEqual(dataRowInit, dataRow) ||
                  !formData.values.name?.trim() ||
                  !formData.values.documentType?.trim() ||
                  !formData.values.fieldId ||
                  !formData.values.procurementTypeId ||
                  !formData.values.projectTypeId,
                is_loading: isSubmit,
                // callback: () => {
                //     onSubmit();
                // },
              },
            ] as any)),
        ],
      },
    }),
    [isSubmit, data, isView, formData, values, dataRowInit, dataRow]
  );

  const showDialogConfirmCancel = () => {
    const contentDialog: IContentDialog = {
      color: "warning",
      className: "dialog-cancel",
      isCentered: true,
      isLoading: false,
      title: <Fragment>{`Hủy bỏ thao tác`}</Fragment>,
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

  const handleClear = (acc) => {
    onHide(acc);
    setFieldData(null);
    setTypeProject(null);
    setTypePackage(null);
    setListColumn([]);
    setDataRow([]);
  };

  const params: any = getSearchParameters();
  const optionRegex = {
    phoneRegex: PHONE_REGEX_NEW,
    emailRegex: EMAIL_REGEX,
  };


  ///Grid biểu mẫu

  const getDetailArtifact = async (nodeId, fieldName, potId, workId) => {
    const params = {
      nodeId: nodeId,
      fieldName: fieldName,
    };
    // const response = await GridService.detail(params);

    // if (response.code == 0) {
    //   const result = response.result;
    //   const header = (result?.header && JSON.parse(result.header)) || null;
    //   setListColumn(header || []);
    //   let dataRowOrigin: any = await getDetailRow(nodeId, fieldName, potId, workId, header);
    //   if (dataRowOrigin && dataRowOrigin.length && dataRowOrigin[0].length) {
    //     const listComment = await getListComment();
    //     if (listComment) {
    //       dataRowOrigin = dataRowOrigin.map((item) => {
    //         if (item.type == "title") {
    //           return item;
    //         }

    //         return item.map((field) => {
    //           return {
    //             ...field,
    //             isHaveNote: listComment[field.rowKey + "-" + field.key] ? true : false,
    //           };
    //         });
    //       });
    //     }
    //     setDataRow(dataRowOrigin);
    //   }
    // } else {
    //   showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    // }
    setLoading(false);
  };

  const getDetailRow = async (nodeId, fieldName, potId, workId, header) => {
    const params = {
      nodeId: nodeId,
      fieldName: fieldName,
      potId: potId,
      workId: workId,
    };
    // const response = await GridService.detailRow(params);

    // if (response.code == 0) {
    //   const result = response.result;
    //   const data = (result?.data && JSON.parse(result.data)) || [];

    //   if (data && data.length > 0 && data[0].length > 0) {
    //     // setDataRow(data);
    //     if (!header) {
    //       const newDataHeader = data[0].map((item) => {
    //         return {
    //           name: item.name,
    //           key: item.key,
    //           type: item.type,
    //           required: item.required,
    //           options: item.options || [],
    //           position: item.position,
    //           lookup: item.lookup,
    //           formula: item.formula,
    //           timeRange: item.timeRange,

    //           regex: item.regex,
    //           readOnly: item?.readOnly,
    //         };
    //       });
    //       addColumn(newDataHeader);
    //     }
    //     return data;
    //   }
    // } else {
    //   return [];
    // }
  };

  const [listLoadBindingField, setListLoadBindingField] = useState<any[]>([]);
  const [success, setSuccess] = useState(true);
  const [loading, setLoading] = useState(false);

  const [listColumn, setListColumn] = useState<any[]>([]);
  console.log("listColumn", listColumn);
  const [baseRow, setBaseRow] = useState([]);
  const [listIndex, setListIndex] = useState<any[]>([]);

  const [listDataExport, setListDataExport] = useState<any[]>([]);

  const [isChangeColumns, setIsChangeColumns] = useState<boolean>(false);

  useEffect(() => {
    if (params.fieldName == "hsmt") {
      return;
    }
    const dataRowHeahder = listColumn.map((item: any) => ({
      name: item.name,
      key: item.key,
      rowKey: item.rowKey,
      type: item.type,
      placeholder: item.name,
      value: item.type === "checkbox" ? false : "",
      showNote: false,
      // noteList: [],
      options: item?.options ?? [],
      required: item?.required || false,
      isSum: item?.isSum || false,
      // regex: item?.regex || "",
      regex: item?.regex ? item.regex : "",
      lookup: item?.lookup || "",
      formula: item?.formula || "",
      timeRange: item?.timeRange || "",
      readOnly: item?.readOnly == 1 ? true : false,
    }));
    const baseRowFist = listColumn.map((item: any) => ({
      name: item.name,
      key: item.key,
      rowKey: item.rowKey,
      type: item.type,
      placeholder: item.name,
      value: item.type === "checkbox" ? false : "",
      showNote: false,
      // noteList: [],
      options: item?.options ?? [],
      required: item?.required || false,
      isSum: item?.isSum || false,
      // regex: item?.regex || "",
      regex: item?.regex ? item.regex : "",
      lookup: item?.lookup || "",
      formula: item?.formula || "",
      timeRange: item?.timeRange || "",
      listBindingField: item?.listBindingField || [],
      isBinding: item?.isBinding || false,
      bindingField: item?.bindingField || "",
      readOnly: item?.readOnly == 1 ? true : false,
    }));

    setBaseRow(baseRowFist);

    if (dataRow.length > 0 && dataRow[0].length > 0) {
      let dataRowNew = dataRow.map((item) => {
        if (item.length) {
          return listColumn.map((col) => {
            if (item.find((el) => el.key == col.key)) {
              const itemNew = item.find((el) => el.key == col.key);
              return {
                ...itemNew,
                isSum: col?.isSum || false,
                options: col?.options ?? [],
                listBindingField: col?.listBindingField ?? [],
                regex: col?.regex ? col.regex.toString() : "",
              };
            } else {
              return {
                name: col.name,
                key: col.key,
                rowKey: item.find((el) => el.rowKey)?.rowKey || "",
                type: col.type,
                placeholder: col.name,
                value: col.type === "checkbox" ? false : "",
                showNote: false,
                noteList: [],
                options: col?.options ?? [],
                required: col?.required || false,
                isSum: col?.isSum || false,
                regex: col?.regex ? col.regex : "",
                lookup: col?.lookup || "",
                formula: col?.formula || "",
                timeRange: col?.timeRange || "",
                listBindingField: col?.listBindingField || [],
                isBinding: col?.isBinding || false,
                bindingField: col?.bindingField || "",
                readOnly: col?.readOnly == 1 ? true : false,
              };
            }
          });
        } else {
          return item;
        }
      });
      let listMapKeyValue = [];
      dataRowNew.map((item) => {
        let mapKeyValue = {};
        if (item?.length) {
          item.map((field) => {
            mapKeyValue[field.key] = field.value;
          });
        }
        listMapKeyValue.push(mapKeyValue);
      });
      //Tính toán giá trị cho các trường formula hoặc time_range
      const updatedDataNew = dataRowNew.map((row, rIdx) => {
        if (row.type == "title") {
          return row;
        }
        return row.map((field, fIdx) => {
          if (field.type == "formula" && field?.formula) {
            // Phân tích biểu thức thành một hàm
            const formula = parser.parse(JSON.parse(field.formula)?.formula);
            const result = formula(listMapKeyValue[rIdx]);
            return {
              ...field,
              value: result,
            };
          } else if (field.type == "time_range" && field?.timeRange) {
            let timeRange = JSON.parse(field.timeRange);
            const startDate = moment(new Date(listMapKeyValue[rIdx][timeRange.startDate]), "MM/DD/YYYY");
            const endDate = moment(new Date(listMapKeyValue[rIdx][timeRange.endDate]), "MM/DD/YYYY");

            let count = 0;
            let currentDate = startDate.clone();

            while (currentDate.isSameOrBefore(endDate)) {
              const dayOfWeek = currentDate.day();
              if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                // 0 là Chủ nhật, 6 là Thứ 7
                count++;
              }
              currentDate.add(1, "days");
            }
            return {
              ...field,
              value: count + " ngày",
            };
          }
          return field;
        });
      });
      setDataRow(updatedDataNew);
      setListLoading(updatedDataNew);
      if (isChangeColumns) {
        saveDataRow(dataRowNew);
      }
      let check_required = false;
      let check_regex = false;
      for (let i = 0; i < dataRowNew.length; i++) {
        for (let j = 0; j < dataRowNew[i].length; j++) {
          listColumn.map((field) => {
            if (field.key == dataRowNew[i][j].key && field?.required && !dataRowNew[i][j].value && i != 0) {
              check_required = true;
            }
            if (
              field.key == dataRowNew[i][j].key &&
              field.regex &&
              dataRowNew[i][j].value &&
              !dataRowNew[i][j].value.match(optionRegex[field.regex])
            ) {
              check_regex = true;
            }
          });
        }
      }
    } else {
      setDataRow([dataRowHeahder]);
    }
  }, [listColumn, params.fieldName]); // Chỉ chạy khi listColumn.length thay đổi (thêm hoặc xóa cột)

  useEffect(() => {
    let success = true;
    if (listLoadBindingField?.length > 0) {
      listLoadBindingField.map((item) => {
        if (!item.success) {
          success = false;
        }
      });
    } else {
      success = true;
    }
    setSuccess(success);
  }, [listLoadBindingField]);

  const setListLoading = (data) => {
    let _listLoadBindingField = [];
    data.map((item, index) => {
      if (index != 0) {
        if (item.length) {
          item.map((field, indexField) => {
            if (field.type == "binding") {
              _listLoadBindingField.push({
                rowIndex: index,
                columnIndex: indexField,
                success: !field?.value || dataRow[index][indexField]?.value == field?.value ? true : false,
              });
            }
          });
        }
      }
    });
    setListLoadBindingField(_listLoadBindingField);
  };

  const handlExportData = async () => {
    // const transformedData = transformDataRowToListData(dataRow);
    // const result = await exportToExcel({
    //   fileName: title,
    //   columns: listColumn,
    //   data: transformedData,
    //   includeSTT: true,
    // });

    if (listColumn.length) {
      const list_data_new = [];
      for (let i = 0; i < dataRow.length; i++) {
        if (dataRow[i].length > 0) {
          let data_row_note = {
            id: dataRow[i][0]?.id ? dataRow[i][0]?.id : null,
            key: dataRow[i][0]?.key ? dataRow[i][0]?.key : null,
            rowKey: dataRow[i][0]?.rowKey ? dataRow[i][0]?.rowKey : null,
            listHaveNote: {},
            options: dataRow[i][0]?.options ? dataRow[i][0]?.options : [],
          };
          for (let j = 0; j < dataRow[i].length; j++) {
            data_row_note = {
              ...data_row_note,
              [dataRow[i][j].key]: dataRow[i][j].value,
              rowKey: dataRow[i][j].rowKey,
              listHaveNote: {
                ...data_row_note.listHaveNote,
                [dataRow[i][j].key]: dataRow[i][j].isHaveNote,
              },
              options: dataRow[i][j]?.options ? dataRow[i][j]?.options : [],
            };
          }
          if (i != 0 && dataRow[i].length) {
            list_data_new.push(data_row_note);
          }
        } else {
          list_data_new.push({
            stt: typeNo == "auto" ? i : dataRow[i].no,
            content: dataRow[i].content,
          });
        }
      }

      setListDataExport(list_data_new);
    }
  };

  const handChangeValueItem = (rowIndex, fieldIndex, value, type) => {
    if (type === "binding") {
      let check_required = false;
      const updatedData = dataRow.map((row, rIdx) => {
        if (rIdx === rowIndex) {
          let new_field: any = [];
          for (let fIdx = 0; fIdx < row.length; fIdx++) {
            const element = row[fIdx];
            if (fIdx === fieldIndex) {
              if (element.required && !value.value) {
                check_required = true;
              }
              new_field.push({
                ...element,
                value: value.value,
              });
            } else {
              new_field.push(element);
            }
          }
          new_field = new_field.map((field) => {
            if (typeof value[field.key] != "undefined") {
              if (value?.options_value?.length && field.key.includes("NguoiLienHe_")) {
                return {
                  ...field,
                  value: value?.options_value ? value?.options_value.find((el) => el.isDefault)?.value : "",
                  options: value?.options_value,
                };
              } else {
                return {
                  ...field,
                  value: value[field.key],
                };
              }
            } else {
              if (field.key.includes("_NguoiLienHe")) {
                const firstKey = Object.keys(value).find((key) => key.includes("NguoiLienHe_"));
                if (firstKey) {
                  let listContact = JSON.parse(value[firstKey]);
                  if (listContact.length) {
                    let defaultContact = listContact.find((el) => el.isDefault);
                    let valueKey =
                      field.key == "SoDienThoai_NguoiLienHe"
                        ? defaultContact?.phone
                        : field.key == "Email_NguoiLienHe"
                        ? defaultContact?.email
                        : field.key == "ChucVu_NguoiLienHe"
                        ? defaultContact?.position
                        : "";
                    return {
                      ...field,
                      value: valueKey,
                    };
                  } else {
                    return field;
                  }
                } else {
                  return field;
                }
              } else {
                return field;
              }
            }
          });
          return new_field;
        }
        if (row.type == "title") {
          return row;
        }
        return row.map((field) => ({ ...field }));
      });
      setDataRow(updatedData);
    } else {
      const valueData =
        type == "checkbox"
          ? value.target.checked
          : type == "select"
          ? value.value
          : type == "lookup"
          ? value.value
          : type == "number"
          ? value.floatValue
          : type == "date"
          ? value
          : value.target.value;
      let check_required = false;
      let listMapKeyValue = [];
      const updatedData = dataRow.map((row, rIdx) => {
        const mapKeyValue = {};
        if (rIdx === rowIndex) {
          let rowMapReturn = row.map((field, fIdx) => {
            mapKeyValue[field.key] = fIdx === fieldIndex ? valueData : field.value;
            if (field?.required && !valueData) {
              check_required = true;
            }
            if (fIdx === fieldIndex) {
              return {
                ...field,
                value: valueData,
                isRegexFalse: valueData && field?.regex && !valueData.match(optionRegex[field.regex]) ? true : false,
              };
            } else {
              if (field?.required && !field.value) {
                check_required = true;
              }
              if (field.regex) {
                return {
                  ...field,
                  isRegexFalse: field.value && field?.regex && !field.value.match(optionRegex[field.regex]) ? true : false,
                };
              }
            }
            return field;
          });
          listMapKeyValue.push(mapKeyValue);
          return rowMapReturn;
        } else {
          if (row.type == "title") {
            listMapKeyValue.push(row);
            return row;
          }
          let rowMapReturn = row.map((field) => {
            mapKeyValue[field.key] = field.value;
            if (rIdx != 0) {
              if (field?.required && !field.value) {
                check_required = true;
              }
              if (field.regex) {
                return {
                  ...field,
                  isRegexFalse: field.value && field?.regex && !field.value.match(optionRegex[field.regex]) ? true : false,
                };
              }
            }
            return field;
          });
          listMapKeyValue.push(mapKeyValue);
          return rowMapReturn;
        }
      });
      //Tính toán giá trị cho các trường formula hoặc time_range
      const updatedDataNew = updatedData.map((row, rIdx) => {
        if (row.type == "title") {
          return row;
        }
        return row.map((field, fIdx) => {
          if (field.type == "formula" && field?.formula) {
            // Phân tích biểu thức thành một hàm
            const formula = parser.parse(JSON.parse(field.formula)?.formula);
            const result = formula(listMapKeyValue[rIdx]);
            return {
              ...field,
              value: result,
            };
          } else if (field.type == "time_range" && field?.timeRange) {
            let timeRange = JSON.parse(field.timeRange);
            if (
              listMapKeyValue[rIdx] &&
              listMapKeyValue[rIdx][timeRange.startDate] &&
              listMapKeyValue[rIdx][timeRange.endDate] &&
              typeof listMapKeyValue[rIdx][timeRange.startDate] != "undefined" &&
              typeof listMapKeyValue[rIdx][timeRange.endDate] != "undefined" &&
              listMapKeyValue[rIdx][timeRange.startDate] != "" &&
              listMapKeyValue[rIdx][timeRange.endDate] != ""
            ) {
              const startDate = moment(new Date(listMapKeyValue[rIdx][timeRange.startDate]), "MM/DD/YYYY");
              const endDate = moment(new Date(listMapKeyValue[rIdx][timeRange.endDate]), "MM/DD/YYYY");
              let count = 0;
              let currentDate = startDate.clone();
              while (currentDate.isSameOrBefore(endDate)) {
                const dayOfWeek = currentDate.day();
                if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                  // 0 là Chủ nhật, 6 là Thứ 7
                  count++;
                }
                currentDate.add(1, "days");
              }
              return {
                ...field,
                value: count + " ngày",
              };
            }
          }
          return field;
        });
      });
      if (type == "number" || dataRow[rowIndex][fieldIndex].key == "stt") {
        let datacc = _.cloneDeep(updatedDataNew);
        let dataSum = caculateSumRow(datacc); // Tính toán dòng tổng
        let neww = caculateTitleSum(dataSum); // Cộng dồn từ trên xuống cho các dòng tiêu đề Tổng
        setDataRow(neww);
      } else {
        setDataRow(updatedDataNew);
      }
    }
  };

  const includeLevelCheck = (levelTitle, levelRow) => {
    // Nếu không có levelTitle thì trả về false
    if (!levelTitle || !levelRow) return false;
    //Nếu levelTitle là phần đầu của levelRow thì trả về true ví dụ 1: 1.1 là phần đầu của 1.1.1 thì trả về true, ví dụ 2: 1.1không phải là phần đầu của 2.1.1 thì trả về false
    return levelRow.startsWith(levelTitle + ".");
  };

  const caculateTitleSum = (dataCal) => {
    //Cộng dồn từ trên xuống cho các dòng tiêu đề Tổng
    const dataCalculate = [...dataCal];
    const listSumRow = [];

    dataCalculate.forEach((item, index) => {
      if (item.length) {
        if (item[1]?.type == "titleSum") {
          // Dòng tổng
          let level = getLevel(item[0].value);
          const key = `${index}_${level}`;
          listSumRow.push({
            key,
            sumStatus: true,
            row: item.map((field, indexField) => ({
              ...field,
              value: indexField === 0 ? field.value : 0, // Reset
            })),
            level: level,
            no: item[0].value,
          });
        } else {
          // Dòng dữ liệu
          listSumRow.forEach((row) => {
            if (row.sumStatus && !includeLevelCheck(row.no, item[0].value) && !item[0].isSumRow) {
              row.sumStatus = false; // Dừng cộng dồn
            }
          });
          listSumRow.forEach((rowSum) => {
            if (rowSum.sumStatus) {
              rowSum.row.forEach((field, indexField) => {
                if ((field.type === "number" || field.type === "formula") && !item[0].isSumRow) {
                  // Cộng dồn giá trị
                  // field.value = (parseFloat(field.value) || 0) + (parseFloat(item[indexField]?.value) || 0);
                  // Cộng dồn giá trị và làm tròn đến 4 chữ số thập phân
                  field.value = Math.round(((parseFloat(field.value) || 0) + (parseFloat(item[indexField]?.value) || 0)) * 10000) / 10000;
                }
              });
            }
          });
        }
      }
    });
    listSumRow.forEach((rowSum) => {
      const index = parseInt(rowSum.key.split("_")[0], 10);
      dataCalculate[index] = rowSum.row.map((field, indexRow) => {
        return {
          ...field,
          value: indexRow == 1 ? dataCalculate[index][1].value : field.value, // Giữ nguyên giá trị của cột tiêu đề
        };
      });
    });
    return dataCalculate;
  };
  const caculateSumRow = (dataCal) => {
    const dataCalculate = [...dataCal].reverse(); // Đảo ngược mảng
    const listSumRow = [];

    dataCalculate.forEach((item, index) => {
      if (item.length) {
        if (item[0]?.isSumRow) {
          // Dòng tổng
          const key = `${index}_${item[0].level}`;
          listSumRow.push({
            key,
            sumStatus: true,
            row: item.map((field, indexField) => ({
              ...field,
              value: indexField === 0 ? field.value : 0, // Reset
            })),
            level: item[0].level,
          });
        } else {
          // Dòng dữ liệu
          if (item[1]?.type != "titleSum") {
            listSumRow.forEach((rowSum) => {
              if (rowSum.sumStatus) {
                rowSum.row.forEach((field, indexField) => {
                  if (field.type === "number" || field.type === "formula") {
                    // Cộng dồn giá trị
                    // field.value = ((parseFloat(field.value) || 0) + (parseFloat(item[indexField]?.value) || 0));
                    // Cộng dồn giá trị và làm tròn đến 4 chữ số thập phân
                    field.value = Math.round(((parseFloat(field.value) || 0) + (parseFloat(item[indexField]?.value) || 0)) * 10000) / 10000;
                  }
                });
              }
            });
          }
        }
      }

      if (item.type === "title") {
        // Dòng tiêu đề
        const levelStop = getLevel(item.no);
        listSumRow.forEach((row) => {
          if (row.sumStatus && row.level >= levelStop && row.level < 11) {
            row.sumStatus = false; // Dừng cộng dồn
          }
        });
      }
    });

    listSumRow.forEach((rowSum) => {
      const index = parseInt(rowSum.key.split("_")[0], 10);
      dataCalculate[index] = rowSum.row;
    });

    return dataCalculate.reverse(); // Đảo ngược lại mảng
  };
  const handleDeleteRow = async (data, idx) => {
    setDataRow(dataRow.filter((item, index) => index !== idx));
  };

  const [showModalNote, setShowModalNote] = useState(false);
  const [dataNoteField, setDataNoteField] = useState([]);

  const handShowModalNote = (field, rowIndex, fieldIndex) => {
    setShowModalNote(true);
    setDataRow(
      dataRow.map((item, index) => {
        if (item.type == "title") {
          return item;
        }
        if (index == rowIndex) {
          return item.map((el, indexEl) => (indexEl == fieldIndex ? { ...el, showNote: true } : { ...el, showNote: false }));
        } else {
          return item.map((el, indexEl) => ({ ...el, showNote: false }));
        }
      })
    );
    setDataNoteField(field.noteList);
  };

  const [showModalImport, setShowModalImport] = useState<boolean>(false);
  const [onShowModalExport, setOnShowModalExport] = useState<boolean>(false);
  const [showModalAddColumn, setShowModalAddColumn] = useState<boolean>(false);
  const [dataColumnEdit, setDataColumnEdit] = useState<any>(null);
  const optionsExport: IOption[] = useMemo(
    () => [
      {
        value: "all",
        label: "Tất cả dữ liệu",
      },
      {
        value: "current_page",
        label: "Trên trang này",
        disabled: true,
      },
      // {
      //   value: "current_search",
      //   label: `Tất cả khách hàng phù hợp với kết quả tìm kiếm hiện tại`,
      //   disabled: true,
      // },
    ],
    []
  );

  const onDeleteColumn = async (param) => {
    // const response = await GridService.delete(param);
    // if (response.code === 0) {
    //   // showToast("Xóa quy trình thành công", "success");
    // } else {
    //   // showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    // }
  };

  const saveDataRow = async (data) => {
    if (!isChangeColumns) {
      let check_required = false;
      let check_regex = false;
      data.map((item, index) => {
        if (index != 0 && item.length) {
          listColumn.map((field) => {
            if (field?.required && !item.find((el) => el.key == field.key)?.value) {
              check_required = true;
            }
            if (
              field.regex &&
              item.find((el) => el.key == field.key)?.value &&
              !item.find((el) => el.key == field.key)?.value.match(optionRegex[field.regex])
            ) {
              check_regex = true;
            }
          });
        }
      });
      if (check_required) {
        showToast("Các trường bắt buộc không được bỏ trống", "error");
        return;
      }
      if (check_regex) {
        showToast("Dữ liệu không hợp lệ", "error");
        return;
      }
    }
    const param = {
      nodeId: params?.nodeId || "Activity_0n3i8dv",
      processId: params?.processId || 380,
      potId: params?.potId || 496,
      fieldName: params?.fieldName || "boq",
      documentType: params?.documentType || "PVYC",
      workId: params?.workId || 1813,
      data: JSON.stringify(data),
    };
    // const response = await GridService.updateRow(param);
    // if (response.code === 0) {
    //   if (!isChangeColumns) {
    //     showToast("Lưu thành công", "success");
    //   }
    //   setIsChangeColumns(false);
    // } else {
    //   // showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    // }
    setLoading(false);
  };

  const addColumn = async (list_column) => {
    let dataSubmit = {
      nodeId: params?.nodeId || "Activity_0n3i8dv",
      processId: params?.processId || 380,
      fieldName: params?.fieldName || "boq",
      header: JSON.stringify(list_column),
    };
    // const responseHeader = await GridService.update(dataSubmit);

    // if (responseHeader.code === 0) {
    //   const result = responseHeader.result;
    //   const header = (result?.header && JSON.parse(result.header)) || null;
    //   setListColumn(header || []);
    // }
  };

  // ---------------Start Import frontend-------------------
  const [dataImport, setDataImport] = useState<any>(null);
  const [dataImportHeader, setDataImportHeader] = useState<any>(null);
  const [dataExcel, setDataExcel] = useState<any>(null);

  const [caclData, setCaclData] = useState<any>(false);
  const [lineSuccess, setLineSuccess] = useState<any>(0);

  const lineStart = 1;

  useEffect(() => {
    if (dataExcel) {
      setCaclData(true);
      setLineSuccess(0);
    }
  }, [dataExcel]);
  useEffect(() => {
    if (caclData) {
      caclImportData();
    }
  }, [caclData]);

  function excelDateToJSDate(serial) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);

    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate());
  }

  function sortArrayByHierarchy(array: string[]): string[] {
    return array.sort((a, b) => {
      const aParts = a.split(".").map(Number);
      const bParts = b.split(".").map(Number);

      for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
        const aVal = aParts[i] || 0; // Nếu không có giá trị, mặc định là 0
        const bVal = bParts[i] || 0;

        if (aVal !== bVal) {
          return aVal - bVal; // Sắp xếp tăng dần
        }
      }

      return 0; // Nếu tất cả các phần đều bằng nhau
    });
  }

  async function caclImportData() {
    const headerMap: Record<string, string> = {};
    for (const key of Object.keys(dataExcel[0])) {
      const found = baseRow.find((f) => f.name === key);
      if (found) {
        headerMap[found.key] = key;
      }
    }

    let newDataRow = [dataRow[0]];

    console.log('dataExcel123', dataExcel.slice(lineStart));
    for (const element of dataExcel.slice(lineStart)) {
      console.log('da vao 123');
      
      // Tạo 1 row mới
      let uuid = uuidv4();
      let _baseRow = baseRow.map((field) => ({
        ...field,
        rowKey: uuid,
      }));

      let new_field: any = [];
      let listIgnoreField = [];

      for (let field of _baseRow) {
        let excelKey = headerMap[field.key];
        let value = element[excelKey];
        console.log('field123', field);
        
        if (field.type == "binding" && element[field.name]) {
          console.log('da vao 1');
          
          let _value = null;

          if (field.lookup == "material" || field.lookup == "unit" || field.lookup == "work_category") {
            //Trường hợp này đang binding bằng code
            const safeValue = encodeURIComponent(element[field.name]?.toString() ?? "");
            _value = await loadValueLookup(null, field.lookup, field.listBindingField, safeValue);
          } else {
            //Trường hợp này đang binding bằng id
            _value = await loadValueLookup(element[field.name], field.lookup, field.listBindingField);
          }

          if (_value && _value?.value) {
            new_field.push({
              ...field,
              value: _value.value,
            });
            if (field?.listBindingField && field.listBindingField.length) {
              field.listBindingField.map((bindingField) => {
                if (bindingField.key.includes("NguoiLienHe_")) {
                  listIgnoreField.push(bindingField.key);
                  let fieldBinding = _baseRow.find((el) => el.key == bindingField.key);
                  let listContact = JSON.parse(_value[bindingField.key] ? _value[bindingField.key] : "[]");
                  new_field.push({
                    ...fieldBinding,
                    value: _value?.options_value ? _value?.options_value.find((el) => el.isDefault)?.value : "",
                    options: _value?.options_value,
                  });
                  fieldBinding.listBindingField.map((bindingFieldContactCheck) => {
                    if (bindingFieldContactCheck.key.includes("_NguoiLienHe")) {
                      listIgnoreField.push(bindingFieldContactCheck.key);
                      let fieldBindingContact = _baseRow.find((e_l) => e_l.key == bindingFieldContactCheck.key);
                      if (listContact.length) {
                        let defaultContact = listContact.find((e_ll) => e_ll.isDefault);
                        let valueKey =
                          bindingFieldContactCheck.key == "SoDienThoai_NguoiLienHe"
                            ? defaultContact?.phone
                            : bindingFieldContactCheck.key == "Email_NguoiLienHe"
                            ? defaultContact?.email
                            : bindingFieldContactCheck.key == "ChucVu_NguoiLienHe"
                            ? defaultContact?.position
                            : "";
                        new_field.push({
                          ...fieldBindingContact,
                          value: valueKey,
                        });
                      } else {
                        new_field.push({
                          ...fieldBindingContact,
                          value: "",
                        });
                      }
                    }
                  });
                } else {
                  listIgnoreField.push(bindingField.key);
                  let fieldBinding = _baseRow.find((el) => el.key == bindingField.key);
                  new_field.push({
                    ...fieldBinding,
                    value: _value[bindingField.key],
                  });
                }
              });
            }
          } else {
            new_field.push({
              ...field,
              value: "",
            });
          }
        } else if (field.type == "time_range") {
          console.log('da vao 2');
          const timeRange = JSON.parse(field.timeRange);
          const nameValueStart = _baseRow.find((el) => el.key == timeRange.startDate)?.name;
          const nameValueEnd = _baseRow.find((el) => el.key == timeRange.endDate)?.name;
          const valueStart = element[nameValueStart] || "";
          const valueEnd = element[nameValueEnd] || "";

          const startDate = valueStart ? moment(excelDateToJSDate(valueStart), "MM/DD/YYYY") : null;
          const endDate = valueEnd ? moment(excelDateToJSDate(valueEnd), "MM/DD/YYYY") : null;

          let count = 0;
          if (startDate && endDate) {
            let currentDate = startDate.clone();

            while (currentDate.isSameOrBefore(endDate)) {
              const dayOfWeek = currentDate.day();
              if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                // 0 là Chủ nhật, 6 là Thứ 7
                count++;
              }
              currentDate.add(1, "days");
            }
          }
          new_field.push({
            ...field,
            value: count + " ngày",
          });
        } else {
          console.log('da vao 3');
          if (!listIgnoreField.includes(field.key)) {
            if (field.type == "date") {
              new_field.push({
                ...field,
                value: value ? excelDateToJSDate(value) : "",
              });
            } else {
              new_field.push({
                ...field,
                value: value,
              });
            }
          }
        }
      }

      newDataRow.push(new_field);
      setLineSuccess((prev) => prev + 1);
    }
    console.log('newDataRow123', newDataRow);
    

    setDataRow(newDataRow);
    setCaclData(false);
    setShowModalImport(false);
  }

  const loadValueLookup = async (id, lookup, bindingField, code?: string) => {
    let response = {
      code: 0,
      result: null,
    };
    switch (lookup) {
      case "customer":
        response = await CustomerService.detail(id);
        break;
      case "reason":
        response = await ReasonListBpmService.detail(id);
        break;
      case "project_catalog":
        response = await ProjectCatalogService.detail(id);
        break;
      case "project_realty":
        response = await ProjectRealtyService.detail(id);
        break;
      case "unit":
        response = await UnitService.detail(id, code);
        break;
      case "material":
        response = await MaterialService.detail(id, code);
        break;
      case "field":
        response = await FieldListService.detail(id);
        break;
      case "business_category":
        response = await BusinessCategoryService.detail(id);
        break;
      case "supplier":
        response = await SupplierService.detail(id);
        break;
      case "investor":
        response = await InvestorService.detail(id);
        break;
      case "procurement_type":
        response = await ProcurementService.detail(id);
        break;
      case "work_category":
        response = await WorkCategoryService.detail(id, code);
        break;
      case "contact_org":
        response = await SupplierService.detailContact(id);
        break;
      default:
        break;
    }

    if (response.code === 0 && response.result) {
      const dataDetailLookup = response.result;
      let data_lookup = {
        value: dataDetailLookup?.id,
        label:
          lookup == "reason"
            ? dataDetailLookup?.reason || "No name"
            : lookup == "material"
            ? dataDetailLookup?.code + " - " + dataDetailLookup?.name || "No code"
            : lookup == "supplier"
            ? dataDetailLookup?.id + " - " + dataDetailLookup?.name || "No code"
            : lookup == "unit"
            ? dataDetailLookup?.code + " - " + dataDetailLookup?.name || "No code"
            : lookup == "work_category"
            ? dataDetailLookup?.code + " - " + dataDetailLookup?.name || "No code"
            : dataDetailLookup?.name || "No name",
        ...(bindingField?.length > 0
          ? bindingField.reduce((acc, field) => {
              acc[field.key] = dataDetailLookup[field.value] || "";
              return acc;
            }, {})
          : {}),
        options_value:
          dataDetailLookup?.contactOrg && JSON.parse(dataDetailLookup?.contactOrg)?.length
            ? JSON.parse(dataDetailLookup?.contactOrg).map((el) => {
                return {
                  value: el.id,
                  label: el.name,
                  isDefault: el.isDefault == 1 ? true : false,
                };
              })
            : [],
      };

      return data_lookup;
    }
  };
  // ---------------End Import frontend-------------------

  useEffect(() => {
    if (dataImport) {
      let dataImportNew = [];
      for (const key in dataImport) {
        if (dataImport.hasOwnProperty(key)) {
          dataImportNew.push({
            ...dataImport[key],
            rowKey: key,
          });
        }
      }
      const dataRowHeahder = listColumn.map((item: any) => ({
        name: item.name,
        key: item.key,
        rowKey: item.rowKey,
        type: item.type,
        placeholder: item.name,
        value: item.type === "checkbox" ? false : "",
        showNote: false,
        // noteList: [],
        options: item?.options ?? [],
        required: item?.required || false,
        isSum: item?.isSum || false,
        // regex: item?.regex || "",
        regex: item?.regex ? item.regex : "",
        lookup: item?.lookup || "",
        readOnly: item?.readOnly == 1 ? true : false,
      }));
      const baseRowFist = listColumn.map((item: any) => ({
        name: item.name,
        key: item.key,
        rowKey: item.rowKey,
        type: item.type,
        placeholder: item.name,
        value: item.type === "checkbox" ? false : "",
        showNote: false,
        // noteList: [],
        options: item?.options ?? [],
        required: item?.required || false,
        isSum: item?.isSum || false,
        // regex: item?.regex || "",
        regex: item?.regex ? item.regex : "",
        lookup: item?.lookup || "",
        listBindingField: item?.listBindingField || [],
        isBinding: item?.isBinding || false,
        bindingField: item?.bindingField || "",
        readOnly: item?.readOnly == 1 ? true : false,
      }));
      let list_data_new: any = dataImportNew.map((item) => {
        baseRowFist.map((field) => {
          item = {
            //Thêm các trường không có trong listColumn cũ
            ...item,
            [field.key]: field.type == "checkbox" ? (item[field.key] ? item[field.key] : false) : item[field.key] ? item[field.key] : "",
          };
        });
        return item;
      });

      if (list_data_new?.length > 0) {
        setDataRow([
          dataRowHeahder,
          ...list_data_new.map((item) => {
            return baseRowFist.map((field) => {
              return {
                ...field,
                value: field.type == "checkbox" ? (item[field.key] ? item[field.key] : false) : item[field.key] ? item[field.key] : "",
                noteList: item?.noteList && typeof item.noteList[field.key] != "undefined" ? item.noteList[field.key] : [],
                id: item?.id,
                readOnly: field?.readOnly || false,
                rowKey: item?.rowKey,
                isHaveNote: item?.listHaveNote && typeof item.listHaveNote[field.key] != "undefined" ? item.listHaveNote[field.key] : false,
              };
            });
          }),
        ]);
      }
    }
  }, [dataImport]);
  // ---------------End Import Backend-------------------

  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [supplierId, setSupplierId] = useState(0);

  const handleShowDetail = (rowIndex, fieldIndex) => {
    const data = dataRow[rowIndex][fieldIndex];
    if (data?.lookup == "supplier" && data?.value) {
      setShowModalAdd(true);
      setSupplierId(parseInt(data?.value));
    }
  };

  const [showPopoverStatus, setShowPopoverStatus] = useState<boolean[]>([]);

  const refColumn = useRef();
  const refColumnContainer = useRef();

  useOnClickOutside(refColumn, () => setShowPopoverStatus(showPopoverStatus.map((item) => false)), ["index"]);

  const insertNo = (no, position) => {
    let newNo = "";
    let stringNo = no ? no.toString() : "";
    if (stringNo) {
      // Tách các phần tử ngăn cách bằng dấu chấm của chuỗi no, nếu phần từ cuối cùng của mảng là số thì trừ 1 nếu position là "top"
      let parts = stringNo.split(".");
      let lastPart = parts[parts.length - 1];
      if (position === "top") {
        lastPart = parseInt(lastPart) >= 1 ? parseInt(lastPart) - 1 : 0;
      } else {
        lastPart = parseInt(lastPart) + 1;
      }
      // Gán newNo bằng no đã thay phần tử cuối bằng lastPart
      parts[parts.length - 1] = lastPart.toString();
      newNo = parts.join(".");
    }
    return newNo;
  };

  
  const handleActionRow = (detailAction) => {
    let uuid = uuidv4();
    switch (detailAction.action) {
      case "insert":
        let _baseRow = baseRow.map((field) => {
          return {
            ...field,
            rowKey: uuid,
          };
        });
        if (detailAction?.rowIndex !== undefined) {
          let _dataRow = [...dataRow];
          _dataRow.splice(detailAction?.position == "top" ? detailAction.rowIndex : detailAction.rowIndex + 1, 0, _baseRow);
          setDataRow(_dataRow);
        }
        break;
      case "insertTitle":
        let titleRow = {
          rowKey: uuid,
          style: "title-" + detailAction?.stype,
          content: "",
          indexTitle: "",
          type: "title",
          isShowEdit: true,
        };
        if (detailAction?.rowIndex !== undefined) {
          let _dataRow = [...dataRow];
          _dataRow.splice(detailAction?.position == "top" ? detailAction.rowIndex : detailAction.rowIndex + 1, 0, titleRow);
          setDataRow(_dataRow);
        }
        break;
      case "delete":
        handleDeleteRow(dataRow, detailAction?.rowIndex);
        break;
    }
  };

  const [refs, setRefs] = useState([]);
  const [height, setHeight] = useState([]);

  const [isDragging, setIsDragging] = useState(false);
  const [rowIndexDraging, setRowIndexDraging] = useState(0);
  const [listRef, setListRef] = useState([]);

  useEffect(() => {
    setShowPopoverStatus(dataRow.map((item) => false));
    setHeight(dataRow.map((item) => 44));
    setRefs((refs) =>
      Array(dataRow.length)
        .fill(null)
        .map((_, i) => refs[i] || React.createRef())
    );
    setListIndex(
      dataRow.map((item, index) => {
        if (item.type == "title") {
          return {
            isEdit: listIndex[index]?.isEdit || false,
            no: listIndex[index]?.no ? listIndex[index]?.no : item?.no || "",
            rowKey: item.rowKey || `title-${index}`,
            type: item.type || "title",
            validate: listIndex[index]?.validate || true,
            level: getLevel(item?.no),
          };
        }

        return {
          isEdit: listIndex[index]?.isEdit || false,
          no: item[0]?.key == "stt" ? item[0]?.value : "",
          rowKey: item[0]?.rowKey || `row-${index}`,
          type: "row",
          validate: listIndex[index]?.validate || true,
          level: item[0]?.level ? item[0]?.level : getLevel(item[0]?.value),
        };
      })
    );
  }, [dataRow]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDragging && rowIndexDraging !== null && refs[rowIndexDraging].current) {
        const newHeight = event.clientY - refs[rowIndexDraging].current.getBoundingClientRect().top;
        setHeight(height.map((item, index) => (index == rowIndexDraging ? newHeight : item)));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, rowIndexDraging]);

  const handleMouseDown = (rowIndex) => {
    setIsDragging(true);
    setRowIndexDraging(rowIndex);
  };

  const [editColumn, setEditColumn] = useState([]);
  useEffect(() => {
    setEditColumn(
      listColumn.map((item) => {
        return {
          newPosition: item.position,
          isShowEdit: false,
        };
      })
    );
  }, [listColumn]);

  const handleUpdateColumn = async (fieldIndex) => {
    setEditColumn(
      editColumn.map((item, index) =>
        index == fieldIndex
          ? {
              ...item,
              isShowEdit: false,
            }
          : item
      )
    );
    let newListColumn = listColumn.map((item, index) => {
      return index == fieldIndex ? { ...item, position: editColumn[fieldIndex]?.newPosition } : item;
    });
    newListColumn.sort((a, b) => a.position - b.position);

    let dataSubmit = {
      nodeId: params?.nodeId || "Activity_0n3i8dv",
      processId: params?.processId || 380,
      fieldName: params?.fieldName || "boq",
      header: JSON.stringify(newListColumn),
      // header: JSON.stringify([]), // Xoá header - chỉ dùng để test
      typeNo: typeNo,
    };

    // return;
    const responseHeader = await GridService.update(dataSubmit);

    if (responseHeader.code === 0) {
      setListColumn(newListColumn);
    } else {
      showToast(responseHeader.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  const handleUpdateTypeNo = async (newTypeNo) => {
    let dataSubmit = {
      nodeId: params?.nodeId || "Activity_0n3i8dv",
      processId: params?.processId || 380,
      fieldName: params?.fieldName || "boq",
      header: JSON.stringify(listColumn),
      typeNo: newTypeNo,
    };

    const responseHeader = await GridService.update(dataSubmit);

    if (responseHeader.code === 0) {
      showToast("Cập nhật thành công", "success");
      if (newTypeNo == "input") {
        if (listColumn && listColumn.length > 0) {
          if (listColumn[0]?.key != "stt") {
            //Nếu chưa có cột STT thì thêm vào
            let newListColumn = [
              {
                name: "STT",
                key: "stt",
                rowKey: "stt",
                type: "text",
                placeholder: "STT",
                value: "",
                showNote: false,
                options: [],
                required: false,
                isSum: false,
                regex: "",
                lookup: "",
                formula: "",
                timeRange: "",
                readOnly: true,
              },
              ...listColumn,
            ];
            setListColumn(newListColumn);
          }
        } else {
          let newListColumn = [
            {
              name: "STT",
              key: "stt",
              rowKey: "stt",
              type: "text",
              placeholder: "STT",
              value: "",
              showNote: false,
              options: [],
              required: false,
              isSum: false,
              regex: "",
              lookup: "",
              formula: "",
              timeRange: "",
              readOnly: true,
            },
          ];
          setListColumn(newListColumn);
        }
      }
    } else {
      showToast(responseHeader.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  const hanhdleDeleteColumn = async (field) => {
    if (field.type == "binding") {
      let listDeleteField = [field.key];
      if (field?.listBindingField && field.listBindingField?.length) {
        field.listBindingField.map((bindingField) => {
          let fieldBinding = listColumn.find((el) => el.key == bindingField.key);
          if (fieldBinding) {
            listDeleteField.push(bindingField.key);
            if (fieldBinding?.listBindingField && fieldBinding.listBindingField?.length) {
              fieldBinding.listBindingField.map((bindingFieldContact) => {
                let fieldBindingContact = listColumn.find((el) => el.key == bindingFieldContact.key);
                if (fieldBindingContact) {
                  listDeleteField.push(bindingFieldContact.key);
                }
              });
            }
          }
        });
      }
      for (let index = 0; index < listDeleteField.length; index++) {
        const element = listDeleteField[index];
        await onDeleteColumn({
          key: element,
          nodeId: params?.nodeId || "Activity_0n3i8dv",
          fieldName: params?.fieldName || "boq",
        });
      }
      setListColumn(listColumn.filter((item) => !listDeleteField.includes(item.key)));
    } else {
      await onDeleteColumn({
        key: field.key,
        nodeId: params?.nodeId || "Activity_0n3i8dv",
        fieldName: params?.fieldName || "boq",
      });
      setListColumn(listColumn.filter((item) => item.name !== field.name));
    }
    setLoading(false);
  };

  const [showConfigNo, setShowConfigNo] = useState<boolean>(false);

  const [typeNo, setTypeNo] = useState<string>("auto");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "Enter", "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  };
  const validateInput = (value: string): boolean => {
    const regex = /^(?!.*\.\.)[0-9]+(\.[0-9]+)*$/;
    return regex.test(value);
  };
  const getLevel = (no: string) => {
    // Nếu no không có dấu "." nào thì trả về 1, nếu có 1 dấu "." thì trả về 2, nếu có 2 dấu "." thì trả về 3, v.v.
    if (!no) return 4;
    if (!no.toString().includes(".")) return 1;
    const parts = no.toString().split(".");
    return parts.length >= 4 ? 4 : parts.length; // Trả về 4 nếu có 3 dấu "." trở lên
  };


  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        size="xxl"
        toggle={() => !isSubmit && handleClear(false)}
        className="modal-add-bidding-form"
      >
        <form className="form-add-bidding-form" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader title={titleType === "UPDATE" ? "Chỉnh sửa biểu mẫu hồ sơ mời thầu" : "Thêm mới biểu mẫu hồ sơ mời thầu"} toggle={() => !isSubmit && handleClear(false)} />
          <ModalBody>
            <div className="container-add-bidding-form">
              <div className="body-content">
                <div className="form-group">
                  <Input
                    id="name"
                    name="name"
                    label={"Tên biểu mẫu"}
                    fill={true}
                    required={true}
                    placeholder={"Nhập tên biểu mẫu"}
                    // hiển thị cảnh báo đỏ khi có lỗi
                    error={!!formData.errors?.name}
                    message={formData.errors?.name}
                    value={formData.values.name}
                    onChange={e => {
                      const v = e.target.value;
                      setFormData(f => ({
                        ...f,
                        values: { ...f.values, name: v },
                        errors: {
                          ...f.errors,
                          name: !v.trim()
                            ? "Tên biểu mẫu không được bỏ trống"
                            : undefined
                        }
                      }));
                    }}
                  />
                </div>

                {/* <div className="form-group">
                    <Input
                        id="key"
                        name="key"
                        label={'Mã biểu mẫu'}
                        fill={true}
                        required={true}
                        // error={item.checkValue}
                        // message="Value không được để trống"
                        placeholder={"Nhập mã biểu mẫu"}
                        value={formData.values.key}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData({ ...formData, values: { ...formData.values, key: value } });
                        }}
                    />
                </div> */}

                <div className="form-group">
                  <Input
                    id="typeProfile"
                    name="typeProfile"
                    label={"Loại hồ sơ mời thầu"}
                    fill={true}
                    required={true}
                    error={!!formData.errors?.documentType}
                    message={formData.errors?.documentType}
                    placeholder={"Nhập loại hồ sơ mời thầu"}
                    value={formData.values.documentType}
                    onChange={e => {
                      const v = e.target.value;
                      setFormData(f => ({
                        ...f,
                        values: { ...f.values, documentType: v },
                        errors: {
                          ...f.errors,
                          documentType: !v.trim()
                            ? "Loại hồ sơ mời thầu không được bỏ trống"
                            : undefined
                        }
                      }));
                    }}
                  />
                </div>

                <div className="form-group">
                  <SelectCustom
                    id=""
                    name=""
                    label={"Lĩnh vực"}
                    fill={true}
                    value={fieldData}
                    required={true}
                    options={[]}
                    disabled={isView}
                    onChange={(e) => {
                      setFieldData(e);
                      setFormData({ ...formData, values: { ...formData.values, fieldId: e.value } });
                    }}
                    isAsyncPaginate={true}
                    placeholder="Chọn lĩnh vực"
                    additional={{
                      page: 1,
                    }}
                    loadOptionsPaginate={loadedOptionField}
                  />
                </div>

                <div className="form-group">
                  <SelectCustom
                    id=""
                    name=""
                    label={"Loại gói thầu"}
                    fill={true}
                    value={typePackage}
                    required={true}
                    options={[]}
                    disabled={isView}
                    onChange={(e) => {
                      setTypePackage(e);
                      setFormData({ ...formData, values: { ...formData.values, procurementTypeId: e.value } });
                    }}
                    isAsyncPaginate={true}
                    placeholder="Chọn loại gói thầu"
                    additional={{
                      page: 1,
                    }}
                    loadOptionsPaginate={loadedOptionProcurementType}
                  />
                </div>

                <div className="form-group">
                  <SelectCustom
                    id=""
                    name=""
                    label={"Loại dự án"}
                    fill={true}
                    value={typeProject}
                    required={true}
                    options={[]}
                    disabled={isView}
                    onChange={(e) => {
                      setTypeProject(e);
                      setFormData({ ...formData, values: { ...formData.values, projectTypeId: e.value } });
                    }}
                    isAsyncPaginate={true}
                    placeholder="Chọn loại dự án"
                    additional={{
                      page: 1,
                    }}
                    loadOptionsPaginate={loadedOptionProjectCatalog}
                  />
                </div>

                <div className="container-grid">
                  {!success || loading ? (
                    <div className="loading-grid">
                      <div className="import-loading">
                        <Icon name="Refresh" />
                      </div>
                    </div>
                  ) : null}
                  <div className="form-group">
                    {/* <div className="label__form">
                      <span className="label">{title}</span>
                    </div> */}
                    <div className="action-excel">
                      <Button
                        color="secondary"
                        className="button--left"
                        onClick={() => {
                          setOnShowModalExport(true);
                          handlExportData();
                        }}
                        type="button"
                      >
                        <Icon name="Upload" /> Xuất dữ liệu Excel
                      </Button>
                      <Button
                        color="secondary"
                        className="button--right"
                        onClick={() => {
                          setShowModalImport(true);
                        }}
                        type="button"
                      >
                        <Icon name="DownLoadNew" /> Nhập dữ liệu Excel
                      </Button>
                    </div>

                    {dataRow.length > 0 ? (
                      <div className="content__tbody--table">
                        <div className="wrap-table" style={params?.fieldName == "hsmt" ? { borderRight: "none", borderBottomRightRadius: "0" } : {}}>
                          {dataRow.map((row, rowIndex) => {
                            if (row?.type == "title") {
                              return (
                                <div key={rowIndex} className="item__tbody-title">
                                  {typeNo == "auto" ? (
                                    <div
                                      className={rowIndex == dataRow.length - 1 ? `index--last index--title` : `index--title`}
                                      onClick={() => {
                                        setShowPopoverStatus(
                                          showPopoverStatus.map((item, index) => {
                                            return index == rowIndex ? !item : false;
                                          })
                                        );
                                      }}
                                    >
                                      <div className="index--data" style={{ cursor: "pointer" }}>
                                        <div>{rowIndex}</div>
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <div className={rowIndex == dataRow.length - 1 ? `index--last index-input` : `index-input`}>
                                        <div
                                          className="icon-popover"
                                          onClick={() => {
                                            setShowPopoverStatus(
                                              showPopoverStatus.map((item, index) => {
                                                return index == rowIndex ? !item : false;
                                              })
                                            );
                                          }}
                                        >
                                          <Icon name="Settings" />
                                        </div>
                                        {/* {validateInput(dataRow[rowIndex]?.no) ? null : (
                                          <Tippy content={"STT không hợp lệ"}>
                                            <div className="icon-error">!</div>
                                          </Tippy>
                                        )} */}
                                        {listIndex[rowIndex]?.isEdit ? (
                                          <Input
                                            refInput={inputRef}
                                            name={`index-input-${rowIndex}`}
                                            value={dataRow[rowIndex]?.no || ""}
                                            readOnly={false}
                                            disabled={false}
                                            onChange={(e) => {
                                              // Chỉ nhận giá trị số từ 0-9 và dấu "."
                                              setDataRow(
                                                dataRow.map((item, index) => {
                                                  return index == rowIndex
                                                    ? {
                                                        ...item,
                                                        no: e.target.value,
                                                      }
                                                    : item;
                                                })
                                              );
                                            }}
                                            placeholder={" "}
                                            onKeyDown={(e) => {
                                              //Chỉ nhận giá trị số từ 0-9 và dấu "." và Enter
                                              handleKeyDown(e);
                                              if (e.key === "Enter") {
                                                // Thực hiện hành động khi nhấn Enter
                                                // Đổi trạng thái isShowEdit = false
                                                setListIndex(
                                                  listIndex.map((item, index) => {
                                                    return index == rowIndex
                                                      ? {
                                                          ...item,
                                                          isEdit: false,
                                                          level: getLevel(dataRow[rowIndex]?.no),
                                                        }
                                                      : item;
                                                  })
                                                );
                                              }
                                            }}
                                            onBlur={() => {
                                              setListIndex(
                                                listIndex.map((item, index) => {
                                                  return index == rowIndex
                                                    ? {
                                                        ...item,
                                                        isEdit: false,
                                                        level: getLevel(dataRow[rowIndex]?.no),
                                                      }
                                                    : item;
                                                })
                                              );
                                            }}
                                            error={validateInput(dataRow[rowIndex]?.no) ? false : true}
                                            message={""}
                                          />
                                        ) : (
                                          <div
                                            className={`index-no row-lv${listIndex[rowIndex]?.level || 4}`}
                                            style={{ paddingLeft: "0.8rem", paddingRight: "0.5rem" }}
                                            onClick={() => {
                                              setListIndex(
                                                listIndex.map((item, index) => {
                                                  return index == rowIndex ? { ...item, isEdit: true } : { ...item, isEdit: false };
                                                })
                                              );
                                              setTimeout(() => {
                                                inputRef.current?.focus(); // Focus vào input sau khi hiển thị
                                              }, 0);
                                            }}
                                          >
                                            {row?.no || ""}
                                          </div>
                                        )}
                                      </div>
                                    </>
                                  )}
                                  {showPopoverStatus[rowIndex] &&  rowIndex != 0 ? (
                                    <Popover
                                      direction={"bottom"}
                                      alignment={"left"}
                                      isTriangle={true}
                                      className="popover-note"
                                      refContainer={null}
                                      refPopover={refColumn}
                                      forNote={true}
                                    >
                                      <ActionRow onShow={true} rowIndex={rowIndex} callBack={(detailAction) => handleActionRow(detailAction)}></ActionRow>
                                    </Popover>
                                  ) : null}

                                  {row.isShowEdit ? (
                                    <div key={"title-" + rowIndex} className="content-title" style={{ paddingLeft: "1rem" }}>
                                      <TextArea
                                        name={"title-" + rowIndex}
                                        value={row.content}
                                        autoFocus={true}
                                        readOnly={false}
                                        onChange={(e) => {
                                          setDataRow(
                                            dataRow.map((itemRow, indexItemRow) => {
                                              if (indexItemRow == rowIndex) {
                                                return {
                                                  ...itemRow,
                                                  content: e.target.value,
                                                };
                                              }
                                              return itemRow;
                                            })
                                          );
                                        }}
                                        onKeyDown={(e) => {
                                          if (e.key === "Enter") {
                                            // Thực hiện hành động khi nhấn Enter
                                            // Đổi trạng thái isShowEdit = false
                                            setDataRow(
                                              dataRow.map((itemRow, indexItemRow) => {
                                                if (indexItemRow == rowIndex) {
                                                  return {
                                                    ...itemRow,
                                                    isShowEdit: false,
                                                  };
                                                }
                                                return itemRow;
                                              })
                                            );
                                          }
                                        }}
                                        onBlur={() => {
                                          setDataRow(
                                            dataRow.map((itemRow, indexItemRow) => {
                                              if (indexItemRow == rowIndex) {
                                                return {
                                                  ...itemRow,
                                                  isShowEdit: false,
                                                };
                                              }
                                              return itemRow;
                                            })
                                          );
                                        }}
                                        placeholder={"Nhập tiêu đề " + row.style.split("-")[1]}
                                      />
                                    </div>
                                  ) : (
                                    <div
                                      className={row.style + " content-title"}
                                      style={
                                        params?.fieldName == "hsmt"
                                          ? {
                                              cursor: "pointer",
                                              whiteSpace: "normal",
                                              color: "black",
                                              borderRight: "1px solid var(--extra-color-50)",
                                              fontWeight: "bold",
                                            }
                                          : { cursor: "pointer", whiteSpace: "normal" }
                                      }
                                      onDoubleClick={() => {
                                        // Đổi trạng thái isShowEdit = true
                                        setDataRow(
                                          dataRow.map((itemRow, indexItemRow) => {
                                            if (indexItemRow == rowIndex) {
                                              return {
                                                ...itemRow,
                                                isShowEdit: true,
                                              };
                                            }
                                            return itemRow;
                                          })
                                        );
                                      }}
                                    >
                                      <div>{row.content}</div>
                                    </div>
                                  )}
                                </div>
                              );
                            } else {
                              return (
                                //
                                <div
                                  key={rowIndex}
                                  ref={refs[rowIndex]}
                                  className={rowIndex == 0 ? `item__tbody item__tbody--header` : `item__tbody item_row_${rowIndex}`}
                                  style={params?.fieldName == "hsmt" ? { borderTopRightRadius: "0" } : {}}
                                >
                                  <div
                                    className={
                                      rowIndex == 0
                                        ? typeNo == "input"
                                          ? `index index--header-input`
                                          : `index index--header`
                                        : rowIndex == dataRow.length - 1
                                        ? `index index--last`
                                        : `index`
                                    }
                                    style={{ height: row?.find((item) => item?.isRegexFalse) ? "80px" : "" }}
                                    onClick={() => {
                                      if (typeNo == "input") {
                                        console.log("click index input");
                                      }
                                    }}
                                  >
                                    {rowIndex == 0 ? (
                                      <Tippy content={"Chọn kiểu số thứ tự"}>
                                        <div
                                          className="stt"
                                          onClick={() => {
                                            setShowConfigNo(true);
                                          }}
                                        >
                                          STT
                                        </div>
                                      </Tippy>
                                    ) : (
                                      <>
                                        <div className="index--data" style={{ cursor: "pointer" }}>
                                          <>
                                            {typeNo == "auto" ? (
                                              <div
                                                className={`index--number`}
                                                onClick={() => {
                                                  setShowPopoverStatus(
                                                    showPopoverStatus.map((item, index) => {
                                                      return index == rowIndex ? !item : false;
                                                    })
                                                  );
                                                }}
                                              >
                                                {rowIndex}
                                              </div>
                                            ) : (
                                              <div
                                                className={`index-input`}
                                                onClick={() => {
                                                  setListIndex(
                                                    listIndex.map((item, index) => {
                                                      return index == rowIndex ? { ...item, isEdit: true } : { ...item, isEdit: false };
                                                    })
                                                  );
                                                  setTimeout(() => {
                                                    inputRef.current?.focus(); // Focus vào input sau khi hiển thị
                                                  }, 0);
                                                }}
                                              >
                                                {listIndex[rowIndex]?.isEdit ? (
                                                  <Input
                                                    refInput={inputRef}
                                                    name={`index-input-${rowIndex}`}
                                                    value={dataRow[rowIndex][0]?.value || ""}
                                                    readOnly={false}
                                                    disabled={false}
                                                    onChange={(e) => handChangeValueItem(rowIndex, 0, e, "input")}
                                                    placeholder={" "}
                                                    onKeyDown={(e) => {
                                                      //Chỉ nhận giá trị số từ 0-9 và dấu "." và Enter
                                                      handleKeyDown(e);
                                                      if (e.key === "Enter") {
                                                        // Thực hiện hành động khi nhấn Enter
                                                        // Đổi trạng thái isShowEdit = false
                                                        setListIndex(
                                                          listIndex.map((item, index) => {
                                                            return index == rowIndex
                                                              ? {
                                                                  ...item,
                                                                  isEdit: false,
                                                                  level: getLevel(dataRow[rowIndex][0]?.value),
                                                                }
                                                              : item;
                                                          })
                                                        );
                                                      }
                                                    }}
                                                    onBlur={() => {
                                                      setListIndex(
                                                        listIndex.map((item, index) => {
                                                          return index == rowIndex
                                                            ? {
                                                                ...item,
                                                                isEdit: false,
                                                                level: getLevel(dataRow[rowIndex][0]?.value),
                                                              }
                                                            : item;
                                                        })
                                                      );
                                                    }}
                                                    error={validateInput(dataRow[rowIndex][0]?.value) ? false : true}
                                                    message={""}
                                                  />
                                                ) : (
                                                  <>
                                                    {validateInput(dataRow[rowIndex][0]?.value) ? (
                                                      <div
                                                        className={`index-no row-lv${listIndex[rowIndex]?.level || 4}`}
                                                        style={{ paddingLeft: "0.8rem", paddingRight: "0.5rem" }}
                                                      >
                                                        {dataRow[rowIndex][0]?.value || ""}
                                                      </div>
                                                    ) : (
                                                      <div
                                                        className={`index-no row-lv${listIndex[rowIndex]?.level || 4}`}
                                                        style={{ paddingLeft: "0.8rem", paddingRight: "0.5rem" }}
                                                      >
                                                        {dataRow[rowIndex][0]?.value || ""}
                                                      </div>
                                                    )}
                                                  </>
                                                )}
                                              </div>
                                            )}
                                            <div className="index--carret">
                                              <div
                                                className="svg-carret"
                                                onMouseDown={() => {
                                                  handleMouseDown(rowIndex);
                                                }}
                                              >
                                                <Icon name="CaretDown" />
                                              </div>
                                            </div>
                                          </>
                                        </div>
                                        {typeNo == "input" ? (
                                          <div
                                            className="icon-popover"
                                            onClick={() => {
                                              setShowPopoverStatus(
                                                showPopoverStatus.map((item, index) => {
                                                  return index == rowIndex ? !item : false;
                                                })
                                              );
                                            }}
                                          >
                                            <Icon name="Settings" />
                                          </div>
                                        ) : null}
                                        {/* {validateInput(dataRow[rowIndex][0]?.value) ? null : (
                                          <>
                                            {dataRow[rowIndex][0]?.isSumRow ? null : (
                                              <Tippy content={"STT không hợp lệ"}>
                                                <div className="icon-error">!</div>
                                              </Tippy>
                                            )}
                                          </>
                                        )} */}
                                      </>
                                    )}
                                  </div>
                                  {showPopoverStatus[rowIndex] && rowIndex != 0 ? (
                                    <Popover
                                      direction={"bottom"}
                                      alignment={"left"}
                                      isTriangle={true}
                                      className="popover-note"
                                      refContainer={null}
                                      refPopover={refColumn}
                                      forNote={true}
                                    >
                                      <ActionRow onShow={true} rowIndex={rowIndex} callBack={(detailAction) => handleActionRow(detailAction)}></ActionRow>
                                    </Popover>
                                  ) : null}

                                  <>
                                    {row[1] && row[1]?.type == "titleSum" ? (
                                      // Hàng tiêu đề tổng
                                      <>
                                        {row.map((field, fieldIndex) => {
                                          return (
                                            <>
                                              {field.key != "documentType" && field.key != "stt" ? (
                                                <>
                                                  <div
                                                    key={fieldIndex}
                                                    className={rowIndex == dataRow.length - 1 ? `form-field form-field--last` : `form-field`}
                                                    style={{ height: row?.find((item) => item?.isRegexFalse) ? "80px" : "" }}
                                                  >
                                                    {field.type === "number" || field.type === "formula" ? (
                                                      <>
                                                        {field?.isSum ? (
                                                          <NummericInput
                                                            name={field.name}
                                                            value={field.value}
                                                            disabled={false}
                                                            readOnly={true}
                                                            thousandSeparator={true}
                                                            onValueChange={(e) => {}}
                                                            placeholder={`Tổng ${field?.placeholder}`}
                                                            isDecimalScale={false}
                                                          />
                                                        ) : null}
                                                      </>
                                                    ) : field.type === "titleSum" ? (
                                                      <>
                                                        {row[1].isShowEdit ? (
                                                          // Sửa tiêu đề tổng
                                                          <div key={"title-" + rowIndex} className="content-title" style={{ paddingLeft: "1rem" }}>
                                                            <TextArea
                                                              name={"title-" + rowIndex}
                                                              value={row[1].value}
                                                              autoFocus={true}
                                                              readOnly={false}
                                                              onChange={(e) => {
                                                                setDataRow(
                                                                  dataRow.map((itemRow, indexItemRow) => {
                                                                    if (indexItemRow == rowIndex) {
                                                                      itemRow.map((itemField, indexItemField) => {
                                                                        if (indexItemField == 1) {
                                                                          itemField.value = e.target.value; // Đặt isShowEdit cho các trường khác thành false
                                                                          return itemField;
                                                                        }
                                                                        return itemField;
                                                                      });
                                                                    }
                                                                    return itemRow;
                                                                  })
                                                                );
                                                              }}
                                                              onKeyDown={(e) => {
                                                                if (e.key === "Enter") {
                                                                  // Thực hiện hành động khi nhấn Enter
                                                                  // Đổi trạng thái isShowEdit = false
                                                                  setDataRow(
                                                                    dataRow.map((itemRow, indexItemRow) => {
                                                                      if (indexItemRow == rowIndex) {
                                                                        itemRow.map((itemField, indexItemField) => {
                                                                          if (indexItemField == 1) {
                                                                            itemField.isShowEdit = false; // Đặt isShowEdit cho các trường khác thành false
                                                                            return itemField;
                                                                          }
                                                                          return itemField;
                                                                        });
                                                                      }
                                                                      return itemRow;
                                                                    })
                                                                  );
                                                                }
                                                              }}
                                                              onBlur={() => {
                                                                setDataRow(
                                                                  dataRow.map((itemRow, indexItemRow) => {
                                                                    if (indexItemRow == rowIndex) {
                                                                      itemRow.map((itemField, indexItemField) => {
                                                                        if (indexItemField == 1) {
                                                                          itemField.isShowEdit = false; // Đặt isShowEdit cho các trường khác thành false
                                                                          return itemField;
                                                                        }
                                                                        return itemField;
                                                                      });
                                                                    }
                                                                    return itemRow;
                                                                  })
                                                                );
                                                              }}
                                                              placeholder={"Nhập tiêu đề " + row[1].style}
                                                            />
                                                          </div>
                                                        ) : (
                                                          <div
                                                            className={"title-" + row[1].style + " content-title"}
                                                            style={
                                                              params?.fieldName == "hsmt"
                                                                ? {
                                                                    cursor: "pointer",
                                                                    whiteSpace: "normal",
                                                                    color: "black",
                                                                    borderRight: "1px solid var(--extra-color-50)",
                                                                    fontWeight: "bold",
                                                                  }
                                                                : { cursor: "pointer", whiteSpace: "normal", minHeight: "40px" } // Thêm minHeight để đảm bảo cột tiêu đề tổng có chiều cao tối thiểu
                                                            }
                                                            onDoubleClick={() => {
                                                              // Đổi trạng thái isShowEdit = true
                                                              setDataRow(
                                                                dataRow.map((itemRow, indexItemRow) => {
                                                                  if (indexItemRow == rowIndex) {
                                                                    itemRow.map((itemField, indexItemField) => {
                                                                      if (indexItemField == 1) {
                                                                        itemField.isShowEdit = true; // Đặt isShowEdit cho các trường khác thành false
                                                                        return itemField;
                                                                      }
                                                                      return itemField;
                                                                    });
                                                                  }
                                                                  return itemRow;
                                                                })
                                                              );
                                                            }}
                                                          >
                                                            <div>
                                                              {row[1].value || (
                                                                <div style={{ color: "var(--extra-color-50)", fontStyle: "italic", fontSize: 13 }}>
                                                                  DoubleClick để sửa tiêu đề
                                                                </div>
                                                              )}
                                                            </div>{" "}
                                                            {/* Hiển thị giá trị của trường tiêu đề Tổng - Mặc định là cột 1 */}
                                                          </div>
                                                        )}
                                                      </>
                                                    ) : null}
                                                  </div>
                                                </>
                                              ) : null}
                                            </>
                                          );
                                        })}
                                      </>
                                    ) : (
                                      <>
                                        {row.map((field, fieldIndex) => {
                                          return rowIndex == 0 ? ( // Hàng đầu tiên là tiêu đề
                                            <>
                                              {field.key != "documentType" && field.key != "stt" ? (
                                                <div
                                                  key={fieldIndex}
                                                  className={`form-field form-field--header`}
                                                  // style={{ borderBottom: "1px solid var(--extra-color-50)" }}
                                                >
                                                  <div className="form-field__header">
                                                    {editColumn[fieldIndex]?.isShowEdit ? (
                                                      <NummericInput
                                                        name={"edit-position-" + fieldIndex}
                                                        value={editColumn[fieldIndex]?.newPosition}
                                                        autoFocus={true}
                                                        onValueChange={(e) => {
                                                          let newEditColumn = editColumn.map((item, index) => {
                                                            return index == fieldIndex ? { ...item, newPosition: e.floatValue } : item;
                                                          });
                                                          setEditColumn(newEditColumn);
                                                        }}
                                                        onKeyDown={(e) => {
                                                          if (e.key === "Enter") {
                                                            handleUpdateColumn(fieldIndex);
                                                          }
                                                        }}
                                                        onBlur={() => {
                                                          setEditColumn(
                                                            editColumn.map((item, index) =>
                                                              index == fieldIndex
                                                                ? {
                                                                    ...item,
                                                                    isShowEdit: false,
                                                                  }
                                                                : item
                                                            )
                                                          );
                                                        }}
                                                        placeholder={`Nhập thứ tự hiển thị`}
                                                      />
                                                    ) : (
                                                      <>
                                                        <div style={{ fontSize: 14, fontWeight: 600 }}>
                                                          {field?.placeholder?.length > 55 ? `${field?.placeholder.substring(0, 55)}...` : field?.placeholder}
                                                        </div>
                                                        {field?.required && <span style={{ color: "red", marginLeft: "5px", fontSize: "18px" }}>*</span>}
                                                        <div
                                                          title={"Sửa vị trí cột"}
                                                          className={"edit-column"}
                                                          // onClick={() => {
                                                          //   setEditColumn(
                                                          //     editColumn.map((item, index) =>
                                                          //       index == fieldIndex
                                                          //         ? {
                                                          //             ...item,
                                                          //             isShowEdit: true,
                                                          //           }
                                                          //         : item
                                                          //     )
                                                          //   );
                                                          // }}
                                                        >
                                                          <div
                                                            onClick={() => {
                                                              setEditColumn(
                                                                editColumn.map((item, index) =>
                                                                  index == fieldIndex
                                                                    ? {
                                                                        ...item,
                                                                        isShowEdit: true,
                                                                      }
                                                                    : item
                                                                )
                                                              );
                                                            }}
                                                          >
                                                            Thứ tự hiển thị: {listColumn[fieldIndex]?.position || 0}
                                                          </div>
                                                          {!listColumn[fieldIndex]?.isBinding ? (
                                                            <div
                                                              title={"Sửa cột"}
                                                              className={"show-seting-column"}
                                                              onClick={() => {
                                                                setIsChangeColumns(true);
                                                                setShowModalAddColumn(true);
                                                                setDataColumnEdit(listColumn[fieldIndex]);
                                                                // hanhdleDeleteColumn(field);
                                                              }}
                                                            >
                                                              <Icon name="Settings" />
                                                            </div>
                                                          ) : null}
                                                        </div>
                                                      </>
                                                    )}
                                                  </div>
                                                </div>
                                              ) : null}
                                            </>
                                          ) : (
                                            <>
                                              {dataRow[rowIndex][0]?.isSumRow && field.key != "stt" ? (
                                                // Hàng tổng - Cuối
                                                <>
                                                  <div
                                                    key={fieldIndex}
                                                    className={rowIndex == dataRow.length - 1 ? `form-field form-field--last` : `form-field`}
                                                    style={{ height: row?.find((item) => item?.isRegexFalse) ? "80px" : "" }}
                                                  >
                                                  
                                                    {(field.type === "number" || field.type === "formula") && field?.isSum ? (
                                                      <NummericInput
                                                        name={field.name}
                                                        value={field.value}
                                                        disabled={false}
                                                        readOnly={true}
                                                        thousandSeparator={true}
                                                        onValueChange={(e) => {}}
                                                        placeholder={`Tổng ${field?.placeholder}`}
                                                        isDecimalScale={false}
                                                      />
                                                    ) : null}
                                                  </div>
                                                </>
                                              ) : (
                                                <>
                                                  {field.key != "documentType" && field.key != "stt" ? (
                                                    <div
                                                      key={fieldIndex}
                                                      className={rowIndex == dataRow.length - 1 ? `form-field form-field--last` : `form-field`}
                                                      style={{ height: row?.find((item) => item?.isRegexFalse) ? "80px" : "" }}
                                                    >
                                                      
                                                      {field.type === "text" ? (
                                                        <TextArea
                                                          name={field.name}
                                                          row={1}
                                                          value={field.value}
                                                          readOnly={field.readOnly}
                                                          disabled={false}
                                                          placeholder={"Nhập " + field?.placeholder}
                                                          onChange={(e) => handChangeValueItem(rowIndex, fieldIndex, e, "input")}
                                                          error={field?.isRegexFalse}
                                                          message={field.name + " không hợp lệ"}
                                                          height={height[rowIndex] + "px"}
                                                        />
                                                      ) : field.type === "number" ? (
                                                        <NummericInput
                                                          name={field.name}
                                                          value={field.value}
                                                          disabled={false}
                                                          placeholder={"Nhập " + field?.placeholder}
                                                          thousandSeparator={true}
                                                          onValueChange={(e) => handChangeValueItem(rowIndex, fieldIndex, e, "number")}
                                                          isDecimalScale={false}
                                                        />
                                                      ) : field.type === "checkbox" ? (
                                                        <>
                                                          <Checkbox
                                                            checked={field.value}
                                                            disabled={field.readOnly}
                                                            onChange={(e) => handChangeValueItem(rowIndex, fieldIndex, e, "checkbox")}
                                                          />
                                                        </>
                                                      ) : field.type === "date" ? (
                                                        <DatePickerCustom
                                                          name={field.name}
                                                          fill={false}
                                                          // value={field.value}
                                                          value={field.value ? moment(field.value).format("DD/MM/YYYY") : ""}
                                                          iconPosition="left"
                                                          // icon={<Icon name="Calendar" />}
                                                          onChange={(e) => handChangeValueItem(rowIndex, fieldIndex, e, field.type)}
                                                          disabled={field.readOnly}
                                                          placeholder={"Chọn " + field?.placeholder}
                                                        />
                                                      ) : field.type === "formula" ? (
                                                        <NummericInput
                                                          name={field.name}
                                                          value={field.value}
                                                          thousandSeparator={true}
                                                          disabled={true}
                                                          placeholder={"Nhập " + field?.placeholder}
                                                          isDecimalScale={false}
                                                        />
                                                      ) : field.type === "time_range" ? (
                                                        <Input
                                                          name={field.name}
                                                          value={field.value}
                                                          readOnly={ field.isBinding}
                                                          // onChange={(e) => handChangeValueItem(rowIndex, fieldIndex, e, "input")}
                                                          disabled={true}
                                                          placeholder={field?.placeholder}
                                                          error={field?.isRegexFalse}
                                                          message={field.name + " không hợp lệ"}
                                                        />
                                                      ) : field.type === "lookup" || field.type === "binding" ? (
                                                        <div
                                                          onDoubleClick={() => {
                                                            handleShowDetail(rowIndex, fieldIndex);
                                                          }}
                                                          style={{ cursor: "pointer" }}
                                                        >
                                                          <SelectLookup
                                                            name={field.name}
                                                            lookup={field.lookup}
                                                            bindingField={field.listBindingField}
                                                            bindingKey={field.key}
                                                            dataRow={dataRow}
                                                            listColumn={listColumn}
                                                            setListColumn={setListColumn}
                                                            setListLoadBindingField={setListLoadBindingField}
                                                            listLoadBindingField={listLoadBindingField}
                                                            columnIndex={fieldIndex}
                                                            rowIndex={rowIndex}
                                                            value={field.value}
                                                            onChange={(e) => {
                                                              handChangeValueItem(rowIndex, fieldIndex, e, field.type);
                                                            }}
                                                            disabled={field.readOnly}
                                                            placeholder={"Nhập " + field?.placeholder}
                                                          />
                                                        </div>
                                                      ) : (
                                                        <SelectCustom
                                                          name={field.name}
                                                          options={field.options || []}
                                                          value={field.value}
                                                          onChange={(e) => handChangeValueItem(rowIndex, fieldIndex, e, "select")}
                                                          disabled={field.readOnly}
                                                          placeholder={"Chọn " + field?.placeholder}
                                                        />
                                                      )}
                                                    </div>
                                                  ) : null}
                                                </>
                                              )}
                                            </>
                                          );
                                        })}
                                      </>
                                    )}
                                  </>

                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>
                    ) : null}
                    <div className="action-field-add">
                      <Button
                        color="secondary"
                        type="button"
                        onClick={() => {
                          let uuid = uuidv4();
                          let _baseRow = baseRow.map((field) => {
                            return {
                              ...field,
                              rowKey: uuid,
                            };
                          });
                          setDataRow([...dataRow, _baseRow]);
                        }}
                      >
                        <Icon name="PlusCircle" /> Thêm dòng
                      </Button>
                      <Button
                        color="secondary"
                        type="button"
                        onClick={() => {
                          setShowModalAddColumn(true);
                        }}
                      >
                        <Icon name="PlusCircle" /> Thêm cột
                      </Button>

                      {/* <Button
                        color="secondary"
                        onClick={() => {
                          // setShowModalAddColumn(true);
                          setLoading(true);
                          saveDataRow(dataRow);
                        }}
                      >
                        <Icon name="CheckedCircle" /> Lưu
                      </Button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter actions={actions} />
        </form>
      </Modal>
      <Dialog content={contentDialog} isOpen={showDialog} />

      <ModalExport
        name={title}
        listColumn={listColumn}
        listData={listDataExport}
        onShow={onShowModalExport}
        typeNo={typeNo}
        onHide={() => setOnShowModalExport(false)}
        options={optionsExport}
        callback={(type, extension) => {
          // exportCallback(type, extension)
        }}
      />
      <ModalImport
        name={"Dữ liệu mẫu"}
        listColumn={listColumn}
        onShow={showModalImport}
        caclData={caclData}
        dataRow={dataRow}
        lineSuccess={lineSuccess}
        setDataImport={setDataImport}
        setDataImportHeader={setDataImportHeader}
        setDataExcel={setDataExcel}
        onHide={(reload) => {
          if (reload) {
            // getListCustomer(params, activeTitleHeader);
          }
          setShowModalImport(false);
        }}
        type="grid"
      />

      <ModalAddColumn
        onShow={showModalAddColumn}
        data={dataColumnEdit}
        listColumn={listColumn}
        setListColumn={setListColumn}
        setIsChangeColumns={setIsChangeColumns}
        onHide={(reload) => {
          if (reload) {
          }
          setShowModalAddColumn(false);
          // setDataCustomerAttribute(null);
        }}
      />
      <ModalConfirm
        onShow={isModalConfirm}
        title={"huỷ gói thầu"}
        content="huỷ gói thầu này"
        isSubmit={isSubmit}
        onSubmit={onSubmit}
        onHide={(reload) => {
          if (reload) {
            // handGetDetailWork(dataAsked?.id);
          }
          setIsModalConfirm(false);
        }}
      />

      <ModalSetingNo
        onShow={showConfigNo}
        onHide={(reload) => {
          setShowConfigNo(false);
        }}
        typeNo={typeNo}
        confirmAction={(newTypeNo) => {
          setTypeNo(newTypeNo);
          handleUpdateTypeNo(newTypeNo);
        }}
      />
    </Fragment>
  );
}

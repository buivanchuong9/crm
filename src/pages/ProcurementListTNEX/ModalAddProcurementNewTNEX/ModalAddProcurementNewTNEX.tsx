import React, { Fragment, useState, useEffect, useMemo, useRef } from "react";
import { IActionModal } from "model/OtherModel";
import Icon from "components/icon";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import { isDifferenceObj, convertToId, convertToFileName, getSearchParameters } from "reborn-util";
import "./ModalAddProcurementNewTNEX.scss";
import BusinessProcessService from "services/BusinessProcessService";
import { handDownloadFileOrigin, showToast } from "utils/common";
import Button from "components/button/button";
import { useNavigate } from "react-router-dom";
import FormViewerComponent from "pages/BPM/BpmForm/FormViewer";
// import OnHoldModal from "../HandleTask/OnHoldModal/OnHoldModal";
// import OnRejectModal from "../HandleTask/OnRejectModal/OnRejectModal";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import JSZip from "jszip";
import GridService from "services/GridService";
import Loading from "components/loading";
import WorkOrderService from "services/WorkOrderService";
import { EMAIL_REGEX, PHONE_REGEX_NEW } from "utils/constant";
import Tippy from "@tippyjs/react";
import moment from "moment";
import PurchaseRequestService from "services/PurchaseRequestService";
// import ModalConfirmRelease from "./partials/ModalConfirmRelease/ModalConfirmRelease";

const defaultSchema = {
  type: "default",
  components: [],
};

export default function ModalAddProcurementNewTNEX({ onShow, onHide, dataProcurement }) {
  const params: any = getSearchParameters();
  const formViewerRef = useRef(null);
  const checkShowFullScreen = localStorage.getItem("showFullScreenEform");

  const [dataWork, setDataWork] = useState(null);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
  const [dataInit, setDataInit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingEngine, setIsLoadingEngine] = useState(true);
  const [showFullScreen, setShowFullScreen] = useState<boolean>(checkShowFullScreen ? JSON.parse(checkShowFullScreen) : false);
  const [requestId, setRequestId] = useState(null);
  const [workId, setWorkId] = useState(null);

  const getPurchaseRequestInit = async () => {
    const params = {
      processCode: "MSDT",
      //   onSchedule: onSchedule
    };
    const response = await PurchaseRequestService.getPurchaseRequestInit(params);

    if (response.code == 0) {
      const result = response.result;
      if (result) {
        setRequestId(result.requestId);

        // setContextData(result);
        // getDetailTask(result?.nodeId);

        // const attributeValue = result?.bpmFormData?.attributeValue && JSON.parse(result?.bpmFormData?.attributeValue) || null;
        // setDataInit(attributeValue);
        // getDataForm(result?.potId, result?.nodeId);
      }
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    // setIsLoading(false);
  };

  useEffect(() => {
    if (requestId) {
      const timer = setInterval(
        async () => {
          const response = await PurchaseRequestService.getRequestSubmitter({ requestId: requestId });
          if (response.code == 0) {
            const result = response.result;

            if (result.workId) {
              clearInterval(timer);
              setRequestId(null);
              setIsSubmit(false);
              handGetDetailWork(result.workId);
            }
          }
        },
        2000,
        requestId
      );

      return () => clearInterval(timer);
    }
  }, [requestId]);

  const handGetDetailWork = async (id: number) => {
    if (!id) return;
    const response = await WorkOrderService.detail(id);

    if (response.code === 0) {
      const result = response.result;

      if (result.scope !== "external") {
        setDataWork(result);
      }
    } else {
      showToast("Có lỗi xảy ra. Vui lòng thử lại sau!", "error");
    }
  };

  useEffect(() => {
    if (onShow) {
      if (dataProcurement) {
        handGetDetailWork(dataProcurement?.workId);
      } else {
        getPurchaseRequestInit();
      }
    }
  }, [onShow]);

  useEffect(() => {
    localStorage.setItem("showFullScreenEform", JSON.stringify(showFullScreen));
  }, [showFullScreen]);

  const [dataEngine, setDataEngine] = useState(null);
  const [contextData, setContextData] = useState({ nodeId: "", processId: 0, potId: 0 });
  const [dataSchema, setDataSchema] = useState(null);
  const [dataSchemaDraft, setDataSchemaDraft] = useState(null);

  const [listDataRow, setListDataRow] = useState([]);

  const [dataRow, setDataRow] = useState(null);
  const [paramsGrid, setParamsGrid] = useState(null);
  const [listColumn, setListColumn] = useState(null);

  const [dataRowPvcv, setDataRowPvcv] = useState(null);
  const [paramsGridPvcv, setParamsGridPvcv] = useState(null);
  const [listColumnPvcv, setListColumnPvcv] = useState(null);

  const [dataRowTctn, setDataRowTctn] = useState(null);
  const [paramsGridTctn, setParamsGridTctn] = useState(null);
  const [listColumnTctn, setListColumnTctn] = useState(null);

  const [dataRowCtgt, setDataRowCtgt] = useState(null);
  const [paramsGridCtgt, setParamsGridCtgt] = useState(null);
  const [listColumnCtgt, setListColumnCtgt] = useState(null);

  const [dataRowHsmt, setDataRowHsmt] = useState(null);
  const [paramsGridHsmt, setParamsGridHsmt] = useState(null);
  const [listColumnHsmt, setListColumnHsmt] = useState(null);

  const [dataRowHsdk, setDataRowHsdk] = useState(null);
  const [paramsGridHsdk, setParamsGridHsdk] = useState(null);
  const [listColumnHsdk, setListColumnHsdk] = useState(null);

  const [dataRowDsnt, setDataRowDsnt] = useState(null);
  const [paramsGridDsnt, setParamsGridDsnt] = useState(null);
  const [listColumnDsnt, setListColumnDsnt] = useState(null);

  const [dataRowKhlcnt, setDataRowKhlcnt] = useState(null);
  const [paramsGridKhlcnt, setParamsGridKhlcnt] = useState(null);
  const [listColumnKhlcnt, setListColumnKhlcnt] = useState(null);

  const [dataRowBoq, setDataRowBoq] = useState(null);
  const [paramsGridBoq, setParamsGridBoq] = useState(null);
  const [listColumnBoq, setListColumnBoq] = useState(null);

  const [dataRowDmvt, setDataRowDmvt] = useState(null);
  const [paramsGridDmvt, setParamsGridDmvt] = useState(null);
  const [listColumnDmvt, setListColumnDmvt] = useState(null);

  const getDetailTask = async (id) => {
    const response = await BusinessProcessService.detailUserTask(id);

    if (response.code == 0) {
      const result = response.result;
      const config = (result.config && JSON.parse(result.config)) || null;
      if (config) {
        setInitFormSchema(config);
        setFormSchema(config);
      }
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  const getDataForm = async (potId, nodeId, workId, contextData) => {
    setIsLoadingEngine(true);
    const params = {
      potId: potId,
      nodeId: nodeId,
      workId: workId,
    };
    const response = await BusinessProcessService.getDataForm(params);

    if (response.code == 0) {
      const result = response.result;
      const attributeValue = (result?.attributeValue && JSON.parse(result?.attributeValue)) || null;
      console.log("attributeValue", attributeValue);
      setDataInit(attributeValue);
      setDataEngine(result);

      if (result?.isProcessed !== 1 && result?.isReceived === 0) {
        ReceiveProcessedObjectLog(contextData, dataWork);
      }
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setIsLoadingEngine(false);
  };

  useEffect(() => {
    if (dataWork && onShow) {
      const contextData = dataWork?.contextData && JSON.parse(dataWork?.contextData);
      setContextData(contextData);
      getDetailTask(contextData.nodeId);
      getDataForm(contextData?.potId, contextData?.nodeId, dataWork?.id, contextData);
    }
  }, [dataWork, onShow]);

  const [formSchema, setFormSchema] = useState(defaultSchema); // Lưu trữ schema
  const [initFormSchema, setInitFormSchema] = useState(defaultSchema); // Lưu trữ schema
  console.log("initFormSchema", initFormSchema);

  // Callback để nhận schema khi người dùng thay đổi trong FormEditor
  const handleSchemaSubmit = (newSchema, reject, contextData) => {
    // setFormSchema(newSchema); // Cập nhật schema mới
    console.log("Schema mới:", newSchema);
    // console.log('reject', reject);
    console.log("contextData", contextData);

    setDataSchema(newSchema);
    onSubmit(newSchema);
  };

  const changePriorityLevel = async () => {
    const body = {
      id: dataWork?.id,
      priorityLevel: 2,
    };

    const response = await WorkOrderService.updateLevelStatus(body);

    // if (response.code === 0) {
    //   showToast(`${priorityLevel === 4 ? 'Thêm' : 'Bỏ'} công việc ưu tiên thành công`, "success");
    // } else {
    //   showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    // }
  };

  const onSubmit = async (config) => {
    const contextData = dataWork?.contextData && JSON.parse(dataWork?.contextData);
    // const newConfig = {
    //   ...config,
    //   investor: config.investor.toString()
    // }

    const body = {
      nodeId: contextData?.nodeId,
      processId: contextData?.processId,
      potId: contextData?.potId,
      config: JSON.stringify(config),
      workId: dataWork.id,
    };

    if (config?.invitationDate && config?.closedDate) {
      if (config.invitationDate >= config.closedDate) {
        showToast("Thời gian mời thầu không được lớn hơn thời gian đóng thầu", "error");
        return;
      }
    }

    setIsSubmit(true);

    const response = await BusinessProcessService.updateHandleTask(body);

    if (response.code === 0) {
      showToast(`Tạo yêu cầu thành công`, "success");
      setTimeout(() => {
        handleClear(true);
      }, 1000);

      changePriorityLevel();
      // localStorage.setItem("isKanbanBusinessProcess", JSON.stringify(true));
      // setTimeout(() => {
      //     navigation("/bpm/manage_processes");
      // }, 500)
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setIsSubmit(false);
  };

  const onDraff = async (config, dataRow) => {
    const body = {
      nodeId: contextData?.nodeId,
      processId: contextData?.processId,
      potId: contextData?.potId,
      config: JSON.stringify(config),
      workId: dataWork.id,
    };

    if (config?.invitationDate && config?.closedDate) {
      if (config.invitationDate >= config.closedDate) {
        showToast("Thời gian mời thầu không được lớn hơn thời gian đóng thầu", "error");
        return;
      }
    }
    console.log("body", body);
    setIsSubmit(true);

    const response = await BusinessProcessService.updateHandleTaskDraft(body);

    if (response.code === 0) {
      showToast(`Lưu nháp nhiệm vụ thành công`, "success");
      handleClear(true);

      //Mới
      if (paramsGridPvcv) {
        saveDataRow(dataRowPvcv, paramsGridPvcv, listColumnPvcv);
      }
      if (paramsGridTctn) {
        saveDataRow(dataRowTctn, paramsGridTctn, listColumnTctn);
      }
      if (paramsGridCtgt) {
        saveDataRow(dataRowCtgt, paramsGridCtgt, listColumnCtgt);
      }
      if (paramsGridHsmt) {
        saveDataRow(dataRowHsmt, paramsGridHsmt, listColumnHsmt);
      }
      if (paramsGridHsdk) {
        saveDataRow(dataRowHsdk, paramsGridHsdk, listColumnHsdk);
      }
      if (paramsGridDsnt) {
        saveDataRow(dataRowDsnt, paramsGridDsnt, listColumnDsnt);
      }
      if (paramsGridKhlcnt) {
        saveDataRow(dataRowKhlcnt, paramsGridKhlcnt, listColumnKhlcnt);
      }
      if (paramsGridBoq) {
        saveDataRow(dataRowBoq, paramsGridBoq, listColumnBoq);
      }
      if (paramsGridDmvt) {
        saveDataRow(dataRowDmvt, paramsGridDmvt, listColumnDmvt);
      }
      if (paramsGrid) {
        saveDataRow(dataRow, paramsGrid, listColumn);
      }

      //Cũ
      // if(dataRow && dataRow.length > 0){
      //   saveDataRow(dataRow, paramsGrid);
      // }
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setIsSubmit(false);
  };

  const ReceiveProcessedObjectLog = async (contextData, dataWork) => {
    setIsSubmit(true);
    const body = {
      nodeId: contextData?.nodeId,
      potId: contextData?.potId,
      processId: contextData?.processId,
      workId: dataWork.id,
    };
    const response = await BusinessProcessService.receiveProcessedObjectLog(body);

    if (response.code === 0) {
      // showToast(`Tiếp nhận thành công`, "success");
      getDataForm(contextData?.potId, contextData?.nodeId, dataWork?.id, contextData);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setIsSubmit(false);
  };

  const actions = useMemo<IActionModal>(
    () => ({
      actions_right: {
        buttons: [
          ...(dataEngine?.isProcessed === 1
            ? []
            : [
                ...(dataEngine?.isReceived === 1
                  ? ([
                      {
                        title: "Lưu nháp",
                        color: "primary",
                        variant: "outline",
                        disabled: isSubmit,
                        callback: () => {
                          // handleClear(false);
                          // setShowOnDraft(true);
                          onDraff(dataSchemaDraft, dataRow);
                          // setTimeout(() => {
                          //   handleSubmit();
                          // }, 500)
                        },
                      },

                      {
                        title: "Hoàn thành",
                        // type: "submit",
                        color: "primary",
                        disabled: isSubmit,
                        // || !isDifferenceObj(formData, values),
                        is_loading: isSubmit,
                        callback: () => {
                          handleSubmit(true);
                        },
                      },
                    ] as any)
                  : []),

                // ...(dataEngine?.isReceived === 0 ? ([
                //     {
                //         title: "Tiếp nhận",
                //         // type: "submit",
                //         color: "primary",
                //         disabled: isSubmit,
                //         // || !isDifferenceObj(formData, values),
                //         is_loading: isSubmit,
                //         callback: () => {
                //             ReceiveProcessedObjectLog();
                //         }
                //     }
                // ] as any) : []),
              ]),
        ],
      },
    }),
    [
      isSubmit,
      dataEngine,
      dataSchemaDraft,
      dataRow,
      contextData,
      params,
      paramsGrid,
      listDataRow,
      formViewerRef,
      paramsGridTctn,
      paramsGridPvcv,
      dataWork,
      dataSchema,
    ]
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
    setContextData({ nodeId: "", processId: 0, potId: 0 });
    setDataInit(null);
    setDataEngine(null);
    setDataSchema(null);
    setDataSchemaDraft(null);

    setDataRowPvcv(null);
    setParamsGridPvcv(null);

    setDataRowTctn(null);
    setParamsGridTctn(null);

    setDataRowCtgt(null);
    setParamsGridCtgt(null);

    setDataRowHsmt(null);
    setParamsGridHsmt(null);

    setDataRowHsdk(null);
    setParamsGridHsdk(null);

    setDataRowDsnt(null);
    setParamsGridDsnt(null);

    setDataRowKhlcnt(null);
    setParamsGridKhlcnt(null);

    setDataRowBoq(null);
    setParamsGridBoq(null);

    setDataRowDmvt(null);
    setParamsGridDmvt(null);

    setTimeout(() => {
      setIsLoading(true);
    }, 500);
    setIsLoadingEngine(true);
    setDataWork(null);

    setRequestId(null);
  };

  const checkEmpty = (data, listColumn) => {
    let check_required = false;
    data.map((item, index) => {
      if (index != 0 && item.length) {
        listColumn.map((field) => {
          if (field?.required && !item.find((el) => el.key == field.key)?.value) {
            check_required = true;
          }
        });
      }
    });
    return check_required;
  };

  const checkData = (data, listColumn) => {
    const optionRegex = {
      phoneRegex: PHONE_REGEX_NEW,
      emailRegex: EMAIL_REGEX,
    };

    let check_regex = false;
    data.map((item, index) => {
      if (index != 0 && item.length) {
        listColumn.map((field) => {
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
    return check_regex;
  };

  const formContainerRef = useRef(null);

  const handleSubmit = async (saveRow?: boolean) => {
    if (formViewerRef.current) {
      try {
        //Check thông tin trống khi lưu
        if (paramsGridPvcv) {
          if (checkEmpty(dataRowPvcv, listColumnPvcv)) {
            showToast("Các trường bắt buộc không được bỏ trống", "error");
            return;
          }
          if (checkData(dataRowPvcv, listColumnPvcv)) {
            showToast("Dữ liệu không hợp lệ", "error");
            return;
          }
        }
        if (paramsGridTctn) {
          if (checkEmpty(dataRowTctn, listColumnTctn)) {
            showToast("Các trường bắt buộc không được bỏ trống", "error");
            return;
          }
          if (checkData(dataRowTctn, listColumnTctn)) {
            showToast("Dữ liệu không hợp lệ", "error");
            return;
          }
        }
        if (paramsGridCtgt) {
          if (checkEmpty(dataRowCtgt, listColumnCtgt)) {
            showToast("Các trường bắt buộc không được bỏ trống", "error");
            return;
          }
          if (checkData(dataRowCtgt, listColumnCtgt)) {
            showToast("Dữ liệu không hợp lệ", "error");
            return;
          }
        }
        if (paramsGridHsmt) {
          if (checkEmpty(dataRowHsmt, listColumnHsmt)) {
            showToast("Các trường bắt buộc không được bỏ trống", "error");
            return;
          }
          if (checkData(dataRowHsmt, listColumnHsmt)) {
            showToast("Dữ liệu không hợp lệ", "error");
            return;
          }
        }
        if (paramsGridHsdk) {
          if (checkEmpty(dataRowHsdk, listColumnHsdk)) {
            showToast("Các trường bắt buộc không được bỏ trống", "error");
            return;
          }
          if (checkData(dataRowHsdk, listColumnHsdk)) {
            showToast("Dữ liệu không hợp lệ", "error");
            return;
          }
        }
        if (paramsGridDsnt) {
          if (checkEmpty(dataRowDsnt, listColumnDsnt)) {
            showToast("Các trường bắt buộc không được bỏ trống", "error");
            return;
          }
          if (checkData(dataRowDsnt, listColumnDsnt)) {
            showToast("Dữ liệu không hợp lệ", "error");
            return;
          }
        }
        if (paramsGridKhlcnt) {
          if (checkEmpty(dataRowKhlcnt, listColumnKhlcnt)) {
            showToast("Các trường bắt buộc không được bỏ trống", "error");
            return;
          }
          if (checkData(dataRowKhlcnt, listColumnKhlcnt)) {
            showToast("Dữ liệu không hợp lệ", "error");
            return;
          }
        }
        if (paramsGridBoq) {
          if (checkEmpty(dataRowBoq, listColumnBoq)) {
            showToast("Các trường bắt buộc không được bỏ trống", "error");
            return;
          }
          if (checkData(dataRowBoq, listColumnBoq)) {
            showToast("Dữ liệu không hợp lệ", "error");
            return;
          }
        }
        if (paramsGridDmvt) {
          if (checkEmpty(dataRowDmvt, listColumnDmvt)) {
            showToast("Các trường bắt buộc không được bỏ trống", "error");
            return;
          }
          if (checkData(dataRowDmvt, listColumnDmvt)) {
            showToast("Dữ liệu không hợp lệ", "error");
            return;
          }
        }
        if (paramsGrid) {
          if (checkEmpty(dataRow, listColumn)) {
            showToast("Các trường bắt buộc không được bỏ trống", "error");
            return;
          }
          if (checkData(dataRow, listColumn)) {
            showToast("Dữ liệu không hợp lệ", "error");
            return;
          }
        }
        /////

        //Lưu thông tin grid
        if (paramsGridPvcv) {
          saveDataRow(dataRowPvcv, paramsGridPvcv, listColumnPvcv);
        }
        if (paramsGridTctn) {
          saveDataRow(dataRowTctn, paramsGridTctn, listColumnTctn);
        }
        if (paramsGridCtgt) {
          saveDataRow(dataRowCtgt, paramsGridCtgt, listColumnCtgt);
        }
        if (paramsGridHsmt) {
          saveDataRow(dataRowHsmt, paramsGridHsmt, listColumnHsmt);
        }
        if (paramsGridHsdk) {
          saveDataRow(dataRowHsdk, paramsGridHsdk, listColumnHsdk);
        }
        if (paramsGridDsnt) {
          saveDataRow(dataRowDsnt, paramsGridDsnt, listColumnDsnt);
        }
        if (paramsGridKhlcnt) {
          saveDataRow(dataRowKhlcnt, paramsGridKhlcnt, listColumnKhlcnt);
        }
        if (paramsGridBoq) {
          saveDataRow(dataRowBoq, paramsGridBoq, listColumnBoq);
        }
        if (paramsGridDmvt) {
          saveDataRow(dataRowDmvt, paramsGridDmvt, listColumnDmvt);
        }
        if (paramsGrid) {
          saveDataRow(dataRow, paramsGrid, listColumn);
        }

        // if(dataRow && dataRow.length > 0 && saveRow){
        //   console.log('dataRowSubmit', dataRow);

        //   if(paramsGridPvcv){
        //     saveDataRow(dataRowPvcv, paramsGridPvcv);
        //   }
        //   if(paramsGridTctn){
        //     saveDataRow(dataRowTctn, paramsGridTctn);
        //   }
        //   if(paramsGrid){
        //     saveDataRow(dataRow, paramsGrid);
        //   }

        //   // if(listDataRow && listDataRow.length > 0){
        //   //   listDataRow.map(item => {
        //   //     saveDataRow(item);
        //   //   })
        //   // }
        // }

        const result = await formViewerRef.current.submit();
        console.log("Form submitted successfully:", result.data);
        console.log("listDataRow", listDataRow);

        // if(listDataRow && listDataRow.length > 0){
        //   listDataRow.map(item => {
        //     const data = item.dataRow;
        //     const paramsGrid = item.paramsGrid;
        //     const listColumn = item.listColumn;
        //     saveDataRow(data, paramsGrid, listColumn);
        //   })
        // }
      } catch (error) {
        console.error("Form submission failed:", error);
      }
    }
  };

  const saveDataRow = async (data, paramsGrid, listColumn) => {
    const optionRegex = {
      phoneRegex: PHONE_REGEX_NEW,
      emailRegex: EMAIL_REGEX,
    };

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

    const param = {
      nodeId: contextData?.nodeId || "Activity_0n3i8dv",
      processId: contextData?.processId || 380,
      potId: contextData?.potId || 496,
      workId: dataWork?.id || 1813,
      fieldName: paramsGrid?.fieldName || "boq",
      data: JSON.stringify(data),
      documentType: paramsGrid?.documentType || "",
      // fieldName: data.params?.fieldName || "boq",
      // data: JSON.stringify(data.dataRow),
    };
    const response = await GridService.updateRow(param);
    if (response.code === 0) {
      console.log("Lưu data row thành công");

      // showToast("Lưu thành công", "success");
    } else {
      // showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  const onContinue = async (pausedId) => {
    setIsSubmit(true);
    const body = {
      pausedId: pausedId,
    };
    const response = await BusinessProcessService.onContinue(body);
    if (response.code === 0) {
      showToast(`Tiếp tục công việc thành công`, "success");
      getDataForm(contextData?.potId, contextData?.nodeId, dataWork?.id, contextData);
      onHide(true, true);
      // if(status === 1){
      //   // if(!noToast){
      //   //   showToast(`Tiếp nhận công việc thành công`, "success");
      //   // } else {
      //   //   showToast(`Công việc thực hiện lại`, "success");
      //   // }
      //   showToast(`Tiếp tục công việc thành công`, "success");
      // }

      // handGetDetailWork(data?.id);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setIsSubmit(false);
  };

  useEffect(() => {
    window.addEventListener("message", (event) => {
      // Kiểm tra thông điệp từ iframe
      if (event.data?.type === "EXPORT_XLSX") {
        const listColumn = event.data.listColumn;
        const data = event.data.data;
        const name = event.data.name;
        // Tạo một workbook
        const ws = XLSX.utils.aoa_to_sheet([
          listColumn.map((item) => item.name), // Dòng tiêu đề
          listColumn.map((item) => item.key), // Dòng thứ 2 với các key
        ]);

        // Thêm dữ liệu mẫu bắt đầu từ dòng thứ 3
        XLSX.utils.sheet_add_json(ws, data, { origin: "A3", skipHeader: true });

        // Ẩn dòng thứ 2
        ws["!rows"] = [{}, { hidden: true }];
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, name);

        // Tạo blob từ workbook
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([wbout], { type: "application/octet-stream" });
        // Tạo liên kết và tải xuống file
        let code_name = convertToFileName(name);

        download(blob, code_name + ".xlsx");
      }

      if (event.data?.type === "EXPORT_TEMPLATE") {
        const listColumn = event.data.listColumn;
        const data = event.data.data;
        const name = event.data.name;
        // Tạo một workbook
        const ws = XLSX.utils.aoa_to_sheet([
          // ["Tên khách hàng", "Tuổi", "Địa chỉ"], // Dòng tiêu đề
          // ["name", "age", "address"], // Dòng thứ 2 với các key
          listColumn.map((item) => item.name), // Dòng tiêu đề
          listColumn.map((item) => item.key), // Dòng thứ 2 với các key
          listColumn.map((item) => (item.type == "number" ? "Number" : "Nvarchar")), // Dòng thứ 3 với các kiểu dữ liệu
        ]);

        // Thêm dữ liệu mẫu bắt đầu từ dòng thứ 3
        XLSX.utils.sheet_add_json(ws, data, { origin: "A3", skipHeader: true });

        // Ẩn dòng thứ 2
        ws["!rows"] = [{}, { hidden: true }];
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, name);

        // Tạo blob từ workbook
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([wbout], { type: "application/octet-stream" });
        // Tạo liên kết và tải xuống file
        let code_name = convertToFileName(name);
        download(blob, code_name + ".xlsx");
      }

      if (event.data?.type === "EXPORT_DOCUMENT") {
        const fileUrl = event.data.fileUrl;
        const fileName = event.data.fileName;
        handDownloadFileOrigin(fileUrl, fileName);
      }

      if (event.data?.type === "EXPORT_DOCUMENT_ALL") {
        const dataAttachment = event.data.dataAttachment;
        downloadAndZipFiles(dataAttachment);
      }

      if (event.data?.type === "DATA_ROW") {
        const dataRow = event.data.data;
        const params = event.data.params;
        const listColumn = event.data.listColumn;
        console.log("dataRowTest", dataRow);
        console.log("params123", params);
        console.log("listColumn", listColumn);

        // setDataRow(dataRow);
        // setParamsGrid(params);
        // setListColumn(listColumn);

        if (params?.fieldName === "pvcv") {
          setParamsGridPvcv(params);
          setDataRowPvcv(dataRow);
          setListColumnPvcv(listColumn);
        } else if (params?.fieldName === "tctn") {
          setParamsGridTctn(params);
          setDataRowTctn(dataRow);
          setListColumnTctn(listColumn);
        } else if (params?.fieldName === "ctgt") {
          setParamsGridCtgt(params);
          setDataRowCtgt(dataRow);
          setListColumnCtgt(listColumn);
        } else if (params?.fieldName === "hsmt") {
          setParamsGridHsmt(params);
          setDataRowHsmt(dataRow);
          setListColumnHsmt(listColumn);
        } else if (params?.fieldName === "hsdk") {
          setParamsGridHsdk(params);
          setDataRowHsdk(dataRow);
          setListColumnHsdk(listColumn);
        } else if (params?.fieldName === "dsnt") {
          setParamsGridDsnt(params);
          setDataRowDsnt(dataRow);
          setListColumnDsnt(listColumn);
        } else if (params?.fieldName === "khlcnt") {
          setParamsGridKhlcnt(params);
          setDataRowKhlcnt(dataRow);
          setListColumnKhlcnt(listColumn);
        } else if (params?.fieldName === "boq") {
          setParamsGridBoq(params);
          setDataRowBoq(dataRow);
          setListColumnBoq(listColumn);
        } else if (params?.fieldName === "dmvt") {
          setParamsGridDmvt(params);
          setDataRowDmvt(dataRow);
          setListColumnDmvt(listColumn);
        } else {
          setDataRow(dataRow);
          setParamsGrid(params);
          setListColumn(listColumn);
        }

        // setListDataRow([...listDataRow, {dataRow: dataRow, params: params} ])
      }

      if (event.data?.type === "VIEW_DOCUMENT_TAB") {
        const dataLink = event.data.dataLink;
        window.open(dataLink, "_blank", "noopener,noreferrer");
      }
    });
  }, []);

  // useEffect(() => {
  //   if(onShow){
  //     const listData = [...listDataRow];
  //     const newDataRow = dataRow;
  //     const newParamGrid =  paramsGrid;
  //     const newListColumn = listColumn;

  //     console.log('listData123', listData);

  //     // const checkGrid = listData.filter(el => el.params.fieldName === params.fieldName);
  //     const indexGrid = listData.findIndex(el => el.newParamGrid?.fieldName === newParamGrid?.fieldName);
  //     console.log('indexGrid', indexGrid);

  //     if(listData && listData.length > 0){
  //       if(indexGrid !== -1){
  //         listData[indexGrid].dataRow = newDataRow;
  //         listData[indexGrid].params = newParamGrid;
  //         listData[indexGrid].listColumn = newListColumn;
  //         setListDataRow(listData);
  //       } else {
  //         setListDataRow([...listData, {dataRow: newDataRow, params: newParamGrid, listColumn: newListColumn } ])
  //       }
  //     } else {
  //       setListDataRow([...listData, {dataRow: newDataRow, params: newParamGrid, listColumn: newListColumn} ])
  //     }
  //   }
  // }, [dataRow, paramsGrid, listColumn, onShow, listDataRow])

  /* 
    tạo 1 biến grid 
    xong đẩy dữ liệu được lấy ra vào grid đấy
    xong tạo 1 useEffect, mỗi lần biến grid đấy thay đổi thì cập nhật vào 1 list danh sách 
  */

  // useEffect(() => {
  //   window.addEventListener("message", (event) => {
  //     if (event.data?.type === "DATA_ROW") {
  //       const dataRow = event.data.data;
  //       const params = event.data.params;
  //       console.log('dataRowTest', dataRow);
  //       console.log('paramsRow', params);

  //       setDataRow(dataRow);
  //       setParamsGrid(params);
  //       console.log('cos vao nha');

  //       const listData = [...listDataRow];
  //       console.log('listData123', listData);

  //       // const checkGrid = listData.filter(el => el.params.fieldName === params.fieldName);
  //       const indexGrid = listData.findIndex(el => el.params.fieldName === params.fieldName);
  //       console.log('indexGrid', indexGrid);

  //       if(listData && listData.length > 0){
  //         if(indexGrid !== -1){
  //           listData[indexGrid].dataRow = dataRow;
  //           setListDataRow(listData);
  //         } else {
  //           setListDataRow([...listData, {dataRow: dataRow, params: params} ])
  //         }
  //       } else {
  //         setListDataRow([...listData, {dataRow: dataRow, params: params} ])
  //       }

  //     }

  //   });
  // }, []);

  const download = async (blob, name) => {
    await saveAs(blob, name);
  };

  const downloadAndZipFiles = async (listFile) => {
    const zip = new JSZip();
    const folder = zip.folder("files");

    // Tải từng file và thêm vào file nén
    for (const url of listFile) {
      const response = await fetch(url.fileUrl);
      const blob = await response.blob();
      const fileName = url.fileName;
      folder.file(fileName, blob);
    }

    // Tạo file nén và tải xuống
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "files.zip");
    });
  };

  // const titleDoc = dataWork?.nodeName;
  // console.log('check titel', titleDoc?.toLowerCase().includes('phát hành hsmt'));

  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        size={showFullScreen ? "xxl" : "xl"}
        toggle={() => !isSubmit && handleClear(false)}
        className={showFullScreen ? "modal-handle-task-full" : "modal-handle-task"}
      >
        <form className="form-handle-task" onSubmit={(e) => onSubmit(e)}>
          {/* <ModalHeader title={`Cài đặt biểu mẫu`} toggle={() => !isSubmit && handleClear(false)} /> */}
          <div className="container-header">
            <div className="box-title">
              <h4>{dataWork?.nodeName || ""}</h4>
            </div>
            <div className="container-button">
              {!showFullScreen ? (
                <Tippy content="Mở rộng">
                  <div
                    style={{ marginBottom: 4, marginRight: 5, cursor: "pointer" }}
                    onClick={() => {
                      setShowFullScreen(true);
                    }}
                  >
                    <Icon name="ZoomInFullScreen" />
                  </div>
                </Tippy>
              ) : (
                <Tippy content="Thu nhỏ">
                  <div
                    style={{ marginBottom: 4, marginRight: 5, cursor: "pointer" }}
                    onClick={() => {
                      setShowFullScreen(false);
                    }}
                  >
                    <Icon name="ZoomOutScreen" />
                  </div>
                </Tippy>
              )}
              <Button onClick={() => !isSubmit && handleClear(false)} type="button" className="btn-close" color="transparent" onlyIcon={true}>
                <Icon name="Times" />
              </Button>
            </div>
          </div>
          <ModalBody>
            <div className="container_handle_task-modal">
              {/* Form Viewer để hiển thị form => truyền vào nodeId, processId, và potId */}
              {isLoadingEngine || initFormSchema?.components?.length === 0 ? (
                <Loading />
              ) : (
                <div style={{ width: "100%", pointerEvents: dataEngine?.isReceived === 0 ? "none" : "auto" }}>
                  <FormViewerComponent
                    formContainerRef={formContainerRef}
                    formViewerRef={formViewerRef}
                    formSchema={initFormSchema}
                    onSchemaSubmit={handleSchemaSubmit}
                    dataInit={dataInit}
                    contextData={{
                      nodeId: contextData?.nodeId,
                      processId: contextData?.processId,
                      potId: contextData?.potId,
                      workId: dataWork?.id,
                      workName: dataWork?.nodeName,
                      procurementTypeId: dataWork?.procurementTypeId,
                    }}
                    // showOnRejectModal={showOnRejectModal || showOnHoldModal}
                    showOnRejectModal={false}
                    setDataSchemaDraft={setDataSchemaDraft}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                </div>
              )}

              {!dataEngine ||
              dataEngine?.isReceived === 1 ||
              dataEngine?.isProcessed === 1 ||
              isLoadingEngine ||
              isLoading ||
              initFormSchema?.components?.length === 0 ? null : (
                <div className="overlay">
                  <div className="overlay-content">
                    <p>Tiếp nhận để thực hiện công việc</p>
                  </div>
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter actions={actions} />
        </form>
      </Modal>
      <Dialog content={contentDialog} isOpen={showDialog} />
    </Fragment>
  );
}

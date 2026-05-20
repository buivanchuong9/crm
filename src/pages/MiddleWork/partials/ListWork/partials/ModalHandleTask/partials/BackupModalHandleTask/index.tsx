import React, { Fragment, useState, useEffect, useMemo, useRef } from "react";
import { IActionModal } from "model/OtherModel";
import Icon from "components/icon";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import { isDifferenceObj, convertToId, convertToFileName, getSearchParameters } from "reborn-util";
import "./ModalHandleTask.scss";
import BusinessProcessService from "services/BusinessProcessService";
import { handDownloadFileOrigin, showToast } from "utils/common";
import Button from "components/button/button";
import { useNavigate } from "react-router-dom";
import FormViewerComponent from "pages/BPM/BpmForm/FormViewer";
import OnHoldModal from "../HandleTask/OnHoldModal/OnHoldModal";
import OnRejectModal from "../HandleTask/OnRejectModal/OnRejectModal";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import JSZip from "jszip";
import GridService from "services/GridService";
import Loading from "components/loading";
import WorkOrderService from "services/WorkOrderService";
import { EMAIL_REGEX, PHONE_REGEX_NEW } from "utils/constant";
import Tippy from "@tippyjs/react";
import moment from "moment";
import ModalConfirmRelease from "./partials/ModalConfirmRelease/ModalConfirmRelease";
import ModalCustomPopup from "./partials/ModalCustomPopup";
import ModalSelectJump from "./partials/ModalSelectJump/ModalSelectJump";

const defaultSchema = {
  type: "default",
  components: [],
};

export default function ModalHandleTask({ onShow, onHide, dataWork, isHandleTask }) {
  console.log("dataWork", dataWork);

  const params: any = getSearchParameters();
  const formViewerRef = useRef(null);
  const checkShowFullScreen = localStorage.getItem("showFullScreenEform");

  const navigation = useNavigate();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  console.log("isSubmit123", isSubmit);

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
  const [dataInit, setDataInit] = useState(null);
  // console.log('dataInit', dataInit);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingEngine, setIsLoadingEngine] = useState(true);
  // console.log('isLoadingEngine', isLoadingEngine);

  const [showFullScreen, setShowFullScreen] = useState<boolean>(checkShowFullScreen ? JSON.parse(checkShowFullScreen) : false);

  useEffect(() => {
    localStorage.setItem("showFullScreenEform", JSON.stringify(showFullScreen));
  }, [showFullScreen]);

  const [dataForm, setDataForm] = useState(null);
  const [dataEngine, setDataEngine] = useState(null);
  const [contextData, setContextData] = useState({ nodeId: "", processId: 0, potId: 0 });
  const [showOnHoldModal, setShowOnHoldModal] = useState(false);
  const [showOnRejectModal, setShowOnRejectModal] = useState(false);
  const [showConfirmRelease, setShowConfirmRelease] = useState(false);
  const [showSelectJump, setShowSelectJump] = useState(false);
  const [keyForm, setKeyForm] = useState(null);
  console.log("keyForm", keyForm);

  const [dataSchema, setDataSchema] = useState(null);
  const [dataSchemaDraft, setDataSchemaDraft] = useState(null);
  console.log("dataSchemaDraft12", dataSchemaDraft);
  console.log("data ENGINEEE", dataEngine);

  //Lấy danh sách các ghi chú để gửi sang portal
  const [listNodeDocument, setListNodeDocument] = useState([]);

  const [checkIsApproval, setCheckIsApproval] = useState(false);

  const [listDataRow, setListDataRow] = useState([]);
  console.log('listDataRow', listDataRow);

  const [dataRow, setDataRow] = useState(null);
  const [paramsGrid, setParamsGrid] = useState(null);
  const [listColumn, setListColumn] = useState(null);
  // console.log('paramsGrid', paramsGrid);
  // console.log('dataRowHandleTask', dataRow);
  // console.log('listColumn', listColumn);

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
  // Hủy poll nếu component bị unmount
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const [showPopupCustom, setShowPopupCustom] = useState(false);
  const [codePopupCustom, setCodePopupCustom] = useState("");

  const cutString = (str, char) => {
    const index = str.indexOf(char);
    if (index === -1) return str; // không tìm thấy thì trả về nguyên chuỗi
    return str.substring(0, index);
  };

  const getDetailTask = async (id, dataEngine?) => {
    const response = await BusinessProcessService.detailUserTask(id);

    if (response.code == 0) {
      const result = response.result;
      setDataForm(result);
      setKeyForm(result.code);
      let config = (result.config && JSON.parse(result.config)) || null;
      if (config) {
        //Nếu không phải là trường hợp từ chối quay về thì ẩn trường select Jump đi
        if (!dataEngine?.hasJumpOptions) {
          let components = config.components;
          if (components && components.length > 0 && components.find((el) => el.type === "select" && el.key === "option_jump")) {
            components = components.filter((el) => el.key !== "option_jump");
            config = { ...config, components };
          }
        }

        setInitFormSchema(config);
        setFormSchema(config);
        if (config?.components && config?.components.length > 0) {
          // const findApproval = config.components.filter(el => el.label === 'Ghi chú phê duyệt' && el.key === "approvalNote");
          const findApproval = config.components.filter((el) => el.key === "approvalNote");
          if (findApproval.length > 0) {
            setCheckIsApproval(true);
          }

          const listNote = config.components.filter(
            (el) => el.type === "textarea" && el.properties.documentType && cutString(el.key, "_") === "Note"
          );
          if (listNote && listNote.length > 0) {
            const listNodeDate = [];
            listNote.map((item) => {
              listNodeDate.push({
                ...item,
                content: "",
              });
            });
            setListNodeDocument(listNodeDate);
          }
        }
      }
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  const getDataForm = async (potId, nodeId, workId) => {
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
      getDetailTask(nodeId, result);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setIsLoadingEngine(false);
  };

  useEffect(() => {
    if (dataWork && onShow) {
      const contextData = dataWork?.contextData && JSON.parse(dataWork?.contextData);
      setContextData(contextData);
      // getDetailTask(contextData.nodeId);
      getDataForm(contextData?.potId, contextData?.nodeId, dataWork?.id);
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
    // if (reject) {
    //   // setDataSchema(newSchema);
    // }
    // // else if(draff){
    // //   onDraff(newSchema);
    // // }
    // else {
    //   onSubmit(newSchema);
    // }
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
    const isJump = (config?.option_jump && +config?.option_jump) || null;
    const contextData = dataWork?.contextData && JSON.parse(dataWork?.contextData);

    const body = {
      nodeId: contextData?.nodeId,
      processId: contextData?.processId,
      potId: contextData?.potId,
      config: JSON.stringify(config),
      workId: dataWork.id,
      // ...(isJump ? {isJump: isJump === 'jump' ? 1 : isJump === 'jump_to_first' ? 2  : 0} : {})
      ...(isJump ? { isJump: isJump } : {}),
    };
    console.log("body", body);
    if (config?.invitationDate && config?.closedDate) {
      if (config.invitationDate >= config.closedDate) {
        showToast("Thời gian mời thầu không được lớn hơn thời gian đóng thầu", "error");
        return;
      }
    }

    setIsSubmit(true);

    const response = await BusinessProcessService.updateHandleTask(body);
    if (response.code === 0) {
      showToast(`${dataForm?.type === 2 || dataForm?.type === 4 ? "Phê duyệt" : "Xử lý"}  nhiệm vụ thành công`, "success");
      handleClear(true);
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

  const ReceiveProcessedObjectLog = async () => {
    setIsSubmit(true);
    const body = {
      nodeId: contextData?.nodeId,
      potId: contextData?.potId,
      processId: contextData?.processId,
      workId: dataWork.id,
    };
    const response = await BusinessProcessService.receiveProcessedObjectLog(body);

    if (response.code === 0) {
      showToast(`Tiếp nhận thành công`, "success");
      getDataForm(contextData?.potId, contextData?.nodeId, dataWork?.id);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setIsSubmit(false);
  };

  const handleWorkRecall = async () => {
    setIsLoadingEngine(true);
    const workId = dataWork.id;
    const params = {
      workId,
    };
    const response = await BusinessProcessService.onWorkRecall(params);
    if (response.code === 0) {
      const result = response?.result;
      if (result.result === 0 && result.status === 1) {
        showToast("Không thể thu hồi do chưa hoàn thành công việc!", "error");
      }
      if (result.result === 0 && result.status === 0) {
        const abortController = new AbortController();
        abortRef.current = abortController;
        await handlePollCheckResult(result?.requestId, abortController.signal);
      }
    } else {
      showToast("Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }

    setIsLoadingEngine(false);
  };

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const handlePollCheckResult = async (requestId: string, abortSignal: AbortSignal) => {
    setIsLoadingEngine(true);

    try {
      const poll = async (): Promise<void> => {
        if (abortSignal.aborted) {
          return;
        }
        const params = {
          requestId,
        };
        const response = await BusinessProcessService.onPollCheckResult(params, abortSignal);

        if (response.code !== 0) {
          showToast("Có lỗi xảy ra. Vui lòng thử lại sau", "error");
          return;
        }
        const result = response?.result;
        if (result.status === 1) {
          if (result.result === 0) {
            showToast("Không thể thu hồi do công việc sau đã tiếp nhận!", "error");
          } else if (result.result === 1) {
            showDialogConfirmWorkRecall(result?.requestId);
          }
          return;
        }

        await delay(1000);
        return poll();
      };

      await poll();
    } catch (error) {
      if (abortSignal.aborted) {
        console.log("Polling bị hủy do người dùng.");
      } else {
        showToast("Đã có lỗi hệ thống!", "error");
      }
    } finally {
      setIsLoadingEngine(false);
    }
  };

  const handleRecallConfirm = async (requestId: any) => {
    if (!requestId) return;
    setIsLoading(true);
    const params = {
      requestId,
    };
    const response = await BusinessProcessService.onConfirmRecall(params);
    if (response.code === 0) {
      if (response.result === 1) {
        showToast("Thu hồi công việc thành công!", "success");
      } else {
        showToast("Không thể thu hồi công việc!", "error");
      }
    } else {
      showToast("Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setIsLoading(false);
  };

  const actions = useMemo<IActionModal>(
    () => ({
      actions_right: {
        buttons: [
          ...(dataEngine?.isReceived === 1
            ? ([
                {
                  title: "Thu hồi",
                  color: "primary",
                  disabled: isSubmit,
                  callback: handleWorkRecall,
                },
              ] as any)
            : []),
          ...(dataEngine?.isProcessed === 1
            ? []
            : [
                // ...(dataEngine?.isReceived === 1 ? ([
                //   {
                //       title:"Lưu nháp",
                //       color: "primary",
                //       variant: "outline",
                //       disabled: isSubmit,
                //       callback: () => {
                //           // handleClear(false);
                //           // setShowOnDraft(true);
                //           onDraff(dataSchemaDraft, dataRow)
                //           // setTimeout(() => {
                //           //   handleSubmit();
                //           // }, 500)
                //       },
                //     },
                // ] as any) : []),

                ...(dataEngine?.isReceived === 1
                  ? [
                      ...(dataForm?.type === 2 || dataForm?.type === 4
                        ? [
                            {
                              title: "YCĐC",
                              color: "primary",
                              variant: "outline",
                              disabled: isSubmit,
                              callback: () => {
                                setShowOnRejectModal(true);
                                // setTimeout(() => {
                                //     handleSubmit();
                                // }, 500)
                              },
                            },
                          ]
                        : []),
                    ]
                  : ([
                      ...(!isHandleTask
                        ? [
                            {
                              title: "Từ chối",
                              color: "primary",
                              variant: "outline",
                              disabled: isSubmit,
                              callback: () => {
                                setShowOnRejectModal(true);
                                // setTimeout(() => {
                                //     handleSubmit();
                                // }, 500)
                              },
                            },
                          ]
                        : []),
                    ] as any)),

                ...(dataEngine?.isReceived === 1
                  ? ([
                      ...(dataEngine?.isPaused === 1
                        ? [
                            {
                              title: "Tiếp tục",
                              color: "primary",
                              variant: "outline",
                              disabled: isSubmit,
                              callback: () => {
                                // setShowOnHoldModal(true);
                                // setTimeout(() => {
                                //     handleSubmit();
                                // }, 500)
                                onContinue(dataEngine?.pausedId);
                              },
                            },
                          ]
                        : [
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
                            ...(!isHandleTask
                              ? [
                                  {
                                    title: "Tạm dừng",
                                    color: "primary",
                                    variant: "outline",
                                    disabled: isSubmit,
                                    callback: () => {
                                      setShowOnHoldModal(true);
                                      // setTimeout(() => {
                                      //     handleSubmit();
                                      // }, 500)
                                    },
                                  },
                                ]
                              : []),

                            {
                              title: dataForm?.type === 2 || dataForm?.type === 4 ? "Phê duyệt" : "Hoàn thành",
                              // type: "submit",
                              color: "primary",
                              disabled: isSubmit,
                              // || !isDifferenceObj(formData, values),
                              is_loading: isSubmit,
                              callback: () => {
                                // handleSubmit(true);
                                // if(dataWork?.nodeName?.toLowerCase().includes('phát hành hsmt')){

                                if (keyForm === "bidOpening") {
                                  setShowConfirmRelease(true);
                                } else {
                                  handleSubmit();
                                  setIsSubmit(true);
                                }

                                // if(dataEngine?.hasJumpOptions){
                                //   setShowSelectJump(true);
                                // } else {
                                //   if (keyForm === "bidOpening") {
                                //     setShowConfirmRelease(true);
                                //   } else {
                                //     handleSubmit();
                                //     setIsSubmit(true);
                                //   }
                                // }
                              },
                            },
                          ]),
                    ] as any)
                  : []),

                ...(dataEngine?.isReceived === 0
                  ? ([
                      {
                        title: "Tiếp nhận",
                        // type: "submit",
                        color: "primary",
                        disabled: isSubmit,
                        // || !isDifferenceObj(formData, values),
                        is_loading: isSubmit,
                        callback: () => {
                          ReceiveProcessedObjectLog();
                        },
                      },
                    ] as any)
                  : []),

                // ...(dataEngine?.isReceived === 1 ? ([
                //   {
                //       title: checkIsApproval ? "Phê duyệt" : 'Hoàn thành',
                //       // type: "submit",
                //       color: "primary",
                //       disabled: isSubmit,
                //       // || !isDifferenceObj(formData, values),
                //       is_loading: isSubmit,
                //       callback: () => {
                //         // handleSubmit(true);
                //         if(dataWork?.nodeName?.toLowerCase().includes('phát hành hsmt')){
                //           setShowConfirmRelease(true);
                //         } else {
                //           handleSubmit(true);
                //         }
                //       }
                //   },
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
      formViewerRef,
      paramsGridTctn,
      paramsGridPvcv,
      dataWork,
      dataSchema,
      isHandleTask,
      keyForm,
      dataForm,
      listDataRow
    ]
  );

  const showDialogConfirmWorkRecall = (requestId: any) => {
    const contentDialog: IContentDialog = {
      color: "warning",
      className: "dialog-cancel",
      isCentered: true,
      isLoading: isLoading,
      title: <Fragment>{`Thu hồi công việc`}</Fragment>,
      message: <Fragment>Bạn có chắc chắn muốn thu hồi công việc?</Fragment>,
      cancelText: "Quay lại",
      cancelAction: () => {
        setShowDialog(false);
        setContentDialog(null);
      },
      defaultText: "Xác nhận",
      defaultAction: async () => {
        await handleRecallConfirm(requestId);
        handleClear(false);
        setShowDialog(false);
        setContentDialog(null);
      },
    };
    setContentDialog(contentDialog);
    setShowDialog(true);
  };

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
    if (isHandleTask) {
      onHide(acc, false, true);
    } else {
      onHide(acc);
    }
    setIsSubmit(false);

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
    setKeyForm(null);
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

  const handleSubmit = async (isJump?: boolean) => {
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

        let listGridData = [];
        //Lưu thông tin grid
        // if (paramsGridPvcv) {
        //   // saveDataRow(dataRowPvcv, paramsGridPvcv, listColumnPvcv);
        //   listGridData.push({
        //     dataRow: dataRowPvcv,
        //     paramsGrid: paramsGridPvcv,
        //   });
        // }
        // if (paramsGridTctn) {
        //   // saveDataRow(dataRowTctn, paramsGridTctn, listColumnTctn);
        //   listGridData.push({
        //     dataRow: dataRowTctn,
        //     paramsGrid: paramsGridTctn,
        //   });
        // }
        // if (paramsGridCtgt) {
        //   // saveDataRow(dataRowCtgt, paramsGridCtgt, listColumnCtgt);
        //   listGridData.push({
        //     dataRow: dataRowCtgt,
        //     paramsGrid: paramsGridCtgt,
        //   });
        // }
        // if (paramsGridHsmt) {
        //   // saveDataRow(dataRowHsmt, paramsGridHsmt, listColumnHsmt);
        //   listGridData.push({
        //     dataRow: dataRowHsmt,
        //     paramsGrid: paramsGridHsmt,
        //   });
        // }
        // if (paramsGridHsdk) {
        //   // saveDataRow(dataRowHsdk, paramsGridHsdk, listColumnHsdk);
        //   listGridData.push({
        //     dataRow: dataRowHsdk,
        //     paramsGrid: paramsGridHsdk,
        //   });
        // }
        // if (paramsGridDsnt) {
        //   // saveDataRow(dataRowDsnt, paramsGridDsnt, listColumnDsnt);
        //   listGridData.push({
        //     dataRow: dataRowDsnt,
        //     paramsGrid: paramsGridDsnt,
        //   });
        // }
        // if (paramsGridKhlcnt) {
        //   // saveDataRow(dataRowKhlcnt, paramsGridKhlcnt, listColumnKhlcnt);
        //   listGridData.push({
        //     dataRow: dataRowKhlcnt,
        //     paramsGrid: paramsGridKhlcnt,
        //   });
        // }
        // if (paramsGridBoq) {
        //   // saveDataRow(dataRowBoq, paramsGridBoq, listColumnBoq);
        //   listGridData.push({
        //     dataRow: dataRowBoq,
        //     paramsGrid: paramsGridBoq,
        //   });
        // }
        // if (paramsGridDmvt) {
        //   // saveDataRow(dataRowDmvt, paramsGridDmvt, listColumnDmvt);
        //   listGridData.push({
        //     dataRow: dataRowDmvt,
        //     paramsGrid: paramsGridDmvt,
        //   });
        // }
        // if (paramsGrid) {
        //   // saveDataRow(dataRow, paramsGrid, listColumn);
        //   listGridData.push({
        //     dataRow: dataRow,
        //     paramsGrid: paramsGrid,
        //   });
        // }


        if (listDataRow && listDataRow.length > 0) {
          const arrayPromise = [];
          listDataRow.map((item) => {
            const promise = new Promise((resolve, reject) => {
              const param = {
                nodeId: contextData?.nodeId || "Activity_0n3i8dv",
                processId: contextData?.processId || 380,
                potId: contextData?.potId || 496,
                workId: dataWork?.id || 1813,
                fieldName: item.params?.fieldName || "boq",
                data: JSON.stringify(item.dataRow),
                documentType: item.params?.documentType || "",
              };
              GridService.updateRow(param).then((res) => resolve(res));
            });

            arrayPromise.push(promise);
          });

          Promise.all(arrayPromise).then(async (result) => {
            if (result.length > 0) {
              const result = await formViewerRef.current.submit();
              console.log("Form submitted successfully:", result.data);
            } else {
              showToast("Có lỗi xảy ra. Vui lòng thử lại sau", "error");
              setIsSubmit(false);
            }
          });
        } else {
          const result = await formViewerRef.current.submit();
          console.log("Form submitted successfully:", result.data);

          // if(isJump){
          //   onSubmit(dataSchemaDraft, isJump);
          // } else {
          //   const result = await formViewerRef.current.submit();
          //   console.log("Form submitted successfully:", result.data);
          // }
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

        // if(listDataRow && listDataRow.length > 0){
        //   listDataRow.map(item => {
        //     const data = item.dataRow;
        //     const paramsGrid = item.paramsGrid;
        //     const listColumn = item.listColumn;
        //     saveDataRow(data, paramsGrid, listColumn);
        //   })
        // }

        /// lưu kiểu cũ
        // const result = await formViewerRef.current.submit();
        // console.log("Form submitted successfully:", result.data);
        // console.log('listDataRow', listDataRow);
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
      getDataForm(contextData?.potId, contextData?.nodeId, dataWork?.id);
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
          listColumn.map((item) => (item.type == "number" ? "Number" : "Nvarchar")), // Dòng thứ 3 với các kiểu dữ liệu
        ]);

        // // Thêm dữ liệu mẫu bắt đầu từ dòng thứ 3
        // XLSX.utils.sheet_add_json(ws, data, { origin: "A3", skipHeader: true });

        // // Ẩn dòng thứ 2
        // ws["!rows"] = [{}, { hidden: true }];

        // Thêm dữ liệu mẫu bắt đầu từ dòng thứ 3
        XLSX.utils.sheet_add_json(ws, data, { origin: "A4", skipHeader: true });

        // Ẩn dòng thứ 2
        ws["!rows"] = [{}, { hidden: true }, { hidden: true }];

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

        // if (params?.fieldName === "pvcv") {
        //   setParamsGridPvcv(params);
        //   setDataRowPvcv(dataRow);
        //   setListColumnPvcv(listColumn);
        // } else if (params?.fieldName === "tctn") {
        //   setParamsGridTctn(params);
        //   setDataRowTctn(dataRow);
        //   setListColumnTctn(listColumn);
        // } else if (params?.fieldName === "ctgt") {
        //   setParamsGridCtgt(params);
        //   setDataRowCtgt(dataRow);
        //   setListColumnCtgt(listColumn);
        // } else if (params?.fieldName === "hsmt") {
        //   setParamsGridHsmt(params);
        //   setDataRowHsmt(dataRow);
        //   setListColumnHsmt(listColumn);
        // } else if (params?.fieldName === "hsdk") {
        //   setParamsGridHsdk(params);
        //   setDataRowHsdk(dataRow);
        //   setListColumnHsdk(listColumn);
        // } else if (params?.fieldName === "dsnt") {
        //   setParamsGridDsnt(params);
        //   setDataRowDsnt(dataRow);
        //   setListColumnDsnt(listColumn);
        // } else if (params?.fieldName === "khlcnt") {
        //   setParamsGridKhlcnt(params);
        //   setDataRowKhlcnt(dataRow);
        //   setListColumnKhlcnt(listColumn);
        // } else if (params?.fieldName === "boq") {
        //   setParamsGridBoq(params);
        //   setDataRowBoq(dataRow);
        //   setListColumnBoq(listColumn);
        // } else if (params?.fieldName === "dmvt") {
        //   setParamsGridDmvt(params);
        //   setDataRowDmvt(dataRow);
        //   setListColumnDmvt(listColumn);
        // } else {
        //   setDataRow(dataRow);
        //   setParamsGrid(params);
        //   setListColumn(listColumn);
        // }

        // setListDataRow([...listDataRow, {dataRow: dataRow, params: params} ])

        const fieldName = params?.fieldName;
        if (fieldName) {
          setListDataRow((prev) => {
            // tìm xem fieldName đã tồn tại trong mảng chưa
            const idx = prev.findIndex((item) => item.fieldName === fieldName);
            if (idx !== -1) {
              // update phần tử cũ đã tồn tại
              const updated = [...prev];
              updated[idx] = { fieldName, params, dataRow, listColumn };
              return updated;
            }
            // thêm mới nếu chưa có
            return [...prev, { fieldName, params, dataRow, listColumn }];
          });
        } 

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
        // toggle={() => !isSubmit && handleClear(false)}
        toggle={() => handleClear(false)}
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
              <Button onClick={() => handleClear(false)} type="button" className="btn-close" color="transparent" onlyIcon={true}>
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
                    setShowPopupCustom={setShowPopupCustom}
                    setCodePopupCustom={setCodePopupCustom}
                    dataInit={dataInit}
                    contextData={{
                      nodeId: contextData?.nodeId,
                      processId: contextData?.processId,
                      potId: contextData?.potId,
                      workId: dataWork?.id,
                      workName: dataWork?.nodeName,
                      procurementTypeId:
                        dataWork?.extendedData && JSON.parse(dataWork?.extendedData) && JSON.parse(dataWork?.extendedData).requestGroupCode,
                    }}
                    // showOnRejectModal={showOnRejectModal || showOnHoldModal}
                    showOnRejectModal={false}
                    setDataSchemaDraft={(data) => {
                      setDataSchemaDraft(data);
                      if (listNodeDocument && listNodeDocument.length > 0) {
                        const resultNote = listNodeDocument.map((item) => ({
                          ...item,
                          content: data[item.key] || "",
                        }));
                        setListNodeDocument(resultNote);
                      }
                    }}
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

              <OnHoldModal
                onShow={showOnHoldModal}
                data={dataWork}
                dataSchema={dataSchemaDraft}
                onHide={(reload) => {
                  if (reload) {
                    // getListWorkTime(params);
                    handleClear(true);
                  }
                  setShowOnHoldModal(false);
                  // setDataSchema(null);
                }}
              />

              <OnRejectModal
                onShow={showOnRejectModal}
                data={dataWork}
                dataSchema={dataSchemaDraft}
                // checkIsApproval={checkIsApproval}
                dataForm={dataForm}
                checkReceived={dataEngine?.isReceived === 1 ? true : false}
                onHide={(reload) => {
                  if (reload) {
                    // getListWorkTime(params);
                    handleClear(true);
                  }
                  setShowOnRejectModal(false);
                  // setDataSchema(null);
                }}
              />

              <ModalConfirmRelease
                onShow={showConfirmRelease}
                data={dataWork}
                dataSchema={dataSchema}
                onHide={(reload) => {
                  if (reload) {
                    handleSubmit();
                    setIsSubmit(true);
                  }
                  setShowConfirmRelease(false);
                  // setDataSchema(null);
                }}
              />

              {/* {(dataEngine?.isProcessed === 1) ? 
                  <div className="overlayProcessed">
                    <div className="overlay-content-Processed">
                      <p>Tiếp nhận để thực hiện công việc</p>
                    </div>
                  </div>
                  : null
                } */}
            </div>
          </ModalBody>
          <ModalFooter actions={actions} />
        </form>
      </Modal>
      <Dialog content={contentDialog} isOpen={showDialog} />
      <ModalCustomPopup
        onShow={showPopupCustom}
        codePopupCustom={codePopupCustom}
        isHandleTask={isHandleTask}
        dataWork={null}
        onHide={(reload, notClose, closeDetailWork) => {
          // if (reload) {
          //   handGetDetailWork(idData);
          //   // getListWorkPause(idData);
          //   getListWorkPause(data?.potId, data?.processId, data?.id, data);
          // }
          if (!notClose) {
            setShowPopupCustom(false);
            setCodePopupCustom("");
          }
          // if (closeDetailWork) {
          //   setIsHandleTask();
          // }
        }}
      />

      <ModalSelectJump
        onShow={showSelectJump}
        data={null}
        onHide={(reload, isJump) => {
          if (reload) {
            handleSubmit(isJump);
          }
          setShowSelectJump(false);
        }}
      />
    </Fragment>
  );
}

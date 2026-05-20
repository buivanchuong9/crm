import React, { Fragment, useState, useEffect, useMemo, useRef } from "react";
import { IActionModal } from "model/OtherModel";
import Icon from "components/icon";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import { isDifferenceObj, convertToId, convertToFileName } from "reborn-util";
import "./ModalAddProcurement.scss";
import BusinessProcessService from "services/BusinessProcessService";
import { handDownloadFileOrigin, showToast } from "utils/common";
import Button from "components/button/button";
import { useNavigate } from "react-router-dom";
import FormViewerComponent from "pages/BPM/BpmForm/FormViewer";
import PurchaseRequestService from "services/PurchaseRequestService";
import Loading from "components/loading";
import * as XLSX from "xlsx";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Tippy from "@tippyjs/react";

const defaultSchema = {
  type: "default",
  components: [],
};

export default function ModalAddProcurement({ onShow, onHide, data, onSchedule, workId }) {
  // console.log('data', data);
  // console.log('onSchedule', onSchedule);
  // console.log('workId', workId);

  const navigate = useNavigate();
  const checkShowFullScreen = localStorage.getItem("showFullScreenEform");
  const [showFullScreen, setShowFullScreen] = useState<boolean>(checkShowFullScreen ? JSON.parse(checkShowFullScreen) : false);
  useEffect(() => {
    localStorage.setItem("showFullScreenEform", JSON.stringify(showFullScreen));
  }, [showFullScreen]);

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isSubmitDraft, setIsSubmitDraft] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
  const [dataInit, setDataInit] = useState(null);
  const [dataEngine, setDataEngine] = useState(null);
  const [contextData, setContextData] = useState({ nodeId: "", processId: 0, potId: 0 });
  const [showOnHoldModal, setShowOnHoldModal] = useState(false);
  const [showOnRejectModal, setShowOnRejectModal] = useState(false);
  const [dataSchema, setDataSchema] = useState(null);
  const [dataSchemaDraft, setDataSchemaDraft] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingEngine, setIsLoadingEngine] = useState(true);

  const getPurchaseRequestInit = async (onSchedule) => {
    const params = {
      processCode: "YCMS",
      onSchedule: onSchedule,
    };
    const response = await PurchaseRequestService.getPurchaseRequestInit(params);

    if (response.code == 0) {
      const result = response.result;
      if (result) {
        setContextData(result);
        getDetailTask(result?.nodeId);

        const attributeValue = (result?.bpmFormData?.attributeValue && JSON.parse(result?.bpmFormData?.attributeValue)) || null;
        setDataInit(attributeValue);
        // getDataForm(result?.potId, result?.nodeId);
      }
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    // setIsLoading(false);
  };

  const getRequestSubmitter = async (requestId) => {
    const response = await PurchaseRequestService.getRequestSubmitter({ requestId });

    if (response.code == 0) {
      const result = response.result;
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  useEffect(() => {
    if (onShow) {
      if (data) {
        setContextData(data);
        getDetailTask(data?.nodeId);
        getDataForm(data?.potId, data?.nodeId, data?.workId);
        // getPurchaseRequestDetail(data?.potId, data?.nodeId);
      } else {
        getPurchaseRequestInit(onSchedule);
      }
    }
  }, [onShow, data, onSchedule]);

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

  const getPurchaseRequestDetail = async (potId, nodeId) => {
    setIsLoadingEngine(true);
    const params = {
      potId: potId,
      nodeId: nodeId,
    };
    const response = await PurchaseRequestService.detail(params);

    if (response.code == 0) {
      const result = response.result;
      const attributeValue = (result?.attributeValue && JSON.parse(result?.attributeValue)) || null;
      console.log("attributeValue", attributeValue);
      setDataInit(attributeValue);
      setDataEngine(result);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setIsLoadingEngine(false);
  };

  //engine
  const getDataForm = async (potId, nodeId, workId) => {
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
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setIsLoadingEngine(false);
  };

  // useEffect(() => {
  //     if (dataWork && onShow) {
  //         const contextData = dataWork?.contextData && JSON.parse(dataWork?.contextData);
  //         setContextData(contextData);
  //         getDetailTask(contextData.nodeId);
  //     }
  // }, [dataWork, onShow])

  const [formSchema, setFormSchema] = useState(defaultSchema); // Lưu trữ schema
  const [initFormSchema, setInitFormSchema] = useState(defaultSchema); // Lưu trữ schema
  console.log("initFormSchema", initFormSchema);

  // Callback để nhận schema khi người dùng thay đổi trong FormEditor
  const handleSchemaSubmit = (newSchema, reject) => {
    // setFormSchema(newSchema); // Cập nhật schema mới
    console.log("Schema mới:", newSchema);
    if (!reject) {
      onSubmit(newSchema);
    } else {
      setDataSchema(newSchema);
    }
  };

  const onSubmit = async (config) => {
    // const newConfig = {
    //   ...config,
    //   procurementType: config.procurementType.toString()
    // }
    setIsSubmit(true);
    const body = {
      nodeId: contextData?.nodeId,
      processId: contextData?.processId,
      processCode: "YCMS",
      potId: contextData?.potId,
      config: JSON.stringify(config),
      // workId: dataWork.id
      serviceNodeId: onSchedule == 1 ? "Activity_099ol6y" : "Activity_1en9gf7",
    };

    console.log("body", body);

    const response = await BusinessProcessService.purchaseRequestApprove(body);

    if (response.code === 0) {
      showToast(`Tạo yêu cầu thành công`, "success");
      handleClear(true);
      // localStorage.setItem("isKanbanBusinessProcess", JSON.stringify(true));
      // setTimeout(() => {
      //     navigation("/bpm/manage_processes");
      // }, 500)
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setIsSubmit(false);
  };

  const onDraff = async (config) => {
    setIsSubmitDraft(true);
    const body = {
      ...(data?.id ? { id: data.id } : {}),
      nodeId: contextData?.nodeId,
      processId: contextData?.processId,
      potId: contextData?.potId,
      config: JSON.stringify(config),
      // workId: dataWork.id
      serviceNodeId: onSchedule == 1 ? "Activity_099ol6y" : "Activity_1en9gf7",
    };

    console.log("body", body);

    const response = await BusinessProcessService.purchaseRequestDraft(body);

    if (response.code === 0) {
      showToast(`Xử lý nhiệm vụ thành công`, "success");
      handleClear(true);
      setIsSubmitDraft(false);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      setIsSubmitDraft(false);
    }
  };

  const actions = useMemo<IActionModal>(
    () => ({
      actions_right: {
        buttons: [
          ...(data?.status === 1
            ? []
            : ([
                {
                  title: "Lưu nháp",
                  color: "primary",
                  variant: "outline",
                  disabled: isSubmitDraft,
                  callback: () => {
                    onDraff(dataSchemaDraft);
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
                    handleSubmit();
                  },
                },
              ] as any)),
        ],
      },
    }),
    [isSubmit, isSubmitDraft, dataEngine, dataSchemaDraft, data, onSchedule]
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
    setInitFormSchema(defaultSchema);
    setTimeout(() => {
      setIsLoading(true);
    }, 500);
  };

  const formContainerRef = useRef(null);
  const formViewerRef = useRef(null);

  const handleSubmit = async () => {
    if (formViewerRef.current) {
      try {
        const result = await formViewerRef.current.submit();
        console.log("Form submitted successfully:", result.data);
      } catch (error) {
        console.error("Form submission failed:", error);
      }
    }
  };

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

  useEffect(() => {
    window.addEventListener("message", (event) => {
      console.log("event", event);

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

      if (event.data?.type === "EXPORT_DOCUMENT") {
        const fileUrl = event.data.fileUrl;
        const fileName = event.data.fileName;
        handDownloadFileOrigin(fileUrl, fileName);
      }

      if (event.data?.type === "EXPORT_DOCUMENT_ALL") {
        const dataAttachment = event.data.dataAttachment;
        downloadAndZipFiles(dataAttachment);
      }

      if (event.data?.type === "VIEW_DOCUMENT_TAB") {
        const dataLink = event.data.dataLink;
        console.log("dataLink", dataLink);

        window.open(dataLink, "_blank", "noopener,noreferrer");
      }
    });
  }, []);

  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        size="xxl"
        toggle={() => !isSubmit && handleClear(false)}
        // className="modal-add-procurement"
        className={showFullScreen ? "modal-add-procurement-full" : "modal-add-procurement"}
      >
        <form className="form-handle-task" onSubmit={(e) => onSubmit(e)}>
          {/* <ModalHeader title={`Cài đặt biểu mẫu`} toggle={() => !isSubmit && handleClear(false)} /> */}
          <div className="container-header">
            <div className="box-title">
              <h4>{`${data?.status === 1 ? "Xem chi tiết" : "Thêm mới"} yêu cầu mua sắm`}</h4>
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

              {/* {(!isLoading || initFormSchema?.components?.length !== 0) ? 
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
                          workId: null
                      }}
                      showOnRejectModal={showOnRejectModal || showOnHoldModal}
                      setDataSchemaDraft={setDataSchemaDraft}
                      setIsLoading={setIsLoading}
                      isLoading={isLoading}

                  />
                  : <Loading/>
                } */}

              {(data && isLoadingEngine) || initFormSchema?.components?.length === 0 ? (
                <Loading />
              ) : (
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
                    workId: null,
                  }}
                  // showOnRejectModal={showOnRejectModal || showOnHoldModal}
                  showOnRejectModal={false}
                  setDataSchemaDraft={setDataSchemaDraft}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
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

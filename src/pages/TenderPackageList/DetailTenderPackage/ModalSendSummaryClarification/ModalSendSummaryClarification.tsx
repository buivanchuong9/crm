import AttachmentComponent from "components/AttachmentComponent/AttachmentComponent";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import TextArea from "components/textarea/textarea";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { IActionModal } from "model/OtherModel";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileService from "services/FileService";
import TenderPackageService from "services/TenderPackageService";
import { showToast } from "utils/common";
import { uploadDocumentFormData } from "utils/document";
import ModalConfirmSend from "./ModalConfirmSend/ModalConfirmSend";
import "./ModalSendSummaryClarification.scss";

export default function ModalSendSummaryClarification({ onShow, onHide, data }) {
  const navigation = useNavigate();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("");
  const [listAttactment, setListAttactment] = useState([]);
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);
  const [showProgress, setShowProgress] = useState<number>(0);
  const [isConfirmSend, setIsConfirmSend] = useState(false);
  const isFormValid = content.length > 0 || listAttactment.length > 0;

  // useEffect(() => {
  //     if(onShow && data){
  //       setContent(data?.content);

  //       const attachmentsData = data?.attachments ? JSON.parse(data.attachments) : [];
  //       setListAttactment(
  //         attachmentsData.map(item => {
  //           return {
  //             type: item.extension,
  //             fileUrl: item.fileUrl,
  //             fileName: item.fileName,
  //             fileSize: item.fileSize
  //           }
  //         })
  //       )
  //     }
  // }, [onShow, data,])

  const [listHistory, setListHistory] = useState([]);
  const getListHistory = async (id) => {
    const params = {
      packageId: id,
    };
    const response = await TenderPackageService.listGeneralClarification(params);
    if (response.code === 0) {
      const result = response.result;
      if (result && result.length > 0) {
        setListHistory(
          result.map((item) => {
            return {
              ...item,
              attachments: JSON.parse(item.attachments),
            };
          })
        );
      }
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  useEffect(() => {
    if (data?.id && onShow) {
      getListHistory(data.id);
    }
  }, [data, onShow]);

  const onSubmit = async (config) => {
    setIsSubmit(true);
    const body = {
      id: 0,
      content: content,
      attachments: JSON.stringify(listAttactment),
    };

    console.log("body", body);

    const response = await TenderPackageService.updateGeneralClarification(body);

    if (response.code === 0) {
      showToast(`Gửi tổng hợp làm rõ HSMT thành công`, "success");
      handleClear(true);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setIsSubmit(false);
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
              handleClear(false);
            },
          },
          {
            title: "Gửi",
            // type: "submit",
            color: "primary",
            disabled: isSubmit || !isFormValid,
            // || !isDifferenceObj(formData, values),
            is_loading: isSubmit,
            callback: () => {
              setIsConfirmSend(true);
            },
          },
        ],
      },
    }),
    [isSubmit, data, isFormValid]
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
    setContent("");
    setListAttactment([]);
    setListHistory([]);
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

  //* Xử lý tài liệu
  const onSuccess = (data) => {
    if (data) {
      const result = {
        fileUrl: data.fileUrl,
        type: data.extension,
        fileName: data.fileName,
        fileSize: data.fileSize,
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

  useEffect(() => {
    if (isLoadingFile === false) {
      setShowProgress(0);
    }
  }, [isLoadingFile]);

  const [dragging, setDragging] = useState<boolean>(false);

  function handleDragStart(e) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);

    const newFiles = [...listAttactment];
    const droppedFiles: any = Array.from(e.dataTransfer.files);
    console.log("droppedFiles", droppedFiles);

    droppedFiles.forEach((file) => {
      // const checkFile = file?.name.split("?")[0].split("#")[0].split(".").pop();
      // if (checkFile !== "xlsx") {
      //   showToast("File không đúng định dạng. Vui lòng kiểm tra lại !", "warning");
      //   return;
      // }

      const checkFile = file.type;

      if (!newFiles.find((f) => f.fileName === file.name)) {
        setIsLoadingFile(true);
        if (checkFile.startsWith("image")) {
          handUploadFile(file);
        }

        if (checkFile.startsWith("application")) {
          uploadDocumentFormData(file, onSuccess, onError, onProgress);
        }
      }
    });

    setListAttactment(newFiles);
  }

  const handUploadFile = async (file) => {
    await FileService.uploadFile({ data: file, onSuccess: processUploadSuccess, onError: uploadError, onProgress });
  };

  const processUploadSuccess = (data) => {
    const result = data?.fileUrl;
    const changeResult = {
      fileUrl: result,
      type: "image",
      fileName: data.fileName,
      fileSize: data?.fileSize,
    };
    setListAttactment([changeResult, ...listAttactment]);
    setIsLoadingFile(false);
  };

  const uploadError = (message) => {
    setIsLoadingFile(false);
    showToast(message.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau !", "error");
  };

  const handleRemoveImageItem = (idx) => {
    const result = [...listAttactment];
    result.splice(idx, 1);
    setListAttactment(result);
  };

  const [downloadAll, setDownloadAll] = useState(false);
  // Hàm để tải và nén các file
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
    setDownloadAll(false);
  };

  const handleDownloadAll = () => {
    setDownloadAll(true);
    downloadAndZipFiles(listAttactment);
  };

  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        size="md"
        toggle={() => !isSubmit && handleClear(false)}
        className="modal-send-summary-clarification"
      >
        <form className="form-send-summary-clarification" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader title={`Gửi tổng hợp làm rõ HSMT`} toggle={() => !isSubmit && handleClear(false)} />
          <ModalBody>
            <div className="container_send-summary-clarification">
              <div className="body-content">
                <div style={{ width: "100%" }}>
                  <TextArea
                    name="content"
                    label="Nội dung"
                    value={content}
                    placeholder="Nhập nôi dung"
                    fill={true}
                    required={false}
                    onChange={(e) => {
                      const value = e.target.value;
                      setContent(value);
                    }}
                    // onChange={(e) => handleChangeContent(e)}
                    // maxLength={459}
                  />
                </div>

                <AttachmentComponent listAttactment={listAttactment} setListAttactment={setListAttactment} />

                {listHistory && listHistory.length > 0 ? (
                  <div
                    className="button-show-history"
                    onClick={() => {
                      handleClear(true);
                    }}
                  >
                    <span>Xem lịch sử gửi thông báo cho nhà thầu</span>
                  </div>
                ) : null}
                {/* <div className="attachments">
                    <label className="title-attachment">Tệp đính kèm</label>
                    <div 
                        className={"wrapper-list-image"}
                        draggable="true"
                        onDragEnter={handleDragEnter}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onDragStart={handleDragStart}
                    >
                        <div style={{ width: '100%', display:'flex', justifyContent:'center'}}>
                            <label htmlFor="imageUpload" className="action-upload-image">
                                <div className={`wrapper-upload`}>
                                    <div>
                                        <Icon name="UploadRox" />
                                    </div>
                                    <div>
                                        Nhấn hoặc thả vào để tải lên
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>

                    {listAttactment && listAttactment.length > 0 ? 
                        <div style={{marginTop: '1rem'}}>
                            <span style={{fontSize: 12, fontWeight: '500', color: '#939394'}}>Tệp đính kèm</span>
                        </div>
                    : null}

                    <div className="list-attachment">
                        {isLoadingFile ? 
                            <div className="item-attachment">
                                <Icon name='FileXls'/>
                                <div className="data-file">
                                    <span style={{fontSize: 14, fontWeight: '500'}}>Đang tải...</span>
                                    <div className="container-loading">
                                        <div className="item-loading" style={{width: `${showProgress}%`}}/>
                                    </div>
                                </div>
                            </div>
                        : null}
                        {listAttactment && listAttactment.length > 0 ? 
                            listAttactment.map((item, index) => (
                                <div key={index} 
                                className="item-attachment"
                                onDoubleClick={() => {
                                    window.open(`${process.env.APP_LINK}/app/view_document?name=${item.fileName}&url=${item.fileUrl}`, "_blank", "noopener,noreferrer");
                                }}
                                >
                                    {item?.type == "image" ? (
                                        <img src={item?.fileUrl} width={36} height={36}/>
                                    ) : (
                                        <Icon name="FileXls" />
                                    )}
                                    <div className="data-file">
                                        <span style={{fontSize: 14, fontWeight: '500'}}>{item?.fileName ? trimContent(item?.fileName, 50, true, true) : ``}{item?.fileName?.length > 50 ? `.${item?.type}` : ''}</span>
                                        <div>
                                            <span style={{fontSize: 12, fontWeight: '400', color: '#999999'}}>{item?.fileSize ? item?.fileSize : ``}</span>
                                        </div>
                                    </div>
                                    <div 
                                        style={{marginTop: '-1rem', cursor: 'pointer'}}
                                        onClick={() => {
                                            handleRemoveImageItem(index);
                                        }}
                                    >
                                        <Icon name='Times' style={{width: '2rem', height: '2rem'}}/>
                                    </div>
                                </div>
                            ))
                            : null
                        }
                        
                    </div>
                    <input
                        type="file"
                        accept="image/*,.xlsx,.xls,.doc,.docx,.ppt,.pptx,.txt,.pdf"
                        className="d-none"
                        id="imageUpload"
                        onChange={(e) => handleUploadDocument(e)}
                    />
                </div> */}
              </div>
            </div>
          </ModalBody>
          <ModalFooter actions={actions} />
        </form>
      </Modal>
      <ModalConfirmSend
        onShow={isConfirmSend}
        content={content}
        listAttachment={listAttactment}
        packageId={data?.id}
        onHide={(reload) => {
          if (reload) {
            handleClear(false);
          }
          setIsConfirmSend(false);
        }}
      />
      <Dialog content={contentDialog} isOpen={showDialog} />
    </Fragment>
  );
}

import React, { Fragment, useState, useEffect, useCallback, useMemo } from "react";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import FieldCustomize from "components/fieldCustomize/fieldCustomize";
import { IActionModal } from "model/OtherModel";
import { IFieldCustomize, IFormData, IValidation } from "model/FormModel";
import { useActiveElement } from "utils/hookCustom";
import Validate, { handleChangeValidate } from "utils/validate";
import { formatFileSize, showToast } from "utils/common";
import { isDifferenceObj, trimContent } from "reborn-util";
import "./ModalImportAttachment.scss";
import RadioList from "components/radio/radioList";
import { uploadDocumentFormData } from "utils/document";
import FileService from "services/FileService";
import Icon from "components/icon";
import PurchaseRequestService from "services/PurchaseRequestService";

export default function ModalImportAttachment(props: any) {
  const { onShow, onHide, dataProcurement } = props;

  const focusedElement = useActiveElement();

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
  const [listAttactment, setListAttactment] = useState([]);
  console.log('listAttactment', listAttactment);
  
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);
  const [showProgress, setShowProgress] = useState<number>(0);

  const values = useMemo(
    () =>
    ({
      attachment: '1'
    } as any),
    [dataProcurement, onShow]
  );

  const [formData, setFormData] = useState<IFormData>({ values: values });  

  const validations: IValidation[] = [
    {
      name: "typeProcure",
      rules: "required",
    },
    // {
    //   name: "codd",
    //   rules: "required|min:0",
    // }
  ];

  useEffect(() => {
    setFormData({ ...formData, values: values, errors: {} });
    setIsSubmit(false);

    return () => {
      setIsSubmit(false);
    };
  }, [values]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsSubmit(true);

    const body: any = {
      nodeId: dataProcurement?.nodeId,
      potId: dataProcurement?.potId,
      data: JSON.stringify(listAttactment)
    };

    const response = await PurchaseRequestService.upload(body);

    if (response.code === 0) {
      showToast(`Tải tài liệu thành công`, "success");
      handClearForm(true);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      setIsSubmit(false);
    }
  };

  const handClearForm = (acc) => {
    onHide(acc);
    setIsSubmit(false);
    setListAttactment([]);
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
            disabled: isSubmit ,
            //     || !isDifferenceObj(formData.values, values) 
            //     || (formData.errors && Object.keys(formData.errors).length > 0)
            //     || !formData.values.name,
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
      title: <Fragment>{`Hủy bỏ tải tài liệu`}</Fragment>,
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
        fileSize: data.fileSize
      };

      setListAttactment([result,...listAttactment]);
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
    console.log('droppedFiles', droppedFiles);
    
    droppedFiles.forEach((file) => {
      // const checkFile = file?.name.split("?")[0].split("#")[0].split(".").pop();      
      // if (checkFile !== "xlsx") {
      //   showToast("File không đúng định dạng. Vui lòng kiểm tra lại !", "warning");
      //   return;
      // }

      const checkFile = file.type;

      if (!newFiles.find((f) => f.name === file.name)) {
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
      fileSize: data?.fileSize
    };
    setListAttactment([changeResult,...listAttactment]);
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

  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        toggle={() => !isSubmit && handClearForm(false)}
        className="modal-import-attachment"
        // size="sm"
      >
        <form className="form-import-attachment" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader
            title={`Tải tài liệu`}
            toggle={() => {
              !isSubmit && handClearForm(false);
            }}
          />
          <ModalBody>
            <div className="list-form-group">
              <div className="list-field-item list-field-basic">

                <div className="attachments">
                  <label className="title-attachment">Tài liệu đính kèm</label>
                  <div 
                    className={"wrapper-list-image"}
                    draggable="true"
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onDragStart={handleDragStart}
                  >
                  {/* <div className={listAttactment.length >= 5 ? "list-image-scroll" : "wrapper-list-image"}> */}
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
                        <span style={{fontSize: 12, fontWeight: '500', color: '#939394'}}>Đã tải lên</span>
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
                                {/* <Icon name='FileXls'/> */}
                                <div className="data-file">
                                    <span style={{fontSize: 14, fontWeight: '500'}}>{item?.fileName ? trimContent(item?.fileName, 50, true, true) : ``}{item?.fileName?.length > 50 ? `.${item?.type}` : ''}</span>
                                    <div>
                                        <span style={{fontSize: 12, fontWeight: '400', color: '#999999'}}>{item?.fileSize ? formatFileSize(item?.fileSize) : ``}</span>
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

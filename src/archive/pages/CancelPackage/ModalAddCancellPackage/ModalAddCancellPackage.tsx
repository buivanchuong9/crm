import React, { Fragment, useState, useEffect, useMemo, useRef, useContext } from "react";
import { IActionModal } from "model/OtherModel";
import Icon from "components/icon";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import "./ModalAddCancellPackage.scss";
import { formatFileSize, handDownloadFileOrigin, showToast } from "utils/common";
import { useNavigate } from "react-router-dom";
import TextArea from "components/textarea/textarea";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { uploadDocumentFormData } from "utils/document";
import FileService from "services/FileService";
import AttachmentComponent from "components/AttachmentComponent/AttachmentComponent";
import DatePickerCustom from "components/datepickerCustom/datepickerCustom";
import moment from "moment";
import ModalConfirm from "components/ModalConfirm/ModalConfirm";
import SelectCustom from "components/selectCustom/selectCustom";
import FieldListService from "services/FieldListService";
import CancelBiddingPackageService from "services/CancelBiddingPackageService";
import PurchaseRequestService from "services/PurchaseRequestService";

export default function ModalAddCancellPackage({ onShow, onHide, data, isView, setIsView }) {  
    
    const navigation = useNavigate();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [fieldData, setFieldData] = useState(null);
    const [packageData, setPackageData] = useState(null);
    const [content, setContent] = useState("");
    const [time, setTime] = useState(null);
    const [listAttactment, setListAttactment] = useState([]);
    const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);
    const [showProgress, setShowProgress] = useState<number>(0);
    const [isModalConfirm, setIsModalConfirm] = useState(false);

  useEffect(() => {
    if(data?.id && onShow){
      setFieldData({value: data.fieldId, label: data.fieldName});
      setPackageData({value: data.potId, label: data.biddingPackage});
      setContent(data.reason);
      const attachments = data.attachments && Array.isArray(JSON.parse(data.attachments)) && JSON.parse(data.attachments) || [];
      setListAttactment(attachments);
    }
  }, [data, onShow])


  const loadedOptionField = async (search, loadedOptions, { page }) => {
    const param: any = {
      name: search,
      page: page,
      limit: 10,
      status: 1
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

  const loadedOptionPackage = async (search, loadedOptions, { page }) => {
    const param: any = {
      name: search,
      page: page,
      limit: 10,
      fieldId: fieldData?.value
    };

    const response = await PurchaseRequestService.list(param);

    if (response.code === 0) {
      const dataOption = response.result.items;

      return {
        options: [
          ...(dataOption.length > 0
            ? dataOption.map((item) => {
                return {
                  value: item.potId,
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
    loadedOptionPackage("", undefined, { page: 1 });
  }, [fieldData])

  const onSubmit = async (e) => {
    // e.preventDefault();
    if(!fieldData){
      showToast(`Lĩnh vực không được để trống`, "error");
      return;
    }

    if(!packageData){
      showToast(`Gói thầu không được để trống`, "error");
      return;
    }

    if(!content){
      showToast(`Nội dung không được để trống`, "error");
      return;
    }

    setIsSubmit(true);
    const body = {
      id: 0,
      potId: packageData?.value,
      reason: content,
      attachments: JSON.stringify(listAttactment),
      fieldId: fieldData?.value
    }

    console.log('body', body);

    const response = await CancelBiddingPackageService.update(body);

    if (response.code === 0) {
        showToast(`Huỷ gói thầu thành công`, "success");
        handleClear(true); 

    } else {
        showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setIsSubmit(false);
  }

  const actions = useMemo<IActionModal>(
    () => ({
      actions_right: {
        buttons: [
            {
                title:"Huỷ",
                color: "primary",
                variant: "outline",
                disabled: isSubmit,
                callback: () => {
                    handleClear(false);
                },
            },
            
            ...(isView ? [] : [
                {
                    title: "Xác nhận",
                    // type: "submit",
                    color: "primary",
                    disabled: isSubmit, 
                    // || !isDifferenceObj(formData, values),
                    is_loading: isSubmit,
                    callback: () => {
                        setIsModalConfirm(true);
                    },
                },
            ] as any),
            
        ],
      },
    }),
    [
        isSubmit,
        data,
        isView
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
        setListAttactment([]);
        setFieldData(null);
        setPackageData(null);
        setIsModalConfirm(false);
        setContent("");
    }

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
        className="modal-cancel-packag"
      >
        <form className="form-cancel-packag" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader title={`Hủy gói thầu`} toggle={() => !isSubmit && handleClear(false)} />
          <ModalBody>
            <div className='container_cancel-packag'>
              <div className="body-content">
                
                <div>
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
                          setPackageData(null);
                      }}
                      isAsyncPaginate={true}
                      placeholder="Chọn lĩnh vực"
                      additional={{
                          page: 1,
                      }}
                      loadOptionsPaginate={loadedOptionField}
                    />
                </div>

                <div style={{marginTop: '1.5rem'}}>
                    <SelectCustom
                      key={fieldData?.value}
                      id=""
                      name=""
                      label={"Gói thầu"}
                      fill={true}
                      value={packageData}
                      required={true}
                      options={[]}
                      disabled={isView || !fieldData}
                      onChange={(e) => {
                          setPackageData(e);
                      }}
                      isAsyncPaginate={true}
                      placeholder="Chọn gói thầu"
                      additional={{
                          page: 1,
                      }}
                      loadOptionsPaginate={loadedOptionPackage}
                    />
                </div>

                <div style={{width: '100%', marginTop: '1.5rem'}}>
                    <TextArea
                        name='content'
                        label="Lý do"
                        value={content}
                        placeholder="Nhập lý do"
                        fill={true}
                        disabled={isView}
                        required={true}
                        onChange={(e) => {
                            const value = e.target.value;
                            setContent(value);
                        }}
                        // onChange={(e) => handleChangeContent(e)}
                        // maxLength={459}
                    />
                </div>

                <AttachmentComponent
                    listAttactment={listAttactment}
                    setListAttactment={setListAttactment}
                    disAddAttachment={isView}
                    dowloadButton={isView}
                />

              </div>
            </div>
          </ModalBody>
          <ModalFooter actions={actions} />
        </form>
      </Modal>
      <Dialog content={contentDialog} isOpen={showDialog} />

      <ModalConfirm
        onShow={isModalConfirm}
        title={'huỷ gói thầu'}
        content='huỷ gói thầu này'
        isSubmit={isSubmit}
        onSubmit={onSubmit}
        onHide={(reload) => {
          if(reload){
            // handGetDetailWork(dataAsked?.id);
          }
          setIsModalConfirm(false);
        }}
      />
      
    </Fragment>
  );
}

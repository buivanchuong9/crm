import React, { Fragment, useState, useEffect, useMemo, useRef, useContext } from "react";
import { IActionModal } from "model/OtherModel";
import Icon from "components/icon";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import "./ModalRequestExtend.scss";
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
import Input from "components/input/input";
import TenderPackageService from "services/TenderPackageService";

export default function ModalRequestExtend({ onShow, onHide, data }) {  
    
    const navigation = useNavigate();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
    const [isLoading, setIsLoading] = useState(true);    
    const [content, setContent] = useState("");
    const [time, setTime] = useState(null);
    const [listAttactment, setListAttactment] = useState([]);
    const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);
    const [showProgress, setShowProgress] = useState<number>(0);
    const [isModalConfirm, setIsModalConfirm] = useState(false);

  useEffect(() => {
    if(data?.extensionRequestId && onShow){
        handGetDetail(data?.extensionRequestId);
    }
  }, [data, onShow])

  const handGetDetail = async (id: number) => {
    if (!id) return;
    setIsLoading(true);
    const response = await TenderPackageService.detailExtensionRequest(id);

    if (response.code === 0) {
      const result = response.result;
      setContent(result?.note);
      setTime(result?.extensionTime);

      const attachments = result?.attachments && JSON.parse(result?.attachments) || []
      setListAttactment(attachments || []);
      
    } else {
      showToast("Có lỗi xảy ra. Vui lòng thử lại sau!", "error");
    }
    setIsLoading(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    const body = {
      id: 0,
      time: time,
      content: content,
      attachments: JSON.stringify(listAttactment)
    }

    console.log('body', body);

    // const response = await TenderPackageService.updateGeneralClarification(body);

    // if (response.code === 0) {
    //     showToast(`Gửi tổng hợp làm rõ HSMT thành công`, "success");
    //     handleClear(true); 

    // } else {
    //     showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    // }
    setIsSubmit(false);
  }

  const actions = useMemo<IActionModal>(
    () => ({
      actions_right: {
        buttons: [
            {
                title:"Đóng",
                color: "primary",
                variant: "outline",
                disabled: isSubmit,
                callback: () => {
                    handleClear(false);
                },
            },
            {
                title: "Gia hạn",
                // type: "submit",
                color: "primary",
                disabled: isSubmit, 
                // || !isDifferenceObj(formData, values),
                is_loading: isSubmit,
                callback: () => {
                    handleClear(true, time);
                },
            },
        ],
      },
    }),
    [
        isSubmit,
        data,
        time
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

    const handleClear = (acc, time?) => {
        onHide(acc, time);  
        setListAttactment([]);
        setContent('');
        setTime(null);
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
        className="modal-request-extend"
      >
        <form className="form-request-extend" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader title={`Yêu cầu gia hạn gói thầu`} toggle={() => !isSubmit && handleClear(false)} />
          <ModalBody>
            <div className='container-request-extend'>
              <div className="body-content">

                <div style={{marginBottom: '1.5rem'}}>
                    <Input
                        id="name"
                        name="name"
                        label="Nhà thầu"
                        fill={true}
                        required={false}
                        placeholder={"Nhà thầu"}
                        value={data?.organizationName}
                        disabled={true}
                        onChange={(e) => {
                            const value = e.target.value;
                            // setFormData({...formData, code: value})
                        }}
                    />
                </div>
                
                <div style={{width: '100%'}}>
                    <DatePickerCustom
                        label="Thời gian gia hạn"
                        name="time"
                        fill={true}
                        required={true}
                        isFmtText={true}
                        disabled={true}
                        value={time ?  moment(time).format("DD/MM/YYYY HH:mm") : ''}
                        onChange={(e) => {
                            setTime(e);
                        }}
                        // disabled={formData.never !== "1"}
                        placeholder="DD/MM/YYYY"
                        // maxDate={formData.values.endDate}
                        icon={<Icon name="Calendar" />}
                        iconPosition="right"
                        hasSelectTime= {true}
                    />
                </div>

                <div style={{width: '100%', marginTop: '1.5rem'}}>
                    <TextArea
                        name='content'
                        label="Lý do"
                        value={content}
                        disabled={true}
                        placeholder="Nhập lý do"
                        fill={true}
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
                    disAddAttachment={true}
                    dowloadButton={true}
                />

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

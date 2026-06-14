import React, { Fragment, useState, useEffect, useMemo, useRef, useContext } from "react";
import { IActionModal } from "model/OtherModel";
import Icon from "components/icon";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import "./ModalExtend.scss";
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
import TenderPackageService from "services/TenderPackageService";

export default function ModalExtend({ onShow, onHide, data, timeRequestExtend }) {  
  console.log('timeRequestExtend', timeRequestExtend);
  
    
  const navigation = useNavigate();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
  const [isLoading, setIsLoading] = useState(true);    
  const [content, setContent] = useState("");
  const [time, setTime] = useState(null);
  console.log('time', time);
  
  const [listAttactment, setListAttactment] = useState([]);
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);
  const [showProgress, setShowProgress] = useState<number>(0);
  const [isModalConfirm, setIsModalConfirm] = useState(false);

  useEffect(() => {
    if(data?.id && onShow){
      if(timeRequestExtend){
        setTime(new Date(timeRequestExtend));
      }
    }
  }, [data, onShow, timeRequestExtend])

  const onSubmit = async () => {
    setIsSubmit(true);

    const body = {
      id: 0,
      potId: data?.potId,
      oldTime: data?.closedDate,
      newTime: time,
      note: content,
      attachments: JSON.stringify(listAttactment),
      packageId: data?.id
    }

    console.log('body', body);

    const response = await TenderPackageService.extensionHistory(body);

    if (response.code === 0) {
      showToast(`Gia hạn gói thầu thành công`, "success");
      handleClear(false, true); 

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
                title:"Đóng",
                color: "primary",
                variant: "outline",
                disabled: isSubmit,
                callback: () => {
                    handleClear(false);
                },
            },
            {
                title: "Xác nhận gia hạn",
                // type: "submit",
                color: "primary",
                disabled: isSubmit, 
                // || !isDifferenceObj(formData, values),
                is_loading: isSubmit,
                callback: () => {
                    if(time && time > new Date ()){
                      if(content){
                        setIsModalConfirm(true);
                      } else {
                        showToast("Lý do không được để trống", "error");
                      }
                    } else {
                      showToast("Thời gian gia hạn phải lớn hơn thời gian hiện tại", "error");
                    }
                    
                },
            },
        ],
      },
    }),
    [
      isSubmit,
      data,
      time,
      content
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

    const handleClear = (acc, reload?) => {
      onHide(acc, reload);  
      setListAttactment([]);
      setTime(null);
      setContent('');
      setIsModalConfirm(false);
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
        className="modal-extend"
      >
        <form className="form-extend">
          <ModalHeader title={`Gia hạn gói thầu`} toggle={() => !isSubmit && handleClear(false)} />
          <ModalBody>
            <div className='container_extend'>
              <div className="body-content">
                <div
                    className="button-show-history"
                    onClick={() => {
                        handleClear(true);
                    }}
                >
                    <span>Xem lịch sử gia hạn</span>
                </div>
                
                <div style={{width: '100%'}}>
                    <DatePickerCustom
                        label="Thời gian gia hạn"
                        name="time"
                        fill={true}
                        required={true}
                        isFmtText={true}
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
                        timeIntervals={5}
                    />
                </div>

                {time && time <= new Date () ? 
                  <div>
                    <span style={{fontSize: 12, fontWeight: '400', color: '#ED1B34'}}>Thời gian gia hạn phải lớn hơn thời gian hiện tại</span>
                  </div>
                : null}

                <div style={{width: '100%', marginTop: '1.5rem'}}>
                    <TextArea
                        name='content'
                        label="Lý do"
                        value={content}
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
        title={'gia hạn gói thầu'}
        content='gia hạn gói thầu này'
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

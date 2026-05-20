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
import "./ModalImportProcure.scss";
import RadioList from "components/radio/radioList";
import { uploadDocumentFormData } from "utils/document";
import FileService from "services/FileService";
import Icon from "components/icon";
// import { ExportExcel } from "exports";
import ProcurementTypeService from "services/ProcurementTypeService";
import PurchaseRequestService from "services/PurchaseRequestService";
import { ExportExcel } from "./partials/ExportExcel";

export default function ModalImportProcure(props: any) {
  const { onShow, onHide, data } = props;

  const focusedElement = useActiveElement();

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
  const [showDialogConfirm, setShowDialogConfirm] = useState<boolean>(false);
  const [contentDialogConfirm, setContentDialogConfirm] = useState<IContentDialog>(null);
  const [listAttactment, setListAttactment] = useState([]);
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);
  const [showProgress, setShowProgress] = useState<number>(0);
  const [addFile, setAddFile] = useState<string>("");
  console.log('addFile', addFile);
  const [isCheckError, setIsCheckError] = useState(false);
  const [listError, setListError] = useState([]);
  console.log('listError', listError);
  

  const values = useMemo(
    () =>
    ({
      typeProcure: '1'
    } as any),
    [data, onShow]
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

  const listFieldBasic = useMemo(
    () =>
      [
        {
            label: "Loại gói thầu",
            name: "typeProcure",
            type: "radio",
            options: [
              {
                value: "1",
                label: "Xây dựng cơ bản trong tổng tiến độ",
              },
              // {
              //   value: "2",
              //   label: "Xây dựng cơ bản ngoài tổng tiến độ",
              // },
            ],
        },
      ] as IFieldCustomize[],
    [formData?.values]
  );

  useEffect(() => {
    setFormData({ ...formData, values: values, errors: {} });
    setIsSubmit(false);

    return () => {
      setIsSubmit(false);
    };
  }, [values]);

  const onSubmit = async () => {
    // e.preventDefault();
    setIsSubmit(true);
    uploadDocumentFormData(addFile, onSuccessPurchase, onError, onProgressPurchase, 'purchaseRequest');
    // setIsSubmit(true);
    // handClearForm(true, formData.values.typeProcure);

    // const body: any = {
    //   ...(formData as any),
    // };

    // const response = await ProcurementTypeService.importFile(body);

    // if (response.code === 0) {
    //   showToast(`${data ? "Cập nhật" : "Thêm mới"} loại yêu cầu mua sắm thành công`, "success");
    //   onHide(true);
    // } else {
    //   showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    //   setIsSubmit(false);
    // }
  };

  const handClearForm = (acc, typeProcure?) => {
    onHide(acc);
    setIsSubmit(false);
    setAddFile("");
    setListAttactment([]);
    setListError([]);
    setIsCheckError(false);
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
              !isDifferenceObj(formData.values, values) ? handClearForm(false, null) : showDialogConfirmCancel();
            },
          },

          ...(isCheckError ? [
            {
              title: "Nhập lại",
              // type: "submit",
              color: "primary",
              // disabled: isSubmit 
              //     || !isDifferenceObj(formData.values, values) 
              //     || (formData.errors && Object.keys(formData.errors).length > 0)
              //     || !formData.values.name,
              is_loading: isSubmit,
              callback: () => {
                setIsCheckError(false);
              }
            },
          ] : [
            {
              title: "Áp dụng",
              // type: "submit",
              color: "primary",
              // disabled: isSubmit 
              //     || !isDifferenceObj(formData.values, values) 
              //     || (formData.errors && Object.keys(formData.errors).length > 0)
              //     || !formData.values.name,
              is_loading: isSubmit,
              callback: () => {
                onSubmit();
              }
            },
          ] as any),
        ],
      },
    }),
    [formData, values, isSubmit, addFile, isCheckError]
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
    console.log('file', file);
    setAddFile(file);
    
    const checkFile = file.type;
    setIsLoadingFile(true);
    if (checkFile.startsWith("image")) {
      handUploadFile(file);
    }

    if (checkFile.startsWith("application")) {
      uploadDocumentFormData(file, onSuccess, onError, onProgress);
    }
  };

  const onSuccessPurchase = (data) => {
    console.log('dataSuccess', data);
    
    if (data) {
      // showToast(`Nhập dữ liệu thành công`, "success");
      // handClearForm(true);
      setIsSubmit(false);

      const requestId = data?.requestId;
      checkImport(requestId);
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
    console.log('message', message);
    
    setIsLoadingFile(false);
    showToast(message.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau !", "error");
    setIsSubmit(false);
  };

  const onProgressPurchase = (percent) => {
    if (percent) {
      // setShowProgress(percent.toFixed(0));
    }
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
      setAddFile(file);
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

  const titlesExcel = [
    "Mã hồ sơ yêu cầu mua sắm",
    "Tên yêu cầu mua sắm*",
    "Người tạo yêu cầu mua sắm",
    "Bộ phận yêu cầu",
    "Lĩnh vực*", 
    "Loại yêu cầu mua sắm*",   
    "Dự án*",
    "Thời gian bắt đầu*",
    "Chủ đầu tư*",
    "Tổng giá trị dự kiến",
    "Ưu tiên*",
    "Tỷ lệ ưu tiên",
    "Ghi chú"
  ];

  const formatExportOLA = [
    "center", 
    "center", 
    "center", 
    "center", 
    "center", 
    "center", 
    "center", 
    "center", 
    "center", 
    "center", 
    "center", 
    "center", 
    "center", 
  ];

  const handleExport = useCallback(
    async () => {
      // const newArray = [data];
      ExportExcel({
        fileName: "Template",
        title: "Dữ liệu mẫu",
        header: titlesExcel,
        formatExcel: formatExportOLA ,
        data: [],
        info: { name },
        generateInfo: false
      });

      showToast("Xuất file thành công", "success");
    },
    []
  );

  const checkImport = async (requestId) => {

    const params = {
      requestId: requestId
    }
    const response = await PurchaseRequestService.purchaseRequestImportCheck(params);

    if (response.code === 0) {
      const result = response.result;
      const resultDataError = result.results;

      if(result?.totalError > 0){
        setIsCheckError(true);
        setListError(resultDataError);
      } else 
      if(result?.total === (result?.totalSuccess)){
        showDialogConfirmImport(result?.requestId);
      }
      // if(result?.total === (result?.totalSuccess + result?.totalError)){
      //   showDialogConfirmImport(result?.requestId);
      // }
      // showToast("Xóa yêu cầu mua sắm/ tờ trình chủ trương thành công", "success");
      // getListProcurement(params);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  }

  const confirmImport = async (requestId) => {

    const params = {
      requestId: requestId
    }
    const response = await PurchaseRequestService.purchaseRequestImportConfirm(params);

    if (response.code === 0) {
      showToast(`Nhập dữ liệu thành công`, "success");
      handClearForm(true);
      // showToast("Xóa yêu cầu mua sắm/ tờ trình chủ trương thành công", "success");
      // getListProcurement(params);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setShowDialogConfirm(false);
    setContentDialogConfirm(null);
  }

  const showDialogConfirmImport = (requestId) => {
    const contentDialog: IContentDialog = {
      color: "success",
      className: "dialog-cancel",
      isCentered: true,
      isLoading: false,
      title: <Fragment>{`Thông báo`}</Fragment>,
      message: <Fragment>Bạn có chắc chắn muốn nhập dữ liệu vào hệ thống.</Fragment>,
      cancelText: "Quay lại",
      cancelAction: () => {
        setShowDialogConfirm(false);
        setContentDialogConfirm(null);
      },
      defaultText: "Xác nhận",
      defaultAction: () => {
        // onHide(false);
        confirmImport(requestId);
        // setShowDialogConfirm(false);
        // setContentDialogConfirm(null);
      },
    };
    setContentDialogConfirm(contentDialog);
    setShowDialogConfirm(true);
  };


  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        toggle={() => !isSubmit && handClearForm(false, null)}
        className="modal-import-procure"
        // size="sm"
      >
        <form className="form-import-procure" 
          // onSubmit={(e) => onSubmit(e)}
        >
          <ModalHeader
            title={`Nhập file excel`}
            toggle={() => {
              !isSubmit && handClearForm(false, null);
            }}
          />
          <ModalBody>
            <div className="list-form-group">
              {!isCheckError ? 
                <div className="list-field-item list-field-basic">
                  {/* {listFieldBasic.map((field, index) => (
                    <FieldCustomize
                      key={index}
                      field={field}
                      handleUpdate={(value) => handleChangeValidate(value, field, formData, validations, listFieldBasic, setFormData)}
                      formData={formData}
                    />
                  ))} */}

                  <div className="form-group">
                    <RadioList
                      options={[
                        {
                            value: "1",
                            label: "Xây dựng cơ bản trong tổng tiến độ",
                        },
                        // {
                        //     value: "2",
                        //     label: "Xây dựng cơ bản ngoài tổng tiến độ",
                        // },
                      ]}
                      // className="options-auth"
                      required={false}
                      title="Loại gói thầu"
                      name="typeProcure"
                      value={formData.values.typeProcure}
                      onChange={(e) => {
                          const value = e.target.value;
                          setFormData({...formData, values: {...formData.values, typeProcure: value}});
                                                
                      }}
                    />
                  </div>
                  <div style={{border: '0.5px solid #EEEEEF', marginTop: '1.5rem'}}></div>

                  <div className="container-download-template">
                    <span style={{fontSize: 14, fontWeight: '500'}}>Tài liệu mẫu:</span>
                    <div className="button-download"
                      onClick={() => handleExport()}
                    >
                      <span className="title-button">Tải xuống</span>
                    </div>
                  </div>

                  <div className="attachments">
                    <label className="title-attachment">Tài liệu đính kèm</label>
                    {((listAttactment && listAttactment.length > 0) || isLoadingFile) ? null : 
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
                    }

                    {/* {listAttactment && listAttactment.length > 0 ? 
                      <div style={{marginTop: '1rem'}}>
                          <span style={{fontSize: 12, fontWeight: '500', color: '#939394'}}>Đã tải lên</span>
                      </div>
                    : null} */}

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
                      accept=".xlsx,.xlsf"
                      className="d-none"
                      id="imageUpload"
                      onChange={(e) => handleUploadDocument(e)}
                    />
                  </div>
                </div>
                : 
                <div className="container-error">
                  <div className="title-error">
                    <div style={{marginBottom: '0.5rem'}}>
                      <Icon name='ImportError'/>
                    </div>
                    <div className="title">
                      <div>
                        <span style={{fontSize: 16, fontWeight: '600'}}>Không thành công</span>
                      </div>
                      <div>
                        <span style={{fontSize: 14, fontWeight: '400'}}>File excel bạn nhập chưa chính xác</span>
                      </div>
                    </div>
                  </div>

                  <div className="list-error">
                    <div className="header-error">
                      <div>
                        <span style={{fontSize: 12, fontWeight: '500'}}>Danh mục các lỗi gặp phải</span>
                      </div>
                      <div className="button-download">
                        <span className="title-download">Tải xuống</span>
                      </div>
                    </div>
                    {listError && listError.length > 0 ? 
                      <div className="body-error">
                          <div className="body-title">
                            <div>
                                <span style={{fontSize: 14, fontWeight: '400', color: '#8F97A3'}}>Hạng mục mua sắm</span>
                              </div>
                              <div>
                                <span style={{fontSize: 14, fontWeight: '400', color: '#8F97A3'}}>Ghi chú lỗi</span>
                              </div>
                          </div>
                          {listError.map((item, index) => {
                            const data = item.data ? JSON.parse(item.data) : null;
                            const error = item.error ? JSON.parse(item.error) : null;
                            console.log('error', Object.values(error));
                            
                            const key = Object.entries(error)[0] ? Object.entries(error)[0][0] : '';
                            const value = Object.entries(error)[0] ? Object.entries(error)[0][1] : '';
                            // console.log('Object.entries(error)', Object.entries(error));
                            // console.log('error', error);
                            // console.log('key', key);
                            const name = (
                              key === 'name' ? "Tên yêu cầu mua sắm"
                              : key === 'fieldId' ? 'Lĩnh vực'
                              : key === 'pteId' ? 'Loại yêu cầu mua sắm'
                              : key === 'projectId' ? 'Dự án'
                              : key === 'startTime' ? 'Thời gian bắt đầu'
                              : key === 'investorId' ? 'Mã chủ đầu tư' 
                              : ''
                            )

                            return (
                              key ? 
                              <div key={index} className="item-error">
                                <div className="item-name">
                                  <span style={{fontSize: 14, fontWeight: '400'}}>{data?.purchaseRequestName || ''}</span>
                                </div>
                                {error && Object.values(error) && Object.values(error).length > 0 ?
                                <div className="item-value">
                                  {Object.values(error).map((el, ind) => (    
                                    <div  key={ind}>
                                      <span style={{fontSize: 14, fontWeight: '400'}}>{el}</span>
                                    </div>
                                  ))}
                                  </div>  
                                : null}
                                
                              </div>
                              : null
                            )
                          })}
                      </div>
                      : null
                    }
                  </div>
                </div>
              }
            </div>
          </ModalBody>
          <ModalFooter actions={actions} />
        </form>
      </Modal>
      <Dialog content={contentDialog} isOpen={showDialog} />
      <Dialog content={contentDialogConfirm} isOpen={showDialogConfirm} />
    </Fragment>
  );
}

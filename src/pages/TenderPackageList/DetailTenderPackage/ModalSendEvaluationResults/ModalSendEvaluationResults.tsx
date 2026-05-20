import React, { Fragment, useState, useEffect, useMemo, useRef, useContext } from "react";
import { IActionModal } from "model/OtherModel";
import Icon from "components/icon";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import { isDifferenceObj, convertToId, convertToFileName, trimContent } from "reborn-util";
import "./ModalSendEvaluationResults.scss";
import BusinessProcessService from "services/BusinessProcessService";
import { formatFileSize, handDownloadFileOrigin, showToast } from "utils/common";
import { useNavigate } from "react-router-dom";
import TextArea from "components/textarea/textarea";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { uploadDocumentFormData } from "utils/document";
import FileService from "services/FileService";
import AttachmentComponent from "components/AttachmentComponent/AttachmentComponent";
import TenderPackageService from "services/TenderPackageService";
import DatePickerCustom from "components/datepickerCustom/datepickerCustom";
import moment from "moment";

export default function ModalSendEvaluationResults({ onShow, onHide, data }) {  
    
    const navigation = useNavigate();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
    const [isLoading, setIsLoading] = useState(true);    
    const [content, setContent] = useState("Thời gian nộp thầu lần tiếp theo");
    const [time, setTime] = useState(null);
    const [listAttactment, setListAttactment] = useState([]);
    const [isConfirmSend, setIsConfirmSend] = useState(false);

  useEffect(() => {
    if(data?.id && onShow){

    }
  }, [data, onShow])

  const onSubmit = async (e) => {
    e.preventDefault();

    if(!time){
      showToast("Thời gian nộp thầu tiếp theo không được để trống", "error");
      return;
    }

    if(!content){
      showToast("Ghi chú không được để trống", "error");
      return;
    }

    setIsSubmit(true);
    const body = {
      packageId: data?.id,
      extensionHistory: {
        oldTime: data?.closedDate,
        newTime: time,
        note: content,
        attachments: JSON.stringify(listAttactment),
        packageId: data?.id
      }
    }

    console.log('body', body);

    const response = await TenderPackageService.sendEvaluation(body);

    if (response.code === 0) {
        showToast(`Gửi phản hồi kết quả thành công`, "success");
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
            {
                title: "Xác nhận",
                type: "submit",
                color: "primary",
                disabled: isSubmit, 
                // || !isDifferenceObj(formData, values),
                is_loading: isSubmit,
                // callback: () => {
                //     setIsConfirmSend(true);
                // },
            },
        ],
      },
    }),
    [
        isSubmit,
        data
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
        setTime(null);
        setContent('Thời gian nộp thầu lần tiếp theo');
    }

  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        size="md"
        toggle={() => !isSubmit && handleClear(false)}
        className="modal-send-evaluation-result"
      >
        <form className="form-send-evaluation-result" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader title={`Gửi kết quả phản hồi`} toggle={() => !isSubmit && handleClear(false)} />
          <ModalBody>
            <div className='container_send-evaluation-result'>
              <div className="body-content">
                <div style={{width: '100%'}}>
                    <DatePickerCustom
                        label="Thời gian nộp thầu lần tiếp theo"
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
                    />
                </div>

                <div style={{width: '100%', marginTop: '1.5rem'}}>
                    <TextArea
                        name='content'
                        label="Ghi chú"
                        value={content}
                        placeholder="Nhập nôi dung"
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
      
    </Fragment>
  );
}

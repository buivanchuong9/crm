import React, { Fragment, useState, useEffect, useMemo, useRef, useContext } from "react";
import { IActionModal } from "model/OtherModel";
import Icon from "components/icon";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import "./ModalProblem.scss";
import { useNavigate } from "react-router-dom";

export default function ModalProblem({ onShow, onHide, problemInfo }) {
    
    const navigation = useNavigate();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<IContentDialog>(null);

    // useEffect(() => {
    //     if(onShow && problemInfo){
    //         // getDetailBidding(data?.organizationId, data?.packageId, data);
    //     }
    // }, [onShow, problemInfo]);



  const onSubmit = async (e) => {
    e.preventDefault();

    setIsSubmit(true);

    // const body = {
    //   attachments: JSON.stringify(listAttactment) || '[]',
    //   content: content,
    //   detailId: data?.id,
    // }

    // console.log('body', body);

    // const response = await ManagementAskedService.saveReply(body);

    // if (response.code === 0) {
    //     showToast(`Lưu thông tin trả lời thành công`, "success");
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
                title: "Huỷ",
                color: "primary",
                variant: "outline",
                disabled: isSubmit,
                callback: () => {
                    handleClear(false);
                },
            },
            {
                title: "Bổ sung",
                type: "submit",
                color: "primary",
                disabled: isSubmit,
                is_loading: isSubmit,
            },
        ],
      },
    }),
    [
        isSubmit,
    ]
  );

  const handleClear = (acc) => {
    onHide(acc);
  }

  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        toggle={() => !isSubmit && handleClear(false)}
        className="modal-problem"
        size="md"
      >
        <form className="form-problem" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader title={`Thông tin vấn đề`} toggle={() => !isSubmit && handleClear(false)} />
          <ModalBody>
            <div>
                <span>{problemInfo}</span>
            </div>
          </ModalBody>
          <ModalFooter actions={actions} />
        </form>
      </Modal>

      <Dialog content={contentDialog} isOpen={showDialog} />
      
    </Fragment>
  );
}

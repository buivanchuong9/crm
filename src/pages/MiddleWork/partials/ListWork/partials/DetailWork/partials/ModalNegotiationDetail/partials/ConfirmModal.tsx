import React, { Fragment, useState, useEffect, useCallback, useMemo } from "react";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import "./ConfirmModal.scss";
import Icon from "components/icon";

export default function ConfirmModal(props: any) {
  const { onShow, onHide, onSubmit } = props;

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null); 

  const handClearForm = (acc) => {
    onHide(acc);
  };

  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        toggle={() => !isSubmit && handClearForm(false)}
        className="modal-confirm-integration"
        size="sm"
      >
        <div className="form-confirm-integration">
          <ModalBody>
            <div className="container-confirm">
              <div className="box-title">
                <span style={{ fontSize: 20, fontWeight: "600", color: "#ED1B34" }}>Xác nhận lưu</span>
              </div>
              <div className="box-content">
                <span style={{ fontSize: 14, fontWeight: "400", color: "#2C2C2C" }}>Bạn có chắc chắn muốn lưu nội dung này</span>
              </div>
              <div className="box-footer">
                <div
                  className="button-cancel"
                  onClick={() => {
                    handClearForm(false);
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: "500" }}>Huỷ</span>
                </div>
                <div
                  className="button-accept"
                  onClick={() => onSubmit()}
                >
                  <span style={{ fontSize: 14, fontWeight: "500" }}>Tôi chắc chắn</span>

                  {isSubmit ? <Icon name="Loading" /> : null}
                </div>
              </div>
            </div>
          </ModalBody>
        </div>
      </Modal>

      <Dialog content={contentDialog} isOpen={showDialog} />
    </Fragment>
  );
}

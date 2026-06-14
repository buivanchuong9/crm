import React, { Fragment, useState, useEffect, useCallback, useMemo } from "react";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import { IFieldCustomize, IFormData, IValidation } from "model/FormModel";
import { formatFileSize, showToast } from "utils/common";
import "./ConfirmIntegrationModal.scss";
import _, { at, get, set } from "lodash";
import SupplierAccountService from "services/SupplierAccountService";
import Icon from "components/icon";
import HrisService from "services/HrisService";

export default function ConfirmIntegrationModal(props: any) {
  const { onShow, onHide } = props;

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);

  function getPastDate30Days() {
    const today = new Date();
    today.setDate(today.getDate() - 30);
  
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
  
    return `${year}-${month}-${day}`;
  }
   

  const onSubmit = async () => {
    setIsSubmit(true);

    let date = getPastDate30Days();

    try {
      const response = await HrisService.syncEmployee(date);
      if (response.code === 0) {
        showToast(`Đồng bộ dữ liệu thành công`, "success");
        handClearForm(true);
      } else {
        showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
        setIsSubmit(false);
      }
    } catch {
      showToast("Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      setIsSubmit(false);
      handClearForm(true);
    }
  
  };

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
        <form className="form-confirm-integration">
          <ModalBody>
            <div className="container-confirm">
              <div className="box-title">
                <span style={{ fontSize: 20, fontWeight: "600", color: "#ED1B34" }}>Xác nhận đồng bộ dữ liệu</span>
              </div>
              <div className="box-content">
                <span style={{ fontSize: 14, fontWeight: "400", color: "#2C2C2C" }}>Bạn có chắc chắc muốn đồng bộ dữ liệu HRIS?</span>
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
                  onClick={() => {
                    if (!isSubmit) {
                      onSubmit();
                    }
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: "500" }}>Tôi chắc chắn</span>

                  {isSubmit ? <Icon name="Loading" /> : null}
                </div>
              </div>
            </div>
          </ModalBody>
          {/* <ModalFooter actions={actions} /> */}
        </form>
      </Modal>

      <Dialog content={contentDialog} isOpen={showDialog} />
    </Fragment>
  );
}

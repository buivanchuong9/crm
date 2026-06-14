import React, { Fragment, useState, useEffect, useCallback, useMemo } from "react";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import { IFieldCustomize, IFormData, IValidation } from "model/FormModel";
import { formatFileSize, showToast } from "utils/common";
import "./ModalConfirmSend.scss";
import _, { at, get, set } from "lodash";
import Icon from "components/icon";
import TenderPackageService from "services/TenderPackageService";

export default function ModalConfirmSend(props: any) {
  const { onShow, onHide, content, listAttachment, packageId } = props;

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);

  // const values = useMemo(
  //   () =>
  //     ({
  //       id: data?.id ?? 0,
  //       active: 0,
  //     } as any),
  //   [data, onShow]
  // );

  // const [formData, setFormData] = useState<IFormData>({ values: values });
  // // console.log('formData', formData);

  // useEffect(() => {
  //   setFormData({ ...formData, values: values, errors: {} });
  //   setIsSubmit(false);

  //   return () => {
  //     setIsSubmit(false);
  //   };
  // }, [values]);

  const onSubmit = async () => {
    setIsSubmit(true);
    const body = {
      id: 0,
      content: content,
      attachments: JSON.stringify(listAttachment),
      packageId: packageId,
    };

    console.log("body", body);

    const response = await TenderPackageService.updateGeneralClarification(body);

    if (response.code === 0) {
      showToast(`Gửi tổng hợp làm rõ HSMT thành công`, "success");
      handClearForm(true);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setIsSubmit(false);
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
        className="modal-confirm-send"
        size="sm"
      >
        <form className="form-confirm-send">
          <ModalBody>
            <div className="container-confirm">
              <div className="box-title">
                <span style={{ fontSize: 20, fontWeight: "600", color: "#ED1B34" }}>Xác nhận gửi tổng hợp làm rõ</span>
              </div>
              <div className="box-content">
                <span style={{ fontSize: 14, fontWeight: "400", color: "#2C2C2C" }}>Bạn có chắc chắn muốn gửi tổng hợp làm rõ HSMT này?</span>
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

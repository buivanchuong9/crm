import React, { Fragment, useState, useEffect, useCallback, useMemo } from "react";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import { IFieldCustomize, IFormData, IValidation } from "model/FormModel";
import { formatFileSize, showToast } from "utils/common";
import "./ModalConfirmCancel.scss";
import _, { at, get, set } from "lodash";
import SupplierAccountService from "services/SupplierAccountService";
import Icon from "components/icon";
import TenderPackageService from "services/TenderPackageService";

export default function ModalConfirmCancel(props: any) {
  const { onShow, onHide, data } = props;

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);

  useEffect(() => {
    if (data && onShow) {
    }
  }, [data, onShow]);

  const values = useMemo(
    () =>
      ({
        id: data?.id ?? 0,
      } as any),
    [data, onShow]
  );

  const [formData, setFormData] = useState<IFormData>({ values: values });
  // console.log('formData', formData);

  useEffect(() => {
    setFormData({ ...formData, values: values, errors: {} });
    setIsSubmit(false);

    return () => {
      setIsSubmit(false);
    };
  }, [values]);

  const onSubmit = async () => {
    setIsSubmit(true);

    const body: any = {
      id: formData?.values.id,
    };

    const response = await TenderPackageService.cancelBidding(body);

    if (response.code === 0) {
      showToast(`Huỷ nhà thầu thành công`, "success");
      handClearForm(true);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      setIsSubmit(false);
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
        className="modal-confirm-cancel"
        size="sm"
      >
        <form className="form-confirm-cancel">
          <ModalBody>
            <div className="container-confirm">
              <div className="box-title">
                <span style={{ fontSize: 20, fontWeight: "600", color: "#ED1B34" }}>Xác nhận huỷ nhà thầu</span>
              </div>
              <div className="box-content">
                <span style={{ fontSize: 14, fontWeight: "400", color: "#2C2C2C" }}>Bạn có chắc chắn muốn huỷ nhà thầu này chứ?</span>
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

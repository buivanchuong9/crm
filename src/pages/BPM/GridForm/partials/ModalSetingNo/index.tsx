import React, { useState, useEffect, useMemo, Fragment } from "react";
import { IActionModal } from "model/OtherModel";
import Modal, { ModalBody, ModalFooter } from "components/modal/modal";
import "./index.scss";
import RadioList from "components/radio/radioList";

export default function ModalSetingNo(props: any) {
  const { onShow, onHide, confirmAction, loadingConfirm, typeNo } = props;

  const [typeNoTemp, setTypeNoTemp] = useState<string>("auto");

  useEffect(() => {
    if (typeNo && typeNo !== typeNoTemp) {
      setTypeNoTemp(typeNo);
    }
  }, [onShow, typeNo]);

  const actions = useMemo<IActionModal>(
    () => ({
      actions_right: {
        buttons: [
          {
            title: "Huỷ",
            color: "primary",
            variant: "outline",
            // disabled: isSubmit,
            callback: () => {
              onHide(false);
            },
          },
          {
            title: "Áp dụng",
            disabled: loadingConfirm,
            is_loading: loadingConfirm,
            callback: () => {
              confirmAction(typeNoTemp);
              onHide(false);
            },
          },
        ],
      },
    }),
    [onShow, loadingConfirm, typeNoTemp]
  );

  return (
    <Fragment>
      <Modal isFade={true} isOpen={onShow} isCentered={true} staticBackdrop={true} toggle={() => onHide(false)} className="modal__seting-no--common">
        <div className="wrapper__seting-no--common">
          <ModalBody>
            <div className="list-form-group">
              <div className="form-group">
                <RadioList
                  name="noType"
                  title="Kiểu số thứ tự: "
                  options={[
                    { label: "STT tự tăng", value: "auto" },
                    { label: "STT người dùng nhập", value: "input" },
                  ]}
                  value={typeNoTemp}
                  onChange={(e) => {
                    setTypeNoTemp(e.target.value);
                  }}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter actions={actions} />
        </div>
      </Modal>
    </Fragment>
  );
}

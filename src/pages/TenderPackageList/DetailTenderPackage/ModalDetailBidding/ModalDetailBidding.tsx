import Dialog, { IContentDialog } from "components/dialog/dialog";
import Icon from "components/icon";
import Loading from "components/loading";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import SelectCustom from "components/selectCustom/selectCustom";
import { IActionModal } from "model/OtherModel";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TenderPackageService from "services/TenderPackageService";
import { showToast } from "utils/common";
import ModalConfirmCancel from "./ModalConfirmCancel/ModalConfirmCancel";
import "./ModalDetailBidding.scss";

export default function ModalDetailBidding({ onShow, onHide, data }) {
  const navigation = useNavigate();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [detailBidding, setDetailBidding] = useState(null);
  const [isEditBidding, setIsEditBidding] = useState(false);
  const [contactList, setContactList] = useState([]);
  const [contactData, setContactData] = useState(null);

  const [isConfirmCancel, setIsConfirmCancel] = useState(false);

  const getDetailBidding = async (id) => {
    setIsLoading(true);

    const response = await TenderPackageService.detailBiddingInvitation(id);
    if (response.code === 0) {
      const result = response.result;
      const contactOrg = result?.contactOrg ? JSON.parse(result?.contactOrg) : [];
      setDetailBidding(result);
      setContactData(
        result.contactId ? { value: result.contactId, label: result.contactName, email: result.contactEmail, phone: result.contactPhone } : null
      );

      if (contactOrg && contactOrg.length > 0) {
        setContactList(
          contactOrg.map((item) => {
            return {
              value: item.id,
              label: item.name,
              email: item.email,
              phone: item.phone,
            };
          })
        );
      }
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (onShow && data) {
      getDetailBidding(data?.id);
    }
  }, [onShow, data]);

  const onSubmit = async () => {
    // e.preventDefault();

    if (!contactData?.value) {
      showToast("Người liên hệ không được để trống", "error");
      return;
    }
    setIsSubmit(true);

    const body = {
      id: data?.id,
      packageId: data?.packageId,
      organizationId: data?.organizationId,
      contactId: contactData?.value,
    };

    const response = await TenderPackageService.updateBidding(body);

    if (response.code === 0) {
      showToast(`Chỉnh sửa thông tin nhà thầu thành công`, "success");
      handleClear(true);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }

    setIsSubmit(false);
  };

  const actions = useMemo<IActionModal>(
    () => ({
      actions_right: {
        buttons: [
          ...(data?.invitationStatus !== 4
            ? [
                {
                  title: isEditBidding ? "Huỷ" : "Huỷ nhà thầu",
                  color: "primary",
                  variant: "outline",
                  disabled: isSubmit,
                  callback: () => {
                    if (isEditBidding) {
                      setIsEditBidding(false);
                    } else {
                      setIsConfirmCancel(true);
                    }
                  },
                },
              ]
            : []),

          ...(data?.checkUpdate
            ? [
                {
                  title: isEditBidding ? "Hoàn tất" : "Chỉnh sửa",
                  // type: "submit",
                  color: "primary",
                  disabled: isSubmit,
                  // || !isDifferenceObj(formData, values),
                  is_loading: isSubmit,
                  callback: () => {
                    if (isEditBidding) {
                      onSubmit();
                    } else {
                      setIsEditBidding(true);
                    }
                  },
                },
              ]
            : ([] as any)),
        ],
      },
    }),
    [isSubmit, data, isEditBidding, contactData]
  );

  const handleClear = (acc) => {
    onHide(acc);
    setIsEditBidding(false);
    setIsConfirmCancel(false);
    setContactData(null);
    setDetailBidding(null);
    setContactList([]);
  };

  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        toggle={() => !isSubmit && handleClear(false)}
        className="modal-detail-bidding"
        size="md"
      >
        <form className="form-detail-bidding">
          <ModalHeader title={isEditBidding ? `Chỉnh sửa thông tin nhà thầu` : `Thông tin nhà thầu`} toggle={() => !isSubmit && handleClear(false)} />
          <ModalBody>
            <div className="container-detail-bidding">
              {!isLoading ? (
                <div className="body-detail-bidding">
                  <div className="info-bidding">
                    <div className="box-bid">
                      <span className="title">Tên nhà thầu</span>
                      <div className="content">
                        <Icon name="Buildings" />
                        <span className="name">{detailBidding?.organizationName}</span>
                      </div>
                    </div>

                    <div className="box-bid">
                      <span className="title">Mã số thuế doanh nghiệp</span>
                      <div className="content">
                        <Icon name="Hash" />
                        <span className="name">{detailBidding?.organizationTaxCode}</span>
                      </div>
                    </div>

                    <div className="box-address">
                      <span className="title">Địa chỉ</span>
                      <div className="content">
                        <Icon name="MapPin" />
                        <span className="name">{detailBidding?.organizationAddress}</span>
                      </div>
                    </div>

                    <div style={{ border: "1px solid", borderColor: "#EEEEEF", marginTop: "1rem" }} />

                    {isEditBidding ? (
                      <div>
                        <SelectCustom
                          id="contactId"
                          name="contactId"
                          label="Tên người liên hệ"
                          fill={true}
                          options={contactList}
                          special={true}
                          value={contactData}
                          required={true}
                          onChange={(e) => {
                            setContactData(e);
                          }}
                          isAsyncPaginate={false}
                          isFormatOptionLabel={false}
                          // loadOptionsPaginate={loadedOptionSupplier}
                          placeholder="Chọn người liên hệ"
                          // additional={{
                          //   page: 1,
                          // }}
                          // formatOptionLabel={formatOptionLabel}
                        />
                      </div>
                    ) : (
                      <div className="box-address">
                        <span className="title">Tên người liên hệ</span>
                        <div className="content">
                          <Icon name="UserRed" />
                          <span className="name">{detailBidding?.contactName}</span>
                        </div>
                      </div>
                    )}

                    <div className="box-email">
                      <span className="title">Email/ Tên đăng nhập</span>
                      <div className="content">
                        <Icon name="Envelope" />
                        <span className="name">{contactData?.email}</span>
                      </div>
                    </div>

                    <div className="box-phone">
                      <span className="title">Số điện thoại</span>
                      <div className="content">
                        <Icon name="PhoneRed" />
                        <span className="name">{contactData?.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Loading />
              )}
            </div>
          </ModalBody>
          <ModalFooter actions={actions} />
        </form>
      </Modal>

      <ModalConfirmCancel
        onShow={isConfirmCancel}
        data={data}
        onHide={(reload) => {
          if (reload) {
            handleClear(true);
          }
          setIsConfirmCancel(false);
        }}
      />

      <Dialog content={contentDialog} isOpen={showDialog} />
    </Fragment>
  );
}

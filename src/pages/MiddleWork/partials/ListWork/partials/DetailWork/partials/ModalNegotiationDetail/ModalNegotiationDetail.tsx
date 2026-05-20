import React, { Fragment, useState, useEffect, useMemo, useRef, useContext } from "react";
import { IAction, IActionModal } from "model/OtherModel";
import Icon from "components/icon";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import "./ModalNegotiationDetail.scss";
import TextArea from "components/textarea/textarea";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Loading from "components/loading";
import WorkOrderService from "services/WorkOrderService";
import AttachmentComponent from "components/AttachmentComponent/AttachmentComponent";
import ConfirmModal from "./partials/ConfirmModal";
import { formatFileSize, handDownloadFileOrigin, showToast } from "utils/common";

export default function ModalNegotiationDetail({ onShow, onHide, data }) {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataWork, setDataWork] = useState(null);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isReadonlyRound, setIsReadonlyRound] = useState(false);
  const [isDisableButton, setIsDisableButton] = useState(false);

  const getDetailWork = async (worId: number) => {
    const response = await WorkOrderService.getNegotiationWork(worId);
    if (response.code === 0) {
      if (response?.result?.portalNote) {
        setIsReadonlyRound(true);
      }
      setDataWork({
        negotiationBidderDetailId: response?.result?.negotiationBidderDetailId,
        negotiationBidderId: response?.result?.negotiationBidderId,
        note: response?.result?.note || "",
        attachments: response?.result?.attachments ? JSON.parse(response?.result?.attachments) : [],
        portalNote: response?.result?.portalNote || "",
        portalAttachments: response?.result?.portalAttachments ? JSON.parse(response?.result?.portalAttachments) : [],
      });
    }
  };

  useEffect(() => {
    if (data && data?.id && data?.status) {
      getDetailWork(data?.id);
      // nếu công việc ở trạng thái hoàn thành thì không cho lưu nữa
      if (data?.status === 2) {
        setIsDisableButton(true);
      }
    }
  }, [data]);

  const handleClear = (acc) => {
    setIsConfirm(false);
    setIsSubmit(false);
    onHide();
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

  const handleDownloadAll = (listAttactment) => {
    setDownloadAll(true);
    downloadAndZipFiles(listAttactment);
  };

  const actions = useMemo<IActionModal>(
    () => ({
      actions_right: {
        buttons: [
          {
            title: "Đóng",
            color: "primary",
            variant: "outline",
            disabled: isSubmit,
            callback: () => handleClear(false),
          },
          {
            title: "Lưu",
            type: "submit",
            color: isDisableButton ? "primary" : "destroy",
            is_loading: isSubmit,
            disabled: isDisableButton,
            callback: () => {
              setIsConfirm(true);
            },
          },
        ],
      },
    }),
    [isSubmit, isDisableButton]
  );

  const onSubmit = async () => {
    const body = {
      id: dataWork?.negotiationBidderDetailId,
      negotiationBidderId: dataWork?.negotiationBidderId,
      attachments: JSON.stringify(dataWork?.attachments),
      note: dataWork?.note,
      portalAttachments: JSON.stringify(dataWork?.portalAttachments),
      portalNote: dataWork?.portalNote,
      status: "draft",
    };

    setIsSubmit(true);

    try {
      const response = await WorkOrderService.saveNegotiationWork(body);
      if (response.code === 0) {
        showToast(`Lưu công việc thành công`, "success");
      } else {
        showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      }
    } catch {
      showToast("Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    handleClear(true);
  };

  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        size="full"
        toggle={() => !isSubmit && handleClear(false)}
        className="modal-detail-negotiation"
      >
        <div className="form-detail-negotiation">
          <ModalHeader title={`Thương thảo hợp đồng mẫu`} toggle={() => !isSubmit && handleClear(false)} />
          <ModalBody>
            <div className="container-detail-negotiation-modal">
              {!isLoading ? (
                <div>
                  <div className="list-tab">
                    <div className="tab-item" style={{ backgroundColor: "#ED1B34", color: "#FFFFFF" }}>
                      <span style={{ fontSize: 14, fontWeight: "500" }}>Lần 1</span>
                    </div>
                  </div>

                  <div className="container-info-profile">
                    <div className="box-list-title">
                      <div className="header-title">
                        <span style={{ fontSize: 16, fontWeight: "500" }}>Nội dung đàm phán/ thương thảo</span>
                      </div>
                      <div className="body-profile">
                        <div className="item-profile" style={{ borderLeft: "2px solid #CE182D", backgroundColor: "#ED1B3433" }}>
                          <div className="item-title-profile">
                            <span style={{ fontSize: 14, fontWeight: "500", color: "#454B54" }}>Thương thảo hợp đồng mẫu</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="container-body">
                      <div className={"box-evaluation"}>
                        <div className="investor-body-tab_3">
                          <div style={{ margin: "1rem 0 1rem 0" }}>
                            <span style={{ fontSize: 14, fontWeight: "500" }}>{"Chủ đầu tư"}</span>
                          </div>
                          <div className="box-note">
                            <TextArea
                              name="note"
                              value={dataWork?.note}
                              label="Ghi chú"
                              fill={true}
                              onChange={(e) => {
                                const value = e.target.value;
                                setDataWork({ ...dataWork, note: value });
                              }}
                              placeholder="Nhập trả lời"
                              // disabled={true}d
                              height="100px"
                              readOnly={isReadonlyRound}
                            />
                          </div>

                          <div className="list-attachment-data">
                            <AttachmentComponent
                              disAddAttachment={isReadonlyRound}
                              listAttactment={dataWork?.attachments || []}
                              setListAttactment={(e) => {
                                setDataWork({ ...dataWork, attachments: e });
                              }}
                            />
                          </div>
                        </div>

                        {isReadonlyRound ? (
                          <div className="bidding-body-tab_3">
                            <div style={{ margin: "1rem 0 1rem 0" }}>
                              <span style={{ fontSize: 14, fontWeight: "500" }}>{"Nhà thầu"}</span>
                            </div>
                            <div className="box-note">
                              <TextArea
                                name="note"
                                value={dataWork?.portalNote}
                                label="Ghi chú"
                                fill={true}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setDataWork({ ...dataWork, portalNote: value });
                                }}
                                placeholder="Nhập trả lời"
                                // disabled={true}d
                                height="100px"
                                readOnly={isReadonlyRound}
                              />
                            </div>

                            <div className="list-attachment-data">
                              <AttachmentComponent
                                disAddAttachment={isReadonlyRound}
                                listAttactment={dataWork?.portalAttachments || []}
                                setListAttactment={(e) => {
                                  setDataWork({ ...dataWork, portalAttachments: e });
                                }}
                              />
                            </div>
                          </div>
                        ) : null}
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
        </div>
      </Modal>

      <ConfirmModal
        onSubmit={onSubmit}
        onShow={isConfirm}
        onHide={(reload) => {
          if (reload) {
            // handleClear(true);
          }
          setIsConfirm(false);
        }}
      />

      <Dialog content={contentDialog} isOpen={showDialog} />
    </Fragment>
  );
}

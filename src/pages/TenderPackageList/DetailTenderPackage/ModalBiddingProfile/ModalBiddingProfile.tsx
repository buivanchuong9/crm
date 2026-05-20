import React, { Fragment, useState, useEffect, useMemo, useRef, useContext } from "react";
import { IActionModal } from "model/OtherModel";
import Icon from "components/icon";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import { isDifferenceObj, convertToId, convertToFileName, trimContent } from "reborn-util";
import "./ModalBiddingProfile.scss";
import { formatFileSize, handDownloadFileOrigin, showToast } from "utils/common";
import Button from "components/button/button";
import { useNavigate } from "react-router-dom";
import { ContextType, UserContext } from "contexts/userContext";
import SelectCustom from "components/selectCustom/selectCustom";
import TextArea from "components/textarea/textarea";
import { uploadDocumentFormData } from "utils/document";
import ManagementAskedService from "services/ManagementAskedService";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import moment from "moment";
import Tippy from "@tippyjs/react";
import TenderPackageService from "services/TenderPackageService";
import Loading from "components/loading";
import AttachmentComponent from "components/AttachmentComponent/AttachmentComponent";
import RadioList from "components/radio/radioList";
import GridData from "./GridData";
import { dataBOQ, dataBOQ_FINACE, dataPVCV, dataTCTN } from "./TemplateGrid/TemplateGrid";

export default function ModalBiddingProfile({ onShow, onHide, data, evaluationType, dataWork, disabled, listValue, viewResult }) {
  const navigation = useNavigate();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [listRound, setListRound] = useState([]);

  const [round, setRound] = useState(1);
  const [tabDocument, setTabDocument] = useState(null);
  const [tabDocumentName, setTabDocumentName] = useState(null);
  const [roundData, setRoundData] = useState([]);

  const [itemProfile, setItemProfile] = useState(null);

  const [listAttactment, setListAttactment] = useState([]);

  const getSubmittedDocument = async (organizationId, packageId, employeeId?) => {
    setIsLoading(true);
    const params = {
      organizationId: organizationId,
      packageId: packageId,
      ...(employeeId ? { reviewerId: employeeId } : {}),
    };

    const response = await TenderPackageService.listSubmittedDocument(params);
    if (response.code === 0) {
      const result = response.result;
      const listRound = result.items || [];
      if (listRound && listRound.length > 0) {
        const newList = [];
        listRound.map((item) => {
          newList.unshift({
            round: item.submittedDocument?.round,
            data: (viewResult ? item.lstDocumentDetail.filter((el) => el.documentType !== "hstc") : item.lstDocumentDetail).map((el) => {
              const dataGrid =
                el.data &&
                JSON.parse(el.data) &&
                JSON.parse(el.data).map((il) => {
                  const itemDataGrid = il.map((ol) => {
                    return {
                      ...ol,
                      readOnly: 1,
                      disabled: true,
                    };
                  });
                  return itemDataGrid;
                });
              const dataHeader =
                el.dataHeader &&
                JSON.parse(el.dataHeader) &&
                JSON.parse(el.dataHeader).map((il) => {
                  return {
                    ...il,
                    readOnly: 1,
                    disabled: true,
                  };
                });
              return {
                id: el.id,
                attachments: (el.attachments && JSON.parse(el.attachments)) || [],
                content: el.content,
                documentName: el.documentName,
                documentId: el.documentId,
                documentType: el.documentType,

                pass: (el.evaluation && el.evaluation?.evaluationStatus?.toString()) || null,
                position: (el.evaluation && el.evaluation?.position) || null,
                noteEvaluation: el.evaluation ? el.evaluation?.note : "",
                attachmentsEvaluation: el.evaluation && el.evaluation?.attachments ? JSON.parse(el.evaluation?.attachments) : [],
                idEvaluation: el.evaluation ? el.evaluation?.id : null,
                tab:
                  evaluationType === "technical"
                    ? el.documentType === "hstc"
                      ? 2
                      : 1
                    : evaluationType === "finance" && el.documentType === "hstc"
                    ? 1
                    : 2,
                dataGrid: dataGrid,
                dataHeader: dataHeader,
                // dataHeader: el.documentType === "TCTN" ? dataTCTN
                // : el.documentType === "BoQ" ? dataBOQ
                // : el.documentType === "PVCV" ? dataPVCV
                // : el.documentType === 'hstc' ? dataBOQ_FINACE
                // : el.dataGrid ? JSON.parse(el.dataHeader)
                // : [],
                // dataGrid: item.documentType === "TCTN" ? item?.data
                //     : item.documentType === "BoQ" ? gridBoq?.dataGrid
                //     : item.documentType === "PVCV" ? gridPVCV?.dataGrid
                //     : item.dataGrid ? JSON.parse(item.dataGrid)
                //     : [],
              };
            }),
          });
        });

        setListRound(newList);
        if (newList?.length > 0) {
          setRoundData(newList[newList.length - 1].data);
          setRound(newList[newList.length - 1].round);
          setItemProfile(newList[newList.length - 1].data[0]);
          setTabDocument(newList[newList.length - 1].data[0].documentId);
          setTabDocumentName(newList[newList.length - 1].data[0].documentName);

          //Dùng để tải toàn bộ tài liệu của 1 round
          const listDataDocument = [];
          newList[newList.length - 1].data.map((el) => {
            listDataDocument.push(...el.attachments);
          });
          setListAttactment(listDataDocument);
        }
      }
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (onShow && data && !disabled) {
      getSubmittedDocument(data?.organizationId, data?.packageId);
    }
    if (onShow && data && disabled) {
      getSubmittedDocument(data?.organizationId, data?.packageId, data?.employeeId);
    }
  }, [onShow, data, viewResult]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const listEvaluated = roundData
      .filter((el) => el.documentType !== "hstc")
      .map((item) => {
        return {
          note: item.noteEvaluation,
          attachments: JSON.stringify(item.attachmentsEvaluation),
          evaluationStatus: item.pass,
          documentDetailId: item.id,
          id: item.idEvaluation,
        };
      });

    const listEvaluatedFinance = roundData
      .filter((el) => el.documentType === "hstc")
      .map((item) => {
        return {
          note: item.noteEvaluation,
          attachments: JSON.stringify(item.attachmentsEvaluation),
          position: item.position,
          documentDetailId: item.id,
          id: item.idEvaluation,
        };
      });

    if (evaluationType === "technical") {
      if (listEvaluated.filter((el) => !el.evaluationStatus).length > 0) {
        showToast("Vui lòng đánh giá toàn bộ hồ sơ", "error");
        return;
      }
    } else {
      if (listEvaluatedFinance.filter((el) => !el.position).length > 0) {
        showToast("Vui lòng đánh giá toàn bộ hồ sơ tài chính", "error");
        return;
      }
    }

    setIsSubmit(true);

    const body = {
      lstDocumentEvaluation: evaluationType === "technical" ? listEvaluated : listEvaluatedFinance,
    };

    const response = await TenderPackageService.updateBatch(body);

    if (response.code === 0) {
      showToast(`Lưu đánh giá thành công`, "success");
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
          {
            title: "Đóng",
            color: "primary",
            variant: "outline",
            disabled: isSubmit,
            callback: () => {
              handleClear(false);
            },
          },

          ...(dataWork?.status === 2 || disabled
            ? []
            : ([
                {
                  title: "Lưu",
                  type: "submit",
                  color: "primary",
                  disabled: isSubmit,
                  // || !isDifferenceObj(formData, values),
                  is_loading: isSubmit,
                  // callback: () => {}
                },
              ] as any)),
        ],
      },
    }),
    [isSubmit, data, roundData, dataWork, disabled]
  );

  const handleClear = (acc) => {
    onHide(acc);
    setListAttactment([]);
    setListRound([]);
    setRound(null);
    setRoundData([]);
    setTabDocument(null);
    setTabDocumentName(null);
    setItemProfile(null);
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

  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        size="full"
        toggle={() => !isSubmit && handleClear(false)}
        className="modal-bidding-profile"
      >
        <form className="form-bidding-profile" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader title={`Hồ sơ dự thầu`} toggle={() => !isSubmit && handleClear(false)} />
          <ModalBody>
            <div className="container-bidding-profile-modal">
              <div className="name-bidding">
                <span style={{ fontSize: 16, fontWeight: "500" }}>{data?.organizationName}</span>
              </div>
              {!isLoading ? (
                <div>
                  {listRound && listRound.length > 0 ? (
                    <div className="list-tab">
                      {listRound.map((item, index) => (
                        <div
                          key={index}
                          className="tab-item"
                          style={round === item.round ? { backgroundColor: "#ED1B34", color: "#FFFFFF" } : {}}
                          onClick={() => {
                            setRound(item.round);
                            setRoundData(item.data);
                            setTabDocument(item.data[0].documentId);
                            setTabDocumentName(item.data[0].documentName);
                            setItemProfile(item.data[0]);

                            const listDataDocument = [];
                            item.data.map((el) => {
                              listDataDocument.push(...el.attachments);
                            });
                            setListAttactment(listDataDocument);
                          }}
                        >
                          <span style={{ fontSize: 14, fontWeight: "500" }}>Lần {item.round}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <div className="container-info-profile">
                    <div className="box-list-title">
                      <div className="header-title">
                        <span style={{ fontSize: 16, fontWeight: "500" }}>Hồ sơ dự thầu</span>
                        <div
                          className="button-download-all"
                          onClick={() => {
                            handleDownloadAll(listAttactment);
                          }}
                        >
                          <Icon name="DownLoadNew" />
                          Tải xuống tất cả
                        </div>
                      </div>

                      {roundData && roundData.length > 0 ? (
                        <div className="body-profile">
                          {/* Hồ sơ kỹ thuật */}
                          <div className="document-type">
                            <span style={{ fontSize: 14, fontWeight: "400", color: "#939394" }}>Hồ sơ kỹ thuật</span>
                          </div>
                          {roundData.map((item, index) =>
                            item.documentType !== "hstc" ? (
                              <div
                                key={index}
                                className="item-profile"
                                style={tabDocument === item.documentId ? { borderLeft: "2px solid #CE182D", backgroundColor: "#ED1B3433" } : {}}
                                onClick={() => {
                                  setItemProfile(item);
                                  setTabDocument(item.documentId);
                                  setTabDocumentName(item.documentName);
                                }}
                              >
                                <div style={{ width: "92%", display: "flex" }}>
                                  {evaluationType === "technical" ? (
                                    item.pass === "1" ? (
                                      <Icon name="Checkbox" style={{ marginTop: 3, marginRight: 10 }} />
                                    ) : item.pass === "2" ? (
                                      <Icon name="NotPass" style={{ marginTop: 3, marginRight: 10 }} />
                                    ) : null
                                  ) : null}
                                  <span style={{ fontSize: 14, fontWeight: "500", color: "#454B54" }}>{item.documentName}</span>
                                </div>
                                {/* <Tippy content='Tải xuống'>
                                                        <div 
                                                            className="icon-download"
                                                            onClick={() => {
                                                                handleDownloadAll(item?.attachments);
                                                            }}
                                                        >
                                                            <Icon name='Download'/>
                                                        </div>
                                                    </Tippy> */}
                              </div>
                            ) : null
                          )}

                          {/* Hồ sơ tài chính */}
                          {roundData.filter((el) => el.documentType === "hstc").length > 0 ? (
                            <div className="document-type">
                              <span style={{ fontSize: 14, fontWeight: "400", color: "#939394" }}>Hồ sơ tài chính</span>
                            </div>
                          ) : null}
                          {roundData.map((item, index) =>
                            item.documentType === "hstc" ? (
                              <div
                                key={index}
                                className="item-profile"
                                style={tabDocument === item.documentId ? { borderLeft: "2px solid #CE182D", backgroundColor: "#ED1B3433" } : {}}
                                onClick={() => {
                                  setItemProfile(item);
                                  setTabDocument(item.documentId);
                                  setTabDocumentName(item.documentName);
                                }}
                              >
                                <div style={{ width: "92%", display: "flex" }}>
                                  {evaluationType === "technical" ? (
                                    item.pass === "1" ? (
                                      <Icon name="Checkbox" style={{ marginTop: 3, marginRight: 10 }} />
                                    ) : item.pass === "2" ? (
                                      <Icon name="NotPass" style={{ marginTop: 3, marginRight: 10 }} />
                                    ) : null
                                  ) : null}
                                  <span style={{ fontSize: 14, fontWeight: "500", color: "#454B54" }}>{item.documentName}</span>
                                </div>
                              </div>
                            ) : null
                          )}
                        </div>
                      ) : null}
                    </div>

                    <div className="container-body">
                      <div style={{ display: "flex" }}>
                        <div className="container-button-header">
                          {evaluationType === "technical" && itemProfile?.documentType !== "hstc" ? (
                            <div
                              className={itemProfile?.tab === 2 ? "style-list-button-inactive" : "style-list-button-active"}
                              onClick={() => {
                                setItemProfile({ ...itemProfile, tab: 1 });
                                let newArr = [...listRound];
                                const index = listRound.findIndex((el) => el.round === round);
                                if (index !== -1) {
                                  let newDataRound = [...newArr[index].data];
                                  const indexDataRount = newArr[index].data.findIndex((el) => el.documentId === itemProfile.documentId);
                                  if (indexDataRount !== -1) {
                                    newDataRound[indexDataRount].tab = 1;
                                  }
                                }
                                setListRound(newArr);
                              }}
                            >
                              <span className="title">Đánh giá</span>
                            </div>
                          ) : null}

                          {evaluationType === "finance" && itemProfile?.documentType === "hstc" ? (
                            <div
                              className={itemProfile?.tab === 2 ? "style-list-button-inactive" : "style-list-button-active"}
                              onClick={() => {
                                setItemProfile({ ...itemProfile, tab: 1 });
                                let newArr = [...listRound];
                                const index = listRound.findIndex((el) => el.round === round);
                                if (index !== -1) {
                                  let newDataRound = [...newArr[index].data];
                                  const indexDataRount = newArr[index].data.findIndex((el) => el.documentId === itemProfile.documentId);
                                  if (indexDataRount !== -1) {
                                    newDataRound[indexDataRount].tab = 1;
                                  }
                                }
                                setListRound(newArr);
                              }}
                            >
                              <span className="title">Đánh giá</span>
                            </div>
                          ) : null}

                          <div
                            className={itemProfile?.tab === 2 ? "style-list-button-active" : "style-list-button-inactive"}
                            onClick={() => {
                              setItemProfile({ ...itemProfile, tab: 2 });

                              let newArr = [...listRound];
                              const index = listRound.findIndex((el) => el.round === round);
                              if (index !== -1) {
                                let newDataRound = [...newArr[index].data];
                                const indexDataRount = newArr[index].data.findIndex((el) => el.documentId === itemProfile.documentId);
                                if (indexDataRount !== -1) {
                                  newDataRound[indexDataRount].tab = 2;
                                }
                              }
                              setListRound(newArr);
                            }}
                          >
                            <span className="title">Thông tin hồ sơ</span>
                          </div>
                        </div>
                      </div>

                      {/* {itemProfile?.tab === 2 ?  */}
                      <div className={itemProfile?.tab === 2 ? "box-content" : "d-none"}>
                        <div style={{ marginBottom: "1rem" }}>
                          <span style={{ fontSize: 16, fontWeight: "500" }}>{tabDocumentName}</span>
                        </div>

                        {!isLoading &&
                        (itemProfile?.documentType === "TCTN" ||
                          itemProfile?.documentType === "BoQ" ||
                          itemProfile?.documentType === "PVCV" ||
                          itemProfile?.documentType === "hstc") &&
                        itemProfile.dataHeader.length > 0 ? (
                          <div className="table-content">
                            <GridData dataGrid={itemProfile?.dataGrid} dataHeader={itemProfile?.dataHeader} onHide={onHide} />
                          </div>
                        ) : null}

                        <div className="content-body">
                          <div className="box-note">
                            <TextArea
                              name="note"
                              value={itemProfile?.content}
                              label="Ghi chú"
                              fill={true}
                              onChange={(e) => {
                                // const value = e.target.value;
                                // setContent(value);
                              }}
                              placeholder="Nhập trả lời"
                              disabled={true}
                              height="100px"
                            />
                          </div>
                          <div className="list-attachment">
                            <div>
                              <span style={{ fontSize: 14, fontWeight: "500" }}>Tệp đính kèm</span>
                            </div>
                            {itemProfile?.attachments && itemProfile?.attachments.length > 0
                              ? itemProfile?.attachments.map((item, index) => (
                                  <div
                                    key={index}
                                    className="item-attachment"
                                    onDoubleClick={() => {
                                      if (item?.type !== "image") {
                                        window.open(
                                          `${process.env.APP_LINK}/app/view_document?name=${item.fileName}&url=${item.fileUrl}`,
                                          "_blank",
                                          "noopener,noreferrer"
                                        );
                                      }
                                    }}
                                  >
                                    {item?.type == "image" ? <img src={item?.fileUrl} width={36} height={36} /> : <Icon name="FileXls" />}
                                    <div className="data-file">
                                      <span style={{ fontSize: 14, fontWeight: "500" }}>
                                        {item?.fileName ? trimContent(item?.fileName, 50, true, true) : ``}
                                        {item?.fileName?.length > 50 ? `.${item?.type}` : ""}
                                      </span>
                                      <div>
                                        <span style={{ fontSize: 12, fontWeight: "400", color: "#999999" }}>
                                          {item?.fileSize ? item?.fileSize : ``}
                                        </span>
                                      </div>
                                    </div>

                                    <div
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        handDownloadFileOrigin(item.fileUrl, item.fileName);
                                      }}
                                    >
                                      <Icon name="DownLoadNew" style={{ width: "2rem", height: "2rem" }} />
                                    </div>
                                  </div>
                                ))
                              : null}
                          </div>
                        </div>
                      </div>
                      {/* : null} */}

                      {/* <div style={{border: '1px solid #EEEEEF'}}/> */}

                      {/* {itemProfile?.tab === 1 ?  */}
                      <div className={itemProfile?.tab === 1 ? "box-evaluation" : "d-none"}>
                        {/* <div style={{marginBottom: '1rem'}}>
                                            <span style={{fontSize: 16, fontWeight: '500'}}>Đánh giá</span>
                                        </div> */}

                        {evaluationType === "technical" ? (
                          <div style={{ marginBottom: "1rem" }}>
                            <RadioList
                              options={[
                                {
                                  value: "1",
                                  label: "Đạt",
                                },
                                {
                                  value: "2",
                                  label: "Không đạt",
                                },
                              ]}
                              // className="options-auth"
                              required={true}
                              disabled={disabled}
                              title="Xác nhận đủ điều kiện"
                              name=""
                              value={itemProfile?.pass}
                              onChange={(e) => {
                                setItemProfile({ ...itemProfile, pass: e.target.value });

                                let newArr = [...listRound];
                                const index = listRound.findIndex((el) => el.round === round);
                                if (index !== -1) {
                                  let newDataRound = [...newArr[index].data];
                                  const indexDataRount = newArr[index].data.findIndex((el) => el.documentId === itemProfile.documentId);
                                  if (indexDataRount !== -1) {
                                    newDataRound[indexDataRount].pass = e.target.value;
                                  }
                                }
                                setListRound(newArr);
                              }}
                            />
                          </div>
                        ) : null}

                        {evaluationType === "finance" ? (
                          <div style={{ marginBottom: "1rem", width: "30%" }}>
                            <SelectCustom
                              id=""
                              name=""
                              label={"Sắp xếp thứ tự"}
                              fill={true}
                              required={true}
                              special={true}
                              options={listValue}
                              value={itemProfile?.position ? { value: itemProfile?.position, label: `Số ${itemProfile?.position}` } : null}
                              onChange={(e) => {
                                setItemProfile({ ...itemProfile, position: e.value });
                                let newArr = [...listRound];
                                const index = listRound.findIndex((el) => el.round === round);
                                if (index !== -1) {
                                  let newDataRound = [...newArr[index].data];
                                  const indexDataRound = newArr[index].data.findIndex((el) => el.documentId === itemProfile.documentId);
                                  if (indexDataRound !== -1) {
                                    newDataRound[indexDataRound].position = e.value;
                                  }
                                }
                                setListRound(newArr);
                              }}
                              isAsyncPaginate={false}
                              placeholder=""
                              // additional={{
                              //   page: 1,
                              // }}
                              // loadOptionsPaginate={loadOptionBranch}
                            />
                          </div>
                        ) : null}

                        <div className="evaluation-body">
                          <div className="box-note">
                            <TextArea
                              name="note"
                              value={itemProfile?.noteEvaluation}
                              label="Ghi chú"
                              fill={true}
                              disabled={disabled}
                              onChange={(e) => {
                                const value = e.target.value;
                                setItemProfile({ ...itemProfile, noteEvaluation: value });

                                let newArr = [...listRound];
                                const index = listRound.findIndex((el) => el.round === round);
                                if (index !== -1) {
                                  let newDataRound = [...newArr[index].data];
                                  const indexDataRound = newArr[index].data.findIndex((el) => el.documentId === itemProfile.documentId);
                                  if (indexDataRound !== -1) {
                                    newDataRound[indexDataRound].noteEvaluation = value;
                                  }
                                }
                                setListRound(newArr);
                              }}
                              placeholder="Nhập trả lời"
                              // disabled={true}d
                              height="100px"
                            />
                          </div>

                          <div className="list-attachment-data">
                            <AttachmentComponent
                              disAddAttachment={disabled}
                              listAttactment={itemProfile?.attachmentsEvaluation || []}
                              setListAttactment={(e) => {
                                setItemProfile({ ...itemProfile, attachmentsEvaluation: e });

                                let newArr = [...listRound];
                                const index = listRound.findIndex((el) => el.round === round);
                                if (index !== -1) {
                                  let newDataRound = [...newArr[index].data];
                                  const indexDataRound = newArr[index].data.findIndex((el) => el.documentId === itemProfile.documentId);
                                  if (indexDataRound !== -1) {
                                    newDataRound[indexDataRound].attachmentsEvaluation = e;
                                  }
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      {/* : null} */}
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

      <Dialog content={contentDialog} isOpen={showDialog} />
    </Fragment>
  );
}

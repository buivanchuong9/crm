import React, { Fragment, useState, useEffect, useMemo, useRef, useContext } from "react";
import { IActionModal } from "model/OtherModel";
import Icon from "components/icon";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import "./DetailNegotiationModal.scss";
import { showToast } from "utils/common";
import { useNavigate } from "react-router-dom";
import TextArea from "components/textarea/textarea";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import Loading from "components/loading";
import AttachmentComponent from "components/AttachmentComponent/AttachmentComponent";
import GridData from "./GridData";
import { dataBOQ, dataBOQ_FINACE, data_Commercial_Terms} from "./TemplateGrid/TemplateGrid";
import ModalWorkAssignment from "./ModalWorkAssignment/ModalWorkAssignment";
import SelectCustom from "components/selectCustom/selectCustom";
import ImageThirdGender from "assets/images/third-gender.png";
import NegotiationService from "services/NegotiationService";
import EmployeeService from "services/EmployeeService";

export default function DetailNegotiationModal({ onShow, onHide, data, dataWorkAssignment, packageId, listRoundData}) {
    console.log("listRoundData: ", listRoundData);
    console.log("dataWorkAssignment: ", dataWorkAssignment);
    
    const navigation = useNavigate();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const [listRound, setListRound] = useState([]);

    const [showWorkAssignment, setShowWorkAssignment] = useState<boolean>(false);
    const [assignee, setAssignee] = useState(null);
      
    const [round, setRound] = useState(1);
    const [tabDocument, setTabDocument] = useState(null);
    const [tabDocumentName, setTabDocumentName] = useState(null);
    const [dataWork, setDataWork] = useState(null);
    const [negotiationBidderId, setNegotiationBidderId] = useState(null);
    

    const initialRoundData = [
        {
          id: '',
          documentId: 1,
          documentName: 'Đàm phán giá',
          note: '',
          attachments: '',
          data: [],
          dataHeader: dataBOQ_FINACE,
          type: 'DPG',
          portalNote: '',
          portalAttachments: [],
          employeeId: ''
        },
        {
          id: '',
          documentId: 2,
          documentName: 'Điều khoản thương mại',
          note: '',
          attachments: '',
          data: [],
          dataHeader: data_Commercial_Terms,
          type: 'DKTM',
          portalNote: '',
          portalAttachments: [],
          employeeId: ''
        },
        {
          id: '',
          documentId: 3,
          documentName: 'Thương thảo hợp đồng mẫu',
          note: '',
          attachments: '',
          data: [],
          dataHeader: [],
          type: 'TTHDM',
          portalNote: '',
          portalAttachments: [],
          employeeId: ''
        }
    ];

    const [roundData, setRoundData] = useState([...initialRoundData]);
      
    const [itemProfile, setItemProfile] = useState(null);
    
    const [listAttactment, setListAttactment] = useState([]);
    const [isReadonlyRound, setIsReadonlyRound] = useState(false);

    const mapNegotiationBidderDetailsToRoundData = (details = []) => {
        const base = [...initialRoundData];
      
        details.forEach(item => {
          const idx = base.findIndex(d => d.type === item.type);
          if (idx !== -1) {
            base[idx] = {
              ...base[idx],
              id: item.id,
              note: item.note || '',
              attachments: item.attachments ? JSON.parse(item.attachments) : [],
              data: item.data ? JSON.parse(item.data) : [],
              dataHeader: (item.dataHeader && item.dataHeader !== "[]") ? JSON.parse(item.dataHeader) : base[idx].dataHeader,
              portalNote: item.portalNote || '',
              portalAttachments: item.portalAttachments ? JSON.parse(item.portalAttachments) : [],
              employeeId: item.employeeId,
            };
          }
        });
      
        return base;
    };

    const fetchData = async () => {
        const orgId = data.organizationId;
  
        const filteredRounds = listRoundData.filter(item =>
          item.bidders.some(b => b.organizationId === orgId)
        );
  
        const numberedRounds = filteredRounds.map((item, index) => ({
          ...item,
          displayOrder: index + 1
        }));
  
        const roundsWithData = await Promise.all(
          numberedRounds.map(async (item) => {
            const bidder = item.bidders.find(b => b.organizationId === orgId);
            
            let dataDocuments = [...initialRoundData];
  
            if (bidder?.negotiationBidderDetails) {
              dataDocuments = mapNegotiationBidderDetailsToRoundData(bidder.negotiationBidderDetails);
            } else if (bidder?.submittedDocumentId) {
              const res = await NegotiationService.detail({
                organizationId: orgId,
                packageId,
                submittedDocumentId: bidder.submittedDocumentId,
              });
              if (res.code === 0) {
                console.log("res:", res);
                
                dataDocuments = mapNegotiationBidderDetailsToRoundData(res.result?.negotiationBidderDetails || []);
              }
            }
  
            return {
              round: item.round,
              displayOrder: item.displayOrder,
              data: dataDocuments,
              negotiationId: item.negotiationId,
            };
          })
        );
  
        setListRound(roundsWithData);
        
  
        if (roundsWithData.length > 0) {
          const first = roundsWithData[0];
          setRound(first.round);
          setRoundData(first.data);
          setItemProfile(first.data[0]);
          setTabDocument(first.data[0].documentId);
          setTabDocumentName(first.data[0].documentName);
          setIsReadonlyRound(first.negotiationId !== 0); 
        }
    };

    useEffect(() => {
        if (onShow && data && listRoundData?.length > 0) {
          fetchData();
        }
    }, [onShow, data, listRoundData]);


    const getAssignEmployee = async (eId: number) => {
      const response = await EmployeeService.getByEmployeeId(eId);

      if (response.code === 0) {
        console.log("responseresponseresponse: ", response)
        setAssignee({
          id: response?.result?.id,
          name: response?.result?.name,
          avatar: response?.result?.avatar,
        });
      }
    };

    useEffect(() => {
      if (itemProfile) {
        console.log("itemProfile: ", itemProfile)
      }
      if (itemProfile && itemProfile?.employeeId) {
        getAssignEmployee(itemProfile?.employeeId);
      }
    }, [itemProfile]);
      

    const onSubmit = async (e) => {
        e.preventDefault();
        
        const details = roundData.map(item =>
            Object.keys(item).reduce((acc, key) => {
            const value = item[key];
            acc[key] = Array.isArray(value) ? JSON.stringify(value) : value;
            return acc;
            }, {})
        );

        const body = {
            id: negotiationBidderId,
            organizationId: dataWorkAssignment?.organizationId,
            packageId: dataWorkAssignment?.packageId,
            roundEvaluation: dataWorkAssignment?.roundEvaluation,
            details: details
        }
        console.log("kết qua: body: ", body);

        setIsSubmit(true);
        const response = await NegotiationService.saveOrUpdate(body);

        if (response.code === 0) {
            showToast(`Lưu đánh giá thành công`, "success");

            const onHideData = {
                reload: true,
                negotiationId: 0, // mặc định nếu chưa xác nhận thì bằng 0
                organizationId: dataWorkAssignment?.organizationId,
                negotiationBidderId: response?.result?.id,
                negotiationBidderDetails: response?.result?.details,
            };
            handleClear(onHideData);
        } else {
            showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
        }    
        setIsSubmit(false);
    }

    const handleClear = (acc) => {
        onHide(acc);
        setListAttactment([]);
        setListRound([]);
        setRound(null);
        setRoundData([...initialRoundData]);
        setTabDocument(null);
        setTabDocumentName(null);
        setItemProfile(null);
        setAssignee(null);
    }

  const formatOptionLabelEmployee = ({ label, avatar }) => (
    <div className="selected--item">
      <div className="avatar"><img src={avatar || ImageThirdGender} alt={label} /></div>
      {label}
    </div>
  );

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

  const handleAssignClick = () => {
    const doc3 = listRound
      .find(r => r.round === round)
      ?.data.find(d => d.documentId === 3);
  
    setDataWork({
      potId: dataWorkAssignment?.potId,
      managerId: dataWorkAssignment?.managerId,
      packageId: dataWorkAssignment?.packageId,
      organizationId: dataWorkAssignment?.organizationId,
      roundEvaluation: dataWorkAssignment?.roundEvaluation,
      negotiationId: dataWorkAssignment?.negotiationId,
      note: doc3?.note,     
      attachments: doc3?.attachments,
    });
  
    setShowWorkAssignment(true);
  };

  const isItemCompleted = (item) => {
    return !!(item.id ||
             (item.data && item.data.length > 0) || 
             (item.note && item.note.trim() !== "") || 
             (item.attachments && item.attachments.length > 0));
  };
  
  const isAllTabCompleted = () => {
    return roundData.every(item => isItemCompleted(item));
  };

  const actions = useMemo<IActionModal>(() => ({

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
          color: (!isAllTabCompleted() || isReadonlyRound) ? "secondary" : "destroy",
          disabled: !isAllTabCompleted() || isReadonlyRound,
          is_loading: isSubmit,
        }
      ],
    },
  }), [isSubmit, isAllTabCompleted(), isReadonlyRound]);
  

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
        <form className="form-detail-negotiation" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader title={`Đàm phán/ Thương thảo`} toggle={() => !isSubmit && handleClear(false)} />
          <ModalBody>
            <div className='container-detail-negotiation-modal'>
                <div className="name-bidding">
                    <span style={{fontSize: 16, fontWeight: '500'}}>{data?.organizationName}</span>
                </div>
                {!isLoading ? 
                    <div>
                        {listRound && listRound.length > 0 ? 
                            <div className="list-tab">
                                {listRound.map((item, index) => (
                                    <div key={index} 
                                        className="tab-item"
                                        style={round === item.round ? {backgroundColor: '#ED1B34', color: '#FFFFFF'} : {}}
                                        onClick={() => {
                                            setRound(item.round);
                                            setRoundData(item.data);
                                            setTabDocument(item.data[0].documentId);
                                            setTabDocumentName(item.data[0].documentName);
                                            setItemProfile(item.data[0]);

                                            const listDataDocument = [];
                                            item.data.map(el => {
                                                listDataDocument.push(...el.attachments);
                                            });
                                            setListAttactment(listDataDocument)
                                            
                                            setIsReadonlyRound(item.negotiationId !== 0); 
                                        }}
                                    >
                                        <span style={{fontSize: 14, fontWeight: '500'}}>Lần {item.displayOrder}</span>
                                    </div>
                                ))}
                                
                            </div>
                        : null}

                        <div className="container-info-profile">
                            <div className="box-list-title">
                                <div className="header-title">
                                    <span style={{fontSize: 16, fontWeight: '500'}}>Nội dung đàm phán/ thương thảo</span>
                                </div>

                                {roundData && roundData.length > 0 ? 
                                    <div className="body-profile">
                                        {roundData.map((item, index) => (
                                            <div key={index}
                                                className="item-profile"
                                                style={tabDocument === item.documentId ? {borderLeft: '2px solid #CE182D', backgroundColor: '#ED1B3433'} : {}}
                                                onClick={() => {
                                                    setItemProfile(item);
                                                    setTabDocument(item.documentId);
                                                    setTabDocumentName(item.documentName);
                                                }}
                                            >
                                                <div className="item-title-profile">
                                                    {isItemCompleted(item) && !isReadonlyRound && (
                                                        <Icon name='Checkbox' style={{marginTop: 3, marginRight: 10}}/>
                                                    )}
                                                    <span style={{fontSize: 14, fontWeight: '500', color: '#454B54'}}>{item.documentName}</span>
                                                </div>
                                            </div>
                                        ))}
                                        
                                    </div>
                                : null}
                            </div>

                            <div className="container-body">
                                <div className={"box-content"}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                        <span style={{fontSize: 16, fontWeight: '500'}}>{tabDocumentName}</span>
                                        {tabDocument === 3 && (
                                            <button
                                                type="button"
                                                onClick={handleAssignClick}
                                                disabled={!!assignee || isReadonlyRound}
                                                style={{
                                                padding: "6px 12px",
                                                fontSize: 14,
                                                fontWeight: 500,
                                                backgroundColor: (!!assignee || isReadonlyRound) ? "#ccc" : "#ED1B34",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: 6,
                                                cursor: (!!assignee || isReadonlyRound) ? "not-allowed" : "pointer",
                                                }}
                                            >
                                                Phân công công việc
                                            </button>
                                        )}
                                    </div>

                                    {!isLoading && (itemProfile?.documentId === 1 || itemProfile?.documentId === 2 ) ? 
                                        <div className="table-content">
                                            <GridData
                                                dataGrid={itemProfile?.data}
                                                dataHeader={itemProfile?.dataHeader}
                                                onHide={onHide}
                                                onChange={(dataRow) => {
                                                    let newDataRow = dataRow;
                                                    
                                                    if (newDataRow && newDataRow.length > 0) {
                                                        setRoundData(prev => prev.map(el => {
                                                            if (el.documentId === itemProfile.documentId) {
                                                              return {
                                                                ...el,
                                                                data: newDataRow,
                                                              };
                                                            }
                                                            return el;
                                                        }));
                                                          
                                                        setItemProfile(prev => ({
                                                            ...prev,
                                                            data: newDataRow
                                                        }));
                                                    }
                                                    
                                                    
                                                }}
                                            />
                                        </div>
                                    : null}

                                </div>

                                <div className={"box-evaluation"}>
                                    <div className="investor-body-tab_3" >
                                        {isReadonlyRound ? 
                                            <div style={{margin: '1rem 0 1rem 0'}}>
                                                <span style={{fontSize: 14, fontWeight: '500'}}>{'Chủ đầu tư'}</span>
                                            </div>
                                        : null}
                                        {tabDocument === 3 && assignee && (
                                        <div style={{ marginBottom: '1rem' }}>
                                            <SelectCustom
                                                id="assigneeId"
                                                name="Người nhận việc"
                                                value={
                                                    {
                                                        value: assignee.id,
                                                        label: assignee.name,
                                                        avatar: assignee.avatar,
                                                    }
                                                }
                                                readOnly={true}
                                                disabled={true}
                                                options={[]}
                                                placeholder="Người nhận việc"
                                                fill={true}
                                                additional={{ page: 1 }}
                                                isAsyncPaginate={true}
                                                isFormatOptionLabel={true}
                                                formatOptionLabel={formatOptionLabelEmployee}
                                            />
                                        </div>
                                        )}
                                        
                                        <div className="box-note">
                                            <TextArea
                                                name="note"
                                                value={itemProfile?.note}
                                                label="Ghi chú"
                                                fill={true}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setItemProfile({...itemProfile, note: value});

                                                    setRoundData(prev => prev.map(el => {
                                                        if (el.documentId === itemProfile.documentId) {
                                                          return {...el, note: value};
                                                        }
                                                        return el;
                                                    }));

                                                }}
                                                placeholder="Nhập trả lời"
                                                // disabled={true}d
                                                height='100px'
                                                readOnly={isReadonlyRound}
                                            />
                                        </div>

                                        <div className="list-attachment-data">
                                            <AttachmentComponent
                                                disAddAttachment={isReadonlyRound}
                                                listAttactment={itemProfile?.attachments || []}
                                                setListAttactment={(e) => {
                                                    setItemProfile({...itemProfile, attachments: e});

                                                    setRoundData(prev => prev.map(el => {
                                                        if (el.documentId === itemProfile.documentId) {
                                                          return {...el, attachments: e};
                                                        }
                                                        return el;
                                                    }));

                                                }}
                                            />
                                        </div>
                                    </div>

                                    {isReadonlyRound ? 
                                        <div className="bidding-body-tab_3">
                                            <div style={{margin: '1rem 0 1rem 0'}}>
                                                <span style={{fontSize: 14, fontWeight: '500'}}>{'Nhà thầu'}</span>
                                            </div>
                                            <div className="box-note">
                                                <TextArea
                                                    name="note"
                                                    value={itemProfile?.portalNote}
                                                    label="Ghi chú"
                                                    fill={true}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        setItemProfile({...itemProfile, portalNote: value});

                                                        setRoundData(prev => prev.map(el => {
                                                            if (el.documentId === itemProfile.documentId) {
                                                            return {...el, portalNote: value};
                                                            }
                                                            return el;
                                                        }));

                                                    }}
                                                    placeholder="Nhập trả lời"
                                                    // disabled={true}d
                                                    height='100px'
                                                    readOnly={isReadonlyRound}
                                                />
                                            </div>

                                            <div className="list-attachment-data">
                                                <AttachmentComponent
                                                    disAddAttachment={isReadonlyRound}
                                                    listAttactment={itemProfile?.portalAttachments || []}
                                                    setListAttactment={(e) => {
                                                        setItemProfile({...itemProfile, portalAttachments: e});

                                                        setRoundData(prev => prev.map(el => {
                                                            if (el.documentId === itemProfile.documentId) {
                                                            return {...el, portalAttachments: e};
                                                            }
                                                            return el;
                                                        }));

                                                    }}
                                                />
                                            </div>
                                        </div>
                                    : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    : <Loading/>
                }

            </div>
          </ModalBody>
          <ModalFooter actions={actions} />
        </form>
    </Modal>

    <ModalWorkAssignment
        onShow={showWorkAssignment}
        onHide={(responseData) => {
            setShowWorkAssignment(false); 
            console.log("responseData:", responseData);
            if (responseData) {

            setAssignee({
                id: responseData?.employee?.id,
                name: responseData?.employee?.name,
                avatar: responseData?.employee?.avatar,
                negotiationBidderDetailId: responseData.negotiationBidderDetailId,
                negotiationBidderId: responseData.negotiationBidderId,
            });
            setNegotiationBidderId(responseData.negotiationBidderId);

            setItemProfile((prev) => {
                if (prev && prev.documentId === 3) {
                    return { 
                        ...prev, 
                        employeeId: responseData.employeeId,
                        id: responseData.negotiationBidderDetailId,
                        negotiationBidderId: responseData.negotiationBidderId
                    };
                }
                return prev;
            });

            setRoundData((prev) => 
                prev.map(item => 
                item.documentId === 3 
                ? { 
                    ...item, 
                    employeeId: responseData.employeeId,
                    id: responseData.negotiationBidderDetailId,
                    negotiationBidderId: responseData.negotiationBidderId
                    }
                : item
                )
            );
            }
        }}
        data={dataWork}
    />

    
    <Dialog content={contentDialog} isOpen={showDialog} />
      
    </Fragment>
  );
}

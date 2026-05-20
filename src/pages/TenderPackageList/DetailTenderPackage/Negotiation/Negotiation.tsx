import React, { Fragment, memo, useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";
import Icon from "components/icon";
import Loading from "components/loading";
import { handDownloadFileOrigin, showToast } from "utils/common";
import "./Negotiation.scss";
import { saveAs } from "file-saver";
import Badge from "components/badge/badge";
import TenderPackageService from "services/TenderPackageService";
import { IAction } from "model/OtherModel";
import ButtonComponent from "components/ButtonComponent/ButtonComponent";
import { BulkActionItemModel } from "components/bulkAction/bulkAction";
import { getPageOffset } from "reborn-util";
import { DataPaginationDefault, PaginationProps } from "components/pagination/pagination";
import BoxTableNegotiation from "./BoxTableNegotiation/BoxTableNegotiation";
import ConfirmCreateModal from "./ConfirmCreateModal/ConfirmCreateModal";
import DetailNegotiationModal from "./DetailNegotiationModal/DetailNegotiationModal";
import CountDown from "components/CountDown/CountDown";
import NegotiationService from "services/NegotiationService";

const Negotiation = (props: any) => {
  const { detailTenderPackage, employeeId } = props;

  const [dataBidding, setDataBidding] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [listIdChecked, setListIdChecked] = useState<number[]>([]);
  const [isConfirmCreate, setIsConfirmCreate] = useState(false);
  const [status, setStatus] = useState(0);
  const [modalDetailNegotiaTion, setModalDetailNegotiation] = useState(false);
  const [dataWorkAssignment, setDataWorkAssignment] = useState(null);
  const [negotiationRequestBody, setNegotiationRequestBody] = useState({
    round: 0,
    packageId: 0,
    negotiationBidderIds: [],
    packageName: '',
    projectName: '',
    projectId: ''
  });


  const [listRound, setListRound] = useState<{
    round: number;
    negotiationId: number;
    bidders: any[];
  }[]>([]);
  const [currentRound, setCurrentRound] = useState<number | null>(null);

  const [listBidding, setListBidding] = useState([]);
  const [closedDate, setClosedDate] = useState(null);

  useEffect(() => {
    if (detailTenderPackage?.id) {
      loadNegotiationData(detailTenderPackage.id);
    }
  }, [detailTenderPackage]);
  

  const [params, setParams] = useState<any>({
    name: "",
    limit: 100,
    page: 1,
  });

  const [pagination, setPagination] = useState<PaginationProps>({
    ...DataPaginationDefault,
    name: "nhà thầu",
    isChooseSizeLimit: true,
    setPage: (page) => {
      setParams((prevParams) => ({ ...prevParams, page: page }));
    },
    chooseSizeLimit: (limit) => {
      setParams((prevParams) => ({ ...prevParams, limit: limit }));
    },
  });

  const [isShowNegotiationRound, setIsShowNegotiationRound] = useState(false);;

  const loadNegotiationData = async (packageId: number) => {
    setIsLoading(true);

    try {
      const response = await NegotiationService.listByRound({ packageId });

      if (response.code === 0 && Array.isArray(response.result) && response.result.length > 0) {
        const rounds = response.result.map((item) => ({
          round: item.round,
          negotiationId: item.id,
          bidders: item.bidders,
        }));

        setListRound(rounds);
        const latestRound = rounds[rounds.length - 1];
        setCurrentRound(latestRound.round);
        setListBidding(latestRound.bidders || []);
        setStatus(1);
        setIsShowNegotiationRound(true);
      } else {
        const passedRes = await NegotiationService.listOrganizationsPassed({ packageId });

        if (passedRes.code === 0 && Array.isArray(passedRes.result)) {
          const fallbackRound = {
            round: 1,
            negotiationId: 0,
            bidders: passedRes.result,
          };
      
          setListRound([fallbackRound]);
          setCurrentRound(1);
          setListBidding(passedRes.result);
          setStatus(0);
        } else {
          showToast(passedRes.message || "Không lấy được danh sách nhà thầu đã qua", "error");
        }
      }
    } catch (err) {
      showToast("Lỗi trong quá trình tải dữ liệu đàm phán", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNewRound = async () => {
    if (!detailTenderPackage?.id) return;
    setIsLoading(true);
    try {
      const res = await NegotiationService.listOrganizationsPassed({ packageId: detailTenderPackage.id });
      if (res.code === 0 && Array.isArray(res.result)) {
        const maxRound = listRound.reduce((acc, cur) => Math.max(acc, cur.round), 0);
        const nextRoundNumber = maxRound + 1;
        setListRound(prev => [
          ...prev,
          {
            round: nextRoundNumber,
            negotiationId: 0,
            bidders: res.result,
          },
        ]);
        setListBidding(res.result);
        setCurrentRound(nextRoundNumber);
        setStatus(0);
        setListIdChecked([]);
      } else {
        showToast(res.message || "Không lấy được danh sách nhà thầu", "error");
      }
    } catch (err) {
      showToast("Lỗi khi thêm vòng đàm phán", "error");
    } finally {
      setIsLoading(false);
    }
  };
  

  const titles = [
    "Nhà thầu",
    "Vòng đàm phán",
    "Cập nhật lần cuối",
    ...(status === 1 ? ['Trạng thái'] : [])
  ];

  const dataFormat = ["", "", "", 'text-center'];

  const dataMappingArray = (item: any, index: number, type?: string) => [   
    // getPageOffset(params) + index + 1,
    <div className="bidding-name"
        onClick={() => {
            setDataBidding(item);
            setDataWorkAssignment({
                potId: detailTenderPackage?.potId,
                managerId: employeeId,
                packageId: detailTenderPackage?.id,
                organizationId: item?.organizationId,
                roundEvaluation: item?.roundEvaluation,
                negotiationId: item?.negotiationId,
                negotiationBidderId: item?.id
            });
            setModalDetailNegotiation(true);
        }}
    >
        <span style={{fontSize: 14, fontWeight: '400'}}>{item.organizationName}</span>
    </div>,
    <div>
        <span>Vòng {item.roundEvaluation}</span>
    </div>,
    item.createdTime ? moment(item.createdTime).format('DD/MM/YYYY - HH:mm') : '',
    ...(status === 1 ? [
        <Badge
            key={item.id}
            text={(item.status === 0 || item.invitationStatus === null) ? "Chưa trả lời" : item.status === 1 ? "Đã trả lời" : item.status === 2 ? "Không trả lời" : ""}
            variant={(item.status === 0 || item.invitationStatus === null) ? "extend" : item.status === 1 ? "done" : item.status === 2 ? "done" : "done"}
        />,
    ] : [])
  ];

  const actionsTable = (item: any): IAction[] => {
    return [
   
    ].filter((action) => action);
  };

  const bulkActionList: BulkActionItemModel[] = [
    {
      title: `Xóa chủ đề ${name}`,
      callback: () => {},
    },
  ];

  const handleConfirmCreate = () => {
    if (!listIdChecked || listIdChecked.length === 0) {
        showToast(`Vui lòng chọn nhà thầu để đàm phán`, "error");
        return;
    }

    setNegotiationRequestBody(prev => ({
        ...prev,
        packageName: detailTenderPackage.name || '',
        projectName: detailTenderPackage.projectName || '',
        projectId: detailTenderPackage.projectId || '',
        packageId: detailTenderPackage.id,
        negotiationBidderIds: listIdChecked,
        round: currentRound || 1

    }));

    setIsConfirmCreate(true);
    
  };
  

  return (
    <div className="negotiation-page">
        <div style={{display:'flex', width: '100%', justifyContent:'space-between'}}>
            <div className="list-round">
                {isShowNegotiationRound ? (
                    listRound.map((item, index) => (
                    <div
                        key={index}
                        className={`item-round ${item.round === currentRound ? 'active' : ''}`}
                        onClick={() => {
                          setCurrentRound(item.round);
                          setListBidding(item.bidders || []);
                          setStatus(item.negotiationId === 0 ? 0 : 1);
                        }}
                    >
                        <span style={{ fontSize: 14, fontWeight: '500' }}>Lần {item.round}</span>
                    </div>
                    ))
                ) : (
                    <div className="item-create-round">
                    <span style={{ fontSize: 14, fontWeight: '500' }}>Tạo vòng đàm phán lần 1</span>
                    </div>
                )}
            </div>

            {status === 1 ? 
                <div className="button-add-negotiation"
                    onClick={handleAddNewRound}
                >
                    <Icon name='Plus'/>
                    <span style={{fontSize: 14, fontWeight: '500'}}>Thêm vòng đàm phán</span>
                </div>
            :
                <ButtonComponent
                    name='Xác nhận tạo'
                    callback={handleConfirmCreate}
                />
            }

        </div>

        <div className="list-bidding">
            <div style={{display: 'flex', marginBottom: '1rem'}}>
                {status === 1 ? (
                  <CountDown
                    time={null}
                    callBack={() => {
                        // setEndTime(true);
                    }}
                  />
                  ) : null
                }
            </div>
            <div className="container-header">
                <div>
                    <span style={{fontSize: 14, fontWeight: '500'}}>Danh sách đàm phán/ thương thảo</span>
                </div>
            </div>

            <div className="table-list-bidding">
                {!isLoading && listBidding && listBidding.length > 0 ? (
                    <BoxTableNegotiation
                        name="nhà thầu"
                        titles={titles}
                        items={listBidding}
                        isPagination={false}
                        dataPagination={pagination}
                        dataMappingArray={(item, index) => dataMappingArray(item, index)}
                        dataFormat={dataFormat}
                        isBulkAction={status === 1 ? false : true}
                        listIdChecked={listIdChecked}
                        bulkActionItems={bulkActionList}
                        setListIdChecked={(listId) => setListIdChecked(listId)}
                        striped={true}
                        actions={actionsTable}
                        actionType="inline"
                    />
                    ) : isLoading ? (
                        <Loading />
                    ) : (
                        <div style={{display: 'flex', justifyContent:'center'}}>
                            <span>Chưa có nhà thầu nào</span>
                        </div>
                    )
                }
            </div>
        </div>

        <DetailNegotiationModal
          data={dataBidding}
          packageId={detailTenderPackage?.id}
          dataWorkAssignment={dataWorkAssignment}
          onShow={modalDetailNegotiaTion}
          listRoundData={listRound}
          onHide={(data) => {
            setModalDetailNegotiation(false);
            setDataBidding(null);
          
            if ( data && data.reload === true &&
              typeof data.negotiationId === "number" &&
              typeof data.organizationId === "number"
            ) {
              setListRound(prev => {
                const updatedRounds = prev.map(round => {
                  if (round.negotiationId === data.negotiationId) {
                    return {
                      ...round,
                      bidders: round.bidders.map(bidder => {
                        if (bidder.organizationId === data.organizationId) {
                          return {
                            ...bidder,
                            negotiationBidderDetails: data.negotiationBidderDetails,
                            id: data.negotiationBidderId
                          };
                        }
                        return bidder;
                      }),
                    };
                  }
                  return round;
                });
              
                // Sau khi cập nhật listRound, set lại listBidding bằng vòng mới nhất (cuối cùng)
                const latestRound = updatedRounds[updatedRounds.length - 1];
                setListBidding(latestRound.bidders);
              
                return updatedRounds;
              });

              setListIdChecked(prev => {
                if (!prev.includes(data.negotiationBidderId)) {
                  return [...prev, data.negotiationBidderId];
                }
                return prev;
              });
              
            }
          }}
          
        />

        <ConfirmCreateModal
            onShow={isConfirmCreate}
            data={negotiationRequestBody}
            onHide={(reload) => {
                if (reload) {
                  loadNegotiationData(detailTenderPackage?.id);
                }
                setIsConfirmCreate(false);
            }}
        />
    </div>
  );
};

export default memo(Negotiation);

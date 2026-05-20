import React, { Fragment, memo, useCallback, useEffect, useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import moment from "moment";
import Icon from "components/icon";
import Loading from "components/loading";
import { handDownloadFileOrigin, showToast } from "utils/common";
import EmployeeService from "services/EmployeeService";
import WorkOrderService from "services/WorkOrderService";
import "./DetailTenderPackage.scss";
import Tippy from "@tippyjs/react";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Badge from "components/badge/badge";
import TenderPackageService from "services/TenderPackageService";
import BoxTable from "components/boxTable/boxTable";
import { DataPaginationDefault, PaginationProps } from "components/pagination/pagination";
import { IAction } from "model/OtherModel";
import ModalBiddingProfile from "./ModalBiddingProfile/ModalBiddingProfile";
import CountDown from "components/CountDown/CountDown";
import Popover from "components/popover/popover";
import { useOnClickOutside } from "utils/hookCustom";
import ButtonOnOff from "components/ButtonOnOff/ButtonOnOff";
import ModalDetailBidding from "./ModalDetailBidding/ModalDetailBidding";
import ModalSendSummaryClarification from "./ModalSendSummaryClarification/ModalSendSummaryClarification";
import ModalHistoryClarification from "./ModalHistoryClarification/ModalHistoryClarification";
import ModalAddBidding from "./ModalAddBidding/ModalAddBidding";
import ModalBidOpen from "./ModalBidOpen/ModalBidOpen";
import TabEvaluationResults from "./TabEvaluationResults/TabEvaluationResults";
import ModalSendEvaluationResult from "./ModalSendEvaluationResults/ModalSendEvaluationResults";
import ModalExtend from "./ModaExtend/ModalExtend";
import ModalExtendHistory from "./ModalExtendHistory/ModalExtendHistory";
import ModalRequestExtend from "./ModalRequestExtend/ModalRequestExtend";
import ModalAdjustBidPackage from "./ModalAdjustBidPackage/ModalAdjustBidPackage";
import Negotiation from "./Negotiation/Negotiation";


// trạng thái nhà thầu invitationStatus
// 0 - chờ xác nhận
// 1 - tham gia
// 2 - từ chối
// 3 - đã nộp thầu
// 4 - đã huỷ

const DetailTenderPackage = (props: any) => {
  const { dataTenderPackage, isDetail } = props;
  console.log('dataTenderPackage', dataTenderPackage);
  const refButtonEdit = useRef();
  const refButtonEditContainer = useRef();
  useOnClickOutside(refButtonEdit, () => setShowPopoverEdit(false), ["box-button"]);

  const [tab, setTab] = useState(1);
  const [dataEmployee, setDataEmployee] = useState(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<any>(null);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [detailTenderPackage, setDetailTenderPackage] = useState(null);
  const [showInfoTenderPackage, setShowInfoTenderPackage] = useState(true);
  const [showInfoBiddingList, setShowInfoBiddingList] = useState(true);
  const [listBidding, setListBidding] = useState([]);
  const [loadingListBidding, setLoadingListBidding] = useState(true);
  const [showModalBiddingProfile, setShowModalBiddingProfile] = useState(false);
  const [dataBidding, setDataBidding] = useState(null);
  const [showPopoverEdit, setShowPopoverEdit] = useState<boolean>(false);
  const [modalSendResult, setModalSendResult] = useState(false);
  const [showDetailBidding, setShowDetailBidding] = useState(false);
  const [modalSendSummaryClarification, setModalSendSummaryClarification] = useState(false);
  const [modalHistoryClarification, setModalHistoryClarification] = useState(false);
  const [modalAddBidding, setModalAddBidding] = useState(false);
  const [modalBidOpen, setModalBidOpen] = useState(false);
  const [endTime, setEndTime] = useState(false);
  const [modalExtend, setModalExtend] = useState(false);
  const [modalExtendHistory, setModalExtendHistory] = useState(false);
  const [modalRequestExtend, setModalRequestExtend] = useState(false);
  const [timeRequestExtend, setTimeRequestExtend] = useState(null);
  const [modalAdjustBidPackage, setModalAdjustBidPackage] = useState(false);

  const listTab = [
    {
      value: 1,
      label: 'Thông tin gói thầu'
    },
    {
      value: 4,
      label: 'Hồ sơ mời thầu'
    },
    {
      value: 5,
      label: 'Kế hoạch lựa chọn NT'
    },
    {
      value: 6,
      label: 'Quản lý yêu cầu làm rõ'
    },
    {
      value: 2,
      label: 'Quản lý dự thầu'
    },
    {
      value: 3,
      label: 'Kết quả đánh giá'
    },
    {
      value: 7,
      label: 'Đàm phán, thương thảo'
    },
  ]
  
  // lấy thông tin nhân viên
  const takeDataEmployee = async () => {
    const response = await EmployeeService.info();

    if (response.code === 0) {
      const result = response.result;
      setDataEmployee(result);
    }
  };

  const handGetDetail = async (id: number) => {
    if (!id) return;
    setLoadingDetail(true);
    const response = await TenderPackageService.detail(id);

    if (response.code === 0) {
      const result = response.result;
      setDetailTenderPackage(result);
      console.log("result: ", result);
      
    } else {
      showToast("Có lỗi xảy ra. Vui lòng thử lại sau!", "error");
    }
    setLoadingDetail(false);
  };

  const onStatus = async (item, status) => {
    const body = {
        id: item.id,
        biddingStatus: status
    }
    const response = await TenderPackageService.updateBiddingStatus(body);

    if (response.code === 0) {
      showToast("Thay đổi trạng thái nộp thầu thành công", "success");
      getListTenderPackage(paramsListBidding, true);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }

  };

  useEffect(() => {
    if(isDetail){
      setTab(1);
      if (dataTenderPackage) {
        takeDataEmployee();
        handGetDetail(dataTenderPackage?.id);
        setParamsListBidding({...paramsListBidding, packageId: dataTenderPackage.id})
      } else {
        setDetailTenderPackage(null);
      }
    } else {
      setDetailTenderPackage(null);
      setListBidding([]);
      setDataBidding(null);
      setShowInfoBiddingList(true);
      setShowInfoTenderPackage(true);
      setEndTime(false);
    }
  }, [dataTenderPackage, isDetail]);

  const [paramsListBidding, setParamsListBidding] = useState<any>({
    name: "",
    limit: 10,
    page: 1,
    packageId: null
  });

  useEffect(() => {
    if(paramsListBidding.packageId){
      getListTenderPackage(paramsListBidding);
    }
  }, [paramsListBidding])

  const [pagination, setPagination] = useState<PaginationProps>({
    ...DataPaginationDefault,
    name: "nhà thầu",
    isChooseSizeLimit: true,
    setPage: (page) => {
      setParamsListBidding((prevParams) => ({ ...prevParams, page: page }));
    },
    chooseSizeLimit: (limit) => {
      setParamsListBidding((prevParams) => ({ ...prevParams, limit: limit }));
    },
  });

  const abortController = new AbortController();
  const getListTenderPackage = async (paramsSearch: any, disableLoading?: boolean) => {
    if (!disableLoading) {
      setLoadingListBidding(true);
    }

    const response = await TenderPackageService.listBiddingInvitation(paramsSearch, abortController.signal);

    if (response.code === 0) {
      const result = response.result;
      setListBidding(result?.items);

      setPagination({
        ...pagination,
        page: +result.page,
        sizeLimit: paramsListBidding.limit ?? DataPaginationDefault.sizeLimit,
        totalItem: +result.total,
        totalPage: Math.ceil(+result.total / +(paramsListBidding.limit ?? DataPaginationDefault.sizeLimit)),
      });
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setLoadingListBidding(false);
  };

  const titles = [
    "Nhà thầu",
    "Cập nhật lần cuối",
    "Trạng thái",
    "Hồ sơ dự thầu",
    "Xin gia hạn",
    "Được nộp thầu"
  ];

  const dataFormat = ["", "", "text-center", "", "", "text-right"];

  const dataMappingArray = (item: any, index: number, type?: string) => [
    // getPageOffset(params) + index + 1,
    <div
        className="title-name"
        onClick={() => {
          setDataBidding(item);
          setShowDetailBidding(true);
        }}
        style={{ cursor: "pointer" }}
    >
        {item.organizationName}
    </div>,
    item.responseTime ? moment(item.responseTime).format('DD/MM/YYYY HH:mm') : '',
    <Badge
      key={item.id}
      text={(item.invitationStatus === 0 || item.invitationStatus === null) ? "Chờ xác nhận" : item.invitationStatus === 1 ? "Tham gia" : item.invitationStatus === 2 ? "Từ chối" : item.invitationStatus === 3 ? "Đã nộp thầu" : item.invitationStatus === 4 ? "Đã huỷ" : ""}
      variant={(item.invitationStatus === 0 || item.invitationStatus === null) ? "primary" : item.invitationStatus === 1 ? "extend" : item.invitationStatus === 2 ? "done" : item.invitationStatus === 3 ? "done" : "done"}
    />,
    item.submittedCount ? 
      <div className="bidding-profile" >
        <div className="count-profile">
          <span style={{fontSize: 12, fontWeight: '400', color: '#FFFFFF'}}>{item.submittedCount}</span>
        </div>
        <div
          // style={{cursor: 'pointer'}}
          // onClick={() => {
          //   setDataBidding(item);
          //   setShowModalBiddingProfile(true);
          // }}
        >
          <Icon name="FolderRox"/>
        </div>
      </div>
    : '',
    item.extensionRequestId ? 
      <div 
        className="container-extend"
        onClick={() => {
          setDataBidding(item);
          setModalRequestExtend(true);
        }}
      >
        <Icon name='Extend'/>
        <span style={{fontSize: 12, fontWeight: '500', color: '#ED1B34', marginLeft: 5}}>Xin gia hạn</span>
      </div>
    : null,
    <div style={{paddingRight: 14}}>
      <ButtonOnOff
        checked={item.biddingStatus === 1 ? true : false}
        disabled={(item.invitationStatus === 2 || item.invitationStatus === 4 || item.invitationStatus === 0 || item.invitationStatus === null) ? true : false}
        onChange={(value) => {
          if(item.biddingStatus === 1){
            onStatus(item, 0);
          } else {
              onStatus(item, 1);
          }
        }}
      />
      {/* {(item.invitationStatus === 0 || item.invitationStatus === null || item.invitationStatus === 4) ? null :
        
      } */}
    </div>    
    
  ];

  const actionsTable = (item: any): IAction[] => {
    return [
   
    ].filter((action) => action);
  };

  return (
    <div className="detail__tender-package">
      <div className=" d-flex flex-column">
        {/* {data ? ( */}
          <Fragment>
            <div className="body__info-tender-package">
              <div className="header-status">
                <div className="box-status">
                    <Badge
                        key={detailTenderPackage?.id}
                        text={detailTenderPackage?.status === 0 ? "Đã đóng" : detailTenderPackage?.status === 1 ? "Chưa đóng thầu" : detailTenderPackage?.status === 2 ? "Xin gia hạn" : ""}
                        variant={detailTenderPackage?.status === 0 ? "done" : detailTenderPackage?.status === 1 ? "wait-collect" : detailTenderPackage?.status === 2 ? "extend" : "done"}
                    />
                </div>
                <div className="box-code">
                  <span style={{fontSize: 14, fontWeight: '500', color: '#939394'}}>{detailTenderPackage?.code}</span>
                </div>
              </div>

              <div className="name-bidding">
                <span style={{fontSize: 20, fontWeight: '600'}}>{detailTenderPackage?.name}</span>
              </div>

              <div className="body-bidding">
                <div className="list-tab">
                  {listTab.map((item, index) => (
                    <div key={index} 
                      className={tab === item.value ? "item-tab-active" :"item-tab" }
                      // style={item.value === tab ? {borderBottom: '1px solid #CE182D'} : {}}
                      onClick={() => {
                        setTab(item.value);
                      }}
                    >
                      <span style={{fontSize: 14, fontWeight: '500', color: tab === item.value ? '#ED1B34' : '#2C2C2C'}}>{item.label}</span>
                    </div>
                  ))}
                  
                </div>

                <div className="line-tab"/>

                <div className="container-detail-tender-package">
                  {tab === 1 ? 
                    <div className="info-package">
                        {/* <div 
                          className="box-package"
                          onClick={() => {
                              setShowInfoTenderPackage(!showInfoTenderPackage);
                          }}
                        >
                          <span style={{fontSize: 16, fontWeight: '500'}}>Thông tin gói thầu</span>
                          <div className="icon-show-info">
                              {showInfoTenderPackage ? <Icon name="ChevronUp" /> : <Icon name="ChevronDown" /> }
                              
                          </div>
                        </div> */}
                        
                        {showInfoTenderPackage ? 
                          !loadingDetail ? 
                            <div style={{width: '100%'}}>
                              <div className="box-project">
                                <span className="title">Dự án</span>
                                <div className="content">
                                  <Icon name='ProjectorScreen'/>
                                  <span className="name">{detailTenderPackage?.projectName}</span>
                                </div>
                              </div>

                              <div className="box-company">
                                <span className="title">Bên mời thầu</span>
                                <div className="content">
                                  <Icon name='BuildingOffice'/>
                                  <span className="name">{detailTenderPackage?.branchName}</span>
                                </div>
                              </div>

                              <div style={{display: 'flex', marginTop: '1rem', justifyContent: 'space-between'}}>
                                <div className="box-address" style={{width: '49.5%'}}>
                                  <span className="title">Địa điểm</span>
                                  <div className="content">
                                      <Icon name='MapPin'/>
                                      <span className="name">{detailTenderPackage?.location}</span>
                                  </div>
                                </div>
                                <div className="box-field" style={{width: '49.5%'}}>
                                  <span className="title">Lĩnh vực</span>
                                  <div className="content">
                                    <Icon name='Cube'/>
                                    <span className="name">{detailTenderPackage?.fieldName}</span>
                                  </div>
                                </div>
                              </div>

                              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div className="box-address" style={{width: '49.5%'}}>
                                  <span className="title">Ngày mời thầu</span>
                                  <div className="content">
                                      <Icon name='CalendarDot'/>
                                      <span className="name">{detailTenderPackage?.invitationDate ? moment(detailTenderPackage?.invitationDate).format('DD/MM/YYYY - HH:mm') : ''}</span>
                                  </div>
                                </div>
                                <div className="box-field" style={{width: '49.5%'}}>
                                  <span className="title">Ngày đóng thầu</span>
                                  <div className="content">
                                      <Icon name='CalendarDot'/>
                                      <span className="name">{detailTenderPackage?.closedDate ? moment(detailTenderPackage?.closedDate).format('DD/MM/YYYY - HH:mm') : ''}</span>
                                  </div>
                                </div>
                              </div>

                              <div style={{border: '1px solid', borderColor: '#EEEEEF', marginTop: '1rem'}}/>

                              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                  <div className="box-address" style={{width: '49.5%'}}>
                                  <span className="title">Đầu mối phụ trách</span>
                                  <div className="content">
                                      <Icon name='UserRed'/>
                                      <span className="name">{detailTenderPackage?.employeeName}</span>
                                  </div>
                                  </div>
                                  <div className="box-email" style={{width: '49.5%'}}>
                                  <span className="title">Email</span>
                                  <div className="content">
                                      <Icon name='Envelope'/>
                                      <span className="name">{detailTenderPackage?.employeeEmail}</span>
                                  </div>
                                  </div>
                              </div>

                              <div className="box-phone">
                                  <span className="title">Số điện thoại liên hệ</span>
                                  <div className="content">
                                  <Icon name='PhoneRed'/>
                                  <span className="name">{detailTenderPackage?.employeePhone}</span>
                                  </div>
                              </div>
                            </div>
                            :
                            <Loading />
                        : null}
                    </div>
                  : null}

                  {tab === 2 ? 
                    <div className="info-bidding-list">
                        {/* <div 
                            className="box-package"
                            onClick={() => {
                                setShowInfoBiddingList(!showInfoBiddingList);
                            }}
                        >
                            <span style={{fontSize: 16, fontWeight: '500'}}>Thông tin dự thầu</span>
                            <div className="icon-show-info">
                                {showInfoBiddingList ? <Icon name="ChevronUp" /> : <Icon name="ChevronDown" /> }
                                
                            </div>
                        </div> */}
                        
                        {showInfoBiddingList ? 
                          <div key={detailTenderPackage?.closedDate} className="container-header-table">
                            <div className="box-time">
                              <CountDown
                                time={detailTenderPackage?.closedDate}
                                callBack={() => {
                                  setEndTime(true);
                                }}
                              />
                            </div>

                            <div className="box-button" ref={refButtonEditContainer}>
                              <div 
                                className={endTime ? "button-open" : "button-open-disable"}
                                onClick={() => {
                                  if(endTime){
                                    setModalBidOpen(true);
                                    setShowPopoverEdit(false);
                                  }
                                }}
                              >
                                <span style={{fontSize: 14, fontWeight: '500', color: '#FFFFFF'}}>Mở thầu</span>
                              </div>

                              <div 
                                className="button-edit"
                                onClick={() => {
                                  setShowPopoverEdit(!showPopoverEdit);
                                }}
                              >
                                <Icon name='SettingInfoBidding'/>
                                <span style={{fontSize: 14, fontWeight: '500',  marginLeft: 3, marginRight: 3}}>Tuỳ chỉnh</span>
                                <Icon name="ChevronDown" />
                              </div>
                              
                              {showPopoverEdit ? 
                                <Popover
                                  alignment="right"
                                  isTriangle={true}
                                  className="popover-button-edit"
                                  refContainer={refButtonEditContainer}
                                  refPopover={refButtonEdit}
                                >
                                  <div className="container-button-edit">
                                    <div 
                                      className="body-button"
                                      onClick={() => {
                                        setModalExtend(true);
                                      }}
                                    >
                                      <Icon name='Extend'/>
                                      <span style={{fontSize: 14, fontWeight: '500'}}>Gia hạn gói thầu</span>
                                    </div>

                                    <div 
                                      className="body-button"
                                      onClick={() => {
                                        setModalSendSummaryClarification(true);
                                      }}
                                    >
                                      <Icon name='SendRox'/>
                                      <span style={{fontSize: 14, fontWeight: '500'}}>Gửi tổng hợp làm rõ HSMT</span>
                                    </div>

                                    <div 
                                      className="body-button"
                                        onClick={() => {
                                          setModalAdjustBidPackage(true);
                                        }}
                                    >
                                      <Icon name='PencilSimpleLine'/>
                                      <span style={{fontSize: 14, fontWeight: '500'}}>Điều chỉnh gói thầu </span>
                                    </div>

                                    <div 
                                      className="body-button"
                                      onClick={() => {
                                        setModalAddBidding(true);
                                      }}
                                    >
                                      <Icon name='AddBidding'/>
                                      <span style={{fontSize: 14, fontWeight: '500'}}>Bổ sung nhà thầu</span>
                                    </div>
                                    
                                  </div>
                                </Popover>
                              : null}

                            </div>
                          </div>
                        : null}

                        {showInfoBiddingList ? 
                          <div className="table-tender-invitation-list" style={!loadingListBidding && listBidding && listBidding.length === 0 ? {backgroundColor: '#FFFFFF'} : {}}>
                            {!loadingListBidding && listBidding && listBidding.length > 0 ? (
                              <BoxTable
                                name="gói thầu"
                                titles={titles}
                                items={listBidding}
                                isPagination={true}
                                dataPagination={pagination}
                                dataMappingArray={(item, index) => dataMappingArray(item, index)}
                                dataFormat={dataFormat}
                                listIdChecked={[]}
                                isBulkAction={false}
                                // bulkActionItems={bulkActionList}
                                striped={true}
                                setListIdChecked={(listId) => {}}
                                actions={actionsTable}
                                actionType="inline"
                              />
                              ) : loadingListBidding ? (
                                <Loading />
                              ) : (
                                <div style={{display: 'flex', justifyContent:'center'}}>
                                  <span>Chưa có nhà thầu nào</span>
                                </div>
                              )
                            }
                          </div>
                        : null}

                        {/* {showInfoBiddingList ? 
                          <div className="container-footer-table">
                            <div className="box-time">
                              <CountDown
                                time={detailTenderPackage?.closedDate}
                                callBack={() => {
                                  // setIsOpen(true);
                                }}
                              />
                            </div>

                            <div className="box-button">
                              <div className="button-history-extend">
                                <span style={{fontSize: 14, fontWeight: '500'}}>Lịch sử gia hạn</span>
                              </div>
                              <div className="button-extend">
                                <span style={{fontSize: 14, fontWeight: '500', color: '#FFFFFF'}}>Gia hạn</span>
                              </div>
                            </div>
                          </div>
                        : null} */}
                    </div>
                  : null}

                  {tab === 3 ? 
                    <TabEvaluationResults 
                      setModalSendResult = {setModalSendResult}
                      detailTenderPackage = {detailTenderPackage}
                    />
                  : null}

                  {tab === 7 ? 
                    <Negotiation 
                      detailTenderPackage = {detailTenderPackage}
                      employeeId = {dataEmployee?.id}
                    />
                  : null}

                </div>
              </div>

            </div>
          </Fragment>
      </div>

      {/* <ModalBiddingProfile
        data={dataBidding}
        onShow={showModalBiddingProfile}
        onHide={(reload) => {
          if(reload){
            // handGetDetailWork(dataAsked?.id);
          }
          setShowModalBiddingProfile(false);
        }}
      /> */}

      <ModalDetailBidding
        data={dataBidding}
        onShow={showDetailBidding}
        onHide={(reload) => {
          if(reload){
            getListTenderPackage(paramsListBidding, true);
          }
          setShowDetailBidding(false);
        }}
      />

      <ModalSendSummaryClarification
        data={dataTenderPackage}
        onShow={modalSendSummaryClarification}
        onHide={(reload) => {
          if(reload){
            setModalHistoryClarification(true);
          }
          setModalSendSummaryClarification(false);
        }}
      />

      <ModalHistoryClarification
        data={dataTenderPackage}
        onShow={modalHistoryClarification}
        onHide={(reload) => {
          if(reload){
            setModalSendSummaryClarification(true);
          }
          setModalHistoryClarification(false);
        }}
      />

      <ModalAddBidding
        data={dataTenderPackage}
        onShow={modalAddBidding}
        onHide={(reload) => {
          if(reload){
            getListTenderPackage(paramsListBidding, true);
          }
          setModalAddBidding(false);
        }}
      />

      <ModalBidOpen
        data={dataBidding}
        detailTenderPackage={detailTenderPackage}
        onShow={modalBidOpen}
        onHide={(reload) => {
          if(reload){
            // setModalSendSummaryClarification(true);
          }
          setModalBidOpen(false);
        }}
      />

      <ModalSendEvaluationResult
        data={dataTenderPackage}
        onShow={modalSendResult}
        onHide={(reload) => {
          if(reload){
            // setModalSendSummaryClarification(true);
          }
          setModalSendResult(false);
        }}
      />

      <ModalExtend
        data={dataTenderPackage}
        timeRequestExtend={timeRequestExtend}
        onShow={modalExtend}
        onHide={(openHistory, reload) => {
          if(openHistory){
            setModalExtendHistory(true);
          }

          if(reload){
            getListTenderPackage(paramsListBidding, true);
            handGetDetail(dataTenderPackage?.id);
            setEndTime(false);
          }
          setModalExtend(false);
          
        }}
      />

      <ModalAdjustBidPackage
        data={dataTenderPackage}
        onShow={modalAdjustBidPackage}
        onHide={(openHistory, reload) => {
          if(openHistory){
            setModalExtendHistory(true);
          }

          if(reload){
            getListTenderPackage(paramsListBidding, true);
            handGetDetail(dataTenderPackage?.id);
            setEndTime(false);
          }
          setModalAdjustBidPackage(false);
          
        }}
      />

      <ModalExtendHistory
        data={dataTenderPackage}
        onShow={modalExtendHistory}
        onHide={(reload) => {
          if(reload){
            setModalExtend(true);
          }
          setModalExtendHistory(false);
        }}
      />

      <ModalRequestExtend
        data={dataBidding}
        onShow={modalRequestExtend}
        onHide={(reload, time) => {
          if(reload){
            setModalExtend(true);
            if(time){
              setTimeRequestExtend(time);
            }
          }
          setModalRequestExtend(false);
          setTimeout(() => {
            setTimeRequestExtend(null);
          }, 1000)
        }}
      />
      
      <Dialog content={contentDialog} isOpen={showDialog} />
    </div>
  );
};

export default memo(DetailTenderPackage);

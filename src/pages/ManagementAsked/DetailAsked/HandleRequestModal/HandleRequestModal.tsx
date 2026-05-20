import React, { Fragment, useState, useEffect, useMemo, useRef, useContext } from "react";
import { IActionModal } from "model/OtherModel";
import Icon from "components/icon";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import "./HandleRequestModal.scss";
import { handDownloadFileOrigin, showToast } from "utils/common";
import Button from "components/button/button";
import { useNavigate } from "react-router-dom";
import { IEmployeeFilterRequest } from "model/employee/EmployeeRequestModel";
import { ContextType, UserContext } from "contexts/userContext";
import EmployeeService from "services/EmployeeService";
import { IEmployeeResponse } from "model/employee/EmployeeResponseModel";
import SelectCustom from "components/selectCustom/selectCustom";
import Badge from "components/badge/badge";
import DetailRequestModal from "./DetailRequestModal/DetailRequestModal";
import ConfirmAssignmentModal from "./ConfirmAssignmentModal/ConfirmAssignmentModal";
import ManagementAskedService from "services/ManagementAskedService";
import Loading from "components/loading";
import DetailRequestReplyModal from "./DetailRequestReplyModal/DetailRequestReplyModal";

export default function HandleRequestModal({ onShow, onHide, data, tenderPackageResponse, dataAsked }) {
    console.log('dataAsked', dataAsked);
    
    const navigation = useNavigate();
    const { dataBranch } = useContext(UserContext) as ContextType;
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
    const [isLoading, setIsLoading] = useState(true);    
    const [isShowDetail, setIsShowDetail] = useState(false);
    const [isShowDetailReply, setIsShowDetailReply] = useState(false);

    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const [dataRequest, setDataRequest] = useState(null);
    const [listRequest, setListRequest] = useState([]);
    console.log('listRequest', listRequest);

    //danh sách câu trả lời của 1 gói thầu
    const [listReponse, setListResponse] = useState([]);
    
    const getDetailClarification = async (clarificationId, round) => {
      const params = {
        clarificationId: clarificationId,
        round: round
      };
      
      const response = await ManagementAskedService.getClarificationDetail(params);
      if (response.code === 0) {
        const result = response.result;
        const newData = result && result.length > 0 && result.map((item) => {
          return {
            id: item.id,
            documentName: item.documentName,
            documentId: item.documentId,
            // employee: item.employeeId ? {value: item.employeeId, label: item.employeeName} : item.documentEmployeeId ? {value: +item.documentEmployeeId, label: item.documentEmployeeName} : {value: tenderPackageResponse?.employeeId, label: tenderPackageResponse?.employeeName},
            employee: item.employeeId ? {value: item.employeeId, label: item.employeeName}
                      : (item.documentType === 'PVCV' && item.employeeIdSow) ? {value: item.employeeIdSow, label: item.employeeNameSow}
                      : (item.documentType === 'DMVT' && item.employeeIdBom) ? {value: item.employeeIdBom, label: item.employeeNameBom}
                      : (item.documentType === 'YCKT' && item.employeeIdEngineer) ? {value: item.employeeIdEngineer, label: item.employeeNameEngineer}
                      : (item.documentType === 'TCTN' && item.employeeIdExperiment) ? {value: item.employeeIdExperiment, label: item.employeeNameExperiment}
                      : (item.documentType === 'BoQ' && item.employeeIdBoq) ? {value: item.employeeIdBoq, label: item.employeeNameBoq}
                      : (item.documentType === 'BVTK' && item.employeeIdDesign) ? {value: item.employeeIdDesign, label: item.employeeNameDesign}
                      : (item.documentType === 'HDM' && item.employeeIdSplcontact) ? {value: item.employeeIdSplcontact, label: item.employeeNameSplcontact}
                      : {value: tenderPackageResponse?.employeeId, label: tenderPackageResponse?.employeeName},
            status: item.status,
            content: item.content,
            attachments: item.attachments
          }
        })
        setListRequest(newData)
        
      } else {
        showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      }
      setIsLoading(false);
    };

    const getRepsonseList = async (clarificationId) => {
      const params = {
        clarificationRequestId: clarificationId,
      };
      
      const response = await ManagementAskedService.getRepsonseList(params);
      if (response.code === 0) {
        const result = response.result;
        setListResponse(result);
        
      } else {
        showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      }
    };

    useEffect(() => {
        if(onShow && data){
          getDetailClarification(data?.id, data?.round);
          getRepsonseList(data?.id);
        }
    }, [onShow, data])

  const onSubmit = async () => {
  
      setIsSubmit(true);
      const body = [...listReponse];

      console.log('body', body);

      const response = await ManagementAskedService.insertRepsonse(body);

      if (response.code === 0) {
          showToast(`Gửi trả lời yêu cầu làm rõ thành công`, "success");
          handleClear(true); 

      } else {
          showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      }
      setIsSubmit(false);
  }

  const actions = useMemo<IActionModal>(
    () => ({
      actions_right: {
        buttons: [
          ...(dataAsked?.status === 3 ? [] : [
            {
              title: dataAsked?.status === 0 ? "Gửi phân công làm rõ yêu cầu" : (dataAsked?.status === 1 || dataAsked?.status === 2) ? 'Gửi trả lời yêu cầu làm rõ' : '',
              // type: "submit",
              color: "primary",
              disabled: isSubmit || (dataAsked?.status !== 0 && listRequest.filter(el => el.status === 2).length !== listRequest.length), 
              // || !isDifferenceObj(formData, values),
              is_loading: isSubmit,
              callback: () => {                
                if(listRequest && listRequest.length > 0 && listRequest.filter(el => !el.employee).length > 0){
                  showToast('Vui lòng chọn đủ người trả lời yêu cầu làm rõ', 'warning')
                } else {
                  if(dataAsked?.status === 0){
                    setIsShowConfirm(true);
                  } else {
                    if(listRequest && listRequest.length > 0){
                      if(listRequest.filter(el => el.status === 2).length === listRequest.length){
                        console.log('đã gửi trả lời');
                        onSubmit();
                      } else {
                        showToast('Các yêu cầu làm rõ chưa được trả lời hết', 'warning')
                      }
                    }
                  }
                }
                
              }
          },
          ] as any),
           
        ],
      },
    }),
    [
      isSubmit,
      data,
      dataAsked,
      listRequest,
      listReponse
    ]
  );

  const showDialogConfirmCancel = () => {
    const contentDialog: IContentDialog = {
      color: "warning",
      className: "dialog-cancel",
      isCentered: true,
      isLoading: false,
      title: <Fragment>{`Hủy bỏ thao tác`}</Fragment>,
      message: <Fragment>Bạn có chắc chắn muốn hủy bỏ? Thao tác này không thể khôi phục.</Fragment>,
      cancelText: "Quay lại",
      cancelAction: () => {
        setShowDialog(false);
        setContentDialog(null);
      },
      defaultText: "Xác nhận",
      defaultAction: () => {
        handleClear(false);
        setShowDialog(false);
        setContentDialog(null);
      },
    };
    setContentDialog(contentDialog);
    setShowDialog(true);
  };

  const handleClear = (acc) => {
    onHide(acc);
    setListRequest([]);
  }

  const loadOptionEmployee = async (search, loadedOptions, { page }) => {
    const param: IEmployeeFilterRequest = {
      name: search,
      page: page,
      limit: 10,
      // branchId: dataBranch.value,
    };
    const response = await EmployeeService.list(param);

    if (response.code === 0) {
      const dataOption = response.result.items;

      return {
        options: [
          ...(dataOption.length > 0
            ? dataOption.map((item: IEmployeeResponse) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              })
            : []),
        ],
        hasMore: response.result.loadMoreAble,
        additional: {
          page: page + 1,
        },
      };
    }

    return { options: [], hasMore: false };
  };



  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        size="xl"
        toggle={() => !isSubmit && handleClear(false)}
        className="modal-handle-request"
      >
        <form className="form-handle-request" >
          {/* <ModalHeader title={`Cài đặt biểu mẫu`} toggle={() => !isSubmit && handleClear(false)} /> */}
            <div className="container-header">
                <div className="box-title">
                    <h4>{`Yêu cầu làm rõ`}</h4>
                </div>
                <div className="container-button">
                    <Button onClick={() => !isSubmit && handleClear(false)} type="button" className="btn-close" color="transparent" onlyIcon={true}>
                        <Icon name="Times" />
                    </Button>
                </div>
            </div>
          <ModalBody>
            <div className='container_handle_request-modal'>
              <div className="list-tab">
                <div className="tab-item">
                    <span style={{fontSize: 14, fontWeight: '500'}}>Lần {data?.round}</span>
                </div>
              </div>

              {isLoading ? <Loading/> :
                listRequest && listRequest.length > 0 ? 
                    <div className="table-list-request">
                      <div className="container-title">
                        <div className="title-stt">
                          <span className="title">STT</span>
                        </div>
                        <div className="title-category">
                          <span className="title">Thành phần hồ sơ</span>
                        </div>
                        <div className="title-employee">
                          <span className="title">Người trả lời yêu cầu làm rõ</span>
                        </div>
                        <div className="title-status">
                          <span className="title">Trạng thái</span>
                        </div>
                        <div className="title-view">
                          <span className="title">Chi tiết yêu cầu</span>
                        </div>
                      </div>

                      {listRequest && listRequest.length > 0 ? 
                        listRequest.map((item,index) => (
                          <div key={index} className="container-request">
                            <div className="title-stt">
                              <span className="title">{index + 1}</span>
                            </div>
                            <div className="title-category">
                              <span className="title">{item.documentName}</span>
                            </div>
                            <div className="title-employee">
                              <div className="select-employee">
                                <SelectCustom
                                  id="employeeId"
                                  name="employeeId"
                                  label=""
                                  fill={true}
                                  required={true}
                                  disabled={item.status === 0 ? false : true}
                                  // error={validateFieldEmployee}
                                  // message="Người phụ trách không được bỏ trống"
                                  options={[]}
                                  value={item.employee}
                                  onChange={(e) => {
                                    setListRequest((current) =>
                                      current.map((obj, idx) => {
                                        if (index === idx) {
                                          return { ...obj, employee: e };
                                        }
                                        return obj;
                                      })
                                    );
                                  }}
                                  isAsyncPaginate={true}
                                  placeholder="Chọn người trả lời"
                                  additional={{
                                    page: 1,
                                  }}
                                  loadOptionsPaginate={loadOptionEmployee}
                                />
                              </div>
                            </div>

                            <div className="title-status">
                              <Badge
                                // key={item?.id}
                                text={item?.status === 0 ? "Chờ phân công" : item?.status === 1 ? "Chờ trả lời" : "Đã trả lờI"}
                                variant={item?.status === 0 ? "wait-collect" : item?.status === 1 ? "wait-collect" : "done"}
                              />
                            </div>
                            <div className="title-view">
                              <div 
                                style={{cursor: 'pointer'}}
                                onClick={() => {
                                  if(item?.status === 0){
                                    setIsShowDetail(true);
                                    setDataRequest(item);
                                  } else {
                                    setIsShowDetailReply(true);
                                    setDataRequest(item);
                                  }
                                }}
                              >
                                <Icon name="Eye" style={{width: 24, fill: '#939394'}} />
                              </div>
                            </div>
                          </div>
                        )) 
                      : null}
                    </div>
                : null
              }
            </div>
          </ModalBody>
          <ModalFooter actions={actions} />
        </form>
      </Modal>
      <DetailRequestModal
        data={dataRequest}
        onShow={isShowDetail}
        onHide={() => {
          setIsShowDetail(false);
          setDataRequest(null);
        }}
      />

      <DetailRequestReplyModal
        dataAsked={dataAsked}
        data={dataRequest}
        onShow={isShowDetailReply}
        onHide={(reload) => {
          if(reload){
            getRepsonseList(data?.id);
            getDetailClarification(data?.id, data?.round);
          }
          setIsShowDetailReply(false);
          setDataRequest(null);
        }}
      />

      <ConfirmAssignmentModal
        data={listRequest}
        clarificationId={data?.id}
        onShow={isShowConfirm}
        onHide={(reload) => {
          if(reload){
            handleClear(true);
            getDetailClarification(data?.id, data?.round);
            getRepsonseList(data?.id);
          }
          setIsShowConfirm(false);
        }}
      />
      <Dialog content={contentDialog} isOpen={showDialog} />
      
    </Fragment>
  );
}

import React, { Fragment, memo, useCallback, useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import moment from "moment";
import Icon from "components/icon";
import Loading from "components/loading";
import { handDownloadFileOrigin, showToast } from "utils/common";
import EmployeeService from "services/EmployeeService";
import WorkOrderService from "services/WorkOrderService";
import "./DetailAsked.scss";
import Tippy from "@tippyjs/react";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Badge from "components/badge/badge";
import HandleRequestModal from "./HandleRequestModal/HandleRequestModal";
import ManagementAskedService from "services/ManagementAskedService";

const DetailAsked = (props: any) => {
  const { dataAsked, isDetailAsked } = props;
  
  const [dataEmployee, setDataEmployee] = useState(null);
  const [data, setData] = useState<any>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<any>(null);
  const [isHandleRequest, setIsHandleRequest] = useState(false);
  const [branchResponses, setBranchResponses] = useState(null);
  const [clarificationRequest, setClarificationRequest] = useState(null);
  const [tenderPackageResponse, setTenderPackageResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // lấy thông tin nhân viên
  const takeDataEmployee = async () => {
    const response = await EmployeeService.info();

    if (response.code === 0) {
      const result = response.result;
      setDataEmployee(result);
    }
  };

  const handGetDetailWork = async (id: number) => {
    if (!id) return;
    setIsLoading(true);
    const response = await ManagementAskedService.detail(id);

    if (response.code === 0) {
      const result = response.result;
      setBranchResponses(result.branchResponse);
      setClarificationRequest(result.clarificationRequest);
      setTenderPackageResponse(result.tenderPackage);
      
    } else {
      showToast("Có lỗi xảy ra. Vui lòng thử lại sau!", "error");
    }
    setIsLoading(false);
  };


  useEffect(() => {
    if(isDetailAsked){
      if (dataAsked) {
        takeDataEmployee();
        handGetDetailWork(dataAsked?.id);
      } else {
        setData(null);
      }
    } else {
      setBranchResponses(null);
      setClarificationRequest(null);
      setTenderPackageResponse(null);
    }
   
  }, [dataAsked, isDetailAsked]);

  
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

  // Gọi hàm khi người dùng nhấn vào nút tải xuống tất cả
  const handleDownloadAll = (attachments) => {
    setDownloadAll(true);
    downloadAndZipFiles(attachments);
  };

  return (
    <div className="detail__asked--item">
      <div className=" d-flex flex-column">
        {/* {data ? ( */}
          <Fragment>
            <div className="body__info--asked">
              <div className="header-status">
                <div className="box-status">
                  <Badge
                    key={dataAsked?.id}
                    text={dataAsked?.status === 0 ? "Chờ phản hồi" : dataAsked?.status === 1 ? "Đã phân công" : dataAsked?.status === 2 ? "Chờ tổng hợp" : "Đã phản hồi"}
                    variant={dataAsked?.status === 0 ? "wait-collect" : dataAsked?.status === 1 ? "done" : dataAsked?.status === 2 ? "wait-collect" : "done"}
                  />
                </div>
                <div className="box-code">
                  <span style={{fontSize: 14, fontWeight: '500', color: '#939394'}}>{dataAsked?.packageProjectCode}</span>
                </div>
              </div>

              <div className="name-bidding">
                <span style={{fontSize: 20, fontWeight: '600'}}>{dataAsked?.tenderPackageName}</span>
              </div>

              <div 
                className="button-handle"
                onClick={() => {
                  setIsHandleRequest(true);
                  // setData();
                }}
              >
                <span className="content">Yêu cầu làm rõ <Icon name='ArrowRight'/></span>
              </div>

              {!isLoading ? 
                <div className="container-detail-asked">
                  <div className="info-package">
                    <div className="box-package">
                      <span style={{fontSize: 16, fontWeight: '500'}}>Gói thầu</span>
                    </div>

                    <div className="box-project">
                      <span className="title">Dự án</span>
                      <div className="content">
                        <Icon name='ProjectorScreen'/>
                        <span className="name">{tenderPackageResponse?.tenderProjectName}</span>
                      </div>
                    </div>

                    <div className="box-company">
                      <span className="title">Bên mời thầu</span>
                      <div className="content">
                        <Icon name='BuildingOffice'/>
                        <span className="name">{tenderPackageResponse?.branchName}</span>
                      </div>
                    </div>

                    <div style={{display: 'flex', marginTop: '1rem', justifyContent: 'space-between'}}>
                      <div className="box-address" style={{width: '49.5%'}}>
                        <span className="title">Địa điểm</span>
                        <div className="content">
                          <Icon name='MapPin'/>
                          <span className="name">{tenderPackageResponse?.location}</span>
                        </div>
                      </div>
                      <div className="box-field" style={{width: '49.5%'}}>
                        <span className="title">Lĩnh vực</span>
                        <div className="content">
                          <Icon name='Cube'/>
                          <span className="name">{tenderPackageResponse?.packageFieldName}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <div className="box-address" style={{width: '49.5%'}}>
                        <span className="title">Ngày mời thầu</span>
                        <div className="content">
                          <Icon name='CalendarDot'/>
                          <span className="name">{tenderPackageResponse?.invitationDate ? moment(tenderPackageResponse?.invitationDate).format('DD/MM/YYYY - HH:mm') : ''}</span>
                        </div>
                      </div>
                      <div className="box-field" style={{width: '49.5%'}}>
                        <span className="title">Ngày đóng thầu</span>
                        <div className="content">
                          <Icon name='CalendarDot'/>
                          <span className="name">{tenderPackageResponse?.closedDate ? moment(tenderPackageResponse?.closedDate).format('DD/MM/YYYY - HH:mm') : ''}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{border: '1px solid', borderColor: '#EEEEEF', marginTop: '1rem'}}/>

                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <div className="box-address" style={{width: '49.5%'}}>
                        <span className="title">Đầu mối phụ trách</span>
                        <div className="content">
                          <Icon name='UserRed'/>
                          <span className="name">{tenderPackageResponse?.employeeName}</span>
                        </div>
                      </div>
                      <div className="box-email" style={{width: '49.5%'}}>
                        <span className="title">Email</span>
                        <div className="content">
                          <Icon name='Envelope'/>
                          <span className="name">{tenderPackageResponse?.employeeEmail}</span>
                        </div>
                      </div>
                    </div>

                    <div className="box-phone">
                      <span className="title">Số điện thoại liên hệ</span>
                      <div className="content">
                        <Icon name='PhoneRed'/>
                        <span className="name">{tenderPackageResponse?.employeePhone}</span>
                      </div>
                    </div>


                  </div>

                  <div className="info-bidding">
                    <div>
                      <span style={{fontSize: 16, fontWeight: '500'}}>Bên dự thầu</span>
                    </div>

                    <div className="box-bid">
                      <span className="title">Tên nhà thầu</span>
                      <div className="content">
                        <Icon name='Buildings'/>
                        <span className="name">{branchResponses?.orgName}</span>
                      </div>
                    </div>

                    <div className="box-bid">
                      <span className="title">Mã số thuế doanh nghiệp</span>
                      <div className="content">
                        <Icon name='Hash'/>
                        <span className="name">{branchResponses?.orgTaxcode}</span>
                      </div>
                    </div>

                    <div className="box-address">
                      <span className="title">Địa chỉ</span>
                      <div className="content">
                        <Icon name='MapPin'/>
                        <span className="name">{branchResponses?.orgAddress}</span>
                      </div>
                    </div>

                    <div style={{border: '1px solid', borderColor: '#EEEEEF', marginTop: '1rem'}}/>

                    <div className="box-address">
                      <span className="title">Tên người liên hệ</span>
                      <div className="content">
                        <Icon name='UserRed'/>
                        <span className="name">{branchResponses?.contactName}</span>
                      </div>
                    </div>
                    
                    <div className="box-email">
                      <span className="title">Email/ Tên đăng nhập</span>
                      <div className="content">
                        <Icon name='Envelope'/>
                        <span className="name">{branchResponses?.contactEmail}</span>
                      </div>
                    </div>

                    <div className="box-phone">
                      <span className="title">Số điện thoại</span>
                      <div className="content">
                        <Icon name='PhoneRed'/>
                        <span className="name">{branchResponses?.contactPhone}</span>
                      </div>
                    </div>

                  </div>
                </div>
                : <Loading />
              }

            </div>
          </Fragment>
        {/* ) : (
          <Loading />
        )} */}
      </div>
      <HandleRequestModal
        data={clarificationRequest}
        dataAsked={clarificationRequest || dataAsked}
        tenderPackageResponse={tenderPackageResponse}
        onShow={isHandleRequest}
        onHide={(reload) => {
          if(reload){
            handGetDetailWork(dataAsked?.id);
          }
          setIsHandleRequest(false);
        }}
      />
      <Dialog content={contentDialog} isOpen={showDialog} />
    </div>
  );
};

export default memo(DetailAsked);

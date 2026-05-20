import React, { Fragment, useState, useEffect, useMemo, useRef, useContext } from "react";
import { IActionModal } from "model/OtherModel";
import Icon from "components/icon";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import "./ModalAddBidding.scss";
import { formatFileSize, handDownloadFileOrigin, showToast } from "utils/common";
import { useNavigate } from "react-router-dom";
import SelectCustom from "components/selectCustom/selectCustom";
import TenderPackageService from "services/TenderPackageService";
import SupplierService from "services/SupplierService";
import ModalConfirmAdd from "./ModalConfirmAdd/ModalConfirmAdd";
// import ModalConfirmCancel from "./ModalConfirmCancel/ModalConfirmCancel";

export default function ModalAddBidding({ onShow, onHide, data }) {
    
    const navigation = useNavigate();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [biddingData, setBiddingData] = useState(null);
    const [contactData, setContactData] = useState(null);
    const [isConfirmAdd, setIsConfirmAdd] = useState(false);

    const getDetailBidding = async (organizationId, packageId, data) => {
        setIsLoading(true);
        const params = {
            organizationId: organizationId,
            packageId: packageId
        }
        
        const response = await TenderPackageService.listSubmittedDocument(params);
        if (response.code === 0) {
            const result = response.result;
           
            
        } else {
          showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if(onShow && data){
            // getDetailBidding(data?.organizationId, data?.packageId, data);
        }
    }, [onShow, data]);

    const loadedOptionSupplier = async (search, loadedOptions, { page }) => {
        const param: any = {
          name: search,
          page: page,
          limit: 10,
          active: 1
        };
    
        const response = await SupplierService.list(param);
    
        if (response.code === 0) {
          const dataOption = response.result.items;
    
          return {
            options: [
              ...(dataOption.length > 0
                ? dataOption.map((item) => {
                    return {
                      value: item.id,
                      label: item.id + " - " + item.name,
                      listContact: item.contactOrg && JSON.parse(item.contactOrg) && JSON.parse(item.contactOrg).map(el => {
                        return {
                            label: el.name,
                            value: el.id,
                            email: el.email,
                            phone: el.phone
                        }
                      }),
                      taxCode: item.taxCode,
                      name: item.name,
                      phone: item.phone,
                      address: item.address
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

  const onSubmit = async (e) => {
    e.preventDefault();

    if(!biddingData?.value){
        showToast("Nhà thầu không được để trống", "error");
        return;
    }
   
    if(!contactData?.value){
        showToast("Người liên hệ không được để trống", "error");
        return;
    }

    setIsConfirmAdd(true);

    
    setIsSubmit(true);

    // const body = {
    //   attachments: JSON.stringify(listAttactment) || '[]',
    //   content: content,
    //   detailId: data?.id,
    // }

    // console.log('body', body);

    // const response = await ManagementAskedService.saveReply(body);

    // if (response.code === 0) {
    //     showToast(`Lưu thông tin trả lời thành công`, "success");
    // } else {
    //     showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    // }

    setIsSubmit(false);
  }

  const actions = useMemo<IActionModal>(
    () => ({
      actions_right: {
        buttons: [
            {
                title: "Huỷ",
                color: "primary",
                variant: "outline",
                disabled: isSubmit,
                callback: () => {
                    handleClear(false);
                },
            },
            {
                title: "Bổ sung",
                type: "submit",
                color: "primary",
                disabled: isSubmit || !biddingData?.value || !contactData?.value,
                is_loading: isSubmit,
            },
        ],
      },
    }),
    [
        isSubmit,
        data,
        biddingData,
        contactData
    ]
  );

  const handleClear = (acc) => {
    onHide(acc);
    setIsConfirmAdd(false);
    setBiddingData(null);
    setContactData(null);
  }

  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        toggle={() => !isSubmit && handleClear(false)}
        className="modal-add-bidding"
        size="md"
      >
        <form className="form-add-bidding" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader title={`Bổ sung nhà thầu`} toggle={() => !isSubmit && handleClear(false)} />
          <ModalBody>
            <div className='container-add-bidding'>
                <div className="body-add-bidding">
                    <div className="info-bidding">

                        {/* <div className="box-bid">
                            <span className="title">Tên nhà thầu</span>
                            <div className="content">
                                <Icon name='Buildings'/>
                                <span className="name">Tên nhà thầu</span>
                            </div>
                        </div> */}
                        <div>
                            <SelectCustom
                                id="supplierId"
                                name="supplierId"
                                label="Tên nhà thầu"
                                fill={true}
                                options={[]}
                                value={biddingData}
                                required={true}
                                onChange={(e) => {
                                    setBiddingData(e);
                                    setContactData(null);
                                }}
                                isAsyncPaginate={true}
                                isFormatOptionLabel={false}
                                loadOptionsPaginate={loadedOptionSupplier}
                                placeholder="Chọn nhà thầu"
                                additional={{
                                  page: 1,
                                }}
                                // formatOptionLabel={formatOptionLabel}
                            />
                        </div> 

                        <div className="box-bid">
                            <span className="title">Mã số thuế doanh nghiệp</span>
                            <div className="content">
                                <Icon name='Hash'/>
                                <span className="name">{biddingData?.taxCode}</span>
                            </div>
                        </div>

                        <div className="box-address">
                            <span className="title">Địa chỉ</span>
                            <div className="content">
                                <Icon name='MapPin'/>
                                <span className="name">{biddingData?.address}</span>
                            </div>
                        </div>

                        <div style={{border: '1px solid', borderColor: '#EEEEEF', marginTop: '1rem'}}/>

                        <div>
                            <SelectCustom
                                id="contactId"
                                name="contactId"
                                label="Tên người liên hệ"
                                fill={true}
                                options={biddingData?.listContact || []}
                                special={true}
                                value={contactData}
                                required={true}
                                disabled={!biddingData ? true : false}
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
            
                        <div className="box-email">
                            <span className="title">Email/ Tên đăng nhập</span>
                            <div className="content">
                                <Icon name='Envelope'/>
                                <span className="name">{contactData?.email}</span>
                            </div>
                        </div>

                        <div className="box-phone">
                            <span className="title">Số điện thoại</span>
                            <div className="content">
                                <Icon name='PhoneRed'/>
                                <span className="name">{contactData?.phone}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
          </ModalBody>
          <ModalFooter actions={actions} />
        </form>
      </Modal>

      <ModalConfirmAdd
        onShow={isConfirmAdd}
        biddingData={biddingData}
        contactData={contactData}
        packageId={data?.id}
        onHide={(reload) => {
          if (reload) {
            handleClear(true);
          }
          setIsConfirmAdd(false);
        }}
      />

      <Dialog content={contentDialog} isOpen={showDialog} />
      
    </Fragment>
  );
}

import React, { Fragment, useState, useEffect, useMemo, useRef, useContext } from "react";
import { IActionModal } from "model/OtherModel";
import Icon from "components/icon";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import "./ModalBidOpen.scss";
import { formatFileSize, handDownloadFileOrigin, showToast } from "utils/common";
import { useNavigate } from "react-router-dom";
import ImageThirdGender from "assets/images/third-gender.png";
import SelectCustom from "components/selectCustom/selectCustom";
import TenderPackageService from "services/TenderPackageService";
import EmployeeService from "services/EmployeeService";
import ConfirmBidOpenModal from "./ConfirmBidOpenModal/ConfirmBidOpenModal";
import ButtonOnOff from "components/ButtonOnOff/ButtonOnOff";
// import ModalConfirmCancel from "./ModalConfirmCancel/ModalConfirmCancel";

export default function ModalBidOpen({ onShow, onHide, data, detailTenderPackage }) {
    console.log('detailTenderPackage', detailTenderPackage);
    
    const navigation = useNavigate();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
    const [isLoading, setIsLoading] = useState(true);
    const[isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [viewFinance, setViewFinance] = useState(0);

    const [listRound, setListRound] = useState([
      {
        round: 1
      }
    ])

    const [tableTechnicalEmployees, setTableTechnicalEmployees] = useState([
      {
        employeeId: null,
        employeeName: ''
      }
    ])
    console.log('tableTechnicalEmployees', tableTechnicalEmployees);

    const [tableFinanceEmployees, setTableFinanceEmployees] = useState([
      {
        employeeId: null,
        employeeName: ''
      }
    ])

    useEffect(() => {
      if(detailTenderPackage && onShow){
        const dataEmployees = [
          ...(detailTenderPackage?.employeeIdBom ? [{employeeId: detailTenderPackage?.employeeIdBom, employeeName: detailTenderPackage?.employeeBomName}] : []),
          ...(detailTenderPackage?.employeeIdBoq ? [{employeeId: detailTenderPackage?.employeeIdBoq, employeeName: detailTenderPackage?.employeeBoqName}] : []),
          ...(detailTenderPackage?.employeeIdDesign ? [{employeeId: detailTenderPackage?.employeeIdDesign, employeeName: detailTenderPackage?.employeeDesignName}] : []),
          ...(detailTenderPackage?.employeeIdEngineer ? [{employeeId: detailTenderPackage?.employeeIdEngineer, employeeName: detailTenderPackage?.employeeEngineerName}] : []),
          ...(detailTenderPackage?.employeeIdExperiment ? [{employeeId: detailTenderPackage?.employeeIdExperiment, employeeName: detailTenderPackage?.employeeExperimentName}] : []),
          ...(detailTenderPackage?.employeeIdSow ? [{employeeId: detailTenderPackage?.employeeIdSow, employeeName: detailTenderPackage?.employeeSowName}] : []),
          ...(detailTenderPackage?.employeeIdSplcontact ? [{employeeId: detailTenderPackage?.employeeIdSplcontact, employeeName: detailTenderPackage?.employeeSplcontactName}] : []),
        ]

        // console.log('dataEmployees', dataEmployees);

        //bỏ đi những nhân viên bị trùng lặp
        const uniqueEmployees = dataEmployees.filter(
          (item, index, self) =>
            index === self.findIndex((e) => e.employeeId === item.employeeId)
        );

        setTableTechnicalEmployees(uniqueEmployees);
        
        
        // setTableTechnicalEmployees([
        //   ...(detailTenderPackage?.employeeIdBom ? [{employeeId: detailTenderPackage?.employeeIdBom, employeeName: detailTenderPackage?.employeeBomName}] : []),
        //   ...(detailTenderPackage?.employeeIdBoq ? [{employeeId: detailTenderPackage?.employeeIdBoq, employeeName: detailTenderPackage?.employeeBoqName}] : []),
        //   ...(detailTenderPackage?.employeeIdDesign ? [{employeeId: detailTenderPackage?.employeeIdDesign, employeeName: detailTenderPackage?.employeeDesignName}] : []),
        //   ...(detailTenderPackage?.employeeIdEngineer ? [{employeeId: detailTenderPackage?.employeeIdEngineer, employeeName: detailTenderPackage?.employeeEngineerName}] : []),
        //   ...(detailTenderPackage?.employeeIdExperiment ? [{employeeId: detailTenderPackage?.employeeIdExperiment, employeeName: detailTenderPackage?.employeeExperimentName}] : []),
        //   ...(detailTenderPackage?.employeeIdSow ? [{employeeId: detailTenderPackage?.employeeIdSow, employeeName: detailTenderPackage?.employeeSowName}] : []),
        //   ...(detailTenderPackage?.employeeIdSplcontact ? [{employeeId: detailTenderPackage?.employeeIdSplcontact, employeeName: detailTenderPackage?.employeeSplcontactName}] : []),
        // ])

        setTableFinanceEmployees([
          {
            employeeId: detailTenderPackage?.employeeId,
            employeeName: detailTenderPackage?.employeeName
          }
        ])
      }
    }, [detailTenderPackage, onShow])
    

    const getDetailBidding = async (organizationId, packageId) => {
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
            // getDetailBidding(data?.organizationId, data?.packageId);
        }
    }, [onShow, data])


    const loadedOptionTechnicalEmployee = async (search, loadedOptions, { page }) => {
      const param: any = {
        name: search,
        page: page,
        limit: 10,
      };
  
      const response = await EmployeeService.list(param);
  
      if (response.code === 0) {
        // const dataOption = (response.result.items || []);

        const dataOption = (response.result.items || []).filter((item) => {
          return !tableTechnicalEmployees.some((el) => el.employeeId === item.id);
        });
  
        return {
          options: [
            ...(dataOption.length > 0
              ? dataOption.map((item) => {
                  return {
                    value: item.id,
                    label: item.name,
                    avatar: item.avatar,
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

    const loadedOptionFinanceEmployee = async (search, loadedOptions, { page }) => {
      const param: any = {
        name: search,
        page: page,
        limit: 10,
      };
  
      const response = await EmployeeService.list(param);
  
      if (response.code === 0) {
        // const dataOption = (response.result.items || []);

        const dataOption = (response.result.items || []).filter((item) => {
          return !tableFinanceEmployees.some((el) => el.employeeId === item.id);
        });
  
        return {
          options: [
            ...(dataOption.length > 0
              ? dataOption.map((item) => {
                  return {
                    value: item.id,
                    label: item.name,
                    avatar: item.avatar,
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
  
    const formatOptionLabelEmployee = ({ label, avatar }) => {
      return (
        <div className="selected--item">
          <div className="avatar">
            <img src={avatar || ImageThirdGender} alt={label} />
          </div>
          {label}
        </div>
      );
    };
  
  const handleChangeEmployeeTechnical = (e, index) => {
    setTableTechnicalEmployees((current) =>
      current.map((obj, idx) => {
          if (index === idx) {
              return { ...obj, employeeId: e.value, employeeName: e.label };
          }
          return obj;
      })
    );
  };

  const handleChangeEmployeeFinance = (e, index) => {
    setTableFinanceEmployees((current) =>
      current.map((obj, idx) => {
          if (index === idx) {
              return { ...obj, employeeId: e.value, employeeName: e.label };
          }
          return obj;
      })
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsConfirmOpen(true);
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
                title: "Đóng",
                color: "primary",
                variant: "outline",
                disabled: isSubmit,
                callback: () => {
                    handleClear(false);
                },
            },
            {
                title:  "Hoàn tất",
                type: "submit",
                color: "primary",
                disabled: isSubmit, 
                // || !isDifferenceObj(formData, values),
                is_loading: isSubmit,
            },
        ],
      },
    }),
    [
        isSubmit,
        data,
    ]
  );

  const handleClear = (acc) => {
    onHide(acc);
    setIsConfirmOpen(false);
    setViewFinance(0);
    setTableTechnicalEmployees([
      {
        employeeId: null,
        employeeName: ''
      }
    ]);
    setTableFinanceEmployees([
      {
        employeeId: null,
        employeeName: ''
      }
    ])
  }

  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        toggle={() => !isSubmit && handleClear(false)}
        className="modal-bid-open"
        size="lg"
      >
        <form className="form-bid-open" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader title={'Mở thầu'} toggle={() => !isSubmit && handleClear(false)} />
          <ModalBody>
            <div className='container-bid-open'>
                <div className="list-round">
                  {listRound.map((item, index) => (
                    <div key={index} className="item-round">
                      <span style={{fontSize: 14, fontWeight: '500'}}>Lần {item.round}</span>
                    </div>
                  ))}
                  
                </div>

                <div className="technical-profile">
                  <div style={{display:'flex', alignItems:'center', justifyContent: 'space-between'}}>
                    <span style={{fontSize: 12, fontWeight: '700', color:'#454B54'}}>Hồ sơ kỹ thuật</span>
                    <div style={{display:'flex', alignItems:'center', gap: '0 1rem' }}>
                      <span style={{fontSize: 12, fontWeight: '500'}}>Kèm theo hồ sơ tài chỉnh</span>
                      <ButtonOnOff
                        checked={viewFinance === 1 ? true : false}
                        onChange={(value) => {
                          if (viewFinance === 1) {
                            setViewFinance(0);
                          } else {
                            setViewFinance(1);
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="table-list-employees-technical">
                    <div className="table-header">
                      <div className="box-stt">
                        <span style={{fontSize: 12, fontWeight: '600', color: '#8F97A3'}}>STT</span>
                      </div>
                      <div className="box-employee">
                        <span style={{fontSize: 12, fontWeight: '600', color: '#8F97A3'}}>Người đánh giá</span>
                      </div>
                    </div>

                    <div className="table-body">
                      {tableTechnicalEmployees && tableTechnicalEmployees.length > 0 ? 
                        tableTechnicalEmployees.map((item, index) => (
                          <div key={index} className="item-employee">
                            <div className="box-stt">
                              <span style={{fontSize: 12, fontWeight: '600', color: '#8F97A3'}}>{index + 1}</span>
                            </div>
                            <div className="box-employee">
                              <div className="select-employee">
                                <SelectCustom
                                  id="employeeId"
                                  name="employeeId"
                                  label=""
                                  options={[]}
                                  fill={true}
                                  value={item.employeeId ? {value: item.employeeId, label: item.employeeName} : null}
                                  onChange={(e) => handleChangeEmployeeTechnical(e, index)}
                                  isAsyncPaginate={true}
                                  isFormatOptionLabel={true}
                                  placeholder="Chọn người đánh giá"
                                  additional={{
                                    page: 1,
                                  }}
                                  loadOptionsPaginate={loadedOptionTechnicalEmployee}
                                  formatOptionLabel={formatOptionLabelEmployee}
                                />
                              </div>
                              {tableTechnicalEmployees.length > 1 ? 
                                <div 
                                  className="button-delete"
                                  onClick={() => {
                                    const newData = [...tableTechnicalEmployees];
                                    newData.splice(index, 1);
                                    setTableTechnicalEmployees(newData);
                                  }}
                                >
                                  <Icon name='Times'/>
                                </div>
                              : null}
                            </div>
                          </div>
                        ))
                        
                      : null}
                    </div>

                    <div className="table-footer">
                      <div 
                        className="button-add-employee"
                        onClick={() => {
                          setTableTechnicalEmployees([
                            ...tableTechnicalEmployees, 
                            {
                              employeeId: null,
                              employeeName: ''
                            }
                          ])
                        }}
                      >
                        <Icon name='AddBidding'/>
                        <span style={{fontSize: 14, fontWeight: '500'}}>Thêm người đánh giá</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="finance-profile">
                  <div>
                    <span style={{fontSize: 12, fontWeight: '700', color:'#454B54'}}>Hồ sơ tài chính</span>
                  </div>

                  <div className="table-list-employees-finance">
                    <div className="table-header">
                      <div className="box-stt">
                        <span style={{fontSize: 12, fontWeight: '600', color: '#8F97A3'}}>STT</span>
                      </div>
                      <div className="box-employee">
                        <span style={{fontSize: 12, fontWeight: '600', color: '#8F97A3'}}>Người đánh giá</span>
                      </div>
                    </div>

                    <div className="table-body">
                      {tableFinanceEmployees && tableFinanceEmployees.length > 0 ? 
                        tableFinanceEmployees.map((item, index) => (
                          <div key={index} className="item-employee">
                            <div className="box-stt">
                              <span style={{fontSize: 12, fontWeight: '600', color: '#8F97A3'}}>{index + 1}</span>
                            </div>
                            <div className="box-employee">
                              <div className="select-employee">
                                <SelectCustom
                                  id="employeeId"
                                  name="employeeId"
                                  label=""
                                  options={[]}
                                  fill={true}
                                  value={item.employeeId ? {value: item.employeeId, label: item.employeeName} : null}
                                  onChange={(e) => handleChangeEmployeeFinance(e, index)}
                                  isAsyncPaginate={true}
                                  isFormatOptionLabel={true}
                                  placeholder="Chọn người đánh giá"
                                  additional={{
                                    page: 1,
                                  }}
                                  loadOptionsPaginate={loadedOptionFinanceEmployee}
                                  formatOptionLabel={formatOptionLabelEmployee}
                                />
                              </div>
                              {tableFinanceEmployees.length > 1 ? 
                                <div 
                                  className="button-delete"
                                  onClick={() => {
                                    const newData = [...tableFinanceEmployees];
                                    newData.splice(index, 1);
                                    setTableFinanceEmployees(newData);
                                  }}
                                >
                                  <Icon name='Times'/>
                                </div>
                              : null}
                            </div>
                          </div>
                        ))
                        
                      : null}
                    </div>

                    {/* <div className="table-footer">
                      <div 
                        className="button-add-employee"
                        onClick={() => {
                          setTableFinanceEmployees([
                            ...tableFinanceEmployees, 
                            {
                              employeeId: null,
                              employeeName: ''
                            }
                          ])
                        }}
                      >
                        <Icon name='AddBidding'/>
                        <span style={{fontSize: 14, fontWeight: '500'}}>Thêm người đánh giá</span>
                      </div>
                    </div> */}
                  </div>
                </div>

            </div>
          </ModalBody>
          <ModalFooter actions={actions} />
        </form>
      </Modal>

      <ConfirmBidOpenModal
        onShow={isConfirmOpen}
        viewFinance={viewFinance}
        tableTechnicalEmployees={tableTechnicalEmployees}
        tableFinanceEmployees={tableFinanceEmployees}
        data={detailTenderPackage}
        onHide={(reload) => {
          if (reload) {
            handleClear(false);
          }
          setIsConfirmOpen(false);
        }}
      />

      <Dialog content={contentDialog} isOpen={showDialog} />
      
    </Fragment>
  );
}

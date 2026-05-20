import React, { Fragment, memo, useCallback, useEffect, useRef, useState } from "react";
import Loading from "components/loading";
import { handDownloadFileOrigin, showToast } from "utils/common";
import "./TabEvaluationResults.scss";
import TenderPackageService from "services/TenderPackageService";
import BoxTable from "components/boxTable/boxTable";
import { IAction } from "model/OtherModel";
import ButtonComponent from "components/ButtonComponent/ButtonComponent";
import ModalBiddingProfile from "../ModalBiddingProfile/ModalBiddingProfile";

const TabEvaluationResults = (props: any) => {
  const { setModalSendResult, detailTenderPackage } = props;

  const [showModalBiddingProfile, setShowModalBiddingProfile] = useState(false);
  const [dataBidding, setDataBidding] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [listRound, setListRound] = useState([
    {
        round: 1,    
    }
  ])

  const [listEvaluation, setListEvaluation] = useState([])
  console.log('listEvaluation', listEvaluation);
  const [dataHeader, setDataHeader] = useState([]);
  const [formatHeader, setFormatHeader] = useState([]);

  useEffect(() => {
    if(detailTenderPackage?.id){
        getResultDocumentEvaluation(detailTenderPackage.id);
        getResultFinanceEvaluation(detailTenderPackage.id);
    }
  }, [detailTenderPackage])
  
//   useEffect(() => {
//     if(data && data.length > 0){
//         const listEmployee = data[0].employee.map(item => item.name);
//         setDataHeader(listEmployee);
//         setFormatHeader(listEmployee.map(item => "text-center"))

//         const dataBidding = data.map(item => {
//             const listValue = item.employee.map(el => el.value)
//             return {
//                 organizationName: item.organizationName,
//                 listValue: listValue
//             }
//         });
//         setListEvaluation(dataBidding);
//     }
//   }, [data]);

//   const [params, setParams] = useState<any>({
//     name: "",
//     limit: 10,
//     page: 1,
//   });

//   const [pagination, setPagination] = useState<PaginationProps>({
//     ...DataPaginationDefault,
//     name: "nhà thầu",
//     isChooseSizeLimit: true,
//     setPage: (page) => {
//       setParams((prevParams) => ({ ...prevParams, page: page }));
//     },
//     chooseSizeLimit: (limit) => {
//       setParams((prevParams) => ({ ...prevParams, limit: limit }));
//     },
//   });

  //Hồ sơ tài chính
  const getResultDocumentEvaluation = async (packageId: any, disableLoading?: boolean) => {
    if (!disableLoading) {
      setIsLoading(true);
    }

    const params = {
        packageId: packageId
    }

    const response = await TenderPackageService.getResultDocumentEvaluation(params);

    if (response.code === 0) {
      const result = response.result;
      const listEmployee = result.reviewerResponseList.map(item => item.employeeName) || [] ;
      setDataHeader(listEmployee);
      setFormatHeader(listEmployee.map(item => "text-center"));

    //   const dataBidding = result?.evaluationDataResponseList.map(item => {
    //     const listValue = item.employee.map(el => el.value)
    //     return {
    //         organizationName: item?.organizationResponse?.organizationName || '',
    //         listValue: listValue

    //     }
    //   });
        const dataBidding = result?.evaluationDataResponseList && result?.evaluationDataResponseList?.length > 0 && result?.evaluationDataResponseList.map(item => {
            // const listValue = item.employee.map(el => el.value);
            const listValue = item.evaluationScoreResponseLst.map(el => {
                return {
                    value: `${el.totalQualifiedQuantity}/${el.totalDocument - 1}`,
                    employeeId: el.employeeId
                }
            })
            return {
                organizationId: item?.organizationResponse.organizationId,
                organizationName: item?.organizationResponse?.organizationName || '',
                listValue: listValue
            }
        }) || [];

        setListEvaluation(dataBidding);

    //   setPagination({
    //     ...pagination,
    //     page: +result.page,
    //     sizeLimit: params.limit ?? DataPaginationDefault.sizeLimit,
    //     totalItem: +result.total,
    //     totalPage: Math.ceil(+result.total / +(params.limit ?? DataPaginationDefault.sizeLimit)),
    //   });
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setIsLoading(false);
  };


  const titles = [
    "Nhà thầu",
    ...dataHeader
  ];

  const dataFormat = ["", ...formatHeader];

  const dataMappingArray = (item: any, index: number, type?: string) => [
    // getPageOffset(params) + index + 1,
    item.organizationName,
    ...item.listValue?.map(el => {
        return (
            <div 
                className="custom-value"
                onClick={() => {
                    setDataBidding({
                        packageId: detailTenderPackage?.id,
                        organizationId: item.organizationId,
                        employeeId: el.employeeId
                    });
                    setShowModalBiddingProfile(true);
                }}
            >
                {el.value}
            </div>
        )
    }) ,
    // <div className="custom-value">
    //     {item.value_1}
    // </div>,
  ];

  //Hồ sơ tài chính
  const [listFinanceEvaluation, setListFinanceEvaluation] = useState([]);
  const getResultFinanceEvaluation = async (packageId: any, disableLoading?: boolean) => {
    const params = {
        packageId: packageId
    }

    const response = await TenderPackageService.getResultFinanceEvaluation(params);

    if (response.code === 0) {
      const result = response.result;
      setListFinanceEvaluation(result);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  const actionsTable = (item: any): IAction[] => {
    return [
   
    ].filter((action) => action);
  };


  return (
    <div className="container-evaluation-results">
        <div style={{display:'flex', width: '100%', justifyContent:'space-between'}}>
            <div className="list-round">
                {listRound.map((item, index) => (
                    <div key={index} className="item-round">
                        <span style={{fontSize: 14, fontWeight: '500'}}>Lần {item.round}</span>
                    </div>
                ))}
            </div>

            <ButtonComponent
                name='Phản hồi kết quả'
                callback={() => {
                    setModalSendResult(true);
                }}
            />

        </div>

        <div className="technical-profile">
            <div className="container-header">
                <div>
                    <span style={{fontSize: 14, fontWeight: '500'}}>Hồ sơ kỹ thuật</span>
                </div>
                {/* <div>
                    <span style={{fontSize: 12, fontWeight: '500', color: '#939394'}}>Cập nhật lần cuối: 10/04/2024 - 09:50</span>
                </div> */}
            </div>

            <div className="table-list-evaluation">
                {!isLoading && listEvaluation && listEvaluation.length > 0 ? (
                    <BoxTable
                        name="gói thầu"
                        titles={titles}
                        items={listEvaluation}
                        isPagination={false}
                        // dataPagination={pagination}
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
                    ) : isLoading ? (
                        <Loading />
                    ) : (
                        <div style={{display: 'flex', justifyContent:'center'}}>
                            <span>Chưa có đánh giá nào</span>
                        </div>
                    )
                }
            </div>
        </div>

        <div className="finance-profile">
            <div className="container-header">
                <div>
                    <span style={{fontSize: 14, fontWeight: '500'}}>Hồ sơ tài chính</span>
                </div>
                {/* <div>
                    <span style={{fontSize: 12, fontWeight: '500', color: '#939394'}}>Cập nhật lần cuối: 10/04/2024 - 09:50</span>
                </div> */}
            </div>

            {listFinanceEvaluation && listFinanceEvaluation.length > 0 ? 
                <div className="table-list-evaluation">
                    <div className="table-header">
                        <div className="box-stt">
                            <span style={{fontSize: 12, fontWeight: '600', color: '#939394'}}>Thứ tự</span>
                        </div>
                        <div className="box-bidding">
                            <span style={{fontSize: 12, fontWeight: '600', color: '#939394'}}>Nhà thầu</span>
                        </div>
                    </div>

                    {listFinanceEvaluation.map((item, index) => (
                        <div className="item-evaluation">
                            <div className="box-stt">
                                <span style={{fontSize: 14, fontWeight: '400', color: '#ED1B34'}}>Số {item.position}</span>
                            </div>
                            <div className="box-bidding">
                                <span style={{fontSize: 14, fontWeight: '400', color: '#2C2C2C'}}>{item.organizationName}</span>
                            </div>
                        </div>
                    ))}
                    
                </div>
                : 
                <div style={{display: 'flex', justifyContent:'center'}}>
                    <span>Chưa có đánh giá nào</span>
                </div>
            }
        </div>
        <ModalBiddingProfile
            data={dataBidding}
            listValue={[]}
            viewResult={true}
            dataWork={null}
            disabled={true}
            evaluationType={'technical'}
            onShow={showModalBiddingProfile}
            onHide={(reload) => {
                if(reload){
                    // getListTenderPackage(params);
                }
                setShowModalBiddingProfile(false);
                setDataBidding(null);
            }}
        />
    </div>
  );
};

export default memo(TabEvaluationResults);

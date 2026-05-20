import React, { Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import "./TenderPackageList.scss";
import Icon from "components/icon";
import Loading from "components/loading";
import BoxTable from "components/boxTable/boxTable";
import TitleAction, { ITitleActions } from "components/titleAction/titleAction";
import { DataPaginationDefault, PaginationProps } from "components/pagination/pagination";
import { SystemNotification } from "components/systemNotification/systemNotification";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import { BulkActionItemModel } from "components/bulkAction/bulkAction";
import { IAction, IOption, ISaveSearch } from "model/OtherModel";
import { showToast } from "utils/common";
import { getPageOffset, isDifferenceObj } from "reborn-util";
import _, { set } from "lodash";
import HeaderFilter from "components/HeaderFilter/HeaderFilter";
import { ContextType, UserContext } from "contexts/userContext";
import Tippy from "@tippyjs/react";
import Badge from "components/badge/badge";
import moment from "moment";
import ManagementAskedService from "services/ManagementAskedService";
import TenderPackageService from "services/TenderPackageService";
import FilterModal from "./FilterModal/FilterModal";
import DetailTenderPackage from "./DetailTenderPackage/DetailTenderPackage";

export default function TenderPackageList(props: any) {
  document.title = "Quản lý dự thầu";
  const location = useLocation();
  const [searchParams] = useSearchParams();
  

  const isMounted = useRef(false);
  const { dataInfoEmployee } = useContext(UserContext) as ContextType;

  const [listTenderPackage, setListTenderPackage] = useState([]);
  const [dataTenderPackage, setDataTenderPackage] = useState(null);
  const [listIdChecked, setListIdChecked] = useState<number[]>([]);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNoItem, setIsNoItem] = useState<boolean>(false);
  const [isPermissions, setIsPermissions] = useState<boolean>(false);
  const [isDetailTenderPackage, setIsDetailTenderPackage] = useState<boolean>(false);  

  const [params, setParams] = useState<any>({
    name: "",
    limit: 10,
    page: 1,
  });


  const [pagination, setPagination] = useState<PaginationProps>({
    ...DataPaginationDefault,
    name: "gói thầu",
    isChooseSizeLimit: true,
    setPage: (page) => {
      setParams((prevParams) => ({ ...prevParams, page: page }));
    },
    chooseSizeLimit: (limit) => {
      setParams((prevParams) => ({ ...prevParams, limit: limit }));
    },
  });

  const abortController = new AbortController();

  const getListTenderPackage = async (paramsSearch: any, disableLoading?: boolean) => {
    if (!disableLoading) {
      setIsLoading(true);
    }

    const response = await TenderPackageService.list(paramsSearch, abortController.signal);

    if (response.code === 0) {
      const result = response.result;
      setListTenderPackage(result?.items);

      setPagination({
        ...pagination,
        page: +result.page,
        sizeLimit: params.limit ?? DataPaginationDefault.sizeLimit,
        totalItem: +result.total,
        totalPage: Math.ceil(+result.total / +(params.limit ?? DataPaginationDefault.sizeLimit)),
      });

      if (+result.total === 0 && +result.page === 1) {
        setIsNoItem(true);
      }
    } else if (response.code == 400) {
      setIsPermissions(true);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const paramsTemp = _.cloneDeep(params);
    setParams((prevParams) => ({ ...prevParams, ...paramsTemp }));
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (isMounted.current === true) {
      getListTenderPackage(params);
      const paramsTemp = _.cloneDeep(params);
      if (paramsTemp.limit === 10) {
        delete paramsTemp["limit"];
      }
      Object.keys(paramsTemp).map(function (key) {
        paramsTemp[key] === "" ? delete paramsTemp[key] : null;
      });
    }

    return () => {
      abortController.abort();
    };
  }, [params]);

  const titleActions: ITitleActions = {
    actions: [
    //   ...(dataInfoEmployee?.isOwner === 1
    //     ? [
    //         {
    //           icon: <Icon name="Plus" style={{ width: 13, height: 13 }} />,
    //           title: "Thêm mới",
    //           callback: () => {
    //             setDataAsked(null);
    //             setShowModalAdd(true);
    //             setIsView(false);
    //           },
    //         },
    //       ]
    //     : []),
    ],
  };

  const titles = [
    "STT",
    "Mã gói thầu",
    "Tên gói thầu",
    "Dự án",
    "Lĩnh vực",
    "Trạng thái",
  ];

  const dataFormat = ["text-center", "", "", "", "", "text-center"];

  const dataMappingArray = (item: any, index: number, type?: string) => [
    getPageOffset(params) + index + 1,
    item.code,
    <div
        className="title-name"
        onClick={() => {
          setDataTenderPackage(item);
          setIsDetailTenderPackage(true);
        }}
        style={{ cursor: "pointer" }}
    >
        {item.name}
    </div>,
    item.projectName,
    item.fieldName,
    <Badge
      key={item.id}
      text={item.status === 0 ? "Đã đóng" : item.status === 1 ? "Chưa đóng thầu" : item.status === 2 ? "Xin gia hạn" : ""}
      variant={item.status === 0 ? "done" : item.status === 1 ? "wait-collect" : item.status === 2 ? "extend" : "done"}
    />,
    item.createdTime ? moment(item.createdTime).format('DD/MM/YYYY HH:mm') : ''
  ];

  const actionsTable = (item: any): IAction[] => {
    return [
    //   ...(dataInfoEmployee?.isOwner === 1
    //     ? [
    //         {
    //           title: listIdChecked.length > 0 ? "" : "Sửa",
    //           disabled: listIdChecked.length > 0 ? true : false,
    //           icon: <Icon name="PencilSimpleLine" className={listIdChecked.length > 0 ? "icon-edit-inactive" : "icon-edit-active"} />,
    //           callback: () => {
    //             if (listIdChecked.length === 0) {
    //               setDataInvestor(item);
    //               setShowModalAdd(true);
    //               setIsView(false);
    //             }
    //           },
    //         },
    //         {
    //           title: listIdChecked.length > 0 ? "" : "Xóa",
    //           disabled: listIdChecked.length > 0 ? true : false,
    //           icon: <Icon name="TrashRox" className={listIdChecked.length > 0 ? "icon-delete-inactive" : "icon-delete-active"} />,
    //           callback: () => {
    //             if (listIdChecked.length === 0) {
    //               showDialogConfirmDelete(item);
    //             }
    //           },
    //         },
    //       ]
    //     : []),
    ].filter((action) => action);
  };

//   const onDelete = async (id: number) => {
//     const response = await SupplierService.delete(id);

//     if (response.code === 0) {
//       showToast("Xóa nhà cung cấp thành công", "success");
//       getListInvestor(params);
//     } else {
//       showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
//     }
//     setShowDialog(false);
//     setContentDialog(null);
//   };

//   const onDeleteAll = async () => {
//     const arrayPromise = [];

//     listIdChecked.map((item) => {
//       const promise = new Promise((resolve, reject) => {
//         SupplierService.delete(item).then((res) => resolve(res));
//       });

//       arrayPromise.push(promise);
//     });

//     Promise.all(arrayPromise).then((result) => {
//       if (result.length > 0) {
//         showToast("Xóa nhà cung cấp thành công", "success");
//         getListInvestor(params);
//         setListIdChecked([]);
//       } else {
//         showToast("Có lỗi xảy ra. Vui lòng thử lại sau", "error");
//       }
//       setShowDialog(false);
//       setContentDialog(null);
//     });
//   };

//   const showDialogConfirmDelete = (item?: IContractPipelineResponse) => {
//     const contentDialog: IContentDialog = {
//       color: "error",
//       className: "dialog-delete",
//       isCentered: true,
//       isLoading: true,
//       title: <Fragment>Xóa...</Fragment>,
//       message: (
//         <Fragment>
//           Bạn có chắc chắn muốn xóa {item ? "nhà cung cấp " : `${listIdChecked.length} nhà cung cấp đã chọn`}
//           {item ? <strong>{item.name}</strong> : ""}? Thao tác này không thể khôi phục.
//         </Fragment>
//       ),
//       cancelText: "Hủy",
//       cancelAction: () => {
//         setShowDialog(false);
//         setContentDialog(null);
//       },
//       defaultText: "Xóa",
//       defaultAction: () => {
//         if (listIdChecked.length > 0) {
//           onDeleteAll();
//         } else {
//           onDelete(item.id);
//         }
//       },
//     };
//     setContentDialog(contentDialog);
//     setShowDialog(true);
//   };

//   const bulkActionList: BulkActionItemModel[] = [
//     {
//       title: "Xóa nhà cung cấp",
//       callback: () => showDialogConfirmDelete(),
//     },
//   ];

  const refContainerFilter = useRef();
  const refFilter = useRef();
  const [isShowFilter, setIsShowFilter] = useState(false);

  const [paramsInit, setParamsInit] = useState<any>({
    name: "",
    // businessId: -1,
    // cityId: -1,
  });
  useEffect(() => {
    setParamsInit({ ...paramsInit, name: params.name });
  }, [params.name]);


  // useEffect(() => {
  //   const state = location.state as any;
  //   if (state?.packageId) {
  //     setDataTenderPackage({id: state.packageId});
  //     setIsDetailTenderPackage(true);
  //   }
  // }, [location.state]);

  useEffect(() => {
    const state = location.state as any;
    const packageIdFromState = state?.packageId;
    const packageIdFromQuery = searchParams.get("packageId");
  
    const finalPackageId = packageIdFromState || packageIdFromQuery;
  
    if (finalPackageId) {
      setDataTenderPackage({ id: finalPackageId });
      setIsDetailTenderPackage(true);
    }
  }, [location.state, searchParams]);
  


  return (
    <div className="page-content page-tender-package-list card-box">
      <TitleAction title="Quản lý dự thầu" />
      <div className={`wrapper-tender-package-list ${(isDetailTenderPackage) ? "d-none" : ""}`}>
        <HeaderFilter
          params={params}
          setParams={setParams}
          listIdChecked={listIdChecked}
        //   showDialogConfirmDelete={showDialogConfirmDelete}
          titleActions={titleActions}
          titleSearch="theo tên"
        />
        <div className="container-button-right">
          {params?.fieldId || params?.projectId || params.status ? (
            <div className="button_cancel_filter">
              <span style={{ fontSize: 12, fontWeight: "400" }}>Bộ lọc</span>
              <Tippy content="Bỏ lọc">
                <div
                  style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                  onClick={() => {
                    setParams(paramsInit);
                    setIsShowFilter(false);
                  }}
                >
                  <Icon name="TimesCircle" />
                </div>
              </Tippy>
            </div>
          ) : null}

          <div className="container_filter" ref={refContainerFilter}>
            <div
              className={params?.fieldId || params?.projectId || params.status ? "button_filter_active" : "button_filter"}
              onClick={() => {
                setIsShowFilter(!isShowFilter);
              }}
            >
              <Icon name="Funnel" />
              {params?.fieldId || params?.projectId || params.status ? null : <span className="label">Lọc</span>}
            </div>

            {isShowFilter && (
              <FilterModal
                refContainerFilter={refContainerFilter}
                refFilter={refFilter}
                setIsShowFilter={setIsShowFilter}
                paramsInit={paramsInit}
                params={params}
                setParams={setParams}
              />
            )}
          </div>
        </div>
        {!isLoading && listTenderPackage && listTenderPackage.length > 0 ? (
          <BoxTable
            name="gói thầu"
            titles={titles}
            items={listTenderPackage}
            isPagination={true}
            dataPagination={pagination}
            dataMappingArray={(item, index) => dataMappingArray(item, index)}
            dataFormat={dataFormat}
            listIdChecked={listIdChecked}
            isBulkAction={false}
            // bulkActionItems={bulkActionList}
            striped={true}
            setListIdChecked={(listId) => setListIdChecked(listId)}
            actions={actionsTable}
            actionType="inline"
          />
        ) : isLoading ? (
          <Loading />
        ) : (
          <Fragment>
            {isPermissions ? (
              <SystemNotification type="no-permission" />
            ) : isNoItem ? (
              <SystemNotification
                description={
                  <span>
                    Hiện tại chưa có gói thầu nào. <br />
                  </span>
                }
                type="no-item"
                titleButton=""
                action={() => {
                  setDataTenderPackage(null);
                }}
              />
            ) : (
              <SystemNotification
                description={
                  <span>
                    Không có dữ liệu trùng khớp.
                    <br />
                    Bạn hãy thay đổi tiêu chí lọc hoặc tìm kiếm nhé!
                  </span>
                }
                type="no-result"
              />
            )}
          </Fragment>
        )}
      </div>

      <div className={`wrapper__detail--asked ${isDetailTenderPackage ? "" : "d-none"}`}>
        <div className="action-navigation">
          <div className="action-backup">
            <h1
              onClick={() => {
                setIsDetailTenderPackage(false);
                setDataTenderPackage(null);
                getListTenderPackage(params);
              }}
              className="title-first"
              title="Quay lại"
            >
              Quản lý dự thầu
            </h1>
            <Icon name="ChevronRight" />
            <h1 className="title-last">Chi tiết dự thầu</h1>
          </div>
        </div>

        <DetailTenderPackage
          dataTenderPackage={dataTenderPackage} 
          isDetail={isDetailTenderPackage}
        //   setIsHandleTask={() => {
        //     setIsDetailTenderPackage(false);
        //   }}
        />
      </div>


      <Dialog content={contentDialog} isOpen={showDialog} />
    </div>
  );
}

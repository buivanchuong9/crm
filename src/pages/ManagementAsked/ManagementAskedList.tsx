import React, { Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import "./ManagementAskedList.scss";
import Icon from "components/icon";
import Loading from "components/loading";
import SearchBox from "components/searchBox/searchBox";
import BoxTable from "components/boxTable/boxTable";
import TitleAction, { ITitleActions } from "components/titleAction/titleAction";
import { DataPaginationDefault, PaginationProps } from "components/pagination/pagination";
import { SystemNotification } from "components/systemNotification/systemNotification";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import { BulkActionItemModel } from "components/bulkAction/bulkAction";
import { IAction, IOption, ISaveSearch } from "model/OtherModel";
import { IContractPipelineResponse } from "model/contractPipeline/ContractPipelineResponseModel";
import { showToast } from "utils/common";
import { getPageOffset, isDifferenceObj } from "reborn-util";
import _, { set } from "lodash";
import HeaderFilter from "components/HeaderFilter/HeaderFilter";
import { ContextType, UserContext } from "contexts/userContext";
import SupplierService from "services/SupplierService";
import Tippy from "@tippyjs/react";
import FilterModal from "./FilterModal/FilterModal";
import DetailAsked from "./DetailAsked/DetailAsked";
import Badge from "components/badge/badge";
import moment from "moment";
import ManagementAskedService from "services/ManagementAskedService";

export default function ManagementAskedList(props: any) {
  document.title = "Quản lý yêu cầu làm rõ";

  const isMounted = useRef(false);
  const { dataInfoEmployee } = useContext(UserContext) as ContextType;

  const [listAsked, setListAsked] = useState([]);
  const [dataAsked, setDataAsked] = useState(null);
  const [listIdChecked, setListIdChecked] = useState<number[]>([]);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNoItem, setIsNoItem] = useState<boolean>(false);
  const [isPermissions, setIsPermissions] = useState<boolean>(false);
  const [isDetailAsked, setIsDetailAsked] = useState<boolean>(false);  

  const [params, setParams] = useState<any>({
    name: "",
    limit: 10,
    page: 1,
  });


  const [pagination, setPagination] = useState<PaginationProps>({
    ...DataPaginationDefault,
    name: "yêu cầu",
    isChooseSizeLimit: true,
    setPage: (page) => {
      setParams((prevParams) => ({ ...prevParams, page: page }));
    },
    chooseSizeLimit: (limit) => {
      setParams((prevParams) => ({ ...prevParams, limit: limit }));
    },
  });

  const abortController = new AbortController();

  const getListAsked = async (paramsSearch: any, disableLoading?: boolean) => {
    if (!disableLoading) {
      setIsLoading(true);
    }

    const response = await ManagementAskedService.list(paramsSearch, abortController.signal);

    if (response.code === 0) {
      const result = response.result;
      setListAsked(result?.items);

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
      getListAsked(params);
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
    "Gói thầu",
    "Nhà thầu",
    "Dự án",
    "Trạng thái",
    "Thời gian nhận",
  ];

  const dataFormat = ["text-center", "", "", "", "text-center", ""];

  const dataMappingArray = (item: any, index: number, type?: string) => [
    getPageOffset(params) + index + 1,
    type == "export" ? (
      item.tenderPackageName
    ) : (
      <div
        className="title-name"
        onClick={() => {
          setDataAsked(item);
          setIsDetailAsked(true);
        }}
        style={{ cursor: "pointer" }}
      >
        {item.tenderPackageName}
      </div>
    ),
    item.organizationName,
    item.packageProjectName,
    <Badge
      key={item.id}
      text={item.status === 0 ? "Chờ phản hồi" : item.status === 1 ? "Đã phân công" : item.status === 2 ? "Chờ tổng hợp" : "Đã phản hồi"}
      variant={item.status === 0 ? "wait-collect" : item.status === 1 ? "done" : item.status === 2 ? "wait-collect" : "done"}
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


  return (
    <div className="page-content page-management-asked-list card-box">
      <TitleAction title="Quản lý yêu cầu làm rõ" />
      <div className={`wrapper-list-asked ${(isDetailAsked) ? "d-none" : ""}`}>
        <HeaderFilter
          params={params}
          setParams={setParams}
          listIdChecked={listIdChecked}
        //   showDialogConfirmDelete={showDialogConfirmDelete}
          titleActions={titleActions}
          titleSearch="theo tên"
        />
        <div className="container-button-right">
          {params?.bidderId || params?.projectId || params.startDate || params.endDate || params.status ? (
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
              className={params?.bidderId || params?.projectId || params.startDate || params.endDate || params.status ? "button_filter_active" : "button_filter"}
              onClick={() => {
                setIsShowFilter(!isShowFilter);
              }}
            >
              <Icon name="Funnel" />
              {params?.bidderId || params?.projectId || params.startDate || params.endDate || params.status ? null : <span className="label">Lọc</span>}
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
        {!isLoading && listAsked && listAsked.length > 0 ? (
          <BoxTable
            name="yêu cầu"
            titles={titles}
            items={listAsked}
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
                    Hiện tại chưa có yêu cầu làm rõ nào. <br />
                  </span>
                }
                type="no-item"
                titleButton=""
                action={() => {
                  setDataAsked(null);
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

      <div className={`wrapper__detail--asked ${isDetailAsked ? "" : "d-none"}`}>
        <div className="action-navigation">
          <div className="action-backup">
            <h1
              onClick={() => {
                setIsDetailAsked(false);
                setDataAsked(null);
                getListAsked(params);
              }}
              className="title-first"
              title="Quay lại"
            >
              Quản lý yêu cầu làm rõ
            </h1>
            <Icon name="ChevronRight" />
            <h1 className="title-last">Chi tiết yêu cầu làm rõ</h1>
          </div>
        </div>

        <DetailAsked
          dataAsked={dataAsked} 
          isDetailAsked={isDetailAsked}
          setIsHandleTask={() => {
            setIsDetailAsked(false);
          }}
        />
      </div>


      <Dialog content={contentDialog} isOpen={showDialog} />
    </div>
  );
}

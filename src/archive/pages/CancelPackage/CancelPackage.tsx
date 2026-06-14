import React, { Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import "./CancelPackage.scss";
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
import { getPermissions, showToast } from "utils/common";
import { getPageOffset, isDifferenceObj } from "reborn-util";
import _, { set } from "lodash";
import HeaderFilter from "components/HeaderFilter/HeaderFilter";
import { ContextType, UserContext } from "contexts/userContext";
import SupplierService from "services/SupplierService";
import Tippy from "@tippyjs/react";
import FilterModal from "./FilterModal/FilterModal";
import ModalAddCancellPackage from "./ModalAddCancellPackage/ModalAddCancellPackage";
import CancelBiddingPackageService from "services/CancelBiddingPackageService";
import moment from "moment";

export default function CancelPackage(props: any) {
  document.title = "Huỷ gói thầu";

  const isMounted = useRef(false);
  const { dataInfoEmployee } = useContext(UserContext) as ContextType;

  const [listPackage, setListPackage] = useState([]);
  const [dataPackage, setDataPackage] = useState(null);
  const [listIdChecked, setListIdChecked] = useState<number[]>([]);
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNoItem, setIsNoItem] = useState<boolean>(false);
  const [isPermissions, setIsPermissions] = useState<boolean>(false);
  const [permissions, setPermissions] = useState(getPermissions());
  const [isView, setIsView] = useState(false);

  const [params, setParams] = useState<any>({
    biddingPackage: "",
    limit: 10,
    page: 1,
  });


  console.log('params', params);

  const [listSaveSearch] = useState<ISaveSearch[]>([
    {
      key: "all",
      name: "nhà cung cấp",
      is_active: true,
    },
  ]);

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

  const getListPackage = async (paramsSearch: any, disableLoading?: boolean) => {
    if (!disableLoading) {
      setIsLoading(true);
    }

    const response = await CancelBiddingPackageService.list(paramsSearch, abortController.signal);

    if (response.code === 0) {
      const result = response.result;
      setListPackage(result?.items);

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
      getListPackage(params);
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
    //   ...(permissions["LIST_SUPPLIER_ADD"] == 1
    //     ? [
            
    //       ]
    //     : []),
        {
            icon: <Icon name="Plus" style={{ width: 13, height: 13 }} />,
            title: "Huỷ gói thầu",
            callback: () => {
                setDataPackage(null);
                setShowModalAdd(true);
            },
        },
    ],
  };

  const titles = [
    "STT",
    "Gói thầu",
    "Dự án",
    "Lĩnh vực",
    "Bộ phận yêu cầu",
    "Tên người yêu cầu",
    "Thời gian huỷ",
    "Người huỷ"
  ];

  const dataFormat = ["", "", "", "", "", "", "", ""];

  const dataMappingArray = (item: any, index: number, type?: string) => [
    getPageOffset(params) + index + 1,
    type == "export" ? (
      item.name
    ) : (
      <div
        className="title-name"
        onClick={() => {
          setShowModalAdd(true);
          setDataPackage(item);
          setIsView(true);
        }}
        style={{ cursor: "pointer" }}
      >
        {item.biddingPackage}
      </div>
    ),
    item.prName,
    item.fieldName,
    item.departmentRequestName,
    item.creatorName,
    item.createDate ? moment(item.createDate).format('DD/MM/YYYY HH:mm') : '',
    item.employeeName
  ];

  const actionsTable = (item: any): IAction[] => {
    return [
      // ...(dataInfoEmployee?.isOwner === 1
      //   ? [
          
      //     ]
      //   : []),
    //   permissions["LIST_SUPPLIER_UPDATE"] == 1 &&
    //     {
    //       title: listIdChecked.length > 0 ? "" : "Sửa",
    //       disabled: listIdChecked.length > 0 ? true : false,
    //       icon: <Icon name="PencilSimpleLine" className={listIdChecked.length > 0 ? "icon-edit-inactive" : "icon-edit-active"} />,
    //       callback: () => {
    //         if (listIdChecked.length === 0) {
    //           setDataInvestor(item);
    //           setShowModalAdd(true);
    //         }
    //       },
    //     },
    //     permissions["LIST_SUPPLIER_DELETE"] == 1 &&
    //     {
    //       title: listIdChecked.length > 0 ? "" : "Xóa",
    //       disabled: listIdChecked.length > 0 ? true : false,
    //       icon: <Icon name="TrashRox" className={listIdChecked.length > 0 ? "icon-delete-inactive" : "icon-delete-active"} />,
    //       callback: () => {
    //         if (listIdChecked.length === 0) {
    //           showDialogConfirmDelete(item);
    //         }
    //       },
    //     },
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

  const showDialogConfirmDelete = (item?: IContractPipelineResponse) => {
    const contentDialog: IContentDialog = {
      color: "error",
      className: "dialog-delete",
      isCentered: true,
      isLoading: true,
      title: <Fragment>Xóa...</Fragment>,
      message: (
        <Fragment>
          Bạn có chắc chắn muốn xóa {item ? "nhà cung cấp " : `${listIdChecked.length} nhà cung cấp đã chọn`}
          {item ? <strong>{item.name}</strong> : ""}? Thao tác này không thể khôi phục.
        </Fragment>
      ),
      cancelText: "Hủy",
      cancelAction: () => {
        setShowDialog(false);
        setContentDialog(null);
      },
      defaultText: "Xóa",
      defaultAction: () => {
        // if (listIdChecked.length > 0) {
        //   onDeleteAll();
        // } else {
        //   onDelete(item.id);
        // }
      },
    };
    setContentDialog(contentDialog);
    setShowDialog(true);
  };

  const bulkActionList: BulkActionItemModel[] = [
    {
      title: "Xóa nhà cung cấp",
      callback: () => showDialogConfirmDelete(),
    },
  ];

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
    <div className="page-content page-cancel-package card-box">
      <TitleAction title="Huỷ gói thầu" />
      <div className="d-flex flex-column">
        <HeaderFilter
          params={params}
          setParams={setParams}
          listIdChecked={listIdChecked}
          showDialogConfirmDelete={showDialogConfirmDelete}
          titleActions={titleActions}
          titleSearch="theo tên"
          disableDeleteAll = {true} 
        />
        <div className="container-button-right">
          {params.projectId || params.fieldId || params.departmentId ? (
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
              className={params.projectId || params.fieldId || params.departmentId ? "button_filter_active" : "button_filter"}
              onClick={() => {
                setIsShowFilter(!isShowFilter);
              }}
            >
              <Icon name="Funnel" />
              {params.projectId || params.fieldId || params.departmentId ? null : <span className="label">Lọc</span>}
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
        {!isLoading && listPackage && listPackage.length > 0 ? (
          <BoxTable
            name="gói thầu"
            titles={titles}
            items={listPackage}
            isPagination={true}
            dataPagination={pagination}
            dataMappingArray={(item, index) => dataMappingArray(item, index)}
            dataFormat={dataFormat}
            listIdChecked={listIdChecked}
            isBulkAction={true}
            bulkActionItems={bulkActionList}
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
                    Hãy thêm mới gói thầu đầu tiên nhé!
                  </span>
                }
                type="no-item"
                titleButton=""
                action={() => {
                  // setDataInvestor(null);
                  // setShowModalAdd(true);
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
      
      <ModalAddCancellPackage
        onShow={showModalAdd}
        data={dataPackage}
        isView={isView}
        setIsView={setIsView}
        onHide={(reload) => {
          if (reload) {
            getListPackage(params);
          }
          setShowModalAdd(false);
          setIsView(false);
        }}
      />

      <Dialog content={contentDialog} isOpen={showDialog} />
    </div>
  );
}

import React, { Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import "./SupplierList.scss";
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
import ButtonOnOff from "components/ButtonOnOff/ButtonOnOff";
import HeaderFilter from "components/HeaderFilter/HeaderFilter";
import { ContextType, UserContext } from "contexts/userContext";
import SupplierService from "services/SupplierService";
import ModalAddSupplier from "./partials/ModalAddSupplier";
import { IWorkOrderFilterRequest } from "model/workOrder/WorkOrderRequestModel";
import Tippy from "@tippyjs/react";
import ExportModal from "components/exportModal/exportModal";
import FilterModal from "./partials/FilterModal/FilterModal";
import { ExportExcel } from "exports";

export default function SupplierList(props: any) {
  document.title = "Nhà cung cấp";

  const isMounted = useRef(false);
  const { dataInfoEmployee } = useContext(UserContext) as ContextType;

  const [listInvestor, setListInvestor] = useState([]);
  const [dataInvestor, setDataInvestor] = useState(null);
  const [listIdChecked, setListIdChecked] = useState<number[]>([]);
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNoItem, setIsNoItem] = useState<boolean>(false);
  const [isPermissions, setIsPermissions] = useState<boolean>(false);
  const [permissions, setPermissions] = useState(getPermissions());

  const [params, setParams] = useState<any>({
    name: "",
    limit: 10,
    page: 1,
    // businessId: 0,
    // cityId: 0,
  });

  const [listSaveSearch] = useState<ISaveSearch[]>([
    {
      key: "all",
      name: "nhà cung cấp",
      is_active: true,
    },
  ]);

  const [pagination, setPagination] = useState<PaginationProps>({
    ...DataPaginationDefault,
    name: "nhà cung cấp",
    isChooseSizeLimit: true,
    setPage: (page) => {
      setParams((prevParams) => ({ ...prevParams, page: page }));
    },
    chooseSizeLimit: (limit) => {
      setParams((prevParams) => ({ ...prevParams, limit: limit }));
    },
  });

  const abortController = new AbortController();

  const getListInvestor = async (paramsSearch: any, disableLoading?: boolean) => {
    if (!disableLoading) {
      setIsLoading(true);
    }

    const response = await SupplierService.list(paramsSearch, abortController.signal);

    if (response.code === 0) {
      const result = response.result;
      setListInvestor(result?.items);

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
      getListInvestor(params);
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
      ...(permissions["LIST_SUPPLIER_ADD"] == 1
        ? [
            {
              icon: <Icon name="Plus" style={{ width: 13, height: 13 }} />,
              title: "Thêm mới",
              callback: () => {
                setDataInvestor(null);
                setShowModalAdd(true);
                setIsView(false);
              },
            },
          ]
        : []),
    ],
  };

  const titles = [
    "STT",
    "Tên nhà cung cấp",
    "Mã số thuế/CCCD",
    "Ngành nghề kinh doanh chính",
    "Tỉnh/Thành phố",
    ...(permissions["LIST_SUPPLIER_UPDATE"] == 1 ? ["Hoạt động"] : []),
  ];

  const dataFormat = ["text-center", "text-left", "text-left", "text-left", "text-left", "text-right"];

  const dataMappingArray = (item: any, index: number, type?: string) => [
    getPageOffset(params) + index + 1,
    type == "export" ? (
      item.name
    ) : (
      <div
        className="title-name"
        onClick={() => {
          setIsView(true);
          setShowModalAdd(true);
          setDataInvestor(item);
        }}
        style={{ cursor: "pointer" }}
      >
        {item.name}
      </div>
    ),
    item.taxCode,
    item.businessName,
    item.cityName,
    ...(type == "export"
      ? []
      : permissions["LIST_SUPPLIER_UPDATE"] == 1
      ? [
          <div style={{ paddingRight: 14 }}>
            <ButtonOnOff
              checked={item.active === 1 ? true : false}
              onChange={(value) => {
                if (item.active === 1) {
                  onStatus(item.id, 0);
                } else {
                  onStatus(item.id, 1);
                }
              }}
            />
          </div>,
        ]
      : []),
  ];

  const actionsTable = (item: any): IAction[] => {
    return [
      // ...(dataInfoEmployee?.isOwner === 1
      //   ? [
          
      //     ]
      //   : []),
      permissions["LIST_SUPPLIER_UPDATE"] == 1 &&
        {
          title: listIdChecked.length > 0 ? "" : "Sửa",
          disabled: listIdChecked.length > 0 ? true : false,
          icon: <Icon name="PencilSimpleLine" className={listIdChecked.length > 0 ? "icon-edit-inactive" : "icon-edit-active"} />,
          callback: () => {
            if (listIdChecked.length === 0) {
              setDataInvestor(item);
              setShowModalAdd(true);
              setIsView(false);
            }
          },
        },
        permissions["LIST_SUPPLIER_DELETE"] == 1 &&
        {
          title: listIdChecked.length > 0 ? "" : "Xóa",
          disabled: listIdChecked.length > 0 ? true : false,
          icon: <Icon name="TrashRox" className={listIdChecked.length > 0 ? "icon-delete-inactive" : "icon-delete-active"} />,
          callback: () => {
            if (listIdChecked.length === 0) {
              showDialogConfirmDelete(item);
            }
          },
        },
    ].filter((action) => action);
  };

  const onStatus = async (id, active) => {
    const body = {
      id: id,
      active: active,
    };
    const response = await SupplierService.updateActive(body);

    if (response.code === 0) {
      if (active === 1) {
        showToast("Cập nhật hoạt động thành công", "success");
      } else {
        showToast("Cập nhật không hoạt động thành công", "success");
      }

      getListInvestor(params, true);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    // setShowDialog(false);
    // setContentDialog(null);
  };

  const onDelete = async (id: number) => {
    const response = await SupplierService.delete(id);

    if (response.code === 0) {
      showToast("Xóa nhà cung cấp thành công", "success");
      getListInvestor(params);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setShowDialog(false);
    setContentDialog(null);
  };

  const onDeleteAll = async () => {
    const arrayPromise = [];

    listIdChecked.map((item) => {
      const promise = new Promise((resolve, reject) => {
        SupplierService.delete(item).then((res) => resolve(res));
      });

      arrayPromise.push(promise);
    });

    Promise.all(arrayPromise).then((result) => {
      if (result.length > 0) {
        showToast("Xóa nhà cung cấp thành công", "success");
        getListInvestor(params);
        setListIdChecked([]);
      } else {
        showToast("Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      }
      setShowDialog(false);
      setContentDialog(null);
    });
  };

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
        if (listIdChecked.length > 0) {
          onDeleteAll();
        } else {
          onDelete(item.id);
        }
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

  const [showModalExport, setShowModalExport] = useState(false);

  //Export
  const optionsExport: IOption[] = useMemo(
    () => [
      {
        value: "all",
        label: "Tất cả công việc",
      },
      {
        value: "current_page",
        label: "Trên trang này",
        disabled: pagination.totalItem === 0,
      },
      {
        value: "current_search",
        label: `${pagination.totalItem} công việc phù hợp với kết quả tìm kiếm hiện tại`,
        disabled: pagination.totalItem === 0 || !isDifferenceObj(params, { keyword: "" }),
      },
    ],
    [pagination, params]
  );

  const titlesExcel = ["STT", "Tên nhà cung cấp", "Mã số thuế/CCCD", "Ngành nghề kinh doanh chính", "Tỉnh/Thành phố"];
  const dataFormatExport = ["center", "center", "center", "center", "center"];

  const exportCallback = useCallback(
    async (type, extension) => {
      const response = await SupplierService.list({
        ...params,
        page: type === "current_page" ? 1 : params.page,
        limit: type === "all" || type === "current_search" ? 10000 : params.limit,
      });
      if (response.code === 0) {
        const result = response.result.items;
        if (extension === "excel") {
          ExportExcel({
            fileName: "NhaCungCap",
            title: "Nhà cung cấp",
            header: titlesExcel,
            formatExcel: dataFormatExport,
            data: result.map((item, idx) => dataMappingArray(item, idx, "export")),
            info: { name },
          });
        }
        showToast("Xuất file thành công", "success");
        setShowModalExport(false);
      } else {
        showToast("Có lỗi xảy ra. Vui lòng thử lại sau!", "error");
        setShowModalExport(false);
      }
    },
    [params]
  );

  const [isView, setIsView] = useState(false);

  return (
    <div className="page-content page-supplier-list card-box">
      <TitleAction title="nhà cung cấp" />
      <div className="d-flex flex-column">
        <HeaderFilter
          params={params}
          setParams={setParams}
          listIdChecked={listIdChecked}
          showDialogConfirmDelete={showDialogConfirmDelete}
          titleActions={titleActions}
          titleSearch="theo tên"
          disableDeleteAll = {permissions["LIST_SUPPLIER_DELETE"] == 1 ? false : true} 
        />
        <div className="container-button-right">
          {permissions["LIST_SUPPLIER_EXPORT"] == 1 ? 
            <div
              className="button_export"
              onClick={() => {
                setShowModalExport(true);
                setIsShowFilter(false);
              }}
            >
              <Icon name="ExportRox" />
              <span className="label">Xuất dữ liệu</span>
            </div>
          : null}

          {params?.businessId || params?.cityId ? (
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
              className={params.businessId || params.cityId ? "button_filter_active" : "button_filter"}
              onClick={() => {
                setIsShowFilter(!isShowFilter);
              }}
            >
              <Icon name="Funnel" />
              {params.businessId || params.cityId ? null : <span className="label">Lọc</span>}
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
        {!isLoading && listInvestor && listInvestor.length > 0 ? (
          <BoxTable
            name="nhà cung cấp"
            titles={titles}
            items={listInvestor}
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
                    Hiện tại chưa có nhà cung cấp nào. <br />
                    Hãy thêm mới nhà cung cấp đầu tiên nhé!
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
      <ExportModal
        name="Nhà cung cấp"
        onShow={showModalExport}
        onHide={() => setShowModalExport(false)}
        options={optionsExport}
        callback={(type, extension) => exportCallback(type, extension)}
      />
      <ModalAddSupplier
        onShow={showModalAdd}
        data={dataInvestor}
        isView={isView}
        setIsView={setIsView}
        onHide={(reload) => {
          if (reload) {
            getListInvestor(params);
          }
          setShowModalAdd(false);
        }}
      />

      <Dialog content={contentDialog} isOpen={showDialog} />
    </div>
  );
}

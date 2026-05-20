import React, { Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import "./ManageNotifySystem.scss";
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
import Tippy from "@tippyjs/react";
import NotificationTemplateService from "services/NotificationTemplateService";
import ModalAddNotificationTemplate from "./partials/ModalAddNotificationTemplate";
import NotificationSettingModal from "./NotificationSettingModal/NotificationSettingModal";
import moment from "moment";
import FilterModal from "./FilterModal/FilterModal";
import { useSearchParams } from "react-router-dom";

export default function ManageNotifySystem(props: any) {
  document.title = "Quản lý thông báo hệ thống";

  const isMounted = useRef(false);
  const { dataInfoEmployee } = useContext(UserContext) as ContextType;
  const [searchParams, setSearchParams] = useSearchParams();
  const [listNotify, setListNotify] = useState([]);
  const [dataNotify, setDataNotify] = useState(null);
  const [listIdChecked, setListIdChecked] = useState<number[]>([]);
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [showModalSetting, setShowModalSetting] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNoItem, setIsNoItem] = useState<boolean>(false);
  const [isPermissions, setIsPermissions] = useState<boolean>(false);

  const [params, setParams] = useState<any>({
    title: "",
    // limit: 10,
    // page: 1,
  });

  const [paramsInit, setParamsInit] = useState<any>({
    title: "",
    page: 1,
  });

  const [listSaveSearch] = useState<ISaveSearch[]>([
    {
      key: "all",
      name: "Quản lý thông báo hệ thống",
      is_active: true,
    },
  ]);

  const [pagination, setPagination] = useState<PaginationProps>({
    ...DataPaginationDefault,
    name: "thông báo",
    isChooseSizeLimit: true,
    setPage: (page) => {
      setParams((prevParams) => ({ ...prevParams, page: page }));
    },
    chooseSizeLimit: (limit) => {
      setParams((prevParams) => ({ ...prevParams, limit: limit }));
    },
  });

  const abortController = new AbortController();

  const getListNotify = async (paramsSearch: any, disableLoading?: boolean) => {
    if (!disableLoading) {
      setIsLoading(true);
    }

    const response = await NotificationTemplateService.list(paramsSearch, abortController.signal);

    if (response.code === 0) {
      const result = response.result;
      setListNotify(result?.items);

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
    searchParams.forEach(async (key, value) => {
      paramsTemp[value] = key;
    });
    setParams((prevParams) => ({ ...prevParams, ...paramsTemp }));
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (isMounted.current === true) {
      getListNotify(params);
      const paramsTemp = _.cloneDeep(params);
      if (paramsTemp.limit === 10) {
        delete paramsTemp["limit"];
      }
      Object.keys(paramsTemp).map(function (key) {
        paramsTemp[key] === "" ? delete paramsTemp[key] : null;
      });

      if (isDifferenceObj(searchParams, paramsTemp)) {
        if (paramsTemp.page === 1) {
          delete paramsTemp["page"];
        }
        setSearchParams(paramsTemp as Record<string, string | string[]>);
      }
    }

    return () => {
      abortController.abort();
    };
  }, [params]);

  const titleActions: ITitleActions = {
    actions: [
      {
        icon: <Icon name="Plus" style={{ width: 13, height: 13 }} />,
        title: "Thêm mới",
        callback: () => {
          setDataNotify(null);
          setShowModalAdd(true);
        },
      },
    ],
  };

  const titles = ["STT", "Tên thông báo", "Người gửi", "Thời gian thông báo"];

  const dataFormat = ["text-center", "text-left", "text-left", "text-left", "text-left"];

  const dataMappingArray = (item: any, index: number, type?: string) => [
    getPageOffset(params) + index + 1,
    <div style={{ width: "45rem" }}>
      <span
        key={item.id}
        className="title-name"
        onClick={() => {
          setIsShowFilter(false);
          setShowModalAdd(true);
          setDataNotify(item);
        }}
      >
        {item.title}
      </span>
    </div>,
    item.employeeName,
    item.createdTime ? moment(item.createdTime).format("DD/MM/YYYY - HH:mm") : "",
  ];

  const actionsTable = (item: any): IAction[] => {
    return [];
  };

  const onDelete = async (id: number) => {
    const response = await NotificationTemplateService.delete(id);

    if (response.code === 0) {
      showToast("Xóa thông báo thành công", "success");
      getListNotify(params);
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
        NotificationTemplateService.delete(item).then((res) => resolve(res));
      });

      arrayPromise.push(promise);
    });

    Promise.all(arrayPromise).then((result) => {
      if (result.length > 0) {
        showToast("Xóa thông báo thành công", "success");
        getListNotify(params);
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
          Bạn có chắc chắn muốn xóa {item ? "thông bao " : `${listIdChecked.length} thông báo đã chọn`}
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
      title: "Xóa thông báo",
      callback: () => showDialogConfirmDelete(),
    },
  ];

  const refContainerFilter = useRef();
  const refFilter = useRef();
  const [isShowFilter, setIsShowFilter] = useState(false);

  return (
    <div className="page-content page-manage-notify-system card-box">
      <TitleAction title="Quản lý thông báo hệ thống" />
      <div className="d-flex flex-column">
        <HeaderFilter
          params={params}
          setParams={setParams}
          listIdChecked={listIdChecked}
          showDialogConfirmDelete={showDialogConfirmDelete}
          titleActions={titleActions}
          titleSearch="thông báo"
          // exportExcel={true}
          // setOnShowModalExport={() => setShowModalExport(true)}
        />
        <div className="container-button-right">
          <div
            className="button_export"
            onClick={() => {
              setShowModalSetting(true);
              setIsShowFilter(false);
            }}
          >
            <Icon name="Settings" />
            <span className="label">Cài đặt</span>
          </div>

          {params.employeeId || params.fromTime || params.toTime ? (
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
              className={params.employeeId || params.fromTime || params.toTime ? "button_filter_active" : "button_filter"}
              onClick={() => {
                setIsShowFilter(!isShowFilter);
              }}
            >
              <Icon name="Funnel" />
              {params.employeeId || params.fromTime || params.toTime ? null : <span className="label">Lọc</span>}
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
        {!isLoading && listNotify && listNotify.length > 0 ? (
          <BoxTable
            name="thông báo"
            titles={titles}
            items={listNotify}
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
                    Hiện tại chưa có thông báo nào. <br />
                    Hãy thêm mới thông báo đầu tiên nhé!
                  </span>
                }
                type="no-item"
                titleButton="Thêm mới thông báo"
                action={() => {
                  setDataNotify(null);
                  setShowModalAdd(true);
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
      <ModalAddNotificationTemplate
        onShow={showModalAdd}
        data={dataNotify}
        onHide={(reload) => {
          if (reload) {
            getListNotify(params);
          }
          setShowModalAdd(false);
          setDataNotify(null);
        }}
      />

      <NotificationSettingModal
        onShow={showModalSetting}
        data={dataNotify}
        onHide={(reload) => {
          if (reload) {
            // getListNotify(params);
          }
          setShowModalSetting(false);
        }}
      />

      <Dialog content={contentDialog} isOpen={showDialog} />
    </div>
  );
}

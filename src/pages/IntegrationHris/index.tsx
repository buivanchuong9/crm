import React, { Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import "./index.scss";
import Icon from "components/icon";
import Loading from "components/loading";
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
import moment from "moment";
// import FilterModal from "./FilterModal/FilterModal";
import { useSearchParams } from "react-router-dom";
import Badge from "components/badge/badge";
import ConfirmIntegrationModal from "./partials/ConfirmIntegrationModal/ConfirmIntegrationModal";
import FilterModal from "./partials/FilterModal/FilterModal";
import SettingIntegrationModal from "./partials/SettingIntegrationModal/SettingIntegrationModal";
import HrisService from "services/HrisService";

export default function IntegrationHris(props: any) {
  document.title = "Tích hợp Hris";

  const isMounted = useRef(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [listIntegrationHris, setListIntegrationHris] = useState([]);
  const [dataIntegrationHris, setDataIntegrationHris] = useState(null);
  const [listIdChecked, setListIdChecked] = useState<number[]>([]);
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [showModalSetting, setShowModalSetting] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNoItem, setIsNoItem] = useState<boolean>(false);
  const [isPermissions, setIsPermissions] = useState<boolean>(false);
  const [isConfirmIntegration, setIsConfirmIntegration] = useState(false);

  const [params, setParams] = useState<any>({
    title: "",
    limit: 10,
    page: 1,
  });

  const [paramsInit, setParamsInit] = useState<any>({
    title: "",
    page: 1
  });

  const [listSaveSearch] = useState<ISaveSearch[]>([
    {
      key: "all",
      name: "Tích hợp Hris",
      is_active: true,
    },
  ]);

  const [pagination, setPagination] = useState<PaginationProps>({
    ...DataPaginationDefault,
    name: "",
    isChooseSizeLimit: true,
    setPage: (page) => {
      setParams((prevParams) => ({ ...prevParams, page: page }));
    },
    chooseSizeLimit: (limit) => {
      setParams((prevParams) => ({ ...prevParams, limit: limit }));
    },
  });

  const abortController = new AbortController();

  const getListIntegrationHris = async (paramsSearch: any, disableLoading?: boolean) => {
    if (!disableLoading) {
      setIsLoading(true);
    }

    try {
      const response = await HrisService.getSyncHistory(paramsSearch, abortController.signal);

      if (response.code === 0) {
        const result = response.result;
        setListIntegrationHris(result?.items);
  
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
    } catch {
      // Sử dụng mock dữ liệu nếu không gọi được API
      showToast("Có lỗi xảy ra. Dữ liệu mock được sử dụng.", "warning");
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
      getListIntegrationHris(params);
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
        icon: <Icon name="IntegrationHris"/>,
        title: "Đồng bộ ngay",
        callback: () => {
          setIsConfirmIntegration(true);
        },
      },
    ],
  };

  const titles = [
    "STT",
    "Thời gian bắt đầu",
    "Thời gian kết thúc",
    "Người đồng bộ",
    "Trạng thái",
  ];

  const dataFormat = ["text-center", "text-center", "text-center", "text-center", "text-center"];

  const dataMappingArray = (item: any, index: number, type?: string) => [
    getPageOffset(params) + index + 1,
    item.startTime ? moment(item.startTime).format('DD/MM/YYYY HH:mm') : '',
    item.endTime ? moment(item.endTime).format('DD/MM/YYYY HH:mm') : '',
    item.syncBy,
    <Badge
      key={item.id}
      text={item.status === 'completed' ? "Hoàn tất" : item.status === 'failed' ? "Thất bại" : item.status === 'inprogress' ? "Đang đồng bộ" : ""}
      variant={item.status === 'completed' ? "primary" : item.status === 'failed' ? "extend" : item.status === 'inprogress' ? "done" : "done"}
    />,
  ];

  const actionsTable = (item: any): IAction[] => {
    return [
      
    ]
  };

  const refContainerFilter = useRef();
  const refFilter = useRef();
  const [isShowFilter, setIsShowFilter] = useState(false);



  return (
    <div className="page-content page-integration-hris card-box">
      <TitleAction title="Tích hợp Hris" />
      <div className="d-flex flex-column">
        <HeaderFilter
          params={params}
          setParams={setParams}
          listIdChecked={listIdChecked}
          // showDialogConfirmDelete={showDialogConfirmDelete}
          titleActions={titleActions}
          titleSearch=""
        />
        <div className="container-button-right">

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

          <div
            className="button_export"
            onClick={() => {
                setShowModalSetting(true);
                setIsShowFilter(false);
            }}
          >
            <Icon name="Settings" />
            <span className="label">Cấu hình</span>
          </div>
        </div>
        {!isLoading && listIntegrationHris && listIntegrationHris.length > 0 ? (
          <BoxTable
            name="hris"
            titles={titles}
            items={listIntegrationHris}
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
                    Hiện tại chưa dữ liệu nào. <br />
                  </span>
                }
                type="no-item"
                titleButton=""
                action={() => {
                //   setDataNotify(null);
                //   setShowModalAdd(true);
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

     <ConfirmIntegrationModal
        onShow={isConfirmIntegration}
        onHide={(reload) => {
          if (reload) {
            // handleClear(true);
          }
          setIsConfirmIntegration(false);
        }}
      />

       <SettingIntegrationModal
        onShow={showModalSetting}
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

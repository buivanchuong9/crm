import React, { Fragment, useState, useEffect, useRef, useContext } from "react";
import _ from "lodash";
import Icon from "components/icon";
import Loading from "components/loading";
import SearchBox from "components/searchBox/searchBox";
import BoxTable from "components/boxTable/boxTable";
import TitleAction, { ITitleActions } from "components/titleAction/titleAction";
import { DataPaginationDefault, PaginationProps } from "components/pagination/pagination";
import { SystemNotification } from "components/systemNotification/systemNotification";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import { BulkActionItemModel } from "components/bulkAction/bulkAction";
import { IAction, ISaveSearch } from "model/OtherModel";
import { IContractPipelineResponse } from "model/contractPipeline/ContractPipelineResponseModel";
import { showToast } from "utils/common";
import { getPageOffset } from "reborn-util";
import { getPermissions } from "utils/common";
import "./Holiday.scss";
import WorkTimeService from "services/WorkTimeService";
import moment from "moment";
import AddHolidayModal from "./partials/AddHolidayModal";
import HeaderFilter from "components/HeaderFilter/HeaderFilter";
import { ContextType, UserContext } from "contexts/userContext";

export default function Holiday(props: any) {
  document.title = "Ngày nghỉ lễ";

  const { onBackProps } = props;

  const isMounted = useRef(false);
  const { dataInfoEmployee } = useContext(UserContext) as ContextType;

  const [listHoliday, setListHoliday] = useState([]);
  const [dataHoliday, setDataHoliday] = useState(null);
  const [listIdChecked, setListIdChecked] = useState<number[]>([]);
  const [showModalAddHoliday, setShowModalAddHoliday] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNoItem, setIsNoItem] = useState<boolean>(false);
  const [isPermissions, setIsPermissions] = useState<boolean>(false);

  const [params, setParams] = useState({
    name: "",
    limit: 10,
    page: 1
  });

  const [listSaveSearch] = useState<ISaveSearch[]>([
    {
      key: "all",
      name: "Ngày nghỉ lễ",
      is_active: true,
    },
  ]);

  const [pagination, setPagination] = useState<PaginationProps>({
    ...DataPaginationDefault,
    name: "ngày",
    isChooseSizeLimit: true,
    setPage: (page) => {
      setParams((prevParams) => ({ ...prevParams, page: page }));
    },
    chooseSizeLimit: (limit) => {
      setParams((prevParams) => ({ ...prevParams, limit: limit }));
    },
  });

  const abortController = new AbortController();

  const getListHoliday = async (paramsSearch: any) => {
    setIsLoading(true);

    const response = await WorkTimeService.listHoliday(paramsSearch, abortController.signal);

    if (response.code === 0) {
      const result = response.result;
      setListHoliday(result?.items);

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
        getListHoliday(params);
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
      ...(dataInfoEmployee?.isOwner === 1 ? [
        {
          icon: <Icon name="Plus" style={{width: 13, height: 13}} />,
          title: "Thêm mới",
          callback: () => {
            setDataHoliday(null);
            setShowModalAddHoliday(true);
          },
        },
      ] : []),
      
    ],
  };

  const titles = ["STT", "Tên ngày nghỉ", "Loại ngày nghỉ", 'Ngày nghỉ'];

  const dataFormat = ["text-center", "", ""];

  const dataMappingArray = (item: any, index: number) => [
    getPageOffset(params) + index + 1,
    item.holidayName, 
    item.isFixed === 1 ? 'Cố định' : 'Không cố định',
    item.isFixed === 1 ? 
    <div>{`${+item.holidayDay < 10 ? `0${item.holidayDay || ''}` : item.holidayDay}/${+item.holidayMonth < 10 ? `0${item.holidayMonth || ''}` : item.holidayMonth}`}</div>
    : 
    <div>{(item.startDate ? moment(item.startDate).format('DD/MM/YYYY') : '')} - {(item.endDate ? moment(item.endDate).format('DD/MM/YYYY') : '')}</div>
  ];

  const actionsTable = (item: any): IAction[] => {
    return [
      ...(dataInfoEmployee?.isOwner === 1 ? [
        {
          title: listIdChecked.length > 0 ? '' : "Sửa",
          disabled: listIdChecked.length > 0 ? true : false,
          icon: <Icon name="PencilSimpleLine" className={listIdChecked.length > 0 ? "icon-edit-inactive" : "icon-edit-active"}/>,
          callback: () => {
            if(listIdChecked.length === 0){
              setDataHoliday(item);
              setShowModalAddHoliday(true);
            }
          },
        },
        {
          title: listIdChecked.length > 0 ? '' : "Xóa",
          disabled: listIdChecked.length > 0 ? true : false,
          icon: <Icon name="TrashRox" className={listIdChecked.length > 0 ? "icon-delete-inactive" : "icon-delete-active"} />,
          callback: () => {
            if(listIdChecked.length === 0){
              showDialogConfirmDelete(item);
            }
          },
        },
      ] : []),
      
    ].filter((action) => action);
  };

  const onDelete = async (id: number) => {
    const response = await WorkTimeService.deleteHoliday(id);

    if (response.code === 0) {
      showToast("Xóa ngày nghỉ thành công", "success");
      getListHoliday(params);
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
        WorkTimeService.deleteHoliday(item).then((res) => resolve(res));
      });

      arrayPromise.push(promise);
    });

    Promise.all(arrayPromise).then((result) => {
      if (result.length > 0) {
        showToast("Xóa ngày nghỉ thành công", "success");
        getListHoliday(params);
        setListIdChecked([]);
      } else {
        showToast("Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      }
      setShowDialog(false);
      setContentDialog(null);
    });
  };

  const showDialogConfirmDelete = (item?: any) => {
    const contentDialog: IContentDialog = {
      color: "error",
      className: "dialog-delete",
      isCentered: true,
      isLoading: true,
      title: <Fragment>Xóa...</Fragment>,
      message: (
        <Fragment>
          Bạn có chắc chắn muốn xóa {item ? "ngày nghỉ " : `${listIdChecked.length} ngày nghỉ đã chọn`} {item ? <strong>{item.holidayName}</strong> : ""}? Thao tác này không thể khôi phục.
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
      title: "Xóa ngày nghỉ",
      callback: () => showDialogConfirmDelete(),
    },
  ];

  return (
    <div className={`page-content page-holiday${isNoItem ? " bg-white" : ""}`}>
      <div className="d-flex flex-column">
        <HeaderFilter
          params={params}
          setParams={setParams}
          listIdChecked={listIdChecked}
          showDialogConfirmDelete={showDialogConfirmDelete}
          titleActions={titleActions}
          titleSearch='Ngày nghỉ'
        />
        {/* <div className="container-header">
          <div className="header_left">
            {listIdChecked?.length > 0 ? 
              <div>
                <span style={{fontSize: 14, fontWeight: '400'}}>Đang chọn {listIdChecked?.length}</span>
              </div>
            : null}

            {listIdChecked?.length > 0 ? 
              <div 
                className="button_delete"
                onClick={() => {
                  showDialogConfirmDelete();
                }}
              >
                <Icon name="TrashOutline"/>
              </div>
            : null}

            <div className="box_search">
              <SearchBox
                name="Tên ngày nghỉ lễ"
                params={params}
                isSaveSearch={false}
                listSaveSearch={listSaveSearch}
                updateParams={(paramsNew) => setParams(paramsNew)}
              />
            </div>
          </div>
          <TitleAction 
            title="" 
            titleActions={titleActions} 
            disableIcon={true}
          />

        </div> */}
        {!isLoading && listHoliday && listHoliday.length > 0 ? (
          <BoxTable
            name="Ngày nghỉ lễ"
            titles={titles}
            items={listHoliday}
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
                    Hiện tại chưa có ngày nghỉ lễ nào. <br />
                    Hãy thêm mới ngày nghỉ lễ đầu tiên nhé!
                  </span>
                }
                type="no-item"
                titleButton="Thêm ngày nghỉ lễ"
                action={() => {
                  setDataHoliday(null);
                  setShowModalAddHoliday(true);
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
      <AddHolidayModal
        onShow={showModalAddHoliday}
        data={dataHoliday}
        onHide={(reload) => {
          if (reload) {
            getListHoliday(params);
          }
          setShowModalAddHoliday(false);
        }}
      />
     
      <Dialog content={contentDialog} isOpen={showDialog} />
    </div>
  );
}

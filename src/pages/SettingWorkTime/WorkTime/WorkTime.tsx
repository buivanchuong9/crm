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
import "./WorkTime.scss";
import WorkTimeService from "services/WorkTimeService";
import AddWorkTimeModal from "./partials/AddWorkTimeModal";
import SettingWorkTimeModal from "./SettingWorkTimeModal/SettingWorkTimeModal";
import HeaderFilter from "components/HeaderFilter/HeaderFilter";
import ButtonOnOff from "components/ButtonOnOff/ButtonOnOff";
import { ContextType, UserContext } from "contexts/userContext";

export default function WorkTime(props: any) {
  document.title = "Thời gian làm việc";

  const { onBackProps } = props;

  const isMounted = useRef(false);
  const { dataInfoEmployee } = useContext(UserContext) as ContextType;
  console.log('dataInfoEmployee', dataInfoEmployee);
  
  const [listWorkTime, setListWorkTime] = useState([]);
  const [dataWorkTime, setDataWorkTime] = useState(null);
  const [listIdChecked, setListIdChecked] = useState<number[]>([]);
  const [showModalAddWorkTime, setShowModalAddWorkTime] = useState<boolean>(false);
  const [showSettingWorkTime, setShowSettingWorkTime] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNoItem, setIsNoItem] = useState<boolean>(false);
  const [isPermissions, setIsPermissions] = useState<boolean>(false);
  const [permissions, setPermissions] = useState(getPermissions());

  const [params, setParams] = useState({
    name: "",
    limit: 10,
    page: 1
  });

  const [listSaveSearch] = useState<ISaveSearch[]>([
    {
      key: "all",
      name: "Thời gian làm việc",
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

  const getListWorkTime = async (paramsSearch: any, disableLoading?: boolean) => {
    if(!disableLoading){
      setIsLoading(true);
    }
    
    const response = await WorkTimeService.listShift(paramsSearch, abortController.signal);

    if (response.code === 0) {
      const result = response.result;
      setListWorkTime(result?.items);

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
        getListWorkTime(params);
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
      {
        title: "Thêm mới",
        icon: <Icon name="Plus" style={{width: 13, height: 13}} />,
        callback: () => {
          setDataWorkTime(null);
          // setShowModalAddWorkTime(true);
          setShowSettingWorkTime(true);
        },
      }
    ],
  };

  const titlesAdmin = ["STT", "Ca làm việc", "Hoạt động"];
  const titles = ["STT", "Ca làm việc"];

  const dataFormat = ["text-center", "", "text-right"];

  const dataMappingArray = (item: any, index: number) => [
    getPageOffset(params) + index + 1,
    item.name, 
    <div style={{paddingRight: 14}}>
      <ButtonOnOff
        checked={item.active === 1 ? true : false}
        onChange={(value) => {
          if(item.active === 1){
              onActive(item.id, 0);
          } else {
              onActive(item.id, 1);
          }
        }}
      />
    </div>
    
  ];

  const actionsTable = (item: any): IAction[] => {
    return [
      // {
      //   title: "Cài đặt ca làm việc",
      //   icon: <Icon name="Settings" />,
      //   callback: () => {
      //     setDataWorkTime(item);
      //     // setShowSettingWorkTime(true);
      //   },
      // },
      {
        title: listIdChecked.length > 0 ? '' : "Sửa",
        disabled: listIdChecked.length > 0 ? true : false,
        icon: <Icon name="PencilSimpleLine" className={listIdChecked.length > 0 ? "icon-edit-inactive" : "icon-edit-active"}/>,
        callback: () => {
          if(listIdChecked.length === 0){
            setDataWorkTime(item);
            // setShowModalAddWorkTime(true);
            setShowSettingWorkTime(true);
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
      
    ].filter((action) => action);
  };

  const onActive = async (id, active) => {
    const body = {
        id: id,
        active: active
    }
    const response = await WorkTimeService.updateShiftActive(body);

    if (response.code === 0) {
      if(active === 1){
        showToast("Cập nhật hoạt động thành công", "success");
      } else {
        showToast("Cập nhật không hoạt động thành công", "success");
      }
      getListWorkTime(params, true);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    // setShowDialog(false);
    // setContentDialog(null);
  };

  const onDelete = async (id: number) => {
    const response = await WorkTimeService.deleteShift(id);

    if (response.code === 0) {
      showToast("Xóa ca làm việc thành công", "success");
      getListWorkTime(params);
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
        WorkTimeService.deleteShift(item).then((res) => resolve(res));
      });

      arrayPromise.push(promise);
    });

    Promise.all(arrayPromise).then((result) => {
      if (result.length > 0) {
        showToast("Xóa ca làm việc thành công", "success");
        getListWorkTime(params);
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
          Bạn có chắc chắn muốn xóa {item ? "ca làm việc " : `${listIdChecked.length} ca làm việc đã chọn`} {item ? <strong>{item.name}</strong> : ""}? Thao tác này không thể khôi phục.
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
      title: "Xóa ca làm việc",
      callback: () => showDialogConfirmDelete(),
    },
  ];

  return (
    <div className={`page-content page-work-time${isNoItem ? " bg-white" : ""}`}>
      {/* <div className="action-navigation">
        <div className="action-backup">
          <h1
            onClick={() => {
              onBackProps(true);
            }}
            className="title-first"
            title="Quay lại"
          >
            Cài đặt thời gian làm việc
          </h1>
          <Icon
            name="ChevronRight"
            onClick={() => {
              onBackProps(true);
            }}
          />
          <h1 className="title-last">Thời gian làm việc</h1>
        </div>
        <TitleAction title="" titleActions={titleActions} />
      </div> */}
      <div className="d-flex flex-column">
        <HeaderFilter
          params={params}
          setParams={setParams}
          listIdChecked={listIdChecked}
          showDialogConfirmDelete={showDialogConfirmDelete}
          titleActions={titleActions}
          titleSearch='Ca làm việc'
        />

        {!isLoading && listWorkTime && listWorkTime.length > 0 ? (
          <BoxTable
            name="Thời gian làm việc"
            // titles={dataInfoEmployee?.isOwner === 1 ? titlesAdmin: titles}
            titles={titlesAdmin}
            items={listWorkTime}
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
                    Hiện tại chưa có ca làm việc nào. <br />
                    Hãy thêm mới ca làm việc đầu tiên nhé!
                  </span>
                }
                type="no-item"
                titleButton="Thêm ca ngày làm việc"
                action={() => {
                  setDataWorkTime(null);
                  setShowModalAddWorkTime(true);
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
      <AddWorkTimeModal
        onShow={showModalAddWorkTime}
        data={dataWorkTime}
        onHide={(reload) => {
          if (reload) {
            getListWorkTime(params);
          }
          setShowModalAddWorkTime(false);
        }}
      />

      <SettingWorkTimeModal
        onShow={showSettingWorkTime}
        dataShift={dataWorkTime}
        onHide={(reload) => {
          if (reload) {
            getListWorkTime(params);
          }
          setShowSettingWorkTime(false);
        }}
      />
     
      <Dialog content={contentDialog} isOpen={showDialog} />
    </div>
  );
}

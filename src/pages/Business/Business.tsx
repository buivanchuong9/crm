import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import "./Business.scss";
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
import BusinessCategoryService from "services/BusinessCategoryService";
import _ from "lodash";
import ButtonOnOff from "components/ButtonOnOff/ButtonOnOff";
import HeaderFilter from "components/HeaderFilter/HeaderFilter";
import { ContextType, UserContext } from "contexts/userContext";
import AddBusinessModal from "./partials/AddBusinessModal";

export default function Business(props: any) {
  document.title = "Ngành nghề kinh doanh";

  const isMounted = useRef(false);
  const { dataInfoEmployee } = useContext(UserContext) as ContextType;

  const [isView, setIsView] = useState(false);

  const [listReason, setListReason] = useState([]);
  const [dataReason, setDataReason] = useState(null);
  const [listIdChecked, setListIdChecked] = useState<number[]>([]);
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNoItem, setIsNoItem] = useState<boolean>(false);
  const [isPermissions, setIsPermissions] = useState<boolean>(false);
  const [permissions, setPermissions] = useState(getPermissions());

  const [params, setParams] = useState({
    name: "",
    limit: 10,
    page: 1,
  });

  const [listSaveSearch] = useState<ISaveSearch[]>([
    {
      key: "all",
      name: "Danh mục ngành nghề kinh doanh",
      is_active: true,
    },
  ]);

  const [pagination, setPagination] = useState<PaginationProps>({
    ...DataPaginationDefault,
    name: "ngành nghề kinh doanh",
    isChooseSizeLimit: true,
    setPage: (page) => {
      setParams((prevParams) => ({ ...prevParams, page: page }));
    },
    chooseSizeLimit: (limit) => {
      setParams((prevParams) => ({ ...prevParams, limit: limit }));
    },
  });

  const abortController = new AbortController();

  const getListReason = async (paramsSearch: any, disableLoading?: boolean) => {
    if (!disableLoading) {
      setIsLoading(true);
    }

    const response = await BusinessCategoryService.list(paramsSearch, abortController.signal);

    if (response.code === 0) {
      const result = response.result;
      setListReason(result?.items);

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
      getListReason(params);
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
      // ...(dataInfoEmployee?.isOwner === 1
      //   ? [
      //     permissions["CASHBOOK_ADD"] == 1 &&
      //       {
      //         icon: <Icon name="Plus" style={{ width: 13, height: 13 }} />,
      //         title: "Thêm mới",
      //         callback: () => {
      //           setDataReason(null);
      //           setShowModalAdd(true);
      //           setIsView(false);
      //         },
      //       },
      //     ]
      //   : []),
      permissions["LIST_BUSINESS_CATEGORY_ADD"] == 1 &&
      {
        icon: <Icon name="Plus" style={{ width: 13, height: 13 }} />,
        title: "Thêm mới",
        callback: () => {
          setDataReason(null);
          setShowModalAdd(true);
          setIsView(false);
        },
      },
    ],
  };

  const titlesAdmin = ["STT", "Tên ngành nghề kinh doanh", "Hoạt động"];
  const titles = ["STT", "Tên ngành nghề kinh doanh"];

  const dataFormat = ["text-center", "", "text-right"];

  const dataMappingArray = (item: any, index: number) => [
    getPageOffset(params) + index + 1,
    // item.code,
    <div
      onClick={() => {
        setIsView(true);
        setShowModalAdd(true);
        setDataReason(item);
      }}
      className="title-name"
    >
      {item.name}
    </div>,
    ...(permissions["LIST_BUSINESS_CATEGORY_UPDATE"] == 1
      ? [
          <div style={{ paddingRight: 14 }}>
            <ButtonOnOff
              checked={item.active === 1 ? true : false}
              onChange={(value) => {
                if (item.active === 1) {
                  onActive(item.id, 0);
                } else {
                  onActive(item.id, 1);
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
      permissions["LIST_BUSINESS_CATEGORY_UPDATE"] == 1 &&
        {
          title: listIdChecked.length > 0 ? "" : "Sửa",
          disabled: listIdChecked.length > 0 ? true : false,
          icon: <Icon name="PencilSimpleLine" className={listIdChecked.length > 0 ? "icon-edit-inactive" : "icon-edit-active"} />,
          callback: () => {
            if (listIdChecked.length === 0) {
              setDataReason(item);
              setShowModalAdd(true);
              setIsView(false);
            }
          },
        },
      permissions["LIST_BUSINESS_CATEGORY_DELETE"] == 1 &&
        {
          title: listIdChecked.length > 0 ? "" : "Xóa",
          disabled: listIdChecked.length > 0 ? true : false,
          icon: <Icon name="TrashRox" className={listIdChecked.length > 0 ? "icon-delete-inactive" : "icon-delete-active"} />,
          callback: () => {
            if (listIdChecked.length === 0) {
              if (item.linkedCount > 0) {
                showToast("Ngành nghê kinh doanh đã được sử dụng nên không thể xoá", "warning");
              } else {
                showDialogConfirmDelete(item);
              }
            }
          },
        },
    ].filter((action) => action);
  };

  const onActive = async (id, active) => {
    const body = {
      id: id,
      active: active,
    };
    const response = await BusinessCategoryService.updateActive(body);

    if (response.code === 0) {
      if (active === 1) {
        showToast("Cập nhật hoạt động thành công", "success");
      } else {
        showToast("Cập nhật không hoạt động thành công", "success");
      }

      getListReason(params, true);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    // setShowDialog(false);
    // setContentDialog(null);
  };

  const onDelete = async (id: number) => {
    const response = await BusinessCategoryService.delete(id);

    if (response.code === 0) {
      showToast("Xóa ngành nghề kinh doanh thành công", "success");
      getListReason(params);
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
        BusinessCategoryService.delete(item).then((res) => resolve(res));
      });

      arrayPromise.push(promise);
    });

    Promise.all(arrayPromise).then((result) => {
      if (result.length > 0) {
        showToast("Xóa ngành nghề kinh doanh thành công", "success");
        getListReason(params);
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
          Bạn có chắc chắn muốn xóa {item ? "ngành nghề kinh doanh " : `${listIdChecked.length} ngành nghề kinh doanh đã chọn`}
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
      title: "Xóa ngành nghề kinh doanh",
      callback: () => showDialogConfirmDelete(),
    },
  ];

  return (
    <div className="page-content page-business-list card-box">
      <TitleAction title="Ngành nghề kinh doanh" />
      <div className="d-flex flex-column">
        <HeaderFilter
          params={params}
          setParams={setParams}
          listIdChecked={listIdChecked}
          showDialogConfirmDelete={showDialogConfirmDelete}
          titleActions={titleActions}
          titleSearch="Ngành nghề kinh doanh"
          disableDeleteAll = {permissions["LIST_BUSINESS_CATEGORY_DELETE"] == 1 ? false : true}
        />
        {!isLoading && listReason && listReason.length > 0 ? (
          <BoxTable
            name="Danh mục ngành nghề kinh doanh"
            titles={permissions["LIST_BUSINESS_CATEGORY_UPDATE"] == 1 ? titlesAdmin : titles}
            items={listReason}
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
                    Hiện tại chưa có Ngành nghề kinh doanh nào. <br />
                    Hãy thêm mới Ngành nghề kinh doanh đầu tiên nhé!
                  </span>
                }
                type="no-item"
                titleButton=""
                action={() => {
                  // setDataReason(null);
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
      <AddBusinessModal
        onShow={showModalAdd}
        data={dataReason}
        isView={isView}
        setIsView={setIsView}
        onHide={(reload) => {
          if (reload) {
            getListReason(params);
          }
          setShowModalAdd(false);
          setIsView(false);
        }}
      />

      <Dialog content={contentDialog} isOpen={showDialog} />
    </div>
  );
}

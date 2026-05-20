import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import "./ProjectCatalogList.scss";
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
import _ from "lodash";
import ButtonOnOff from "components/ButtonOnOff/ButtonOnOff";
import HeaderFilter from "components/HeaderFilter/HeaderFilter";
import { ContextType, UserContext } from "contexts/userContext";
import ProjectCatalogService from "services/ProjectCatalogService";
import ModalAddProjectCatalog from "./partials/ModalAddProjectCatalog";

export default function ProjectCatalogList(props: any) {
  document.title = "Danh sách loại dự án";

  const isMounted = useRef(false);
  const { dataInfoEmployee } = useContext(UserContext) as ContextType;

  const [listProjectCatalog, setListProjectCatalog] = useState([]);
  const [dataProjectCatalog, setDataProjectCatalog] = useState(null);
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
    page: 1
  });

  const [listSaveSearch] = useState<ISaveSearch[]>([
    {
      key: "all",
      name: "Danh sách loại dự án",
      is_active: true,
    },
  ]);

  const [pagination, setPagination] = useState<PaginationProps>({
    ...DataPaginationDefault,
    name: "loại dự án",
    isChooseSizeLimit: true,
    setPage: (page) => {
      setParams((prevParams) => ({ ...prevParams, page: page }));
    },
    chooseSizeLimit: (limit) => {
      setParams((prevParams) => ({ ...prevParams, limit: limit }));
    },
  });

  const abortController = new AbortController();

  const getListProjectCatalog = async (paramsSearch: any, disableLoading?: boolean) => {
    if(!disableLoading){
        setIsLoading(true);
    }
    
    const response = await ProjectCatalogService.list(paramsSearch, abortController.signal);

    if (response.code === 0) {
      const result = response.result;
      setListProjectCatalog(result?.items);

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
        getListProjectCatalog(params);
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
      // ...(dataInfoEmployee?.isOwner === 1 ? [
        
      // ] : [])
      permissions["LIST_PROJECT_TYPE_ADD"] == 1 &&
        {
          icon: <Icon name="Plus" style={{width: 13, height: 13}} />,
          title: "Thêm mới",
          callback: () => {
            setDataProjectCatalog(null);
            setShowModalAdd(true);
          },
        },
    ],
  };

  const titles = ["STT", "Tên loại dự án", ...(permissions["LIST_PROJECT_TYPE_UPDATE"] == 1 ? ["Hoạt động"] : [])];

  const dataFormat = ["text-center", "", "text-right"];

  const dataMappingArray = (item: any, index: number) => [
    getPageOffset(params) + index + 1,
    item.name, 
    ...(permissions["LIST_PROJECT_TYPE_UPDATE"] == 1 ? [
      <div style={{paddingRight: 14}}>
        <ButtonOnOff
          checked={item.status === 1 ? true : false}
          onChange={(value) => {
            if(item.status === 1){
                onStatus(item.id, 0);
            } else {
                onStatus(item.id, 1);
            }
          }}
        />
      </div>
    ] : []),
  ];

  const actionsTable = (item: any): IAction[] => {
    return [
      // ...(dataInfoEmployee?.isOwner === 1 ? [
        
      // ] : []),
      permissions["LIST_PROJECT_TYPE_UPDATE"] == 1 &&
        {
          title: listIdChecked.length > 0 ? '' : "Sửa",
          disabled: listIdChecked.length > 0 ? true : false,
          icon: <Icon name="PencilSimpleLine" className={listIdChecked.length > 0 ? "icon-edit-inactive" : "icon-edit-active"}/>,
          callback: () => {
            if(listIdChecked.length === 0){
              setDataProjectCatalog(item);
              setShowModalAdd(true);
            }
          },
        },
        permissions["LIST_PROJECT_TYPE_DELETE"] == 1 &&
        {
          title: listIdChecked.length > 0 ? '' : "Xóa",
          disabled: listIdChecked.length > 0 ? true : false,
          icon: <Icon name="TrashRox" className={listIdChecked.length > 0 ? "icon-delete-inactive" : "icon-delete-active"} />,
          callback: () => {
            if(listIdChecked.length === 0){
              if(item.linkedCount > 0){
                showToast("Loại dự án đã được sử dụng nên không thể xoá", "warning");
              } else {
                showDialogConfirmDelete(item);
              }
            }
          },
        },
      
    ].filter((action) => action);
  };

  const onStatus = async (id, status) => {
    const body = {
        id: id,
        status: status
    }
    const response = await ProjectCatalogService.updateStatus(body);

    if (response.code === 0) {
      if(status === 1){
        showToast("Cập nhật hoạt động thành công", "success");
      } else {
        showToast("Cập nhật không hoạt động thành công", "success");
      }
      
      getListProjectCatalog(params, true);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    // setShowDialog(false);
    // setContentDialog(null);
  };

  const onDelete = async (id: number) => {
    const response = await ProjectCatalogService.delete(id);

    if (response.code === 0) {
      showToast("Xóa loại dự án thành công", "success");
      getListProjectCatalog(params);
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
        ProjectCatalogService.delete(item).then((res) => resolve(res));
      });

      arrayPromise.push(promise);
    });

    Promise.all(arrayPromise).then((result) => {
      if (result.length > 0) {
        showToast("Xóa loại dự án thành công", "success");
        getListProjectCatalog(params);
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
          Bạn có chắc chắn muốn xóa {item ? "loại dự án " : `${listIdChecked.length} loại dự án đã chọn`}
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
      title: "Xóa loại dự án",
      callback: () => showDialogConfirmDelete(),
    },
  ];


  return (
    <div className="page-content page-project-catalog-list card-box">
        <TitleAction title="Loại dự án" />
        <div className="d-flex flex-column">
            <HeaderFilter
              params={params}
              setParams={setParams}
              listIdChecked={listIdChecked}
              showDialogConfirmDelete={showDialogConfirmDelete}
              titleActions={titleActions}
              titleSearch="theo tên"
              disableDeleteAll = {permissions["LIST_PROJECT_TYPE_DELETE"] == 1 ? false : true}
            />
            {!isLoading && listProjectCatalog && listProjectCatalog.length > 0 ? (
                <BoxTable
                    name="Danh sách loại dự án"
                    titles={titles}
                    items={listProjectCatalog}
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
                                    Hiện tại chưa có loại dự án nào. <br />
                                    Hãy thêm mới loại dự án đầu tiên nhé!
                                </span>
                            }
                            type="no-item"
                            titleButton=""
                            action={() => {
                                // setDataProjectCatalog(null);
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
        <ModalAddProjectCatalog
            onShow={showModalAdd}
            data={dataProjectCatalog}
            onHide={(reload) => {
                if (reload) {
                    getListProjectCatalog(params);
                }
                setShowModalAdd(false);
            }}
        />

        <Dialog content={contentDialog} isOpen={showDialog} />      
    </div>
  );
}

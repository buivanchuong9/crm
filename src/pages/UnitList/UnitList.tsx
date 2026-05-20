import React, { Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import "./UnitList.scss";
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
import _ from "lodash";
import ButtonOnOff from "components/ButtonOnOff/ButtonOnOff";
import HeaderFilter from "components/HeaderFilter/HeaderFilter";
import { ContextType, UserContext } from "contexts/userContext";
import UnitService from "services/UnitService";
import ModalAddUnit from "./partials/ModalAddUnit";
import { ExportExcel } from "exports";
import ExportModal from "components/exportModal/exportModal";

export default function UnitList(props: any) {
  document.title = "Danh sách đơn vị tính";

  const isMounted = useRef(false);
  const { dataInfoEmployee } = useContext(UserContext) as ContextType;

  const [listUnit, setListUnit] = useState([]);
  const [dataUnit, setDataUnit] = useState(null);
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
      name: "Đơn vị tính",
      is_active: true,
    },
  ]);

  const [pagination, setPagination] = useState<PaginationProps>({
    ...DataPaginationDefault,
    name: "đơn vị tính",
    isChooseSizeLimit: true,
    setPage: (page) => {
      setParams((prevParams) => ({ ...prevParams, page: page }));
    },
    chooseSizeLimit: (limit) => {
      setParams((prevParams) => ({ ...prevParams, limit: limit }));
    },
  });

  const abortController = new AbortController();

  const getListUnit = async (paramsSearch: any, disableLoading?: boolean) => {
    if(!disableLoading){
        setIsLoading(true);
    }
    
    const response = await UnitService.list(paramsSearch, abortController.signal);

    if (response.code === 0) {
      const result = response.result;
      setListUnit(result?.items);

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
        getListUnit(params);
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
      permissions["LIST_UNIT_ADD"] == 1 &&
        {
          icon: <Icon name="Plus" style={{width: 13, height: 13}} />,
          title: "Thêm mới",
          callback: () => {
            setDataUnit(null);
            setShowModalAdd(true);
          },
        },
    ],
  };

  const titles = ["STT", "Mã đơn vị tính", "Tên đơn vị tính", ...(permissions["LIST_UNIT_UPDATE"] == 1 ? ["Hoạt động"] : []) ];

  const dataFormat = ["text-center", "", "", "text-right"];

  const dataMappingArray = (item: any, index: number, type?: string) => 
  type !== "export"
   ? [
      getPageOffset(params) + index + 1,
      item.code,
      item.name, 
      ...(permissions["LIST_UNIT_UPDATE"] == 1 ? [
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
    ] 
    : [
      getPageOffset(params) + index + 1,
      item.code,
      item.name, 
    ];

  const actionsTable = (item: any): IAction[] => {
    return [
      // ...(dataInfoEmployee?.isOwner === 1 ? [
        
      // ] : []),
      permissions["LIST_UNIT_UPDATE"] == 1 &&
      {
        title: listIdChecked.length > 0 ? '' : "Sửa",
        disabled: listIdChecked.length > 0 ? true : false,
        icon: <Icon name="PencilSimpleLine" className={listIdChecked.length > 0 ? "icon-edit-inactive" : "icon-edit-active"}/>,
        callback: () => {
          if(listIdChecked.length === 0){
            setDataUnit(item);
            setShowModalAdd(true);
          }
        },
      },
      permissions["LIST_UNIT_DELETE"] == 1 &&
      {
        title: listIdChecked.length > 0 ? '' : "Xóa",
        disabled: listIdChecked.length > 0 ? true : false,
        icon: <Icon name="TrashRox" className={listIdChecked.length > 0 ? "icon-delete-inactive" : "icon-delete-active"} />,
        callback: () => {
          if(listIdChecked.length === 0){
            if(item.linkedCount > 0){
              showToast("Đơn vị tính đã được sử dụng nên không thể xoá", "warning");
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
    const response = await UnitService.updateStatus(body);

    if (response.code === 0) {
      if(status === 1){
        showToast("Cập nhật hoạt động thành công", "success");
      } else {
        showToast("Cập nhật không hoạt động thành công", "success");
      }
      
      getListUnit(params, true);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    // setShowDialog(false);
    // setContentDialog(null);
  };

  const onDelete = async (id: number) => {
    const response = await UnitService.delete(id);

    if (response.code === 0) {
      showToast("Xóa đơn vị tính thành công", "success");
      getListUnit(params);
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
        UnitService.delete(item).then((res) => resolve(res));
      });

      arrayPromise.push(promise);
    });

    Promise.all(arrayPromise).then((result) => {
      if (result.length > 0) {
        showToast("Xóa đơn vị tính thành công", "success");
        getListUnit(params);
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
          Bạn có chắc chắn muốn xóa {item ? "đơn vị tính " : `${listIdChecked.length} đơn vị tính đã chọn`}
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
      title: "Xóa đơn vị tính",
      callback: () => showDialogConfirmDelete(),
    },
  ];

  //Export
  const titlesExcel = ["STT", "Mã đơn vị tính", "Tên đơn vị tính"];
  const dataFormatExport = ["center", "left", "left", "left"];
  const [onShowModalExport, setOnShowModalExport] = useState<boolean>(false);

  const optionsExport: IOption[] = useMemo(
    () => [
      {
        value: "all",
        label: "Tất cả đơn vị tính",
      },
      {
        value: "current_page",
        label: "Trên trang này",
        disabled: pagination.totalItem === 0,
      },
      {
        value: "current_search",
        label: `${pagination.totalItem} đơn vị tính phù hợp với kết quả tìm kiếm hiện tại`,
        disabled: pagination.totalItem === 0 || !isDifferenceObj(params, { keyword: "" }),
      },
    ],
    [pagination, params]
  );
  const exportCallback = useCallback(
    async (type, extension) => {
      const response = await UnitService.list({
        ...params,
        page: type === "current_page" ? 1 : params.page,
        limit: type === "all" || type === "current_search" ? 10000 : params.limit,
        name: type === "all" ? "" : params.name
      });

      if (response.code === 0) {
        const result = response.result.items;

        if (extension === "excel") {
          ExportExcel({
            fileName: "DonViTinh",
            title: "Đơn vị tính",
            header: titlesExcel,
            formatExcel: dataFormatExport,
            data: result.map((item, idx) => dataMappingArray(item, idx, "export")),
            info: { name },
          });
        }
        showToast("Xuất file thành công", "success");
        setOnShowModalExport(false);
      } else {
        showToast("Có lỗi xảy ra. Vui lòng thử lại sau!", "error");
        setOnShowModalExport(false);
      }
    },
    [params]
  );

  return (
    <div className="page-content page-unit-list card-box">
        <TitleAction title="Đơn vị tính" />
        <div className="d-flex flex-column">
            <HeaderFilter
              params={params}
              setParams={setParams}
              listIdChecked={listIdChecked}
              showDialogConfirmDelete={showDialogConfirmDelete}
              titleActions={titleActions}
              titleSearch="theo tên"
              exportExcel={true}
              setOnShowModalExport={() => {setOnShowModalExport(true)}}
              disableDeleteAll = {permissions["LIST_UNIT_DELETE"] == 1 ? false : true} 
            />
            {!isLoading && listUnit && listUnit.length > 0 ? (
                <BoxTable
                    name="Đơn vị tính"
                    titles={titles}
                    items={listUnit}
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
                                    Hiện tại chưa có đơn vị tính nào. <br />
                                    Hãy thêm mới đơn vị tính đầu tiên nhé!
                                </span>
                            }
                            type="no-item"
                            titleButton=""
                            action={() => {
                                // setDataUnit(null);
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
        <ModalAddUnit
          onShow={showModalAdd}
          data={dataUnit}
          onHide={(reload) => {
              if (reload) {
                  getListUnit(params);
              }
              setShowModalAdd(false);
          }}
        />

        <ExportModal
          name="Đơn vị tính"
          onShow={onShowModalExport}
          onHide={() => setOnShowModalExport(false)}
          options={optionsExport}
          callback={(type, extension) => exportCallback(type, extension)}
        />

        <Dialog content={contentDialog} isOpen={showDialog} />      
    </div>
  );
}

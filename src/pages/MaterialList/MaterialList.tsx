import ButtonOnOff from "components/ButtonOnOff/ButtonOnOff";
import HeaderFilter from "components/HeaderFilter/HeaderFilter";
import { BulkActionItemModel } from "components/bulkAction/bulkAction";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import ExportModal from "components/exportModal/exportModal";
import Icon from "components/icon";
import Loading from "components/loading";
import { DataPaginationDefault, PaginationProps } from "components/pagination/pagination";
import { SystemNotification } from "components/systemNotification/systemNotification";
import TitleAction, { ITitleActions } from "components/titleAction/titleAction";
import { ContextType, UserContext } from "contexts/userContext";
import { ExportExcel } from "exports";
import _ from "lodash";
import { IAction, IOption, ISaveSearch } from "model/OtherModel";
import { IContractPipelineResponse } from "model/contractPipeline/ContractPipelineResponseModel";
import React, { Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { getPageOffset, isDifferenceObj } from "reborn-util";
import MaterialService from "services/MaterialService";
import { getPermissions, showToast } from "utils/common";
import BoxTable from "./BoxTable/BoxTable";
import "./MaterialList.scss";
import ModalImport from "./ModalImport/ModalImport";
import ModalAddMaterial from "./partials/ModalAddMaterial";

export default function MaterialList(props: any) {
  document.title = "Danh sách vật tư";

  const isMounted = useRef(false);
  const { dataInfoEmployee } = useContext(UserContext) as ContextType;

  const [listMaterial, setListMaterial] = useState([]);
  const [dataMaterial, setDataMaterial] = useState(null);
  const [listIdChecked, setListIdChecked] = useState<number[]>([]);
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNoItem, setIsNoItem] = useState<boolean>(false);
  const [isPermissions, setIsPermissions] = useState<boolean>(false);
  const [permissions, setPermissions] = useState(getPermissions());
  const [isView, setIsView] = useState(false);

  const [params, setParams] = useState({
    name: "",
    limit: 10,
    page: 1,
  });

  const [listSaveSearch] = useState<ISaveSearch[]>([
    {
      key: "all",
      name: "Vật tư",
      is_active: true,
    },
  ]);

  const [pagination, setPagination] = useState<PaginationProps>({
    ...DataPaginationDefault,
    name: "vật tư",
    isChooseSizeLimit: true,
    setPage: (page) => {
      setParams((prevParams) => ({ ...prevParams, page: page }));
    },
    chooseSizeLimit: (limit) => {
      setParams((prevParams) => ({ ...prevParams, limit: limit }));
    },
  });

  const abortController = new AbortController();

  const getListMaterial = async (paramsSearch: any, disableLoading?: boolean) => {
    if (!disableLoading) {
      setIsLoading(true);
    }

    const response = await MaterialService.list(paramsSearch, abortController.signal);

    if (response.code === 0) {
      const result = response.result;
      setListMaterial(result?.items);

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
      getListMaterial(params);
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
      permissions["LIST_MATERIAL_ADD"] == 1 && {
        icon: <Icon name="Plus" style={{ width: 13, height: 13 }} />,
        title: "Thêm mới",
        callback: () => {
          setDataMaterial(null);
          setShowModalAdd(true);
        },
      },
    ],
  };

  const titles = ["STT", "Mã vật tư", "Tên vật tư", "Đơn vị tính", ...(permissions["LIST_MATERIAL_UPDATE"] == 1 ? ["Hoạt động"] : [])];

  const dataFormat = ["text-center", "", "", "", "text-right"];

  const dataMappingArray = (item: any, index: number, type?: string) =>
    type !== "export"
      ? [
          getPageOffset(params) + index + 1,
          item.code,
          <div
            onClick={() => {
              setIsView(true);
              setShowModalAdd(true);
              setDataMaterial(item);
            }}
            className="title-name"
          >
            {item.name}
          </div>,
          item.unitCode,
          ...(permissions["LIST_MATERIAL_UPDATE"] == 1
            ? [
                <div style={{ paddingRight: 14 }}>
                  <ButtonOnOff
                    checked={item.status === 1 ? true : false}
                    onChange={(value) => {
                      if (item.status === 1) {
                        onStatus(item.id, 0);
                      } else {
                        onStatus(item.id, 1);
                      }
                    }}
                  />
                </div>,
              ]
            : []),
        ]
      : [getPageOffset(params) + index + 1, item.code, item.name, item.unitCode, item.status === 1 ? "Hoạt động" : "Không hoạt động"];

  const actionsTable = (item: any): IAction[] => {
    return [
      // ...(dataInfoEmployee?.isOwner === 1 ? [

      // ] : []),
      permissions["LIST_MATERIAL_UPDATE"] == 1 && {
        title: listIdChecked.length > 0 ? "" : "Sửa",
        disabled: listIdChecked.length > 0 ? true : false,
        icon: <Icon name="PencilSimpleLine" className={listIdChecked.length > 0 ? "icon-edit-inactive" : "icon-edit-active"} />,
        callback: () => {
          if (listIdChecked.length === 0) {
            setDataMaterial(item);
            setShowModalAdd(true);
          }
        },
      },
      permissions["LIST_MATERIAL_DELETE"] == 1 && {
        title: listIdChecked.length > 0 ? "" : "Xóa",
        disabled: listIdChecked.length > 0 ? true : false,
        icon: <Icon name="TrashRox" className={listIdChecked.length > 0 ? "icon-delete-inactive" : "icon-delete-active"} />,
        callback: () => {
          if (listIdChecked.length === 0) {
            if (item.used > 0) {
              showToast("Vật tư đã được sử dụng nên không thể xoá", "warning");
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
      status: status,
    };
    const response = await MaterialService.updateStatus(body);

    if (response.code === 0) {
      if (status === 1) {
        showToast("Cập nhật hoạt động thành công", "success");
      } else {
        showToast("Cập nhật không hoạt động thành công", "success");
      }

      getListMaterial(params, true);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    // setShowDialog(false);
    // setContentDialog(null);
  };

  const onDelete = async (id: number) => {
    const response = await MaterialService.delete(id);

    if (response.code === 0) {
      showToast("Xóa vật tư thành công", "success");
      getListMaterial(params);
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
        MaterialService.delete(item).then((res) => resolve(res));
      });

      arrayPromise.push(promise);
    });

    Promise.all(arrayPromise).then((result) => {
      if (result.length > 0) {
        showToast("Xóa vật tư thành công", "success");
        getListMaterial(params);
        setListIdChecked([]);
      } else {
        showToast("Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      }
      setShowDialog(false);
      setContentDialog(null);
    });
  };

  const showDialogConfirmDelete = (item?: IContractPipelineResponse) => {
    if (listIdChecked.length > 0) {
      for (const idChecked of listIdChecked) {
        const item = listMaterial.find((obj) => obj.id === idChecked);
        if (item?.used > 0) {
          showToast("Vật tư đã được sử dụng nên không thể xoá", "warning");
          return; // Thoát luôn
        }
      }
    }
    const contentDialog: IContentDialog = {
      color: "error",
      className: "dialog-delete",
      isCentered: true,
      isLoading: true,
      title: <Fragment>Xóa...</Fragment>,
      message: (
        <Fragment>
          Bạn có chắc chắn muốn xóa {item ? "vật tư " : `${listIdChecked.length} vật tư đã chọn`}
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
      title: "Xóa vật tư",
      callback: () => showDialogConfirmDelete(),
    },
  ];

  //Export
  const titlesExcel = ["STT", "Mã vật tư *", "Tên vật tư *", "Đơn vị tính", "Trạng thái"];
  const dataFormatExport = ["center", "left", "left", "left", "left"];
  const [onShowModalExport, setOnShowModalExport] = useState<boolean>(false);

  const optionsExport: IOption[] = useMemo(
    () => [
      {
        value: "all",
        label: "Tất cả vật tư",
      },
      {
        value: "current_page",
        label: "Trên trang này",
        disabled: pagination.totalItem === 0,
      },
      {
        value: "current_search",
        label: `${pagination.totalItem} vật tư phù hợp với kết quả tìm kiếm hiện tại`,
        disabled: pagination.totalItem === 0 || !isDifferenceObj(params, { keyword: "" }),
      },
    ],
    [pagination, params]
  );
  const exportCallback = useCallback(
    async (type, extension) => {
      const response = await MaterialService.list({
        ...params,
        page: type === "current_page" ? 1 : params.page,
        limit: type === "all" || type === "current_search" ? 10000 : params.limit,
        name: type === "all" ? "" : params.name,
      });

      if (response.code === 0) {
        const result = response.result.items;

        if (extension === "excel") {
          ExportExcel({
            fileName: "VatTu",
            title: "Vật tư",
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

  //import
  const [onShowModalImport, setOnShowModalImport] = useState(false);

  return (
    <div className="page-content page-material-list card-box">
      <TitleAction title="Vật tư" />
      <div className="d-flex flex-column">
        <HeaderFilter
          params={params}
          setParams={setParams}
          listIdChecked={listIdChecked}
          showDialogConfirmDelete={showDialogConfirmDelete}
          titleActions={titleActions}
          titleSearch="theo tên"
          exportExcel={permissions["LIST_MATERIAL_EXPORT"] == 1 ? true : false}
          setOnShowModalExport={() => {
            setOnShowModalExport(true);
          }}
          importExcel={permissions["LIST_MATERIAL_IMPORT"] == 1 ? true : false}
          setOnShowModalImport={() => {
            setOnShowModalImport(true);
          }}
          disableDeleteAll={permissions["LIST_MATERIAL_DELETE"] == 1 ? false : true}
        />
        {!isLoading && listMaterial && listMaterial.length > 0 ? (
          <BoxTable
            name="Vật tư"
            titles={titles}
            items={listMaterial}
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
                    Hiện tại chưa có vật tư nào. <br />
                    Hãy thêm mới vật tư đầu tiên nhé!
                  </span>
                }
                type="no-item"
                titleButton=""
                action={() => {
                  // setDataMaterial(null);
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
      <ModalAddMaterial
        onShow={showModalAdd}
        data={dataMaterial}
        isView={isView}
        setIsView={setIsView}
        onHide={(reload) => {
          if (reload) {
            getListMaterial(params);
          }
          setShowModalAdd(false);
          setIsView(false);
        }}
      />

      <ExportModal
        name="Vật tư"
        onShow={onShowModalExport}
        onHide={() => setOnShowModalExport(false)}
        options={optionsExport}
        callback={(type, extension) => exportCallback(type, extension)}
      />

      <ModalImport
        onShow={onShowModalImport}
        data={null}
        onHide={(reload) => {
          if (reload) {
            getListMaterial(params);
          }
          setOnShowModalImport(false);
        }}
      />

      <Dialog content={contentDialog} isOpen={showDialog} />
    </div>
  );
}

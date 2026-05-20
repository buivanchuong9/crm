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
import WorkCategoryService from "services/WorkCategoryService";
import { getPermissions, showToast } from "utils/common";
import BoxTable from "./BoxTable/BoxTable";
import ModalImport from "./ModalImport/ModalImport";
import "./WorkCategoryList.scss";
import ModalAddWorkCategory from "./partials/ModalAddWorkCategory";

// import ModalImport from "./ModalImport/ModalImport";

export default function WorkCategoryList(props: any) {
  document.title = "Danh sách công việc";

  const isMounted = useRef(false);
  const { dataInfoEmployee } = useContext(UserContext) as ContextType;

  const [listWorkCategory, setListWorkCategory] = useState([]);
  const [dataWorkCategory, setDataWorkCategory] = useState(null);
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
      name: "Công việc",
      is_active: true,
    },
  ]);

  const [pagination, setPagination] = useState<PaginationProps>({
    ...DataPaginationDefault,
    name: "công việc",
    isChooseSizeLimit: true,
    setPage: (page) => {
      setParams((prevParams) => ({ ...prevParams, page: page }));
    },
    chooseSizeLimit: (limit) => {
      setParams((prevParams) => ({ ...prevParams, limit: limit }));
    },
  });

  const abortController = new AbortController();

  const getListWorkCategory = async (paramsSearch: any, disableLoading?: boolean) => {
    if (!disableLoading) {
      setIsLoading(true);
    }

    const response = await WorkCategoryService.list(paramsSearch, abortController.signal);

    if (response.code === 0) {
      const result = response.result;
      setListWorkCategory(result?.items);

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
      getListWorkCategory(params);
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
      permissions["LIST_WORK_CATEGORY_ADD"] == 1 && {
        icon: <Icon name="Plus" style={{ width: 13, height: 13 }} />,
        title: "Thêm mới",
        callback: () => {
          setDataWorkCategory(null);
          setShowModalAdd(true);
        },
      },
    ],
  };

  const titles = ["STT", "Mã công việc", "Tên công việc", "Đơn vị tính", ...(permissions["LIST_WORK_CATEGORY_UPDATE"] == 1 ? ["Hoạt động"] : [])];

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
              setDataWorkCategory(item);
            }}
            className="title-name"
          >
            {item.name}
          </div>,
          item.unitCode,
          ...(permissions["LIST_WORK_CATEGORY_UPDATE"] == 1
            ? [
                <div style={{ paddingRight: 14 }}>
                  <ButtonOnOff
                    checked={item.active === 1}
                    onChange={(value) => {
                      onStatus(item.id, item.active === 1 ? 0 : 1);
                    }}
                  />
                </div>,
              ]
            : []),
        ]
      : [index + 1, item.code, item.name, item.unitCode, item.active === 1 ? "Hoạt động" : "Không hoạt động"];

  const actionsTable = (item: any): IAction[] => {
    return [
      // ...(dataInfoEmployee?.isOwner === 1 ? [

      // ] : []),
      permissions["LIST_WORK_CATEGORY_UPDATE"] == 1 && {
        title: listIdChecked.length > 0 ? "" : "Sửa",
        disabled: listIdChecked.length > 0 ? true : false,
        icon: <Icon name="PencilSimpleLine" className={listIdChecked.length > 0 ? "icon-edit-inactive" : "icon-edit-active"} />,
        callback: () => {
          if (listIdChecked.length === 0) {
            setDataWorkCategory(item);
            setShowModalAdd(true);
          }
        },
      },
      permissions["LIST_WORK_CATEGORY_DELETE"] == 1 && {
        title: listIdChecked.length > 0 ? "" : "Xóa",
        disabled: listIdChecked.length > 0 ? true : false,
        icon: <Icon name="TrashRox" className={listIdChecked.length > 0 ? "icon-delete-inactive" : "icon-delete-active"} />,
        callback: () => {
          if (listIdChecked.length === 0) {
            if (item.used > 0) {
              showToast("Công việc đã được sử dụng nên không thể xoá", "warning");
            } else {
              showDialogConfirmDelete(item);
            }
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
    const response = await WorkCategoryService.updateStatus(body);

    if (response.code === 0) {
      if (active === 1) {
        showToast("Cập nhật hoạt động thành công", "success");
      } else {
        showToast("Cập nhật không hoạt động thành công", "success");
      }

      getListWorkCategory(params, true);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    // setShowDialog(false);
    // setContentDialog(null);
  };

  const onDelete = async (id: number) => {
    const response = await WorkCategoryService.delete(id);

    if (response.code === 0) {
      showToast("Xóa công việc thành công", "success");
      getListWorkCategory(params);
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
        WorkCategoryService.delete(item).then((res) => resolve(res));
      });

      arrayPromise.push(promise);
    });

    Promise.all(arrayPromise).then((result) => {
      if (result.length > 0) {
        showToast("Xóa công việc thành công", "success");
        getListWorkCategory(params);
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
        const item = listWorkCategory.find((obj) => obj.id === idChecked);
        if (item?.used > 0) {
          showToast("Công việc đã được sử dụng nên không thể xoá", "warning");
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
          Bạn có chắc chắn muốn xóa {item ? "công việc " : `${listIdChecked.length} công việc đã chọn`}
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
      title: "Xóa công việc",
      callback: () => showDialogConfirmDelete(),
    },
  ];

  //Export
  const titlesExcel = ["STT", "Mã công việc *", "Tên công việc *", "Đơn vị tính", "Trạng thái"];
  const dataFormatExport = ["center", "left", "left", "left"];
  const [onShowModalExport, setOnShowModalExport] = useState<boolean>(false);

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
  const exportCallback = useCallback(
    async (type, extension) => {
      let requestParams = { ...params };

      if (type === "all") {
        requestParams = {
          ...requestParams,
          page: 1,
          limit: 10000,
          name: "",
        };
      } else if (type === "current_page") {
        requestParams = {
          ...requestParams,
          page: params.page || 1,
          limit: params.limit,
          name: params.name,
        };
      } else if (type === "current_search") {
        requestParams = {
          ...requestParams,
          page: 1,
          limit: 10000,
          name: params.name,
        };
      }

      const response = await WorkCategoryService.list(requestParams);

      if (response.code === 0) {
        const result = response.result.items;

        if (extension === "excel") {
          ExportExcel({
            fileName: "CongViec",
            title: "Công việc",
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
    <div className="page-content page-work-category-list card-box">
      <TitleAction title="Công việc" />
      <div className="d-flex flex-column">
        <HeaderFilter
          params={params}
          setParams={setParams}
          listIdChecked={listIdChecked}
          showDialogConfirmDelete={showDialogConfirmDelete}
          titleActions={titleActions}
          titleSearch="theo tên"
          exportExcel={permissions["LIST_WORK_CATEGORY_EXPORT"] == 1 ? true : false}
          setOnShowModalExport={() => {
            setOnShowModalExport(true);
          }}
          importExcel={permissions["LIST_WORK_CATEGORY_IMPORT"] == 1 ? true : false}
          setOnShowModalImport={() => {
            setOnShowModalImport(true);
          }}
          disableDeleteAll={permissions["LIST_MATERIAL_DELETE"] == 1 ? false : true}
        />
        {!isLoading && listWorkCategory && listWorkCategory.length > 0 ? (
          <BoxTable
            name="Công việc"
            titles={titles}
            items={listWorkCategory}
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
                    Hiện tại chưa có công việc nào. <br />
                    Hãy thêm mới công việc đầu tiên nhé!
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
      <ModalAddWorkCategory
        onShow={showModalAdd}
        data={dataWorkCategory}
        isView={isView}
        setIsView={setIsView}
        onHide={(reload) => {
          if (reload) {
            getListWorkCategory(params);
          }
          setShowModalAdd(false);
          setIsView(false);
        }}
      />

      <ExportModal
        name="Danh mục công việc"
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
            getListWorkCategory(params);
          }
          setOnShowModalImport(false);
        }}
      />

      <Dialog content={contentDialog} isOpen={showDialog} />
    </div>
  );
}

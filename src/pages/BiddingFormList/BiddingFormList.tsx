import React, { Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import "./BiddingFormList.scss";
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
import { getPermissions, showToast } from "utils/common";
import { getPageOffset, isDifferenceObj } from "reborn-util";
import _ from "lodash";
import ButtonOnOff from "components/ButtonOnOff/ButtonOnOff";
import HeaderFilter from "components/HeaderFilter/HeaderFilter";
import { ContextType, UserContext } from "contexts/userContext";
import { ExportExcel } from "exports";
import ExportModal from "components/exportModal/exportModal";
import ModalAddBiddingForm from "./partials/ModalAddBiddingForm";
import BiddingFormService from "services/BiddingFormService";

export default function BiddingFormList(props: any) {
  document.title = "Biểu mẫu hồ sơ mời thầu";

  const isMounted = useRef(false);
  const { dataInfoEmployee } = useContext(UserContext) as ContextType;

  const [listBiddingForm, setListBiddingForm] = useState([]);
  const [dataBiddingForm, setDataBiddingForm] = useState(null);
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
    page: 1
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
    name: "biểu mẫu",
    isChooseSizeLimit: true,
    setPage: (page) => {
      setParams((prevParams) => ({ ...prevParams, page: page }));
    },
    chooseSizeLimit: (limit) => {
      setParams((prevParams) => ({ ...prevParams, limit: limit, page: 1 }));
    },
  });

  const abortController = new AbortController();

  const getListBiddingForm = async (paramsSearch: any, disableLoading?: boolean) => {
    if(!disableLoading){
        setIsLoading(true);
    }
    
    const response = await BiddingFormService.list(paramsSearch, abortController.signal);

    if (response.code === 0) {
      const result = response.result;
      setListBiddingForm(result?.items);

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
        getListBiddingForm(params);
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
      permissions["LIST_BIDDING_FORM_ADD"] == 1 &&
        {
          icon: <Icon name="Plus" style={{width: 13, height: 13}} />,
          title: "Thêm mới",
          callback: () => {
            setDataBiddingForm(null);
            setShowModalAdd(true);
          },
        },
    ],
  };

  const titles = ["STT", "Tên biểu mẫu", "Loại hồ sơ mời thầu", "Lĩnh vực", "Loại gói thầu", "Loại dự án"];

  const dataFormat = ["text-center", "", "", "", "", ""];

  const dataMappingArray = (item: any, index: number, type?: string) => 
    type !== "export"
    ? [
        getPageOffset(params) + index + 1,
        <div
            onClick={() => {
                setIsView(true);
                setShowModalAdd(true);
                setDataBiddingForm(item);
            }}
            className="title-name"
            >
            {item.name}
        </div>,
        item.documentType,
        item.fieldName,
        item.procurementTypeName,
        item.projectTypeName
      
    ]
    : 
    [
      getPageOffset(params) + index + 1,
      item.name,
      item.documentType,
      item.fieldName,
      item.procurementTypeName,
      item.projectTypeName
    ];

  const actionsTable = (item: any): IAction[] => {
    return [
      // ...(dataInfoEmployee?.isOwner === 1 ? [
        
      // ] : []),
      permissions["LIST_BIDDING_FORM_UPDATE"] == 1 &&
        {
          title: listIdChecked.length > 0 ? '' : "Sửa",
          disabled: listIdChecked.length > 0 ? true : false,
          icon: <Icon name="PencilSimpleLine" className={listIdChecked.length > 0 ? "icon-edit-inactive" : "icon-edit-active"}/>,
          callback: () => {
            if(listIdChecked.length === 0){
              setDataBiddingForm(item);
              setShowModalAdd(true);
            }
          },
        },
        permissions["LIST_BIDDING_FORM_DELETE"] == 1 &&
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

  const onDelete = async (id: number) => {
    const response = await BiddingFormService.delete(id);

    if (response.code === 0) {
      showToast("Xóa biểu mẫu thành công", "success");
      getListBiddingForm(params);
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
        BiddingFormService.delete(item).then((res) => resolve(res));
      });

      arrayPromise.push(promise);
    });

    Promise.all(arrayPromise).then((result) => {
      if (result.length > 0) {
        showToast("Xóa biểu mẫu thành công", "success");
        getListBiddingForm(params);
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
          Bạn có chắc chắn muốn xóa {item ? "biểu mẫu " : `${listIdChecked.length} biểu mẫu đã chọn`}
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
      title: "Xóa biểu mẫu",
      callback: () => showDialogConfirmDelete(),
    },
  ];

  //Export
  const titlesExcel = ["STT", "Tên biểu mẫu", "Loại hồ sơ mời thầu", "Lĩnh vực", "Loại gói thầu", "Loại dự án"];
  const dataFormatExport = ["center", "left", "left", "left", "left", "left"];
  const [onShowModalExport, setOnShowModalExport] = useState<boolean>(false);

  const optionsExport: IOption[] = useMemo(
    () => [
      {
        value: "all",
        label: "Tất cả biểu mẫu",
      },
      {
        value: "current_page",
        label: "Trên trang này",
        disabled: pagination.totalItem === 0,
      },
      {
        value: "current_search",
        label: `${pagination.totalItem} biểu mẫu phù hợp với kết quả tìm kiếm hiện tại`,
        disabled: pagination.totalItem === 0 || !isDifferenceObj(params, { keyword: "" }),
      },
    ],
    [pagination, params]
  );
  const exportCallback = useCallback(
    async (type, extension) => {
      const response = await BiddingFormService.list({
        ...params,
        page: type === "current_page" ? 1 : params.page,
        limit: type === "all" || type === "current_search" ? 10000 : params.limit,
        name: type === "all" ? "" : params.name
      });

      if (response.code === 0) {
        const result = response.result.items;

        if (extension === "excel") {
          ExportExcel({
            fileName: "BieuMau",
            title: "Biểu mẫu",
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
    <div className="page-content page-bidding-form-list card-box">
        <TitleAction title="Biểu mẫu hồ sơ mời thầu" />
        <div className="d-flex flex-column">
            <HeaderFilter
              params={params}
              setParams={setParams}
              listIdChecked={listIdChecked}
              showDialogConfirmDelete={showDialogConfirmDelete}
              titleActions={titleActions}
              titleSearch="theo tên"
              exportExcel={permissions["LIST_BIDDING_FORM_EXPORT"] == 1 ? true : false}
              setOnShowModalExport={() => {setOnShowModalExport(true)}}
            //   importExcel={true}
            //   setOnShowModalImport={() => {setOnShowModalImport(true)}}
              disableDeleteAll = {permissions["LIST_MATERIAL_DELETE"] == 1 ? false : true} 
            />
            {!isLoading && listBiddingForm && listBiddingForm.length > 0 ? (
                <BoxTable
                    name="Biểu mẫu"
                    titles={titles}
                    items={listBiddingForm}
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
                                    Hiện tại chưa có biểu mẫu nào. <br />
                                    Hãy thêm mới biểu mẫu đầu tiên nhé!
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
        <ModalAddBiddingForm
          onShow={showModalAdd}
          data={dataBiddingForm}
          isView={isView}
          setIsView={setIsView}
          titleType={dataBiddingForm ? "UPDATE" : "ADD"}
          onHide={(reload) => {
              if (reload) {
                  getListBiddingForm(params);
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

        <Dialog content={contentDialog} isOpen={showDialog} />      
    </div>
  );
}

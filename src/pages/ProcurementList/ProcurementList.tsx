import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import "./ProcurementList.scss";
import Icon from "components/icon";
import Loading from "components/loading";
import SearchBox from "components/searchBox/searchBox";
import TitleAction, { ITitleActions } from "components/titleAction/titleAction";
import { DataPaginationDefault, PaginationProps } from "components/pagination/pagination";
import { SystemNotification } from "components/systemNotification/systemNotification";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import { BulkActionItemModel } from "components/bulkAction/bulkAction";
import { IAction, ISaveSearch } from "model/OtherModel";
import { showToast } from "utils/common";
import { getPageOffset, trimContent } from "reborn-util";
import { getPermissions } from "utils/common";
import _ from "lodash";
import ButtonOnOff from "components/ButtonOnOff/ButtonOnOff";
import HeaderFilter from "components/HeaderFilter/HeaderFilter";
import { ContextType, UserContext } from "contexts/userContext";
import Tippy from "@tippyjs/react";
import PurchaseRequestService from "services/PurchaseRequestService";
import ModalAddProcurement from "./partials/ModalAddProcurement";
import BoxTable from "./BoxTable/BoxTable";
import ModalSelectTypeProcure from "./ModalSelectTypeProcure/ModalSelectTypeProcure";
import ModalImportProcure from "./ModalImportProcure/ModalImportProcure";
import ModalImportAttachment from "./ModalImportAttachment/ModalImportAttachment";
import ModalHandleTask from "pages/MiddleWork/partials/ListWork/partials/ModalHandleTask/ModalHandleTask";
import ModalAddProcurementNew from "./ModalAddProcurementNew/ModalAddProcurementNew";

export default function ProcurementList(props: any) {
  document.title = "Yêu cầu mua sắm/ Tờ trình chủ trương";

  const isMounted = useRef(false);
  const { dataInfoEmployee } = useContext(UserContext) as ContextType;

  const [listProcurement, setListProcurement] = useState([]);
  const [dataProcurement, setDataProcurement] = useState(null);
  const [listIdChecked, setListIdChecked] = useState<number[]>([]);
  console.log("listIdChecked", listIdChecked);

  const [showSelectType, setShowSelectType] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNoItem, setIsNoItem] = useState<boolean>(false);
  const [isPermissions, setIsPermissions] = useState<boolean>(false);
  const [permissions, setPermissions] = useState(getPermissions());
  const [onShowModalImport, setOnShowModalImport] = useState(false);
  const [showImportAttachment, setShowImportAttachment] = useState(false);
  const [onSchedule, setOnSchedule] = useState(null);
  const [workId, setWorkId] = useState(null);

  const [params, setParams] = useState({
    name: "",
    limit: 10,
    page: 1,
  });

  const [listSaveSearch] = useState<ISaveSearch[]>([
    {
      key: "all",
      name: "Yêu cầu mua sắm/ Tờ trình chủ trương",
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

  const getListProcurement = async (paramsSearch: any, disableLoading?: boolean) => {
    if (!disableLoading) {
      setIsLoading(true);
    }

    const response = await PurchaseRequestService.list(paramsSearch, abortController.signal);

    if (response.code === 0) {
      const result = response.result;
      setListProcurement(result?.items);

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
      getListProcurement(params);
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
      permissions["LIST_PURCHASE_REQUEST_ADD"] == 1 && {
        icon: <Icon name="Plus" style={{ width: 13, height: 13 }} />,
        title: "Thêm mới",
        callback: () => {
          setDataProcurement(null);
          // setShowModalAdd(true);
          setShowSelectType(true);
        },
      },
    ],
  };

  const titles = [
    "STT",
    "Mã YCMS",
    "",
    "Tên yêu cầu mua sắm",
    "Loại yêu cầu mua sắm",
    "Lĩnh vực",
    "Dự án",
    "Trạng thái",
    "Bộ phận yêu cầu",
    "Bước quy trình",
  ];

  const dataFormat = ["text-center", "text-center", "text-center", "", "", "", "", "text-center", "", ""];

  const dataMappingArray = (item: any, index: number) => [
    getPageOffset(params) + index + 1,
    item.code,
    item.hasFile === 1 ? (
      <div className="icon-attachfile">
        <Icon name="AttachFileBPM" />
      </div>
    ) : null,
    <div className="container-name">
      <div
        className="title-name"
        onClick={() => {
          setShowModalAdd(true);
          setDataProcurement(item);
          setWorkId(item.workId);
        }}
      >
        {trimContent(`${item.name}`, 33, true, true)}
      </div>

      {!item.status && listIdChecked.length === 0 ? (
        <div className="box-icon">
          {permissions["LIST_PURCHASE_REQUEST_UPDATE"] == 1 ? (
            <Tippy content="Sửa">
              <div
                className="icon-edit"
                onClick={() => {
                  setWorkId(item.workId);
                  setShowModalAdd(true);
                  setDataProcurement(item);
                }}
              >
                <Icon name="PencilSimpleLineSmall" />
              </div>
            </Tippy>
          ) : null}

          <Tippy content="Tải tài liệu">
            <div
              className="icon-upload"
              onClick={() => {
                setShowImportAttachment(true);
                setDataProcurement(item);
              }}
            >
              <Icon name="UploadExcel" />
            </div>
          </Tippy>

          {permissions["LIST_PURCHASE_REQUEST_DELETE"] == 1 ? (
            <Tippy content="Xoá">
              <div className="icon-delete" onClick={() => showDialogConfirmDelete(item)}>
                <Icon name="TrashRoxSmall" />
              </div>
            </Tippy>
          ) : null}
        </div>
      ) : null}
    </div>,
    item.pteName,
    <div style={{ width: "20rem" }}>{item.fieldName}</div>,
    <div style={{ width: "15rem" }}>{item.projectName}</div>,
    <div style={{ display: "flex", justifyContent: "center" }}>
      {item.status == 0 ? (
        <Tippy content={<span>Mới tiếp nhận</span>}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#047BC1",
              cursor: "pointer",
            }}
          >
            <Icon name="ArrowDownRight" />
          </div>
        </Tippy>
      ) : (
        <Tippy content={"Hoàn thành"}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#B7B8B9",
              cursor: "pointer",
            }}
          >
            <Icon name="Checked" style={{ width: 15, height: 15, fill: "#FFFFFF" }} />
          </div>
        </Tippy>
      )}
    </div>,
    item.departmentName,
    item.nodeName,
  ];

  const actionsTable = (item: any): IAction[] => {
    return [
      //   ...(dataInfoEmployee?.isOwner === 1 ? [
      //     {
      //       title: listIdChecked.length > 0 ? '' : "Sửa",
      //       disabled: listIdChecked.length > 0 ? true : false,
      //       icon: <Icon name="PencilSimpleLine" className={listIdChecked.length > 0 ? "icon-edit-inactive" : "icon-edit-active"}/>,
      //       callback: () => {
      //         if(listIdChecked.length === 0){
      //           setDataProcurement(item);
      //           setShowModalAdd(true);
      //         }
      //       },
      //     },
      //     {
      //       title: listIdChecked.length > 0 ? '' : "Xóa",
      //       disabled: listIdChecked.length > 0 ? true : false,
      //       icon: <Icon name="TrashRoxSmall" className={listIdChecked.length > 0 ? "icon-delete-inactive" : "icon-delete-active"} />,
      //       callback: () => {
      //         if(listIdChecked.length === 0){
      //           showDialogConfirmDelete(item);
      //         }
      //       },
      //     },
      //   ] : []),
    ].filter((action) => action);
  };

  const onDelete = async (id: number) => {
    const response = await PurchaseRequestService.delete(id);

    if (response.code === 0) {
      showToast("Xóa yêu cầu mua sắm/ tờ trình chủ trương thành công", "success");
      getListProcurement(params);
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
        PurchaseRequestService.delete(item).then((res) => resolve(res));
      });

      arrayPromise.push(promise);
    });

    Promise.all(arrayPromise).then((result) => {
      if (result.length > 0) {
        showToast("Xóa yêu cầu mua sắm/ tờ trình chủ trương thành công", "success");
        getListProcurement(params);
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
          Bạn có chắc chắn muốn xóa{" "}
          {item ? "yêu cầu mua sắm/ tờ trình chủ trương " : `${listIdChecked.length} yêu cầu mua sắm/ tờ trình chủ trương đã chọn`}
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
      title: "Xóa yêu cầu mua sắm/ tờ trình chủ trương",
      callback: () => showDialogConfirmDelete(),
    },
  ];

  return (
    <div className="page-content page-procurement-list card-box">
      <TitleAction title="Yêu cầu mua sắm/ Tờ trình chủ trương" />
      <div className="d-flex flex-column">
        <HeaderFilter
          params={params}
          setParams={setParams}
          listIdChecked={listIdChecked}
          showDialogConfirmDelete={showDialogConfirmDelete}
          titleActions={titleActions}
          titleSearch="theo tên"
          importExcel={permissions["LIST_PURCHASE_REQUEST_IMPORT"] == 1 ? true : false}
          setOnShowModalImport={() => setOnShowModalImport(true)}
        />

        {/* <div className="container-loading-import-file">
              <div className="box-loading-import">
                <span style={{fontSize: 14, fontWeight: '500'}}>Đang tải File: 50%</span>
                <div className="loading-import">
                  <div className="line-loading" style={{width: '90%'}}/>
                </div>
              </div>
            </div> */}
        {!isLoading && listProcurement && listProcurement.length > 0 ? (
          <BoxTable
            name="Yêu cầu mua sắm/ Tờ trình chủ trương"
            titles={titles}
            items={listProcurement}
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
                    Hiện tại chưa có yêu cầu mua sắm nào. <br />
                    Hãy thêm mới yêu cầu mua sắm tiên nhé!
                  </span>
                }
                type="no-item"
                titleButton="Thêm mới yêu cầu mua sắm/ tờ trình chủ trương"
                action={() => {
                  setDataProcurement(null);
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
      {/* <ModalAddProcurement
            onShow={showModalAdd}
            data={dataProcurement}
            onSchedule={onSchedule}
            workId={workId}
            onHide={(reload) => {
                if (reload) {
                  getListProcurement(params);
                }
                setShowModalAdd(false);
            }}
        /> */}

      <ModalAddProcurementNew
        onShow={showModalAdd}
        workId={workId}
        onHide={(reload) => {
          if (reload) {
            getListProcurement(params);
          }
          setShowModalAdd(false);
          setWorkId(null);
        }}
      />
      <ModalSelectTypeProcure
        onShow={showSelectType}
        data={null}
        onHide={(reload, onSchedule, workId) => {
          if (reload) {
            // getListProcurement(params);
            setShowModalAdd(true);
            setOnSchedule(onSchedule);
            setWorkId(workId);
          }
          setShowSelectType(false);
        }}
      />

      <ModalImportProcure
        onShow={onShowModalImport}
        data={null}
        onHide={(reload) => {
          if (reload) {
          }
          setOnShowModalImport(false);
        }}
      />

      <ModalImportAttachment
        onShow={showImportAttachment}
        dataProcurement={dataProcurement}
        onHide={(reload) => {
          if (reload) {
            getListProcurement(params);
          }
          setShowImportAttachment(false);
        }}
      />

      <Dialog content={contentDialog} isOpen={showDialog} />
    </div>
  );
}

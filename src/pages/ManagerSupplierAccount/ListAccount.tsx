import React, { Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import "./ListAccount.scss";
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
import ButtonOnOff from "components/ButtonOnOff/ButtonOnOff";
import HeaderFilter from "components/HeaderFilter/HeaderFilter";
import { ContextType, UserContext } from "contexts/userContext";
import ExportModal from "components/exportModal/exportModal";
import { ExportExcel } from "exports";
import ModalAddAccount from "./partials/ModalAddAccount";
import ModalAcceptAccount from "./ModalAcceptAccount/ModalAcceptAccount";
import SupplierBpmService from "services/SupplierBpmService";
import SupplierListPortal from "./SupplierListPortal/SupplierListPortal";
import SupplierAccountList from "./SupplierAccountList/SupplierAccountList";

export default function ListAccount(props: any) {
  document.title = "Tài khoản nhà thầu";

  const isMounted = useRef(false);
  const { dataInfoEmployee } = useContext(UserContext) as ContextType;

  const [listSupplier, setListSupplier] = useState([]);
  const [dataSupplier, setDataSupplier] = useState(null);
  const [listIdChecked, setListIdChecked] = useState<number[]>([]);
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNoItem, setIsNoItem] = useState<boolean>(false);
  const [isPermissions, setIsPermissions] = useState<boolean>(false);
  const[isAcceptAccount, setIsAcceptAccount] = useState(false);
  const [typeAccept, setTypeAccept] = useState(null);
  const [params, setParams] = useState<any>({
    name: "",
    limit: 10,
    page: 1,
    // businessId: 0,
    // cityId: 0,
  });

  const [listSaveSearch] = useState<ISaveSearch[]>([
    {
      key: "all",
      name: "tài khoản nhà thầu",
      is_active: true,
    },
  ]);

  const [pagination, setPagination] = useState<PaginationProps>({
    ...DataPaginationDefault,
    name: "tài khoản nhà thầu",
    isChooseSizeLimit: true,
    setPage: (page) => {
      setParams((prevParams) => ({ ...prevParams, page: page }));
    },
    chooseSizeLimit: (limit) => {
      setParams((prevParams) => ({ ...prevParams, limit: limit }));
    },
  });

  const abortController = new AbortController();

  const getListSupplier = async (paramsSearch: any, disableLoading?: boolean) => {
    if (!disableLoading) {
      setIsLoading(true);
    }

    const response = await SupplierBpmService.list(paramsSearch, abortController.signal);

    if (response.code === 0) {
      const result = response.result;
      setListSupplier(result?.items);

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

  // useEffect(() => {
  //   if (!isMounted.current) {
  //     isMounted.current = true;
  //     return;
  //   }

  //   if (isMounted.current === true) {
  //     getListSupplier(params);
  //     const paramsTemp = _.cloneDeep(params);
  //     if (paramsTemp.limit === 10) {
  //       delete paramsTemp["limit"];
  //     }
  //     Object.keys(paramsTemp).map(function (key) {
  //       paramsTemp[key] === "" ? delete paramsTemp[key] : null;
  //     });
  //   }

  //   return () => {
  //     abortController.abort();
  //   };
  // }, [params]);

  // const titleActions: ITitleActions = {
  //   actions: [
  //     ...(dataInfoEmployee?.isOwner === 1
  //       ? [
  //           {
  //             icon: <Icon name="Plus" style={{ width: 13, height: 13 }} />,
  //             title: "Thêm mới",
  //             callback: () => {
  //               setDataSupplier(null);
  //               setShowModalAdd(true);
  //               setIsView(false);
  //             },
  //           },
  //         ]
  //       : []),
  //   ],
  // };

  const titles = ["STT", "Email/Tên đăng nhập", "Tên người liên hệ", "Tên nhà thầu", ...(dataInfoEmployee?.isOwner === 1 ? ["Hoạt động"] : [])];

  const dataFormat = ["text-center", "", "", "", "text-right"];

  const dataMappingArray = (item: any, index: number, type?: string) => [
    getPageOffset(params) + index + 1,
    type == "export" ? (
      item.name
    ) : (
      <div
        className="title-name"
        onClick={() => {
          setIsView(true);
          setShowModalAdd(true);
          setDataSupplier(item);
        }}
        style={{ cursor: "pointer" }}
      >
        {item.contactEmail}
      </div>
    ),
    item.contactName,
    item.orgName,
    ...(type == "export"
      ? []
      : dataInfoEmployee?.isOwner === 1
      ? [
          <div style={{ paddingRight: 14 }}>
            <ButtonOnOff
              checked={item.active === 1 ? true : false}
              onChange={(value) => {
                if (item.active === 1) {
                  // onStatus(item.id, 0);
                  // setShowDialogConfirmDelete(item);
                  setIsAcceptAccount(true);
                  setTypeAccept('cancel')
                } else {
                  // onStatus(item.id, 1);
                  setIsAcceptAccount(true);
                  setTypeAccept('active')
                }
              }}
            />
          </div>,
        ]
      : []),
  ];

  const actionsTable = (item: any): IAction[] => {
    return [
      ...(dataInfoEmployee?.isOwner === 1
        ? [
            {
              title: listIdChecked.length > 0 ? "" : "Sửa",
              disabled: listIdChecked.length > 0 ? true : false,
              icon: <Icon name="PencilSimpleLine" className={listIdChecked.length > 0 ? "icon-edit-inactive" : "icon-edit-active"} />,
              callback: () => {
                if (listIdChecked.length === 0) {
                  setDataSupplier(item);
                  setShowModalAdd(true);
                  setIsView(false);
                }
              },
            },
            {
              title: listIdChecked.length > 0 ? "" : "Khoá",
              disabled: listIdChecked.length > 0 ? true : false,
              icon: <Icon name="LockSimple" className={listIdChecked.length > 0 ? "icon-edit-inactive" : "icon-edit-active"} />,
              callback: () => {
                setTypeAccept('change');
                setIsAcceptAccount(true);
              },
            },
            {
              title: listIdChecked.length > 0 ? "" : "Xóa",
              disabled: listIdChecked.length > 0 ? true : false,
              icon: <Icon name="TrashRox" className={listIdChecked.length > 0 ? "icon-delete-inactive" : "icon-delete-active"} />,
              callback: () => {
                if (listIdChecked.length === 0) {
                  showDialogConfirmDelete(item);
                }
              },
            },
          ]
        : []),
    ].filter((action) => action);
  };

  // const onStatus = async (id, active) => {
  //   const body = {
  //     id: id,
  //     active: active,
  //   };
  //   const response = await SupplierService.updateActive(body);

  //   if (response.code === 0) {
  //     if (active === 1) {
  //       showToast("Cập nhật hoạt động thành công", "success");
  //     } else {
  //       showToast("Cập nhật không hoạt động thành công", "success");
  //     }

  //     getListSupplier(params, true);
  //   } else {
  //     showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
  //   }
  //   // setShowDialog(false);
  //   // setContentDialog(null);
  // };

  const onDelete = async (id: number) => {
    const response = await SupplierBpmService.delete(id);

    if (response.code === 0) {
      showToast("Xóa nhà cung cấp thành công", "success");
      getListSupplier(params);
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
        SupplierBpmService.delete(item).then((res) => resolve(res));
      });

      arrayPromise.push(promise);
    });

    Promise.all(arrayPromise).then((result) => {
      if (result.length > 0) {
        showToast("Xóa tài khoản nhà cung cấp thành công", "success");
        getListSupplier(params);
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
          Bạn có chắc chắn muốn xóa {item ? "tài khoản nhà cung cấp " : `${listIdChecked.length} tài khoản nhà cung cấp đã chọn`}
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
      title: "Xóa nhà cung cấp",
      callback: () => showDialogConfirmDelete(),
    },
  ];


  const [isView, setIsView] = useState(false);
  const [headerTab, setHeaderTab] = useState(1);
  const dataHeaderTab = [
    {
      value: 1,
      label: 'Tài khoản nhà thầu',
      // icon: 'PersonalWork'
    },
    {
      value: 2,
      label: 'Thông tin đăng ký tài khoản',
      // icon: 'UserFour'
    },
  ]

  return (
    <div className="page-content page-account-list card-box">
      <TitleAction title="Quản lý tài khoản nhà thầu" />

      <div style={{display: 'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div className="header_tab">
          {dataHeaderTab.map((item, index) => (
            <div 
              key={index} 
              className={item.value === headerTab ? "item_tab_active" : "item_tab_inactive"}
              onClick={() => {
                setHeaderTab(item.value);
              }}
            >
              {/* <Icon name={item.icon/}/> */}
              <span className="label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {headerTab === 1 ? 
        <SupplierAccountList />
      : null}

      {headerTab === 2 ? 
        <SupplierListPortal />
      : null}

      {/* <div className="d-flex flex-column">
        <HeaderFilter
          params={params}
          setParams={setParams}
          listIdChecked={listIdChecked}
          showDialogConfirmDelete={showDialogConfirmDelete}
          titleActions={titleActions}
          titleSearch="theo tên"
          // exportExcel={true}
          // setOnShowModalExport={() => setShowModalExport(true)}
        />

        {!isLoading && listSupplier && listSupplier.length > 0 ? (
          <BoxTable
            name="nhà cung cấp"
            titles={titles}
            items={listSupplier}
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
                    Hiện tại chưa có tài khoản nào. <br />
                    Hãy thêm mới tài khoản đầu tiên nhé!
                  </span>
                }
                type="no-item"
                titleButton="Thêm mới nhà cung cấp"
                action={() => {
                  setDataSupplier(null);
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
      </div> */}

      <ModalAddAccount
        onShow={showModalAdd}
        data={dataSupplier}
        isView={isView}
        setIsView={setIsView}
        onHide={(reload) => {
          if (reload) {
            getListSupplier(params);
          }
          setShowModalAdd(false);
        }}
      />

      <ModalAcceptAccount
        onShow={isAcceptAccount}
        data={dataSupplier}
        typeAccept={typeAccept}
        onHide={(reload) => {
          if (reload) {
            // getListInvestor(params);
          }
          setIsAcceptAccount(false);
          setTypeAccept(null);
        }}
      />

      <Dialog content={contentDialog} isOpen={showDialog} />
    </div>
  );
}

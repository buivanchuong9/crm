import React, { Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import "./SupplierAccountList.scss";
import Icon from "components/icon";
import Loading from "components/loading";
import TitleAction, { ITitleActions } from "components/titleAction/titleAction";
import { DataPaginationDefault, PaginationProps } from "components/pagination/pagination";
import { SystemNotification } from "components/systemNotification/systemNotification";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import { BulkActionItemModel } from "components/bulkAction/bulkAction";
import { IAction, IOption, ISaveSearch } from "model/OtherModel";
import { IContractPipelineResponse } from "model/contractPipeline/ContractPipelineResponseModel";
import { getPermissions, showToast } from "utils/common";
import { getPageOffset, isDifferenceObj } from "reborn-util";
import _, { set } from "lodash";
import ButtonOnOff from "components/ButtonOnOff/ButtonOnOff";
import HeaderFilter from "components/HeaderFilter/HeaderFilter";
import { ContextType, UserContext } from "contexts/userContext";
import ModalAcceptAccount from "../ModalAcceptAccount/ModalAcceptAccount";
import ModalAddAccount from "../partials/ModalAddAccount";
import SupplierAccountService from "services/SupplierAccountService";
import BoxTableSuppilerAccount from "./BoxTableSuppilerAccount/BoxTableSuppilerAccount";

export default function SupplierAccountList(props: any) {
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
  const [permissions, setPermissions] = useState(getPermissions());
  const [params, setParams] = useState<any>({
    email: "",
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
    name: "tài khoản",
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

    const response = await SupplierAccountService.list(paramsSearch, abortController.signal);

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

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (isMounted.current === true) {
      getListSupplier(params);
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
      ...(permissions["LIST_BIDDING_ACCOUNT_ADD"] == 1
        ? [
            {
              icon: <Icon name="Plus" style={{ width: 13, height: 13 }} />,
              title: "Thêm mới",
              callback: () => {
                setDataSupplier(null);
                setShowModalAdd(true);
                setIsView(false);
              },
            },
          ]
        : []),
    ],
  };

  const titles = ["STT", "Email/Tên đăng nhập", "Tên người liên hệ", "Tên nhà thầu", ...(permissions["LIST_BIDDING_ACCOUNT_UPDATE"] == 1 ? ["Hoạt động"] : [])];

  const dataFormat = ["text-center", "", "", "", "text-right"];

  const dataMappingArray = (item: any, index: number, type?: string) => [
    getPageOffset(params) + index + 1,
    type == "export" ? (
      item.email
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
        {item.email}
      </div>
    ),
    item.name,
    item.organizationName,
    ...(type == "export"
      ? []
      : permissions["LIST_BIDDING_ACCOUNT_UPDATE"] == 1
      ? [
          <div style={{ paddingRight: 14 }}>
            <ButtonOnOff
              checked={item.active === 1 ? true : false}
              onChange={(value) => {
                setDataSupplier(item);
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
      ...(item.active === 1 ? [] : [
        permissions["LIST_BIDDING_ACCOUNT_UPDATE"] == 1 &&
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
      ]),

      ...(item.active === 1 ? [
        permissions["LIST_BIDDING_ACCOUNT_UPDATE"] == 1 &&
        {
          title: listIdChecked.length > 0 ? "" : "Đổi mật khẩu",
          disabled: listIdChecked.length > 0 ? true : false,
          icon: <Icon name="LockSimple" className={listIdChecked.length > 0 ? "icon-edit-inactive" : "icon-edit-active"} />,
          callback: () => {
            if (listIdChecked.length === 0) {
              setTypeAccept('change');
              setIsAcceptAccount(true);
              setDataSupplier(item);
            }
          },
        },  
      ] : []),
      
      ...(item.active === 1 ? [] : [
        permissions["LIST_BIDDING_ACCOUNT_DELETE"] == 1 &&
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
      ]),
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
    const response = await SupplierAccountService.delete(id);

    if (response.code === 0) {
      showToast("Xóa tài khoản thành công", "success");
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
        SupplierAccountService.delete(item).then((res) => resolve(res));
      });

      arrayPromise.push(promise);
    });

    Promise.all(arrayPromise).then((result) => {
      if (result.length > 0) {
        showToast("Xóa tài khoản thành công", "success");
        getListSupplier(params);
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
          Bạn có chắc chắn muốn xóa {item ? "tài khoản " : `${listIdChecked.length} tài khoản đã chọn`}
          {item ? <strong>{item.email}</strong> : ""}? Thao tác này không thể khôi phục.
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
      title: "Xóa tài khoản",
      callback: () => showDialogConfirmDelete(),
    },
  ];


  const [isView, setIsView] = useState(false);

  return (
    <div className="page-suppiler-account-list">
      <div className="d-flex flex-column">
        <HeaderFilter
          params={params}
          setParams={setParams}
          listIdChecked={listIdChecked}
          showDialogConfirmDelete={showDialogConfirmDelete}
          titleActions={titleActions}
          titleSearch="theo tên"
          disableDeleteAll = { permissions["LIST_BIDDING_ACCOUNT_DELETE"] == 1 ? false : true} 
        />

        {!isLoading && listSupplier && listSupplier.length > 0 ? (
          <BoxTableSuppilerAccount
            name="tài khoản"
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
                titleButton="Thêm mới tài khoản"
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
      </div>

      <ModalAddAccount
        onShow={showModalAdd}
        data={null}
        dataAccount={dataSupplier}
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
            getListSupplier(params, true);
          }
          setIsAcceptAccount(false);
          setTypeAccept(null);
        }}
      />

      <Dialog content={contentDialog} isOpen={showDialog} />
    </div>
  );
}

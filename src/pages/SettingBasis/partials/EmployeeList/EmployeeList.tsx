import React, { Fragment, useState, useEffect, useRef, useMemo, useContext, useCallback } from "react";
import _ from "lodash";
import { useSearchParams } from "react-router-dom";
import Icon from "components/icon";
import Loading from "components/loading";
import Badge from "components/badge/badge";
import SearchBox from "components/searchBox/searchBox";
import BoxTable from "components/boxTable/boxTable";
import Button from "components/button/button";
import { DataPaginationDefault, PaginationProps } from "components/pagination/pagination";
import { SystemNotification } from "components/systemNotification/systemNotification";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import { BulkActionItemModel } from "components/bulkAction/bulkAction";
import { IAction, IFilterItem, ISaveSearch } from "model/OtherModel";
import { IEmployeeListProps } from "model/employee/PropsModel";
import { IEmployeeFilterRequest } from "model/employee/EmployeeRequestModel";
import { IEmployeeResponse } from "model/employee/EmployeeResponseModel";
import { showToast, getPermissions } from "utils/common";
import { isDifferenceObj, getPageOffset } from "reborn-util";
import EmployeeService from "services/EmployeeService";
import AddEmployeeModal from "./partials/AddEmployeeModal/AddEmployeeModal";
import CreateAccountEmployee from "./partials/CreateAccountEmployee/CreateAccountEmployee";
import ViewNewPassword from "./partials/ViewNewPassword/ViewNewPassword";

import "./EmployeeList.scss";
import { ContextType, UserContext } from "contexts/userContext";
import { IOption } from "types/OtherModel";
import { ExportExcel } from "exports";
import ExportModal from "components/exportModal/exportModal";

export default function EmployeeList(props: IEmployeeListProps) {
  document.title = "Danh sách nhân viên";

  const { onBackProps } = props;

  const isMounted = useRef(false);
  const { dataBranch } = useContext(UserContext) as ContextType;

  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNoItem, setIsNoItem] = useState<boolean>(false);
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<any>(null);
  const [dataEmployee, setDataEmployee] = useState<IEmployeeResponse>(null);
  const [listEmployee, setListEmployee] = useState<IEmployeeResponse[]>([]);
  const [listIdChecked, setListIdChecked] = useState<number[]>([]);
  const [isPermissions, setIsPermissions] = useState<boolean>(false);
  const [showModalCreateAccountEmployee, setShowModalCreateAccountEmployee] = useState<boolean>(false);
  const [params, setParams] = useState<IEmployeeFilterRequest>({
    name: "",
    limit: 10,
  });
  const [permissions, setPermissions] = useState(getPermissions());
  const [showPasswordSuccess, setShowPasswordSuccess] = useState<boolean>(false);
  const checkUserRoot = localStorage.getItem("user.root");

  const [listSaveSearch] = useState<ISaveSearch[]>([
    {
      key: "all",
      name: "Danh sách nhân viên",
      is_active: true,
    },
  ]);

  // useEffect(() => {
  //   if (dataBranch) {
  //     setParams((prevParams) => ({ ...prevParams, branchId: dataBranch.value }));
  //   }
  // }, [dataBranch]);

  const [pagination, setPagination] = useState<PaginationProps>({
    ...DataPaginationDefault,
    name: "Nhân viên",
    isChooseSizeLimit: true,
    setPage: (page) => {
      setParams((prevParams) => ({ ...prevParams, page: page }));
    },
    chooseSizeLimit: (limit) => {
      setParams((prevParams) => ({ ...prevParams, limit: limit }));
    },
  });

  const customerFilterList: IFilterItem[] = useMemo(
    () => [
      // ...((checkUserRoot == "1"
      //   ? [
      //       {
      //         key: "branchId",
      //         name: "Chi nhánh",
      //         type: "select",
      //         is_featured: true,
      //         value: searchParams.get("branchId") ?? "",
      //       },
      //     ]
      //   : []) as IFilterItem[]),
      {
        key: "departmentId",
        name: "Phòng ban",
        type: "select",
        is_featured: true,
        value: searchParams.get("departmentId") ?? "",
      },
      {
        key: "status",
        name: "Trạng thái",
        type: "select",
        is_featured: true,
        list: [
          {
            value: "-1",
            label: "Tất cả",
          },
          {
            value: "1",
            label: "Đang làm việc",
          },
          {
            value: "2",
            label: "Đã nghỉ việc",
          },
        ],
        value: searchParams.get("status") ?? "",
      },
    ],
    [searchParams]
  );

  const abortController = new AbortController();

  const getListEmployee = async (paramsSearch: IEmployeeFilterRequest) => {
    setIsLoading(true);

    const response = await EmployeeService.list(paramsSearch, abortController.signal);

    if (response.code === 0) {
      const result = response.result;
      setListEmployee(result.items);

      setPagination({
        ...pagination,
        page: +result.page,
        sizeLimit: params.limit ?? DataPaginationDefault.sizeLimit,
        totalItem: +result.total,
        totalPage: Math.ceil(+result.total / +(params.limit ?? DataPaginationDefault.sizeLimit)),
      });
      if (+result.total === 0 && !params?.name && +result.page === 1) {
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
    searchParams.forEach(async (key, value) => {
      paramsTemp[value] = key;
    });
    setParams((prevParams) => ({ ...prevParams, ...paramsTemp }));
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (isMounted.current === true) {
      getListEmployee(params);

      const paramsTemp = _.cloneDeep(params);

      if (paramsTemp.limit === 10) {
        delete paramsTemp["limit"];
      }

      Object.keys(paramsTemp).map((key) => {
        paramsTemp[key] === "" ? delete paramsTemp[key] : null;
      });

      // if (isDifferenceObj(searchParams, paramsTemp)) {
      //   if (paramsTemp.page === 1) {
      //     delete paramsTemp["page"];
      //   }
      //   setSearchParams(paramsTemp as Record<string, string | string[]>);
      // }
    }
    return () => {
      abortController.abort();
    };
  }, [params]);

  const titles = ["STT", "Tên nhân viên", "Điện thoại", "Phòng ban", "Chức danh", "Chi nhánh", "QL trực tiếp", "Tình trạng nhân viên"];

  const dataFormat = ["text-center", "", "text-center", "", "", "", "", "text-center"];

  const dataSize = ["auto", "auto", "auto", 10, 10, 12, 12, "auto"];

  const dataMappingArray = (item: IEmployeeResponse, index: number, type?: string) => 
    type !== "export" 
    ? [
        getPageOffset(params) + index + 1,
        item.name,
        item.phone,
        item.departmentName,
        item.title,
        item.branchName,
        item.managerName,
        <Badge key={item.id} text={item.status === 1 ? "Đang làm việc" : "Đã nghỉ"} variant={item.status === 1 ? "success" : "error"} />,
      ] 
    : 
      [
        getPageOffset(params) + index + 1,
        item.name,
        item.phone,
        item.departmentName,
        item.title,
        item.branchName,
        item.managerName,
        item.status === 1 ? "Đang làm việc" : "Đã nghỉ"
      ];
      

  const actionsTable = (item: IEmployeeResponse): IAction[] => {
    return [
      item.status !== 2 &&
        (permissions["EMPLOYEE_ADD"] == 1 || permissions["EMPLOYEE_UPDATE"] == 1) &&
        item.userId && {
          title: "Reset mật khẩu",
          icon: <Icon name="ResetPassword" className="icon-warning" />,
          callback: () => {
            setShowPasswordSuccess(true);
            setDataEmployee(item);
          },
        },
      permissions["EMPLOYEE_ADD"] == 1 &&
        item.status !== 2 && {
          title: "Tạo tài khoản cho nhân viên",
          icon: <Icon name="UserAdd" />,
          callback: () => {
            setDataEmployee(item);
            setShowModalCreateAccountEmployee(true);
          },
        },
      permissions["EMPLOYEE_UPDATE"] == 1 && {
        title: "Sửa",
        icon: <Icon name="Pencil" />,
        callback: () => {
          setDataEmployee(item);
          setShowModalAdd(true);
        },
      },
      item.isOwner === 1
        ? null
        : permissions["EMPLOYEE_DELETE"] == 1 && {
            title: "Xóa",
            icon: <Icon name="Trash" className="icon-error" />,
            callback: () => {
              showDialogConfirmDelete(item);
            },
          },
    ].filter((action) => action);
  };

  const onDelete = async (id: number) => {
    const response = await EmployeeService.delete(id);

    if (response.code === 0) {
      showToast("Xoá nhân viên thành công", "success");
      getListEmployee(params);
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
        EmployeeService.delete(item).then((res) => resolve(res));
      });

      arrayPromise.push(promise);
    });

    Promise.all(arrayPromise).then((result) => {
      if (result.length > 0) {
        showToast("Xoá nhân viên thành công", "success");
        getListEmployee(params);
        setListIdChecked([]);
      } else {
        showToast("Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      }
      setShowDialog(false);
      setContentDialog(null);
    });
  };

  const showDialogConfirmDelete = (item?: IEmployeeResponse) => {
    const contentDialog: IContentDialog = {
      color: "error",
      className: "dialog-delete",
      isCentered: true,
      isLoading: true,
      title: <Fragment>Xóa...</Fragment>,
      message: (
        <Fragment>
          Bạn có chắc chắn muốn xóa {item ? "nhân viên " : `${listIdChecked.length} nhân viên đã chọn`}
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
    permissions["EMPLOYEE_DELETE"] == 1 && {
      title: "Xóa nhân viên",
      callback: () => showDialogConfirmDelete(),
    },
  ];

  const titleActions = [
   {
      title: "Nhập danh sách",
      icon: <Icon name="Upload" />,
      callback: () => {
        // setShowModalImport(true);
      },
    },
   {
      title: "Xuất danh sách",
      icon: <Icon name="Download" />,
      callback: () => {
        setOnShowModalExport(true);
      },
    },
  ]
  
  const formatExcel = ["center", "top", "", "", "", "", "", "", "", ""];

  //Export
  const [onShowModalExport, setOnShowModalExport] = useState<boolean>(false);

  const optionsExport: IOption[] = useMemo(
    () => [
      {
        value: "all",
        label: "Tất cả nhân viên ",
      },
      {
        value: "current_page",
        label: "Trên trang này",
        disabled: pagination.totalItem === 0,
      },
      {
        value: "current_search",
        label: `${pagination.totalItem || listEmployee.length} nhân viên phù hợp với kết quả tìm kiếm hiện tại`,
        disabled: pagination.totalItem === 0 || !isDifferenceObj(params, { keyword: "" }),
      },
    ],
    [pagination, params]
  );

  const exportCallback = useCallback(
    async (type, extension) => {
      const response = await EmployeeService.list({
        ...params,
        page: type === "current_page" ? params.page || 1 : 1,
        limit: type === "all" || type === "current_search" ? 10000 : params.limit,
      });

      if (response.code === 0) {
        const result = response.result.items;

        if (extension === "excel") {
          ExportExcel({
            fileName: "DanhSachNhanVien",
            title: "Danh sách nhân viên",
            header: titles,
            formatExcel: formatExcel,
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
    [params, listEmployee]
  );

  return (
    <div className={`page-content page-employee${isNoItem ? " bg-white" : ""}`}>
      <div className="action-navigation">
        <div>
          <div className="action-backup">
            <h1
              onClick={() => {
                onBackProps(true);
              }}
              className="title-first"
              title="Quay lại"
            >
              Cài đặt cơ sở
            </h1>
            <Icon
              name="ChevronRight"
              onClick={() => {
                onBackProps(true);
              }}
            />
            <h1 className="title-last">Danh sách nhân viên</h1>
          </div>

          <div className="actions-extra d-flex align-items-center">
            {titleActions.map((a, idx) => (
              <Button key={idx} type="button" color="link" variant="outline" onClick={() => a.callback()}>
                {a.icon}
                {a.title}
              </Button>
            ))}
          </div>
        </div>
        {permissions["EMPLOYEE_ADD"] == 1 && (
          <Button
            className="btn__add--employee"
            onClick={(e) => {
              e && e.preventDefault();
              setDataEmployee(null);
              setShowModalAdd(true);
            }}
          >
            Thêm mới
          </Button>
        )}
      </div>


      <div className="card-box d-flex flex-column">
        <SearchBox
          name="Tên nhân viên"
          params={params}
          isSaveSearch={true}
          listSaveSearch={listSaveSearch}
          isFilter={true}
          listFilterItem={customerFilterList}
          updateParams={(paramsNew) => setParams(paramsNew)}
        />
        {!isLoading && listEmployee && listEmployee.length > 0 ? (
          <BoxTable
            name="Nhân viên"
            titles={titles}
            items={listEmployee}
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
            dataSize={dataSize}
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
                    Hiện tại chưa có nhân viên nào. <br />
                    Hãy thêm mới nhân viên đầu tiên nhé!
                  </span>
                }
                type="no-item"
                titleButton="Thêm mới nhân viên"
                action={() => {
                  setDataEmployee(null);
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
      <AddEmployeeModal
        onShow={showModalAdd}
        data={dataEmployee}
        onHide={(reload) => {
          if (reload) {
            getListEmployee(params);
          }
          setShowModalAdd(false);
        }}
      />
      <ViewNewPassword onShow={showPasswordSuccess} onHide={() => setShowPasswordSuccess(false)} data={dataEmployee} password="" />
      <CreateAccountEmployee
        onShow={showModalCreateAccountEmployee}
        data={dataEmployee}
        onHide={(reload) => {
          if (reload) {
            getListEmployee(params);
          }
          setShowModalCreateAccountEmployee(false);
        }}
      />
      <ExportModal
        name="Công việc"
        onShow={onShowModalExport}
        onHide={() => setOnShowModalExport(false)}
        options={optionsExport}
        callback={(type, extension) => exportCallback(type, extension)}
      />
      <Dialog content={contentDialog} isOpen={showDialog} />
    </div>
  );
}

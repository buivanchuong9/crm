import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import _ from "lodash";
import moment from "moment";
import Tippy from "@tippyjs/react";
import { isDifferenceObj, getPageOffset } from "reborn-util";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import Icon from "components/icon";
import Button from "components/button/button";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import { DataPaginationDefault, PaginationProps } from "components/pagination/pagination";
import { BulkActionItemModel } from "components/bulkAction/bulkAction";
import { IListWorkProps } from "model/workOrder/PropsModel";
import { IAction, IFilterItem, IOption, ISaveSearch } from "model/OtherModel";
import { IWorkOrderFilterRequest } from "model/workOrder/WorkOrderRequestModel";
import { IWorkOrderResponseModel } from "model/workOrder/WorkOrderResponseModel";
import { getPermissions, showToast } from "utils/common";
import WorkOrderService from "services/WorkOrderService";
import TableWork from "pages/MiddleWork/partials/ListWork/partials/TableWork/TableWork";
// import AddWorkModal from "./partials/AddWorkModal/AddWorkModal";
import AddWorkInprogressModal from "pages/MiddleWork/partials/ListWork/partials/AddWorkInprogressModal/AddWorkInprogressModal";
import ViewWorkInprogressModal from "pages/MiddleWork/partials/ListWork/partials/ViewWorkInprogressModal/ViewWorkInprogressModal";
import "tippy.js/animations/scale.css";
import "./ListCompletedWork.scss";
import { ExportExcel } from "exports";
import ExportModal from "components/exportModal/exportModal";
import SearchBox from "components/searchBox/searchBox";
import FilterModal from "pages/MiddleWork/partials/ListWork/partials/FilterModal/FilterModal";
import EmployeeService from "services/EmployeeService";

export default function ListCompletedWork(props: IListWorkProps) {
  const isMounted = useRef(false);

  const navigation = useNavigate();
  const [permissions, setPermissions] = useState(getPermissions());

  const {
    type,
    idManagement,
    isFullPage,
    handleDetailWork,
    showProjectManagement,
    setIsDetailWork,
    setIsHandleTask,
    abortController,
    isExportWork,
    setIsFullPage,
    onHideExport,
    dataProjectReport,
    setOnShowModalExport

  } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const [isNoItem, setIsNoItem] = useState<boolean>(false);
  const [listWork, setListWork] = useState<IWorkOrderResponseModel[]>([]);
  const [listIdChecked, setListIdChecked] = useState<number[]>([]);
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // đoạn này cập nhập tiến động công việc
  const [idWork, setIdWork] = useState<number>(null);
  const [showModalWorkInprogress, setShowModalWorkInprogress] = useState<boolean>(false);

  // đoạn này hiển thị danh sách cập nhật tiến độ công việc
  const [showModalViewWorkInprogress, setShowModalViewWorkInprogress] = useState<boolean>(false);

  const [params, setParams] = useState<any>({
    name: "",
    status: 2,
    offset: null
  });

  const [paramsInit, setParamsInit] = useState<IWorkOrderFilterRequest>({
    name: "",
    status: 2,
    processId: -1,
    potId: -1
  });


  const [dataEmployee, setDataEmployee] = useState(null);

  const takeDataEmployee = async () => {
    const response = await EmployeeService.info();

    if (response.code === 0) {
      const result = response.result;
      setDataEmployee(result);
    }
  };


  useEffect(() => {
    takeDataEmployee();
    // if (idManagement) {
    //   if (type === "opportunity") {
    //     const newParams = { ...params };
    //     delete newParams["projectId"];
    //     setParams({ ...newParams, opportunityId: idManagement, workType: type });
    //   } else {
    //     const newParams = { ...params };
    //     delete newParams["opportunity"];
    //     // setParams({ ...newParams, projectId: idManagement, workType: type });
    //     setParams({ ...newParams, processId: idManagement, potId: -1 });

    //   }
    // }
  }, [idManagement, type]);

  const [listSaveSearch] = useState<ISaveSearch[]>([
    {
      key: "all",
      name: "Danh sách công việc đã hoàn thành",
      is_active: true,
    },
  ]);

  const [filterByKanban, setFilterByKanban] = useState<string>("kanbanStatus");

  const customerFilterList: IFilterItem[] = useMemo(
    () =>[
            {
                key: "departmentId",
                name: "Phòng ban",
                type: "select",
                is_featured: true,
                value: searchParams.get("departmentId") ?? "",
            },
            {
                key: "employeeId",
                name: "Nhân viên",
                type: "select",
                is_featured: true,
                value: searchParams.get("employeeId") ?? "",
            },
            // {
            //     key: "status",
            //     name: "Trạng thái công việc",
            //     type: "select",
            //     is_featured: true,
            //     list: [
            //     {
            //         value: "-1",
            //         label: "Tất cả",
            //     },
            //     {
            //         value: "0",
            //         label: "Chưa thực hiện",
            //     },
            //     {
            //         value: "1",
            //         label: "Đang thực hiện",
            //     },
            //     {
            //         value: "2",
            //         label: "Đã hoàn thành",
            //     },
            //     {
            //         value: "3",
            //         label: "Đã hủy",
            //     },
            //     ],
            //     value: searchParams.get("status") ?? "",
            // },
            {
                key: "time_buy",
                name: "Khoảng thời gian",
                type: "date-two",
                param_name: ["startDate", "endDate"],
                is_featured: true,
                value: searchParams.get("startDate") ?? "",
                value_extra: searchParams.get("endDate") ?? "",
                is_fmt_text: true,
            },
            {
                key: "type",
                name: "Kiểu công việc",
                type: "select",
                is_featured: true,
                list: [
                {
                    value: "-1",
                    label: "Tất cả",
                },
                {
                    value: "1",
                    label: "Công việc mới nhất",
                },
                {
                    value: "2",
                    label: "Công việc liên quan",
                },
                {
                    value: "3",
                    label: "Công việc ưu tiên",
                },
                {
                    value: "4",
                    label: "Công việc bị chậm",
                },
                ],
                value: searchParams.get("type") ?? "",
            },
            {
                key: "sourceType",
                name: "Nguồn công việc",
                type: "select",
                is_featured: true,
                list: [
                {
                    value: "1",
                    label: "Việc tôi giao người khác",
                },
                {
                    value: "2",
                    label: "Việc tôi nhận từ người khác giao",
                },
                {
                    value: "3",
                    label: "Việc tôi có liên quan",
                },
                ],
                value: searchParams.get("sourceType") ?? "",
            },
        ] as IFilterItem[],
    [searchParams, filterByKanban]
  );

  const [pagination, setPagination] = useState<PaginationProps>({
    ...DataPaginationDefault,
    name: "Công việc",
    isChooseSizeLimit: true,
    setPage: (page) => {
      setParams((prevParams) => ({ ...prevParams, page: page }));
    },
    chooseSizeLimit: (limit) => {
      setParams((prevParams) => ({ ...prevParams, limit: limit, page: 1 }));
    },
  });

  const abortControllerChild = new AbortController();

  const getListWork = async (paramsSearch: IWorkOrderFilterRequest, notLoad?) => {
    if(!notLoad){
      setIsLoading(true);
    }
    

    if (type === "process") {
      delete paramsSearch["opportunityId"];
    } else {
      delete paramsSearch["processId"];
    }

    // Nếu là báo cáo công việc thì lấy id của dự án từ báo cáo
    // if (dataProjectReport) {
    //   paramsSearch = { ...paramsSearch, projectId: dataProjectReport.id };
    // }

    const response = await WorkOrderService.list(paramsSearch);

    if (response.code === 0) {
      const result = response.result;

      setListWork(result.items);
      handleDetailWork(null, result.items?.length);
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
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const paramsTemp = _.cloneDeep(params);
    // searchParams.forEach(async (key, value) => {
    //   paramsTemp[value] = key;
    // });
    searchParams.forEach(async (key, value) => {
      if(value == 'filters'){
        paramsTemp[value] = {
          ...(paramsTemp['projectId'] ? {projectId: paramsTemp['projectId']} : {}),
          ...(paramsTemp['prName'] ? {projectId: paramsTemp['prName']} : {}),
        };
      } else {
        paramsTemp[value] = key;
      }
    });
    setParams((prevParams) => ({ ...prevParams, ...paramsTemp }));
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (isMounted.current === true) {
      getListWork(params);
      const paramsTemp = _.cloneDeep(params);
      if (paramsTemp.limit === 10) {
        delete paramsTemp["limit"];
      }
      Object.keys(paramsTemp).map(function (key) {
        paramsTemp[key] === "" ? delete paramsTemp[key] : null;
      });
      if (isDifferenceObj(searchParams, paramsTemp)) {
        if (paramsTemp.page === 1) {
          delete paramsTemp["page"];
        }
        if (!dataProjectReport) {
          setSearchParams(paramsTemp as Record<string, string | string[]>);
        }
      }
    }
    return () => {
      abortControllerChild.abort();
    };
  }, [params]);

  const [dataOfApproachStart, setDataOfApproachStart] = useState([]);
  const [dataOfApproachDo, setDataOfApproachDo] = useState([]);
  const [dataOfApproachFail, setDataOfApproachFail] = useState([]);
  const [dataOfApproachSuccess, setDataOfApproachSuccess] = useState([]);
  const [dataOfApproachPending, setDataOfApproachPending] = useState([]);

  const getDataOfStatus = async (idManagement, status) => {
    if (dataProjectReport) {
      return;
    }
    const param: any = {
      limit: 10,
      page: 1,
      status: status,
      // workType: type,
    };
    if (type === "process") {
      param.processId = idManagement;
    } else {
      param.opportunityId = idManagement;
    }

    const response = await WorkOrderService.list(param);

    if (response.code === 0) {
      const result = response.result;
      if (status === 0) {
        setDataOfApproachStart(result);
      } else if (status === 1) {
        setDataOfApproachDo(result);
      } else if (status === 2) {
        setDataOfApproachSuccess(result);
      } else if (status === 3) {
        setDataOfApproachFail(result);
      } else {
        setDataOfApproachPending(result);
      }
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  useEffect(() => {
    if (idManagement) {
      // Nguyên nhân gây ra thông báo lỗi: Invalid number value: null
    //   getDataOfStatus(idManagement, 0);
    //   getDataOfStatus(idManagement, 1);
    //   getDataOfStatus(idManagement, 2);
    //   getDataOfStatus(idManagement, 3);
    //   getDataOfStatus(idManagement, 4);
    }
  }, [type, idManagement]);

  //Export
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

  const titles = [
    "STT",
    "Tên công việc",
    "",
    "Dự án",
    "Thời gian", 
    "Tên gói thầu mua sắm",   
    "Người nhận việc",
    "Trạng thái",
  ];

  const dataFormat = ["text-center", "", "", "", "", "", "", "text-center"];

  const dataMappingArray = (item: any, index: number, type?: string) =>
    type !== "export"
      ? [
          getPageOffset(params) + index + 1,
          <div>
            {item.scope === 'external' ? 
              <div className="container-name">
                <span
                  key={item.id}
                  className="title-name"
                  onClick={() => {
                    setIsDetailWork(true);
                    handleDetailWork(item, listWork.length);
                    setIsShowFilter(false);
                  }}
                >
                  {item.name}
                </span>

                {(item.taskType === "my_task" || (item.status === 0 && item.managerId === dataEmployee?.id)) ? 
                  <div className="box-icon">
                    {permissions["WORK_MANAGEMENT_UPDATE"] == 1 ? 
                    <Tippy content='Sửa'>
                      <div 
                        className="icon-edit"
                        onClick={() => {
                          setShowModalAdd(true);
                          setIdWork(item.id);
                        }}
                      >
                        <Icon name="PencilSimpleLineSmall"/>
                      </div>
                    </Tippy>
                    : null}

                    {permissions["WORK_MANAGEMENT_DELETE"] == 1 ? 
                      <Tippy content='Xoá'>
                        <div 
                          className="icon-delete"
                          onClick={() => showDialogConfirmDelete(item)}
                        >
                          <Icon name="TrashRoxSmall"/>
                        </div>
                      </Tippy>
                      : null}

                  </div>
                : null}
              </div>
             :
              <div style={{width: '25rem'}}>
                <span
                  key={item.id}
                  className="name-work"
                  onClick={() => {
                    setIsDetailWork(true);
                    handleDetailWork(item, listWork.length);
                    setIsShowFilter(false);
                  }}
                >
                  {item.nodeName} {item?.iteration > 0 ? `(lần ${item?.iteration})` : '' }
                </span>
              </div>
            }
          </div>,
          <div>
            <Tippy content={`${(item.priorityLevel === 1 || item.priorityLevel === 2) ? 'Việc không ưu tiên' : item.priorityLevel === 3 ? 'Việc ưu tiên' : 'Việc gấp'}`}>
              <div 
                style={{cursor:'pointer'}}
                onClick={() => {
                  if(item.priorityLevel === 1 || item.priorityLevel === 2){
                    changePriorityLevel(item.id, 3)
                  }
                  if(item.priorityLevel === 3 ){
                    changePriorityLevel(item.id, 2)
                  }
                  setIsShowFilter(false);
                }}
              >
                <Icon 
                  name='Star' 
                  style={{
                    width: 20, 
                    height: 20, 
                    fill: (item.priorityLevel === 1 || item.priorityLevel === 2) ? 'var(--extra-color-30)' : item.priorityLevel === 3 ? '#FDE047' : '#ED1B34',
                    marginTop: -4,
                    marginRight: 5
                  }}
                />
              </div>
            </Tippy>
          </div>,
          <div style={{width: '13rem'}}>
            {item.extendedData && JSON.parse(item.extendedData) ? JSON.parse(item.extendedData).projectName : ''}
          </div>,
          <div style={{width: '18rem'}}>
            {item.startTime || item.endTime ? `${moment(item.startTime).format("DD/MM/YYYY")} - ${moment(item.endTime).format("DD/MM/YYYY")}` : ""}
          </div>,
          // <div
          //   key={item.id}
          //   className="percent__finish--work"
          //   onClick={() => {
          //     if (item.percent !== 100 && item.status !== 0 && item.status !== 2 && item.status !== 3 && item.status !== 4) {
          //       setShowModalWorkInprogress(true);
          //       setIdWork(item.id);
          //     } else if (item.status == 2 || item.status == 3 || item.status == 4) {
          //       setIdWork(item.id);
          //       setShowModalViewWorkInprogress(true);
          //     } else {
          //       showToast("Công việc đang trong trạng thái chưa được thực hiện", "warning");
          //     }
          //   }}
          // >
          //   <CircularProgressbar value={item.percent || 0} text={`${item.percent || 0}%`} className="value-percent" />
          // </div>,
          <div style={{width: '20rem'}}>
            {item.extendedData && JSON.parse(item.extendedData) ? JSON.parse(item.extendedData).prName : ''}
          </div>,
          <div>{item.employeeName}</div>,
          <div style={{display: 'flex', justifyContent:'center'}}>
            {item.status == 0 ? (
                new Date() > new Date(item?.endTime) ? 
                  <Tippy content={<span>Quá hạn {handleUnfulfilled(item.endTime)}</span>}>
                    <div style={{width: 32, height: 32, borderRadius: 100, display:'flex', alignItems:'center', justifyContent:'center', background:'#C94B1C', cursor:'pointer'}}>
                      <span style={{fontSize: 12, fontWeight: 600, color: '#FFFFFF'}}>{handleUnfulfilled(item.endTime, true)}</span>
                    </div>
                  </Tippy>
                :
                <Tippy content={<span>Chưa tiếp nhận</span>}>
                  <div style={{width: 32, height: 32, borderRadius: 100, display:'flex', alignItems:'center', justifyContent:'center', background:'#047BC1', cursor:'pointer'}}>
                    <Icon name='ArrowDownRight'/>
                  </div>
                </Tippy>
              ) 
              
              : item.status == 1 ? (
                new Date() > new Date(item?.endTime) ? 
                  <Tippy content={<span>Quá hạn {handleUnfulfilled(item.endTime)}</span>}>
                    <div style={{width: 32, height: 32, borderRadius: 100, display:'flex', alignItems:'center', justifyContent:'center', background:'#C94B1C', cursor:'pointer'}}>
                      <span style={{fontSize: 12, fontWeight: 600, color: '#FFFFFF'}}>{handleUnfulfilled(item.endTime, true)}</span>
                    </div>
                  </Tippy>
                :
                <Tippy content={<span>Mới tiếp nhận</span>}>
                  <div style={{width: 32, height: 32, borderRadius: 100, display:'flex', alignItems:'center', justifyContent:'center', background:'#047BC1', cursor:'pointer'}}>
                    <Icon name='ArrowDownRight'/>
                  </div>
                </Tippy>
              ) 
              : item.status == 2 ?
              <Tippy content={'Hoàn thành'}>
                <div style={{width: 32, height: 32, borderRadius: 100, display:'flex', alignItems:'center', justifyContent:'center', background:'#B7B8B9', cursor:'pointer'}}>
                  <Icon name='Checked' style = {{width: 15, height: 15, fill: '#FFFFFF'}}/>
                </div>
              </Tippy>
              : item.status == 3 ?
              <Tippy content={'Đã huỷ'}>
                <div style={{width: 32, height: 32, borderRadius: 100, display:'flex', alignItems:'center', justifyContent:'center', background:'#B7B8B9', cursor:'pointer'}}>
                  <Icon name='Times' style = {{width: 15, height: 15, fill: '#FFFFFF'}}/>
                </div>
              </Tippy>
              :
              <Tippy content={<span>Tạm dừng {handleUnfulfilled(item.endTime)}</span>}>
                <div style={{width: 32, height: 32, borderRadius: 100, display:'flex', alignItems:'center', justifyContent:'center', background:'#CA8A04', cursor:'pointer'}}>
                  <span style={{fontSize: 12, fontWeight: 600, color: '#FFFFFF'}}>{handleUnfulfilled(item.endTime, true)}</span>
                </div>
              </Tippy>
            }
            
          </div>,
          // item.status == 0 ? (
          //   handleUnfulfilled(item.startTime)
          // ) : item.status == 1 ? (
          //   handleProcessing(item.startTime, item.endTime)
          // ) : item.status == 2 ? (
          //   <span className="status-success">Đã hoàn thành</span>
          // ) : item.status == 3 ? (
          //   <span className="status-cancelled">Đã hủy</span>
          // ) : (
          //   <span className="status-pause">Tạm dừng</span>
          // ),
        ]
      : [
          getPageOffset(params) + index + 1,
          // item.name,
          // item.employeeName,
          // `${moment(item.startTime).format("DD/MM/YYYY")} - ${moment(item.endTime).format("DD/MM/YYYY")}`,
          // item.projectName,
          // `${item.percent || 0}%`,
          // item.status == 0
          //   ? "Chưa thực hiện"
          //   : item.status == 1
          //   ? "Đang thực hiện"
          //   : item.status == 2
          //   ? "Đã hoàn thành"
          //   : item.status == 3
          //   ? "Đã hủy"
          //   : "Tạm dừng",
        ];

  const formatExcel = ["center", "top", "top", "center", "top", "center", "center"];

  const titlesExcel = [
    // "STT",
    // "Mã gói thầu - mua sắm",
    // "Tên gói thầu - mua sắm",
    // "Tên Dự án",
    // "Lĩnh vực", 
    // "Ưu tiên",   
    // "Đơn vị yêu cầu",
    // "Tên người thực hiện",
    // "Trạng thái",
    // "Thời gian nhận",
    // "Thời hạn hoàn thành",
    // "Thời hạn hoàn thành thực tế",
    // "SLA",
    // "OLA",
    // "Số ngày thực hiện thực tế",
    // "Số ngày quá hạn",
    // "Số ngày tạm dừng",
    // "Bước quy trình"

    "STT",
    "Tên công việc",
    "Dự án",
    "Thời gian", 
    "Tên gói thầu mua sắm",   
    "Người nhận việc",
    "Trạng thái",
  ];
  const dataFormatExport = [
    "center", 
    "center", 
    "center", 
    "center", 
    "center", 
    "center", 
    "center", 
    "center", 
    "center", 
    "center", 
    "center", 
    "center", 
    "center", 
    "center", 
    "center", 
    "center", 
    "center", 
    "center", 
  ];

  const exportCallback = useCallback(
    async (type, extension) => {
      const response = await WorkOrderService.list({
        ...params,
        page: type === "current_page" ? 1 : params.page,
        limit: type === "all" || type === "current_search" ? 10000 : params.limit,
      });

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
        onHideExport();
      } else {
        showToast("Có lỗi xảy ra. Vui lòng thử lại sau!", "error");
        onHideExport();
      }
    },
    [params]
  );

  const changePriorityLevel = async ( workId, priorityLevel) => {
    const body = {
      id: workId,
      priorityLevel: priorityLevel
    }

    const response = await WorkOrderService.updateLevelStatus(body);

    if (response.code === 0) {
      reLoadListWork(true);
      showToast(`${priorityLevel === 4 ? 'Thêm' : 'Bỏ'} công việc ưu tiên thành công`, "success");
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  }

  //! đoạn này xử lý vấn đề hiển thị thông tin xem bao giờ thực hiện
  const handleUnfulfilled = (time, disableUnit?) => {
    const currentTime = new Date().getTime();
    const startTime = new Date(time).getTime();

    if (currentTime < startTime) {

    } else {
      if ((currentTime - startTime) / (24 * 60 * 60 * 1000) >= 1) {
        //thời gian hiện tại - nếu thời gian kết thúc >= 1 ngày thì trả về ngày, không thì trả về giờ
        return <span>{`${Math.round((currentTime - startTime) / (24 * 60 * 60 * 1000))} ${disableUnit ? '' : 'ngày'}`}</span>;
      } else if ((currentTime - startTime) / (60 * 60 * 1000) >= 1) {
        //thời gian hiện tại - nếu thời gian kết thúc >= 1 giờ thì trả về giờ, không thì trả về phút
        return <span>{`${Math.round((currentTime - startTime) / (60 * 60 * 1000))} ${disableUnit ? '' : 'giờ'}`}</span>;
      } else {
        return <span>{`${Math.round((currentTime - startTime) / (60 * 1000))} ${disableUnit ? '' : 'phút'}`}</span>;
      }
    }
  };

  const actionsTable = (item: IWorkOrderResponseModel): IAction[] => {
    return [
      // ...(item?.contextData ? [
      //   {
      //     title: "Xử lý nhiệm vụ",
      //     icon: <Icon name="CollectInfo" />,
      //     callback: () => {
      //       // navigation("/handle_task");
      //       handleDetailWork(item, listWork.length);
      //       setIsHandleTask(true)
      //     },
      //   },
      // ] : []),
      // {
      //   title: "Xem chi tiết",
      //   icon: <Icon name="Eye" />,
      //   callback: () => {
      //     handleDetailWork(item, listWork.length);
      //     setIsDetailWork(true);
      //   },
      // },
      // ...(item.status == 2 || item.status == 3
      //   ? []
      //   : [
      //       {
      //         title: "Sửa",
      //         icon: <Icon name="Pencil" />,
      //         callback: () => {
      //           setIdWork(item?.id);
      //           setShowModalAdd(true);
      //         },
      //       },
      //       {
      //         title: "Xóa",
      //         icon: <Icon name="Trash" className="icon-error" />,
      //         callback: () => {
      //           showDialogConfirmDelete(item);
      //         },
      //       },
      //     ]),
    ];
  };

  const onDelete = async (id: number) => {
    const response = await WorkOrderService.delete(id);

    if (response.code === 0) {
      showToast("Xóa công việc thành công", "success");
      reLoadListWork();
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setShowDialog(false);
    setContentDialog(null);
  };

  const onDeleteAllWork = () => {
    const arrPromise = [];

    listIdChecked.map((item) => {
      const promise = new Promise((resolve, reject) => {
        WorkOrderService.delete(item).then((res) => {
          resolve(res);
        });
      });

      arrPromise.push(promise);
    });

    Promise.all(arrPromise).then((result) => {
      if (result.length > 0) {
        showToast("Xóa công việc thành công", "success");
        reLoadListWork();
        setListIdChecked([]);
      } else {
        showToast("Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      }
      setShowDialog(false);
      setContentDialog(null);
    });
  };

  const showDialogConfirmDelete = (item?: IWorkOrderResponseModel) => {
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
          onDeleteAllWork();
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

  const reLoadListWork = (notLoad?) => {
    getListWork(params, notLoad);
    // getDataOfStatus(idManagement, 0);
    // getDataOfStatus(idManagement, 1);
    // getDataOfStatus(idManagement, 2);
    // getDataOfStatus(idManagement, 3);
    // getDataOfStatus(idManagement, 4);
  };
  const [headerTab, setHeaderTab] = useState(1);
  const dataHeaderTab = [
    {
      value: 1,
      label: 'Công việc của tôi',
      icon: 'PersonalWork'
    },
    {
      value: 2,
      label: 'Công việc phòng ban',
      icon: 'UserFour'
    },
  ]

  const refContainerFilter = useRef();
  const refFilter = useRef();
  const [isShowFilter, setIsShowFilter] = useState(false);

  return (
    <div className={`page-content page-completed-work-list${isNoItem ? " bg-white" : ""}`}>
      <div className="card-box d-flex flex-column">
        <div className={``}>
          <div className="action-header">
            <div className="header_tab">
              {dataHeaderTab.map((item, index) => (
                <div 
                  key={index} 
                  className={item.value === headerTab ? "item_tab_active" : "item_tab_inactive"}
                  onClick={() => {
                    setHeaderTab(item.value);
                    setIsShowFilter(false);
                  }}
                >
                  <Icon name={item.icon}/>
                  <span className="label">{item.label}</span>
                </div>
              ))}
              
            </div>
            <div className="line__height--work">
              <div className="container-button-header">
                <div 
                  className={ "style-list-button-active"}
                >
                  <Icon name="ListData"/>
                  <span className="title">Danh sách</span>
                </div>
              </div>
              <div className="container-button-right">
                <div>
                  <SearchBox
                    key={customerFilterList.length}
                    name="Tên công việc"
                    params={params}
                    isFilter={false}
                    isSaveSearch={false}
                    listSaveSearch={listSaveSearch}
                    listFilterItem={customerFilterList}
                    updateParams={(paramsNew) => setParams(paramsNew)}
                  />
                </div>
                {permissions["WORK_MANAGEMENT_EXPORT"] == 1 ? 
                  <div 
                    className="button_export"
                    onClick={() => {
                      setOnShowModalExport();
                      setIsShowFilter(false);
                    }}
                  >
                    <Icon name="ExportRox"/>
                    <span className="label">Xuất dữ liệu</span>
                  </div>
                : null}

                {(params.employeeId || params?.isPriority || params.startDate || params.endDate || params.projectId || params.biddingName || params.filters) ? 
                  <div className="button_cancel_filter">
                    <span style={{fontSize: 12, fontWeight: '400'}}>Bộ lọc</span>
                    <Tippy content='Bỏ lọc'>
                      <div 
                        style={{cursor: 'pointer', display:'flex', alignItems:'center'}}
                        onClick={() => {
                          setParams(paramsInit);
                          setIsShowFilter(false);
                        }}
                      >
                        <Icon name='TimesCircle'/>
                      </div>
                    </Tippy>
                  </div>
                  : null
                }

                <div className="container_filter" ref={refContainerFilter}>
                  <div 
                    className={(params.employeeId || params?.isPriority || params.startDate || params.endDate || params.projectId || params.biddingName || params.filters) ? "button_filter_active" : "button_filter"}
                    onClick={() => {
                      setIsShowFilter(!isShowFilter);
                    }}
                  >
                    <Icon name="Funnel"/>
                    {(params.employeeId || params?.isPriority || params.startDate || params.endDate || params.projectId || params.biddingName || params.filters) ? null :
                      <span className="label">Lọc</span>
                    }
                  </div>

                  {isShowFilter && (
                    <FilterModal
                      refContainerFilter={refContainerFilter}
                      refFilter={refFilter}
                      setIsShowFilter={setIsShowFilter}
                      paramsInit={paramsInit}
                      params={params}
                      setParams={setParams}
                    />
                  )}
                </div>
              </div>
              
            </div>
          </div>
          <TableWork
            params={params}
            setParams={setParams}
            listSaveSearch={listSaveSearch}
            customerFilterList={customerFilterList}
            titles={titles}
            listWork={listWork}
            pagination={pagination}
            dataMappingArray={dataMappingArray}
            dataFormat={dataFormat}
            listIdChecked={listIdChecked}
            setListIdChecked={setListIdChecked}
            bulkActionList={bulkActionList}
            actionsTable={actionsTable}
            isLoading={isLoading}
            isNoItem={isNoItem}
            setIdWork={setIdWork}
            setShowModalAdd={setShowModalAdd}
          />
        </div>

      </div>
      {/* <AddWorkModal
        type={type}
        onShow={showModalAdd}
        idWork={idWork}
        idManagement={idManagement}
        onHide={(reload) => {
          if (reload) {
            reLoadListWork();
          }
          setShowModalAdd(false);
        }}
      /> */}
      <ExportModal
        name="Công việc"
        onShow={isExportWork}
        onHide={() => onHideExport()}
        options={optionsExport}
        callback={(type, extension) => exportCallback(type, extension)}
      />
      <AddWorkInprogressModal
        onShow={showModalWorkInprogress}
        idWork={idWork}
        onHide={(reload) => {
          if (reload) {
            reLoadListWork();
          }
          setShowModalWorkInprogress(false);
        }}
      />
      <ViewWorkInprogressModal
        idWork={idWork}
        onShow={showModalViewWorkInprogress}
        onHide={() => {
          setShowModalViewWorkInprogress(false);
        }}
      />
      <Dialog content={contentDialog} isOpen={showDialog} />
    </div>
  );
}

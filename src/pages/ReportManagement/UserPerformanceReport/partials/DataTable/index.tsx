/* eslint-disable prefer-const */
import React, { Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import _ from "lodash";
import moment from "moment";
import Tippy from "@tippyjs/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper/modules";
import { getSearchParameters, getPageOffset } from "reborn-util";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Icon from "components/icon";
import Loading from "components/loading";
import BoxTable from "components/boxTable/boxTable";
import SearchBox from "components/searchBox/searchBox";
import { ExportExcel } from "exports";
import ExportModal from "components/exportModal/exportModal";
import { SystemNotification } from "components/systemNotification/systemNotification";
import { DataPaginationDefault, PaginationProps } from "components/pagination/pagination";
import { showToast, getPermissions } from "utils/common";
import { isDifferenceObj } from "reborn-util";
import CustomerService from "services/CustomerService";
import { IFilterItem, IOption } from "model/OtherModel";
import { UserContext, ContextType } from "contexts/userContext";
// import SupportInstructionsRecord from "../SupportInstructionsRecord";
// import ViewInteractModal from "./partials/ViewInteractModal";
import "swiper/css/grid";
import "swiper/css/navigation";
import "./index.scss";

export default function DataTable() {
  const { name, dataBranch } = useContext(UserContext) as ContextType;

  const [searchParams, setSearchParams] = useSearchParams();
  const [listCustomer, setListCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNoItem, setIsNoItem] = useState<boolean>(false);

  const isMounted = useRef(false);

  const [params, setParams] = useState<any>({
    keyword: "",
  });

  useEffect(() => {
    if (dataBranch) {
      setParams((prevParams) => ({ ...prevParams, branchId: dataBranch.value }));
    }
  }, [dataBranch]);

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

  const customerFilterList = useMemo(
    () =>
      [
        {
          key: "time_buy",
          name: "Khoảng thời gian",
          type: "date-two",
          param_name: ["startTime", "endTime"],
          is_featured: true,
          value: searchParams.get("startTime") ?? "",
          value_extra: searchParams.get("endTime") ?? "",
          is_fmt_text: true,
        },
        {
          key: "",
          name: "Kênh tương tác",
          type: "select",
          list: [
            {
              value: 1,
              label: "Call",
            },
            {
              value: 2,
              label: "SMS",
            },
            {
              value: 3,
              label: "Email",
            },
            {
              value: 4,
              label: "Phản hồi",
            },
          ],
          is_featured: true,
          value: searchParams.get("") ?? "",
        },
        {
          key: "customerId",
          name: "Khách hàng",
          type: "select",
          is_featured: true,
          value: searchParams.get("customerId") ?? "",
        },
        {
          key: "employeeId",
          name: "Nhân viên phụ trách",
          type: "select",
          is_featured: true,
          value: searchParams.get("employeeId") ?? "",
        },
      ] as IFilterItem[],
    [searchParams]
  );

  const abortController = new AbortController();
  // Mock data
  const mockData = {
    items: [
      {
        id: 1,
        name: "Quy trình 1",
        pendingTasks: 15,           // Tổng số công việc còn tồn đọng
        efficiency: "85%",          // Hiệu suất
        completedTasks: 45,         // Số lượng công việc đã xử lý
        averageProcessTime: "2.5h", // Thời gian xử lý trung bình
        delayRate: "8%",           // Tỉ lệ trễ hạn
        effectiveness: "92%"        // Hiệu quả
      },
      {
        id: 2,
        name: "Quy trình 2",
        pendingTasks: 8,
        efficiency: "92%",
        completedTasks: 67,
        averageProcessTime: "1.8h",
        delayRate: "5%",
        effectiveness: "95%"
      },
      {
        id: 3,
        name: "Quy trình 3",
        pendingTasks: 23,
        efficiency: "78%",
        completedTasks: 34,
        averageProcessTime: "3.2h",
        delayRate: "15%",
        effectiveness: "85%"
      }
    ],
    page: 1,
    total: 3
  };

  const getListCustomer = async (paramsSearch: any) => {
    setIsLoading(true);
    
    // Giả lập delay để tạo cảm giác loading
    await new Promise(resolve => setTimeout(resolve, 500));

    // Sử dụng mock data
    const result = mockData;
    setListCustomer(result.items);
    setPagination({
      ...pagination,
      page: +result.page,
      sizeLimit: params.limit ?? DataPaginationDefault.sizeLimit,
      totalItem: +result.total,
      totalPage: Math.ceil(+result.total / +(params.limit ?? DataPaginationDefault.sizeLimit)),
    });
    if (+result.total === 0) {
      setIsNoItem(true);
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
      getListCustomer(params);
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

  const titles = [
    "STT",
    "Tên quy trình",
    "Tổng số công việc còn tồn đọng",
    "Hiệu suất",
    "Số lượng công việc đã xử lý",
    "Thời gian xử lý trung bình",
    "Tỉ lệ trễ hạn",
    "Hiệu quả",
  ];

  const extractValues = (text) => {
    if (!text) return;
    // Tìm các cặp key-value trong chuỗi
    const matches = text.match(/(\w+):\t([^\n]+)/g);

    // Tạo một đối tượng từ các cặp key-value
    const valuesObj = matches.reduce((acc, match) => {
      const [key, value] = match.split(/:\t/);
      acc[key] = value;
      return acc;
    }, {});

    return Object.values(valuesObj).join(" ,");
  };

  const [showModalInteract, setShowModalInteract] = useState<boolean>(false);
  const [dataInteract, setDataInteract] = useState(null);

  const dataMappingArray = (item: any, index: number) => [
    getPageOffset(params) + index + 1,
    item.name,
    item.pendingTasks,
    item.efficiency,
    item.completedTasks,
    item.averageProcessTime,
    item.delayRate,
    item.effectiveness
  ];

  const dataFormat = ["text-center", "text-center", "text-center", "text-center", "text-center", "text-center", "text-center", "text-center"];

  const formatExcel = ["center", "top", "", "", "", "", ""];

  //Export
  const [onShowModalExport, setOnShowModalExport] = useState<boolean>(false);

  const optionsExport: IOption[] = useMemo(
    () => [
      {
        value: "all",
        label: "Tất cả khách hàng ",
      },
      {
        value: "current_page",
        label: "Trên trang này",
        disabled: pagination.totalItem === 0,
      },
      {
        value: "current_search",
        label: `${pagination.totalItem || listCustomer.length} khách hàng phù hợp với kết quả tìm kiếm hiện tại`,
        disabled: pagination.totalItem === 0 || !isDifferenceObj(params, { keyword: "" }),
      },
    ],
    [pagination, params]
  );

  const exportCallback = useCallback(
    async (type, extension) => {
      const response = await CustomerService.detailCustomerReport({
        ...params,
        page: type === "current_page" ? params.page || 1 : 1,
        limit: type === "all" || type === "current_search" ? 10000 : params.limit,
      });

      if (response.code === 0) {
        const result = response.result.items;

        if (extension === "excel") {
          ExportExcel({
            fileName: "BaoCaoTuongTacKhachHang",
            title: "Báo cáo tương tác khách hàng",
            header: titles,
            formatExcel: formatExcel,
            data: result.map((item, idx) => dataMappingArray(item, idx)),
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
    [params, listCustomer]
  );

  const [showModalSupport, setShowModalSupport] = useState<boolean>(false);

  return (
    <Fragment>
      <div className={`page-content page__customer--report${isNoItem ? " bg-white" : ""}`}>
        {/* <TitleAction title="Khách hàng" titleActions={titleActions} /> */}
        <div className="card-box d-flex flex-column">
          {/* <div style={{display:'flex', border:'1px solid'}}> */}
          <div className="title__report">
            <h2>Báo cáo quy trình</h2>

            <div className="icon__info" onClick={() => setShowModalSupport(true)}>
              <Icon name="Info" />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => setOnShowModalExport(true)}>
            <Icon name="Download" style={{ width: 17 }} />
            <span style={{ fontSize: 14, marginLeft: 5 }}>Xuất báo cáo</span>
          </div>
          {/* </div> */}
          <SearchBox
            name="Quy trình"
            placeholderSearch="Tìm kiếm "
            params={params}
            // isFilter={true}
            // listFilterItem={customerFilterList}
            updateParams={(paramsNew) => setParams(paramsNew)}
          />
          {!isLoading && listCustomer && listCustomer.length > 0 ? (
            <BoxTable
              name="Quy trình"
              titles={titles}
              items={listCustomer}
              isPagination={true}
              dataPagination={pagination}
              dataMappingArray={(item, index) => dataMappingArray(item, index)}
              dataFormat={dataFormat}
              isBulkAction={true}
              striped={true}
              actionType="inline"
            />
          ) : isLoading ? (
            <Loading />
          ) : (
            <Fragment>
              {
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
              }
            </Fragment>
          )}
        </div>

        <ExportModal
          name="Quy trình"
          onShow={onShowModalExport}
          onHide={() => setOnShowModalExport(false)}
          options={optionsExport}
          callback={(type, extension) => exportCallback(type, extension)}
        />
        {/* <ViewInteractModal
          onShow={showModalInteract}
          onHide={() => {
            setShowModalInteract(false);
            setDataInteract(null);
          }}
          data={dataInteract}
        /> */}
        {/* <SupportInstructionsRecord onShow={showModalSupport} onHide={() => setShowModalSupport(false)} /> */}
      </div>
    </Fragment>
  );
}

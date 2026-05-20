import React, { Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import _ from "lodash";
import moment from "moment";
import Tippy from "@tippyjs/react";
import { isDifferenceObj, getPageOffset } from "reborn-util";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import Icon from "components/icon";
import Button from "components/button/button";
import "tippy.js/animations/scale.css";
import "./FilterModal.scss";
import Popover from "components/popover/popover";
import SelectCustom from "components/selectCustom/selectCustom";
import ImageThirdGender from "assets/images/third-gender.png";
import { ContextType, UserContext } from "contexts/userContext";
import EmployeeService from "services/EmployeeService";
import DatePickerCustom from "components/datepickerCustom/datepickerCustom";
import Input from "components/input/input";
import WorkProjectService from "services/WorkProjectService";
import AreaService from "services/AreaService";
import BusinessCategoryService from "services/BusinessCategoryService";

export default function FilterModal(props: any) {
  const isMounted = useRef(false);

  const navigation = useNavigate();
  const { dataBranch } = useContext(UserContext) as ContextType;

  const { refContainerFilter, refFilter, setIsShowFilter, params, paramsInit, setParams, filterStatusAll } = props;

  useEffect(() => {
    if (params.isPriority) {
      setTypeWork({
        value: params.isPriority,
        label: params.isPriority === 1 ? "Công việc ưu tiên" : params.isPriority === 0 ? "Công việc không ưu tiên" : "Công việc gấp",
      });
    } else {
      setTypeWork(null);
    }

    if (params.employeeId) {
      getDetailEmployee(params.employeeId);
    } else {
      setDataEmployee(null);
    }

    if (params.projectId) {
      getDetailProject(params.projectId);
    } else {
      setDataProject(null);
    }

    if (params.startDate) {
      setStartDate(parseDateFromDDMMYYYY(params.startDate));
    } else {
      setStartDate(null);
    }

    if (params.endDate) {
      setEndDate(parseDateFromDDMMYYYY(params.endDate));
    } else {
      setEndDate(null);
    }

    if (params.biddingName) {
      setBiddingName(params.biddingName);
    } else {
      setBiddingName(null);
    }

    if (params.status) {
      setStatusWork({
        value: params.status,
        label:
          params.status === "0"
            ? "Mới tiếp nhận"
            : params.status === "1"
            ? "Quá hạn"
            : params.status === "2"
            ? "Đã hoàn thành"
            : params.status === "4"
            ? "Tạm dừng"
            : "Đã hủy",
      });
    } else {
      setStatusWork(null);
    }
    if (params.businessId) {
      getDetailBusiness(params.businessId);
    } else {
      setBussinessData(null);
    }

    if (params.cityId) {
      getDetailCity(params.cityId);
    } else {
      setCityData(null);
    }
  }, [params]);

  function parseDateFromDDMMYYYY(dateString) {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day); // Lưu ý: Tháng trong Date bắt đầu từ 0
  }

  const getDetailEmployee = async (employeeId) => {
    const response = await EmployeeService.detail(employeeId);
    if (response.code === 0) {
      const result = response.result;

      const detailData = {
        value: result.id,
        label: result.name,
        avatar: result.avatar,
      };
      setDataEmployee(detailData);
    }
  };
  const getDetailCity = async (cityId) => {
    const param: any = {
      page: 1,
      limit: 100,
      parentId: 0,
    };

    const response = await AreaService.list(param);

    if (response.code === 0) {
      const dataOption = response.result;
      dataOption.map((item) => {
        if (item.id === cityId) {
          const detailData = {
            value: item.id,
            label: item.name,
          };
          setCityData(detailData);
        }
      });
    }
  };

  const getDetailProject = async (employeeId) => {
    const response = await WorkProjectService.detail(employeeId);
    if (response.code === 0) {
      const result = response.result;

      const detailData = {
        value: result.id,
        label: result.name,
      };
      setDataProject(detailData);
    }
  };

  const getDetailBusiness = async (businessId) => {
    const response = await BusinessCategoryService.detail(businessId);
    if (response.code === 0) {
      const result = response.result;

      const detailData = {
        value: result.id,
        label: result.name,
      };
      setBussinessData(detailData);
    }
  };

  const [typeWork, setTypeWork] = useState(null);
  const [biddingName, setBiddingName] = useState(null);
  const [dataProject, setDataProject] = useState(null);
  const [dataEmployee, setDataEmployee] = useState(null);
  const [statusWork, setStatusWork] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bussinessData, setBussinessData] = useState(null);
  const [cityData, setCityData] = useState(null);

  const loadedOptionBusiness = async (search, loadedOptions, { page }) => {
    const param: any = {
      name: search,
      page: page,
      limit: 10,
    };

    const response = await BusinessCategoryService.list(param);

    if (response.code === 0) {
      const dataOption = response.result.items;

      return {
        options: [
          ...(dataOption.length > 0
            ? dataOption.map((item) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              })
            : []),
        ],
        hasMore: response.result.loadMoreAble,
        additional: {
          page: page + 1,
        },
      };
    }

    return { options: [], hasMore: false };
  };

  const loadedOptionProject = async (search, loadedOptions, { page }) => {
    const param: any = {
      name: search,
      page: page,
      limit: 10,
    };

    const response = await WorkProjectService.list(param);

    if (response.code === 0) {
      const dataOption = response.result.items;

      return {
        options: [
          ...(dataOption.length > 0
            ? dataOption.map((item) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              })
            : []),
        ],
        hasMore: response.result.loadMoreAble,
        additional: {
          page: page + 1,
        },
      };
    }

    return { options: [], hasMore: false };
  };

  const loadedOptionEmployee = async (search, loadedOptions, { page }) => {
    const param = {
      name: search,
      page: page,
      limit: 10,
      branchId: dataBranch.value,
    };

    const response = await EmployeeService.list(param);

    if (response.code === 0) {
      const dataOption = response.result.items;

      return {
        options: [
          ...(dataOption.length > 0
            ? dataOption.map((item) => {
                return {
                  value: item.id,
                  label: item.name,
                  avatar: item.avatar,
                };
              })
            : []),
        ],
        hasMore: response.result.loadMoreAble,
        additional: {
          page: page + 1,
        },
      };
    }

    return { options: [], hasMore: false };
  };

  const formatOptionLabelEmployee = ({ label, avatar }) => {
    return (
      <div className="selected--item">
        <div className="avatar">
          <img src={avatar || ImageThirdGender} alt={label} />
        </div>
        {label}
      </div>
    );
  };

  const handleChangeValueEmployee = (e) => {
    setDataEmployee(e);
  };

  const formatOptionLabelPriority = ({ label, value }) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="avatar">
          {/* <img src={avatar || ImageThirdGender} alt={label} /> */}
          <Icon
            name="Star"
            style={{
              width: 15,
              height: 15,
              fill: value === -1 ? "#ED1B34" : value === 1 ? "#FDE047" : "var(--extra-color-30)",
              marginTop: -4,
              marginRight: 3,
            }}
          />
        </div>
        <div>{label}</div>
      </div>
    );
  };

  const formatOptionLabelStatus = ({ label, value }) => {
    return (
      <div className="icon_status">
        <div className="icon">
          {/* <img src={avatar || ImageThirdGender} alt={label} /> */}
          <Icon
            name={
              value === "0"
                ? "NewWork"
                : value === "1"
                ? "ExpireWork"
                : value === "4"
                ? "PauseWork"
                : value === "2"
                ? "CompleteWork"
                : value === "3"
                ? "CancelWork"
                : ""
            }
            style={{
              // width: 15,
              // height: 15,
              // fill: value === -1 ? '#ED1B34' : value === 1 ? '#FDE047' : 'var(--extra-color-30)',
              marginTop: -4,
              marginRight: 5,
            }}
          />
        </div>
        <div>{label}</div>
      </div>
    );
  };

  const onSubmit = () => {
    const body = {
      // ...(typeWork ? { isPriority: typeWork?.value } : {}),
      // ...(dataProject ? { projectId: dataProject.value } : {}),
      // ...(dataEmployee ? { employeeId: dataEmployee?.value } : {}),
      // ...(startDate ? { startDate: moment(startDate).format("DD/MM/YYYY") } : {}),
      // ...(endDate ? { endDate: moment(endDate).format("DD/MM/YYYY") } : {}),
      // ...(statusWork ? { status: statusWork?.value } : {}),
      // ...(biddingName ? { biddingName: biddingName } : {}),
      ...(bussinessData ? { businessId: bussinessData?.value } : {}),
      ...(cityData ? { cityId: cityData?.value } : {}),
    };

    setParams({ ...params, ...body });
    setIsShowFilter(false);
  };

  const clearFilter = () => {
    setParams(paramsInit);
    // setIsShowFilter(false);
  };

  const loadedOptionCity = async (search, loadedOptions, { page }) => {
    const param: any = {
      name: search,
      page: page,
      limit: 100,
      parentId: 0,
    };

    const response = await AreaService.list(param);

    if (response.code === 0) {
      const dataOption = response.result;

      return {
        options: [
          ...(dataOption.length > 0
            ? dataOption.map((item) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              })
            : []),
        ],
        hasMore: response.result.loadMoreAble,
        additional: {
          page: page + 1,
        },
      };
    }

    return { options: [], hasMore: false };
  };

  return (
    <Popover alignment="right" isTriangle={true} className="popover-filter" refContainer={refContainerFilter} refPopover={refFilter}>
      <div className="box__add--filter">
        <div className="header_filter">
          <div className="header_left">
            <Icon name="Funnel" />
            <span className="label">Bộ lọc</span>
          </div>
          <div
            className="header_right"
            onClick={() => {
              setIsShowFilter(false);
            }}
          >
            <Icon name="Times" />
          </div>
        </div>

        <div className="body_filter">
          {/* {paramsInit?.isPriority ? null :
                    <div className="form-filter">
                        <SelectCustom
                            id="isPriority"
                            name="isPriority"
                            label={'Loại ưu tiên'}
                            special={true}
                            fill={true}
                            value={typeWork}
                            options={[
                                {
                                    value: -1,
                                    label: 'Công việc gấp'
                                },
                                {
                                    value: 1,
                                    label: 'Công việc ưu tiên'
                                },
                                {
                                    value: 0,
                                    label: 'Công việc không ưu tiên'
                                },
                            ]}
                            onChange={(e) => {
                                setTypeWork(e);
                            }}
                            isAsyncPaginate={false}
                            placeholder="Chọn loại ưu tiên"
                            formatOptionLabel={formatOptionLabelPriority}
                        />
                    </div>
                } */}

          <div className="form-filter">
            <SelectCustom
              id=""
              name=""
              label={"Ngành nghề kinh doanh chính"}
              fill={true}
              value={bussinessData}
              options={[]}
              onChange={(e) => {
                setBussinessData(e);
              }}
              isAsyncPaginate={true}
              placeholder="Chọn ngành nghề kinh doanh chính"
              additional={{
                page: 1,
              }}
              loadOptionsPaginate={loadedOptionBusiness}
            />
          </div>
          <div className="form-filter">
            <SelectCustom
              id="cityId"
              name="cityId"
              label="Tỉnh/Thành phố"
              fill={true}
              options={[]}
              value={cityData}
              onChange={(e) => {
                setCityData(e);
              }}
              isAsyncPaginate={true}
              isFormatOptionLabel={true}
              loadOptionsPaginate={loadedOptionCity}
              placeholder="Chọn tỉnh/thành phố"
              additional={{
                page: 1,
              }}
              // formatOptionLabel={formatOptionLabelParticipants}
            />
          </div>

          {/* <div className="form-filter">
                    <SelectCustom
                      id="employeeId"
                      name="employeeId"
                      label="Người nhận việc"
                      options={[]}
                      fill={true}
                      value={dataEmployee}
                      onChange={(e) => handleChangeValueEmployee(e)}
                      isAsyncPaginate={true}
                      isFormatOptionLabel={true}
                      placeholder="Chọn người nhận việc"
                      additional={{
                        page: 1,
                      }}
                      loadOptionsPaginate={loadedOptionEmployee}
                      formatOptionLabel={formatOptionLabelEmployee}
                    />
                </div> */}

          {/* <div className="filter_time">
                    <span style={{fontSize: 14, fontWeight: '600', color: '#939394'}}>Thời gian</span>
                    <div className="body_time">
                        <div style={{width: '49%'}}>
                            <DatePickerCustom
                                label="Từ ngày:"
                                name="the_day"
                                fill={true}
                                required={false}
                                isFmtText={true}
                                value={startDate ?  moment(startDate).format("DD/MM/YYYY") : ''}
                                onChange={(e) => {
                                    setStartDate(e);
                                }}
                                placeholder="DD/MM/YYYY"
                                maxDate={endDate}
                            />
                        </div>
                        <div  style={{width: '49%'}}>
                            <DatePickerCustom
                                label="Đến ngày:"
                                name="the_day"
                                fill={true}
                                required={false}
                                isFmtText={true}
                                value={endDate ?  moment(endDate).format("DD/MM/YYYY") : ''}
                                onChange={(e) => {
                                    setEndDate(e);
                                }}
                                placeholder="DD/MM/YYYY"
                                minDate={startDate}
                            />
                        </div>
                    </div>
                </div> */}

          {/* <div className="form-filter">
                    <Input
                        id="bidding_name"
                        name="name"
                        label="Tên gói thầu - Mua sắm"
                        fill={true}
                        required={false}
                        placeholder={"Nhập tên gói thầu - Mua sắm"}
                        value={biddingName}
                        onChange={(e) => {
                            const value = e.target.value;
                            setBiddingName(value)
                        }}
                    />
                </div> */}

          {/* {(paramsInit.status === 0 || paramsInit.status) ? null : 
                    <div className="form-filter">
                        <SelectCustom
                            id="status"
                            name="status"
                            label={'Trạng thái công việc'}
                            special={true}
                            fill={true}
                            value={statusWork}
                            options={[
                                {
                                    value: '0',
                                    label: 'Mới tiếp nhận'
                                },
                                {
                                    value: '1',
                                    label: 'Quá hạn'
                                },
                                {
                                    value: '2',
                                    label: 'Đã hoàn thành'
                                },
                                {
                                    value: '4',
                                    label: 'Tạm dừng'
                                },
                                {
                                    value: '3',
                                    label: 'Đã hủy'
                                },
                            ]}
                            onChange={(e) => {
                                setStatusWork(e);
                            }}
                            isAsyncPaginate={false}
                            placeholder="Chọn trạng thái công việc"
                            formatOptionLabel={formatOptionLabelStatus}
                        />
                    </div>
                } */}
        </div>

        <div className="action__confirm">
          <Button
            variant="outline"
            onClick={() => {
              clearFilter();
            }}
            className="button_cancel"
          >
            Đặt lại
          </Button>
          <Button
            // disabled={_.isEqual(dataConfirm, lstFieldActive)}
            onClick={() => {
              onSubmit();
            }}
            className="button_apply"
          >
            Áp dụng
          </Button>
        </div>
      </div>
    </Popover>
  );
}

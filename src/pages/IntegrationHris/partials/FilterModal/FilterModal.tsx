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
    if (params.employeeId) {
      // có thêm giá trị mặc định do job chạy đang để là system
      if (params.employeeId === "system") {
        setDataEmployee(defaultEmployee);
      } else {
        getDetailEmployee(params.employeeId);
      }
    } else {
      setDataEmployee(null);
    }

    if (params.fromTime) {
      setStartDate(parseDateFromDDMMYYYY(params.fromTime));
    } else {
      setStartDate(null);
    }

    if (params.toTime) {
      setEndDate(parseDateFromDDMMYYYY(params.toTime));
    } else {
      setEndDate(null);
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

  const [dataEmployee, setDataEmployee] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState(null);

  const defaultEmployee = {
    value: 'system',
    label: 'System', 
    avatar: '',
  };


  const loadedOptionEmployee = async (search, loadedOptions, { page }) => {
    const param = {
      name: search,
      page: page,
      limit: 10
    };
  
    const response = await EmployeeService.list(param);
  
    if (response.code === 0) {
      const dataOption = response.result.items;
  
      // Chèn item mặc định vào danh sách
      const updatedOptions = [
        defaultEmployee,
        ...dataOption.map((item) => ({
          value: item.id,
          label: item.name,
          avatar: item.avatar,
        })),
      ];
  
      return {
        options: updatedOptions,
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

  const onSubmit = () => {
    const body = {
      ...(dataEmployee ? { employeeId: dataEmployee?.value } : {}),
      ...(startDate ? { startDate: moment(startDate).format("DD/MM/YYYY") } : {}),
      ...(endDate ? { endDate: moment(endDate).format("DD/MM/YYYY") } : {}),
      ...(status ? { status: status?.value } : {}),
    };
    console.log("body, ", body);
    
    setParams({ ...params, ...body });
    setIsShowFilter(false);
  };

  const clearFilter = () => {
    setParams(paramsInit);
    setIsShowFilter(false);
  };

  const formatOptionLabelStatus = ({ label, value }) => {
    return (
      <div className="icon_status">
        <div>{label}</div>
      </div>
    );
  };

  useEffect(() => {
    if (params.status) {
      setStatus({
        value: params.status,
        label:
          params.status === "completed"
            ? "Hoàn thành"
            : params.status === "failed"
            ? "Thất bại"
            : params.status === "inprogress"
            ? "Đang đồng bộ"
            : "",
      });
    } else {
      setStatus(null);
    }

  }, [params]);

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
            <div className="filter_time">
                <span style={{fontSize: 14, fontWeight: '600', color: '#939394'}}>Khoảng thời gian</span>
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
            </div>

            <div className="form-filter">
                <SelectCustom
                    id="employeeId"
                    name="employeeId"
                    label="Người đồng bộ"
                    options={[]}
                    fill={true}
                    value={dataEmployee}
                    onChange={(e) => handleChangeValueEmployee(e)}
                    isAsyncPaginate={true}
                    isFormatOptionLabel={true}
                    placeholder="Chọn người đồng bộ"
                    additional={{
                        page: 1,
                    }}
                    loadOptionsPaginate={loadedOptionEmployee}
                    formatOptionLabel={formatOptionLabelEmployee}
                />
            </div>

            <div className="form-filter">
                <SelectCustom
                    id="status"
                    name="status"
                    label={'Trạng thái'}
                    special={true}
                    fill={true}
                    value={status}
                    options={[
                        {
                            value: '',
                            label: 'Tất cả'
                        },
                        {
                            value: 'completed',
                            label: 'Hoàn thành'
                        },
                        {
                            value: 'failed',
                            label: 'Thất bại'
                        },
                        {
                            value: 'inprogress',
                            label: 'Đang thực hiện'
                        }
                    ]}
                    onChange={(e) => setStatus(e)}
                    isAsyncPaginate={false}
                    placeholder="Chọn trạng thái đồng bộ"
                    additional={{
                      page: 1,
                    }}
                    formatOptionLabel={formatOptionLabelStatus}
                />
            </div>

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

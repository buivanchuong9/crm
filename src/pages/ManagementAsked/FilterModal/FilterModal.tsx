import React, { Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import _ from "lodash";
import moment from "moment";
import Tippy from "@tippyjs/react";
import { isDifferenceObj, getPageOffset } from "reborn-util";
import { useNavigate, useSearchParams } from "react-router-dom";
import Icon from "components/icon";
import Button from "components/button/button";
import "tippy.js/animations/scale.css";
import "./FilterModal.scss";
import Popover from "components/popover/popover";
import SelectCustom from "components/selectCustom/selectCustom";
import ImageThirdGender from "assets/images/third-gender.png";
import { ContextType, UserContext } from "contexts/userContext";
import DatePickerCustom from "components/datepickerCustom/datepickerCustom";
import Input from "components/input/input";
import SupplierService from "services/SupplierService";
import ProjectRealtyService from "services/ProjectRealtyService";

export default function FilterModal(props: any) {
  const isMounted = useRef(false);

  const navigation = useNavigate();
  const { dataBranch } = useContext(UserContext) as ContextType;

  const { refContainerFilter, refFilter, setIsShowFilter, params, paramsInit, setParams, filterStatusAll } = props;

  useEffect(() => {

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

    if (params.bidderId) {
      getDetailBidding(params.bidderId);
    } else {
      setBiddingData(null);
    }

    if (params.status) {
      setStatusWork({
        value: params.status,
        label:
          params.status === "0"
            ? "Chờ phản hồi"
            : params.status === "1"
            ? "Đã phân công"
            : params.status === "2"
            ? "Chờ tổng hợp"
            : params.status === "3"
            ? "Đã phản hồi"
            : "",
      });
    } else {
      setStatusWork(null);
    }

  }, [params]);

  function parseDateFromDDMMYYYY(dateString) {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day); // Lưu ý: Tháng trong Date bắt đầu từ 0
  }

  const getDetailProject = async (projectId) => {
    const response = await ProjectRealtyService.detail(projectId);
    if (response.code === 0) {
      const result = response.result;

      const detailData = {
        value: result.id,
        label: result.name,
      };
      setDataProject(detailData);
    }
  };

  const getDetailBidding = async (id) => {
    const response = await SupplierService.detail(id);
    if (response.code === 0) {
      const result = response.result;

      const detailData = {
        value: result.id,
        label: result.name,
      };
      setBiddingData(detailData);
    }
  };

  const [biddingData, setBiddingData] = useState(null);
  const [dataProject, setDataProject] = useState(null);
  const [statusWork, setStatusWork] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const loadedOptionBidding = async (search, loadedOptions, { page }) => {
    const param: any = {
      name: search,
      page: page,
      limit: 10,
    };

    const response = await SupplierService.list(param);

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

    const response = await ProjectRealtyService.list(param);

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

  const formatOptionLabelStatus = ({ label, value }) => {
    return (
      <div className="icon_status">
        {/* <div className="icon">
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
        </div> */}
        <div>{label}</div>
      </div>
    );
  };

  const onSubmit = () => {
    const body = {
      ...(dataProject ? { projectId: dataProject.value } : {}),
      ...(biddingData ? { bidderId: biddingData.value } : {}),
      ...(startDate ? { startDate: moment(startDate).format("DD/MM/YYYY") } : {}),
      ...(endDate ? { endDate: moment(endDate).format("DD/MM/YYYY") } : {}),
      ...(statusWork ? { status: statusWork?.value } : {}),
    };

    setParams({ ...params, ...body });
    setIsShowFilter(false);
  };

  const clearFilter = () => {
    setParams(paramsInit);
    setIsShowFilter(false);
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
            <div className="form-filter">
                <SelectCustom
                    id=""
                    name=""
                    label={'Nhà thầu'}
                    fill={true}
                    value={biddingData}
                    options={[]}
                    onChange={(e) => {
                        setBiddingData(e);
                    }}
                    isAsyncPaginate={true}
                    placeholder="Chọn nhà thầu"
                    additional={{
                        page: 1,
                    }}
                    loadOptionsPaginate={loadedOptionBidding}
                />
            </div>

            <div className="form-filter">
                <SelectCustom
                    id=""
                    name=""
                    label={'Dự án'}
                    fill={true}
                    value={dataProject}
                    options={[]}
                    onChange={(e) => {
                        setDataProject(e);
                    }}
                    isAsyncPaginate={true}
                    placeholder="Chọn dự án"
                    additional={{
                        page: 1,
                    }}
                    loadOptionsPaginate={loadedOptionProject}
                />
            </div>

            <div className="filter_time">
                <span style={{fontSize: 14, fontWeight: '600', color: '#939394'}}>Thời gian nhận</span>
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
                    id="status"
                    name="status"
                    label={'Trạng thái'}
                    special={true}
                    fill={true}
                    value={statusWork}
                    options={[
                        {
                            value: '0',
                            label: 'Chờ phản hồi'
                        },
                        {
                            value: '1',
                            label: 'Đã phân công'
                        },
                        {
                            value: '2',
                            label: 'Chờ tổng hợp'
                        },
                        {
                            value: '3',
                            label: 'Đã phản hồi'
                        },
                    ]}
                    onChange={(e) => {
                        setStatusWork(e);
                    }}
                    isAsyncPaginate={false}
                    placeholder="Chọn trạng thái"
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

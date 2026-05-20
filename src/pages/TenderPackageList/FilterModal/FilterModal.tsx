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
import FieldListService from "services/FieldListService";

export default function FilterModal(props: any) {
  const isMounted = useRef(false);

  const navigation = useNavigate();
  const { dataBranch } = useContext(UserContext) as ContextType;

  const { refContainerFilter, refFilter, setIsShowFilter, params, paramsInit, setParams } = props;

  useEffect(() => {

    if (params.projectId) {
      getDetailProject(params.projectId);
    } else {
      setDataProject(null);
    }

    if (params.fieldId) {
      getDetailField(params.fieldId);
    } else {
      setDataField(null);
    }

    if (params.status) {
      setStatus({
        value: params.status,
        label:
          params.status === "0"
            ? "Đã đóng"
            : params.status === "1"
            ? "Đã đóng"
            : params.status === "2"
            ? "Xin gia hạn"
            : "",
      });
    } else {
      setStatus(null);
    }

  }, [params]);


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

  const getDetailField = async (id) => {
    const response = await FieldListService.detail(id);
    if (response.code === 0) {
      const result = response.result;

      const detailData = {
        value: result.id,
        label: result.name,
      };
      setDataField(detailData);
    }
  };

  const [dataField, setDataField] = useState(null);
  const [dataProject, setDataProject] = useState(null);
  const [status, setStatus] = useState(null);

  const loadedOptionField = async (search, loadedOptions, { page }) => {
    const param: any = {
      name: search,
      page: page,
      limit: 10,
      status: 1
    };

    const response = await FieldListService.list(param);

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
      ...(dataField ? { fieldId: dataField.value } : {}),
      ...(status ? { status: status?.value } : {}),
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

            <div className="form-filter">
                <SelectCustom
                    id=""
                    name=""
                    label={'Lĩnh vực'}
                    fill={true}
                    value={dataField}
                    options={[]}
                    onChange={(e) => {
                        setDataField(e);
                    }}
                    isAsyncPaginate={true}
                    placeholder="Chọn lĩnh vực"
                    additional={{
                        page: 1,
                    }}
                    loadOptionsPaginate={loadedOptionField}
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
                            value: '0',
                            label: 'Đã đóng'
                        },
                        {
                            value: '1',
                            label: 'Chưa đóng'
                        },
                        {
                            value: '2',
                            label: 'Xin gia hạn'
                        }, 
                    ]}
                    onChange={(e) => {
                        setStatus(e);
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

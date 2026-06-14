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
import DepartmentService from "services/DepartmentService";
import ProjectRealtyService from "services/ProjectRealtyService";
import FieldListService from "services/FieldListService";

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

    if (params.departmentId) {
        getDetailDepartment(params.departmentId);
    } else {
        setDataDepartment(null);
    }

    if (params.fieldId) {
        getDetailFieldId(params.fieldId);
    } else {
        setDataField(null);
    }
  }, [params]);


  const getDetailDepartment = async (employeeId) => {
    const response = await DepartmentService.detail(employeeId);
    if (response.code === 0) {
      const result = response.result;

      const detailData = {
        value: result.id,
        label: result.name,
        avatar: result.avatar,
      };
      setDataDepartment(detailData);
    }
  };

  const getDetailFieldId = async (employeeId) => {
    const response = await FieldListService.detail(employeeId);
    if (response.code === 0) {
      const result = response.result;

      const detailData = {
        value: result.id,
        label: result.name,
      };
      setDataField(detailData);
    }
  };

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

  const [dataProject, setDataProject] = useState(null);
  const [dataField, setDataField] = useState(null);
  const [dataDepartment, setDataDepartment] = useState(null);

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

  const loadedOptionField = async (search, loadedOptions, { page }) => {
    const param: any = {
      name: search,
      page: page,
      limit: 10,
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

  const loadedOptionDepartment = async (search, loadedOptions, { page }) => {
    const param: any = {
      name: search,
      page: page,
      limit: 10,
    };

    const response = await DepartmentService.list(param);

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



  const onSubmit = () => {
    const body = {
      ...(dataProject ? { projectId: dataProject.value } : {}),
      ...(dataField ? { fieldId: dataField?.value } : {}),
      ...(dataDepartment ? { departmentId: dataDepartment?.value } : {}),
    };

    setParams({ ...params, ...body });
    setIsShowFilter(false);
  };

  const clearFilter = () => {
    setParams(paramsInit);
    // setIsShowFilter(false);
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
              label={"Dự án"}
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
              id="fieldId"
              name="fieldId"
              label="Lĩnh vực"
              fill={true}
              options={[]}
              value={dataField}
              onChange={(e) => {
                setDataField(e);
              }}
              isAsyncPaginate={true}
              isFormatOptionLabel={true}
              loadOptionsPaginate={loadedOptionField}
              placeholder="Chọn lĩnh vực"
              additional={{
                page: 1,
              }}
              // formatOptionLabel={formatOptionLabelParticipants}
            />
          </div>

          <div className="form-filter">
            <SelectCustom
              id="departmentId"
              name="departmentId"
              label="Bộ phận yêu cầu"
              fill={true}
              options={[]}
              value={dataDepartment}
              onChange={(e) => {
                setDataDepartment(e);
              }}
              isAsyncPaginate={true}
              isFormatOptionLabel={true}
              loadOptionsPaginate={loadedOptionDepartment}
              placeholder="Chọn bộ phận yêu cầu"
              additional={{
                page: 1,
              }}
              // formatOptionLabel={formatOptionLabelParticipants}
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

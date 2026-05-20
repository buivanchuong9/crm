import React, { Fragment, useState, useEffect, useCallback } from "react";
import { ReportStatusOverview } from "./partials/ReportStatusOverview";
import AdvancedDateFilter from "components/advancedDateFilter/advancedDateFilter";
import BusinessProcessService from "services/BusinessProcessService";
import DepartmentService from "services/DepartmentService";
import EmployeeService from "services/EmployeeService";
import SelectCustom from "components/selectCustom/selectCustom";
import Icon from "components/icon";
import Input from "components/input/input";
import "./ReportStatus.scss";

interface Option {
  value: string;
  label: string;
}

interface Params {
  startTime: string;
  endTime: string;
  employeeId: string;
  departmentId: string;
  processId: string;
}

export default function ReportStatus() {
  document.title = "Báo cáo hồ sơ theo trạng thái";

  // Tạo giá trị mặc định cho ngày bắt đầu (7 ngày trước) và ngày kết thúc (hôm nay)
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const [params, setParams] = useState<Params>({
    startTime: formatDate(sevenDaysAgo),
    endTime: formatDate(today),
    employeeId: "",
    departmentId: "",
    processId: "",
  });

  const [processes, setProcesses] = useState<Option[]>([{ value: "", label: "Tất cả" }]);
  const [departments, setDepartments] = useState<Option[]>([{ value: "", label: "Tất cả" }]);
  const [employees, setEmployees] = useState<Option[]>([{ value: "", label: "Tất cả" }]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadOptionProcess = useCallback(async (search: string, loadedOptions: Option[], { page }: { page: number }) => {
    try {
      const param = {
        name: search,
        page,
        limit: 10,
      };

      const response = await BusinessProcessService.list(param);

      if (response.code === 0) {
        const dataOption = response.result.items;
        const optionProcess: Option[] = dataOption.map((item: any) => ({
          value: item.id,
          label: item.name,
        }));

        return {
          options: page === 1 ? [{ value: "", label: "Tất cả" }, ...optionProcess] : optionProcess,
          hasMore: response.result.loadMoreAble,
          additional: {
            page: page + 1,
          },
        };
      }

      return { options: [], hasMore: false };
    } catch (err) {
      return { options: [], hasMore: false };
    }
  }, []);

  const loadOptionDepartment = useCallback(async (search: string, loadedOptions: Option[], { page }: { page: number }) => {
    try {
      const param = {
        name: search,
        page,
        limit: 10,
      };

      const response = await DepartmentService.list(param);

      if (response.code === 0) {
        const dataOption = response.result;
        const optionDepartment: Option[] = dataOption.map((item: any) => ({
          value: item.id,
          label: item.name,
        }));

        return {
          options: page === 1 ? [{ value: "", label: "Tất cả" }, ...optionDepartment] : optionDepartment,
          hasMore: response.result.loadMoreAble,
          additional: {
            page: page + 1,
          },
        };
      }

      return { options: [], hasMore: false };
    } catch (err) {
      return { options: [], hasMore: false };
    }
  }, []);

  const loadOptionEmployee = useCallback(async (search: string, loadedOptions: Option[], { page }: { page: number }) => {
    try {
      const param = {
        name: search,
        page,
        limit: 10,
      };

      const response = await EmployeeService.list(param);

      if (response.code === 0) {
        const dataOption = response.result.items;
        const optionEmployee: Option[] = dataOption.map((item: any) => ({
          value: item.id,
          label: item.name,
        }));

        return {
          options: page === 1 ? [{ value: "", label: "Tất cả" }, ...optionEmployee] : optionEmployee,
          hasMore: response.result.loadMoreAble,
          additional: {
            page: page + 1,
          },
        };
      }

      return { options: [], hasMore: false };
    } catch (err) {
      return { options: [], hasMore: false };
    }
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        // Fetch processes
        const processResponse = await BusinessProcessService.list({ name: "", page: 1, limit: 10 });
        if (processResponse.code === 0) {
          const processOptions = processResponse.result.items.map((item: any) => ({
            value: item.id,
            label: item.name,
          }));
          setProcesses([{ value: "", label: "Tất cả" }, ...processOptions]);
        }

        // Fetch departments
        const departmentResponse = await DepartmentService.list({ name: "", page: 1, limit: 10 });
        if (departmentResponse.code === 0) {
          const departmentOptions = departmentResponse.result.map((item: any) => ({
            value: item.id,
            label: item.name,
          }));
          setDepartments([{ value: "", label: "Tất cả" }, ...departmentOptions]);
        }

        // Fetch employees
        const employeeResponse = await EmployeeService.list({ name: "", page: 1, limit: 10 });
        if (employeeResponse.code === 0) {
          const employeeOptions = employeeResponse.result.items.map((item: any) => ({
            value: item.id,
            label: item.name,
          }));
          setEmployees([{ value: "", label: "Tất cả" }, ...employeeOptions]);
        }
      } catch (err) {
        console.error("Không thể tải danh sách dữ liệu ban đầu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleChangeProcess = (selectedOption: Option | null) => {
    setParams({ ...params, processId: selectedOption?.value || "" });
  };

  const handleChangeDepartment = (selectedOption: Option | null) => {
    setParams({ ...params, departmentId: selectedOption?.value || "" });
  };

  const handleChangeEmployee = (selectedOption: Option | null) => {
    setParams({ ...params, employeeId: selectedOption?.value || "" });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });
  };

  return (
    <div className="page-content page__report--status">
      <Fragment>
        <div className="card-box choose__time--report">
          <div className="__left">
            <h2 className="name-common">Chọn bộ lọc</h2>
          </div>
          <div className="__right">
            <div className="form-group">
              <label>Quy trình</label>
              <SelectCustom
                id="processId"
                name="processId"
                value={processes.find((p) => p.value === params.processId) || null}
                options={processes}
                onChange={handleChangeProcess}
                isAsyncPaginate
                placeholder="Chọn quy trình"
                additional={{ page: 1 }}
                loadOptionsPaginate={loadOptionProcess}
              />
            </div>
            <div className="form-group">
              <label>Phòng ban</label>
              <SelectCustom
                id="departmentId"
                name="departmentId"
                value={departments.find((d) => d.value === params.departmentId) || null}
                options={departments}
                onChange={handleChangeDepartment}
                isAsyncPaginate
                placeholder="Chọn phòng ban"
                additional={{ page: 1 }}
                loadOptionsPaginate={loadOptionDepartment}
              />
            </div>
            <div className="form-group">
              <label>Người xử lý</label>
              <SelectCustom
                id="employeeId"
                name="employeeId"
                value={employees.find((e) => e.value === params.employeeId) || null}
                options={employees}
                onChange={handleChangeEmployee}
                isAsyncPaginate
                placeholder="Chọn người xử lý"
                additional={{ page: 1 }}
                loadOptionsPaginate={loadOptionEmployee}
              />
            </div>
            <div className="form-group">
              <label>Thời gian</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ flex: 1 }}>
                  <Input
                    fill={true}
                    name="startTime"
                    type="date"
                    value={params.startTime}
                    onChange={handleFilterChange}
                    placeholder="Nhập thời gian bắt đầu"
                    icon={<Icon name="Calendar" />}
                    iconPosition="left"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <Input
                    fill={true}
                    name="endTime"
                    type="date"
                    value={params.endTime}
                    onChange={handleFilterChange}
                    placeholder="Nhập thời gian kết thúc"
                    icon={<Icon name="Calendar" />}
                    iconPosition="left"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box__merge--campaign">
          <div className="chart__smaller chart-1">
            <ReportStatusOverview params={params} />
          </div>
        </div>
      </Fragment>
    </div>
  );
}
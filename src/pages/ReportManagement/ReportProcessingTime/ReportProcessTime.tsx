import AdvancedDateFilter from "components/advancedDateFilter/advancedDateFilter";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import "./ReportProcessTime.scss";
import { ProcessTimeOverView } from "./partials/ProcessTimeOverView";
import { ProcessTimeCompare } from "./partials/ProcessTimeCompare";
import { ProcessTimeGantt } from "./partials/ProcessTimeGantt";
import BusinessProcessService from "services/BusinessProcessService";
import DepartmentService from "services/DepartmentService";
import ReportManagementService from "services/ReportManagementService";
import SelectCustom from "components/selectCustom/selectCustom";
import Icon from "components/icon";
import Input from "components/input/input";

interface Option {
  value: string;
  label: string;
}

interface Params {
  startTime: string;
  endTime: string;
  processId: string;
  potId: string[];
}

export const ReportProcessingTime = () => {
  document.title = "Báo cáo thời gian xử lý từng bước trong quy trình";

  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const formatDateTime = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:00`;
  };

  const [params, setParams] = useState<Params>({
    startTime: formatDateTime(sevenDaysAgo),
    endTime: formatDateTime(today),
    processId: "",
    potId: [],
  });

  const [processes, setProcesses] = useState<Option[]>([{ value: "", label: "Tất cả" }]);
  const [pots, setPots] = useState<Option[]>([{ value: "", label: "Tất cả" }]);
  const [loading, setLoading] = useState<boolean>(true);
  const [validateFieldProcess, setValidateFieldProcess] = useState<boolean>(false);
  const [validateFieldPot, setValidateFieldPot] = useState<boolean>(false);
  const [valueProcess, setValueProcess] = useState<Option | null>(null);
  const [valuePot, setValuePot] = useState<Option | null>(null);

  const loadOptionProcess = useCallback(async (search: string, loadedOptions: Option[], { page }: { page: number }) => {
    try {
      const param = {
        name: search,
        page,
        status: 1,
        limit: 10,
      };

      const response = await BusinessProcessService.list(param);

      if (response.code === 0 && response.result && response.result.items) {
        const dataOption = response.result.items;
        const optionProcess: Option[] = dataOption.map((item: any) => ({
          value: item.id,
          label: item.name,
        }));

        return {
          options: page === 1 ? [{ value: "", label: "Tất cả" }, ...optionProcess] : optionProcess,
          hasMore: response.result.loadMoreAble,
          additional: { page: page + 1 },
        };
      }

      return { options: [], hasMore: false };
    } catch (err) {
      console.error("Không thể tải danh sách processes:", err);
      return { options: [], hasMore: false };
    }
  }, [params.potId]);

  const loadOptionPot = useCallback(async (search: string, loadedOptions: Option[], { page }: { page: number }) => {
    try {
      setLoading(true);
      const param = {
        name: search, 
        page,
        limit: 10,
        processId: Number(params.processId),
      };

      const response = await ReportManagementService.listProcessingTimePot(param);
      if (response.code === 0 && response.result) {
        const dataOption = response.result || [];
        const optionPots: Option[] = dataOption.map((item: any) => ({
          value: item.potId || item.id,
          label: item.potName || item.name,
        }));

        return {
          options: page === 1 ? [{ value: "", label: "Tất cả" }, ...optionPots] : optionPots,
          hasMore: response.result.loadMoreAble,
          additional: { page: page + 1 },
        };
      }

      return { options: [], hasMore: false };
    } catch (err) {
      console.error("Không thể tải danh sách pots:", err);
      return { options: [], hasMore: false };
    } finally {
      setLoading(false);
    }
  }, [params.processId]);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const processResponse = await BusinessProcessService.list({ name: "", page: 1, limit: 10, status: 1, opType: 'EX' });
        if (processResponse.code === 0 && processResponse.result && processResponse.result.items) {
          const processOptions = processResponse.result.items.map((item: any) => ({
            value: item.id,
            label: item.name,
          }));
          setProcesses([{ value: "", label: "Tất cả" }, ...processOptions]);
        }

        if (params.processId) {
          const potsResponse = await ReportManagementService.listProcessingTimePot({
            name: "",
            page: 1,
            limit: 10,
            processId: Number(params.processId),
          });
          if (potsResponse.code === 0 && potsResponse.result) {
            const potsOptions = potsResponse.result.map((item: any) => ({
              value: item.potId || item.id,
              label: item.potName || item.name,
            }));
            setPots([{ value: "", label: "Tất cả" }, ...potsOptions]);
          }
        }
      } catch (err) {
        console.error("Không thể tải danh sách dữ liệu ban đầu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [params.processId]);

  const handleChangeValueProcess = (selectedOption: Option | null) => {
    setValueProcess(selectedOption);
    setParams({ ...params, processId: selectedOption?.value || "", potId: [] });
    setValidateFieldProcess(false);
    setValidateFieldPot(false);
    setValuePot(null);

    if (selectedOption?.value) {
      const fetchPots = async () => {
        try {
          setLoading(true);
          const response = await ReportManagementService.listProcessingTimePot({
            name: "",
            page: 1,
            limit: 10,
            processId: Number(selectedOption.value),
          });
          if (response.code === 0 && response.result) {
            const potsOptions = response.result.map((item: any) => ({
              value: item.potId || item.id,
              label: item.potName || item.name,
            }));
            setPots([{ value: "", label: "Tất cả" }, ...potsOptions]);
          } else {
            setPots([{ value: "", label: "Tất cả" }]);
          }
        } catch (err) {
          console.error("Không thể tải danh sách pots:", err);
          setPots([{ value: "", label: "Tất cả" }]);
        } finally {
          setLoading(false);
        }
      };
      fetchPots();
    } else {
      setPots([{ value: "", label: "Tất cả" }]);
    }
  };

  const handleChangePot = (selectedOption: Option | null) => {
    setValuePot(selectedOption);
    setParams({ ...params, potId: selectedOption?.value ? [selectedOption.value] : [] });
    setValidateFieldPot(false);
  };

  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement> | { processId?: string }) => {    
    if ('target' in e) {
      const { name, value } = e.target;
      const formattedValue = value ? `${value.replace('T', ' ').slice(0, 16)}:00` : "";
      setParams({ ...params, [name]: formattedValue });
    } else if ('processId' in e) {
      setParams({ ...params, processId: e.processId || "" });
    }
  }, [params]);

  return (
    <div className="page-content page__report--process">
      <Fragment>
        <div className="card-box choose__time--report">
          <div className="__left">
            <h2 className="name-common">Chọn bộ lọc</h2>
          </div>
          <div className="__right">
            <div className="form-group">
              <label>Chọn quy trình xử lý</label>
              <SelectCustom
                name="processId"
                value={valueProcess}
                fill={true}
                options={[]}
                isAsyncPaginate={true}
                additional={{
                  page: 1,
                }}
                loadOptionsPaginate={loadOptionProcess}
                placeholder="Chọn quy trình xử lý"
                onChange={(e) => handleChangeValueProcess(e)}
                error={validateFieldProcess}
                message="Quy trình xử lý không được bỏ trống"
              />
            </div>
            <div className="form-group">
              <label>Hồ sơ</label>
              <SelectCustom
                id="potId"
                name="potId"
                value={valuePot}
                fill={true}
                options={[]}
                isAsyncPaginate={true}
                additional={{ page: 1 }}
                loadOptionsPaginate={loadOptionPot}
                placeholder="Chọn hồ sơ"
                onChange={(e) => handleChangePot(e)}
                disabled={!params.processId}
                error={validateFieldPot}
                message="Hồ sơ không được bỏ trống"
              />
            </div>
            <div className="form-group">
              <label>Thời gian</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ flex: 1 }}>
                  <Input
                    fill={true}
                    name="startTime"
                    type="datetime-local"
                    value={params.startTime.replace(' ', 'T').slice(0, 16)}
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
                    type="datetime-local"
                    value={params.endTime.replace(' ', 'T').slice(0, 16)}
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
        <div className="chart-layout_wrapper">
          <div className="chart-1">
            <ProcessTimeOverView params={params || { startTime: "", endTime: "", processId: "", potId: [] }} onParamChange={handleFilterChange} />
          </div>
          <div className="chart-2">
            <ProcessTimeGantt params={params || { startTime: "", endTime: "", processId: "", potId: [] }} onParamChange={handleFilterChange} />
          </div>
          <div className="chart-3">
            <ProcessTimeCompare params={params|| { startTime: "", endTime: "", processId: "", potId: [] }} onParamChange={handleFilterChange} />
          </div>
        </div>
      </Fragment>
    </div>
  );
};

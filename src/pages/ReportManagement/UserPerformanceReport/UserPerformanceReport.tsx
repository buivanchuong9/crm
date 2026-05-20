import React, { Fragment, useState } from "react";
import RecordsProcessedComparison from "./partials/RecordsProcessedComparison";
import DepartmentWorkRatio from "./partials/DepartmentWorkRatio";
import AdvancedDateFilter from "components/advancedDateFilter/advancedDateFilter";
import {ProcessingTrend} from "./partials/ProcessingTrend";
import "./UserPerformanceReport.scss";
import DataTable from "./partials/DataTable";
import Icon from "components/icon";
import Input from "components/input/input";
import { PerformanceHeatmap } from "./partials/PerformanceHeatMap";

export default function UserPerformanceReport() {
  document.title = "Báo cáo hiệu suất người dùng/ phòng ban";

  // Tạo giá trị mặc định cho ngày bắt đầu (7 ngày trước) và ngày kết thúc (hôm nay)
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  // Format dates to YYYY-MM-DD for input type="date"
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Khởi tạo state với các bộ lọc
  const [params, setParams] = useState({
    startTime: formatDate(sevenDaysAgo),
    endTime: formatDate(today),
    handler: "",
    department: "",
    process: "",
  });

  // Xử lý bộ lọc ngày tháng
  const takeFromTimeAndToTime = (fromTime, toTime) => {
    if (fromTime && toTime) {
      setParams({ ...params, startTime: fromTime, endTime: toTime });
    }
  };

  // Xử lý thay đổi giá trị các bộ lọc
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });
  };



  return (
    <div className="page-content page__report--status">
      <div>
        <Fragment>
          <div className="card-box choose__time--report">
            <div className="__left">
              <h2 className="name-common">Chọn bộ lọc</h2>
            </div>
            
            <div className="__right">
            
              <div className="form-group">
                <label>Quy trình</label>
                <select
                  name="process"
                  value={params.process}
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">Tất cả</option>
                  <option value="process1">Quy trình 1</option>
                  <option value="process2">Quy trình 2</option>
                  {/* Thêm các option khác từ dữ liệu thực tế */}
                </select>
              </div>

              <div className="form-group">
                <label>Nhân viên</label>
                <select
                  name="handler"
                  value={params.handler}
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">Tất cả</option>
                  <option value="handler1">Nhân viên 1</option>
                  <option value="handler2">Nhân viên 2</option>
                  {/* Thêm các option khác từ dữ liệu thực tế, ví dụ từ API */}
                </select>
              </div>

              <div className="form-group">
                <label>Phòng ban</label>
                <select
                  name="department"
                  value={params.department}
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">Tất cả</option>
                  <option value="dept1">Phòng ban 1</option>
                  <option value="dept2">Phòng ban 2</option>
                  {/* Thêm các option khác từ dữ liệu thực tế */}
                </select>
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
            <div className="chart__pie">
              <DepartmentWorkRatio paramsProps={params} />
            </div>
            <div className="chart__top">
              <RecordsProcessedComparison paramsProps={params} />
            </div>
          </div>
          <div>
              <ProcessingTrend params={params} />
          </div>
          <div>
            <PerformanceHeatmap params={params} />
          </div>
          <div>
            <DataTable />
          </div>
        </Fragment>
      </div>
    </div>
  );
}
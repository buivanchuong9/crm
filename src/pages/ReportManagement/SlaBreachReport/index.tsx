import AdvancedDateFilter from "components/advancedDateFilter/advancedDateFilter";
import React, { Fragment, useState } from "react";
import "./styles.scss";
import { SlaBreachOverview } from "./partials/SlaBreachOverview";
import { SlaBreachCompare } from "./partials/SlaBreachCompare";
import { SlaStatusByDepartment } from "./partials/SlaStatusByDepartment";
import { SlaTimeTracker } from "./partials/SlaTimeTracker";
import { SlaBreachHeatmap } from "./partials/SlaBreachHeatMap";

export const SlaBreachReport = () => {
  document.title = "Báo cáo tỉ lệ trễ hạn";

  // Khởi tạo state với các bộ lọc
  const [params, setParams] = useState({
    startTime: "",
    endTime: "",
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
                <label>Thời gian</label>
                <AdvancedDateFilter updateParams={takeFromTimeAndToTime} />
              </div>
              <div className="form-group">
                <label>Người xử lý</label>
                <select name="handler" value={params.handler} onChange={handleFilterChange} className="filter-select">
                  <option value="">Tất cả</option>
                  <option value="handler1">Người xử lý 1</option>
                  <option value="handler2">Người xử lý 2</option>
                  {/* Thêm các option khác từ dữ liệu thực tế, ví dụ từ API */}
                </select>
              </div>
              <div className="form-group">
                <label>Phòng ban</label>
                <select name="department" value={params.department} onChange={handleFilterChange} className="filter-select">
                  <option value="">Tất cả</option>
                  <option value="dept1">Phòng ban 1</option>
                  <option value="dept2">Phòng ban 2</option>
                  {/* Thêm các option khác từ dữ liệu thực tế */}
                </select>
              </div>
              <div className="form-group">
                <label>Quy trình</label>
                <select name="process" value={params.process} onChange={handleFilterChange} className="filter-select">
                  <option value="">Tất cả</option>
                  <option value="process1">Quy trình 1</option>
                  <option value="process2">Quy trình 2</option>
                  {/* Thêm các option khác từ dữ liệu thực tế */}
                </select>
              </div>
            </div>
          </div>
          <div className="chart-layout_wrapper">
            <div className="chart__smaller">
              <SlaBreachOverview params={params} />
            </div>
            <div className="chart__bigger chart-2">
              <SlaBreachCompare params={params} />
            </div>
            <div className="chart__bigger chart-3">
              <SlaStatusByDepartment params={params} />
            </div>
            <div className="chart__smaller chart-4">
              <SlaTimeTracker params={params} />
            </div>
            <div className="chart__bigger chart-5">
              <SlaBreachHeatmap params={params} />
            </div>
          </div>
        </Fragment>
      </div>
    </div>
  );
};

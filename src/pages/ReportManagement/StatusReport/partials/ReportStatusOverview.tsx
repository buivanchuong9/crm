import { HighChart } from "components/charts/HighChart";
import React, { Fragment, useState, useEffect, useRef } from "react";
import ReportManagementService from "services/ReportManagementService";
import { useOnClickOutside } from "utils/hookCustom";
import { StepsTable } from "./partials/StepsTable";

export const ReportStatusOverview = ({ params }) => {
  const [chartData, setChartData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const [deptData, setDeptData] = useState<any[]>([]);

  const popupRef = useRef(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useOnClickOutside(popupRef, () => {
    setShowPopup(false);
    setSelectedPoint(null);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paramSearch = {
          endTime: params?.endTime || "",
          startTime: params?.startTime || "",
          departmentId: params?.departmentId || -1,
          processId: params?.processId || -1,
          employeeId: params?.employeeId || -1,
          page: 1,
          limit: 100,
        };
        const response = await ReportManagementService.listReportStatus(paramSearch);
        const deptDataResult = response.result || [];
        const uniqueCategories = [...new Set(deptDataResult.map((item) => item.generalState))];
        const deptTotals = deptDataResult.map((item) => item.total || 0);
        setCategories(uniqueCategories);
        setChartData(deptTotals);
        setDeptData(deptDataResult);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, [params]);

  const chartOptions = {
    xAxis: {
      categories: categories,
    },
    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: "Số lượng công việc",
      },
    },
    tooltip: {
      format: "<b>{x}</b><br/>{series.name}: {y}<br/>" + "Tổng: {point.stackTotal}",
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
        },
        point: {
          events: {
            click: function () {
              setSelectedPoint(this);
              setShowPopup(true);
            },
          },
        },
      },
    },
    series: [
      {
        name: "Tổng",
        data: categories.map((category, index) => ({
          name: category,
          y: chartData[index] || 0,
        })),
      },
    ],
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedPoint(null);
  };

  // Find the corresponding steps data for the selected generalState
  const selectedSteps = selectedPoint
    ? deptData.find((item) => item.generalState === selectedPoint.name)?.steps || null
    : null;

  return (
    <Fragment>
      <HighChart
        title="Biểu đồ báo cáo hồ sơ theo trạng thái"
        defaultType="pie"
        allowTypeChange
        chartOptions={chartOptions}
      />
      {showPopup && selectedPoint && (
        <div className="popup__container" ref={popupRef}>
          <div className="popup__content">
            <div className="popup__header">
              <h3>Chi tiết: {selectedPoint.name}</h3>
              <button className="popup__close" onClick={handleClosePopup}>
                X
              </button>
            </div>
            <div className="popup__body">
              <p>Tổng số lượng: {selectedPoint.y}</p>
              <h4>Danh sách steps:</h4>
              <StepsTable steps={selectedSteps} />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
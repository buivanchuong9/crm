import { HighChart } from "components/charts/HighChart";
import React, { Fragment, useEffect, useState } from "react";

export const ProcessVariableOverview = ({ params }) => {
  const [chartOptions, setChartOptions] = useState({
    series: [],
    tooltip: {},
    plotOptions: {},
  });

  useEffect(() => {
    // Giả lập fetch data dựa trên params (thay bằng API thực tế nếu có)
    // Ví dụ: Lấy phân bố giá trị biến "status" từ các process instance
    const mockData = [
      { name: "Completed", y: 60 }, // 60% completed
      { name: "Pending", y: 30 },   // 30% pending
      { name: "Failed", y: 10 },    // 10% failed
    ];

    // Cập nhật chartOptions dựa trên params
    setChartOptions({
      tooltip: {
        pointFormat: "<b>{point.y:.1f}%</b>",
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.y:.1f}%",
          },
          showInLegend: true,
        },
      },
      series: [
        {
          name: "Phân bố biến Status",
          data: mockData,
        },
      ],
    });
  }, [params]); // Re-run khi params thay đổi (e.g., startTime, department)

  return (
    <Fragment>
      <HighChart
        title="Tổng Quan Biến Quy Trình"
        defaultType="pie"
        allowTypeChange
        chartOptions={chartOptions}
      />
    </Fragment>
  );
};
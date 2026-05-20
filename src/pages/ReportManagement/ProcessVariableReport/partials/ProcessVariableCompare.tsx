import { HighChart } from "components/charts/HighChart";
import React, { Fragment, useEffect, useState } from "react";

export const ProcessVariableCompare = ({ params }) => {
  const [chartOptions, setChartOptions] = useState({
    xAxis: {},
    yAxis: {},
    tooltip: {},
    legend: {},
    series: [],
  });

  useEffect(() => {
    // Giả lập fetch data dựa trên params (thay bằng API thực tế nếu có)
    // Ví dụ: So sánh số lượng instance theo trạng thái "completed" giữa các quy trình
    const mockData = {
      categories: ["Process A", "Process B", "Process C", "Process D"],
      series: [
        {
          name: "Phòng ban IT",
          data: [50, 30, 20, 40], // Số instance completed
        },
        {
          name: "Phòng ban HR",
          data: [20, 40, 30, 10],
        },
        {
          name: "Phòng ban Finance",
          data: [30, 20, 50, 25],
        },
      ],
    };

    // Cập nhật chartOptions dựa trên params
    setChartOptions({
      xAxis: {
        categories: mockData.categories,
        title: {
          text: null,
        },
        gridLineWidth: 1,
        lineWidth: 0,
      },
      yAxis: {
        min: 0,
        title: {
          text: "Số lượng instance",
          align: "high",
        },
        labels: {
          overflow: "justify",
        },
        gridLineWidth: 0,
      },
      tooltip: {
        pointFormat: "<b>{point.y} instances</b>",
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "top",
        x: -40,
        y: 40,
        floating: true,
        borderWidth: 1,
        backgroundColor: "var(--highcharts-background-color, #ffffff)",
        shadow: true,
      },
      series: mockData.series,
    });
  }, [params]); // Re-run khi params thay đổi (e.g., startTime, department)

  return (
    <Fragment>
      <HighChart
        title="So Sánh Biến Quy Trình Theo Quy Trình"
        defaultType="bar"
        allowTypeChange
        chartOptions={chartOptions}
      />
    </Fragment>
  );
};
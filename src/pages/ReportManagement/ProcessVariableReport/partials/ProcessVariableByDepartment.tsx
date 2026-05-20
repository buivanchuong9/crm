import { HighChart } from "components/charts/HighChart";
import React, { Fragment, useEffect, useState } from "react";

export const ProcessVariableByDepartment = ({ params }) => {
  const [chartOptions, setChartOptions] = useState({
    xAxis: {},
    yAxis: {},
    tooltip: {},
    legend: {},
    series: [],
  });

  useEffect(() => {
    let isMounted = true; // Theo dõi trạng thái mount để tránh memory leak

    // Giả lập fetch data dựa trên params (thay bằng API thực tế nếu có)
    // Ví dụ: Số lượng instance theo trạng thái "completed" và "pending" cho từng phòng ban
    const fetchData = async () => {
      const mockData = {
        categories: ["IT", "HR", "Finance", "Sales"],
        series: [
          {
            name: "Completed",
            data: [100, 80, 60, 50], // Số instance completed theo phòng ban
          },
          {
            name: "Pending",
            data: [20, 30, 40, 25], // Số instance pending theo phòng ban
          },
        ],
      };

      if (isMounted) {
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
            pointFormat: "<b>{point.y} instances ({series.name})</b>",
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
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup khi component unmount
    };
  }, [params]); // Re-run khi params thay đổi (e.g., startTime, department)

  return (
    <Fragment>
      <HighChart
        title="Biến Quy Trình Theo Phòng Ban"
        defaultType="bar"
        allowTypeChange
        chartOptions={chartOptions}
      />
    </Fragment>
  );
};
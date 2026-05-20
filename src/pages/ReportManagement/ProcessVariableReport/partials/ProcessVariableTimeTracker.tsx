import { HighChart } from "components/charts/HighChart";
import React, { Fragment, useEffect, useState } from "react";

export const ProcessVariableTimeTracker = ({ params }) => {
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
    // Ví dụ: Số lượng instance theo trạng thái "completed" và "pending" qua các ngày
    const fetchData = async () => {
      const mockData = {
        categories: ["2025-09-01", "2025-09-02", "2025-09-03", "2025-09-04", "2025-09-05"],
        series: [
          {
            name: "Completed",
            data: [50, 60, 55, 70, 65], // Số instance completed mỗi ngày
          },
          {
            name: "Pending",
            data: [20, 25, 30, 28, 22], // Số instance pending mỗi ngày
          },
        ],
      };

      if (isMounted) {
        setChartOptions({
          xAxis: {
            categories: mockData.categories,
            title: {
              text: "Ngày",
            },
            type: "datetime", // Có thể dùng category hoặc datetime tùy API
            labels: {
              format: "{value:%Y-%m-%d}",
            },
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
            gridLineWidth: 1,
          },
          tooltip: {
            pointFormat: "<b>{point.y} instances ({series.name})</b><br>Ngày: {point.x:%Y-%m-%d}",
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
  }, [params]); // Re-run khi params thay đổi (e.g., startTime, endTime)

  return (
    <Fragment>
      <HighChart
        title="Theo Dõi Biến Quy Trình Theo Thời Gian"
        defaultType="line"
        allowTypeChange
        chartOptions={chartOptions}
      />
    </Fragment>
  );
};
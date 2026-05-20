import { HighChart } from "components/charts/HighChart";
import React, { Fragment, useEffect, useState } from "react";

export const ProcessVariableHeatmap = ({ params }) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {},
    xAxis: {},
    yAxis: {},
    colorAxis: {},
    tooltip: {},
    legend: {},
    series: [],
  });

  useEffect(() => {
    let isMounted = true; // Theo dõi trạng thái mount để tránh memory leak

    // Giả lập fetch data dựa trên params (thay bằng API thực tế nếu có)
    // Ví dụ: Số lượng instance trạng thái "completed" theo phòng ban và ngày
    const fetchData = async () => {
      const mockData = {
        xCategories: ["2025-09-01", "2025-09-02", "2025-09-03", "2025-09-04"],
        yCategories: ["IT", "HR", "Finance"],
        data: [
          [0, 0, 50], // [ngày 0, IT, 50 instances]
          [0, 1, 30], // [ngày 0, HR, 30 instances]
          [0, 2, 20], // [ngày 0, Finance, 20 instances]
          [1, 0, 60], // [ngày 1, IT, 60 instances]
          [1, 1, 40], // [ngày 1, HR, 40 instances]
          [1, 2, 25], // [ngày 1, Finance, 25 instances]
          [2, 0, 55], // [ngày 2, IT, 55 instances]
          [2, 1, 35], // [ngày 2, HR, 35 instances]
          [2, 2, 30], // [ngày 2, Finance, 30 instances]
          [3, 0, 70], // [ngày 3, IT, 70 instances]
          [3, 1, 45], // [ngày 3, HR, 45 instances]
          [3, 2, 40], // [ngày 3, Finance, 40 instances]
        ],
      };

      if (isMounted) {
        setChartOptions({
          chart: {
            type: "heatmap",
          },
          xAxis: {
            categories: mockData.xCategories,
            title: {
              text: "Ngày",
            },
            labels: {
              format: "{value:%Y-%m-%d}",
            },
          },
          yAxis: {
            categories: mockData.yCategories,
            title: {
              text: "Phòng ban",
            },
            reversed: true, // Đảo ngược Y-axis để phòng ban hiển thị từ trên xuống
          },
          colorAxis: {
            min: 0,
            minColor: "#FFFFFF",
            maxColor: "#FF0000", // Màu đỏ đậm cho giá trị cao
          },
          tooltip: {
            pointFormat: "<b>{point.value} instances</b><br>Ngày: {point.x:%Y-%m-%d}<br>Phòng ban: {point.yCategory}",
          },
          legend: {
            align: "right",
            layout: "vertical",
            margin: 0,
            verticalAlign: "top",
            y: 25,
            symbolHeight: 280,
          },
          series: [
            {
              name: "Số lượng instance",
              type: "heatmap",
              data: mockData.data,
              dataLabels: {
                enabled: true,
                color: "#000000",
                format: "{point.value}",
              },
            },
          ],
        });
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup khi component unmount
    };
  }, [params]); // Re-run khi params thay đổi (e.g., startTime, endTime, department)

  return (
    <Fragment>
      <HighChart
        title="Heatmap Biến Quy Trình Theo Phòng Ban và Thời Gian"
        defaultType="heatmap"
        allowTypeChange
        chartOptions={chartOptions}
      />
    </Fragment>
  );
};
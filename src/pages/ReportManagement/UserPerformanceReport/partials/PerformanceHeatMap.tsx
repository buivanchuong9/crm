import React, { Fragment } from "react";
import { HighChart } from "components/charts/HighChart";

export const PerformanceHeatmap = ({ params }) => {
  const chartOptions = {
    xAxis: {
      categories: [
        "Ngày",
        "Tuần",
        "Tháng"
      ],
    },
    yAxis: {
      categories: ["User", "Phòng ban"],
      title: undefined,
      reversed: true,
    },
    colorAxis: {
      min: 0,
      max: 100,
      stops: [
        [0, "#00FF00"],   // xanh lá (tốt)
        [0.5, "#FFFF00"], // vàng (cảnh báo)
        [1, "#FF0000"],   // đỏ (nguy hiểm)
      ],
    },
    legend: {
      align: "right",
      layout: "vertical",
      margin: 0,
      verticalAlign: "top",
      y: 25,
      symbolHeight: 280,
    },
    tooltip: {
      format:
        "<b>{series.xAxis.categories.(point.x)}</b><br>" +
        "Quy trình: <b>{series.yAxis.categories.(point.y)}</b><br>" +
        "Tỉ lệ vi phạm SLA: <b>{point.value}%</b>",
    },
    series: [
      {
        name: "Tỉ lệ SLA breach (%)",
        type: "heatmap",
        borderWidth: 1,
        data: [
          // 3 thành phần trong 1 mảng dưới có dạng [x, y, value]
          // x → chỉ số/cột (theo xAxis.categories nếu có, hoặc số index).
          // y → chỉ số/hàng (theo yAxis.categories nếu có, hoặc số index).
          // value → số liệu cần hiển thị (được ánh xạ sang màu dựa trên colorAxis).
          [0, 0, 20], [0, 1, 35], 
          [1, 0, 15], [1, 1, 25], 
          [2, 0, 10], [2, 1, 30], 
          
        ],
        dataLabels: {
          enabled: true,
          color: "#000000",
          format: "{point.value}%",
        },
      },
    ],
  };

  return (
    <Fragment>
      <HighChart
        title="Mức độ trễ hạn trung bình hoặc tỉ lệ vi phạm theo phòng ban vs quy trình."
        defaultType="heatmap"
        allowTypeChange={false}
        chartOptions={chartOptions}
      />
    </Fragment>
  );
};

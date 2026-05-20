import React, { Fragment } from "react";
import { HighChart } from "components/charts/HighChart";

export const SlaBreachHeatmap = ({ params }) => {
  const chartOptions = {
    xAxis: {
      categories: [
        "Phòng Kinh doanh",
        "Phòng Kế toán",
        "Phòng IT",
        "Phòng Nhân sự",
        "Phòng Vận hành",
      ],
    },
    yAxis: {
      categories: ["Quy trình A", "Quy trình B", "Quy trình C", "Quy trình D"],
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
          [0, 0, 20], [0, 1, 35], [0, 2, 50], [0, 3, 70],
          [1, 0, 15], [1, 1, 25], [1, 2, 40], [1, 3, 80],
          [2, 0, 10], [2, 1, 30], [2, 2, 55], [2, 3, 90],
          [3, 0, 5],  [3, 1, 15], [3, 2, 45], [3, 3, 65],
          [4, 0, 25], [4, 1, 50], [4, 2, 75], [4, 3, 95],
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

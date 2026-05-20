import { HighChart } from "components/charts/HighChart";
import React, { Fragment } from "react";

export const SlaBreachOverview = ({ params }) => {
  const chartParams = params;
  console.log("CHART PARAMS =>", chartParams);

  const data = [
    { name: "Trễ hạn", value: 20.0 },
    { name: "Đúng hạn", value: 80.0 },
  ];

  const chartOptions = {
    xAxis: { type: "category" },
    yAxis: [{ title: { text: "" } }],
    legend: { enabled: false },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b>',
    },
    // data được xử lý phía trong này =>
    series: [
      {
        name: "",
        type: "pie",
        data: data.map((point: any) => ({
          name: point.name,
          y: point.value,
          color: point.color,
        })),
      },
    ],
  };

  return (
    <Fragment>
      <HighChart title="Biểu đồ tổng quan tỷ lệ trễ hạn" defaultType="pie" allowTypeChange={false} chartOptions={chartOptions} />
    </Fragment>
  );
};

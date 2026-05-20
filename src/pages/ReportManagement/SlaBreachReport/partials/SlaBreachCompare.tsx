import { HighChart } from "components/charts/HighChart";
import React, { Fragment } from "react";

export const SlaBreachCompare = ({ params }) => {
  const chartOptions = {
    xAxis: {
      categories: ["Quy trình A", "Quy trình B", "Quy trình C", "Quy trình D"],
      title: {
        text: null,
      },
      gridLineWidth: 1,
      lineWidth: 0,
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: "Tỷ lệ trễ hạn (%)",
        align: "high",
      },
      labels: {
        format: "{value}%",
        overflow: "justify",
      },
      gridLineWidth: 0,
    },
    tooltip: {
      pointFormat: "<b>{point.y:.1f}% SLA breach</b>",
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
    series: [
      {
        name: "Phòng ban A",
        data: [15, 5, 8, 12], // % SLA breach cho từng quy trình
      },
      {
        name: "Phòng ban B",
        data: [10, 7, 12, 6],
      },
      {
        name: "Phòng ban C",
        data: [20, 3, 10, 15],
      },
    ],
  };

  return (
    <Fragment>
      <HighChart title="So sánh tỷ lệ SLA Breach theo Quy trình" defaultType="bar" allowTypeChange chartOptions={chartOptions} />
    </Fragment>
  );
};

import { HighChart } from "components/charts/HighChart";
import React, { Fragment } from "react";

export const ProcessUsageTrend = ({ params }) => {
  const chartOptions = {
    yAxis: {
      title: {
        text: "Số lượng hồ sơ",
      },
    },
    xAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      accessibility: {
        rangeDescription: "Range: January to December",
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },
    series: [
      {
        name: "Mở tài khoản",
        data: [120, 135, 150, 160, 170, 165, 180, 190, 200, 210, 195, 205],
      },
      {
        name: "Phê duyệt tín dụng",
        data: [15, 18, 20, 25, 22, 30, 28, 26, 35, 32, 40, 38],
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };
  return (
    <Fragment>
      <HighChart title="Xu hướng sử dụng quy trình theo tháng" defaultType="line" allowTypeChange chartOptions={chartOptions} />
    </Fragment>
  );
};

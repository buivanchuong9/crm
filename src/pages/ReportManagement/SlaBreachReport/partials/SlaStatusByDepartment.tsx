import { HighChart } from "components/charts/HighChart";
import React, { Fragment } from "react";

export const SlaStatusByDepartment = ({ params }) => {
  const chartOptions = {
    xAxis: {
      categories: ["Phòng Kinh doanh", "Phòng Kế toán", "Phòng Nhân sự", "Phòng IT"],
    },
    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: "Số lượng công việc",
      },
    },
    tooltip: {
      format: "<b>{x}</b><br/>{series.name}: {y}<br/>" + "Tổng: {point.stackTotal}",
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        name: "Đúng hạn",
        data: [40, 32, 28, 35],
        stack: "SLA",
      },
      {
        name: "Trễ hạn",
        data: [10, 8, 12, 5],
        stack: "SLA",
      },
    ],
  };

  return (
    <Fragment>
      <HighChart
        title="Biểu đồ phân bổ trạng thái đúng hạn/trễ hạn theo nhóm"
        defaultType="column"
        allowTypeChange
        chartOptions={chartOptions}
      />
    </Fragment>
  );
};

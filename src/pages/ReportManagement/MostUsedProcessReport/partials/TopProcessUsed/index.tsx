import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Icon from "components/icon";
import AdvancedDateFilter from "components/advancedDateFilter/advancedDateFilter";

export default function TopProcessUsed(props) {
  const { paramsProps } = props;

  const chartRef = useRef(null);
  const refOption = useRef();
  const refOptionContainer = useRef();

  const [dataOverview, setDataOverview] = useState([]);

  const [chartData, setChartData] = useState({
    chart: {
      type: "column",
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        colorByPoint: true,
      },
      series: {
        borderWidth: 0.3,
        dataLabels: {
          enabled: true,
          format: "{point.y:.0f}",
          style: {
            fontWeight: "bold",
          },
        },
      },
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b>',
    },

    series: [
      {
        name: "",
        colorByPoint: true,
        data: [
          {
            name: "Mở tài khoản",
            y: 1200,
            color: "#3498db",
          },
          {
            name: "Phê duyệt tín dụng",
            y: 950,
            color: "#2ecc71",
          },
          {
            name: "Xử lý khiếu nại",
            y: 600,
            color: "#e74c3c",
          },
          {
            name: "Thanh toán hóa đơn",
            y: 450,
            color: "#f39c12",
          },
          {
            name: "Tuyển dụng nhân sự",
            y: 300,
            color: "#9b59b6",
          },          
        ],
      },
    ],
  });

  const [params, setParams] = useState({
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    if (paramsProps) {
      setParams((prevParams) => ({ ...prevParams, startTime: paramsProps.startTime, endTime: paramsProps.endTime }));
    }
  }, [paramsProps]);

  const takeFromTimeAndToTime = (fromTime, toTime) => {
    if (fromTime && toTime) {
      setParams({ ...params, startTime: fromTime, endTime: toTime });
    }
  };

  const [showOption, setShowOption] = useState<boolean>(false);

  const lstOption = [
    {
      value: "image/png",
      label: "Tải về ảnh PNG",
    },
    {
      value: "image/jpeg",
      label: "Tải về ảnh JPEG",
    },
    {
      value: "application/pdf",
      label: "Tải tài liệu PDF",
    },
    {
      value: "excel",
      label: "Tải tài liệu excel",
    },
  ];

  const handleDownload = (valueOption) => {
    const chart = chartRef.current.chart;

    if (chart && valueOption !== "excel") {
      chart.update({
        exporting: {
          chartOptions: {
            chart: {
              backgroundColor: "white",
            },
          },
          scale: 3,
          filename: `${valueOption.startsWith("image") ? "Ảnh" : "Báo_cáo"}_số_lượng_hồ_sơ_theo_trạng_thái`,
          type: valueOption.split("/")[1],
        },
      });

      chart.exportChart();
    } else {
      console.log("chạy vào file xuất định dạng excel !");
    }
  };

  return (
    <div className="card-box page__status--profile">
      <div className="title__common d-flex align-items-start">
        <h2 className="name-common">Top quy trình được sử dụng nhiều nhất</h2>
        <div
          ref={refOptionContainer}
          className={`icon__option--download ${showOption ? "active__option" : ""}`}
          onClick={() => setShowOption(!showOption)}
        >
          <Icon name="Bars" />

          {showOption && (
            <div className="lst__option" ref={refOption}>
              {lstOption.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="item__option"
                    onClick={(e) => {
                      e && e.preventDefault();
                      handleDownload(item.value);
                      setShowOption(false);
                    }}
                  >
                    {item.label}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="chart__common">
        <HighchartsReact ref={chartRef} highcharts={Highcharts} allowChartUpdate={true} options={chartData} />
      </div>
    </div>
  );
}
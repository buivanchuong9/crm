import { HighChart } from "components/charts/HighChart";
import React, { Fragment, useState, useEffect } from "react";
import ReportManagementService from "services/ReportManagementService";
import { showToast } from "utils/common";

export const ProcessTimeOverView = ({ params, onParamChange }) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "bar", // Biểu đồ thanh ngang
      backgroundColor: "#ffffff",
    },
    title: {
      text: "Biểu đồ thời gian xử lý từng bước",  
      align: "center",
    },
    xAxis: {
      categories: [],
      title: null,
      gridLineWidth: 0,
      lineWidth: 0,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Tổng thời gian xử lý (phút)",
        align: "high",
      },
      labels: {
        overflow: "justify",
        enabled: false
      },
      gridLineWidth: 0,
    },
    legend: {
      reversed: false,
      align: "center",
      verticalAlign: "bottom",
    },
    tooltip: {
      shared: true,
      pointFormat: "<b>{series.name}</b>: {point.y} phút<br/>",
    },
    plotOptions: {
      series: {
        stacking: "normal", // ✅ Chồng các cột lên nhau
        dataLabels: {
          enabled: false,
          color: "#000",
          style: {
            textOutline: "none",
            fontWeight: "bold",
          },
        },
        point: {
          events: {
            click: function (event: any) {
              const processRef = event.point.processRef;
              const nodeName = event.point.nodeName;
              if (processRef && onParamChange) {
                onParamChange({
                  processId: processRef.toString(),
                  nodeName,
                });
              }
            },
          },
        },
      },
    },
    colors: ["#66BB6A", "#3F51B5", "#29B6F6"], // Xanh lá, xanh tím, xanh dương nhạt
    series: [
      { name: "Thời gian tối thiểu", data: [] },
      { name: "Thời gian trung bình", data: [] },
      { name: "Thời gian tối đa", data: [] },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Chỉ gọi API khi có processId được chọn
    if (params?.processId && params.processId !== "") {
      const fetchData = async () => {
        try {
          setLoading(true);
          setError(null);

          const paramSearch = {
            from: params?.startTime || "",
            to: params?.endTime || "",
            processId: parseInt(params.processId),
          };
          const response = await ReportManagementService.listProcessingTime(paramSearch);

          if (response?.code === 0 && response?.result?.listStep?.length > 0) {
            const categories = response.result.listStep.map((i) => i.nodeName);
            const minData = response.result.listStep.map((i) => ({
              y: i.minProcessingMinutes || 0,
              processRef: i.processRef,
              nodeName: i.nodeName,
            }));
            const avgData = response.result.listStep.map((i) => ({
              y: i.avgProcessingMinutes || 0,
              processRef: i.processRef,
              nodeName: i.nodeName,
            }));
            const maxData = response.result.listStep.map((i) => ({
              y: i.maxProcessingMinutes || 0,
              processRef: i.processRef,
              nodeName: i.nodeName,
            }));

            setChartOptions((prev) => ({
              ...prev,
              xAxis: { ...prev.xAxis, categories },
              series: [
                { ...prev.series[0], data: minData },
                { ...prev.series[1], data: avgData },
                { ...prev.series[2], data: maxData },
              ],
            }));
          } else {
            setError("Không có dữ liệu thời gian xử lý cho quy trình này");
          }
        } catch (e) {
          setError("Có lỗi xảy ra khi tải dữ liệu");
          showToast("Có lỗi xảy ra khi tải dữ liệu biểu đồ", "error");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      // Khi chưa chọn quy trình
      setLoading(false);
      setError(null);
    }
  }, [params]);

  return (
    <Fragment>
      {loading ? (
        <div style={{ 
          textAlign: "center", 
          padding: "60px 20px", 
          color: "#666",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⏳</div>
          <div style={{ fontSize: "1.6rem", fontWeight: "600" }}>
            Đang tải dữ liệu biểu đồ...
          </div>
        </div>
      ) : !params?.processId || params.processId === "" ? (
        <div style={{ 
          textAlign: "center", 
          padding: "60px 20px", 
          color: "#666",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📊</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "1rem", color: "#333", textTransform: "uppercase" }}>
            Biểu đồ thời gian xử lý từng bước
          </div>
          <div style={{ fontSize: "1.4rem", color: "#666" }}>
            Vui lòng chọn <strong>quy trình xử lý</strong> từ dropdown phía trên<br/>
            để xem dữ liệu chi tiết
          </div>
        </div>
      ) : error ? (
        <div style={{ 
          textAlign: "center", 
          padding: "60px 20px", 
          color: "#dc3545",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>⚠️</div>
          <div style={{ fontSize: "1.6rem", fontWeight: "600", marginBottom: "0.5rem", color: "#721c24" }}>
            Có lỗi xảy ra
          </div>
          <div style={{ fontSize: "1.3rem", color: "#721c24" }}>
            {error}
          </div>
        </div>
      ) : (
        <HighChart 
          title="BIỂU ĐỒ THỜI GIAN XỬ LÝ TỪNG BƯỚC"
          chartOptions={chartOptions} 
        />
      )}
    </Fragment>
  );
};
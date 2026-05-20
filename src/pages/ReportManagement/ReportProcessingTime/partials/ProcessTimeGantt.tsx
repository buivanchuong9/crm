import { HighChart } from "components/charts/HighChart";
import React, { Fragment, useState, useEffect } from "react";
import ReportManagementService from "services/ReportManagementService";
import { showToast } from "utils/common";


export const ProcessTimeGantt = ({ params, onParamChange }) => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hàm xử lý dữ liệu từ API Gantt thật
  const processApiData = (apiResponse: any) => {
    console.log(" Processing Gantt API data:", apiResponse);
    
    // Kiểm tra cấu trúc dữ liệu API Gantt thật: { code: 0, result: { cases: [...] } }
    if (!apiResponse?.result?.cases || !Array.isArray(apiResponse.result.cases)) {
      console.log(" No valid Gantt data found in API response");
      return {
        categories: [],
        seriesData: [],
        annotations: []
      };
    }

    const cases = apiResponse.result.cases;
    console.log(" Found cases:", cases);

    // Thu thập tất cả segments từ tất cả cases để tạo timeline
    const allSegments: any[] = [];
    const caseColors = ["#7CB342", "#42A5F5", "#FF7043", "#AB47BC", "#26C6DA", "#FFA726"];
    
    cases.forEach((caseItem: any, caseIndex: number) => {
      if (caseItem.segments && Array.isArray(caseItem.segments)) {
        caseItem.segments.forEach((segment: any, segmentIndex: number) => {
          allSegments.push({
            ...segment,
            potId: caseItem.potId,
            potName: caseItem.potName,
            caseIndex: caseIndex,
            segmentIndex: segmentIndex,
            color: caseColors[caseIndex % caseColors.length]
          });
        });
      }
    });

    if (allSegments.length === 0) {
      console.log(" No segments found in cases");
      return {
        categories: [],
        seriesData: [],
        annotations: []
      };
    }

    console.log(" All segments:", allSegments);

    // Tạo categories từ unique nodeNames
    const uniqueNodes = [...new Set(allSegments.map(seg => seg.nodeName))];
    console.log(" Unique nodes:", uniqueNodes);

    // Tạo series data cho Gantt chart
    const seriesData = allSegments.map((segment: any, index: number) => {
      // Tính toán thời gian cho Gantt
      const now = Date.now();
      const hourInMs = 60 * 60 * 1000;
      
      // Thời gian bắt đầu dựa trên thứ tự segment
      const startTime = now + (index * 2 * hourInMs); // Mỗi segment cách nhau 2 giờ
      
      // Thời gian kết thúc dựa trên duration
      const durationMs = (segment.durationMinutes || 60) * 60 * 1000; // Convert minutes to milliseconds
      const endTime = startTime + Math.max(durationMs, hourInMs); // Tối thiểu 1 giờ

      return {
        name: `${segment.potName} - ${segment.nodeName}`,
        start: startTime,
        end: endTime,
        y: uniqueNodes.indexOf(segment.nodeName), // Sử dụng index của node name
        processId: segment.processRef || apiResponse.result.processId,
        potId: segment.potId,
        potName: segment.potName,
        nodeId: segment.nodeId,
        nodeName: segment.nodeName,
        status: segment.durationMinutes > 0 ? "Hoàn thành" : "Chưa thực hiện",
        duration: segment.durationMinutes || 0,
        color: segment.color,
        milestone: false
      };
    });

    console.log(" Final series data:", seriesData);

    return {
      categories: uniqueNodes,
      seriesData: seriesData,
      annotations: []
    };
  };



  // Hàm gọi API
  const fetchGanttData = async () => {
    try {
      setLoading(true);
      setError(null);

      const paramSearch = {
        from: params?.startTime || "",
        to: params?.endTime || "",
        processId: parseInt(params.processId), // Không dùng fallback, chỉ gọi khi có processId thật
      };

      console.log("🔥 Fetching Gantt data with params:", paramSearch);
      
      const response = await ReportManagementService.listProcessingTimeGantt(paramSearch);
      
      console.log(" Gantt API Response:", response);
      console.log(" Response type:", typeof response);
      console.log(" Response code:", response?.code);
      console.log(" Response result:", response?.result);
      
      if (response?.code === 0) {
        const processedData = processApiData(response);
        setChartData(processedData);
      } else {
        setError(response?.message || "API trả về lỗi");
        showToast("Không thể tải dữ liệu biểu đồ Gantt", "error");
      }
    } catch (err: any) {
      console.error("Failed to fetch Gantt data:", err);
      setError(err.message || "Lỗi khi tải dữ liệu");
      showToast("Không thể tải dữ liệu biểu đồ Gantt", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Chỉ gọi API khi có processId được chọn
    if (params?.processId && params.processId !== "") {
      fetchGanttData();
    } else {
      // Hiển thị thông báo khi chưa chọn quy trình
      setLoading(false);
      setChartData(null);
      setError(null);
    }
  }, [params]);

  const chartOptions = {
    xAxis: {
      type: "datetime",
      title: { text: "Thời gian" },
    },
    yAxis: {
      title: { text: "Các bước trong quy trình" },
      categories: chartData ? chartData.categories : [],
      reversed: true
    },
    series: chartData && chartData.seriesData.length > 0 ? [
      {
        name: "Thời gian xử lý",
        type: "gantt",
        data: chartData.seriesData,
        dataLabels: { enabled: false },
        point: {
          events: {
            click: function(this: any) {
              console.log(" Gantt clicked:", this);
              if (onParamChange) {
                onParamChange({ 
                  processId: this.processId?.toString(),
                  potId: this.potId ? [this.potId.toString()] : [],
                  nodeName: this.nodeName
                });
              }
            }
          }
        }
      }
    ] : [],
    annotations: chartData ? chartData.annotations : [],
    tooltip: {
      pointFormatter: function(this: any) {
        return `<span><strong>Hồ sơ:</strong> ${this.potName} (ID: ${this.potId})</span><br/>
                <span><strong>Bước:</strong> ${this.nodeName}</span><br/>
                <span><strong>Bắt đầu:</strong> ${new Date(this.start).toLocaleString('vi-VN')}</span><br/>
                <span><strong>Kết thúc:</strong> ${new Date(this.end).toLocaleString('vi-VN')}</span><br/>
                <span><strong>Thời lượng:</strong> ${this.duration} phút</span><br/>
                <span><strong>Trạng thái:</strong> ${this.status}</span><br/>
                <span><strong>Node ID:</strong> ${this.nodeId}</span>`;
      }
    }
  };

  return (
    <Fragment>
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          Đang tải dữ liệu biểu đồ Gantt...
        </div>
      ) : !params?.processId || params.processId === "" ? (
        <div style={{ 
          textAlign: "center", 
          padding: "60px 20px", 
          color: "#666",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          border: "2px dashed #ddd"
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
            📊
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "1rem", color: "#333", textTransform: "uppercase" }}>
            Biểu đồ Gantt - Timeline xử lý hồ sơ
          </div>
          <div style={{ fontSize: "1.4rem", color: "#666" }}>
            Vui lòng chọn <strong>quy trình xử lý</strong> từ dropdown phía trên<br/>
            để xem timeline chi tiết các bước xử lý hồ sơ
          </div>
        </div>
      ) : error ? (
        <div style={{ textAlign: "center", padding: "40px", color: "red" }}>
          {error}
        </div>
      ) : chartData && chartData.seriesData && chartData.seriesData.length > 0 ? (
        <HighChart
          title="BIỂU ĐỒ GANTT - TIMELINE XỬ LÝ HỒ SƠ"
          defaultType="gantt"
          allowTypeChange={false}
          chartOptions={chartOptions}
        />
      ) : (
        <div style={{ 
          textAlign: "center", 
          padding: "60px 20px", 
          color: "#666",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          border: "1px solid #e9ecef"
        }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            📋
          </div>
          <div style={{ fontSize: "1.6rem", fontWeight: "600", marginBottom: "0.5rem", color: "#333" }}>
            Không có dữ liệu timeline
          </div>
          <div style={{ fontSize: "1.3rem", color: "#666" }}>
            Quy trình này chưa có dữ liệu xử lý hồ sơ nào<br/>
            hoặc chưa có hoạt động trong khoảng thời gian đã chọn
          </div>
        </div>
      )}
    </Fragment>
  );
};
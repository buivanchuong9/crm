import { HighChart } from "components/charts/HighChart";
import React, { Fragment, useState, useEffect } from "react";
import ReportManagementService from "services/ReportManagementService";
import { showToast } from "utils/common";

export const ProcessTimeCompare = ({ params, onParamChange }) => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Xử lý dữ liệu từ API
  const processApiData = (apiResponse) => {
    if (!apiResponse?.result?.cases) return { categories: [], data: [] };
    // Tính tổng thời gian cho mỗi hồ sơ
    const cases = apiResponse.result.cases
      .map(c => ({
        ...c,
        totalDuration: c.segments?.reduce((sum, seg) => sum + (seg.durationMinutes || 0), 0) || 0
      }))
      .filter(c => c.totalDuration > 0)
      .sort((a, b) => b.totalDuration - a.totalDuration)
      .slice(0, 5);

    const categories = cases.map(c => c.potName || `Hồ sơ ${c.potId}`);
    const data = [];
    cases.forEach((caseItem, yIdx) => {
      let start = 0;
      (caseItem.segments || []).forEach((seg, segIdx) => {
        if (seg.durationMinutes > 0) {
          data.push({
            x: start,
            x2: start + seg.durationMinutes,
            y: yIdx,
            color: ["#42A5F5", "#9E9E9E", "#EF5350", "#AB47BC", "#26C6DA"][segIdx % 5],
            nodeName: seg.nodeName
          });
          start += seg.durationMinutes;
        }
      });
    });
    return { categories, data };
  };

  // Gọi API thật
  const fetchGanttData = async () => {
    try {
      setLoading(true);
      // Log params để debug
      console.log("ProcessTimeCompare params:", params);
      // Nếu cần truyền token, sửa service để nhận headers
      const response = await ReportManagementService.listProcessingTimeGantt(params);
      console.log("ProcessTimeCompare API response:", response);
      if (response?.code === 0) {
        setChartData(processApiData(response));
      } else {
        setError("Không thể tải dữ liệu biểu đồ so sánh");
        showToast("Lỗi khi tải dữ liệu ProcessTimeCompare", "error");
      }
    } catch (err) {
      setError("Không thể tải dữ liệu biểu đồ so sánh");
      showToast("Lỗi khi tải dữ liệu ProcessTimeCompare", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGanttData();
  }, [params]);

  const chartOptions = {
    chart: {
      type: "xrange",
      height: 300,
      backgroundColor: "#fff"
    },
    title: {
      text: "Biểu đồ so sánh thời gian xử lý hồ sơ (Top 5)",
      style: { fontSize: "16px", fontWeight: "bold" }
    },
    xAxis: {
      title: { text: "Thời gian (phút)" },
      min: 0,
      // max: tự động theo dữ liệu
      tickInterval: 5
    },
    yAxis: {
      categories: chartData ? chartData.categories : [],
      reversed: false,
      title: { text: "" }
    },
    legend: { enabled: false },
    tooltip: {
      pointFormatter: function(this: any) {
        return `<span><strong>Hồ sơ:</strong> ${chartData?.categories[this.y] || ""}</span><br/>
                <span><strong>Bước:</strong> ${this.nodeName}</span><br/>
                <span><strong>Thời lượng:</strong> ${this.x2 - this.x} phút</span>`;
      }
    },
    series: [
      {
        name: "Tiến trình",
        data: chartData ? chartData.data : [],
        dataLabels: {
          enabled: true,
          formatter: function(this: any) { return this.point.nodeName; },
          style: { color: "black", textOutline: "none", fontWeight: "normal" }
        },
      }
    ]
  };

  if (loading) {
    return <div className="text-center py-10">Đang tải dữ liệu biểu đồ...</div>;
  }
  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }
  if (!chartData || chartData.data.length === 0) {
    return <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-300">Không có dữ liệu timeline</div>;
  }

  return (
    <Fragment>
      <HighChart
        title="BIỂU ĐỒ SO SÁNH THỜI GIAN XỬ LÝ HỒ SƠ"
        chartOptions={chartOptions}
        defaultType="xrange"
      />
    </Fragment>
  );
}
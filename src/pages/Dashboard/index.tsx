import React from "react";
import { useTranslation } from "react-i18next";
import "./index.scss";

export default function Dashboard() {
  const { t } = useTranslation();

  document.title = t(`pageDashboard.title`);

  const dashboardStats = [
    { label: "Ca nặng", value: 12, note: "+2 so với hôm qua", tone: "danger" },
    { label: "Ca vừa", value: 34, note: "-5 so với hôm qua", tone: "warning" },
    { label: "Ca nhẹ", value: 89, note: "Bình thường", tone: "info" },
  ];

  const activeCases = [
    { name: "Trần Thị Thu Nhi", type: "Nặng", typeKey: "nang", status: "Phản ứng thuốc", updated: "10 phút trước" },
    { name: "Lê Văn Hùng", type: "Vừa", typeKey: "vua", status: "Tái khám viêm da", updated: "45 phút trước" },
    { name: "Phạm Thị Lan Anh", type: "Nhẹ", typeKey: "nhe", status: "Hỏi kết quả", updated: "2 giờ trước" },
  ];

  const quickMessages = [
    {
      sender: "Trần Thị Thu Nhi",
      text: "Bác sĩ ơi, vết thương của em sưng to và rất đau. Nên làm gì ạ?",
      time: "10:05 AM",
    },
    {
      sender: "Bùi Văn Minh",
      text: "Chào bác sĩ, em có thể gửi ảnh chụp cận cảnh vết thương qua đây không?",
      time: "10:28 AM",
    },
  ];

  const todoItems = [
    { text: "Duyệt hồ sơ bệnh nhân P.T.Nhi", time: "Hạn: 9:20 AM" },
    { text: "Gọi điện hỗ trợ bệnh nhân T.T. Nhi", time: "Hạn: 11:00 AM" },
    { text: "Lên lịch hẹn tái khám cho Lê Văn Hùng", time: "Hạn: 3:00 PM" },
  ];

  return (
    <div className="page-content page-dashboard d-flex align-items-start">
      <div className="page-dashboard__left page-dashboard__left--full">
        <div className="card-box clinic-dashboard">
          <div className="clinic-dashboard__header">
            <div>
              <h2>Bảng điều khiển CSKH</h2>
              <p>Tổng quan hoạt động và ca bệnh ngày hôm nay.</p>
            </div>
            <div className="clinic-dashboard__date">Thứ Năm, 24 Tháng 10, 2024</div>
          </div>

          <div className="clinic-dashboard__stats">
            {dashboardStats.map((stat) => (
              <div key={stat.label} className={`stat-card stat-card--${stat.tone}`}>
                <div className="stat-card__label">{stat.label}</div>
                <div className="stat-card__value">{stat.value}</div>
                <div className="stat-card__note">{stat.note}</div>
              </div>
            ))}
          </div>

          <div className="clinic-dashboard__grid">
            <div className="clinic-dashboard__panel">
              <div className="panel-header">
                <span>Danh sách ca bệnh đang xử lý</span>
                <span className="panel-link">Xem tất cả</span>
              </div>
              <div className="panel-table">
                <div className="panel-table__head">
                  <span>Bệnh nhân</span>
                  <span>Phân loại</span>
                  <span>Tình trạng</span>
                  <span>Cập nhật</span>
                </div>
                {activeCases.map((item) => (
                  <div key={item.name} className="panel-table__row">
                    <span>{item.name}</span>
                    <span className={`badge badge--${item.typeKey}`}>{item.type}</span>
                    <span>{item.status}</span>
                    <span>{item.updated}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="clinic-dashboard__aside">
              <div className="aside-card">
                <div className="aside-card__title">Tin nhắn trực tiếp</div>
                {quickMessages.map((msg) => (
                  <div key={msg.sender} className="message-item">
                    <div className="message-item__header">
                      <span className="message-item__name">{msg.sender}</span>
                      <span className="message-item__time">{msg.time}</span>
                    </div>
                    <div className="message-item__text">{msg.text}</div>
                  </div>
                ))}
                <div className="message-input">Nhập tin nhắn...</div>
              </div>

              <div className="aside-card">
                <div className="aside-card__title">Công việc cần làm</div>
                <div className="todo-list">
                  {todoItems.map((task) => (
                    <div key={task.text} className="todo-item">
                      <span className="todo-item__dot" />
                      <div>
                        <div className="todo-item__text">{task.text}</div>
                        <div className="todo-item__time">{task.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="todo-add">+ Thêm công việc mới</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Card, Typography, Space, Tag, Button, Row, Col, Calendar, Badge, Alert, message } from "antd";
import { CalendarOutlined, ClockCircleOutlined, CheckOutlined, PhoneOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";

const { Title, Text } = Typography;

const UPCOMING = [
  { date: "Jun 21, 2026", time: "10:00 AM", type: "In-Clinic", session: "Session 6 — Hydration Boost", doctor: "Dr. Nguyễn Minh Anh" },
  { date: "Jul 5, 2026", time: "2:30 PM", type: "In-Clinic", session: "Session 7 — Progress Assessment", doctor: "Dr. Nguyễn Minh Anh" },
  { date: "Jul 19, 2026", time: "11:00 AM", type: "Telemedicine", session: "Routine Check-up", doctor: "Dr. Lê Thị Hà" },
];

const typeColor: Record<string, string> = {
  "In-Clinic": "#6c63ff",
  "Telemedicine": "#10b981",
};

const FollowupSchedulePage: React.FC = () => {
  const [confirmed, setConfirmed] = useState<string[]>([]);

  const confirm = (date: string) => {
    setConfirmed((prev) => [...prev, date]);
    message.success("Appointment confirmed!");
  };

  return (
    <div style={{ padding: 24, maxWidth: 1000, margin: "0 auto" }}>
      <Title level={3}>Follow-up Schedule</Title>
      <Text type="secondary" style={{ display: "block", marginBottom: 24 }}>
        Your upcoming treatment sessions and appointments
      </Text>

      <Alert
        message="Reminder: Session 6 is in 7 days"
        description="Please avoid retinol 48 hours before your next in-clinic session."
        type="warning"
        showIcon
        style={{ marginBottom: 24, borderRadius: 12 }}
        closable
      />

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={14}>
          <Space direction="vertical" style={{ width: "100%" }} size={12}>
            <Text strong style={{ fontSize: 15 }}>Upcoming Appointments</Text>
            {UPCOMING.map((a) => {
              const isConfirmed = confirmed.includes(a.date);
              return (
                <Card
                  key={a.date}
                  style={{
                    borderRadius: 12,
                    borderLeft: `4px solid ${typeColor[a.type] || "#6c63ff"}`,
                    opacity: isConfirmed ? 0.8 : 1,
                  }}
                >
                  <Row align="middle" justify="space-between">
                    <Col>
                      <Space align="start">
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 10,
                            background: `${typeColor[a.type]}20`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {a.type === "Telemedicine"
                            ? <PhoneOutlined style={{ color: typeColor[a.type], fontSize: 18 }} />
                            : <CalendarOutlined style={{ color: typeColor[a.type], fontSize: 18 }} />
                          }
                        </div>
                        <div>
                          <Text strong>{a.session}</Text>
                          <div>
                            <Tag
                              style={{
                                background: `${typeColor[a.type]}15`,
                                border: `1px solid ${typeColor[a.type]}`,
                                color: typeColor[a.type],
                                borderRadius: 12,
                              }}
                            >
                              {a.type}
                            </Tag>
                          </div>
                          <Space style={{ marginTop: 4 }}>
                            <ClockCircleOutlined style={{ color: "#9ca3af", fontSize: 12 }} />
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {a.date} · {a.time}
                            </Text>
                          </Space>
                          <Text type="secondary" style={{ display: "block", fontSize: 12 }}>
                            {a.doctor}
                          </Text>
                        </div>
                      </Space>
                    </Col>
                    <Col>
                      {isConfirmed ? (
                        <Tag color="green" icon={<CheckOutlined />}>Confirmed</Tag>
                      ) : (
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => confirm(a.date)}
                          style={{ borderRadius: 8, background: typeColor[a.type], border: "none" }}
                        >
                          Confirm
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Card>
              );
            })}
          </Space>
        </Col>

        <Col xs={24} lg={10}>
          <Card title="Appointment Calendar" style={{ borderRadius: 12 }}>
            <Calendar
              fullscreen={false}
              style={{ border: "none" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FollowupSchedulePage;

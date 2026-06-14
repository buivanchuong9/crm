import React from "react";
import { Row, Col, Card, Statistic, Progress, Typography, Tag, Avatar, List, Badge } from "antd";
import {
  BellOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  RiseOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const SUMMARY_STATS = [
  { label: "Active Patients", value: 248, color: "#1890ff", icon: <UserOutlined /> },
  { label: "Reminders Today", value: 34, color: "#52c41a", icon: <BellOutlined /> },
  { label: "High Risk", value: 12, color: "#ff4d4f", icon: <WarningOutlined /> },
  { label: "Lab Results Pending", value: 7, color: "#faad14", icon: <ClockCircleOutlined /> },
];

const RECENT_ALERTS = [
  { id: 1, patient: "Nguyen Thi Lan", type: "Missed Appointment", time: "2 hours ago", risk: "high" },
  { id: 2, patient: "Tran Van Minh", type: "Lab Result Ready", time: "3 hours ago", risk: "info" },
  { id: 3, patient: "Le Thi Hoa", type: "Reminder Sent (Zalo)", time: "5 hours ago", risk: "low" },
  { id: 4, patient: "Pham Duc Thanh", type: "Revisit Due", time: "6 hours ago", risk: "medium" },
  { id: 5, patient: "Hoang Thi Mai", type: "Treatment Complete", time: "8 hours ago", risk: "low" },
];

const FOLLOWUP_METRICS = [
  { label: "Reminder Response Rate", value: 78, color: "#1890ff" },
  { label: "Appointment Adherence", value: 85, color: "#52c41a" },
  { label: "Treatment Completion", value: 62, color: "#722ed1" },
  { label: "Patient Satisfaction", value: 91, color: "#13c2c2" },
];

const riskColor: Record<string, string> = {
  high: "#ff4d4f",
  medium: "#faad14",
  low: "#52c41a",
  info: "#1890ff",
};

export default function FollowupDashboardPage() {
  return (
    <div style={{ padding: 24, minHeight: "100vh", background: "#f5f5f5" }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>
          Follow-up Center
        </Title>
        <Text style={{ fontSize: 16, color: "#666" }}>
          Patient follow-up overview — {new Date().toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </Text>
      </div>

      {/* Summary stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {SUMMARY_STATS.map((s) => (
          <Col xs={24} sm={12} lg={6} key={s.label}>
            <Card
              style={{ borderRadius: 12, borderLeft: `4px solid ${s.color}` }}
              bodyStyle={{ padding: "20px 24px" }}
            >
              <Statistic
                title={<Text style={{ fontSize: 16, color: "#666" }}>{s.label}</Text>}
                value={s.value}
                valueStyle={{ fontSize: 32, fontWeight: 700, color: s.color }}
                prefix={React.cloneElement(s.icon as React.ReactElement, { style: { color: s.color } })}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        {/* Recent alerts */}
        <Col xs={24} lg={14}>
          <Card
            title={
              <span style={{ fontSize: 18, fontWeight: 600 }}>
                <BellOutlined style={{ marginRight: 8, color: "#1890ff" }} />
                Recent Alerts
              </span>
            }
            style={{ borderRadius: 12 }}
            bodyStyle={{ padding: 0 }}
          >
            <List
              dataSource={RECENT_ALERTS}
              renderItem={(item) => (
                <List.Item
                  style={{ padding: "16px 24px", borderBottom: "1px solid #f0f0f0" }}
                  actions={[
                    <Tag
                      color={riskColor[item.risk]}
                      style={{ fontSize: 13, padding: "2px 10px", borderRadius: 20 }}
                    >
                      {item.risk.toUpperCase()}
                    </Tag>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        size={44}
                        style={{ background: riskColor[item.risk], fontSize: 18 }}
                      >
                        {item.patient[0]}
                      </Avatar>
                    }
                    title={<Text strong style={{ fontSize: 16 }}>{item.patient}</Text>}
                    description={
                      <div>
                        <Text style={{ fontSize: 15 }}>{item.type}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 13 }}>{item.time}</Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Follow-up metrics */}
        <Col xs={24} lg={10}>
          <Card
            title={
              <span style={{ fontSize: 18, fontWeight: 600 }}>
                <RiseOutlined style={{ marginRight: 8, color: "#52c41a" }} />
                Follow-up Performance
              </span>
            }
            style={{ borderRadius: 12 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {FOLLOWUP_METRICS.map((m) => (
                <div key={m.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <Text style={{ fontSize: 15 }}>{m.label}</Text>
                    <Text strong style={{ fontSize: 15, color: m.color }}>{m.value}%</Text>
                  </div>
                  <Progress
                    percent={m.value}
                    strokeColor={m.color}
                    trailColor="#f0f0f0"
                    strokeWidth={10}
                    showInfo={false}
                  />
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 24,
                padding: 16,
                background: "#f6ffed",
                borderRadius: 8,
                border: "1px solid #b7eb8f",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 22 }} />
              <div>
                <Text strong style={{ fontSize: 15, color: "#389e0d" }}>On Track</Text>
                <br />
                <Text style={{ fontSize: 14, color: "#52c41a" }}>
                  Follow-up rate improved 6% this week
                </Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

import React, { useState } from "react";
import {
  Card, Table, Tag, Button, Progress, Typography, Row, Col, Statistic,
  Space, Avatar, Select, Tooltip, Badge,
} from "antd";
import {
  WarningOutlined, UserOutlined, ThunderboltOutlined,
  CheckCircleOutlined, ClockCircleOutlined, RobotOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

type RiskLevel = "low" | "medium" | "high";

interface Patient {
  id: number;
  name: string;
  age: number;
  condition: string;
  lastVisit: string;
  missedCount: number;
  journeyStatus: "active" | "paused" | "completed";
  riskScore: number;
  riskLevel: RiskLevel;
  recommendation: string;
  nextAction: string;
}

const RISK_COLOR: Record<RiskLevel, string> = {
  low: "#52c41a",
  medium: "#faad14",
  high: "#ff4d4f",
};

const RISK_BG: Record<RiskLevel, string> = {
  low: "#f6ffed",
  medium: "#fffbe6",
  high: "#fff2f0",
};

const PATIENTS: Patient[] = [
  { id: 1, name: "Nguyen Thi Lan", age: 42, condition: "Acne scarring", lastVisit: "45 days ago", missedCount: 2, journeyStatus: "paused", riskScore: 87, riskLevel: "high", recommendation: "Call immediately, high dropout risk", nextAction: "Call Now" },
  { id: 2, name: "Vo Thi Thu", age: 35, condition: "Melasma treatment", lastVisit: "38 days ago", missedCount: 1, journeyStatus: "paused", riskScore: 76, riskLevel: "high", recommendation: "Send urgent Zalo message", nextAction: "Send Zalo" },
  { id: 3, name: "Dang Van Long", age: 28, condition: "Hyperpigmentation", lastVisit: "22 days ago", missedCount: 1, journeyStatus: "active", riskScore: 54, riskLevel: "medium", recommendation: "Schedule reminder for next week", nextAction: "Set Reminder" },
  { id: 4, name: "Tran Van Minh", age: 55, condition: "Anti-aging program", lastVisit: "18 days ago", missedCount: 0, journeyStatus: "active", riskScore: 41, riskLevel: "medium", recommendation: "Monitor — approaching 3 weeks", nextAction: "Monitor" },
  { id: 5, name: "Le Thi Hoa", age: 31, condition: "Laser hair removal", lastVisit: "8 days ago", missedCount: 0, journeyStatus: "active", riskScore: 18, riskLevel: "low", recommendation: "On track — next session in 3 weeks", nextAction: "View Journey" },
  { id: 6, name: "Pham Duc Thanh", age: 48, condition: "Skin brightening", lastVisit: "5 days ago", missedCount: 0, journeyStatus: "active", riskScore: 12, riskLevel: "low", recommendation: "Excellent adherence", nextAction: "View Journey" },
  { id: 7, name: "Hoang Thi Mai", age: 39, condition: "Acne treatment", lastVisit: "14 days ago", missedCount: 0, journeyStatus: "active", riskScore: 27, riskLevel: "low", recommendation: "Routine follow-up sufficient", nextAction: "Set Reminder" },
];

const columns = [
  {
    title: <Text strong style={{ fontSize: 15 }}>Patient</Text>,
    key: "patient",
    render: (r: Patient) => (
      <Space>
        <Avatar size={44} style={{ background: RISK_COLOR[r.riskLevel], fontSize: 18, fontWeight: 700 }}>{r.name[0]}</Avatar>
        <div>
          <Text strong style={{ fontSize: 15 }}>{r.name}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 13 }}>{r.age} years · {r.condition}</Text>
        </div>
      </Space>
    ),
  },
  {
    title: <Text strong style={{ fontSize: 15 }}>Last Visit</Text>,
    dataIndex: "lastVisit",
    render: (v: string) => <Text style={{ fontSize: 15 }}>{v}</Text>,
  },
  {
    title: <Text strong style={{ fontSize: 15 }}>Missed</Text>,
    dataIndex: "missedCount",
    render: (v: number) => (
      <Badge count={v} style={{ background: v > 0 ? "#ff4d4f" : "#52c41a", fontSize: 14 }} showZero>
        <span style={{ width: 16, display: "inline-block" }} />
      </Badge>
    ),
  },
  {
    title: <Text strong style={{ fontSize: 15 }}>Status</Text>,
    dataIndex: "journeyStatus",
    render: (v: string) => {
      const map: Record<string, { color: string; label: string }> = {
        active: { color: "green", label: "Active" },
        paused: { color: "orange", label: "Paused" },
        completed: { color: "blue", label: "Completed" },
      };
      const s = map[v];
      return <Tag color={s.color} style={{ fontSize: 14, padding: "4px 12px", borderRadius: 20 }}>{s.label}</Tag>;
    },
  },
  {
    title: <Text strong style={{ fontSize: 15 }}>Churn Risk</Text>,
    key: "risk",
    sorter: (a: Patient, b: Patient) => b.riskScore - a.riskScore,
    defaultSortOrder: "ascend" as const,
    render: (r: Patient) => (
      <div style={{ minWidth: 140 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <Tag
            color={RISK_COLOR[r.riskLevel]}
            style={{ fontSize: 13, padding: "2px 10px", borderRadius: 20, border: "none", background: RISK_BG[r.riskLevel], color: RISK_COLOR[r.riskLevel] }}
          >
            {r.riskLevel.toUpperCase()}
          </Tag>
          <Text strong style={{ fontSize: 14, color: RISK_COLOR[r.riskLevel] }}>{r.riskScore}%</Text>
        </div>
        <Progress
          percent={r.riskScore}
          strokeColor={RISK_COLOR[r.riskLevel]}
          trailColor="#f0f0f0"
          strokeWidth={8}
          showInfo={false}
        />
      </div>
    ),
  },
  {
    title: <Text strong style={{ fontSize: 15 }}>AI Recommendation</Text>,
    dataIndex: "recommendation",
    render: (v: string) => <Text style={{ fontSize: 14, color: "#555" }}>{v}</Text>,
  },
  {
    title: "",
    key: "action",
    render: (r: Patient) => (
      <Button
        type={r.riskLevel === "high" ? "primary" : "default"}
        danger={r.riskLevel === "high"}
        size="large"
        style={{ fontSize: 14, minWidth: 120, borderRadius: 8 }}
      >
        {r.nextAction}
      </Button>
    ),
  },
];

export default function PatientRiskPage() {
  const [filter, setFilter] = useState<"all" | RiskLevel>("all");

  const filtered = filter === "all" ? PATIENTS : PATIENTS.filter((p) => p.riskLevel === filter);
  const high = PATIENTS.filter((p) => p.riskLevel === "high").length;
  const medium = PATIENTS.filter((p) => p.riskLevel === "medium").length;
  const low = PATIENTS.filter((p) => p.riskLevel === "low").length;

  return (
    <div style={{ padding: 24, minHeight: "100vh", background: "#f5f5f5" }}>
      <div style={{ marginBottom: 24, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <Title level={2} style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>
            <RobotOutlined style={{ marginRight: 10, color: "#722ed1" }} />
            AI Revisit Risk
          </Title>
          <Text style={{ fontSize: 16, color: "#666" }}>
            Patients most likely to drop out of treatment
          </Text>
        </div>
        <Button
          type="primary"
          size="large"
          icon={<ThunderboltOutlined />}
          style={{ fontSize: 15, height: 48, borderRadius: 10, background: "#722ed1", borderColor: "#722ed1" }}
        >
          Run AI Prediction
        </Button>
      </div>

      {/* Risk summary */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card
            style={{ borderRadius: 12, borderLeft: "4px solid #ff4d4f", cursor: "pointer" }}
            bodyStyle={{ padding: "16px 20px" }}
            onClick={() => setFilter(filter === "high" ? "all" : "high")}
          >
            <Statistic
              title={<Text style={{ fontSize: 16 }}>High Risk</Text>}
              value={high}
              valueStyle={{ fontSize: 32, fontWeight: 700, color: "#ff4d4f" }}
              prefix={<WarningOutlined style={{ color: "#ff4d4f" }} />}
            />
            <Text style={{ fontSize: 13, color: "#ff4d4f" }}>Requires immediate action</Text>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            style={{ borderRadius: 12, borderLeft: "4px solid #faad14", cursor: "pointer" }}
            bodyStyle={{ padding: "16px 20px" }}
            onClick={() => setFilter(filter === "medium" ? "all" : "medium")}
          >
            <Statistic
              title={<Text style={{ fontSize: 16 }}>Medium Risk</Text>}
              value={medium}
              valueStyle={{ fontSize: 32, fontWeight: 700, color: "#faad14" }}
              prefix={<ClockCircleOutlined style={{ color: "#faad14" }} />}
            />
            <Text style={{ fontSize: 13, color: "#faad14" }}>Schedule follow-up soon</Text>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            style={{ borderRadius: 12, borderLeft: "4px solid #52c41a", cursor: "pointer" }}
            bodyStyle={{ padding: "16px 20px" }}
            onClick={() => setFilter(filter === "low" ? "all" : "low")}
          >
            <Statistic
              title={<Text style={{ fontSize: 16 }}>Low Risk</Text>}
              value={low}
              valueStyle={{ fontSize: 32, fontWeight: 700, color: "#52c41a" }}
              prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
            />
            <Text style={{ fontSize: 13, color: "#52c41a" }}>Routine monitoring</Text>
          </Card>
        </Col>
      </Row>

      <Card
        style={{ borderRadius: 12 }}
        extra={
          <Select
            value={filter}
            onChange={(v) => setFilter(v)}
            size="large"
            style={{ width: 160, fontSize: 15 }}
            options={[
              { value: "all", label: "All Patients" },
              { value: "high", label: "High Risk" },
              { value: "medium", label: "Medium Risk" },
              { value: "low", label: "Low Risk" },
            ]}
          />
        }
      >
        <Table
          dataSource={filtered}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10, showSizeChanger: false }}
          rowClassName={(r: Patient) => r.riskLevel === "high" ? "derma-row-danger" : ""}
          style={{ fontSize: 15 }}
        />
      </Card>
    </div>
  );
}

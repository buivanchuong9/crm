import React, { useState } from "react";
import {
  Row, Col, Card, Button, Typography, Space, Tag, Table,
  Progress, Alert, Statistic, Badge,
} from "antd";
import {
  AlertOutlined, UserOutlined, CalendarOutlined,
  PhoneOutlined, MailOutlined, ExperimentOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import AIPlaceholderCard from "./AIPlaceholderCard";

const { Title, Text } = Typography;

interface PatientRisk {
  key: string;
  name: string;
  lastVisit: string;
  journeyStatus: string;
  riskLevel: "high" | "medium" | "low";
  churnScore: number;
  recommendation: string;
  nextAction: string;
}

const MOCK_DATA: PatientRisk[] = [
  {
    key: "1",
    name: "Nguyễn Thị Lan",
    lastVisit: "52 days ago",
    journeyStatus: "Session 4 / 10",
    riskLevel: "high",
    churnScore: 84,
    recommendation: "Immediate outreach required",
    nextAction: "Call today",
  },
  {
    key: "2",
    name: "Trần Văn Minh",
    lastVisit: "28 days ago",
    journeyStatus: "Session 7 / 10",
    riskLevel: "medium",
    churnScore: 52,
    recommendation: "Send reminder SMS + schedule next session",
    nextAction: "SMS in 2 days",
  },
  {
    key: "3",
    name: "Lê Thị Hương",
    lastVisit: "14 days ago",
    journeyStatus: "Session 9 / 10",
    riskLevel: "low",
    churnScore: 18,
    recommendation: "Near completion — book final review",
    nextAction: "Email this week",
  },
  {
    key: "4",
    name: "Phạm Quốc Bảo",
    lastVisit: "61 days ago",
    journeyStatus: "Session 2 / 8",
    riskLevel: "high",
    churnScore: 91,
    recommendation: "High dropout risk at early stage",
    nextAction: "Call today",
  },
  {
    key: "5",
    name: "Vũ Thị Mai",
    lastVisit: "35 days ago",
    journeyStatus: "Session 5 / 10",
    riskLevel: "medium",
    churnScore: 47,
    recommendation: "Midway disengagement — re-motivate",
    nextAction: "Zalo message",
  },
];

const riskConfig = {
  high: { color: "#ef4444", bg: "#fef2f2", label: "High Risk" },
  medium: { color: "#f59e0b", bg: "#fffbeb", label: "Medium" },
  low: { color: "#10b981", bg: "#f0fdf4", label: "Low Risk" },
};

const COLUMNS: ColumnsType<PatientRisk> = [
  {
    title: "Patient",
    dataIndex: "name",
    render: (name) => (
      <Space>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#6c63ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UserOutlined style={{ color: "#fff", fontSize: 14 }} />
        </div>
        <Text strong>{name}</Text>
      </Space>
    ),
  },
  {
    title: "Last Visit",
    dataIndex: "lastVisit",
    render: (v) => (
      <Space>
        <CalendarOutlined style={{ color: "#9ca3af" }} />
        <Text type="secondary">{v}</Text>
      </Space>
    ),
  },
  {
    title: "Journey Status",
    dataIndex: "journeyStatus",
    render: (v) => <Tag color="blue">{v}</Tag>,
  },
  {
    title: "Churn Risk",
    dataIndex: "churnScore",
    sorter: (a, b) => b.churnScore - a.churnScore,
    render: (score, row) => {
      const cfg = riskConfig[row.riskLevel];
      return (
        <Space direction="vertical" style={{ gap: 2 }}>
          <Progress
            percent={score}
            strokeColor={cfg.color}
            trailColor="#f3f4f6"
            showInfo={false}
            size="small"
            style={{ width: 80, marginBottom: 0 }}
          />
          <Tag
            style={{
              background: cfg.bg,
              color: cfg.color,
              border: `1px solid ${cfg.color}`,
              borderRadius: 12,
            }}
          >
            {score}% — {cfg.label}
          </Tag>
        </Space>
      );
    },
  },
  {
    title: "Recommended Action",
    dataIndex: "recommendation",
    render: (v) => <Text style={{ fontSize: 13 }}>{v}</Text>,
  },
  {
    title: "Next Step",
    dataIndex: "nextAction",
    render: (v, row) => (
      <Space>
        <Button
          size="small"
          icon={row.nextAction.includes("Call") ? <PhoneOutlined /> : <MailOutlined />}
          style={{
            background: riskConfig[row.riskLevel].bg,
            border: `1px solid ${riskConfig[row.riskLevel].color}`,
            color: riskConfig[row.riskLevel].color,
            borderRadius: 8,
          }}
        >
          {v}
        </Button>
      </Space>
    ),
  },
];

const AIRevisitRiskPage: React.FC = () => {
  const [predicted, setPredicted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePredict = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPredicted(true);
    }, 1800);
  };

  const highRisk = MOCK_DATA.filter((p) => p.riskLevel === "high").length;
  const mediumRisk = MOCK_DATA.filter((p) => p.riskLevel === "medium").length;

  return (
    <div style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <Space align="center">
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, #ef4444, #f87171)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AlertOutlined style={{ fontSize: 24, color: "#fff" }} />
          </div>
          <div>
            <Title level={3} style={{ margin: 0, color: "#1a1a2e" }}>
              AI Revisit Risk Prediction
            </Title>
            <Text type="secondary">
              Identify patients at risk of dropping out before treatment completion
            </Text>
          </div>
        </Space>
      </div>

      <Alert
        message="AI Placeholder — Preview Mode"
        description="This module uses behavioral data and treatment history to predict patient dropout risk. Data shown is for demonstration."
        type="warning"
        showIcon
        style={{ marginBottom: 24, borderRadius: 12 }}
        closable
      />

      {/* Summary Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {[
          { title: "Active Patients", value: 48, color: "#6c63ff", icon: <UserOutlined /> },
          { title: "High Risk", value: highRisk, color: "#ef4444", icon: <AlertOutlined />, suffix: "patients" },
          { title: "Medium Risk", value: mediumRisk, color: "#f59e0b", icon: <AlertOutlined />, suffix: "patients" },
          { title: "Avg Churn Score", value: 46, color: "#10b981", suffix: "%" },
        ].map((s, i) => (
          <Col xs={12} lg={6} key={i}>
            <Card style={{ borderRadius: 12, textAlign: "center" }}>
              <Statistic
                title={s.title}
                value={s.value}
                suffix={s.suffix}
                prefix={s.icon}
                valueStyle={{ color: s.color, fontSize: 28, fontWeight: 700 }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {!predicted ? (
        <Card style={{ borderRadius: 12, textAlign: "center", padding: 24 }}>
          <AIPlaceholderCard
            title="Run Dropout Risk Prediction"
            description="Our AI model analyzes visit frequency, session completion rate, engagement score, and treatment phase to predict which patients are likely to drop out before completing their journey."
            tags={["Behavioral ML", "Treatment Compliance", "Predictive Scoring"]}
          />
          <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={handlePredict}
            icon={<ExperimentOutlined />}
            style={{
              marginTop: 24,
              borderRadius: 8,
              background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
              border: "none",
              height: 44,
              padding: "0 32px",
              fontWeight: 600,
            }}
          >
            {loading ? "Predicting..." : "Run AI Prediction"}
          </Button>
        </Card>
      ) : (
        <Card
          title={
            <Space>
              <AlertOutlined style={{ color: "#ef4444" }} />
              <span>At-Risk Patient Report</span>
              <Badge count={`${highRisk} urgent`} style={{ background: "#ef4444" }} />
            </Space>
          }
          style={{ borderRadius: 12 }}
          extra={
            <Space>
              <Button icon={<MailOutlined />}>Bulk Email</Button>
              <Button icon={<PhoneOutlined />} type="primary" style={{ background: "#6c63ff", border: "none" }}>
                Auto Campaign
              </Button>
            </Space>
          }
        >
          <Table
            columns={COLUMNS}
            dataSource={MOCK_DATA}
            pagination={false}
            rowClassName={(row) =>
              row.riskLevel === "high" ? "ant-table-row-high-risk" : ""
            }
          />
        </Card>
      )}
    </div>
  );
};

export default AIRevisitRiskPage;

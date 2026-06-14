import React, { useState } from "react";
import {
  Row, Col, Card, Button, Typography, Space, Tag, Progress,
  Select, Statistic, Alert, Divider,
} from "antd";
import {
  LineChartOutlined, RiseOutlined, ExperimentOutlined,
  CameraOutlined, CheckCircleOutlined,
} from "@ant-design/icons";
import AIPlaceholderCard from "./AIPlaceholderCard";

const { Title, Text } = Typography;

const MOCK_PATIENTS = [
  { value: "P001", label: "Nguyễn Thị Lan — Acne Treatment" },
  { value: "P002", label: "Trần Văn Minh — Hyperpigmentation" },
  { value: "P003", label: "Lê Thị Hương — Anti-aging Journey" },
];

const MOCK_METRICS = [
  { label: "Acne Reduction", before: 85, after: 32, unit: "lesions" },
  { label: "Skin Hydration", before: 42, after: 78, unit: "%" },
  { label: "Pigmentation Score", before: 73, after: 28, unit: "points" },
  { label: "Pore Visibility", before: 68, after: 41, unit: "%" },
];

const AIProgressAnalysisPage: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ padding: "24px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <Space align="center">
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, #10b981, #34d399)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LineChartOutlined style={{ fontSize: 24, color: "#fff" }} />
          </div>
          <div>
            <Title level={3} style={{ margin: 0, color: "#1a1a2e" }}>
              AI Progress Analysis
            </Title>
            <Text type="secondary">
              Compare before/after images and track measurable skin improvement metrics
            </Text>
          </div>
        </Space>
      </div>

      <Alert
        message="AI Placeholder — Preview Mode"
        description="This feature uses computer vision to quantify treatment progress. Currently showing mock data."
        type="info"
        showIcon
        style={{ marginBottom: 24, borderRadius: 12 }}
        closable
      />

      {/* Patient Selector */}
      <Card style={{ borderRadius: 12, marginBottom: 24 }}>
        <Row gutter={16} align="middle">
          <Col xs={24} md={16}>
            <Text strong style={{ display: "block", marginBottom: 8 }}>
              Select Patient Journey
            </Text>
            <Select
              style={{ width: "100%" }}
              placeholder="Search patient name or journey..."
              options={MOCK_PATIENTS}
              onChange={setSelected}
              size="large"
            />
          </Col>
          <Col xs={24} md={8}>
            <Button
              type="primary"
              block
              size="large"
              disabled={!selected}
              icon={<ExperimentOutlined />}
              style={{
                borderRadius: 8,
                background: "#10b981",
                border: "none",
                height: 44,
                fontWeight: 600,
                marginTop: 24,
              }}
            >
              Analyze Progress
            </Button>
          </Col>
        </Row>
      </Card>

      {!selected ? (
        <AIPlaceholderCard
          title="AI Progress Analysis"
          description="Select a patient and their treatment journey to run AI-powered before/after comparison, skin metric scoring, and improvement forecasting."
          tags={["Before/After Vision", "Skin Metrics", "Progress Forecasting"]}
          eta="Q3 2026"
        />
      ) : (
        <Row gutter={[24, 24]}>
          {/* Before / After */}
          <Col xs={24}>
            <Card
              title={
                <Space>
                  <CameraOutlined style={{ color: "#10b981" }} />
                  <span>Before / After Comparison</span>
                  <Tag color="green">Session 6 of 10</Tag>
                </Space>
              }
              style={{ borderRadius: 12 }}
            >
              <Row gutter={16}>
                {["Before (Week 0)", "After (Week 12)"].map((label, i) => (
                  <Col xs={12} key={label}>
                    <div
                      style={{
                        height: 200,
                        background: i === 0
                          ? "linear-gradient(135deg, #fef3c7, #fde68a)"
                          : "linear-gradient(135deg, #d1fae5, #a7f3d0)",
                        borderRadius: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: `2px dashed ${i === 0 ? "#f59e0b" : "#10b981"}`,
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      <CameraOutlined style={{ fontSize: 32, color: i === 0 ? "#d97706" : "#059669" }} />
                      <Text style={{ color: i === 0 ? "#92400e" : "#065f46", fontWeight: 600 }}>
                        {label}
                      </Text>
                      <Text style={{ color: "#6b7280", fontSize: 12 }}>Mock image placeholder</Text>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>

          {/* Metrics */}
          <Col xs={24} lg={14}>
            <Card
              title={
                <Space>
                  <RiseOutlined style={{ color: "#10b981" }} />
                  <span>Skin Improvement Metrics</span>
                </Space>
              }
              style={{ borderRadius: 12 }}
            >
              <Space direction="vertical" style={{ width: "100%" }} size={20}>
                {MOCK_METRICS.map((m) => {
                  const improvement = Math.round(((m.before - m.after) / m.before) * 100);
                  const isPositive = m.label === "Skin Hydration"
                    ? m.after > m.before
                    : m.after < m.before;

                  return (
                    <div key={m.label}>
                      <Row justify="space-between" style={{ marginBottom: 6 }}>
                        <Text strong>{m.label}</Text>
                        <Space>
                          <Tag color={isPositive ? "green" : "red"}>
                            {isPositive ? "↑" : "↓"} {Math.abs(improvement)}% {isPositive ? "improved" : "increased"}
                          </Tag>
                        </Space>
                      </Row>
                      <Row gutter={8} align="middle">
                        <Col span={4}>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            Before: {m.before}
                          </Text>
                        </Col>
                        <Col span={16}>
                          <Progress
                            percent={isPositive
                              ? 100 - Math.round((m.after / m.before) * 100)
                              : Math.round((m.after / m.before) * 100)}
                            strokeColor={isPositive ? "#10b981" : "#ef4444"}
                            trailColor="#f3f4f6"
                            showInfo={false}
                            strokeWidth={8}
                          />
                        </Col>
                        <Col span={4}>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            After: {m.after}
                          </Text>
                        </Col>
                      </Row>
                    </div>
                  );
                })}
              </Space>
            </Card>
          </Col>

          {/* Overall Score */}
          <Col xs={24} lg={10}>
            <Card style={{ borderRadius: 12, height: "100%" }}>
              <Space direction="vertical" align="center" style={{ width: "100%" }}>
                <Text strong style={{ fontSize: 16 }}>Overall Treatment Score</Text>
                <Progress
                  type="circle"
                  percent={78}
                  strokeColor={{ "0%": "#6c63ff", "100%": "#10b981" }}
                  size={140}
                />
                <Tag color="green" style={{ fontSize: 14, padding: "4px 16px" }}>
                  <CheckCircleOutlined /> Good Progress
                </Tag>
                <Divider />
                <Row gutter={16} style={{ width: "100%" }}>
                  {[
                    { title: "Sessions Done", value: 6, suffix: "/ 10" },
                    { title: "Weeks Active", value: 12, suffix: "wks" },
                    { title: "Compliance", value: 94, suffix: "%" },
                  ].map((s) => (
                    <Col span={8} key={s.title}>
                      <Statistic
                        title={<Text style={{ fontSize: 11 }}>{s.title}</Text>}
                        value={s.value}
                        suffix={s.suffix}
                        valueStyle={{ fontSize: 20, color: "#6c63ff" }}
                      />
                    </Col>
                  ))}
                </Row>
                <Button
                  type="primary"
                  block
                  style={{ borderRadius: 8, background: "#10b981", border: "none" }}
                >
                  Generate Progress Report
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default AIProgressAnalysisPage;

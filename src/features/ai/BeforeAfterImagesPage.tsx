import React from "react";
import { Row, Col, Card, Typography, Space, Tag, Button, Select } from "antd";
import { CameraOutlined, PlusOutlined, SwapOutlined } from "@ant-design/icons";
import AIPlaceholderCard from "./AIPlaceholderCard";

const { Title, Text } = Typography;

const MOCK_SESSIONS = [
  { value: "s1", label: "Session 1 — Week 1" },
  { value: "s2", label: "Session 3 — Week 4" },
  { value: "s3", label: "Session 6 — Week 8" },
];

const BeforeAfterImagesPage: React.FC = () => (
  <div style={{ padding: "24px", maxWidth: 1100, margin: "0 auto" }}>
    <div style={{ marginBottom: 32 }}>
      <Space align="center">
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CameraOutlined style={{ fontSize: 24, color: "#fff" }} />
        </div>
        <div>
          <Title level={3} style={{ margin: 0, color: "#1a1a2e" }}>
            Before / After Images
          </Title>
          <Text type="secondary">Document and compare patient skin progress across sessions</Text>
        </div>
      </Space>
    </div>

    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      <Col xs={24} md={12}>
        <Select
          style={{ width: "100%" }}
          placeholder="Select patient..."
          size="large"
          options={[
            { value: "p1", label: "Nguyễn Thị Lan — Acne Treatment" },
            { value: "p2", label: "Trần Văn Minh — Hyperpigmentation" },
          ]}
        />
      </Col>
      <Col xs={24} md={8}>
        <Select
          style={{ width: "100%" }}
          placeholder="Compare sessions..."
          size="large"
          options={MOCK_SESSIONS}
        />
      </Col>
      <Col xs={24} md={4}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          block
          style={{ borderRadius: 8, background: "#3b82f6", border: "none" }}
        >
          Add Photos
        </Button>
      </Col>
    </Row>

    <Row gutter={[24, 24]}>
      <Col xs={24} lg={14}>
        <Card
          title={
            <Space>
              <SwapOutlined style={{ color: "#3b82f6" }} />
              <span>Side-by-Side Comparison</span>
              <Tag color="blue">Mock Preview</Tag>
            </Space>
          }
          style={{ borderRadius: 12 }}
        >
          <Row gutter={12}>
            {[
              { label: "Before — Week 1", color: "#fef3c7", border: "#f59e0b", icon: "#d97706" },
              { label: "After — Week 8", color: "#d1fae5", border: "#10b981", icon: "#059669" },
            ].map((s) => (
              <Col xs={12} key={s.label}>
                <div
                  style={{
                    height: 240,
                    background: s.color,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `2px dashed ${s.border}`,
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <CameraOutlined style={{ fontSize: 36, color: s.icon }} />
                  <Text style={{ color: s.icon, fontWeight: 600 }}>{s.label}</Text>
                  <Text style={{ color: "#6b7280", fontSize: 12 }}>Image placeholder</Text>
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      </Col>
      <Col xs={24} lg={10}>
        <AIPlaceholderCard
          title="AI Image Comparison"
          description="AI will automatically measure and score skin improvement by comparing before and after photos using computer vision — detecting changes in texture, tone, pigmentation and acne count."
          tags={["Computer Vision", "Skin Scoring", "Auto Report"]}
          eta="Q3 2026"
        />
      </Col>
    </Row>
  </div>
);

export default BeforeAfterImagesPage;

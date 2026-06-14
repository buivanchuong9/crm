import React, { useState } from "react";
import {
  Row, Col, Card, Upload, Button, Typography, Space, Tag, Progress,
  Divider, Alert,
} from "antd";
import {
  CameraOutlined, InboxOutlined, ExperimentOutlined,
  CheckCircleOutlined, WarningOutlined,
} from "@ant-design/icons";
import AIPlaceholderCard from "./AIPlaceholderCard";

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

const MOCK_CONDITIONS = [
  { name: "Acne Vulgaris", confidence: 87, severity: "Moderate", color: "#f59e0b" },
  { name: "Seborrheic Dermatitis", confidence: 62, severity: "Mild", color: "#10b981" },
  { name: "Post-Inflammatory Hyperpigmentation", confidence: 74, severity: "Moderate", color: "#f59e0b" },
];

const MOCK_RECOMMENDATIONS = [
  "Chemical exfoliation with AHA/BHA 2x per week",
  "Niacinamide 10% serum — morning routine",
  "SPF 50+ sunscreen — mandatory daily",
  "Tretinoin 0.025% — evening, start alternate nights",
  "Azelaic acid 15% for pigmentation spots",
];

const AISkinAssessmentPage: React.FC = () => {
  const [analyzed, setAnalyzed] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 2000);
  };

  return (
    <div style={{ padding: "24px", maxWidth: 1100, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <Space align="center">
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ExperimentOutlined style={{ fontSize: 24, color: "#fff" }} />
          </div>
          <div>
            <Title level={3} style={{ margin: 0, color: "#1a1a2e" }}>
              AI Skin Assessment
            </Title>
            <Text type="secondary">
              Upload patient skin images for AI-powered condition analysis
            </Text>
          </div>
        </Space>
      </div>

      <Alert
        message="AI Placeholder — Preview Mode"
        description="This feature is in development. Results shown are mock data for UI demonstration only."
        type="info"
        showIcon
        style={{ marginBottom: 24, borderRadius: 12 }}
        closable
      />

      <Row gutter={[24, 24]}>
        {/* Upload Panel */}
        <Col xs={24} lg={10}>
          <Card
            title={
              <Space>
                <CameraOutlined style={{ color: "#6c63ff" }} />
                <span>Patient Skin Images</span>
              </Space>
            }
            style={{ borderRadius: 12, height: "100%" }}
          >
            <Dragger
              multiple
              accept="image/*"
              beforeUpload={() => false}
              style={{ borderRadius: 8, borderColor: "#c4b5fd" }}
            >
              <p style={{ margin: "20px 0 8px" }}>
                <InboxOutlined style={{ fontSize: 40, color: "#6c63ff" }} />
              </p>
              <p style={{ fontWeight: 600, color: "#4c1d95" }}>
                Drop skin images here
              </p>
              <p style={{ color: "#6b7280", fontSize: 13 }}>
                JPG, PNG up to 10MB · Front / profile / close-up views recommended
              </p>
            </Dragger>

            <Divider />

            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>Patient Notes (optional)</Text>
              <textarea
                placeholder="Chief complaint, duration, previous treatments..."
                rows={4}
                style={{
                  width: "100%",
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  padding: "8px 12px",
                  resize: "vertical",
                  fontFamily: "inherit",
                  fontSize: 14,
                }}
              />
            </Space>

            <Button
              type="primary"
              block
              size="large"
              loading={analyzing}
              onClick={handleAnalyze}
              style={{
                marginTop: 16,
                borderRadius: 8,
                background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
                border: "none",
                height: 44,
                fontWeight: 600,
              }}
              icon={<ExperimentOutlined />}
            >
              {analyzing ? "Analyzing..." : "Run AI Assessment"}
            </Button>
          </Card>
        </Col>

        {/* Results Panel */}
        <Col xs={24} lg={14}>
          {!analyzed ? (
            <AIPlaceholderCard
              title="AI Analysis Ready"
              description="Upload patient skin photos and click 'Run AI Assessment' to receive an instant AI-powered diagnosis with condition detection, severity scoring, and personalized treatment recommendations."
              tags={["CNN Vision Model", "Dermatology Dataset", "ICD-10 Coded"]}
            />
          ) : (
            <Space direction="vertical" style={{ width: "100%" }} size={16}>
              {/* Detected conditions */}
              <Card
                title={
                  <Space>
                    <CheckCircleOutlined style={{ color: "#10b981" }} />
                    <span>Detected Conditions</span>
                    <Tag color="green">Mock Result</Tag>
                  </Space>
                }
                style={{ borderRadius: 12 }}
              >
                <Space direction="vertical" style={{ width: "100%" }} size={16}>
                  {MOCK_CONDITIONS.map((c) => (
                    <div key={c.name}>
                      <Row justify="space-between" align="middle" style={{ marginBottom: 4 }}>
                        <Space>
                          <Text strong>{c.name}</Text>
                          <Tag color={c.severity === "Mild" ? "green" : "orange"}>
                            {c.severity}
                          </Tag>
                        </Space>
                        <Text style={{ color: c.color, fontWeight: 700 }}>
                          {c.confidence}%
                        </Text>
                      </Row>
                      <Progress
                        percent={c.confidence}
                        showInfo={false}
                        strokeColor={c.color}
                        trailColor="#f3f4f6"
                        strokeWidth={6}
                        style={{ marginBottom: 0 }}
                      />
                    </div>
                  ))}
                </Space>
              </Card>

              {/* Recommendations */}
              <Card
                title={
                  <Space>
                    <WarningOutlined style={{ color: "#f59e0b" }} />
                    <span>AI Treatment Recommendations</span>
                  </Space>
                }
                style={{ borderRadius: 12 }}
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  {MOCK_RECOMMENDATIONS.map((rec, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        padding: "8px 12px",
                        background: i % 2 === 0 ? "#f9fafb" : "#fff",
                        borderRadius: 8,
                      }}
                    >
                      <Tag
                        style={{
                          minWidth: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: "#6c63ff",
                          color: "#fff",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </Tag>
                      <Text>{rec}</Text>
                    </div>
                  ))}
                </Space>
                <Divider />
                <Button
                  type="primary"
                  block
                  style={{
                    borderRadius: 8,
                    background: "#6c63ff",
                    border: "none",
                  }}
                >
                  Generate Treatment Journey from Assessment
                </Button>
              </Card>
            </Space>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default AISkinAssessmentPage;

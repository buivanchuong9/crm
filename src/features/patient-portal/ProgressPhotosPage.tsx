import React from "react";
import { Row, Col, Card, Typography, Space, Tag, Button, Upload } from "antd";
import { CameraOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import AIPlaceholderCard from "../ai/AIPlaceholderCard";

const { Title, Text } = Typography;

const SESSIONS = [
  { week: "Week 1", date: "Mar 1, 2026", count: 3 },
  { week: "Week 4", date: "Mar 22, 2026", count: 2 },
  { week: "Week 8", date: "Apr 19, 2026", count: 4 },
];

const ProgressPhotosPage: React.FC = () => (
  <div style={{ padding: 24, maxWidth: 1000, margin: "0 auto" }}>
    <Row justify="space-between" align="middle" style={{ marginBottom: 32 }}>
      <Col>
        <Title level={3} style={{ margin: 0 }}>Progress Photos</Title>
        <Text type="secondary">Track your skin transformation across sessions</Text>
      </Col>
      <Col>
        <Upload beforeUpload={() => false} showUploadList={false} accept="image/*">
          <Button type="primary" icon={<PlusOutlined />} style={{ borderRadius: 8, background: "#6c63ff", border: "none" }}>
            Add Photos
          </Button>
        </Upload>
      </Col>
    </Row>

    <Row gutter={[24, 24]}>
      {SESSIONS.map((s) => (
        <Col xs={24} md={8} key={s.week}>
          <Card
            title={
              <Space justify="space-between" style={{ width: "100%" }}>
                <span>{s.week}</span>
                <Tag color="blue">{s.count} photos</Tag>
              </Space>
            }
            style={{ borderRadius: 12 }}
          >
            <Text type="secondary" style={{ display: "block", marginBottom: 12, fontSize: 12 }}>
              {s.date}
            </Text>
            <Row gutter={[8, 8]}>
              {Array.from({ length: s.count }).map((_, i) => (
                <Col span={i === 0 ? 24 : 12} key={i}>
                  <div
                    style={{
                      height: i === 0 ? 140 : 80,
                      background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px dashed #d1d5db",
                    }}
                  >
                    <CameraOutlined style={{ fontSize: i === 0 ? 28 : 20, color: "#9ca3af" }} />
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      ))}

      <Col xs={24}>
        <AIPlaceholderCard
          title="AI Photo Analysis Coming Soon"
          description="Our AI will automatically compare your photos across sessions, measuring improvements in skin texture, tone, and clarity — giving you a precise score for your treatment progress."
          tags={["Auto Comparison", "Skin Score", "Progress Report"]}
        />
      </Col>
    </Row>
  </div>
);

export default ProgressPhotosPage;

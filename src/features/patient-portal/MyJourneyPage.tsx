import React from "react";
import { Row, Col, Card, Typography, Space, Tag, Progress, Button, Timeline, Steps } from "antd";
import { CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, StarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const JOURNEY_STEPS = [
  { title: "Initial Consultation", status: "done", date: "Mar 1, 2026" },
  { title: "Cleansing Protocol", status: "done", date: "Mar 8, 2026" },
  { title: "Chemical Exfoliation", status: "done", date: "Mar 15, 2026" },
  { title: "Active Ingredient Phase", status: "active", date: "Mar 22, 2026" },
  { title: "Hydration Boost", status: "pending", date: "Apr 5, 2026" },
  { title: "Progress Assessment", status: "pending", date: "Apr 19, 2026" },
];

const MyJourneyPage: React.FC = () => (
  <div style={{ padding: "24px", maxWidth: 900, margin: "0 auto" }}>
    <div style={{ marginBottom: 32 }}>
      <Title level={3} style={{ margin: 0 }}>My Treatment Journey</Title>
      <Text type="secondary">Acne Vulgaris — Standard Plan · Started March 2026</Text>
    </div>

    <Row gutter={[24, 24]}>
      <Col xs={24} md={8}>
        <Card style={{ borderRadius: 12, textAlign: "center" }}>
          <Progress
            type="circle"
            percent={50}
            strokeColor={{ "0%": "#6c63ff", "100%": "#10b981" }}
            size={120}
          />
          <Title level={4} style={{ marginTop: 16, marginBottom: 4 }}>50% Complete</Title>
          <Text type="secondary">Session 5 of 10</Text>
          <div style={{ marginTop: 16 }}>
            <Tag color="green"><CheckCircleOutlined /> On Track</Tag>
          </div>
          <Button
            type="primary"
            block
            style={{ marginTop: 16, borderRadius: 8, background: "#6c63ff", border: "none" }}
            icon={<CalendarOutlined />}
          >
            Book Next Session
          </Button>
        </Card>
      </Col>

      <Col xs={24} md={16}>
        <Card title="Journey Steps" style={{ borderRadius: 12 }}>
          <Steps
            direction="vertical"
            current={3}
            size="small"
            items={JOURNEY_STEPS.map((s) => ({
              title: s.title,
              description: s.date,
              icon: s.status === "done"
                ? <CheckCircleOutlined style={{ color: "#10b981" }} />
                : s.status === "active"
                ? <ClockCircleOutlined style={{ color: "#6c63ff" }} />
                : undefined,
            }))}
          />
        </Card>
      </Col>

      <Col xs={24}>
        <Card title="Your Doctor's Notes" style={{ borderRadius: 12 }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            {[
              { date: "Mar 15", note: "Great improvement in pore congestion. Continue Salicylic acid 2%." },
              { date: "Mar 8", note: "Skin tolerating cleanser well. No irritation reported. Moving to exfoliation phase." },
              { date: "Mar 1", note: "Initial consultation complete. Diagnosed moderate acne vulgaris. Starting with gentle protocol." },
            ].map((n) => (
              <div key={n.date} style={{ padding: "12px 16px", background: "#f9fafb", borderRadius: 8 }}>
                <Space>
                  <Tag color="blue">{n.date}</Tag>
                  <Text>{n.note}</Text>
                </Space>
              </div>
            ))}
          </Space>
        </Card>
      </Col>
    </Row>
  </div>
);

export default MyJourneyPage;

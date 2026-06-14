import React, { useState } from "react";
import { Card, Typography, Space, Button, Rate, Input, Row, Col, Tag, message } from "antd";
import { SmileOutlined, MehOutlined, FrownOutlined, SendOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea } = Input;

const SKIN_FACTORS = ["Oiliness", "Dryness", "Redness", "Breakouts", "Sensitivity"];

const DailyCheckInPage: React.FC = () => {
  const [mood, setMood] = useState<number | null>(null);
  const [skinRating, setSkinRating] = useState(0);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    message.success("Daily check-in submitted!");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ padding: 24, maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <SmileOutlined style={{ fontSize: 64, color: "#10b981", marginBottom: 16 }} />
        <Title level={3} style={{ color: "#065f46" }}>Check-in Submitted!</Title>
        <Text type="secondary">Your doctor will review your daily update. Keep up the great work!</Text>
        <Button
          type="primary"
          block
          style={{ marginTop: 24, borderRadius: 8, background: "#6c63ff", border: "none" }}
          onClick={() => setSubmitted(false)}
        >
          Submit Another Check-in
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: "0 auto" }}>
      <Title level={3}>Daily Skin Check-in</Title>
      <Text type="secondary" style={{ display: "block", marginBottom: 24 }}>
        Tuesday, June 14 · Day 45 of your journey
      </Text>

      <Space direction="vertical" style={{ width: "100%" }} size={16}>
        <Card title="How are you feeling today?" style={{ borderRadius: 12 }}>
          <Row gutter={12} justify="center">
            {[
              { icon: <SmileOutlined />, label: "Great", value: 3, color: "#10b981" },
              { icon: <MehOutlined />, label: "Okay", value: 2, color: "#f59e0b" },
              { icon: <FrownOutlined />, label: "Not Good", value: 1, color: "#ef4444" },
            ].map((m) => (
              <Col key={m.label}>
                <div
                  onClick={() => setMood(m.value)}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 12,
                    border: `2px solid ${mood === m.value ? m.color : "#e5e7eb"}`,
                    background: mood === m.value ? `${m.color}15` : "#fff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{ fontSize: 28, color: m.color }}>{m.icon}</span>
                  <Text style={{ fontSize: 11, color: m.color, fontWeight: 600 }}>{m.label}</Text>
                </div>
              </Col>
            ))}
          </Row>
        </Card>

        <Card title="Rate your skin condition today" style={{ borderRadius: 12 }}>
          <div style={{ textAlign: "center" }}>
            <Rate
              value={skinRating}
              onChange={setSkinRating}
              style={{ fontSize: 36, color: "#6c63ff" }}
            />
            <Text type="secondary" style={{ display: "block", marginTop: 8 }}>
              {skinRating === 0 ? "Tap to rate" :
                skinRating <= 2 ? "Struggling today" :
                skinRating === 3 ? "Average" :
                skinRating === 4 ? "Looking good" : "Skin is great!"}
            </Text>
          </div>

          <div style={{ marginTop: 16 }}>
            <Text strong style={{ marginBottom: 8, display: "block" }}>Any of these today?</Text>
            <Space wrap>
              {SKIN_FACTORS.map((f) => (
                <Tag
                  key={f}
                  style={{ cursor: "pointer", borderRadius: 20, padding: "4px 12px" }}
                >
                  {f}
                </Tag>
              ))}
            </Space>
          </div>
        </Card>

        <Card title="Notes for your doctor (optional)" style={{ borderRadius: 12 }}>
          <TextArea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Describe any reactions, improvements, or questions..."
            style={{ borderRadius: 8 }}
          />
        </Card>

        <Button
          type="primary"
          size="large"
          block
          icon={<SendOutlined />}
          disabled={!mood || skinRating === 0}
          onClick={handleSubmit}
          style={{
            borderRadius: 10,
            height: 48,
            background: "#6c63ff",
            border: "none",
            fontWeight: 600,
          }}
        >
          Submit Daily Check-in
        </Button>
      </Space>
    </div>
  );
};

export default DailyCheckInPage;

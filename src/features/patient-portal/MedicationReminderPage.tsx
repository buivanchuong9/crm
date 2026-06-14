import React, { useState } from "react";
import { Card, Typography, Space, Tag, Switch, Row, Col, Button, Badge, List } from "antd";
import { BellOutlined, CheckOutlined, ClockCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface Medication {
  id: string;
  name: string;
  dose: string;
  time: string[];
  category: string;
  enabled: boolean;
  color: string;
}

const MEDICATIONS: Medication[] = [
  { id: "1", name: "Tretinoin 0.025%", dose: "Pea-size amount", time: ["9:00 PM"], category: "Prescription", enabled: true, color: "#6c63ff" },
  { id: "2", name: "Niacinamide 10% Serum", dose: "3–4 drops", time: ["8:00 AM", "8:00 PM"], category: "Active", enabled: true, color: "#10b981" },
  { id: "3", name: "SPF 50+ Sunscreen", dose: "2 finger lengths", time: ["8:30 AM"], category: "Daily", enabled: true, color: "#f59e0b" },
  { id: "4", name: "CeraVe Moisturizer", dose: "Generous layer", time: ["8:00 AM", "9:30 PM"], category: "Daily", enabled: false, color: "#3b82f6" },
];

const MedicationReminderPage: React.FC = () => {
  const [meds, setMeds] = useState(MEDICATIONS);

  const toggle = (id: string) =>
    setMeds((prev) => prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m)));

  const todayDone = 3;
  const todayTotal = meds.reduce((acc, m) => acc + m.time.length, 0);

  return (
    <div style={{ padding: 24, maxWidth: 700, margin: "0 auto" }}>
      <Title level={3}>Medication Reminders</Title>
      <Text type="secondary" style={{ display: "block", marginBottom: 24 }}>
        Your prescribed skincare routine for today
      </Text>

      {/* Progress */}
      <Card
        style={{
          borderRadius: 12,
          background: "linear-gradient(135deg, #f5f3ff, #ede9fe)",
          border: "none",
          marginBottom: 24,
        }}
      >
        <Row align="middle" justify="space-between">
          <Col>
            <Text style={{ color: "#4c1d95" }} strong>Today's Compliance</Text>
            <div>
              <Text style={{ fontSize: 32, fontWeight: 700, color: "#6c63ff" }}>
                {todayDone}
              </Text>
              <Text style={{ color: "#7c3aed" }}> / {todayTotal} applications</Text>
            </div>
          </Col>
          <Col>
            <Badge
              count={`${Math.round((todayDone / todayTotal) * 100)}%`}
              style={{ background: "#6c63ff", fontSize: 16, padding: "4px 12px", borderRadius: 20, height: "auto" }}
            />
          </Col>
        </Row>
      </Card>

      {/* Medication List */}
      <Space direction="vertical" style={{ width: "100%" }} size={12}>
        {meds.map((med) => (
          <Card key={med.id} style={{ borderRadius: 12, borderLeft: `4px solid ${med.color}` }}>
            <Row align="middle" justify="space-between">
              <Col flex="auto">
                <Space align="start">
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: `${med.color}20`,
                      border: `1.5px solid ${med.color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <BellOutlined style={{ color: med.color }} />
                  </div>
                  <div>
                    <Text strong>{med.name}</Text>
                    <div>
                      <Tag
                        style={{
                          background: `${med.color}15`,
                          border: `1px solid ${med.color}`,
                          color: med.color,
                          borderRadius: 12,
                          fontSize: 11,
                        }}
                      >
                        {med.category}
                      </Tag>
                      <Text type="secondary" style={{ fontSize: 12, marginLeft: 4 }}>
                        {med.dose}
                      </Text>
                    </div>
                    <Space style={{ marginTop: 4 }}>
                      {med.time.map((t) => (
                        <Tag key={t} icon={<ClockCircleOutlined />} style={{ borderRadius: 12, fontSize: 12 }}>
                          {t}
                        </Tag>
                      ))}
                    </Space>
                  </div>
                </Space>
              </Col>
              <Col>
                <Space direction="vertical" align="center">
                  <Switch
                    checked={med.enabled}
                    onChange={() => toggle(med.id)}
                    style={{ background: med.enabled ? med.color : undefined }}
                  />
                  <Text style={{ fontSize: 10, color: "#9ca3af" }}>
                    {med.enabled ? "Active" : "Paused"}
                  </Text>
                </Space>
              </Col>
            </Row>
          </Card>
        ))}
      </Space>

      <Button
        block
        size="large"
        type="primary"
        icon={<CheckOutlined />}
        style={{ marginTop: 24, borderRadius: 10, background: "#10b981", border: "none", fontWeight: 600 }}
      >
        Mark All Today's Applications Done
      </Button>
    </div>
  );
};

export default MedicationReminderPage;

import React, { useState } from "react";
import {
  Card, Row, Col, Button, Typography, Select, Tag, Divider, Steps,
  Avatar, Space, Spin, Alert, List, Radio,
} from "antd";
import {
  RobotOutlined, UserOutlined, SendOutlined, BulbOutlined,
  CalendarOutlined, MessageOutlined, ThunderboltOutlined, CheckOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const PATIENTS = [
  { value: "1", label: "Nguyen Thi Lan", condition: "Acne scarring", lastVisit: "45 days ago", sessions: "6 of 10 completed", adherence: 80 },
  { value: "2", label: "Tran Van Minh", condition: "Anti-aging program", lastVisit: "18 days ago", sessions: "4 of 8 completed", adherence: 95 },
  { value: "3", label: "Le Thi Hoa", condition: "Melasma treatment", lastVisit: "8 days ago", sessions: "3 of 12 completed", adherence: 100 },
];

interface Suggestion {
  type: "action" | "appointment" | "communication";
  priority: "high" | "medium" | "low";
  label: string;
  detail: string;
  channel?: string;
}

const MOCK_SUGGESTIONS: Record<string, Suggestion[]> = {
  "1": [
    { type: "action", priority: "high", label: "Schedule re-examination this week", detail: "Patient has not visited in 45 days — exceeds the 30-day recommended interval for acne scarring treatment.", channel: undefined },
    { type: "appointment", priority: "high", label: "Suggested revisit: within 3 days", detail: "Based on treatment stage (session 6/10) and gap length, an urgent re-examination is recommended.", channel: undefined },
    { type: "communication", priority: "medium", label: "Send Zalo message today", detail: "Patient is most responsive to Zalo (historical data). Suggest a warm, personalized check-in message.", channel: "Zalo" },
    { type: "action", priority: "low", label: "Review home care compliance", detail: "Patient's last self check-in showed 80% medication adherence. Reinforce morning application routine.", channel: undefined },
  ],
  "2": [
    { type: "appointment", priority: "medium", label: "Schedule 3-week check-in", detail: "Patient is on track. Next appointment should be in 12 days to maintain 3-week cadence.", channel: undefined },
    { type: "communication", priority: "low", label: "Send encouragement message", detail: "Patient has 95% adherence — positive reinforcement will help sustain momentum.", channel: "SMS" },
  ],
  "3": [
    { type: "action", priority: "low", label: "Continue current treatment plan", detail: "Patient is fully adherent and progressing well. No immediate intervention required.", channel: undefined },
    { type: "communication", priority: "low", label: "Optional: share progress update", detail: "Consider sharing a before/after summary to motivate continued adherence.", channel: "Email" },
  ],
};

const PRIORITY_COLOR = { high: "#ff4d4f", medium: "#faad14", low: "#52c41a" };
const TYPE_ICON: Record<string, React.ReactNode> = {
  action: <BulbOutlined style={{ color: "#722ed1" }} />,
  appointment: <CalendarOutlined style={{ color: "#1890ff" }} />,
  communication: <MessageOutlined style={{ color: "#13c2c2" }} />,
};

export default function AIFollowupAssistantPage() {
  const [patient, setPatient] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null);
  const [applied, setApplied] = useState<Set<number>>(new Set());

  const selectedPatient = PATIENTS.find((p) => p.value === patient);

  const handleGenerate = () => {
    if (!patient) return;
    setLoading(true);
    setSuggestions(null);
    setTimeout(() => {
      setLoading(false);
      setSuggestions(MOCK_SUGGESTIONS[patient] || []);
      setApplied(new Set());
    }, 2200);
  };

  const applyAction = (i: number) => {
    setApplied((prev) => new Set([...prev, i]));
  };

  return (
    <div style={{ padding: 24, minHeight: "100vh", background: "#f5f5f5" }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>
          <RobotOutlined style={{ marginRight: 10, color: "#722ed1" }} />
          AI Follow-up Assistant
        </Title>
        <Text style={{ fontSize: 16, color: "#666" }}>
          AI-powered suggestions for patient retention and care continuity
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        {/* Input panel */}
        <Col xs={24} lg={9}>
          <Card style={{ borderRadius: 12 }} bodyStyle={{ padding: 24 }}>
            <Title level={4} style={{ fontSize: 18, marginBottom: 20 }}>
              Patient Context
            </Title>

            <div style={{ marginBottom: 20 }}>
              <Text strong style={{ fontSize: 16, display: "block", marginBottom: 8 }}>
                Select Patient
              </Text>
              <Select
                placeholder="Choose a patient..."
                value={patient}
                onChange={(v) => { setPatient(v); setSuggestions(null); }}
                size="large"
                style={{ width: "100%", fontSize: 15 }}
                options={PATIENTS.map((p) => ({
                  value: p.value,
                  label: (
                    <Space>
                      <Avatar size={32} style={{ background: "#722ed1", fontSize: 14 }}>{p.label[0]}</Avatar>
                      <Text style={{ fontSize: 15 }}>{p.label}</Text>
                    </Space>
                  ),
                }))}
              />
            </div>

            {selectedPatient && (
              <div style={{ background: "#f9f0ff", borderRadius: 10, padding: 16, marginBottom: 20 }}>
                <Text strong style={{ fontSize: 16, color: "#722ed1", display: "block", marginBottom: 12 }}>
                  <UserOutlined style={{ marginRight: 6 }} />
                  {selectedPatient.label}
                </Text>
                {[
                  { label: "Condition", value: selectedPatient.condition },
                  { label: "Last Visit", value: selectedPatient.lastVisit },
                  { label: "Sessions", value: selectedPatient.sessions },
                  { label: "Adherence", value: `${selectedPatient.adherence}%` },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <Text style={{ fontSize: 15, color: "#888" }}>{item.label}</Text>
                    <Text strong style={{ fontSize: 15 }}>{item.value}</Text>
                  </div>
                ))}
              </div>
            )}

            <Button
              type="primary"
              size="large"
              block
              icon={<ThunderboltOutlined />}
              disabled={!patient}
              loading={loading}
              onClick={handleGenerate}
              style={{
                fontSize: 16,
                height: 52,
                borderRadius: 10,
                background: "#722ed1",
                borderColor: "#722ed1",
              }}
            >
              Generate Follow-up Plan
            </Button>

            {!patient && (
              <Text type="secondary" style={{ fontSize: 13, display: "block", textAlign: "center", marginTop: 10 }}>
                Select a patient to enable AI suggestions
              </Text>
            )}
          </Card>

          {suggestions && (
            <Alert
              message={
                <Text strong style={{ fontSize: 15 }}>
                  {suggestions.filter((s) => s.priority === "high").length} high-priority action{suggestions.filter((s) => s.priority === "high").length !== 1 ? "s" : ""} recommended
                </Text>
              }
              type={suggestions.some((s) => s.priority === "high") ? "warning" : "success"}
              showIcon
              style={{ borderRadius: 10, marginTop: 16, fontSize: 14 }}
            />
          )}
        </Col>

        {/* Suggestions panel */}
        <Col xs={24} lg={15}>
          <Card
            style={{ borderRadius: 12, minHeight: 400 }}
            title={
              <Text strong style={{ fontSize: 18 }}>
                <BulbOutlined style={{ marginRight: 8, color: "#faad14" }} />
                AI Suggestions
              </Text>
            }
          >
            {loading && (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <Spin size="large" />
                <div style={{ marginTop: 20 }}>
                  <Text style={{ fontSize: 16, color: "#888" }}>Analyzing patient history and generating follow-up plan...</Text>
                </div>
              </div>
            )}

            {!loading && !suggestions && (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#ccc" }}>
                <RobotOutlined style={{ fontSize: 56, marginBottom: 16 }} />
                <Text style={{ fontSize: 16, color: "#aaa", display: "block" }}>
                  Select a patient and click "Generate Follow-up Plan" to get AI-powered suggestions
                </Text>
              </div>
            )}

            {!loading && suggestions && (
              <List
                dataSource={suggestions}
                renderItem={(s, i) => (
                  <List.Item
                    style={{
                      padding: "20px 0",
                      borderBottom: i < suggestions.length - 1 ? "1px solid #f0f0f0" : "none",
                      alignItems: "flex-start",
                    }}
                    actions={[
                      applied.has(i) ? (
                        <Button
                          key="applied"
                          icon={<CheckOutlined />}
                          style={{ fontSize: 14, height: 44, minWidth: 100, borderRadius: 8, color: "#52c41a", borderColor: "#52c41a" }}
                          disabled
                        >
                          Applied
                        </Button>
                      ) : (
                        <Button
                          key="apply"
                          type="primary"
                          size="large"
                          icon={<SendOutlined />}
                          onClick={() => applyAction(i)}
                          style={{ fontSize: 14, height: 44, minWidth: 100, borderRadius: 8 }}
                        >
                          Apply
                        </Button>
                      ),
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 10,
                            background: "#f9f0ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 20,
                          }}
                        >
                          {TYPE_ICON[s.type]}
                        </div>
                      }
                      title={
                        <Space style={{ flexWrap: "wrap" }}>
                          <Text strong style={{ fontSize: 16 }}>{s.label}</Text>
                          <Tag
                            color={PRIORITY_COLOR[s.priority]}
                            style={{ fontSize: 13, padding: "2px 10px", borderRadius: 20, border: "none" }}
                          >
                            {s.priority.toUpperCase()}
                          </Tag>
                          {s.channel && (
                            <Tag
                              color="blue"
                              style={{ fontSize: 13, padding: "2px 10px", borderRadius: 20 }}
                            >
                              via {s.channel}
                            </Tag>
                          )}
                        </Space>
                      }
                      description={
                        <Text style={{ fontSize: 15, color: "#555", lineHeight: 1.6 }}>{s.detail}</Text>
                      }
                    />
                  </List.Item>
                )}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

import React, { useState } from "react";
import {
  Card, Row, Col, Statistic, Progress, Typography, Tag, Button, Steps,
  Select, Avatar, Space, Upload, Divider, Timeline, Rate,
} from "antd";
import {
  CameraOutlined, LineChartOutlined, CheckCircleOutlined,
  HeartOutlined, UploadOutlined, TrophyOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const PATIENTS = [
  { value: "1", label: "Nguyen Thi Lan — Acne scarring" },
  { value: "2", label: "Tran Van Minh — Anti-aging program" },
  { value: "3", label: "Le Thi Hoa — Melasma treatment" },
];

const SESSIONS = [
  { session: 1, date: "01/03/2026", improvement: 10, adherence: 100, photos: 2 },
  { session: 2, date: "15/03/2026", improvement: 22, adherence: 100, photos: 2 },
  { session: 3, date: "01/04/2026", improvement: 38, adherence: 90, photos: 2 },
  { session: 4, date: "15/04/2026", improvement: 51, adherence: 100, photos: 3 },
  { session: 5, date: "01/05/2026", improvement: 63, adherence: 80, photos: 2 },
  { session: 6, date: "15/05/2026", improvement: 74, adherence: 90, photos: 2 },
];

const CHECKIN_ITEMS = [
  { label: "How is your skin today?", type: "rate" },
  { label: "Any redness or irritation?", value: "Mild redness on cheeks — subsiding" },
  { label: "Medication applied?", value: "Yes — morning and evening" },
  { label: "Sun protection used?", value: "SPF 50 applied" },
  { label: "Notes", value: "Feeling good, texture improving" },
];

const PHOTO_SESSIONS = [
  { date: "01/03/2026", label: "Session 1 — Before", color: "#f0f0f0" },
  { date: "15/04/2026", label: "Session 4 — Mid", color: "#e6f7ff" },
  { date: "15/05/2026", label: "Session 6 — Latest", color: "#f6ffed" },
];

export default function HealthMonitoringPage() {
  const [patient, setPatient] = useState("1");
  const latest = SESSIONS[SESSIONS.length - 1];

  return (
    <div style={{ padding: 24, minHeight: "100vh", background: "#f5f5f5" }}>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <Title level={2} style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>
            <HeartOutlined style={{ marginRight: 10, color: "#eb2f96" }} />
            Health Monitoring
          </Title>
          <Text style={{ fontSize: 16, color: "#666" }}>
            Patient treatment progress and self check-in
          </Text>
        </div>
        <Select
          value={patient}
          onChange={setPatient}
          options={PATIENTS}
          size="large"
          style={{ width: 300, fontSize: 15 }}
        />
      </div>

      {/* Key metrics */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {[
          { label: "Improvement", value: latest.improvement, suffix: "%", color: "#52c41a", icon: <TrophyOutlined /> },
          { label: "Treatment Adherence", value: latest.adherence, suffix: "%", color: "#1890ff", icon: <CheckCircleOutlined /> },
          { label: "Sessions Completed", value: SESSIONS.length, suffix: "/10", color: "#722ed1", icon: <LineChartOutlined /> },
          { label: "Follow-up Rate", value: 85, suffix: "%", color: "#13c2c2", icon: <HeartOutlined /> },
        ].map((s) => (
          <Col xs={12} lg={6} key={s.label}>
            <Card style={{ borderRadius: 12, borderTop: `3px solid ${s.color}` }} bodyStyle={{ padding: "16px 20px" }}>
              <Statistic
                title={<Text style={{ fontSize: 15, color: "#666" }}>{s.label}</Text>}
                value={s.value}
                suffix={<Text style={{ fontSize: 20, color: s.color }}>{s.suffix}</Text>}
                valueStyle={{ fontSize: 28, fontWeight: 700, color: s.color }}
                prefix={React.cloneElement(s.icon as React.ReactElement, { style: { color: s.color } })}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        {/* Treatment timeline */}
        <Col xs={24} lg={14}>
          <Card
            title={<Text strong style={{ fontSize: 18 }}><LineChartOutlined style={{ marginRight: 8, color: "#1890ff" }} />Treatment Progress Timeline</Text>}
            style={{ borderRadius: 12, marginBottom: 16 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {SESSIONS.map((s) => (
                <div key={s.session} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Avatar size={36} style={{ background: "#1890ff", fontSize: 14, flexShrink: 0 }}>S{s.session}</Avatar>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <Text style={{ fontSize: 14 }}>{s.date}</Text>
                      <Text strong style={{ fontSize: 14, color: "#52c41a" }}>+{s.improvement}% improved</Text>
                    </div>
                    <Progress
                      percent={s.improvement}
                      strokeColor={{ "0%": "#1890ff", "100%": "#52c41a" }}
                      trailColor="#f0f0f0"
                      strokeWidth={10}
                      showInfo={false}
                    />
                  </div>
                  <Tag color={s.adherence === 100 ? "green" : s.adherence >= 90 ? "blue" : "orange"} style={{ fontSize: 13, borderRadius: 20 }}>
                    {s.adherence}%
                  </Tag>
                </div>
              ))}
            </div>
          </Card>

          {/* Progress photos */}
          <Card
            title={<Text strong style={{ fontSize: 18 }}><CameraOutlined style={{ marginRight: 8, color: "#722ed1" }} />Progress Photos</Text>}
            style={{ borderRadius: 12 }}
            extra={
              <Upload showUploadList={false}>
                <Button icon={<UploadOutlined />} size="large" style={{ fontSize: 14, borderRadius: 8 }}>
                  Upload Photo
                </Button>
              </Upload>
            }
          >
            <Row gutter={[12, 12]}>
              {PHOTO_SESSIONS.map((p) => (
                <Col xs={24} sm={8} key={p.date}>
                  <div
                    style={{
                      background: p.color,
                      borderRadius: 10,
                      height: 160,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px dashed #d9d9d9",
                      cursor: "pointer",
                    }}
                  >
                    <CameraOutlined style={{ fontSize: 32, color: "#aaa", marginBottom: 8 }} />
                    <Text style={{ fontSize: 13, color: "#888", textAlign: "center", padding: "0 8px" }}>{p.label}</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>{p.date}</Text>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        {/* Self check-in */}
        <Col xs={24} lg={10}>
          <Card
            title={<Text strong style={{ fontSize: 18 }}><CheckCircleOutlined style={{ marginRight: 8, color: "#52c41a" }} />Latest Self Check-in</Text>}
            style={{ borderRadius: 12, marginBottom: 16 }}
            extra={<Tag color="green" style={{ fontSize: 13 }}>Today 08:30</Tag>}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {CHECKIN_ITEMS.map((item, i) => (
                <div key={i}>
                  <Text style={{ fontSize: 15, color: "#666", display: "block", marginBottom: 6 }}>{item.label}</Text>
                  {item.type === "rate" ? (
                    <Rate defaultValue={4} style={{ fontSize: 24, color: "#faad14" }} />
                  ) : (
                    <div style={{ background: "#f8f8f8", padding: "10px 14px", borderRadius: 8 }}>
                      <Text style={{ fontSize: 15 }}>{item.value}</Text>
                    </div>
                  )}
                  {i < CHECKIN_ITEMS.length - 1 && <Divider style={{ margin: "12px 0" }} />}
                </div>
              ))}
            </div>
          </Card>

          <Card
            title={<Text strong style={{ fontSize: 18 }}>Check-in History</Text>}
            style={{ borderRadius: 12 }}
          >
            <Timeline
              items={[
                { color: "green", children: <div><Text strong style={{ fontSize: 14 }}>Today 08:30</Text><br /><Text style={{ fontSize: 14 }}>Skin rating: 4/5 — feeling good</Text></div> },
                { color: "blue", children: <div><Text strong style={{ fontSize: 14 }}>Yesterday 20:15</Text><br /><Text style={{ fontSize: 14 }}>Mild irritation after product application</Text></div> },
                { color: "blue", children: <div><Text strong style={{ fontSize: 14 }}>12/06 09:00</Text><br /><Text style={{ fontSize: 14 }}>Skin rating: 3/5 — redness subsiding</Text></div> },
                { color: "gray", children: <div><Text strong style={{ fontSize: 14 }}>11/06</Text><br /><Text style={{ fontSize: 14, color: "#aaa" }}>No check-in</Text></div> },
                { color: "blue", children: <div><Text strong style={{ fontSize: 14 }}>10/06 21:00</Text><br /><Text style={{ fontSize: 14 }}>Skin rating: 4/5 — good progress</Text></div> },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

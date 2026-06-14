import React, { useState } from "react";
import {
  Card, Table, Tag, Button, Typography, Row, Col, Statistic, Space, Avatar,
  Badge, Steps, Timeline, Divider, Modal, List,
} from "antd";
import {
  ExperimentOutlined, BellOutlined, CheckCircleOutlined,
  ClockCircleOutlined, EyeOutlined, SendOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

type LabStatus = "pending" | "notified" | "viewed" | "confirmed";

interface LabResult {
  id: number;
  patient: string;
  age: number;
  test: string;
  result: string;
  severity: "normal" | "attention" | "urgent";
  uploadedAt: string;
  status: LabStatus;
  notifiedAt?: string;
  viewedAt?: string;
}

const SEVERITY_COLOR: Record<string, string> = {
  normal: "#52c41a",
  attention: "#faad14",
  urgent: "#ff4d4f",
};

const STATUS_STEP: Record<LabStatus, number> = {
  pending: 0,
  notified: 1,
  viewed: 2,
  confirmed: 3,
};

const LAB_RESULTS: LabResult[] = [
  { id: 1, patient: "Nguyen Thi Lan", age: 42, test: "Skin sensitivity panel", result: "Elevated IgE — avoid fragrances", severity: "attention", uploadedAt: "Today 09:15", status: "pending" },
  { id: 2, patient: "Tran Van Minh", age: 55, test: "Melanin index assessment", result: "Melanin index 68 — within normal", severity: "normal", uploadedAt: "Today 08:30", status: "notified", notifiedAt: "09:00" },
  { id: 3, patient: "Le Thi Hoa", age: 31, test: "Patch test results", result: "Positive reaction to nickel sulfate", severity: "urgent", uploadedAt: "Yesterday 16:00", status: "viewed", notifiedAt: "16:30", viewedAt: "18:45" },
  { id: 4, patient: "Pham Duc Thanh", age: 48, test: "Blood glucose (pre-laser)", result: "Fasting glucose 98 mg/dL — normal", severity: "normal", uploadedAt: "Yesterday 14:00", status: "confirmed", notifiedAt: "14:30", viewedAt: "19:00" },
  { id: 5, patient: "Hoang Thi Mai", age: 39, test: "Hormonal profile", result: "Elevated DHEA-S — consult endocrinology", severity: "attention", uploadedAt: "13/06 11:00", status: "pending" },
];

export default function LabNotificationPage() {
  const [detail, setDetail] = useState<LabResult | null>(null);

  const pending = LAB_RESULTS.filter((r) => r.status === "pending");
  const unread = LAB_RESULTS.filter((r) => r.status === "notified");

  const columns = [
    {
      title: <Text strong style={{ fontSize: 15 }}>Patient</Text>,
      key: "patient",
      render: (r: LabResult) => (
        <Space>
          <Avatar size={44} style={{ background: SEVERITY_COLOR[r.severity], fontSize: 18 }}>{r.patient[0]}</Avatar>
          <div>
            <Text strong style={{ fontSize: 15 }}>{r.patient}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 13 }}>{r.age} years</Text>
          </div>
        </Space>
      ),
    },
    {
      title: <Text strong style={{ fontSize: 15 }}>Test</Text>,
      dataIndex: "test",
      render: (v: string) => <Text style={{ fontSize: 15 }}>{v}</Text>,
    },
    {
      title: <Text strong style={{ fontSize: 15 }}>Severity</Text>,
      dataIndex: "severity",
      render: (v: string) => (
        <Tag
          color={SEVERITY_COLOR[v]}
          style={{ fontSize: 14, padding: "4px 12px", borderRadius: 20, textTransform: "capitalize" }}
        >
          {v === "normal" ? "Normal" : v === "attention" ? "Needs Attention" : "Urgent"}
        </Tag>
      ),
    },
    {
      title: <Text strong style={{ fontSize: 15 }}>Uploaded</Text>,
      dataIndex: "uploadedAt",
      render: (v: string) => <Text style={{ fontSize: 15 }}>{v}</Text>,
    },
    {
      title: <Text strong style={{ fontSize: 15 }}>Notification Status</Text>,
      key: "status",
      render: (r: LabResult) => (
        <Steps
          size="small"
          current={STATUS_STEP[r.status]}
          style={{ minWidth: 280 }}
          items={[
            { title: <Text style={{ fontSize: 12 }}>Uploaded</Text>, icon: <ExperimentOutlined /> },
            { title: <Text style={{ fontSize: 12 }}>Notified</Text>, icon: <SendOutlined /> },
            { title: <Text style={{ fontSize: 12 }}>Viewed</Text>, icon: <EyeOutlined /> },
            { title: <Text style={{ fontSize: 12 }}>Confirmed</Text>, icon: <CheckCircleOutlined /> },
          ]}
        />
      ),
    },
    {
      title: "",
      key: "action",
      render: (r: LabResult) => (
        <Space>
          <Button
            size="large"
            icon={<EyeOutlined />}
            style={{ fontSize: 14, borderRadius: 8 }}
            onClick={() => setDetail(r)}
          >
            View
          </Button>
          {(r.status === "pending") && (
            <Button
              type="primary"
              size="large"
              icon={<SendOutlined />}
              style={{ fontSize: 14, borderRadius: 8 }}
            >
              Notify Patient
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, minHeight: "100vh", background: "#f5f5f5" }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>
          <ExperimentOutlined style={{ marginRight: 10, color: "#13c2c2" }} />
          Lab Result Notifications
        </Title>
        <Text style={{ fontSize: 16, color: "#666" }}>
          Fast delivery of lab results to patients
        </Text>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {[
          { label: "Pending Notification", value: pending.length, color: "#faad14", icon: <ClockCircleOutlined /> },
          { label: "Awaiting Patient View", value: unread.length, color: "#1890ff", icon: <BellOutlined /> },
          { label: "Urgent Results", value: LAB_RESULTS.filter((r) => r.severity === "urgent").length, color: "#ff4d4f", icon: <ExperimentOutlined /> },
          { label: "Confirmed Today", value: LAB_RESULTS.filter((r) => r.status === "confirmed").length, color: "#52c41a", icon: <CheckCircleOutlined /> },
        ].map((s) => (
          <Col xs={12} lg={6} key={s.label}>
            <Card style={{ borderRadius: 12, borderTop: `3px solid ${s.color}` }} bodyStyle={{ padding: "16px 20px" }}>
              <Statistic
                title={<Text style={{ fontSize: 15, color: "#666" }}>{s.label}</Text>}
                value={s.value}
                valueStyle={{ fontSize: 28, fontWeight: 700, color: s.color }}
                prefix={React.cloneElement(s.icon as React.ReactElement, { style: { color: s.color } })}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Card style={{ borderRadius: 12 }}>
        <Table
          dataSource={LAB_RESULTS}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1200 }}
        />
      </Card>

      <Modal
        open={!!detail}
        title={
          <Text strong style={{ fontSize: 18 }}>
            Lab Result — {detail?.patient}
          </Text>
        }
        onCancel={() => setDetail(null)}
        footer={[
          <Button key="close" size="large" style={{ fontSize: 15 }} onClick={() => setDetail(null)}>Close</Button>,
          detail?.status === "pending" && (
            <Button key="notify" type="primary" size="large" icon={<SendOutlined />} style={{ fontSize: 15 }} onClick={() => setDetail(null)}>
              Notify Patient
            </Button>
          ),
        ]}
        width={560}
      >
        {detail && (
          <div>
            <Tag
              color={SEVERITY_COLOR[detail.severity]}
              style={{ fontSize: 15, padding: "6px 16px", borderRadius: 20, marginBottom: 16 }}
            >
              {detail.severity === "normal" ? "Normal" : detail.severity === "attention" ? "Needs Attention" : "⚠ Urgent"}
            </Tag>
            <div style={{ background: "#fafafa", borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <Text strong style={{ fontSize: 15 }}>Test: </Text>
              <Text style={{ fontSize: 15 }}>{detail.test}</Text>
              <Divider style={{ margin: "12px 0" }} />
              <Text strong style={{ fontSize: 15 }}>Result: </Text>
              <Text style={{ fontSize: 15 }}>{detail.result}</Text>
            </div>
            <Timeline
              items={[
                { color: "blue", children: <Text style={{ fontSize: 14 }}>Result uploaded — {detail.uploadedAt}</Text> },
                detail.notifiedAt ? { color: "green", children: <Text style={{ fontSize: 14 }}>Patient notified — {detail.notifiedAt}</Text> } : { color: "gray", children: <Text style={{ fontSize: 14, color: "#aaa" }}>Not yet notified</Text> },
                detail.viewedAt ? { color: "green", children: <Text style={{ fontSize: 14 }}>Patient viewed — {detail.viewedAt}</Text> } : { color: "gray", children: <Text style={{ fontSize: 14, color: "#aaa" }}>Not yet viewed</Text> },
              ]}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}

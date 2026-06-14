import React, { useState } from "react";
import {
  Card, Table, Tag, Button, Tabs, Badge, Space, Avatar, Typography,
  Select, DatePicker, Row, Col, Statistic, Modal, Form, Input, Radio,
} from "antd";
import {
  BellOutlined, MessageOutlined, MailOutlined, CheckCircleOutlined,
  ClockCircleOutlined, SendOutlined, PhoneOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

type ReminderChannel = "sms" | "zalo" | "email";
type ReminderStatus = "pending" | "sent" | "confirmed" | "missed";

interface Reminder {
  id: number;
  patient: string;
  phone: string;
  type: string;
  date: string;
  channel: ReminderChannel;
  status: ReminderStatus;
  sentAt?: string;
}

const STATUS_COLOR: Record<ReminderStatus, string> = {
  pending: "orange",
  sent: "blue",
  confirmed: "green",
  missed: "red",
};

const CHANNEL_ICON: Record<ReminderChannel, React.ReactNode> = {
  sms: <PhoneOutlined />,
  zalo: <MessageOutlined style={{ color: "#0068ff" }} />,
  email: <MailOutlined style={{ color: "#722ed1" }} />,
};

const UPCOMING: Reminder[] = [
  { id: 1, patient: "Nguyen Thi Lan", phone: "0901 234 567", type: "Post-treatment check", date: "Today 14:00", channel: "zalo", status: "pending" },
  { id: 2, patient: "Tran Van Minh", phone: "0912 345 678", type: "2-week follow-up", date: "Today 15:30", channel: "sms", status: "sent", sentAt: "09:00" },
  { id: 3, patient: "Le Thi Hoa", phone: "0923 456 789", type: "Laser session reminder", date: "Tomorrow 09:00", channel: "zalo", status: "confirmed" },
  { id: 4, patient: "Pham Duc Thanh", phone: "0934 567 890", type: "Monthly skin check", date: "Tomorrow 10:30", channel: "email", status: "pending" },
  { id: 5, patient: "Hoang Thi Mai", phone: "0945 678 901", type: "Medication refill", date: "14/06 08:00", channel: "sms", status: "pending" },
];

const MISSED: Reminder[] = [
  { id: 6, patient: "Vo Thi Thu", phone: "0956 789 012", type: "Follow-up appointment", date: "Yesterday 14:00", channel: "zalo", status: "missed" },
  { id: 7, patient: "Dang Van Long", phone: "0967 890 123", type: "Lab result review", date: "12/06 10:00", channel: "sms", status: "missed" },
];

const HISTORY: Reminder[] = [
  ...UPCOMING.filter((r) => r.status === "sent" || r.status === "confirmed"),
  ...MISSED,
];

const columns = (onResend: (r: Reminder) => void) => [
  {
    title: <Text strong style={{ fontSize: 15 }}>Patient</Text>,
    key: "patient",
    render: (r: Reminder) => (
      <Space>
        <Avatar size={40} style={{ background: "#1890ff", fontSize: 16 }}>{r.patient[0]}</Avatar>
        <div>
          <Text strong style={{ fontSize: 15 }}>{r.patient}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 13 }}>{r.phone}</Text>
        </div>
      </Space>
    ),
  },
  {
    title: <Text strong style={{ fontSize: 15 }}>Reminder Type</Text>,
    dataIndex: "type",
    render: (v: string) => <Text style={{ fontSize: 15 }}>{v}</Text>,
  },
  {
    title: <Text strong style={{ fontSize: 15 }}>Scheduled</Text>,
    dataIndex: "date",
    render: (v: string) => <Text style={{ fontSize: 15 }}>{v}</Text>,
  },
  {
    title: <Text strong style={{ fontSize: 15 }}>Channel</Text>,
    dataIndex: "channel",
    render: (v: ReminderChannel) => (
      <Tag icon={CHANNEL_ICON[v]} style={{ fontSize: 14, padding: "4px 12px", borderRadius: 20 }}>
        {v.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: <Text strong style={{ fontSize: 15 }}>Status</Text>,
    dataIndex: "status",
    render: (v: ReminderStatus) => (
      <Tag color={STATUS_COLOR[v]} style={{ fontSize: 14, padding: "4px 12px", borderRadius: 20 }}>
        {v.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: "",
    key: "action",
    render: (r: Reminder) =>
      r.status === "pending" || r.status === "missed" ? (
        <Button
          type="primary"
          icon={<SendOutlined />}
          style={{ fontSize: 14, height: 40, borderRadius: 8 }}
          onClick={() => onResend(r)}
        >
          Send Now
        </Button>
      ) : (
        <Button
          icon={<CheckCircleOutlined />}
          disabled
          style={{ fontSize: 14, height: 40, borderRadius: 8, color: "#52c41a", borderColor: "#52c41a" }}
        >
          {r.status === "confirmed" ? "Confirmed" : "Sent"}
        </Button>
      ),
  },
];

export default function ReminderCenterPage() {
  const [sendModal, setSendModal] = useState<Reminder | null>(null);
  const [form] = Form.useForm();

  const handleResend = (r: Reminder) => {
    setSendModal(r);
    form.setFieldsValue({ channel: r.channel, message: `Dear ${r.patient}, this is a reminder for your ${r.type}. Please confirm your appointment.` });
  };

  return (
    <div style={{ padding: 24, minHeight: "100vh", background: "#f5f5f5" }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>
          Reminder Center
        </Title>
        <Text style={{ fontSize: 16, color: "#666" }}>
          Manage appointment reminders via SMS, Zalo, and Email
        </Text>
      </div>

      {/* Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {[
          { label: "Upcoming Today", value: UPCOMING.filter((r) => r.date.startsWith("Today")).length, color: "#1890ff" },
          { label: "Sent", value: UPCOMING.filter((r) => r.status === "sent").length, color: "#52c41a" },
          { label: "Confirmed", value: UPCOMING.filter((r) => r.status === "confirmed").length, color: "#13c2c2" },
          { label: "Missed", value: MISSED.length, color: "#ff4d4f" },
        ].map((s) => (
          <Col xs={12} lg={6} key={s.label}>
            <Card style={{ borderRadius: 12, borderTop: `3px solid ${s.color}` }} bodyStyle={{ padding: "16px 20px" }}>
              <Statistic
                title={<Text style={{ fontSize: 15, color: "#666" }}>{s.label}</Text>}
                value={s.value}
                valueStyle={{ fontSize: 28, fontWeight: 700, color: s.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Card style={{ borderRadius: 12 }}>
        <Tabs
          defaultActiveKey="upcoming"
          size="large"
          items={[
            {
              key: "upcoming",
              label: (
                <span style={{ fontSize: 16 }}>
                  <ClockCircleOutlined /> Upcoming
                  <Badge count={UPCOMING.filter((r) => r.status === "pending").length} style={{ marginLeft: 8 }} />
                </span>
              ),
              children: (
                <Table
                  dataSource={UPCOMING}
                  columns={columns(handleResend)}
                  rowKey="id"
                  pagination={false}
                  style={{ fontSize: 15 }}
                />
              ),
            },
            {
              key: "missed",
              label: (
                <span style={{ fontSize: 16 }}>
                  <BellOutlined style={{ color: "#ff4d4f" }} /> Missed
                  <Badge count={MISSED.length} style={{ marginLeft: 8, background: "#ff4d4f" }} />
                </span>
              ),
              children: (
                <Table
                  dataSource={MISSED}
                  columns={columns(handleResend)}
                  rowKey="id"
                  pagination={false}
                />
              ),
            },
            {
              key: "history",
              label: <span style={{ fontSize: 16 }}>Reminder History</span>,
              children: (
                <Table
                  dataSource={HISTORY}
                  columns={columns(handleResend)}
                  rowKey="id"
                  pagination={{ pageSize: 10 }}
                />
              ),
            },
          ]}
        />
      </Card>

      <Modal
        open={!!sendModal}
        title={<Text strong style={{ fontSize: 18 }}>Send Reminder — {sendModal?.patient}</Text>}
        onCancel={() => setSendModal(null)}
        footer={[
          <Button key="cancel" size="large" style={{ fontSize: 15 }} onClick={() => setSendModal(null)}>Cancel</Button>,
          <Button key="send" type="primary" size="large" icon={<SendOutlined />} style={{ fontSize: 15 }}
            onClick={() => { setSendModal(null); }}>
            Send Reminder
          </Button>,
        ]}
        width={520}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item label={<Text strong style={{ fontSize: 15 }}>Channel</Text>} name="channel">
            <Radio.Group size="large" style={{ width: "100%" }}>
              <Radio.Button value="sms" style={{ fontSize: 15, height: 44, lineHeight: "42px", width: "33.3%" }}>
                <PhoneOutlined /> SMS
              </Radio.Button>
              <Radio.Button value="zalo" style={{ fontSize: 15, height: 44, lineHeight: "42px", width: "33.3%" }}>
                <MessageOutlined /> Zalo
              </Radio.Button>
              <Radio.Button value="email" style={{ fontSize: 15, height: 44, lineHeight: "42px", width: "33.3%" }}>
                <MailOutlined /> Email
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label={<Text strong style={{ fontSize: 15 }}>Message</Text>} name="message">
            <Input.TextArea rows={4} style={{ fontSize: 15 }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

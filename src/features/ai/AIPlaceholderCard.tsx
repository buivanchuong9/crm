import React from "react";
import { Card, Tag, Typography } from "antd";
import { ExperimentOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface AIPlaceholderCardProps {
  title: string;
  description: string;
  eta?: string;
  tags?: string[];
}

const AIPlaceholderCard: React.FC<AIPlaceholderCardProps> = ({
  title,
  description,
  eta = "Q3 2026",
  tags = [],
}) => (
  <Card
    style={{
      borderRadius: 16,
      border: "1.5px dashed #6c63ff",
      background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
      textAlign: "center",
      padding: "32px 24px",
    }}
  >
    <div
      style={{
        width: 72,
        height: 72,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 20px",
        boxShadow: "0 8px 24px rgba(108,99,255,0.3)",
      }}
    >
      <ExperimentOutlined style={{ fontSize: 32, color: "#fff" }} />
    </div>

    <Title level={4} style={{ color: "#4c1d95", marginBottom: 8 }}>
      {title}
    </Title>

    <Text type="secondary" style={{ display: "block", marginBottom: 16, lineHeight: 1.6 }}>
      {description}
    </Text>

    <div style={{ marginBottom: 16 }}>
      {tags.map((tag) => (
        <Tag
          key={tag}
          style={{
            background: "#ede9fe",
            border: "1px solid #c4b5fd",
            color: "#6c63ff",
            borderRadius: 20,
            padding: "2px 12px",
            margin: "2px 4px",
          }}
        >
          {tag}
        </Tag>
      ))}
    </div>

    <Tag
      style={{
        background: "#6c63ff",
        color: "#fff",
        border: "none",
        borderRadius: 20,
        padding: "4px 16px",
        fontSize: 13,
      }}
    >
      Coming {eta}
    </Tag>
  </Card>
);

export default AIPlaceholderCard;

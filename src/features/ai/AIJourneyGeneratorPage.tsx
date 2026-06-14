import React, { useState } from "react";
import {
  Row, Col, Card, Button, Typography, Space, Tag, Select, Slider,
  Steps, Divider, Alert, Spin, Statistic, Radio, Tooltip, Badge,
} from "antd";
import {
  ExperimentOutlined, ThunderboltOutlined, CheckCircleOutlined,
  ClockCircleOutlined, StarOutlined, CopyOutlined, SaveOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

// ── Mock Data ─────────────────────────────────────────────────────────────────

const SKIN_CONDITIONS = [
  "Acne Vulgaris",
  "Melasma / Hyperpigmentation",
  "Rosacea",
  "Seborrheic Dermatitis",
  "Eczema / Atopic Dermatitis",
  "Anti-aging / Photoaging",
  "Acne Scars",
  "Enlarged Pores",
  "Dry / Dehydrated Skin",
  "Oily / Combination Skin",
];

const TREATMENT_GOALS = [
  "Clear active breakouts",
  "Even skin tone",
  "Reduce fine lines & wrinkles",
  "Minimize pore appearance",
  "Improve skin hydration",
  "Fade scars & dark spots",
  "Brighten dull complexion",
  "Strengthen skin barrier",
];

interface JourneyStep {
  order: number;
  name: string;
  type: string;
  duration: string;
  frequency: string;
  description: string;
  products?: string[];
  tag: string;
  tagColor: string;
}

const generateMockJourney = (
  conditions: string[],
  goals: string[],
  budget: string,
  sessionCount: number
): JourneyStep[] => {
  const steps: JourneyStep[] = [
    {
      order: 1,
      name: "Initial Consultation & Skin Analysis",
      type: "Consultation",
      duration: "60 min",
      frequency: "Week 1",
      description:
        "Comprehensive skin assessment using dermatoscopy and AI imaging. Document baseline skin condition, discuss treatment goals, and establish patient profile.",
      tag: "Required",
      tagColor: "#6c63ff",
    },
    {
      order: 2,
      name: "Gentle Cleansing Protocol",
      type: "Home Care",
      duration: "Daily",
      frequency: "Weeks 1–2",
      description:
        "Introduce pH-balanced cleanser and toner. Eliminate harsh ingredients from current routine. Monitor skin reaction and adjust if irritation occurs.",
      products: ["CeraVe Foaming Cleanser", "Paula's Choice BHA Toner"],
      tag: "Home Care",
      tagColor: "#10b981",
    },
    {
      order: 3,
      name: "Chemical Exfoliation (AHA/BHA)",
      type: "Treatment",
      duration: "30 min",
      frequency: "2x / Week",
      description:
        "Professional exfoliation with 30% Glycolic Acid peel or 2% Salicylic acid treatment. Targets clogged pores, dead skin buildup, and surface pigmentation.",
      tag: "In-Clinic",
      tagColor: "#f59e0b",
    },
    {
      order: 4,
      name: "Active Ingredient Introduction",
      type: "Home Care",
      duration: "Daily",
      frequency: "Weeks 3–6",
      description:
        "Introduce retinol 0.025% (alternate nights) and niacinamide 10% serum. Build skin tolerance gradually before increasing concentration.",
      products: ["The Ordinary Retinol 0.025%", "Niacinamide 10% + Zinc 1%"],
      tag: "Home Care",
      tagColor: "#10b981",
    },
    {
      order: 5,
      name: "Hydration Boost Treatment",
      type: "Treatment",
      duration: "45 min",
      frequency: "Every 3 Weeks",
      description:
        "Hyaluronic acid mesotherapy or sheet mask infusion treatment. Restores moisture barrier, plumps skin, and prepares for subsequent active treatments.",
      tag: "In-Clinic",
      tagColor: "#f59e0b",
    },
    {
      order: 6,
      name: "Progress Assessment",
      type: "Monitoring",
      duration: "30 min",
      frequency: "Week 6",
      description:
        "AI-powered comparison of before/after images. Measure improvement in target metrics. Adjust treatment plan based on response and patient feedback.",
      tag: "Milestone",
      tagColor: "#6c63ff",
    },
    {
      order: 7,
      name: "Intensive Brightening Phase",
      type: "Treatment",
      duration: "60 min",
      frequency: "Weekly × 4",
      description:
        "Vitamin C 20% + kojic acid depigmentation treatment combined with LED light therapy. Targets stubborn hyperpigmentation and boosts collagen synthesis.",
      tag: "In-Clinic",
      tagColor: "#f59e0b",
    },
    {
      order: 8,
      name: "Maintenance Protocol Design",
      type: "Planning",
      duration: "30 min",
      frequency: "Week 12",
      description:
        "Design long-term home care routine for maintaining treatment results. Prescribe monthly in-clinic maintenance sessions and set up automated follow-up reminders.",
      tag: "Planning",
      tagColor: "#3b82f6",
    },
    {
      order: 9,
      name: "Final Review & Documentation",
      type: "Consultation",
      duration: "45 min",
      frequency: "Week 14",
      description:
        "Comprehensive before/after documentation. Patient satisfaction survey. Issue treatment completion certificate and schedule first maintenance appointment.",
      tag: "Milestone",
      tagColor: "#6c63ff",
    },
  ].slice(0, Math.min(sessionCount, 9));

  return steps;
};

// ── Component ─────────────────────────────────────────────────────────────────

const AIJourneyGeneratorPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  // Form state
  const [conditions, setConditions] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("standard");
  const [sessions, setSessions] = useState<number>(8);

  // Result state
  const [journeySteps, setJourneySteps] = useState<JourneyStep[]>([]);
  const [journeyName, setJourneyName] = useState("");
  const [confidence, setConfidence] = useState(0);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      const steps = generateMockJourney(conditions, goals, budget, sessions);
      const name =
        conditions.length > 0
          ? `${conditions[0]} Treatment Journey — ${budget.charAt(0).toUpperCase() + budget.slice(1)} Plan`
          : "Personalized Dermatology Journey";
      setJourneySteps(steps);
      setJourneyName(name);
      setConfidence(72 + Math.floor(Math.random() * 20));
      setGenerating(false);
      setGenerated(true);
      setStep(1);
    }, 2500);
  };

  const canGenerate = conditions.length > 0 && goals.length > 0;

  const budgetLabels: Record<string, { label: string; desc: string; color: string }> = {
    basic: { label: "Essential", desc: "Core treatments, home care focus", color: "#10b981" },
    standard: { label: "Standard", desc: "Balanced in-clinic + home care", color: "#6c63ff" },
    premium: { label: "Premium", desc: "Advanced tech, maximum results", color: "#f59e0b" },
  };

  return (
    <div style={{ padding: "24px", maxWidth: 1100, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <Space align="center">
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(108,99,255,0.35)",
            }}
          >
            <ThunderboltOutlined style={{ fontSize: 26, color: "#fff" }} />
          </div>
          <div>
            <Title level={3} style={{ margin: 0, color: "#1a1a2e" }}>
              AI Treatment Journey Generator
            </Title>
            <Text type="secondary">
              Generate a personalized, step-by-step treatment plan using AI in seconds
            </Text>
          </div>
        </Space>
      </div>

      <Alert
        message="AI Placeholder — Preview Mode"
        description="This tool will use clinical AI to generate evidence-based treatment journeys. Currently using mock generation for UI demonstration."
        type="info"
        showIcon
        style={{ marginBottom: 24, borderRadius: 12 }}
        closable
      />

      {/* Progress Steps */}
      <Steps
        current={step}
        style={{ marginBottom: 32, padding: "0 24px" }}
        items={[
          { title: "Patient Condition", description: "Define skin conditions & goals" },
          { title: "AI Generation", description: "Review generated journey" },
          { title: "Customize & Save", description: "Edit and activate" },
        ]}
      />

      {/* ── STEP 0: Input ─────────────────────────────────────────────────────── */}
      {step === 0 && (
        <Row gutter={[24, 24]}>
          {/* Conditions */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <Space>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "#6c63ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    1
                  </div>
                  <span>Patient Skin Conditions</span>
                </Space>
              }
              style={{ borderRadius: 12, height: "100%" }}
            >
              <Text type="secondary" style={{ display: "block", marginBottom: 12 }}>
                Select all applicable diagnoses or skin concerns
              </Text>
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Search conditions..."
                value={conditions}
                onChange={setConditions}
                options={SKIN_CONDITIONS.map((c) => ({ value: c, label: c }))}
                size="large"
              />
              <div style={{ marginTop: 12 }}>
                {conditions.map((c) => (
                  <Tag
                    key={c}
                    closable
                    onClose={() => setConditions((prev) => prev.filter((x) => x !== c))}
                    style={{
                      margin: "4px 4px 0 0",
                      borderRadius: 20,
                      background: "#f5f3ff",
                      border: "1px solid #c4b5fd",
                      color: "#6c63ff",
                    }}
                  >
                    {c}
                  </Tag>
                ))}
              </div>
            </Card>
          </Col>

          {/* Goals */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <Space>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "#10b981",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    2
                  </div>
                  <span>Treatment Goals</span>
                </Space>
              }
              style={{ borderRadius: 12, height: "100%" }}
            >
              <Text type="secondary" style={{ display: "block", marginBottom: 12 }}>
                What outcomes does the patient want to achieve?
              </Text>
              <div>
                {TREATMENT_GOALS.map((goal) => (
                  <Tag
                    key={goal}
                    onClick={() =>
                      setGoals((prev) =>
                        prev.includes(goal)
                          ? prev.filter((g) => g !== goal)
                          : [...prev, goal]
                      )
                    }
                    style={{
                      margin: "4px 4px 0 0",
                      cursor: "pointer",
                      borderRadius: 20,
                      padding: "4px 12px",
                      background: goals.includes(goal) ? "#d1fae5" : "#f9fafb",
                      border: goals.includes(goal) ? "1.5px solid #10b981" : "1px solid #e5e7eb",
                      color: goals.includes(goal) ? "#065f46" : "#6b7280",
                      fontWeight: goals.includes(goal) ? 600 : 400,
                      transition: "all 0.2s",
                    }}
                  >
                    {goals.includes(goal) && <CheckCircleOutlined style={{ marginRight: 4 }} />}
                    {goal}
                  </Tag>
                ))}
              </div>
            </Card>
          </Col>

          {/* Budget */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <Space>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "#f59e0b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    3
                  </div>
                  <span>Treatment Budget</span>
                </Space>
              }
              style={{ borderRadius: 12 }}
            >
              <Radio.Group
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                style={{ width: "100%" }}
              >
                <Row gutter={12}>
                  {Object.entries(budgetLabels).map(([key, cfg]) => (
                    <Col span={8} key={key}>
                      <div
                        onClick={() => setBudget(key)}
                        style={{
                          border: `2px solid ${budget === key ? cfg.color : "#e5e7eb"}`,
                          borderRadius: 12,
                          padding: "12px 8px",
                          textAlign: "center",
                          cursor: "pointer",
                          background: budget === key ? `${cfg.color}15` : "#fff",
                          transition: "all 0.2s",
                        }}
                      >
                        <Radio value={key} style={{ display: "none" }} />
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background: cfg.color,
                            margin: "0 auto 8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <StarOutlined style={{ color: "#fff", fontSize: 14 }} />
                        </div>
                        <Text strong style={{ color: budget === key ? cfg.color : "#374151" }}>
                          {cfg.label}
                        </Text>
                        <Text
                          type="secondary"
                          style={{ display: "block", fontSize: 11, marginTop: 4 }}
                        >
                          {cfg.desc}
                        </Text>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Radio.Group>
            </Card>
          </Col>

          {/* Sessions */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <Space>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "#3b82f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    4
                  </div>
                  <span>Treatment Duration</span>
                </Space>
              }
              style={{ borderRadius: 12 }}
            >
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <Title level={2} style={{ color: "#6c63ff", margin: 0 }}>
                  {sessions}
                </Title>
                <Text type="secondary">treatment sessions</Text>
              </div>
              <Slider
                min={4}
                max={16}
                value={sessions}
                onChange={setSessions}
                marks={{
                  4: "4",
                  8: "8",
                  12: "12",
                  16: "16",
                }}
                trackStyle={{ background: "#6c63ff" }}
                handleStyle={{ borderColor: "#6c63ff" }}
              />
              <Row gutter={8} style={{ marginTop: 16 }}>
                {[
                  { label: "Estimated Duration", value: `${Math.ceil(sessions * 1.5)} weeks` },
                  { label: "Frequency", value: "1–2× / week" },
                ].map((s) => (
                  <Col span={12} key={s.label}>
                    <div
                      style={{
                        background: "#f9fafb",
                        borderRadius: 8,
                        padding: "8px 12px",
                        textAlign: "center",
                      }}
                    >
                      <Text type="secondary" style={{ fontSize: 11 }}>
                        {s.label}
                      </Text>
                      <Text strong style={{ display: "block", color: "#6c63ff" }}>
                        {s.value}
                      </Text>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>

          {/* Generate Button */}
          <Col xs={24}>
            <Card
              style={{
                borderRadius: 12,
                background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
                border: "1.5px solid #c4b5fd",
                textAlign: "center",
              }}
            >
              <Space direction="vertical" size={16}>
                <div>
                  <Text strong style={{ fontSize: 16, color: "#4c1d95" }}>
                    Ready to generate your treatment journey?
                  </Text>
                  <Paragraph type="secondary" style={{ margin: "4px 0 0" }}>
                    Our AI will create a personalized {sessions}-step journey based on{" "}
                    {conditions.length} condition(s) and {goals.length} treatment goal(s).
                  </Paragraph>
                </div>

                {!canGenerate && (
                  <Alert
                    message="Select at least one skin condition and one treatment goal to continue."
                    type="warning"
                    showIcon
                    style={{ borderRadius: 8 }}
                  />
                )}

                <Button
                  type="primary"
                  size="large"
                  disabled={!canGenerate}
                  loading={generating}
                  onClick={handleGenerate}
                  icon={<ThunderboltOutlined />}
                  style={{
                    borderRadius: 10,
                    background: canGenerate
                      ? "linear-gradient(135deg, #6c63ff, #a78bfa)"
                      : undefined,
                    border: "none",
                    height: 52,
                    padding: "0 48px",
                    fontSize: 16,
                    fontWeight: 700,
                    boxShadow: canGenerate ? "0 8px 24px rgba(108,99,255,0.35)" : undefined,
                  }}
                >
                  {generating ? "AI is generating your journey..." : "Generate Treatment Journey"}
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      )}

      {/* ── STEP 1: Generated Result ────────────────────────────────────────── */}
      {step === 1 && generated && (
        <div>
          {/* Journey Header */}
          <Card
            style={{
              borderRadius: 12,
              background: "linear-gradient(135deg, #4c1d95, #6c63ff)",
              border: "none",
              marginBottom: 24,
              color: "#fff",
            }}
          >
            <Row align="middle" justify="space-between">
              <Col>
                <Text style={{ color: "#c4b5fd", fontSize: 12, display: "block" }}>
                  AI Generated Treatment Journey
                </Text>
                <Title level={3} style={{ color: "#fff", margin: "4px 0 8px" }}>
                  {journeyName}
                </Title>
                <Space wrap>
                  {conditions.map((c) => (
                    <Tag
                      key={c}
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        color: "#fff",
                        borderRadius: 20,
                      }}
                    >
                      {c}
                    </Tag>
                  ))}
                </Space>
              </Col>
              <Col>
                <Row gutter={24}>
                  {[
                    { title: "Steps", value: journeySteps.length },
                    { title: "Duration", value: `${Math.ceil(sessions * 1.5)} wks` },
                    { title: "AI Confidence", value: `${confidence}%` },
                  ].map((s) => (
                    <Col key={s.title}>
                      <Statistic
                        title={
                          <Text style={{ color: "#c4b5fd", fontSize: 11 }}>{s.title}</Text>
                        }
                        value={s.value}
                        valueStyle={{ color: "#fff", fontSize: 24, fontWeight: 700 }}
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Card>

          {/* Journey Steps */}
          <Row gutter={[16, 16]}>
            {journeySteps.map((s, idx) => (
              <Col xs={24} key={s.order}>
                <Card
                  style={{
                    borderRadius: 12,
                    border: "1px solid #e5e7eb",
                    borderLeft: `4px solid ${s.tagColor}`,
                  }}
                  bodyStyle={{ padding: "16px 20px" }}
                >
                  <Row align="middle" gutter={16}>
                    <Col flex="48px">
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: "50%",
                          background: s.tagColor,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: 16,
                          flexShrink: 0,
                        }}
                      >
                        {s.order}
                      </div>
                    </Col>
                    <Col flex="auto">
                      <Row justify="space-between" align="top">
                        <Col xs={24} md={16}>
                          <Space align="center" style={{ marginBottom: 4 }}>
                            <Text strong style={{ fontSize: 15, color: "#1a1a2e" }}>
                              {s.name}
                            </Text>
                            <Tag
                              style={{
                                background: `${s.tagColor}20`,
                                border: `1px solid ${s.tagColor}`,
                                color: s.tagColor,
                                borderRadius: 12,
                              }}
                            >
                              {s.tag}
                            </Tag>
                          </Space>
                          <Text type="secondary" style={{ display: "block", lineHeight: 1.5 }}>
                            {s.description}
                          </Text>
                          {s.products && s.products.length > 0 && (
                            <div style={{ marginTop: 8 }}>
                              {s.products.map((p) => (
                                <Tag
                                  key={p}
                                  style={{
                                    background: "#f0fdf4",
                                    border: "1px solid #86efac",
                                    color: "#166534",
                                    borderRadius: 12,
                                    margin: "2px 4px 0 0",
                                  }}
                                >
                                  {p}
                                </Tag>
                              ))}
                            </div>
                          )}
                        </Col>
                        <Col xs={24} md={8} style={{ textAlign: "right" }}>
                          <Space direction="vertical" align="end" size={4}>
                            <Space>
                              <ClockCircleOutlined style={{ color: "#9ca3af" }} />
                              <Text type="secondary">{s.duration}</Text>
                            </Space>
                            <Tag color="blue">{s.frequency}</Tag>
                          </Space>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
                {idx < journeySteps.length - 1 && (
                  <div style={{ textAlign: "center", margin: "4px 0" }}>
                    <ArrowRightOutlined style={{ color: "#d1d5db", transform: "rotate(90deg)" }} />
                  </div>
                )}
              </Col>
            ))}
          </Row>

          {/* Action Bar */}
          <Card
            style={{
              borderRadius: 12,
              marginTop: 24,
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
            }}
          >
            <Row justify="space-between" align="middle">
              <Col>
                <Space>
                  <Button
                    onClick={() => {
                      setStep(0);
                      setGenerated(false);
                    }}
                  >
                    Edit Inputs
                  </Button>
                  <Tooltip title="Copy journey to clipboard">
                    <Button icon={<CopyOutlined />}>Copy</Button>
                  </Tooltip>
                </Space>
              </Col>
              <Col>
                <Space>
                  <Button
                    size="large"
                    icon={<SaveOutlined />}
                    style={{ borderRadius: 8 }}
                  >
                    Save as Template
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    icon={<CheckCircleOutlined />}
                    onClick={() => setStep(2)}
                    style={{
                      borderRadius: 8,
                      background: "#6c63ff",
                      border: "none",
                      fontWeight: 600,
                    }}
                  >
                    Activate Journey
                  </Button>
                </Space>
              </Col>
            </Row>
          </Card>
        </div>
      )}

      {/* ── STEP 2: Confirmation ──────────────────────────────────────────────── */}
      {step === 2 && (
        <Card
          style={{
            borderRadius: 16,
            textAlign: "center",
            padding: "48px 24px",
            border: "2px solid #10b981",
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #10b981, #34d399)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              boxShadow: "0 8px 32px rgba(16,185,129,0.35)",
            }}
          >
            <CheckCircleOutlined style={{ fontSize: 40, color: "#fff" }} />
          </div>
          <Title level={3} style={{ color: "#065f46", marginBottom: 8 }}>
            Treatment Journey Activated!
          </Title>
          <Paragraph type="secondary" style={{ fontSize: 15, maxWidth: 480, margin: "0 auto 32px" }}>
            The journey <strong>"{journeyName}"</strong> has been saved and is ready to assign to
            a patient. You can customize individual steps in the Journey Builder.
          </Paragraph>
          <Space size={16}>
            <Button size="large" style={{ borderRadius: 8 }}>
              View in Journey Builder
            </Button>
            <Button
              type="primary"
              size="large"
              style={{ borderRadius: 8, background: "#10b981", border: "none" }}
              onClick={() => {
                setStep(0);
                setGenerated(false);
                setConditions([]);
                setGoals([]);
              }}
            >
              Generate Another Journey
            </Button>
          </Space>
        </Card>
      )}

      {/* Loading overlay */}
      {generating && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(255,255,255,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            flexDirection: "column",
            gap: 16,
          }}
        >
          <Spin size="large" />
          <Title level={4} style={{ color: "#6c63ff", margin: 0 }}>
            AI is crafting your treatment journey...
          </Title>
          <Text type="secondary">Analyzing conditions, goals, and clinical evidence</Text>
        </div>
      )}
    </div>
  );
};

export default AIJourneyGeneratorPage;

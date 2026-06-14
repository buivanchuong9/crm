import React, { Component, ErrorInfo, ReactNode } from "react";
import { Result, Button, Collapse } from "antd";
import { BugOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  module?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error(`[ErrorBoundary] ${this.props.module ?? "Unknown"}:`, error, errorInfo);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.state.hasError && prevProps.children !== this.props.children) {
      this.setState({ hasError: false, error: null, errorInfo: null });
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div style={{ padding: "48px 24px", maxWidth: 600, margin: "0 auto" }}>
          <Result
            icon={<BugOutlined style={{ color: "#6c63ff" }} />}
            title="Something went wrong"
            subTitle={
              this.props.module
                ? `The ${this.props.module} module encountered an unexpected error.`
                : "An unexpected error occurred. Please try again."
            }
            extra={[
              <Button
                key="retry"
                type="primary"
                onClick={this.handleReset}
                style={{ borderRadius: 8, background: "#6c63ff", border: "none" }}
              >
                Try Again
              </Button>,
              <Button key="home" onClick={() => (window.location.href = "/dashboard")}>
                Go to Dashboard
              </Button>,
            ]}
          />
          {process.env.NODE_ENV === "development" && this.state.error && (
            <Collapse ghost style={{ marginTop: 16 }}>
              <Panel header="Error Details (dev only)" key="1">
                <pre style={{ fontSize: 12, color: "#ef4444", overflow: "auto" }}>
                  {this.state.error.message}
                  {"\n\n"}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </Panel>
            </Collapse>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

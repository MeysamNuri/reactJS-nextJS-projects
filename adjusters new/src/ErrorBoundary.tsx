import React from "react";
import { Alert, ConfigProvider } from "antd";

type MyProps = {
  children: any;
};
type MyState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <ConfigProvider  direction="rtl">
          <Alert
            message="خطا"
            description="خطایی رخ داده. لطفا دوباره سعی کنید یا با پشتیبانی تماس برقرار کنید."
            type="error"
          />
        </ConfigProvider>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

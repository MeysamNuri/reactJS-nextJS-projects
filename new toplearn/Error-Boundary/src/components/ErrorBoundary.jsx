import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>مشکلی پیش آمده لطفاً مجدد تلاش بفرمائید. 🚀 </h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

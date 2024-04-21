import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ error: error, errorInfo: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>Please try again later.</p>
          {/* Display error details if needed */}
          {this.state.error && <p>Error: {this.state.error.toString()}</p>}
          {this.state.errorInfo && <p>Stack Trace: {this.state.errorInfo.componentStack}</p>}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
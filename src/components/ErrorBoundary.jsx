import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      redirect: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  // componentDidUpdate() {
  //
  // }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/survey' />;
    }
    if (this.state.hasError) {
      return (
        <p>An error occurred. <Link to='/survey' replace>Click here</Link> to return home.</p>
      )
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

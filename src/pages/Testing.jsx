import React, { Component } from 'react';

class ErrorComponent extends Component {
  render() {
    // Intentionally throwing an error
    throw new Error('Error occurred in ErrorComponent');

    return <div>This is an error component.</div>;
  }
}

export default ErrorComponent;
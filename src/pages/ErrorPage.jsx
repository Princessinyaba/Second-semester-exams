import React from 'react';
import ErrorBoundary from './ErrorBound';
import ErrorComponent from './Testing';

function Error() {
  return (
    <div>
      <h1>Hello, Error 404</h1>
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    </div>
  );
}

export default Error;
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
const Loading = () => {
  return (
    <div className="loading">
      <Spinner animation="border" variant="success" data-testid="loading" />
    </div>
  );
};

export default Loading;

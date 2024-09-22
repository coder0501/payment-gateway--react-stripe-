import React from 'react';
import '../styles/LoadingSpinner.css'; // Import the CSS for the loading spinner

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;

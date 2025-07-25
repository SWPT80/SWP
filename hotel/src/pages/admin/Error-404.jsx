// File: Error404.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => (
  <div className="main-wrapper error-page">
    <div className="error-box">
      <h1>404</h1>
      <h3 className="h2 mb-3">
        <i className="fas fa-exclamation-triangle"></i> Oops! Page not found!
      </h3>
      <p className="h4 font-weight-normal">The page you requested was not found.</p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  </div>
);

export default Error404;
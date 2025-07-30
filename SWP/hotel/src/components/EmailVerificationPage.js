import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function EmailVerificationPage() {
  const [message, setMessage] = useState("Đang xác minh...");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      setMessage("Không tìm thấy token xác minh.");
      setIsError(true);
      return;
    }

    axios.get(`http://localhost:8080/api/host/verify-email?token=${token}`)
      .then((res) => {
        setMessage(res.data);
        setIsError(false);
      })
      .catch((err) => {
        setMessage(err.response?.data || "Xác minh email thất bại.");
        setIsError(true);
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <Alert variant={isError ? "danger" : "success"}>
        {message}
      </Alert>
    </div>
  );
}

export default EmailVerificationPage;
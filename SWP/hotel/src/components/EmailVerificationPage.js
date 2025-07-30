import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmailVerificationPage() {
  const [message, setMessage] = useState("Đang xác minh...");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      setMessage("Không tìm thấy token xác minh.");
      return;
    }

    axios.get(`http://localhost:8080/api/host/verify-email?token=${token}`)
      .then((res) => {
        setMessage(res.data);
      })
      .catch((err) => {
        setMessage(err.response?.data || "Xác minh thất bại.");
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>{message}</h2>
    </div>
  );
}

export default EmailVerificationPage;

// src/components/ResetPassword.js
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import '../assets/styles/ResetPassword.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setError('Token không hợp lệ. Vui lòng kiểm tra lại link.');
    } else {
      axios
        .get(`http://localhost:8080/api/auth/validate-reset-token?token=${token}`, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          if (!(response.status === 200 && response.data === 'Token hợp lệ')) {
            setError(response.data || 'Token không hợp lệ.');
          }
        })
        .catch((err) => {
          console.log('Error checking token: ', err.response);
          setError('Không thể xác nhận token: ' + (err.response?.data?.message || err.message));
        });
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/reset-password',
        {
          token: token,
          newPassword,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setMessage('✅ Mật khẩu đã được đặt lại thành công!');
    } catch (err) {
      const backendMsg = err.response?.data || err.response?.data?.message;
      console.log('Lỗi từ backend:', backendMsg);
      // ✅ Hiển thị thông báo rõ ràng cho lỗi từ backend
      setError(backendMsg || 'Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ background: 'linear-gradient(135deg, #e0f7fa, #b2ebf2)' }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="reset-password-card shadow-sm">
              <Card.Body>
                <div className="text-center mb-4">
                  <h2 style={{ color: '#0288d1', fontWeight: '700' }}>
                    Đặt lại mật khẩu - Traexco
                  </h2>
                </div>

                {/* Thông báo lỗi */}
                {error && (
                  <Alert variant="danger" className="text-center">
                    {error}
                  </Alert>
                )}

                {/* Thông báo thành công */}
                {message && (
                  <Alert variant="success" className="text-center">
                    {message}
                  </Alert>
                )}

                {/* Form reset password */}
                {!message && (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="newPassword">
                      <Form.Label>Mật khẩu mới:</Form.Label>
                      <Form.Control
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Nhập mật khẩu mới"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="confirmPassword">
                      <Form.Label>Xác nhận mật khẩu:</Form.Label>
                      <Form.Control
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Xác nhận mật khẩu"
                        required
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100"
                      style={{
                        background: 'linear-gradient(90deg, #0288d1, #01579b)',
                        border: 'none',
                      }}
                    >
                      Đặt lại mật khẩu
                    </Button>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResetPassword;

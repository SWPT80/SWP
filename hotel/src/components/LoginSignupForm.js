import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, Tabs, Tab } from 'react-bootstrap';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const AuthModal = ({ show, onClose, onAuthSuccess }) => {
  const navigate = useNavigate();
  const [key, setKey] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log('Form Data:', data); // Debug dữ liệu form

    try {
      if (key === 'login') {
        const response = await axios.post('http://localhost:8080/api/auth/login', {
          email: data.loginEmail,
          password: data.loginPassword,
        });
        console.log('Login API Response:', response.data); // Debug phản hồi API
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role?.toUpperCase() || 'USER');

        // Gọi API /me để lấy thông tin người dùng
        const meResponse = await axios.get('http://localhost:8080/api/auth/me', {
          headers: { Authorization: `Bearer ${response.data.token}` },
        });
        console.log('User info from /me:', meResponse.data); // Debug thông tin người dùng

        const userData = {
          fullName: meResponse.data.fullName || data.loginEmail.split('@')[0],
          role: meResponse.data.role?.toUpperCase() || 'USER',
          id: meResponse.data.id,
        };
        setSuccess('Đăng nhập thành công!');
        onAuthSuccess(userData); // Gửi dữ liệu đầy đủ
        setTimeout(() => onClose(), 1000);
      } else {
        if (data.registerPassword !== data.registerConfirmPassword) {
          setError('Mật khẩu xác nhận không khớp');
          setIsLoading(false);
          return;
        }
        const response = await axios.post('http://localhost:8080/api/auth/register', {
          userName: data.registerUserName,
          fullName: data.registerName,
          email: data.registerEmail,
          phone: data.registerPhone || null,
          birthdate: data.registerBirthdate || null,
          address: data.registerAddress || null,
          password: data.registerPassword,
        });
        console.log('Register API Response:', response.data); // Debug phản hồi API
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role?.toUpperCase() || 'USER');

        const userData = {
          fullName: data.registerName,
          role: response.data.role?.toUpperCase() || 'USER',
          id: response.data.id,
        };
        setSuccess('Đăng ký thành công!');
        onAuthSuccess(userData);
        setTimeout(() => {
          setKey('login');
          onClose();
        }, 1000);
      }
    } catch (err) {
      setIsLoading(false);
      const errorMessage =
        err.response?.data?.message ||
        (typeof err.response?.data === 'object' ? Object.values(err.response.data).join(', ') : 'Có lỗi xảy ra');
      setError(errorMessage);
      console.error('Auth Error:', err.response?.data || err.message); // Debug lỗi
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    setSuccess('');
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/auth/google', {
        token: credentialResponse.credential,
      });
      console.log('Google Login API Response:', response.data); // Debug phản hồi API
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role?.toUpperCase() || 'USER');

      const meResponse = await axios.get('http://localhost:8080/api/auth/me', {
        headers: { Authorization: `Bearer ${response.data.token}` },
      });
      console.log('User info from /me (Google):', meResponse.data); // Debug thông tin người dùng

      const userData = {
        fullName: meResponse.data.fullName || meResponse.data.email.split('@')[0],
        role: meResponse.data.role?.toUpperCase() || 'USER',
        id: meResponse.data.id,
      };
      setSuccess('Đăng nhập Google thành công!');
      onAuthSuccess(userData);
      setTimeout(() => onClose(), 1000);
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err.response?.data?.message || 'Lỗi đăng nhập Google';
      setError(errorMessage);
      console.error('Google Login Error:', err.response?.data || err.message); // Debug lỗi
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    const email = e.target.elements.forgotEmail.value;
    try {
      await axios.post('http://localhost:8080/api/auth/forgot-password', { email });
      setSuccess('Yêu cầu đặt lại mật khẩu đã được gửi!');
      setShowForgotPassword(false);
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err.response?.data?.message || 'Có lỗi xảy ra';
      setError(errorMessage);
      console.error('Forgot Password Error:', err.response?.data || err.message); // Debug lỗi
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Đăng nhập hoặc Đăng ký</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <Tabs
          id="auth-tabs"
          activeKey={key}
          onSelect={(k) => {
            setKey(k);
            setShowForgotPassword(false);
            setError('');
            setSuccess('');
          }}
          className="mb-3"
        >
          <Tab eventKey="login" title="Đăng nhập">
            {!showForgotPassword ? (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="loginEmail"
                    placeholder="Nhập email"
                    required
                    disabled={isLoading}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="loginPassword">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    name="loginPassword"
                    placeholder="Nhập mật khẩu"
                    required
                    disabled={isLoading}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 auth-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner"></span> Đang xử lý...
                    </>
                  ) : (
                    'Đăng nhập'
                  )}
                </Button>
                <div className="forgot-password-container">
                  <a
                    href="#"
                    className="forgot-password-link"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Quên mật khẩu?
                  </a>
                </div>
              </Form>
            ) : (
              <Form onSubmit={handleForgotPassword}>
                <Form.Group className="mb-3" controlId="forgotEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="forgotEmail"
                    placeholder="Nhập email của bạn"
                    required
                    disabled={isLoading}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 auth-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner"></span> Đang gửi...
                    </>
                  ) : (
                    'Gửi yêu cầu đặt lại mật khẩu'
                  )}
                </Button>
                <div className="forgot-password-container">
                  <a
                    href="#"
                    className="forgot-password-link"
                    onClick={() => setShowForgotPassword(false)}
                  >
                    Quay lại đăng nhập
                  </a>
                </div>
              </Form>
            )}
          </Tab>
          <Tab eventKey="register" title="Đăng ký">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="registerUserName">
                <Form.Label>Tên người dùng</Form.Label>
                <Form.Control
                  type="text"
                  name="registerUserName"
                  placeholder="Nhập tên người dùng"
                  required
                  disabled={isLoading}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="registerName">
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control
                  type="text"
                  name="registerName"
                  placeholder="Nhập họ và tên"
                  required
                  disabled={isLoading}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="registerEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="registerEmail"
                  placeholder="Nhập email"
                  required
                  disabled={isLoading}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="registerPassword">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  name="registerPassword"
                  placeholder="Nhập mật khẩu"
                  required
                  disabled={isLoading}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="registerConfirmPassword">
                <Form.Label>Xác nhận mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  name="registerConfirmPassword"
                  placeholder="Xác nhận mật khẩu"
                  required
                  disabled={isLoading}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="w-100 auth-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span> Đang xử lý...
                  </>
                ) : (
                  'Đăng ký'
                )}
              </Button>
            </Form>
          </Tab>
        </Tabs>
        <div className="social-login-section mt-4">
          <div className="divider">
            <span>hoặc</span>
          </div>
          <GoogleOAuthProvider clientId="736882827867-gjjrd24l8vofkj87nhe8kt1q0d7t9ako.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Lỗi đăng nhập Google')}
              theme="outline"
              size="large"
              width="100%"
              disabled={isLoading}
            />
          </GoogleOAuthProvider>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;
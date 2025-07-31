import { useState } from 'react';
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleLoginSuccess = async (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role.toUpperCase());

    try {
      const meResponse = await axios.get('http://localhost:8080/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const user = meResponse.data;
      localStorage.setItem('hostId', user.id);
      const fullName = user.fullName || user.email.split('@')[0];
      setSuccess('Đăng nhập thành công!');
      setShowSuccessModal(true);
      setTimeout(() => {
        onAuthSuccess({ fullName });
        setShowSuccessModal(false);
        onClose();
        if (role === 'ADMIN') navigate('/admin/dashboard', { replace: true });
        else if (role === 'HOST') navigate('/host/dashboard', { replace: true });
        else navigate('/', { replace: true });
      }, 2000);
    } catch (error) {
      console.error('Lỗi khi gọi /me:', error);
      setError('Không lấy được thông tin người dùng.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      if (key === 'login') {
        const res = await axios.post('http://localhost:8080/api/auth/login', {
          email: data.loginEmail,
          password: data.loginPassword
        });
        await handleLoginSuccess(res.data.token, res.data.role);
      } else {
        if (data.registerPassword !== data.registerConfirmPassword) {
          setError('Mật khẩu xác nhận không khớp');
          return;
        }

        const res = await axios.post('http://localhost:8080/api/auth/register', {
          userName: data.registerUserName,
          fullName: data.registerName,
          email: data.registerEmail,
          phone: data.registerPhone || null,
          birthdate: data.registerBirthdate || null,
          address: data.registerAddress || null,
          password: data.registerPassword
        });
        await handleLoginSuccess(res.data.token, res.data.role);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Có lỗi xảy ra';
      setError(msg);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/google', {
        token: credentialResponse.credential
      });
      await handleLoginSuccess(res.data.token, res.data.role);
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi đăng nhập Google');
      console.error('Google Login Error:', err);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const email = e.target.elements.forgotEmail.value;
    try {
      await axios.post('http://localhost:8080/api/auth/forgot-password', { email });
      setSuccess('Yêu cầu đặt lại mật khẩu đã được gửi!');
      setShowForgotPassword(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  return (
    <>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đăng nhập / Đăng ký</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <Tabs
            activeKey={key}
            onSelect={(k) => {
              setKey(k);
              setShowForgotPassword(false);
            }}
            className="mb-3"
          >
            <Tab eventKey="login" title="Đăng nhập">
              {!showForgotPassword ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="loginEmail" required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type="password" name="loginPassword" required />
                  </Form.Group>
                  <Button type="submit" variant="primary" className="w-100">Đăng nhập</Button>
                  <div className="text-center mt-2">
                    <a href="#" onClick={() => setShowForgotPassword(true)}>Quên mật khẩu?</a>
                  </div>
                </Form>
              ) : (
                <Form onSubmit={handleForgotPassword}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="forgotEmail" required />
                  </Form.Group>
                  <Button type="submit" variant="primary" className="w-100">Gửi yêu cầu</Button>
                  <div className="text-center mt-2">
                    <a href="#" onClick={() => setShowForgotPassword(false)}>Quay lại đăng nhập</a>
                  </div>
                </Form>
              )}
            </Tab>

            <Tab eventKey="register" title="Đăng ký">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Tên người dùng</Form.Label>
                  <Form.Control type="text" name="registerUserName" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control type="text" name="registerName" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="registerEmail" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control type="password" name="registerPassword" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Xác nhận mật khẩu</Form.Label>
                  <Form.Control type="password" name="registerConfirmPassword" required />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100">Đăng ký</Button>
              </Form>
            </Tab>
          </Tabs>

          <div className="mt-4 text-center">
            <h6>hoặc</h6>
            <GoogleOAuthProvider clientId="736882827867-gjjrd24l8vofkj87nhe8kt1q0d7t9ako.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Lỗi đăng nhập Google')}
                theme="outline"
                size="large"
                width="100%"
              />
            </GoogleOAuthProvider>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showSuccessModal} centered backdrop="static" keyboard={false}>
        <Modal.Body className="text-center p-4">
          <div style={{ fontSize: '80px', color: 'green' }}>✔</div>
          <h4 className="mt-3">Đăng nhập thành công!</h4>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AuthModal;

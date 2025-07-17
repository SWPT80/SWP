import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Form, Button, Alert, Modal } from 'react-bootstrap';
import { FaHome, FaCompass, FaConciergeBell } from 'react-icons/fa';
import '../assets/styles/BecomeHost.css';

const BecomeHost = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specificField1: '',
    specificField2: '',
    description: '',
  });
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const confirmType = () => {
    if (selectedType) {
      setStep(3);
    } else {
      alert('Vui lòng chọn loại!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!formData.fullName || !formData.email || !formData.phone || !formData.specificField1 || !formData.description || (selectedType === 'experience' && !formData.specificField2) || (selectedType === 'service' && !formData.specificField2)) {
      setError('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const dataToSend = { ...formData, type: selectedType };

    try {
      await axios.post('http://localhost:8080/api/host/register', dataToSend, {
        headers: { 'Content-Type': 'application/json' },
      });
      setMessage('Đăng ký trở thành host thành công! Chúng tôi sẽ liên hệ với bạn sớm.');
      setTimeout(() => {
        setMessage('');
        setStep(1);
        setSelectedType('');
        setFormData({ fullName: '', email: '', phone: '', specificField1: '', specificField2: '', description: '' });
        navigate('/');
      }, 2000);
    } catch (err) {
      console.log('Error submitting host registration: ', err.response);
      setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Button
            variant=""
            className="become-host-button w-100"
            onClick={() => setStep(2)}
          >
            Đăng ký trở thành Host
          </Button>
        );
      case 2:
        return (
          <Modal show={true} onHide={() => setStep(1)} centered>
            <Modal.Body className="modal-content">
              <h3 className="modal-title">Bạn muốn cung cấp loại nào?</h3>
              <div className="modal-options d-flex justify-content-center gap-3 flex-wrap">
                {[
                  { icon: <FaHome />, label: 'Nhà', value: 'house' },
                  { icon: <FaCompass />, label: 'Trải nghiệm', value: 'experience' },
                  { icon: <FaConciergeBell />, label: 'Dịch vụ', value: 'service' },
                ].map((option) => (
                  <div
                    key={option.value}
                    className={`option-label flex-column ${selectedType === option.value ? 'selected' : ''}`}
                    onClick={() => setSelectedType(option.value)}
                  >
                    <div className="option-icon mb-2">{option.icon}</div>
                    <span>{option.label}</span>
                  </div>
                ))}
              </div>
              <Button variant="" className="become-host-button w-100 mt-4" onClick={confirmType}>
                Xác nhận
              </Button>
            </Modal.Body>
          </Modal>
        );
      case 3:
        return renderForm();
      default:
        return null;
    }
  };

  const renderForm = () => {
    let formFields = (
      <>
        <Form.Group className="form-group mb-4">
          <Form.Label>Họ và tên:</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Nhập họ và tên"
            required
            className="form-input"
          />
        </Form.Group>
        <Form.Group className="form-group mb-4">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Nhập email"
            required
            className="form-input"
          />
        </Form.Group>
        <Form.Group className="form-group mb-4">
          <Form.Label>Số điện thoại:</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Nhập số điện thoại"
            required
            className="form-input"
          />
        </Form.Group>
      </>
    );

    let specificFields;
    if (selectedType === 'house') {
      specificFields = (
        <>
          <Form.Group className="form-group mb-4">
            <Form.Label>Tên homestay:</Form.Label>
            <Form.Control
              type="text"
              name="specificField1"
              value={formData.specificField1}
              onChange={handleChange}
              placeholder="Nhập tên homestay"
              required
              className="form-input"
            />
          </Form.Group>
          <Form.Group className="form-group mb-4">
            <Form.Label>Mô tả homestay:</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả về homestay của bạn"
              rows={3}
              required
              className="form-input"
            />
          </Form.Group>
        </>
      );
    } else if (selectedType === 'experience') {
      specificFields = (
        <>
          <Form.Group className="form-group mb-4">
            <Form.Label>Tên trải nghiệm:</Form.Label>
            <Form.Control
              type="text"
              name="specificField1"
              value={formData.specificField1}
              onChange={handleChange}
              placeholder="Nhập tên trải nghiệm"
              required
              className="form-input"
            />
          </Form.Group>
          <Form.Group className="form-group mb-4">
            <Form.Label>Thời gian:</Form.Label>
            <Form.Control
              type="text"
              name="specificField2"
              value={formData.specificField2}
              onChange={handleChange}
              placeholder="Nhập thời gian (ví dụ: 2 giờ)"
              required
              className="form-input"
            />
          </Form.Group>
          <Form.Group className="form-group mb-4">
            <Form.Label>Mô tả trải nghiệm:</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả về trải nghiệm của bạn"
              rows={3}
              required
              className="form-input"
            />
          </Form.Group>
        </>
      );
    } else if (selectedType === 'service') {
      specificFields = (
        <>
          <Form.Group className="form-group mb-4">
            <Form.Label>Tên dịch vụ:</Form.Label>
            <Form.Control
              type="text"
              name="specificField1"
              value={formData.specificField1}
              onChange={handleChange}
              placeholder="Nhập tên dịch vụ"
              required
              className="form-input"
            />
          </Form.Group>
          <Form.Group className="form-group mb-4">
            <Form.Label>Loại dịch vụ:</Form.Label>
            <Form.Select
              name="specificField2"
              value={formData.specificField2}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Chọn loại dịch vụ</option>
              <option value="bellDesk">Bell Desk</option>
              <option value="concierge">Concierge</option>
              <option value="reception">Reception</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="form-group mb-4">
            <Form.Label>Mô tả dịch vụ:</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả về dịch vụ của bạn"
              rows={3}
              required
              className="form-input"
            />
          </Form.Group>
        </>
      );
    }

    return (
      <Form onSubmit={handleSubmit}>
        {formFields}
        {specificFields}
        <Button variant="" type="submit" className="become-host-button w-100 mt-4">
          Xác nhận
        </Button>
      </Form>
    );
  };

  return (
    <div className="become-host-container d-flex justify-content-center align-items-center min-vh-100">
      <Card className="become-host-card">
        <Card.Body>
          <div className="text-center mb-4">
            <h2 className="title">Trở thành Host - Traexco</h2>
            <p className="text-muted">Tham gia cộng đồng host và bắt đầu kiếm thu nhập từ homestay của bạn!</p>
          </div>
          {message && <Alert variant="success" className="alert-success text-center mb-3">{message}</Alert>}
          {error && <Alert variant="danger" className="alert-danger text-center mb-3">{error}</Alert>}
          {renderStep()}
        </Card.Body>
      </Card>
    </div>
  );
};

export default BecomeHost;
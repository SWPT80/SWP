import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Form, Button, Alert, Modal } from 'react-bootstrap';
import { FaHome, FaCompass, FaConciergeBell } from 'react-icons/fa';
import '../assets/styles/BecomeHost.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const BecomeHost = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specificField1: '',
    specificField2: '',
    description: '',
    documentType: '',
    identityFile: null,
    socialLink: '',
    introVideo: null,
  });

  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [alreadySent, setAlreadySent] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRequestStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("Bạn cần đăng nhập để kiểm tra trạng thái yêu cầu.");
          setLoading(false);
          return;
        }
        const res = await axios.get('http://localhost:8080/api/host/check-request-status', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setAlreadySent(res.data === true);
        setError('');
      } catch (err) {
        console.error('Lỗi khi kiểm tra trạng thái yêu cầu:', err);
        setError('Không thể kiểm tra trạng thái yêu cầu. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };
    checkRequestStatus();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [e.target.name]: file });
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const confirmType = () => {
    if (selectedType) {
      setStep(3);
      setError('');
    } else {
      setError('Vui lòng chọn loại đăng ký!');
    }
  };

  const goBackToTypeSelection = () => {
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const {
      fullName,
      email,
      phone,
      specificField1,
      specificField2,
      description,
      documentType,
      identityFile,
      socialLink,
      introVideo
    } = formData;

    if (!fullName || !email || !phone || !specificField1 || !description || !documentType || !identityFile || (selectedType !== 'house' && !specificField2)) {
      setError('Vui lòng điền đầy đủ thông tin và tải lên giấy tờ!');
      return;
    }

    const dataToSend = new FormData();
    dataToSend.append('fullName', fullName);
    dataToSend.append('email', email);
    dataToSend.append('phone', phone);
    dataToSend.append('specificField1', specificField1);
    dataToSend.append('specificField2', specificField2);
    dataToSend.append('description', description);
    dataToSend.append('type', selectedType);
    dataToSend.append('documentType', documentType);
    dataToSend.append('identityFile', identityFile);
    dataToSend.append('socialLink', socialLink);
    if (introVideo) dataToSend.append('introVideo', introVideo);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/api/host/register', dataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      setMessage('Đăng ký thành công! Vui lòng kiểm tra email xác thực và chờ phê duyệt.');
      setTimeout(() => {
        setMessage('');
        setStep(1);
        setSelectedType('');
        setFormData({
          fullName: '', email: '', phone: '',
          specificField1: '', specificField2: '', description: '',
          documentType: '', identityFile: null, socialLink: '', introVideo: null
        });
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Lỗi gửi đăng ký:', err.response);
      setError('Có lỗi xảy ra khi gửi đăng ký. Vui lòng thử lại.');
    }
  };

  const renderForm = () => {
    const commonFields = (
      <>
        <Form.Group className="form-group mb-4">
          <Form.Label>Họ và tên:</Form.Label>
          <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Nhập họ và tên" required className="form-input" />
        </Form.Group>
        <Form.Group className="form-group mb-4">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Nhập email" required className="form-input" />
        </Form.Group>
        <Form.Group className="form-group mb-4">
          <Form.Label>Số điện thoại:</Form.Label>
          <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Nhập số điện thoại" required className="form-input" />
        </Form.Group>
      </>
    );

    let specificFields;
    if (selectedType === 'house') {
      specificFields = (
        <Form.Group className="form-group mb-4">
          <Form.Label>Tên homestay:</Form.Label>
          <Form.Control type="text" name="specificField1" value={formData.specificField1} onChange={handleChange} placeholder="Nhập tên homestay" required className="form-input" />
        </Form.Group>
      );
    } else if (selectedType === 'experience') {
      specificFields = (
        <>
          <Form.Group className="form-group mb-4">
            <Form.Label>Tên trải nghiệm:</Form.Label>
            <Form.Control type="text" name="specificField1" value={formData.specificField1} onChange={handleChange} placeholder="Nhập tên trải nghiệm" required className="form-input" />
          </Form.Group>
          <Form.Group className="form-group mb-4">
            <Form.Label>Thời gian:</Form.Label>
            <Form.Control type="text" name="specificField2" value={formData.specificField2} onChange={handleChange} placeholder="Ví dụ: 2 giờ" required className="form-input" />
          </Form.Group>
        </>
      );
    } else if (selectedType === 'service') {
      specificFields = (
        <>
          <Form.Group className="form-group mb-4">
            <Form.Label>Tên dịch vụ:</Form.Label>
            <Form.Control type="text" name="specificField1" value={formData.specificField1} onChange={handleChange} placeholder="Nhập tên dịch vụ" required className="form-input" />
          </Form.Group>
          <Form.Group className="form-group mb-4">
            <Form.Label>Loại dịch vụ:</Form.Label>
            <Form.Select name="specificField2" value={formData.specificField2} onChange={handleChange} required className="form-input">
              <option value="">Chọn loại dịch vụ</option>
              <option value="Chụp ảnh">Chụp ảnh</option>
              <option value="Đầu bếp">Đầu bếp</option>
              <option value="Đồ ăn chuẩn bị sẵn">Đồ ăn chuẩn bị sẵn</option>
              <option value="Massage">Massage</option>
              <option value="Đào tạo">Đào tạo</option>
              <option value="Trang điểm">Trang điểm</option>
              <option value="Làm tóc">Làm tóc</option>
              <option value="Chăm sóc spa">Chăm sóc spa</option>
              <option value="Dịch vụ ăn uống">Dịch vụ ăn uống</option>
              <option value="Làm móng">Làm móng</option>
            </Form.Select>
          </Form.Group>
        </>
      );
    }

    return (
      <Form onSubmit={handleSubmit}>
        {commonFields}
        {specificFields}

        <Form.Group className="form-group mb-4">
          <Form.Label>Mô tả chi tiết:</Form.Label>
          <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} placeholder="Mô tả chi tiết về bạn hoặc dịch vụ bạn cung cấp" rows={3} required className="form-input" />
        </Form.Group>

        <Form.Group className="form-group mb-4">
          <Form.Label>Loại giấy tờ xác minh:</Form.Label>
          <Form.Select name="documentType" value={formData.documentType} onChange={handleChange} required className="form-input">
            <option value="">-- Chọn loại giấy tờ --</option>
            <option value="cccd">CMND/CCCD</option>
            <option value="passport">Hộ chiếu</option>
            <option value="business">Giấy phép kinh doanh</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="form-group mb-4">
          <Form.Label>Ảnh/PDF giấy tờ xác minh:</Form.Label>
          <Form.Control type="file" name="identityFile" accept="image/*,application/pdf" onChange={handleFileUpload} required className="form-input" />
        </Form.Group>

        <Form.Group className="form-group mb-4">
          <Form.Label>Liên kết mạng xã hội:</Form.Label>
          <Form.Control type="url" name="socialLink" value={formData.socialLink} onChange={handleChange} placeholder="https://facebook.com/tenban" className="form-input" />
        </Form.Group>

        <Form.Group className="form-group mb-4">
          <Form.Label>Video tự giới thiệu (tùy chọn):</Form.Label>
          <Form.Control type="file" name="introVideo" accept="video/*" onChange={handleFileUpload} className="form-input" />
        </Form.Group>

        <Button variant="primary" type="submit" className="become-host-button w-100 mt-4">
          Gửi đăng ký
        </Button>
      </Form>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Button variant="primary" className="become-host-button w-100" onClick={() => setStep(2)}>
            Đăng ký trở thành Host
          </Button>
        );
      case 2:
        return (
          <Modal show={true} onHide={() => setStep(1)} centered>
            <Modal.Body className="modal-content">
              <h3 className="modal-title">Bạn muốn cung cấp loại nào?</h3>
              <div className="modal-options d-flex justify-content-center gap-3 flex-wrap">
                {[{ icon: <FaHome />, label: 'Nhà', value: 'house' },
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
              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}
              <div className="d-flex justify-content-between gap-3 mt-4">
                <Button variant="secondary" className="w-50" onClick={() => setStep(1)}>Quay lại</Button>
                <Button variant="primary" className="become-host-button w-50" onClick={confirmType}>Xác nhận</Button>
              </div>
            </Modal.Body>
          </Modal>
        );
      case 3:
        return (
          <>
            <Button variant="link" className="mb-3 px-0" onClick={goBackToTypeSelection}>
              ← Quay lại bước chọn loại đăng ký
            </Button>
            {renderForm()}
          </>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Đang tải...</div>;
  }

  if (alreadySent) {
    return (
      <div className="become-host-container d-flex justify-content-center align-items-center min-vh-100">
        <Card className="become-host-card">
          <Card.Body className="text-center">
            <h3 className="text-danger mb-4">Bạn đã gửi yêu cầu!</h3>
            <p className="text-muted">Vui lòng chờ xét duyệt hoặc gửi lại sau khi bị từ chối.</p>
          </Card.Body>
        </Card>
      </div>
    );
  }

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
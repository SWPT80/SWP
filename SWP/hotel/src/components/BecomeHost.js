// 🎯 Đã cải tiến: có dấu * cho bắt buộc, hiển thị lỗi đỏ từng trường, Modal hiển thị thành công
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Form, Button, Alert, Modal } from 'react-bootstrap';
import { FaHome, FaCompass, FaConciergeBell } from 'react-icons/fa';
import '../assets/styles/BecomeHost.css';

const BecomeHost = () => {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', specificField1: '', specificField2: '',
    description: '', documentType: '', identityFile: null, socialLink: '', introVideo: null
  });
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [alreadySent, setAlreadySent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkRequestStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/api/host/check-request-status', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setAlreadySent(res.data === true);
      } catch (err) {
        console.error('Lỗi khi kiểm tra trạng thái yêu cầu:', err);
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
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    const {
      fullName, email, phone, specificField1, specificField2,
      description, documentType, identityFile, socialLink, introVideo
    } = formData;

    const newErrors = {};
    if (!fullName) newErrors.fullName = 'Vui lòng nhập họ và tên!';
    if (!email) newErrors.email = 'Vui lòng nhập email!';
    if (!phone) newErrors.phone = 'Vui lòng nhập số điện thoại!';
    if (!specificField1) newErrors.specificField1 = 'Không được để trống!';
    if (selectedType !== 'house' && !specificField2) newErrors.specificField2 = 'Không được để trống!';
    if (!description) newErrors.description = 'Vui lòng nhập mô tả!';
    if (!documentType) newErrors.documentType = 'Vui lòng chọn loại giấy tờ!';
    if (!identityFile) newErrors.identityFile = 'Vui lòng tải lên giấy tờ xác minh!';
    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }
    setFieldErrors({});

    const dataToSend = new FormData();
    Object.entries({
      fullName, email, phone, specificField1, specificField2,
      description, type: selectedType, documentType, socialLink
    }).forEach(([key, value]) => dataToSend.append(key, value));
    dataToSend.append('identityFile', identityFile);
    if (introVideo) dataToSend.append('introVideo', introVideo);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/api/host/register', dataToSend, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Đăng ký thành công! Vui lòng kiểm tra email xác thực và chờ phê duyệt.');
      setTimeout(() => {
        setMessage(''); setStep(1); setSelectedType('');
        setFormData({ fullName: '', email: '', phone: '', specificField1: '', specificField2: '',
          description: '', documentType: '', identityFile: null, socialLink: '', introVideo: null });
        navigate('/');
      }, 2000);
    } catch (err) {
      console.log('Lỗi gửi đăng ký:', err);
      setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const renderFormGroup = (label, name, type = 'text', as = 'input', options = []) => (
    <Form.Group className="form-group mb-4">
      <Form.Label>{label} <span className="text-danger">*</span></Form.Label>
      {as === 'select' ? (
        <Form.Select name={name} value={formData[name]} onChange={handleChange} isInvalid={!!fieldErrors[name]}>
          {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </Form.Select>
      ) : (
        <Form.Control
          type={type} name={name} value={formData[name]} onChange={handleChange} 
          isInvalid={!!fieldErrors[name]} placeholder={label.replace('*', '').trim()}
          as={as === 'textarea' ? 'textarea' : 'input'} rows={as === 'textarea' ? 3 : undefined}
        />
      )}
      <Form.Control.Feedback type="invalid">{fieldErrors[name]}</Form.Control.Feedback>
    </Form.Group>
  );

  const renderForm = () => (
    <Form onSubmit={handleSubmit}>
      {renderFormGroup('Họ và tên:', 'fullName')}
      {renderFormGroup('Email:', 'email', 'email')}
      {renderFormGroup('Số điện thoại:', 'phone', 'tel')}

      {selectedType === 'house' && renderFormGroup('Tên homestay:', 'specificField1')}
      {selectedType === 'experience' && <>
        {renderFormGroup('Tên trải nghiệm:', 'specificField1')}
        {renderFormGroup('Thời gian:', 'specificField2')}
      </>}
      {selectedType === 'service' && <>
        {renderFormGroup('Tên dịch vụ:', 'specificField1')}
        {renderFormGroup('Loại dịch vụ:', 'specificField2', 'select', 'select', [
          { value: '', label: 'Chọn loại dịch vụ' },
          ...['Chụp ảnh','Đầu bếp','Massage','Trang điểm','Làm tóc','Dịch vụ ăn uống'].map(v => ({ value: v, label: v }))
        ])}
      </>}

      {renderFormGroup('Mô tả chi tiết:', 'description', 'text', 'textarea')}
      {renderFormGroup('Loại giấy tờ xác minh:', 'documentType', 'select', 'select', [
        { value: '', label: '-- Chọn loại giấy tờ --' },
        { value: 'cccd', label: 'CMND/CCCD' },
        { value: 'passport', label: 'Hộ chiếu' },
        { value: 'business', label: 'Giấy phép kinh doanh' },
      ])}

      <Form.Group className="form-group mb-4">
        <Form.Label>Ảnh/PDF giấy tờ xác minh: <span className="text-danger">*</span></Form.Label>
        <Form.Control type="file" name="identityFile" accept="image/*,application/pdf" onChange={handleFileUpload} isInvalid={!!fieldErrors.identityFile} />
        <Form.Control.Feedback type="invalid">{fieldErrors.identityFile}</Form.Control.Feedback>
      </Form.Group>


      <Form.Group className="form-group mb-4">
        <Form.Label>Liên kết mạng xã hội:</Form.Label>
        <Form.Control
          type="text"
          name="socialLink"
          value={formData.socialLink}
          onChange={handleChange}
          isInvalid={!!fieldErrors.socialLink}
        />
        <Form.Control.Feedback type="invalid">{fieldErrors.socialLink}</Form.Control.Feedback>
      </Form.Group>
    

      <Form.Group className="form-group mb-4">
        <Form.Label>Video tự giới thiệu (tùy chọn):</Form.Label>
        <Form.Control type="file" name="introVideo" accept="video/*" onChange={handleFileUpload} />
      </Form.Group>

      <Button type="submit" className="become-host-button w-100 mt-4">Xác nhận</Button>
    </Form>
  );

  return loading ? <div className="text-center mt-5">Đang tải...</div> : alreadySent ? (
    <div className="become-host-container d-flex justify-content-center align-items-center min-vh-100">
      <Card className="become-host-card">
        <Card.Body className="text-center">
          <h3 className="text-danger mb-4">Bạn đã gửi yêu cầu!</h3>
          <p className="text-muted">Vui lòng chờ xét duyệt hoặc gửi lại sau khi bị từ chối.</p>
        </Card.Body>
      </Card>
    </div>
  ) : (
    <div className="become-host-container d-flex justify-content-center align-items-center min-vh-100">
      <Card className="become-host-card">
        <Card.Body>
          <div className="text-center mb-4">
            <h2 className="title">Trở thành Host - Traexco</h2>
            <p className="text-muted">Tham gia cộng đồng host và bắt đầu kiếm thu nhập từ homestay của bạn!</p>
          </div>
          {error && <Alert variant="danger" className="text-center mb-3">{error}</Alert>}
          {step === 1 && <Button className="become-host-button w-100" onClick={() => setStep(2)}>Đăng ký trở thành Host</Button>}
          {step === 2 && (
            <Modal show onHide={() => setStep(1)} centered>
              <Modal.Body className="text-center">
                <h4>Bạn muốn cung cấp loại nào?</h4>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  {[{ icon: <FaHome />, label: 'Nhà', value: 'house' }, { icon: <FaCompass />, label: 'Trải nghiệm', value: 'experience' }, { icon: <FaConciergeBell />, label: 'Dịch vụ', value: 'service' }].map(opt => (
                    <div key={opt.value} className={`option-label ${selectedType === opt.value ? 'selected' : ''}`} onClick={() => setSelectedType(opt.value)}>
                      <div className="option-icon mb-2">{opt.icon}</div>
                      <span>{opt.label}</span>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-between gap-3 mt-4">
                  <Button variant="secondary" className="w-50" onClick={() => setStep(1)}>Quay lại</Button>
                  <Button className="become-host-button w-50" onClick={() => selectedType ? setStep(3) : alert('Vui lòng chọn loại!')}>Xác nhận</Button>
                </div>
              </Modal.Body>
            </Modal>
          )}
          {step === 3 && <>{<Button variant="link" onClick={() => setStep(2)}>← Quay lại bước chọn loại</Button>}{renderForm()}</>}
        </Card.Body>
      </Card>
      <Modal show={!!message} onHide={() => setMessage('')} centered>
        <Modal.Body className="text-center">
          <h4 className="text-success">🎉 {message}</h4>
          <Button className="mt-3" onClick={() => setMessage('')}>Đóng</Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BecomeHost;

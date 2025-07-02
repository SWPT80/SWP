import React, { useState } from 'react';
import { Card, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const PaymentCheckout = ({ roomName, price, checkInDate, checkOutDate, onClose, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('1234');
  const [formData, setFormData] = useState({
    cardNumber: '4860 5432 6744 3789',
    expiryMonth: '02',
    expiryYear: '29',
    cvv: '234',
    firstName: 'Jane',
    lastName: 'Doe',
    address: '',
    city: '',
    country: 'United states',
    state: 'New York',
    zipCode: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApplyPromo = () => {
    console.log('Apply promo code:', promoCode);
  };

  const handlePayment = () => {
    console.log('Process payment with:', formData);
    onPaymentSuccess(); // Call success callback
  };

  return (
    <Row>
      <Col lg={7} className="pe-lg-4">
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body className="p-4">
            <h5 className="fw-bold mb-3">Chi tiết thanh toán</h5>
            <div className="mb-4">
              <Row>
                <Col md={6} className="mb-3">
                  <div
                    className={`border rounded p-3 text-center ${
                      paymentMethod === 'card' ? 'border-primary bg-light' : 'border-secondary'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="fw-bold">Thẻ tín dụng</span>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div
                    className={`border rounded p-3 text-center ${
                      paymentMethod === 'paypal' ? 'border-primary bg-light' : 'border-secondary'
                    }`}
                    onClick={() => setPaymentMethod('paypal')}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="fw-bold text-primary">PayPal</span>
                  </div>
                </Col>
              </Row>
            </div>

            {paymentMethod === 'card' && (
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Thông tin thẻ tín dụng</h6>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label className="small text-muted text-uppercase">Số thẻ</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      placeholder="1234 5678 9012 3456"
                    />
                  </Col>
                  <Col md={3} className="mb-3">
                    <Form.Label className="small text-muted text-uppercase">Hết hạn</Form.Label>
                    <Row>
                      <Col>
                        <Form.Select
                          size="sm"
                          value={formData.expiryMonth}
                          onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                        >
                          <option value="02">02</option>
                          <option value="01">01</option>
                          <option value="03">03</option>
                          <option value="04">04</option>
                          <option value="05">05</option>
                          <option value="06">06</option>
                          <option value="07">07</option>
                          <option value="08">08</option>
                          <option value="09">09</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </Form.Select>
                      </Col>
                      <Col>
                        <Form.Select
                          size="sm"
                          value={formData.expiryYear}
                          onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                        >
                          <option value="29">29</option>
                          <option value="24">24</option>
                          <option value="25">25</option>
                          <option value="26">26</option>
                          <option value="27">27</option>
                          <option value="28">28</option>
                          <option value="30">30</option>
                        </Form.Select>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={3} className="mb-3">
                    <Form.Label className="small text-muted text-uppercase">CVV</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      placeholder="123"
                      maxLength="4"
                    />
                  </Col>
                </Row>
              </div>
            )}

            <div className="mb-4">
              <h6 className="fw-bold mb-3">Thông tin thanh toán</h6>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="small text-muted text-uppercase">Họ</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Jane"
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label className="small text-muted text-uppercase">Tên</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Doe"
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label className="small text-muted text-uppercase">Địa chỉ</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Địa chỉ"
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label className="small text-muted text-uppercase">Thành phố</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Thành phố"
                  />
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Label className="small text-muted text-uppercase">Quốc gia</Form.Label>
                  <Form.Select
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                  >
                    <option value="United states">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Vietnam">Vietnam</option>
                  </Form.Select>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Label className="small text-muted text-uppercase">Tỉnh/Bang</Form.Label>
                  <Form.Select
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                  >
                    <option value="New York">New York</option>
                    <option value="California">California</option>
                    <option value="Da Nang">Đà Nẵng</option>
                  </Form.Select>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Label className="small text-muted text-uppercase">Mã ZIP</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    placeholder="12345"
                  />
                </Col>
              </Row>
            </div>

            <div className="mb-4">
              <p className="small text-muted">
                Bằng cách tiếp tục, tôi đồng ý với{' '}
                <a href="#" className="text-decoration-none">
                  Chính sách thanh toán
                </a>{' '}
                và hiểu rằng đăng ký của tôi sẽ tự động gia hạn vào cuối kỳ trừ khi tôi hủy.
              </p>
            </div>

            <Button variant="link" className="p-0 text-decoration-none" onClick={onClose}>
              <i className="bi bi-arrow-left me-2"></i> Quay lại
            </Button>
          </Card.Body>
        </Card>
      </Col>

      <Col lg={5}>
        <Card className="border-0 shadow-sm position-sticky" style={{ top: '20px' }}>
          <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center py-3">
            <h6 className="fw-bold mb-0">Tổng quan đơn hàng</h6>
            <Button variant="link" className="p-0 text-muted" onClick={onClose}>
              <i className="bi bi-x"></i>
            </Button>
          </Card.Header>
          <Card.Body className="px-4">
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6 className="fw-bold mb-1">{roomName}</h6>
                  <p className="small text-muted mb-0">{price} × 1 đêm</p>
                </div>
                <span className="fw-bold">{price}</span>
              </div>
            </div>

            <div className="mb-4">
              <Form.Control
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Mã khuyến mãi"
                size="sm"
              />
              <Button variant="outline-secondary" size="sm" className="mt-2" onClick={handleApplyPromo}>
                Áp dụng
              </Button>
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold mb-0">Tổng cộng</h6>
                <span className="fw-bold">{price}</span>
              </div>
              <p className="small text-muted mb-0">Đơn hàng sẽ được gia hạn vào {new Date().toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}</p>
            </div>

            <hr />

            <div className="mb-4">
              <p className="small text-muted">
                Tổng số tiền cuối cùng có thể khác do thuế hoặc phí địa phương.
              </p>
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Tổng cộng hôm nay</h5>
                <h5 className="fw-bold mb-0">{price}</h5>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <div className="bg-secondary rounded-circle me-2" style={{ width: '8px', height: '8px' }}></div>
                  <span className="small text-muted">Chưa có phương thức thanh toán</span>
                </div>
                <span className="small text-muted">-{price}</span>
              </div>

              <Button
                variant="success"
                size="lg"
                className="w-100 fw-bold"
                onClick={handlePayment}
                style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
              >
                Thanh toán ngay
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default PaymentCheckout;
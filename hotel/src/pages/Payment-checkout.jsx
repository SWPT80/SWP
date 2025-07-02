import React, { useState } from 'react';
import { Card, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';

const PaymentCheckout = ({
  roomName, homestayName, checkInDate, checkOutDate,
  guests, totalAmount, selectedServices, bookingId,
  onClose, onPaymentSuccess
}) => {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState(null);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    
    try {
      setIsProcessing(true);
      const response = await axios.get(`http://localhost:8080/api/vouchers/validate?code=${promoCode}`);
      if (response.data.valid) {
        setPromoDiscount(response.data.discount);
        setPromoError(null);
      } else {
        setPromoError('Mã khuyến mãi không hợp lệ hoặc đã hết hạn.');
        setPromoDiscount(0);
      }
    } catch (error) {
      setPromoError('Không thể xác minh mã khuyến mãi. Vui lòng thử lại.');
      setPromoDiscount(0);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      if (!bookingId) {
      throw new Error('Booking ID is missing');
    }
      const paymentData = {
        bookingId: bookingId,
        amount: totalAmount * (1 - promoDiscount),
        paymentMethod: paymentMethod.toUpperCase(),
        status: 'PENDING',
        paymentDetails: null
      };

      await axios.post('http://localhost:8080/api/payments', paymentData);
      onPaymentSuccess();
    } catch (error) {
      console.error('Lỗi khi xử lý thanh toán:', error);
      alert('Không thể xử lý thanh toán. Vui lòng thử lại.');
    } finally {
      setIsProcessing(false);
    }
  };

  const nights = checkInDate && checkOutDate
    ? Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24))
    : 0;

  const finalAmount = totalAmount * (1 - promoDiscount);
  const formattedTotal = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount);
  const formattedFinal = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(finalAmount);

  const paymentMethods = [
    { id: 'cash', label: 'Tiền mặt', icon: 'bi-wallet2', description: 'Thanh toán khi nhận phòng' },
    { id: 'vnpay', label: 'VNPay', icon: 'bi-credit-card', description: 'Thanh toán qua thẻ ngân hàng' },
    { id: 'qr', label: 'QR Code', icon: 'bi-qr-code', description: 'Quét mã QR để thanh toán' }
  ];

  return (
    <Row className="g-4">
      <Col lg={7}>
        <Card className="border-0 shadow-sm">
          <Card.Body className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold mb-0">Phương thức thanh toán</h4>
              <Button variant="link" className="p-0 text-decoration-none text-secondary" onClick={onClose}>
                <i className="bi bi-arrow-left me-2"></i> Quay lại
              </Button>
            </div>

            <div className="mb-4">
              <div className="row g-3">
                {paymentMethods.map((method) => (
                  <div className="col-md-6" key={method.id}>
                    <div
                      className={`card h-100 cursor-pointer ${paymentMethod === method.id ? 'border-primary bg-light' : 'border-light'}`}
                      onClick={() => setPaymentMethod(method.id)}
                      style={{ transition: 'all 0.2s' }}
                    >
                      <div className="card-body text-center py-4">
                        <div className="mb-3">
                          <i className={`bi ${method.icon} fs-2 ${paymentMethod === method.id ? 'text-primary' : 'text-secondary'}`}></i>
                        </div>
                        <h5 className={`fw-bold mb-2 ${paymentMethod === method.id ? 'text-primary' : ''}`}>
                          {method.label}
                        </h5>
                        <p className="small text-muted mb-0">{method.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h5 className="fw-bold mb-3">Mã khuyến mãi</h5>
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Nhập mã khuyến mãi"
                  className="flex-grow-1"
                />
                <Button 
                  variant="outline-primary" 
                  onClick={handleApplyPromo}
                  disabled={isProcessing || !promoCode.trim()}
                >
                  {isProcessing ? 'Đang xử lý...' : 'Áp dụng'}
                </Button>
              </div>
              {promoError && (
                <Alert variant="danger" className="mt-2 small py-2">
                  <i className="bi bi-exclamation-circle me-2"></i>
                  {promoError}
                </Alert>
              )}
              {promoDiscount > 0 && (
                <Alert variant="success" className="mt-2 small py-2">
                  <i className="bi bi-check-circle me-2"></i>
                  Đã áp dụng giảm giá {promoDiscount * 100}%
                </Alert>
              )}
            </div>

            <div className="border-top pt-3">
              <p className="small text-muted mb-0">
                Bằng cách tiếp tục, bạn đồng ý với{' '}
                <a href="#" className="text-primary text-decoration-none">Điều khoản dịch vụ</a> và{' '}
                <a href="#" className="text-primary text-decoration-none">Chính sách bảo mật</a> của chúng tôi.
              </p>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col lg={5}>
        <Card className="border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
          <Card.Body className="p-4">
            <h4 className="fw-bold mb-4">Tóm tắt đơn hàng</h4>

            <div className="mb-4">
              <h6 className="fw-bold mb-3">Thông tin đặt phòng</h6>
              <div className="bg-light p-3 rounded">
                <p className="mb-1"><strong>Homestay:</strong> {homestayName}</p>
                <p className="mb-1"><strong>Phòng:</strong> {roomName}</p>
                <p className="mb-1"><strong>Nhận phòng:</strong> {checkInDate ? new Date(checkInDate).toLocaleDateString('vi-VN') : 'N/A'}</p>
                <p className="mb-1"><strong>Trả phòng:</strong> {checkOutDate ? new Date(checkOutDate).toLocaleDateString('vi-VN') : 'N/A'}</p>
                <p className="mb-1"><strong>Số đêm:</strong> {nights} đêm</p>
                <p className="mb-0"><strong>Số khách:</strong> {guests}</p>
              </div>
            </div>

            <div className="mb-4">
              <h6 className="fw-bold mb-3">Chi tiết giá</h6>
              <div className="border-bottom pb-3 mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Giá phòng ({nights} đêm)</span>
                  <span>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                      totalAmount - selectedServices.reduce((sum, s) => {
                        let serviceCost = s.price;
                        if (s.specialNotes?.includes('per person')) serviceCost *= guests.replace(/[^0-9]/g, '');
                        if (s.specialNotes?.includes('per day')) serviceCost *= nights;
                        if (s.specialNotes?.includes('per person per day')) serviceCost *= guests.replace(/[^0-9]/g, '') * nights;
                        return sum + serviceCost;
                      }, 0)
                    )}
                  </span>
                </div>

                {selectedServices.length > 0 && (
                  <div className="mb-2">
                    <p className="small fw-bold mb-2">Dịch vụ bổ sung:</p>
                    {selectedServices.map((service, index) => (
                      <div key={index} className="d-flex justify-content-between small">
                        <span>
                          {service.name} {service.specialNotes && <span className="text-muted">({service.specialNotes})</span>}
                        </span>
                        <span>
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Tạm tính</span>
                <span>{formattedTotal}</span>
              </div>

              {promoDiscount > 0 && (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Giảm giá ({promoDiscount * 100}%)</span>
                  <span>-{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount * promoDiscount)}</span>
                </div>
              )}

              <div className="d-flex justify-content-between fw-bold fs-5 mt-3">
                <span>Tổng cộng</span>
                <span>{formattedFinal}</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-100 fw-bold py-3"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Đang xử lý...
                </>
              ) : (
                `Thanh toán ${formattedFinal}`
              )}
            </Button>

            <div className="text-center mt-3">
              <p className="small text-muted mb-0">
                <i className="bi bi-shield-lock me-2"></i>
                Thanh toán an toàn với mã hóa SSL
              </p>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default PaymentCheckout;
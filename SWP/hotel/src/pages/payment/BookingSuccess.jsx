import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Alert, Spinner, ListGroup, Badge } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from '../../utils/axiosConfig';

const BookingSuccess = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null); // **FIX: Thêm state cho thông tin thanh toán**
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const bookingId = queryParams.get('bookingId');
        const txnRef = queryParams.get('txnRef') || queryParams.get('orderId');
        const isDeposit = queryParams.get('isDeposit') === 'true'; // **FIX: Lấy thông tin isDeposit từ URL**

        if (!bookingId) {
          throw new Error('Không tìm thấy bookingId trong URL');
        }

        // **FIX: Lấy thông tin booking và payment**
        const [bookingResponse, paymentResponse] = await Promise.all([
          axios.get(`/api/bookings/${bookingId}`, {
            params: { includeDetails: true }
          }),
          // Lấy thông tin payment để hiển thị chính xác
          axios.get(`/api/payments/booking/${bookingId}/latest`).catch(() => ({ data: null }))
        ]);

        if (!bookingResponse.data) {
          throw new Error('Không có dữ liệu đặt phòng');
        }

        const bookingData = bookingResponse.data;

        if (Array.isArray(bookingData.serviceDetails)) {
          bookingData.services = bookingData.serviceDetails.map(service => ({
            id: service.id,
            serviceName: service.serviceType?.serviceName || `Dịch vụ #${service.id}`,
            price: service.price || 0,
            specialNotes: service.specialNotes || ''
          }));
        } else {
          bookingData.services = [];
        }

        setBookingDetails(bookingData);

        // **FIX: Set thông tin payment**
        if (paymentResponse.data) {
          setPaymentInfo({
            amount: paymentResponse.data.amount,
            isDeposit: paymentResponse.data.isDeposit || isDeposit,
            paymentMethod: paymentResponse.data.paymentMethod,
            status: paymentResponse.data.status,
            txnRef: txnRef
          });
        } else {
          // Fallback nếu không lấy được từ API
          setPaymentInfo({
            amount: isDeposit ? bookingData.totalAmount * 0.3 : bookingData.totalAmount,
            isDeposit: isDeposit,
            paymentMethod: 'Unknown',
            status: 'SUCCESS',
            txnRef: txnRef
          });
        }

      } catch (err) {
        console.error('Lỗi khi lấy thông tin đặt phòng:', err);
        setError(err.response?.status === 401
          ? 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.'
          : err.response?.data?.message || 'Không thể tải thông tin đặt phòng. Vui lòng liên hệ hỗ trợ.');
        if (err.response?.status === 401) {
          navigate('/admin/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [location, isLoggedIn, navigate]);

  const formattedAmount = (amount) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount || 0);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <Spinner animation="border" variant="primary" />
          <span className="ms-3">Đang tải thông tin đặt phòng...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5 text-center">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => navigate('/')}>
          Quay về trang chủ
        </Button>
      </Container>
    );
  }

  if (!bookingDetails) {
    return (
      <Container className="my-5 text-center">
        <Alert variant="warning">Không tìm thấy thông tin đặt phòng</Alert>
        <Button variant="primary" onClick={() => navigate('/')}>
          Quay về trang chủ
        </Button>
      </Container>
    );
  }

  // **FIX: Tính toán số tiền còn lại nếu là deposit**
  const remainingAmount = paymentInfo?.isDeposit ?
    (bookingDetails.totalAmount - (paymentInfo?.amount || 0)) : 0;

  return (
    <Container className="my-5">
      <Card className="shadow-sm">
        <Card.Body className="p-5">
          <h2 className="text-center mb-4 text-success">
            <i className="bi bi-check-circle-fill me-2"></i>
            {paymentInfo?.isDeposit ? 'Đã thanh toán cọc thành công!' : 'Đã thanh toán thành công!'}
          </h2>

          {/* **FIX: Thêm thông báo về deposit** */}
          {paymentInfo?.isDeposit && (
            <Alert variant="info" className="text-center mb-4">
              <i className="bi bi-info-circle-fill me-2"></i>
              Bạn đã thanh toán cọc thành công. Vui lòng thanh toán số tiền còn lại{' '}
              <strong>{formattedAmount(remainingAmount)}</strong> khi nhận phòng.
            </Alert>
          )}

          <div className="row">
            <div className="col-md-8 mx-auto">
              <Card className="mb-4">
                <Card.Header as="h4" className="bg-light">
                  Thông tin đặt phòng
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Mã đặt phòng:</strong> {bookingDetails.id}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Homestay:</strong> {bookingDetails.homestayName || 'N/A'}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Phòng:</strong> {bookingDetails.roomNumber || 'N/A'}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Ngày nhận phòng:</strong> {formatDate(bookingDetails.checkInDate)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Ngày trả phòng:</strong> {formatDate(bookingDetails.checkOutDate)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Số người lớn:</strong> {bookingDetails.adults || 0}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Số trẻ em:</strong> {bookingDetails.children || 0}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Trạng thái:</strong>
                      <Badge bg={bookingDetails.status === 'CONFIRMED' ? 'success' : 'warning'} className="ms-2">
                        {bookingDetails.status === 'CONFIRMED' ? 'Đã xác nhận' : 'Đang chờ xác nhận'}
                      </Badge>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>

              {/* **FIX: Thêm card thông tin thanh toán** */}
              <Card className="mb-4">
                <Card.Header as="h4" className="bg-light">
                  Thông tin thanh toán
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Loại thanh toán:</strong>
                      <Badge bg={paymentInfo?.isDeposit ? 'warning' : 'success'} className="ms-2">
                        {paymentInfo?.isDeposit ? 'Thanh toán cọc' : 'Thanh toán đầy đủ'}
                      </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Số tiền đã thanh toán:</strong> {formattedAmount(paymentInfo?.amount)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Tổng tiền đặt phòng:</strong> {formattedAmount(bookingDetails.totalAmount)}
                    </ListGroup.Item>
                    {paymentInfo?.isDeposit && (
                      <ListGroup.Item>
                        <strong>Số tiền còn lại:</strong>
                        <span className="text-danger fw-bold"> {formattedAmount(remainingAmount)}</span>
                        <small className="text-muted d-block">
                          (Thanh toán khi nhận phòng)
                        </small>
                      </ListGroup.Item>
                    )}
                    {paymentInfo?.txnRef && (
                      <ListGroup.Item>
                        <strong>Mã giao dịch:</strong> {paymentInfo.txnRef}
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                      <strong>Trạng thái thanh toán:</strong>
                      <Badge bg="success" className="ms-2">Thành công</Badge>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>

              {bookingDetails.services?.length > 0 && (
                <Card className="mb-4">
                  <Card.Header as="h4" className="bg-light">
                    Dịch vụ đã đặt
                  </Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      {bookingDetails.services.map((service, index) => (
                        <ListGroup.Item key={service.id || index}>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <strong>{service.serviceName}</strong>
                              {service.specialNotes && (
                                <div className="text-muted small">{service.specialNotes}</div>
                              )}
                            </div>
                            <div>{formattedAmount(service.price)}</div>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              )}

              <div className="text-center mt-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/my-bookings')}
                  className="me-3"
                >
                  Xem lịch sử đặt phòng
                </Button>
                <Button
                  variant="outline-primary"
                  size="lg"
                  onClick={() => navigate('/')}
                >
                  Quay về trang chủ
                </Button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookingSuccess;
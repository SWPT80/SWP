import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Collapse, Modal, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PaymentCheckout from './Payment-checkout';

const RoomDetails = () => {
  const { homestayId, roomNumber } = useParams();
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState(null);
  const [cancellationPolicies, setCancellationPolicies] = useState([]);
  const [homestayRules, setHomestayRules] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [messError, setMessError] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [showGuestOptions, setShowGuestOptions] = useState(false);
  const [selectedServices, setSelectedServices] = useState({});
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  // Thêm trạng thái cho thông tin khách hàng
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const fetchRoomDetails = async () => {
      setLoading(true);
      try {
        if (!homestayId || !roomNumber) {
          throw new Error('Thiếu homestayId hoặc roomNumber');
        }

        const roomDetailsResponse = await axios.get(
          `http://localhost:8080/api/rooms/${homestayId}/${roomNumber}`
        );
        const roomDetails = roomDetailsResponse.data;

        const reviewsResponse = await axios.get(
          `http://localhost:8080/api/reviews/room/${homestayId}/${roomNumber}`
        ).catch(() => ({ data: [] }));
        const reviews = reviewsResponse.data;

        const cancellationResponse = await axios.get(
          `http://localhost:8080/api/cancellation-policies/homestay/${homestayId}`
        ).catch(() => ({ data: [] }));
        setCancellationPolicies(cancellationResponse.data);

        const rulesResponse = await axios.get(
          `http://localhost:8080/api/homestay-rules/homestay/${homestayId}`
        ).catch(() => ({ data: [] }));
        setHomestayRules(rulesResponse.data);

        const servicesResponse = await axios.get(
          `http://localhost:8080/api/services/homestay/${homestayId}`
        ).catch(() => ({ data: [] }));
        setServices(servicesResponse.data);

        const initialServices = servicesResponse.data.reduce((acc, service) => {
          acc[service.id] = false;
          return acc;
        }, {});
        setSelectedServices(initialServices);

        setRoomData({
          roomName: roomDetails.room.type,
          name: roomDetails.homestay.homestayName,
          star: roomDetails.room.rating || (reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0),
          description: roomDetails.homestay.description || 'Không có mô tả',
          address: roomDetails.homestay.address || 'Không có địa chỉ',
          location: roomDetails.homestay.location || 'Không xác định',
          detailImageHomestay: roomDetails.images?.[0]?.imageUrl || roomDetails.homestayImages?.[0]?.imageUrl || '/images/homestay.jpg',
          price: roomDetails.room.price,
          capacity: roomDetails.room.capacity,
          status: roomDetails.room.status,
          reviews: reviews,
          amenities: roomDetails.amenities || [],
        });

        // Lấy thông tin khách hàng từ hệ thống xác thực (nếu có)
        // Ví dụ: Lấy từ localStorage hoặc API
        // const userId = localStorage.getItem('userId');
        // if (userId) {
        //   const userResponse = await axios.get(`http://localhost:8080/api/users/${userId}`);
        //   setCustomerInfo({
        //     fullName: userResponse.data.fullName || '',
        //     email: userResponse.data.email || '',
        //     phone: userResponse.data.phone || '',
        //     address: userResponse.data.address || '',
        //   });
        // }
      } catch (err) {
        console.error('Lỗi khi lấy chi tiết phòng:', err);
        setError('Không thể tải chi tiết phòng. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [homestayId, roomNumber]);

  const toggleGuestOptions = () => setShowGuestOptions(!showGuestOptions);

  const updateGuestCount = (type, delta) => {
    setGuests((prev) => {
      const updated = { ...prev };
      updated[type] = Math.max(0, updated[type] + delta);
      if (type === 'adults' && updated[type] === 0) updated[type] = 1;
      const totalGuests = updated.adults + updated.children + updated.infants;
      if (totalGuests > roomData?.capacity && delta > 0 && type !== 'pets') {
        setMessError(`Số khách vượt quá sức chứa tối đa (${roomData.capacity} người)`);
        return prev;
      }
      setMessError(null);
      return updated;
    });
  };

  const handleServiceChange = (serviceId) => {
    setSelectedServices((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };

  const calculateTotalAmount = () => {
    if (!checkInDate || !checkOutDate || !roomData) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    let total = nights * roomData.price;

    const totalGuests = guests.adults + guests.children + guests.infants;
    services.forEach((service) => {
      if (selectedServices[service.id]) {
        if (service.specialNotes?.includes('per person')) {
          total += service.price * totalGuests;
        } else if (service.specialNotes?.includes('per day')) {
          total += service.price * nights;
        } else if (service.specialNotes?.includes('per person per day')) {
          total += service.price * totalGuests * nights;
        } else {
          total += service.price;
        }
      }
    });

    return total;
  };

  const getSelectedServicesSummary = () => {
    return services
      .filter((service) => selectedServices[service.id])
      .map((service) => ({
        name: service.serviceType?.serviceName || 'Dịch vụ không xác định',
        price: service.price,
        specialNotes: service.specialNotes || '',
      }));
  };

  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateCustomerInfo = () => {
    if (!customerInfo.fullName) return 'Vui lòng nhập họ tên.';
    if (!customerInfo.email || !/\S+@\S+\.\S+/.test(customerInfo.email)) return 'Vui lòng nhập email hợp lệ.';
    if (!customerInfo.phone || !/^\d{10,11}$/.test(customerInfo.phone)) return 'Vui lòng nhập số điện thoại hợp lệ (10-11 số).';
    return null;
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setMessError(null);

  if (!checkInDate || !checkOutDate) {
    setMessError('Vui lòng chọn ngày nhận phòng và trả phòng');
    return;
  }
  if (new Date(checkOutDate) <= new Date(checkInDate)) {
    setMessError('Ngày trả phòng phải sau ngày nhận phòng');
    return;
  }
  const totalGuests = guests.adults + guests.children + guests.infants;
  if (totalGuests > roomData?.capacity) {
    setMessError(`Số khách vượt quá sức chứa tối đa (${roomData.capacity} người)`);
    return;
  }

  const bookingDTO = {
    userId: localStorage.getItem('userId') || 1, // Thay bằng logic xác thực thực tế
    homestayId: parseInt(homestayId),
    roomNumber: roomNumber,
    checkInDate: checkInDate,
    checkOutDate: checkOutDate,
    adults: guests.adults,
    children: guests.children,
    totalPeople: totalGuests,
    totalAmount: calculateTotalAmount(),
    services: Object.keys(selectedServices).filter((key) => selectedServices[key]).map(Number),
  };

  console.log('Sending booking DTO:', bookingDTO); // Thêm log để kiểm tra

  try {
    const response = await axios.post('http://localhost:8080/api/bookings', bookingDTO);
    console.log('Booking response:', response.data); // Thêm log để kiểm tra response
    setBookingId(response.data.id); // Đảm bảo response.data.id tồn tại
    setShowConfirmationModal(true);
  } catch (err) {
    console.error('Error response:', err.response?.data);
    setMessError(err.response?.data?.message || 'Không thể tạo đặt phòng. Vui lòng thử lại.');
  }
};
  const handleConfirmBooking = () => {
    console.log('Booking ID trước khi thanh toán:', bookingId);
    const validationError = validateCustomerInfo();
    if (validationError) {
        setMessError(validationError);
        return;
    }
    setShowConfirmationModal(false);
    setShowPaymentModal(true);
};

  if (loading) return <div className="text-center py-10">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!roomData) return null;

  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(calculateTotalAmount());

  const totalGuests = guests.adults + guests.children + guests.infants;
  const guestLabel = `${totalGuests} khách${guests.pets > 0 ? `, ${guests.pets} thú cưng` : ''}`;
  const nights = checkInDate && checkOutDate
    ? Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <Container className="my-4">
      <Row className="g-0 mb-4">
        <Col md={12}>
          <img
            src={`/${roomData.detailImageHomestay}`}
            alt="Phòng chính"
            className="w-100 rounded"
            style={{ height: '400px', objectFit: 'cover' }}
          />
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <h2 className="h3 mb-3">{roomData.roomName}</h2>
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-building text-muted me-2"></i>
                <span>{roomData.name}</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-geo-alt text-muted me-2"></i>
                <span>{roomData.address} ({roomData.location})</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-star-fill text-warning me-2"></i>
                <span>{roomData.star.toFixed(1)} sao</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-people text-muted me-2"></i>
                <span>Sức chứa: {roomData.capacity} người</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <i className={`bi bi-${roomData.status ? 'check-circle' : 'x-circle'} ${roomData.status ? 'text-success' : 'text-danger'} me-2`}></i>
                <span>Trạng thái: {roomData.status ? 'Còn trống' : 'Đã đặt'}</span>
              </div>
              <p className="text-muted mb-4">{roomData.description}</p>

              <h3 className="h4 mb-3">Tiện nghi chỗ ở</h3>
              <Row className="gy-3 mb-3">
                {roomData.amenities.map((amenity, index) => (
                  <Col key={index} xs={12} sm={6} md={4}>
                    <div className="d-flex align-items-center bg-light p-2 rounded shadow-sm">
                      <i className={`${amenity.iconClass || 'fas fa-check'} fs-5 me-3 text-primary`}></i>
                      <span className="fw-medium">{amenity.typeName}</span>
                    </div>
                  </Col>
                ))}
              </Row>

              <h3 className="h4 mb-3">Dịch vụ bổ sung</h3>
              {services.length > 0 ? (
                <Row>
                  {services.map((service, index) => (
                    <Col xs={6} md={4} key={index} className="mb-3">
                      <Card
                        className={`border ${selectedServices[service.id] ? 'border-primary' : ''}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleServiceClick(service)}
                      >
                        <Card.Body>
                          <Card.Title>{service.serviceType?.serviceName || 'Dịch vụ không xác định'}</Card.Title>
                          <Card.Text>
                            Giá: {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            }).format(service.price)}
                            {service.specialNotes ? `/${service.specialNotes}` : ''}
                          </Card.Text>
                          <Form.Check
                            type="checkbox"
                            label="Chọn dịch vụ này"
                            checked={selectedServices[service.id] || false}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleServiceChange(service.id);
                            }}
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <p className="text-muted">Không có dịch vụ bổ sung nào.</p>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-3 fw-bold">Quy tắc chung</h4>
              {homestayRules.length > 0 ? (
                <ul className="list-unstyled mb-0">
                  {homestayRules.map((rule, index) => (
                    <li key={index} className="mb-2">
                      <span className="fw-semibold text-dark">{rule.ruleName}</span>: <span className="text-muted">{rule.description}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">Không có quy tắc cụ thể.</p>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <h3 className="h4 mb-3">Đánh giá của khách</h3>
              {roomData.reviews.length > 0 ? (
                roomData.reviews.map((review, index) => (
                  <div key={index} className="mb-3 pb-3 border-bottom">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <strong>{review.userName || 'Ẩn danh'}</strong>
                        <span className="text-muted ms-2">({new Date(review.createdAt).toLocaleDateString('vi-VN')})</span>
                      </div>
                      <div className="d-flex">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`bi bi-star${i < Math.floor(review.rating) ? '-fill' : i < review.rating ? '-half' : ''} text-warning`}
                          ></i>
                        ))}
                      </div>
                    </div>
                    <p className="mb-0 text-muted">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted">Chưa có đánh giá nào.</p>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <h3 className="h4 mb-3">Chính sách hủy phòng</h3>
              {cancellationPolicies.length > 0 ? (
                <ul className="text-muted">
                  {cancellationPolicies.map((policy, index) => (
                    <li key={index}>
                      {policy.name}: {policy.description} (Hoàn tiền {policy.refundPercentage}% nếu hủy trước {policy.daysBeforeCheckin} ngày)
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">Không có chính sách hủy phòng cụ thể.</p>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <h3 className="h4 mb-3">Vị trí</h3>
              <div style={{ height: '300px', width: '100%' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.110419706312!2d108.245!3d16.0595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDAzJzM0LjIiTiAxMDjCsDE0JzUxLjAiRQ!5e0!3m2!1svi!2s!4v1625091234567"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="sticky-top" style={{ top: '20px' }}>
            <Card.Body>
              <h3 className="h4 mb-3">Tổng quan đặt phòng</h3>
              <div className="mb-3">
                <strong>Phòng:</strong> {roomData.roomName} <br />
                <strong>Homestay:</strong> {roomData.name} <br />
                <strong>Ngày nhận phòng:</strong> {checkInDate ? new Date(checkInDate).toLocaleDateString('vi-VN') : 'Chưa chọn'} <br />
                <strong>Ngày trả phòng:</strong> {checkOutDate ? new Date(checkOutDate).toLocaleDateString('vi-VN') : 'Chưa chọn'} <br />
                <strong>Số khách:</strong> {guestLabel} <br />
                <strong>Dịch vụ bổ sung:</strong>
                {getSelectedServicesSummary().length > 0 ? (
                  <ul className="list-unstyled mt-2">
                    {getSelectedServicesSummary().map((service, index) => (
                      <li key={index}>
                        {service.name}: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)} {service.specialNotes ? `/${service.specialNotes}` : ''}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-muted"> Không có dịch vụ nào được chọn.</span>
                )}
              </div>
              <h3 className="h4 mb-3">Tổng: {formattedPrice}</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nhận phòng</Form.Label>
                  <Form.Control
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Trả phòng</Form.Label>
                  <Form.Control
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    required
                    min={checkInDate ? new Date(new Date(checkInDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : ''}
                  />
                </Form.Group>

                <Form.Group className="mb-3 position-relative">
                  <Form.Label>Khách</Form.Label>
                  <div
                    className="form-control d-flex justify-content-between align-items-center"
                    onClick={toggleGuestOptions}
                    style={{ cursor: 'pointer' }}
                  >
                    <span>{guestLabel}</span>
                    <i className={`bi bi-chevron-${showGuestOptions ? 'up' : 'down'}`}></i>
                  </div>

                  <Collapse in={showGuestOptions}>
                    <Card className="mt-2">
                      <Card.Body>
                        {[
                          { label: 'Người lớn', desc: 'Từ 13 tuổi trở lên', key: 'adults' },
                          { label: 'Trẻ em', desc: 'Độ tuổi 2 – 12', key: 'children' },
                          { label: 'Em bé', desc: 'Dưới 2 tuổi', key: 'infants' },
                          { label: 'Thú cưng', desc: 'Mang theo thú cưng?', key: 'pets' },
                        ].map(({ label, desc, key }) => (
                          <div key={key} className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                              <div className="fw-bold">{label}</div>
                              <div className="text-muted small">{desc}</div>
                            </div>
                            <div className="d-flex align-items-center">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  updateGuestCount(key, -1);
                                }}
                                disabled={key === 'adults' && guests[key] <= 1}
                              >
                                -
                              </Button>
                              <span className="mx-2">{guests[key]}</span>
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  updateGuestCount(key, 1);
                                }}
                                disabled={totalGuests >= roomData.capacity && key !== 'pets'}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        ))}
                      </Card.Body>
                    </Card>
                  </Collapse>
                </Form.Group>

                {messError && <Alert variant="danger">{messError}</Alert>}

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-2 fw-bold"
                  disabled={!roomData.status}
                >
                  Xác nhận đặt phòng
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      
      {/* Modal Xác nhận thông tin khách hàng */}
      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận thông tin khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {/* Thông tin khách hàng - Cột trái */}
            <div className="col-md-6">
              <h5>Thông tin khách hàng</h5>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    value={customerInfo.fullName}
                    onChange={(e) => handleCustomerInfoChange('fullName', e.target.value)}
                    placeholder="Nhập họ và tên"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                    placeholder="Nhập email"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="text"
                    value={customerInfo.phone}
                    onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    type="text"
                    value={customerInfo.address}
                    onChange={(e) => handleCustomerInfoChange('address', e.target.value)}
                    placeholder="Nhập địa chỉ (không bắt buộc)"
                  />
                </Form.Group>
              </Form>
              {messError && <Alert variant="danger">{messError}</Alert>}
            </div>

            {/* Thông tin đặt phòng - Cột phải */}
            <div className="col-md-6">
              <h5>Thông tin đặt phòng</h5>
              <div className="mb-3">
                <strong>Homestay:</strong> {roomData?.name}
              </div>
              <div className="mb-3">
                <strong>Phòng:</strong> {roomData?.roomName}
              </div>
              <div className="mb-3">
                <strong>Ngày nhận phòng:</strong> {checkInDate ? new Date(checkInDate).toLocaleDateString('vi-VN') : 'Chưa chọn'}
              </div>
              <div className="mb-3">
                <strong>Ngày trả phòng:</strong> {checkOutDate ? new Date(checkOutDate).toLocaleDateString('vi-VN') : 'Chưa chọn'}
              </div>
              <div className="mb-3">
                <strong>Số đêm:</strong> {nights} đêm
              </div>
              <div className="mb-3">
                <strong>Số khách:</strong> {guestLabel}
              </div>
              <div className="mb-3">
                <strong>Dịch vụ bổ sung:</strong>
                {getSelectedServicesSummary().length > 0 ? (
                  <ul className="mt-2">
                    {getSelectedServicesSummary().map((service, index) => (
                      <li key={index}>
                        {service.name}: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)} {service.specialNotes ? `/${service.specialNotes}` : ''}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted mt-2">Không có dịch vụ nào được chọn.</p>
                )}
              </div>
              <div className="mb-3">
                <strong>Tổng chi phí:</strong> {formattedPrice}
              </div>
            </div>
          </div>
          <p className="text-muted small mt-3">Vui lòng kiểm tra kỹ thông tin trước khi xác nhận.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Quay lại
          </Button>
          <Button variant="primary" onClick={handleConfirmBooking}>
            Xác nhận và thanh toán
          </Button>
        </Modal.Footer>
      </Modal>

        {/* Modal Thanh toán */}
        <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Thanh toán</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PaymentCheckout
              roomName={roomData?.roomName}
              homestayName={roomData?.name}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              guests={guestLabel}
              totalAmount={calculateTotalAmount()}
              selectedServices={getSelectedServicesSummary()}
              bookingId={bookingId}
              customerInfo={customerInfo} // Truyền thông tin khách hàng
              onClose={() => setShowPaymentModal(false)}
              onPaymentSuccess={() => {
                setShowPaymentModal(false);
                navigate('/booking-success');
              }}
            />
          </Modal.Body>
        </Modal>

      {/* Modal Dịch vụ */}
      <Modal show={showServiceModal} onHide={() => setShowServiceModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedService?.serviceType?.serviceName || 'Dịch vụ không xác định'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedService?.images?.[0]?.imageUrl ? (
            <img
              src={`/${selectedService.images[0].imageUrl}`}
              alt={selectedService.serviceType?.serviceName || 'Dịch vụ'}
              className="w-100 mb-3"
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          ) : (
            <p className="text-muted">Không có hình ảnh cho dịch vụ này.</p>
          )}
          <p>
            <strong>Giá:</strong> {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(selectedService?.price || 0)}
            {selectedService?.specialNotes ? `/${selectedService.specialNotes}` : ''}
          </p>
          <p>
            <strong>Mô tả:</strong> {selectedService?.serviceType?.description || 'Không có mô tả'}
          </p>
          <Form.Check
            type="checkbox"
            label="Chọn dịch vụ này"
            checked={selectedServices[selectedService?.id] || false}
            onChange={() => handleServiceChange(selectedService?.id)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowServiceModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RoomDetails;
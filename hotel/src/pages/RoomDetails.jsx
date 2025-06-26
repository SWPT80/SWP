import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Collapse,
  Modal,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PaymentCheckout from './Payment-checkout';

const RoomDetails = () => {
  // Mock room data
  const roomData = {
    roomName: 'Phòng Deluxe View Biển',
    name: 'Sekong Hotel Đà Nẵng',
    star: 4,
    description:
      'Phòng Deluxe View Biển mang đến trải nghiệm nghỉ dưỡng sang trọng với ban công hướng biển, giường đôi thoải mái và không gian hiện đại. Chỉ cách bãi biển Mỹ Khê 2 phút đi bộ.',
    detailImageHomestay: '/images/homestay.jpg',
    detailImageRoom1: '/images/room1.jpg',
    detailImageRoom2: '/images/room2.jpg',
    detailImageRoom3: '/images/room3.jpg',
    id: '123',
  };

  const price = '1200000';
  const [messError, setMessError] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const reviews = [
    {
      name: 'Trần Minh',
      date: 'Tháng 3/2025',
      rating: 4,
      comment: 'Phòng sạch sẽ, view biển tuyệt vời!',
    },
    {
      name: 'Lê Hồng Phúc',
      date: 'Tháng 5/2025',
      rating: 3.5,
      comment: 'View đẹp, nhưng bữa sáng cần cải thiện.',
    },
  ];

  const hostData = {
    name: 'Nguyễn Văn Hùng',
    image: '/images/host.jpg',
    description:
      'Chào mừng bạn đến với căn hộ của tôi! Tôi là một người yêu du lịch và luôn sẵn sàng hỗ trợ bạn trong chuyến đi.',
  };

  const amenities = [
    { icon: 'bi-wifi', text: 'Wifi' },
    { icon: 'bi-tv', text: 'TV' },
    { icon: 'bi-snow', text: 'Điều hoà' },
    { icon: 'bi-microwave', text: 'Lò vi sóng' },
    { icon: 'bi-washing-machine', text: 'Máy giặt' },
    { icon: 'bi-droplet', text: 'Dầu gội' },
    { icon: 'bi-fridge', text: 'Tủ lạnh' },
    { icon: 'bi-hair-dryer', text: 'Máy sấy' },
    { icon: 'bi-droplet-fill', text: 'Xà phòng' },
    { icon: 'bi-fire', text: 'BBQ' },
  ];

  // Booking form logic
  const [showGuestOptions, setShowGuestOptions] = useState(false);
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const toggleGuestOptions = () => setShowGuestOptions(!showGuestOptions);

  const updateGuestCount = (type, delta) => {
    setGuests((prev) => {
      const updated = { ...prev };
      updated[type] = Math.max(0, updated[type] + delta);
      if (type === 'adults' && updated[type] === 0) updated[type] = 1;
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkInDate || !checkOutDate) {
      setMessError('Vui lòng chọn ngày nhận phòng và trả phòng');
      return;
    }
    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      setMessError('Ngày trả phòng phải sau ngày nhận phòng');
      return;
    }
    setShowPaymentModal(true); // Trigger payment modal
  };

  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(parseInt(price));

  const totalGuests = guests.adults + guests.children + guests.infants;
  const guestLabel = `${totalGuests} khách${guests.pets > 0 ? `, ${guests.pets} thú cưng` : ''}`;

  return (
    <Container className="my-4">
      {/* Room Images */}
      <Row className="g-0 mb-4">
        <Col md={8}>
          <img
            src={roomData.detailImageHomestay}
            alt="Main Room"
            className="w-100 rounded-start"
            style={{ height: '400px', objectFit: 'cover' }}
          />
        </Col>
        <Col md={4}>
          <Row className="g-0 h-100">
            <Col xs={12} className="h-50">
              <img
                src={roomData.detailImageRoom1}
                alt="Room 2"
                className="w-100"
                style={{ height: '100%', objectFit: 'cover' }}
              />
            </Col>
            <Col xs={12} className="h-50">
              <img
                src={roomData.detailImageRoom2}
                alt="Room 3"
                className="w-100 rounded-bottom-end"
                style={{ height: '100%', objectFit: 'cover' }}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          {/* Room Info */}
          <Card className="mb-4">
            <Card.Body>
              <h2 className="h3 mb-3">{roomData.roomName}</h2>
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-building text-muted me-2"></i>
                <span>{roomData.name}</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-geo-alt text-muted me-2"></i>
                <span>123 Đường Biển, Đà Nẵng</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-star-fill text-warning me-2"></i>
                <span>{roomData.star} sao</span>
              </div>
              <p className="text-muted mb-4">{roomData.description}</p>

              <h3 className="h4 mb-3">Tiện nghi chỗ ở</h3>
              <Row>
                {amenities.map((amenity, index) => (
                  <Col xs={6} md={4} key={index} className="mb-3">
                    <div className="d-flex align-items-center">
                      <i className={`bi ${amenity.icon} fs-5 me-2 text-primary`}></i>
                      <span>{amenity.text}</span>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
          {/*Quy tắc chung */}
          <Card className="mb-4">
            <Card.Body>
              <h3 className="h4 mb-3">Quy tắc chung</h3>
              <p className="mb-4">
                Hawai Boutique Villa Hoi An nhận yêu cầu đặc biệt - gửi yêu cầu trong bước kế tiếp!
              </p>

              <hr className="my-4" />

              <h4 className="h5 mb-3">Nhận phòng</h4>
              <div className="mb-4">
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-clock me-2"></i>
                  <div>
                    <strong>Trà phòng</strong>
                    <div>Từ 14:00 - 00:00</div>
                    <div>Từ 01:00 - 12:00</div>
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              <hr className="my-4" />

              <h4 className="h5 mb-3">Trẻ em và giường</h4>

              <div className="mb-3">
                <h5 className="h6 mb-2">Chính sách trẻ em</h5>
                <p>Phù hợp cho tất cả trẻ em.</p>
                <p>Trẻ em từ 12 tuổi trở lên sẽ được tính giá như người lớn tại chỗ nghỉ này.</p>
                <p>
                  Để xem thông tin giá và tình trạng phòng trống chính xác, vui lòng thêm số lượng và độ tuổi
                  của trẻ em trong nhóm của bạn khi tìm kiếm.
                </p>
              </div>

              <div>
                <h5 className="h6 mb-2">Chính sách nôi (cũi) và giường phụ</h5>
                <h6 className="h6 mb-2">0 - 4 tuổi</h6>
                <ul className="mb-0">
                  <li>Có nôi/cũi nếu yêu cầu</li>
                  <li>Miễn phí</li>
                </ul>
              </div>
            </Card.Body>
          </Card>



          {/* Reviews */}
          <Card className="mb-4">
            <Card.Body>
              <h3 className="h4 mb-3">Đánh giá của khách</h3>
              {reviews.map((review, index) => (
                <div key={index} className="mb-3 pb-3 border-bottom">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <strong>{review.name}</strong>
                      <span className="text-muted ms-2">({review.date})</span>
                    </div>
                    <div className="d-flex">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`bi bi-star${i < Math.floor(review.rating)
                              ? '-fill'
                              : i < review.rating
                                ? '-half'
                                : ''
                            } text-warning`}
                        ></i>
                      ))}
                    </div>
                  </div>
                  <p className="mb-0 text-muted">{review.comment}</p>
                </div>
              ))}
            </Card.Body>
          </Card>

          {/* Cancellation Policy */}
          <Card className="mb-4">
            <Card.Body>
              <h3 className="h4 mb-3">Chính sách hủy phòng</h3>
              <ul className="text-muted">
                <li>Miễn phí hủy phòng trước 48 giờ trước ngày nhận phòng.</li>
                <li>Hủy phòng trong vòng 48 giờ sẽ bị tính phí 50% giá phòng.</li>
                <li>Không hoàn tiền nếu hủy sau 24 giờ trước ngày nhận phòng.</li>
              </ul>
            </Card.Body>
          </Card>

          {/* Location */}
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


          {/* Host Info */}

          <Card className="mb-4">
            <Card.Body>
              <h3 className="h4 mb-3" style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold'
              }}>
                Thông tin chủ nhà
              </h3>
              <Row className="align-items-center">
                <Col xs={3} md={2}>
                  <div className="rounded-circle overflow-hidden" style={{
                    width: '100%',
                    paddingBottom: '100%',
                    position: 'relative',
                  }}>
                    <img
                      src={hostData.image}
                      alt={hostData.name}
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                </Col>
                <Col xs={9} md={7}>
                  <h4 className="h5 mb-1">{hostData.name}</h4>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-star-fill text-warning me-1"></i>
                    <span className="me-2">4.9</span>
                    <span className="text-muted me-2">•</span>
                    <span className="text-success">
                      <i className="bi bi-check-circle-fill me-1"></i>
                      Đã xác thực
                    </span>
                  </div>
                  <div className="mb-2">
                    <i className="bi bi-telephone text-primary me-2"></i>
                    <span>0987 123 456</span>
                  </div>
                  <div className="mb-2">
                    <i className="bi bi-envelope text-primary me-2"></i>
                    <span>tuannguyen@gmail.com</span>
                  </div>
                  <div>
                    <i className="bi bi-geo-alt text-primary me-2"></i>
                    <span>Quận 2, TP. Hồ Chí Minh</span>
                  </div>
                </Col>
                <Col xs={12} md={3} className="mt-2 mt-md-0">
                  <Button variant="primary" className="w-110">
                    <i className="bi bi-chat-left-text me-2"></i>
                    Chat với chủ nhà
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          {/* Booking Form */}
          <Card className="sticky-top" style={{ top: '20px' }}>
            <Card.Body>
              <h3 className="h4 mb-3">{formattedPrice} / đêm</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nhận phòng</Form.Label>
                  <Form.Control
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Trả phòng</Form.Label>
                  <Form.Control
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    required
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
                                disabled={totalGuests >= 5 && key !== 'pets'}
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

                {messError && <div className="alert alert-danger">{messError}</div>}

                <Button variant="primary" type="submit" className="w-100 py-2 fw-bold">
                  Đặt phòng ngay
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Thanh toán</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PaymentCheckout
            roomName={roomData.roomName}
            price={formattedPrice}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            onClose={() => setShowPaymentModal(false)}
            onPaymentSuccess={() => {
              setShowPaymentModal(false);
              // Add success handling logic here
            }}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default RoomDetails;
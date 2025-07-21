import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Table, Button, Form, Badge, ListGroup } from "react-bootstrap";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/styles/RoomDetails.css";

export default function Booked() {
  const [bookings, setBookings] = useState([]);
  const [roomData, setRoomData] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const [cancellationPolicies, setCancellationPolicies] = useState([]);
  const [homestayRules, setHomestayRules] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [error, setError] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/bookings/user/${userId}/latest`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const booking = res.data;
        setBookings([booking]);

        const [roomRes, reviewRes, cancelRes, rulesRes] = await Promise.all([
          axios.get(`/api/rooms/${booking.homestayId}/${booking.roomNumber}`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`/api/reviews/room/${booking.homestayId}/${booking.roomNumber}`, { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: [] })),
          axios.get(`/api/cancellation-policies/homestay/${booking.homestayId}`, { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: [] })),
          axios.get(`/api/homestay-rules/homestay/${booking.homestayId}`, { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: [] })),
        ]);

        const roomDetails = roomRes.data;
        setRoomData({
          roomName: roomDetails.room.type,
          name: roomDetails.homestay.homestayName,
          star: roomDetails.room.rating || (reviewRes.data.length > 0 ? reviewRes.data.reduce((sum, r) => sum + r.rating, 0) / reviewRes.data.length : 0),
          description: roomDetails.homestay.description || "Không có mô tả",
          address: roomDetails.homestay.address || "Không có địa chỉ",
          location: roomDetails.homestay.location || "Không xác định",
          detailImageHomestay: roomDetails.images?.[0]?.imageUrl || roomDetails.homestayImages?.[0]?.imageUrl || "/images/homestay.jpg",
          price: roomDetails.room.price,
          capacity: roomDetails.room.capacity,
          status: roomDetails.room.status,
          amenities: roomDetails.amenities || [],
        });
        setReviews(reviewRes.data);
        setCancellationPolicies(cancelRes.data);
        setHomestayRules(rulesRes.data);

        if (booking.status === "CONFIRMED") {
          handleBookingSelect(booking);
        }
      } catch (err) {
        setError("Failed to load bookings or room details: " + err.message);
        toast.error("Failed to load bookings or room details: " + err.message);
      }
    };

    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/topic/notifications/${userId}`, (message) => {
          const notification = JSON.parse(message.body);
          toast.info(notification.message);
          if (notification.type === "BOOKING_CREATED" || notification.type === "BOOKING_STATUS_UPDATE") {
            fetchBookings();
          }
        });
      },
      onStompError: (frame) => {
        setError("WebSocket connection failed: " + frame.headers.message);
        toast.error("WebSocket connection failed: " + frame.headers.message);
      },
    });
    client.activate();
    setStompClient(client);

    if (userId && token) {
      fetchBookings();
    } else {
      setError("Please log in to view your bookings.");
      toast.error("Please log in to view your bookings.");
    }

    return () => {
      client.deactivate();
    };
  }, [userId, token]);

  const handleBookingSelect = async (booking) => {
    setSelectedBooking(booking);
    try {
      const res = await axios.get(`http://localhost:8080/api/amenities/homestay/${booking.homestayId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAmenities(res.data.map((amenity) => ({ ...amenity, enabled: true })));
    } catch (err) {
      setError("Failed to load amenities: " + err.message);
      toast.error("Failed to load amenities: " + err.message);
    }
  };

  const handleAmenityToggle = (amenityId) => {
    setAmenities((prev) =>
      prev.map((amenity) =>
        amenity.typeId === amenityId ? { ...amenity, enabled: !amenity.enabled } : amenity
      )
    );
  };

  const submitAmenityReport = async () => {
    if (!selectedBooking) return;
    try {
      const reportDescription = amenities
        .map((a) => `- ${a.typeName}: ${a.enabled ? "Available" : "Not Available"}`)
        .join("\n");

      const report = {
        id: selectedBooking.id, // Sử dụng bookingId làm reportId
        description: reportDescription,
      };

      await axios.post(`http://localhost:8080/api/amenities/report`, report, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Amenity report submitted successfully!");
      setAmenities([]);
      setSelectedBooking(null);
    } catch (err) {
      setError("Failed to submit report: " + err.message);
      toast.error("Failed to submit report: " + err.message);
    }
  };

  if (error) {
    return (
      <Container className="text-center py-5">
        <ToastContainer />
        <div className="text-danger">{error}</div>
      </Container>
    );
  }

  if (!roomData || bookings.length === 0) {
    return (
      <Container className="text-center py-5">
        <ToastContainer />
        <div>Chưa có đặt phòng nào.</div>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <ToastContainer />
      <Row className="mb-4">
        <Col md={12}>
          <Card.Img
            variant="top"
            src={`/${roomData.detailImageHomestay}`}
            alt="Phòng chính"
            className="rounded"
            style={{ height: "400px", objectFit: "cover" }}
          />
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title as="h2" className="mb-3">{roomData.roomName}</Card.Title>
              <ListGroup variant="flush" className="mb-3">
                <ListGroup.Item className="d-flex align-items-center">
                  <i className="bi bi-building text-muted me-2"></i>
                  <span>{roomData.name}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center">
                  <i className="bi bi-geo-alt text-muted me-2"></i>
                  <span>{roomData.address} ({roomData.location})</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center">
                  <i className="bi bi-star-fill text-warning me-2"></i>
                  <span>{roomData.star.toFixed(1)} sao</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center">
                  <i className="bi bi-people text-muted me-2"></i>
                  <span>Sức chứa: {roomData.capacity} người</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center">
                  <i className={`bi bi-${roomData.status ? "check-circle" : "x-circle"} ${roomData.status ? "text-success" : "text-danger"} me-2`}></i>
                  <span>Trạng thái: {roomData.status ? "Còn trống" : "Đã đặt"}</span>
                </ListGroup.Item>
              </ListGroup>
              <Card.Text className="text-muted mb-4">{roomData.description}</Card.Text>

              <Card.Title as="h3" className="mb-3">Tiện nghi chỗ ở</Card.Title>
              <Row className="gy-3 mb-3">
                {roomData.amenities.map((amenity, index) => (
                  <Col key={index} xs={12} sm={6} md={4}>
                    <Card className="h-100">
                      <Card.Body className="d-flex align-items-center">
                        <i className={`${amenity.iconClass || "fas fa-check"} fs-5 me-3 text-primary`}></i>
                        <span className="fw-medium">{amenity.typeName}</span>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Card.Title as="h3" className="mb-3">Báo cáo tiện nghi</Card.Title>
              {selectedBooking && selectedBooking.status === "CONFIRMED" ? (
                <Form>
                  {amenities.map((amenity) => (
                    <Form.Check
                      key={amenity.typeId}
                      type="switch"
                      id={`amenity-${amenity.typeId}`}
                      label={amenity.typeName}
                      checked={amenity.enabled}
                      onChange={() => handleAmenityToggle(amenity.typeId)}
                    />
                  ))}
                  <Button
                    variant="primary"
                    className="mt-3"
                    onClick={submitAmenityReport}
                    disabled={amenities.length === 0}
                  >
                    Gửi báo cáo tiện nghi
                  </Button>
                </Form>
              ) : (
                <p>Vui lòng chọn một đặt phòng với trạng thái CONFIRMED để gửi báo cáo tiện nghi.</p>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title as="h4" className="mb-3">Quy tắc chung</Card.Title>
              {homestayRules.length > 0 ? (
                <ListGroup variant="flush">
                  {homestayRules.map((rule, index) => (
                    <ListGroup.Item key={index} className="mb-2">
                      <span className="fw-semibold text-dark">{rule.ruleName}</span>: <span className="text-muted">{rule.description}</span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p>Không có quy tắc cụ thể.</p>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title as="h3" className="mb-3">Đánh giá của khách</Card.Title>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <Card key={index} className="mb-3">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div>
                          <strong>{review.userName || "Ẩn danh"}</strong>
                          <span className="text-muted ms-2">({new Date(review.createdAt).toLocaleDateString("vi-VN")})</span>
                        </div>
                        <div className="d-flex">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`bi bi-star${i < Math.floor(review.rating) ? "-fill" : i < review.rating ? "-half" : ""} text-warning`}
                            ></i>
                          ))}
                        </div>
                      </div>
                      <Card.Text className="mb-0 text-muted">{review.comment}</Card.Text>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p>Chưa có đánh giá nào.</p>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title as="h3" className="mb-3">Chính sách hủy phòng</Card.Title>
              {cancellationPolicies.length > 0 ? (
                <ListGroup variant="flush">
                  {cancellationPolicies.map((policy, index) => (
                    <ListGroup.Item key={index}>
                      {policy.name}: {policy.description} (Hoàn tiền {policy.refundPercentage}% nếu hủy trước {policy.daysBeforeCheckin} ngày)
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p>Không có chính sách hủy phòng cụ thể.</p>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title as="h3" className="mb-3">Vị trí</Card.Title>
              <div style={{ height: "300px", width: "100%" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.110419706312!2d108.245!3d16.0595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDAzM0LjIiTiAxMDjCsDE0JzUxLjAiRQ!5e0!3m2!1svi!2s!4v1625091234567"
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
          <Card className="sticky-top" style={{ top: "20px", maxHeight: "90vh", overflowY: "auto" }}>
            <Card.Body>
              <Card.Title as="h3" className="mb-3">Your Bookings</Card.Title>
              <Table hover bordered responsive>
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Homestay</th>
                    <th>Room</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.homestayName}</td>
                      <td>{booking.roomNumber}</td>
                      <td>{new Date(booking.checkInDate).toLocaleDateString("vi-VN")}</td>
                      <td>{new Date(booking.checkOutDate).toLocaleDateString("vi-VN")}</td>
                      <td>
                        <Badge
                          bg={
                            booking.status === "PENDING"
                              ? "warning"
                              : booking.status === "CONFIRMED"
                              ? "primary"
                              : booking.status === "CANCELLED"
                              ? "danger"
                              : "secondary"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => handleBookingSelect(booking)}
                          disabled={booking.status !== "CONFIRMED"}
                        >
                          Check Amenities
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
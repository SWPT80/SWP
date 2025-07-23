import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Table, Modal, Badge } from "react-bootstrap";
import { useWebSocket } from "../../context/WebSocketContext";

export function BookingsTable({ hostId = 21 }) {
  const [bookings, setBookings] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userServices, setUserServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const { subscribe } = useWebSocket();

  // Lấy danh sách đặt phòng
  const fetchBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/bookings/homestay/${hostId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const updated = autoUpdateCheckOut(res.data);
      setBookings(updated);
    } catch (err) {
      console.error("Fetch bookings failed", err);
      setError("Failed to load bookings");
    }
  };

  // Tự động chuyển sang CHECKED_OUT nếu đã qua ngày
  const autoUpdateCheckOut = (data) => {
    const today = new Date();
    return data.map((item) => {
      const checkOut = new Date(item.checkOutDate);
      if (item.status === "CONFIRMED" && checkOut < today) {
        return { ...item, status: "CHECKED_OUT" };
      }
      return item;
    });
  };

  // Xem chi tiết đặt phòng
  const handleRowClick = async (booking) => {
    setSelectedUser(booking);
    setShowModal(true);

    try {
      const res = await axios.get(`http://localhost:8080/api/bookings/${booking.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUserServices(res.data.serviceDetails || []);
    } catch (err) {
      console.error("Error fetching service detail", err);
      setUserServices([]);
    }
  };

  // Cập nhật trạng thái đặt phòng
  const updateStatus = async (bookingId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8080/api/bookings/${bookingId}/status`,
        null,
        {
          params: { status: newStatus },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const updated = bookings.map((item) =>
        item.id === bookingId ? { ...item, status: newStatus } : item
      );
      setBookings(updated);
      setSelectedUser({ ...selectedUser, status: newStatus });
    } catch (err) {
      console.error("Update status failed", err);
      setError("Failed to update status: " + err.message);
    }
  };

  // Gọi khi component mount
  useEffect(() => {
    if (!hostId) return;
    fetchBookings();

    // 🧠 Lắng nghe thông báo WebSocket
    subscribe(`/topic/notifications/${hostId}`, (message) => {
      const notification = JSON.parse(message.body);
      if (
        notification.type === "BOOKING_CREATED" ||
        notification.type === "BOOKING_STATUS_UPDATE"
      ) {
        fetchBookings();
      }
    });
  }, [hostId, subscribe]);

  return (
    <>
      <Card className="mb-4">
        <Card.Header as="h5">Booking List</Card.Header>
        <Card.Body>
          {error && <div className="text-danger">{error}</div>}
          <Button onClick={fetchBookings} className="mb-3">
            Tải lại
          </Button>
          <Table hover bordered responsive>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Room Type</th>
                <th>Room Price</th>
                <th>Total People</th>
                <th>Total Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(item)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{item.userId}</td>
                  <td>{item.userName}</td>
                  <td>{item.email}</td>
                  <td>{item.checkInDate}</td>
                  <td>{item.checkOutDate}</td>
                  <td>{item.roomType}</td>
                  <td>{item.roomPrice?.toLocaleString()}</td>
                  <td>{item.totalPeople}</td>
                  <td>{item.totalAmount?.toLocaleString()}</td>
                  <td>
                    <Badge
                      bg={
                        item.status === "PENDING"
                          ? "warning"
                          : item.status === "CONFIRMED"
                          ? "primary"
                          : item.status === "CANCELLED"
                          ? "danger"
                          : item.status === "CHECKED_OUT"
                          ? "secondary"
                          : "info"
                      }
                    >
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal chi tiết */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Booking Detail - {selectedUser?.userName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>User ID:</strong> {selectedUser?.userId}</p>
          <p><strong>Email:</strong> {selectedUser?.email}</p>
          <p><strong>Full Name:</strong> {selectedUser?.userName}</p>
          <p><strong>Check In:</strong> {selectedUser?.checkInDate}</p>
          <p><strong>Check Out:</strong> {selectedUser?.checkOutDate}</p>
          <p><strong>Room Type:</strong> {selectedUser?.roomType}</p>
          <p><strong>Room Price:</strong> {selectedUser?.roomPrice?.toLocaleString()}</p>
          <p><strong>Total People:</strong> {selectedUser?.totalPeople}</p>
          <p><strong>Total Amount:</strong> {selectedUser?.totalAmount?.toLocaleString()}</p>
          <p><strong>Status:</strong> <Badge bg="info">{selectedUser?.status}</Badge></p>

          <h5 className="mt-3">Services Used:</h5>
          {userServices.length === 0 ? (
            <p>No services found</p>
          ) : (
            <ul>
              {userServices.map((s, idx) => (
                <li key={idx}>
                  {s.serviceType?.serviceName} - {s.price?.toLocaleString()} x {s.quantity || 1} = {(s.price * (s.quantity || 1)).toLocaleString()}
                </li>
              ))}
            </ul>
          )}

          <div className="d-flex gap-2 mt-3">
            {selectedUser?.status === "PENDING" && (
              <>
                <Button variant="primary" onClick={() => updateStatus(selectedUser.id, "CONFIRMED")}>
                  Chấp nhận
                </Button>
                <Button variant="danger" onClick={() => updateStatus(selectedUser.id, "CANCELLED")}>
                  Từ chối
                </Button>
              </>
            )}
            {selectedUser?.status === "CONFIRMED" && (
              <Button variant="secondary" disabled>
                Đã xác nhận
              </Button>
            )}
            {selectedUser?.status === "CHECKED_OUT" && (
              <Button variant="success" disabled>
                Đã hoàn tất
              </Button>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Đóng</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

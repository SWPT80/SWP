import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Table, Modal, Badge, Pagination } from "react-bootstrap";
import { useWebSocket } from "../../context/WebSocketContext";
import { useAuth } from "../../context/AuthContext";

export function BookingsTable() {
  const { user } = useAuth();
  const hostId = user?.id;
  const [bookings, setBookings] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userServices, setUserServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const { subscribe, connected } = useWebSocket();
  const [currentPage, setCurrentPage] = useState(0);
  const [paginatedBookings, setPaginatedBookings] = useState([]);
  const pageSize = 10;
  const [metrics, setMetrics] = useState({ totalBookings: 0, availableRooms: 0, revenue: 0 });

  const fetchBookings = async () => {
    if (!hostId) return;
    try {
      const res = await axios.get(`http://localhost:8080/api/bookings/host/${hostId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const updated = autoUpdateCheckOut(res.data);
      const sorted = updated.sort((a, b) => new Date(b.checkInDate) - new Date(a.checkInDate));
      setBookings(sorted);
      setError("");
    } catch (err) {
      console.error("Fetch bookings failed", err);
      setError("Failed to load bookings");
    }
  };

  const fetchMetrics = async () => {
    if (!hostId) return;
    try {
      const res = await axios.get(`http://localhost:8080/api/bookings/host/${hostId}/metrics`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMetrics(res.data);
    } catch (err) {
      console.error("Fetch metrics failed", err);
      setError("Failed to load metrics");
    }
  };

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
      setSelectedUser((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error("Update status failed", err);
      setError("Failed to update status: " + err.message);
    }
  };

  useEffect(() => {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    setPaginatedBookings(bookings.slice(startIndex, endIndex));
  }, [bookings, currentPage, pageSize]);

  const totalPages = Math.ceil(bookings.length / pageSize);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (!hostId || !connected) return;

    console.log("Subscribing to: /topic/notifications/" + hostId);
    fetchBookings();
    fetchMetrics();

    const subscription = subscribe(`/topic/notifications/${hostId}`, (message) => {
      const notification = JSON.parse(message.body);
      if (
        notification.type === "BOOKING_CREATED" ||
        notification.type === "BOOKING_STATUS_UPDATE"
      ) {
        fetchBookings();
        fetchMetrics();
      }
    });

    return () => {
      if (subscription && typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe();
      }
    };
  }, [hostId, connected]);

  return (
    <>
      <Card className="mb-4">
        <Card.Header as="h5">Booking List</Card.Header>
        <Card.Body>
          {error && <div className="text-danger mb-2">{error}</div>}
          <div className="mb-3">
            <h6>Metrics</h6>
            <p><strong>Total Bookings:</strong> {metrics.totalBookings}</p>
            <p><strong>Available Rooms:</strong> {metrics.availableRooms}</p>
            <p><strong>Revenue:</strong> {metrics.revenue?.toLocaleString()}</p>
          </div>
          <Button onClick={() => { fetchBookings(); fetchMetrics(); }} className="mb-3">
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
              {paginatedBookings.map((item, index) => (
                <tr key={index} onClick={() => handleRowClick(item)} style={{ cursor: "pointer" }}>
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
          {totalPages > 1 && (
            <Pagination className="justify-content-center mt-3">
              <Pagination.First
                onClick={() => handlePageChange(0)}
                disabled={currentPage === 0}
              />
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
              />
              {[...Array(totalPages).keys()].map((page) => (
                <Pagination.Item
                  key={page}
                  active={page === currentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
              />
              <Pagination.Last
                onClick={() => handlePageChange(totalPages - 1)}
                disabled={currentPage === totalPages - 1}
              />
            </Pagination>
          )}
        </Card.Body>
      </Card>

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

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Table, Modal, Badge, Pagination, Alert } from "react-bootstrap";
import { useWebSocket } from "../../context/WebSocketContext";
import { useAuth } from "../../context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';

export function BookingsTable() {
  const { user } = useAuth();
  const hostId = user?.id;
  const [bookings, setBookings] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userServices, setUserServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const { subscribe, connected } = useWebSocket();
  const [currentPage, setCurrentPage] = useState(0);
  const [paginatedBookings, setPaginatedBookings] = useState([]);
  const pageSize = 10;
  const [metrics, setMetrics] = useState({ totalBookings: 0, availableRooms: 0, revenue: 0 });

  const fetchBookings = async () => {
    if (!hostId) {
      setError("Không tìm thấy ID chủ nhà.");
      return;
    }
    try {
      const res = await axios.get(`http://localhost:8080/api/bookings/host/${hostId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const updated = autoUpdateCheckOut(res.data);
      const sorted = updated.sort((a, b) => new Date(b.checkInDate) - new Date(a.checkInDate));
      setBookings(sorted);
      setError(null);
    } catch (err) {
      console.error("Lỗi khi tải danh sách đặt phòng:", err);
      setError("Không thể tải danh sách đặt phòng. Vui lòng thử lại.");
    }
  };

  const fetchMetrics = async () => {
    if (!hostId) {
      setError("Không tìm thấy ID chủ nhà.");
      return;
    }
    try {
      const res = await axios.get(`http://localhost:8080/api/bookings/host/${hostId}/metrics`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMetrics(res.data);
      setError(null);
    } catch (err) {
      console.error("Lỗi khi tải số liệu:", err);
      setError("Không thể tải số liệu. Vui lòng thử lại.");
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
      setError(null);
    } catch (err) {
      console.error("Lỗi khi tải chi tiết dịch vụ:", err);
      setError("Không thể tải chi tiết dịch vụ. Vui lòng thử lại.");
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
      setError(null);
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái:", err);
      setError("Không thể cập nhật trạng thái: " + err.message);
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
    if (!hostId || !connected) {
      setError("Không thể kết nối hoặc thiếu ID chủ nhà.");
      return;
    }

    console.log("Đang đăng ký nhận thông báo tại: /topic/notifications/" + hostId);
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
  }, [hostId, connected, subscribe]);

  return (
    <>
      <Card className="mb-4">
        <Card.Header as="h5">Danh sách đặt phòng</Card.Header>
        <Card.Body>
          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          )}
          <div className="mb-3">
            <h6>Số liệu thống kê</h6>
            <p><strong>Tổng số đặt phòng:</strong> {metrics.totalBookings}</p>
            <p><strong>Phòng trống:</strong> {metrics.availableRooms}</p>
            <p><strong>Doanh thu:</strong> {metrics.revenue?.toLocaleString('vi-VN')}đ</p>
          </div>
          <Button onClick={() => { fetchBookings(); fetchMetrics(); }} className="mb-3">
            Tải lại
          </Button>
          <Table hover bordered responsive>
            <thead>
              <tr>
                <th>ID người dùng</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Ngày nhận phòng</th>
                <th>Ngày trả phòng</th>
                <th>Loại phòng</th>
                <th>Giá phòng</th>
                <th>Tổng số người</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBookings.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center">
                    Chưa có đặt phòng nào
                  </td>
                </tr>
              ) : (
                paginatedBookings.map((item, index) => (
                  <tr key={index} onClick={() => handleRowClick(item)} style={{ cursor: "pointer" }}>
                    <td>{item.userId}</td>
                    <td>{item.userName}</td>
                    <td>{item.email}</td>
                    <td>{item.checkInDate}</td>
                    <td>{item.checkOutDate}</td>
                    <td>{item.roomType}</td>
                    <td>{item.roomPrice?.toLocaleString('vi-VN')}đ</td>
                    <td>{item.totalPeople}</td>
                    <td>{item.totalAmount?.toLocaleString('vi-VN')}đ</td>
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
                        {item.status === "PENDING" ? "Đang chờ" :
                          item.status === "CONFIRMED" ? "Đã xác nhận" :
                            item.status === "CANCELLED" ? "Đã hủy" :
                              item.status === "CHECKED_OUT" ? "Đã trả phòng" : "Khác"}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
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
          <Modal.Title>Chi tiết đặt phòng - {selectedUser?.userName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>ID người dùng:</strong> {selectedUser?.userId}</p>
          <p><strong>Email:</strong> {selectedUser?.email}</p>
          <p><strong>Họ tên:</strong> {selectedUser?.userName}</p>
          <p><strong>Ngày nhận phòng:</strong> {selectedUser?.checkInDate}</p>
          <p><strong>Ngày trả phòng:</strong> {selectedUser?.checkOutDate}</p>
          <p><strong>Loại phòng:</strong> {selectedUser?.roomType}</p>
          <p><strong>Giá phòng:</strong> {selectedUser?.roomPrice?.toLocaleString('vi-VN')}đ</p>
          <p><strong>Tổng số người:</strong> {selectedUser?.totalPeople}</p>
          <p><strong>Tổng tiền:</strong> {selectedUser?.totalAmount?.toLocaleString('vi-VN')}đ</p>
          <p><strong>Trạng thái:</strong> <Badge bg="info">
            {selectedUser?.status === "PENDING" ? "Đang chờ" :
              selectedUser?.status === "CONFIRMED" ? "Đã xác nhận" :
                selectedUser?.status === "CANCELLED" ? "Đã hủy" :
                  selectedUser?.status === "CHECKED_OUT" ? "Đã trả phòng" : "Khác"}
          </Badge></p>
          <h5 className="mt-3">Dịch vụ sử dụng:</h5>
          {userServices.length === 0 ? (
            <p>Không có dịch vụ nào</p>
          ) : (
            <ul>
              {userServices.map((s, idx) => (
                <li key={idx}>
                  {s.serviceType?.serviceName} - {s.price?.toLocaleString('vi-VN')}đ x {s.quantity || 1} = {(s.price * (s.quantity || 1)).toLocaleString('vi-VN')}đ
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
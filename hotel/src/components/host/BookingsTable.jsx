import { useState, useEffect } from "react";
import { Card, Button, Table, Modal, Badge } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export function BookingsTable() {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const homestayId = 1; // Thay bằng homestayId thực tế từ AuthContext hoặc phiên người dùng
  const token = localStorage.getItem('token'); // Thay bằng cơ chế lấy token thực tế

  // Hàm định dạng ngày
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  // Lấy danh sách đặt phòng từ API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/bookings/homestay/${homestayId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const bookings = response.data.map((booking) => ({
          id: booking.id,
          name: booking.userName || "Khách hàng",
          email: booking.userEmail || "N/A",
          phone: booking.userPhone || "N/A",
          roomType: booking.roomType || "Unknown",
          roomNumber: booking.roomNumber,
          status: booking.status,
          services: booking.serviceDetails?.map((s) => s.serviceType?.serviceName || "Dịch vụ") || [],
          checkIn: formatDate(booking.checkInDate),
          checkOut: formatDate(booking.checkOutDate),
          paidAmount: booking.totalAmount ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(booking.totalAmount) : "0",
          dueAmount: "0", // Giả định không có khoản nợ, điều chỉnh nếu backend cung cấp
          paymentStatus: booking.paymentStatus || "Pending",
          paymentDate: formatDate(booking.paymentDate),
        }));
        setData(bookings);

        // Kiểm tra bookingId từ tham số truy vấn
        const bookingId = searchParams.get("bookingId");
        if (bookingId) {
          const booking = bookings.find((b) => b.id === parseInt(bookingId));
          if (booking) {
            setSelectedBooking(booking);
            setShowModal(true);
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đặt phòng:", error);
      }
    };

    fetchBookings();
  }, [searchParams]);

  // Cập nhật trạng thái đặt phòng
  const updateStatus = async (newStatus) => {
    try {
      await axios.put(
        `http://localhost:8080/api/bookings/${selectedBooking.id}/status`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            status: newStatus,
          },
        }
      );
      const updated = data.map((item) =>
        item.id === selectedBooking.id ? { ...item, status: newStatus } : item
      );
      setData(updated);
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
  };

  // Xử lý nhấp vào hàng
  const handleRowClick = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
    // Xóa tham số truy vấn bookingId khỏi URL
    navigate("/host/bookings", { replace: true });
  };

  // Tự động cập nhật trạng thái khi ngày trả phòng đã qua
  const autoUpdateCheckOut = () => {
    const today = new Date();
    const updated = data.map((item) => {
      const checkOutDate = new Date(item.checkOut.split("/").reverse().join("-"));
      if (item.status === "Booked" && today > checkOutDate) {
        return { ...item, status: "Check Out" };
      }
      return item;
    });
    setData(updated);
  };

  useEffect(() => {
    autoUpdateCheckOut();
  }, [data]);

  return (
    <>
      <Card className="mb-4">
        <Card.Header as="h5">Danh sách đặt phòng</Card.Header>
        <Card.Body>
          <Table hover bordered responsive>
            <thead>
              <tr>
                <th>Tên</th>
                <th>Loại phòng</th>
                <th>Số phòng</th>
                <th>Trạng thái</th>
                <th>Nhận phòng</th>
                <th>Trả phòng</th>
                <th>Đã thanh toán</th>
                <th>Ngày thanh toán</th>
                <th>Còn nợ</th>
                <th>Thanh toán</th>
              </tr>
            </thead>
            <tbody>
              {data.map((booking) => (
                <tr
                  key={booking.id}
                  onClick={() => handleRowClick(booking)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{booking.name}</td>
                  <td>{booking.roomType}</td>
                  <td>{booking.roomNumber}</td>
                  <td>{booking.paymentDate}</td>
                  <td>
                    <Badge
                      bg={
                        booking.status === "Check In"
                          ? "warning"
                          : booking.status === "Booked" || booking.status === "PENDING"
                          ? "primary"
                          : booking.status === "Check Out" || booking.status === "CONFIRMED"
                          ? "success"
                          : booking.status === "CANCELLED"
                          ? "danger"
                          : "secondary"
                      }
                    >
                      {booking.status === "PENDING" ? "Đang chờ" : booking.status === "CONFIRMED" ? "Đã xác nhận" : booking.status === "CANCELLED" ? "Đã hủy" : booking.status}
                    </Badge>
                  </td>
                  <td>{booking.checkIn}</td>
                  <td>{booking.checkOut}</td>
                  <td>{booking.paidAmount}</td>
                  <td>{booking.dueAmount}</td>
                  <td>
                    <Badge
                      bg={
                        booking.paymentStatus === "Success" || booking.paymentStatus === "APPROVED" ? "success" : "warning"
                      }
                    >
                      {booking.paymentStatus === "APPROVED" ? "Đã thanh toán" : "Đang chờ"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBooking?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Email:</strong> {selectedBooking?.email}</p>
          <p><strong>Số điện thoại:</strong> {selectedBooking?.phone}</p>
          <p><strong>Phòng:</strong> {selectedBooking?.roomType} - {selectedBooking?.roomNumber}</p>
          <p><strong>Nhận phòng:</strong> {selectedBooking?.checkIn}</p>
          <p><strong>Trả phòng:</strong> {selectedBooking?.checkOut}</p>
          <p><strong>Đã thanh toán:</strong> {selectedBooking?.paidAmount}</p>
          <p><strong>Còn nợ:</strong> {selectedBooking?.dueAmount}</p>
          <p><strong>Dịch vụ:</strong> {selectedBooking?.services.join(", ")}</p>
          <p><strong>Trạng thái:</strong> <Badge bg="info">{selectedBooking?.status === "PENDING" ? "Đang chờ" : selectedBooking?.status === "CONFIRMED" ? "Đã xác nhận" : selectedBooking?.status === "CANCELLED" ? "Đã hủy" : selectedBooking?.status}</Badge></p>
          <p><strong>Ngày thanh toán:</strong> {selectedBooking?.paymentDate}</p>   
          <div className="d-flex gap-2 mt-3">
            {selectedBooking?.status === "PENDING" && (
              <>
                <Button variant="primary" onClick={() => updateStatus("CONFIRMED")}>Chấp nhận (Đã xác nhận)</Button>
                <Button variant="danger" onClick={() => updateStatus("CANCELLED")}>Từ chối</Button>
              </>
            )}
            {selectedBooking?.status === "CONFIRMED" && (
              <Button variant="secondary" disabled>Đã xác nhận</Button>
            )}
            {selectedBooking?.status === "CANCELLED" && (
              <Button variant="danger" disabled>Đã hủy</Button>
            )}
          </div>

          <Button
            variant="info"
            className="mt-3"
            onClick={() => {
              setShowModal(false);
              setShowInvoice(true);
            }}
          >
            Xem hóa đơn
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Đóng</Button>
        </Modal.Footer>
      </Modal>

      {showInvoice && selectedBooking && (
        <Card className="mt-4">
          <Card.Header>
            <h5>Hóa đơn của {selectedBooking.name}</h5>
          </Card.Header>
          <Card.Body>
            <p><strong>Email:</strong> {selectedBooking.email}</p>
            <p><strong>Số điện thoại:</strong> {selectedBooking.phone}</p>
            <p><strong>Phòng:</strong> {selectedBooking.roomType} - {selectedBooking.roomNumber}</p>
            <p><strong>Nhận phòng:</strong> {selectedBooking.checkIn}</p>
            <p><strong>Trả phòng:</strong> {selectedBooking.checkOut}</p>
            <p><strong>Đã thanh toán:</strong> {selectedBooking.paidAmount}</p>
            <p><strong>Còn nợ:</strong> {selectedBooking.dueAmount}</p>
            <p><strong>Trạng thái thanh toán:</strong> {selectedBooking.paymentStatus === "APPROVED" ? "Đã thanh toán" : "Đang chờ"}</p>
            <p><strong>Dịch vụ:</strong> {selectedBooking.services.join(", ")}</p>
            <Button variant="secondary" onClick={() => setShowInvoice(false)}>
              Đóng hóa đơn
            </Button>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
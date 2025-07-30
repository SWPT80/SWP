import { Card, Table, Badge, Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export function Invoice() {
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="m-4">
        <Alert variant="danger">
          Không tìm thấy thông tin hóa đơn!
        </Alert>
      </div>
    );
  }

  const totalAmount = parseFloat(booking.paidAmount.replace("đ", "")) +
    parseFloat(booking.dueAmount.replace("đ", ""));

  return (
    <Card className="m-4">
      <Card.Header as="h4">Hóa đơn đặt phòng</Card.Header>
      <Card.Body>
        <p><strong>Khách hàng:</strong> {booking.name}</p>
        <p><strong>Email:</strong> {booking.email}</p>
        <p><strong>Số điện thoại:</strong> {booking.phone}</p>
        <p><strong>Phòng:</strong> {booking.roomType} ({booking.roomNumber})</p>
        <p><strong>Ngày ở:</strong> {booking.checkIn} - {booking.checkOut}</p>
        <p><strong>Dịch vụ:</strong> {booking.services.join(", ") || "Không có"}</p>

        <Table bordered>
          <thead>
            <tr>
              <th>Mục</th>
              <th>Số tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tổng cộng</td>
              <td>{totalAmount.toLocaleString('vi-VN')}đ</td>
            </tr>
            <tr>
              <td>Đã thanh toán</td>
              <td>{booking.paidAmount}</td>
            </tr>
            <tr>
              <td>Còn nợ</td>
              <td>{booking.dueAmount}</td>
            </tr>
            <tr>
              <td>Trạng thái thanh toán</td>
              <td>
                <Badge bg={booking.paymentStatus === "Success" ? "success" : "warning"}>
                  {booking.paymentStatus === "Success" ? "Thành công" : "Đang chờ"}
                </Badge>
              </td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
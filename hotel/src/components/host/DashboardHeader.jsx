import { Bell, ChevronDown } from "lucide-react";
import { Button, Badge, Dropdown } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

export function DashboardHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [stompClient, setStompClient] = useState(null);

  const hostId = 1; // Thay bằng hostId thực tế từ AuthContext hoặc phiên người dùng

  // Xác định tiêu đề dựa trên đường dẫn hiện tại
  const getTitle = () => {
    switch (location.pathname) {
      case '/host/rooms':
        return 'Phòng';
      case '/host/messages':
        return 'Tin nhắn';
      case '/host/billing':
        return 'Hệ thống thanh toán';
      case '/host/reports':
        return 'Báo cáo khách hàng';
      case '/host/services':
        return 'Dịch vụ';
      case '/host/dashboard':
        return 'Bảng điều khiển';
      case '/host/occupancy':
        return 'Tình trạng sử dụng';
      case '/host/bookings':
        return 'Đặt phòng';
      case '/host/rooms/allroom':
        return 'Tất cả phòng';
      case '/host/rooms/add':
        return 'Thêm phòng';
      case '/host/rooms/edit':
        return 'Sửa phòng';
      case '/host/rooms/pricing':
        return 'Giá phòng';
      case '/host/facilities':
        return 'Tiện nghi';
      default:
        return 'Bảng điều khiển';
    }
  };

  // Lấy thông báo khi component được gắn
  useEffect(() => {
    fetchNotifications();

    // Khởi tạo kết nối WebSocket
    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);
    client.connect({}, () => {
      client.subscribe(`/topic/notifications/${hostId}`, (message) => {
        const notification = JSON.parse(message.body);
        setNotifications((prev) => [notification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      });
    });
    setStompClient(client);

    // Ngắt kết nối WebSocket khi component bị hủy
    return () => {
      if (client && client.connected) {
        client.disconnect();
      }
    };
  }, []);

  // Hàm lấy thông báo
  const fetchNotifications = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/notifications/user/${hostId}/unread`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setNotifications(data);
      setUnreadCount(data.length);
    } catch (error) {
      console.error('Lỗi khi lấy thông báo:', error);
    }
  };

  // Hàm đánh dấu thông báo đã đọc và điều hướng
  const markAsRead = async (notificationId, notification) => {
    try {
      // Đánh dấu thông báo là đã đọc
      await fetch(`http://localhost:8080/api/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notificationId ? { ...notif, status: true } : notif
        )
      );
      setUnreadCount((prev) => prev - 1);

      // Nếu là thông báo đặt phòng mới, điều hướng đến trang bookings
      if (notification.type === 'BOOKING_CREATED') {
        const bookingIdMatch = notification.message.match(/Booking #(\d+)/);
        if (bookingIdMatch && bookingIdMatch[1]) {
          const bookingId = bookingIdMatch[1];
          navigate(`/host/bookings?bookingId=${bookingId}`);
        }
      }
    } catch (error) {
      console.error('Lỗi khi đánh dấu thông báo đã đọc:', error);
    }
  };

  return (
    <header className="d-flex align-items-center justify-content-between border-bottom bg-white px-3 py-3">
      <h2 className="ms-2">{getTitle()}</h2>
      <div className="d-flex align-items-center gap-3 me-5">
        {/* Chuông thông báo với menu thả xuống */}
        <Dropdown>
          <Dropdown.Toggle variant="light" id="notification-dropdown" className="position-relative p-0">
            <Button variant="light" size="sm">
              <Bell size={30} />
            </Button>
            {unreadCount > 0 && (
              <Badge
                pill
                bg="danger"
                className="position-absolute top-0 start-100 translate-middle"
                style={{ fontSize: "0.65rem" }}
              >
                {unreadCount}
              </Badge>
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto', width: '300px' }}>
            {notifications.length === 0 ? (
              <Dropdown.Item disabled>Không có thông báo mới</Dropdown.Item>
            ) : (
              notifications.map((notification) => (
                <Dropdown.Item
                  key={notification.id}
                  onClick={() => markAsRead(notification.id, notification)}
                  style={{
                    whiteSpace: 'normal',
                    backgroundColor: notification.status ? '#fff' : '#f8f9fa',
                  }}
                >
                  <div>
                    <strong>{notification.type === 'BOOKING_CREATED' ? 'Yêu cầu đặt phòng mới' : notification.type}</strong>
                    <p className="mb-0" style={{ fontSize: '0.9rem' }}>
                      {notification.message}
                    </p>
                    <small className="text-muted">
                      {new Date(notification.createdAt).toLocaleString()}
                    </small>
                  </div>
                </Dropdown.Item>
              ))
            )}
          </Dropdown.Menu>
        </Dropdown>

        {/* Ảnh đại diện người dùng */}
        <div className="ms-3">
          <img
            src="/placeholder.svg?height=32&width=32"
            alt="Người dùng"
            width={40}
            height={40}
            className="rounded-circle"
          />
        </div>
      </div>
    </header>
  );
}
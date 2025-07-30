// import { useLocation } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import NotificationDropdown from "../NotificationDropdown";

// export function DashboardHeader() {
//   const location = useLocation();
//   const { user } = useAuth();

//   const getTitle = () => {
//     switch (location.pathname) {
//       case "/rooms":
//         return "Rooms";
//       case "/messages":
//         return "Messages";
//       case "/billingsystem":
//         return "Billing System";
//       case "/customerreport":
//         return "Customer Report";
//       case "/hostservice":
//         return "Service";
//       case "/hostdashboard":
//         return "Dashboard";
//       case "/occupancy":
//         return "Occupancy";
//       case "/booking":
//         return "Booking";
//       case "/rooms/allroom":
//         return "All Room";
//       case "/rooms/addroom":
//         return "Add Room";
//       case "/rooms/editroom":
//         return "Edit Room";
//       case "/rooms/roompricing":
//         return "Room Pricing";
//       default:
//         return "Dashboard";
//     }
//   };

//   return (
//     <header className="d-flex align-items-center justify-content-between border-bottom bg-white px-3 py-3">
//       <h2 className="ms-2 mb-0 text-secondary">{getTitle()}</h2>
//     </header>
//   );
// }
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NotificationDropdown from "../NotificationDropdown";
import {
  Bell,
  Search,
  Settings,
  User,
  ChevronDown,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import '../../assets/styles/DashboardHeader.css';

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    title: "Đặt phòng mới",
    message: "Bạn có 1 đặt phòng mới từ Trần Thị B",
    time: "2 phút trước",
    unread: true
  },
  {
    id: 2,
    title: "Thanh toán thành công",
    message: "Thanh toán cho booking #12345 đã hoàn tất",
    time: "1 giờ trước",
    unread: true
  },
  {
    id: 3,
    title: "Đánh giá mới",
    message: "Khách hàng vừa để lại đánh giá 5 sao",
    time: "3 giờ trước",
    unread: false
  }
];

export function DashboardHeader() {
  const location = useLocation();
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [error, setError] = useState(null);

  // Check user info
  useEffect(() => {
    if (!user) {
      setError("Không tìm thấy thông tin người dùng.");
    } else {
      setError(null);
    }
  }, [user]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.notification-dropdown')) {
        setShowNotifications(false);
      }
      if (!event.target.closest('.user-menu-dropdown')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const getTitle = () => {
    switch (location.pathname) {
      case "/host/rooms":
        return "Quản lý phòng";
      case "/host/messages":
        return "Tin nhắn";
      case "/host/billing":
        return "Hệ thống thanh toán";
      case "/host/reports":
        return "Báo cáo khách hàng";
      case "/host/services":
        return "Dịch vụ";
      case "/host/dashboard":
        return "Bảng điều khiển Host";
      case "/host/occupancy":
        return "Công suất";
      case "/host/bookings":
        return "Đặt phòng";
      case "/host/rooms/add":
        return "Thêm phòng";
      case "/host/rooms/edit":
        return "Chỉnh sửa phòng";
      case "/host/rooms/pricing":
        return "Giá phòng";
      default:
        return "Bảng điều khiển Host";
    }
  };

  const unreadCount = mockNotifications.filter(n => n.unread).length;

  return (
    <header className="dashboard-header">
      {error && (
        <div className="error-alert">
          <span>{error}</span>
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <div className="header-container">
        {/* Left side */}
        <div className="header-left">
          {/* Page title */}
          <div className="page-info">
            <h1 className="page-title">{getTitle()}</h1>
            <p className="page-subtitle">
              Chào mừng trở lại, {user?.name || user?.fullName || 'Host'}
            </p>
          </div>
        </div>
        {/* Right side */}
        <div className="header-right">
          {/* Notifications dropdown */}
          <div className="d-flex align-items-center gap-3 me-4">
            {/* ✅ Notification Dropdown (icon chuông + badge + dropdown) */}
            {user && <NotificationDropdown theme="light" />}

            {/* ✅ Avatar (giả định) */}
            <div className="ms-2">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="User"
                width={40}
                height={40}
                className="rounded-circle"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
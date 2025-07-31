

import HeaderLogo from './Header-logo';
import HeaderUser from './Header-user';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Dropdown } from "react-bootstrap";
import NotificationDropdown from "../NotificationDropdown";
import '../../assets/css/AdminHeader.css'; // Import custom styles for the header
const Header = ({ onToggleSidebar, isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setError("Không tìm thấy thông tin người dùng.");
    } else {
      setError(null);
    }
  }, [user]);

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
      case "/host/rooms": return "Quản lý phòng";
      case "/host/messages": return "Tin nhắn";
      case "/host/billing": return "Hệ thống thanh toán";
      case "/host/reports": return "Báo cáo khách hàng";
      case "/host/services": return "Dịch vụ";
      case "/host/dashboard": return "Bảng điều khiển Host";
      case "/host/occupancy": return "Công suất";
      case "/host/bookings": return "Đặt phòng";
      case "/host/rooms/add": return "Thêm phòng";
      case "/host/rooms/edit": return "Chỉnh sửa phòng";
      case "/host/rooms/pricing": return "Giá phòng";
      default: return "Bảng điều khiển Host";
    }
  };

  const getAvatarPath = () => {
    if (!user || !user.email) return "/images/admin/avatars/default-admin.jpg";
    const email = user.email.toLowerCase();
    if (email === "hosta@example.com") return "/images/host/avatars/hosta.jpg";
    else if (email === "hostb@example.com") return "/images/host/avatars/hostb.jpg";
    else return "/images/host/avatars/default-host.jpg";
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="admin_header">
      <button onClick={onToggleSidebar} className="toggle-btn">
        ☰
        <a className="mobile_btn" id="mobile_btn">
          <i className="fas fa-bars"></i>
        </a>
      </button>
      <HeaderLogo isSidebarOpen={isOpen} />
      <header className="d-flex align-items-center justify-content-between border-bottom bg-white px-3 py-3">
        {/* <h2 className="ms-2 mb-0 text-secondary">{getTitle()}</h2> */}

        <div className="d-flex align-items-center h-50">
          {/* ✅ Notification Dropdown (icon chuông + badge + dropdown) */}
          {user && <NotificationDropdown theme="light" />}

          {/* ✅ Avatar (giả định) */}
          <Dropdown className="user-menu-dropdown">
            <Dropdown.Toggle variant="link" id="host-user-dropdown" className="nav-link p-0">
              <span className="user-img">
                <img
                  src={getAvatarPath()}
                  alt="Host"
                  className="rounded-circle"
                  width="40"
                  height="40"
                />
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <div className="user-header text-center p-3 border-bottom">
                <div className="avatar avatar-sm mb-2">
                  <img
                    src={getAvatarPath()}
                    alt="Người dùng"
                    className="avatar-img rounded-circle"
                    width="60"
                    height="60"
                  />
                </div>
                <div className="user-text">
                  <h6 className="mb-0">{user?.fullName || user?.name || "Host"}</h6>
                  <small className="text-muted">Chủ homestay</small>
                </div>
              </div>

              <Dropdown.Item href="/host/account-settings">Cài đặt tài khoản</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>


      {/* <HeaderUser /> */}
    </div>
  );
};

export default Header;
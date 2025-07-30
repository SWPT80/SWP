import React, { useEffect, useState } from "react";
import "../../assets/css/AdminHeader.css";
import { Dropdown, Nav, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/images/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NotificationDropdown from "../NotificationDropdown";

const Header = ({ onToggleSidebar }) => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:8080/api/notifications/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setNotifications(res.data);
          setError(null);
        })
        .catch((err) => {
          setError("Không thể tải thông báo.");
        });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:8080/api/admin/account/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setAdmin(res.data);
          setError(null);
        })
        .catch((err) => {
          setError("Không thể tải thông tin quản trị viên.");
        });
    }
  }, []);

  const getAvatarPath = () => {
    if (!admin || !admin.email) return "/images/admin/avatars/default-admin.jpg";
    const email = admin.email.toLowerCase();
    if (email === "hoangdhde180623@fpt.edu.vn") return "/images/admin/avatars/hahoang.jpg";
    else if (email === "hoangndhde180637@fpt.edu.vn") return "/images/admin/avatars/huyhoang.jpg";
    else if (email === "huyldnde180697@fpt.edu.vn") return "/images/admin/avatars/nhathuy.jpg";
    else if (email === "datltde180619@fpt.edu.vn") return "/images/admin/avatars/thanhdat.jpg";
    else if (email === "hoanglvmde180724@fpt.edu.vn") return "/images/admin/avatars/minhhoang.jpg";
    else return "/images/admin/avatars/default-admin.jpg";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="admin_header">
      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
      <button onClick={onToggleSidebar} className="toggle-btn">
        <i className="fas fa-bars"></i>
      </button>

      <div>
        <a href="/" className="logo" style={{ textDecoration: "none" }}>
          <img src={logo} width="50" height="70" alt="TRAEXCO logo" />
          <span className="logoclass">TRAEXCO</span>
        </a>
      </div>

      <Nav className="user-menu">
        <NotificationDropdown theme="dark" />
        {/* Thông báo Dropdown */}
        <Dropdown>
          <Dropdown.Menu className="notifications">
            <div className="topnav-dropdown-header">
              <span className="notification-title">Thông báo</span>
              <a href="#" className="clear-noti">Xóa tất cả</a>
            </div>
            <div className="noti-content">
              <ul className="notification-list">
                {notifications.length === 0 ? (
                  <li className="text-center text-muted p-2">Không có thông báo</li>
                ) : (
                  notifications.map((noti) => (
                    <li key={noti.id}>
                      <a href="#">
                        <div className="media">
                          <div className="media-body">
                            <p>{noti.message}</p>
                            <span className="text-muted small">
                              {new Date(noti.timestamp).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </a>
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div className="topnav-dropdown-footer">
              <a href="#">Xem tất cả thông báo</a>
            </div>
          </Dropdown.Menu>
        </Dropdown>

        {/* Người dùng Dropdown */}
        <Dropdown>
          <Dropdown.Toggle variant="link" id="user-dropdown" className="nav-link">
            <span className="user-img">
              <img
                className="rounded-circle"
                src={getAvatarPath()}
                width="31"
                alt="Quản trị viên"
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
                <h6 className="mb-0">{admin?.fullName || "Quản trị viên"}</h6>
                <small className="text-muted">Quản trị viên</small>
              </div>
            </div>

            <Dropdown.Item href="/admin/profile">Cài đặt tài khoản</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </div>
  );
};

export default Header;
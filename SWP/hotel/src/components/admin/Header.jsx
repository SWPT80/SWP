import React, { useEffect, useState } from "react";
import "../../assets/css/AdminHeader.css";
import { Dropdown, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/images/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = ({ onToggleSidebar }) => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:8080/api/notifications/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setNotifications(res.data);
        })
        .catch((err) => console.error("Failed to load notifications", err));
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
        })
        .catch((err) => {
          console.error("Failed to load admin info:", err);
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
        {/* Notifications Dropdown */}
        <Dropdown>
          <Dropdown.Toggle variant="link" id="notifications-dropdown" className="nav-link">
            <i className="fe fe-bell"></i>
            <span className="badge badge-pill">3</span>
          </Dropdown.Toggle>

          <Dropdown.Menu className="notifications">
            <div className="topnav-dropdown-header">
              <span className="notification-title">Notifications</span>
              <a href="#" className="clear-noti">Clear All</a>
            </div>
            <div className="noti-content">
              <ul className="notification-list">
                {notifications.length === 0 ? (
                  <li className="text-center text-muted p-2">No notifications</li>
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
              <a href="#">View all Notifications</a>
            </div>
          </Dropdown.Menu>
        </Dropdown>

        {/* User Dropdown */}
        <Dropdown>
          <Dropdown.Toggle variant="link" id="user-dropdown" className="nav-link">
            <span className="user-img">
              <img
                className="rounded-circle"
                src={getAvatarPath()}
                width="31"
                alt="Admin"
              />
            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <div className="user-header text-center p-3 border-bottom">
              <div className="avatar avatar-sm mb-2">
                <img
                  src={getAvatarPath()}
                  alt="User"
                  className="avatar-img rounded-circle"
                  width="60"
                  height="60"
                />
              </div>
              <div className="user-text">
                <h6 className="mb-0">{admin?.fullName || "Admin"}</h6>
                <small className="text-muted">Administrator</small>
              </div>
            </div>

            <Dropdown.Item href="/admin/profile">Account Settings</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </div>
  );
};

export default Header;

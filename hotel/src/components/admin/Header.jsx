import React from 'react';
import '../../assets/css/AdminHeader.css';
import { Dropdown, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/images/logo.png';
import NotificationDropdown from '../NotificationDropdown'; // Thêm dòng này

const Header = ({ onToggleSidebar }) => {
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
        {/* ✅ Đã thay thế chuông cứng bằng NotificationDropdown realtime */}
        <NotificationDropdown theme="dark" />

        {/* User Menu Dropdown giữ nguyên */}
        <Dropdown>
          <Dropdown.Toggle variant="link" id="user-dropdown" className="nav-link">
            <span className="user-img">
              <img className="rounded-circle" src="/img/a1.jpg" width="31" alt="Admin" />
            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <div className="user-header">
              <div className="avatar avatar-sm">
                <img
                  src="/img/a1.jpg"
                  alt="User"
                  className="avatar-img rounded-circle"
                />
              </div>
              <div className="user-text">
                <h6>Soeng Souy</h6>
                <p className="text-muted mb-0">Administrator</p>
              </div>
            </div>
            <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
            <Dropdown.Item href="/login">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </div>
  );
};

export default Header;

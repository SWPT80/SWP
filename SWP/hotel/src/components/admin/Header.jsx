import React from 'react';
import '../../assets/css/AdminHeader.css';
import { Dropdown, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import logo from '../../assets/images/logo.png';

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
                {[
                  {
                    name: "Carlson Tech",
                    message: "has approved your estimate",
                    avatar: "avatar-02.jpg",
                    time: "4 mins ago",
                  },
                  {
                    name: "International Software Inc",
                    message: "has sent you an invoice in the amount of $218",
                    avatar: "avatar-11.jpg",
                    time: "6 mins ago",
                  },
                  {
                    name: "John Hendry",
                    message: "sent a cancellation request for Apple iPhone XR",
                    avatar: "avatar-17.jpg",
                    time: "8 mins ago",
                  },
                  {
                    name: "Mercury Software Inc",
                    message: "added a new product Apple MacBook Pro",
                    avatar: "avatar-13.jpg",
                    time: "12 mins ago",
                  },
                ].map((noti, idx) => (
                  <li className="notification-message" key={idx}>
                    <a href="#">
                      <div className="media">
                        <span className="avatar avatar-sm">
                          <img
                            className="avatar-img rounded-circle"
                            alt="User"
                            src={`/img/profiles/${noti.avatar}`}
                          />
                        </span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">{noti.name}</span> {noti.message}
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">{noti.time}</span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="topnav-dropdown-footer">
              <a href="#">View all Notifications</a>
            </div>
          </Dropdown.Menu>
        </Dropdown>

        {/* User Menu Dropdown */}
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
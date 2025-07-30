import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/Sidebar.css';

const Sidebar = ({ isOpen }) => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuKey) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  return (
    <div className={`sidebar-wrapper ${isOpen ? 'open' : 'closed'}`} id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li>
              <Link to="dashboard">
                <i className="fas fa-tachometer-alt"></i> <span>Bảng điều khiển</span>
              </Link>
            </li>
            <li className="list-divider"></li>

            <li>
              <Link to="/admin/all-booking">
                <i className="fas fa-suitcase"></i> <span>Tất cả đặt phòng</span>
              </Link>
            </li>

            <li>
              <Link to="/admin/all-customer">
                <i className="fas fa-user"></i> <span>Tất cả khách hàng</span>
              </Link>
            </li>

            {/* Chủ nhà */}
            <li className={`submenu ${openMenus.hosts ? 'open' : ''}`}>
              <a href="#" onClick={() => toggleMenu('hosts')}>
                <i className="fas fa-user-shield"></i> <span>Chủ nhà</span> <span className="menu-arrow"></span>
              </a>
              <ul className="submenu_class" style={{ display: openMenus.hosts ? 'block' : 'none' }}>
                <li>
                  <Link to="/admin/all-hosts">
                    <i className="fas fa-user-shield"></i> <span>Tất cả chủ nhà</span>
                  </Link>
                </li>
                <li><Link to="/admin/host-requests">Yêu cầu chủ nhà</Link></li>
              </ul>
            </li>

            <li>
              <Link to="/admin/all-service">
                <i className="fas fa-concierge-bell"></i> <span>Tất cả dịch vụ</span>
              </Link>
            </li>

            <li>
              <Link to="/admin/pending-services">
                <i className="fas fa-concierge-bell"></i> <span>Dịch vụ đang chờ</span>
              </Link>
            </li>

            <li>
              <Link to="/admin/reports">
                <i className="far fa-table"></i> <span>Báo cáo</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
import { useState, useEffect } from "react";
import { Nav, Alert } from 'react-bootstrap';
import {
  BarChart3,
  Calendar,
  Home,
  MessageCircle,
  Star,
  CreditCard,
  Utensils,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import '../../assets/css/HostSidebar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const items = [
  { title: 'Bảng điều khiển', url: '/host/dashboard', icon: BarChart3 },
  {
    title: 'Phòng',
    icon: Home,
    submenu: [
      { title: 'Tất cả phòng', url: '/host/rooms' },
      { title: 'Giá phòng', url: '/host/rooms/pricing' },
    ],
  },
  { title: 'Tiện nghi phòng', url: '/host/facilities', icon: Utensils },
  { title: 'Công suất', url: '/host/occupancy', icon: Home },
  { title: 'Đặt phòng', url: '/host/bookings', icon: MessageCircle },
  { title: 'Tin nhắn', url: '/host/messages', icon: MessageCircle },
  { title: 'Báo cáo khách hàng', url: '/host/reports', icon: Star },
  { title: 'Hệ thống thanh toán', url: '/host/billing', icon: CreditCard },
  { title: 'Dịch vụ', url: '/host/services', icon: Utensils },
];

const AppSidebar = ({ isOpen }) => {
  const [openMenus, setOpenMenus] = useState({});
  const [error, setError] = useState('');

  const toggleMenu = (menuKey) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const location = useLocation();
  const [expandedItem, setExpandedItem] = useState(null);

  const handleToggle = (title) => {
    setExpandedItem(expandedItem === title ? null : title);
  };

  // Kiểm tra tính hợp lệ của menu
  const validateMenu = () => {
    if (items.length === 0) {
      setError('Không có mục menu nào để hiển thị.');
    } else {
      setError('');
    }
  };

  // Gọi validateMenu khi component mount
  useEffect(() => {
    validateMenu();
  }, []);

  return (
    <div className={`sidebar sidebar-wrapper ${isOpen ? 'open' : 'closed'}`} id="sidebar">
      {error && (
        <Alert variant="danger" onClose={() => setError('')} dismissible className="m-3">
          {error}
        </Alert>
      )}
      <Nav
        className="host-sidebar d-flex flex-column bg-light p-3"
        style={{ height: '100vh', borderRight: '1px solid #dee2e6' }}
      >
        {items.map((item) => (
          <div key={item.title}>
            {item.submenu ? (
              <>
                <Nav.Link
                  as="div"
                  onClick={() => handleToggle(item.title)}
                  className="d-flex align-items-center px-3 py-2 cursor-pointer"
                  style={{
                    backgroundColor: expandedItem === item.title ? '#f8f9fa' : 'transparent',
                  }}
                >
                  <item.icon className="me-2" size={20} />
                  <span>{item.title}</span>
                  <span className="ms-auto">
                    {expandedItem === item.title ? '▲' : '▼'}
                  </span>
                </Nav.Link>
                {expandedItem === item.title && (
                  <div className="ms-4">
                    {item.submenu.map((subItem) => (
                      <Nav.Link
                        key={subItem.title}
                        as={Link}
                        to={subItem.url}
                        active={location.pathname === subItem.url}
                        className="d-flex align-items-center px-3 py-1"
                        style={{ paddingLeft: '30px' }}
                      >
                        <span>{subItem.title}</span>
                      </Nav.Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Nav.Link
                key={item.title}
                as={Link}
                to={item.url}
                active={location.pathname === item.url}
                className="d-flex align-items-center px-3 py-2"
              >
                <item.icon className="me-2" size={20} />
                <span>{item.title}</span>
              </Nav.Link>
            )}
          </div>
        ))}
      </Nav>
    </div>
  );
}

export default AppSidebar;
import { useState } from "react";
import { Nav } from 'react-bootstrap';
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



const items = [
  { title: 'Dashboard', url: '/host/dashboard', icon: BarChart3 },

  {
    title: 'Rooms',
    icon: Home,
    submenu: [
      { title: 'All Rooms', url: '/host/rooms' },
      { title: 'Room Pricing', url: '/host/rooms/pricing' },
    ],
  },
  { title: 'Room Facilites', url: '/host/facilities', icon: Utensils },
  { title: 'Occupancy', url: '/host/occupancy', icon: Home },
  { title: 'Booking', url: '/host/bookings', icon: MessageCircle },
  { title: 'Messages', url: '/host/messages', icon: MessageCircle },
  { title: 'Customer Report', url: '/host/reports', icon: Star },
  { title: 'Billing System', url: '/host/billing', icon: CreditCard },
  { title: 'Service', url: '/host/services', icon: Utensils },
];


const AppSidebar = ({ isOpen }) => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuKey) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const location = useLocation();
  const [expandedItem, setExpandedItem] = useState(null);

  // Xử lý mở/đóng submenu
  const handleToggle = (title) => {
    setExpandedItem(expandedItem === title ? null : title);
  };

  return (
    <div className={`sidebar sidebar-wrapper ${isOpen ? 'open' : 'closed'}`} id="sidebar">
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
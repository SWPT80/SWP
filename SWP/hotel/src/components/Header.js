import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown, Button, Alert } from 'react-bootstrap';
import logo from '../assets/images/logo.png';
import '@fortawesome/fontawesome-free/css/all.css';
import LanguageSelectorModal from './LanguageModal';
import AuthModal from './LoginSignupForm';
import axios from 'axios';
import '../assets/styles/Header.css';
import NotificationDropdown from './NotificationDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userDropdownRef = useRef(null);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [messageDropdownOpen, setMessageDropdownOpen] = useState(false);
  const notificationDropdownRef = useRef(null);
  const messageDropdownRef = useRef(null);

  const handleDropdownClick = (e) => {
    e.stopPropagation();
    if (e.target.tagName === 'A') {
      setUserDropdownOpen(false);
      navigate(e.target.getAttribute('href'));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
        setNotificationDropdownOpen(false);
      }
      if (messageDropdownRef.current && !messageDropdownRef.current.contains(event.target)) {
        setMessageDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      console.log('Header - Token:', token);
      if (token) {
        try {
          const response = await axios.get('http://localhost:8080/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log('Header - User data:', response.data);
          setUser({
            fullName: response.data.fullName || response.data.email.split('@')[0],
            role: response.data.role ? response.data.role.toUpperCase() : null,
          });
          setUnreadNotifications(3);
          setUnreadMessages(2);
          setError('');
        } catch (err) {
          console.error('Lỗi khi tải thông tin người dùng:', err.response ? err.response.data : err.message);
          setError('Không thể tải thông tin người dùng. Vui lòng đăng nhập lại.');
          localStorage.removeItem('token');
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageSelect = (code) => {
    setCurrentLanguage(code);
    setIsLanguageModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setUserDropdownOpen(false);
    navigate('/');
  };

  const handleAuthSuccess = (userData) => {
    setUser({
      ...userData,
      role: userData.role ? userData.role.toUpperCase() : null
    });
    setIsAuthModalOpen(false);
    if (userData.role && userData.role.toUpperCase() === 'ADMIN') {
      navigate('/admin/dashboard', { replace: true });
    } else if (userData.role && userData.role.toUpperCase() === 'HOST') {
      navigate('/host/dashboard', { replace: true });
    }
  };

  const getUserInitial = () => {
    return user && user.fullName ? user.fullName.charAt(0).toUpperCase() : '';
  };

  return (
    <div className="super_container" style={{ position: 'relative', zIndex: 1050 }}>
      {error && (
        <Alert variant="danger" onClose={() => setError('')} dismissible style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 10000, maxWidth: '500px' }}>
          {error}
        </Alert>
      )}
      <Navbar
        expand="lg"
        className={`header ${isMenuOpen ? 'menu-open' : ''} ${isScrolled ? 'scrolled' : ''}`}
        style={{ background: 'rgba(54, 19, 84, 0.15)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="logo d-flex align-items-center">
            <img src={logo} alt="TraExCo Logo" style={{ width: '40px', height: '45px', marginRight: '10px', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }} />
            <span style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}>TraExCo</span>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="hamburger"
            style={{ color: 'white', border: '1px solid rgba(255, 255, 255, 0.2)', background: 'rgba(255, 255, 255, 0.1)' }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="fas fa-bars" style={{ fontSize: '24px' }}></i>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/" className="main_nav_item" style={{ color: 'white', fontSize: '16px', fontWeight: 500, textTransform: 'uppercase', padding: '10px 15px' }}>
                Trang chủ
              </Nav.Link>

              <Nav.Link as={Link} to="/offer" className="main_nav_item" style={{ color: 'white', fontSize: '16px', fontWeight: 500, textTransform: 'uppercase', padding: '10px 15px' }}>
                Ưu đãi
              </Nav.Link>

              {user && (
                <Nav.Link as={Link} to="/booked" className="main_nav_item" style={{ color: 'white', fontSize: '16px', fontWeight: 500, textTransform: 'uppercase', padding: '10px 15px' }}>
                  Đã đặt
                </Nav.Link>
              )}
            </Nav>
            <div className="right_nav d-flex align-items-center">
              <Button
                as={Link}
                to="/become-host"
                className="host_btn me-3"
                style={{
                  background: 'linear-gradient(135deg, #ffa500, #ff6b35)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '25px',
                  color: 'white',
                  fontWeight: 500,
                  padding: '8px 20px',
                  boxShadow: '0 4px 15px rgba(255, 165, 0, 0.3)',
                }}
              >
                Trở thành Host
              </Button>

              <div
                className="language_selector me-3"
                onClick={() => setIsLanguageModalOpen(true)}
                style={{
                  color: 'white',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '10px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                }}
              >
                <i className="fas fa-globe"></i>
              </div>

              {user && <NotificationDropdown />}

              <Dropdown show={userDropdownOpen} onToggle={() => setUserDropdownOpen(!userDropdownOpen)}>
                <Dropdown.Toggle
                  as="div"
                  className={`user_menu_icon ${user ? 'logged-in' : ''}`}
                  style={{
                    color: 'white',
                    fontSize: user ? '18px' : '20px',
                    cursor: 'pointer',
                    padding: '10px',
                    borderRadius: '50%',
                    background: user ? 'linear-gradient(135deg, #ffa500, #ff6b35)' : 'rgba(255, 255, 255, 0.1)',
                    border: user ? '2px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.2)',
                    minWidth: '40px',
                    minHeight: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: user ? 'bold' : 'normal',
                    boxShadow: user ? '0 4px 15px rgba(255, 165, 0, 0.3)' : 'none',
                  }}
                  ref={userDropdownRef}
                >
                  {user ? getUserInitial() : <i className="fas fa-bars"></i>}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  align="end"
                  className="user_dropdown"
                  ref={userDropdownRef}
                  onClick={handleDropdownClick}
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '10px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                    minWidth: '250px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    marginTop: '10px',
                  }}
                >
                  {user ? (
                    <>
                      <Dropdown.Item as={Link} to="/profiles" onClick={() => setUserDropdownOpen(false)} style={{ color: '#333', padding: '12px 20px' }}>
                        <i className="fas fa-user me-2"></i>{user.fullName}
                      </Dropdown.Item>
                      {user.role === 'ADMIN' && (
                        <Dropdown.Item as={Link} to="/admin/dashboard" onClick={() => setUserDropdownOpen(false)} style={{ color: '#333', padding: '12px 20px' }}>
                          <i className="fas fa-tachometer-alt me-2"></i>Trang quản trị Admin
                        </Dropdown.Item>
                      )}
                      {user.role === 'HOST' && (
                        <Dropdown.Item as={Link} to="/host/dashboard" onClick={() => setUserDropdownOpen(false)} style={{ color: '#333', padding: '12px 20px' }}>
                          <i className="fas fa-home me-2"></i>Trang quản trị Host
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item as={Link} to="/booked" onClick={() => setUserDropdownOpen(false)} style={{ color: '#333', padding: '12px 20px' }}>
                        <i className="fas fa-calendar-check me-2"></i>Đặt phòng của tôi
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/wishlists" onClick={() => setUserDropdownOpen(false)} style={{ color: '#333', padding: '12px 20px' }}>
                        <i className="fas fa-heart me-2"></i>Danh sách yêu thích
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/become-host" onClick={() => setUserDropdownOpen(false)} style={{ color: '#333', padding: '12px 20px' }}>
                        <i className="fas fa-home me-2"></i>Trở thành Host
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/find-host" onClick={() => setUserDropdownOpen(false)} style={{ color: '#333', padding: '12px 20px' }}>
                        <i className="fas fa-search me-2"></i>Tìm Host
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout} style={{ color: '#d9534f', padding: '12px 20px' }}>
                        <i className="fas fa-sign-out-alt me-2"></i>Đăng xuất
                      </Dropdown.Item>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item onClick={() => { setIsAuthModalOpen(true); setUserDropdownOpen(false); }} style={{ color: '#333', padding: '12px 20px' }}>
                        <i className="fas fa-sign-in-alt me-2"></i>Đăng nhập hoặc Đăng ký
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/become-host" onClick={() => setUserDropdownOpen(false)} style={{ color: '#333', padding: '12px 20px' }}>
                        <i className="fas fa-home me-2"></i>Trở thành Host
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/find-host" onClick={() => setUserDropdownOpen(false)} style={{ color: '#333', padding: '12px 20px' }}>
                        <i className="fas fa-search me-2"></i>Tìm Host
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item as={Link} to="/support" onClick={() => setUserDropdownOpen(false)} style={{ color: '#333', padding: '12px 20px' }}>
                        <i className="fas fa-question-circle me-2"></i>Hỗ trợ
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className={`menu trans_500 ${isMenuOpen ? 'active' : ''}`}>
        <div className="menu_content d-flex flex-column align-items-center justify-content-center text-center">
          <div className="menu_close_container" onClick={() => setIsMenuOpen(false)}>
            <div className="menu_close"></div>
          </div>
          <div className="logo menu_logo">
            <Link to="/">
              <img src={logo} alt="TraExCo Logo" />
            </Link>
          </div>
          <ul id="menuItems">
            <li className="menu_item"><Link to="/" onClick={() => setIsMenuOpen(false)}>Trang chủ</Link></li>
            <li className="menu_item"><Link to="/about" onClick={() => setIsMenuOpen(false)}>Giới thiệu</Link></li>
            <li className="menu_item"><Link to="/offers" onClick={() => setIsMenuOpen(false)}>Ưu đãi</Link></li>
            {user && (
              <li className="menu_item"><Link to="/booked" onClick={() => setIsMenuOpen(false)}>Đã đặt</Link></li>
            )}
            <li className="menu_item"><Link to="/news" onClick={() => setIsMenuOpen(false)}>Tin tức</Link></li>
            <li className="menu_item"><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Liên hệ</Link></li>
            {user ? (
              <>
                <li className="menu_item">
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                    <i className="fas fa-user mr-2"></i>{user.fullName}
                  </Link>
                </li>
                {user.role && user.role.toUpperCase() === 'ADMIN' && (
                  <li className="menu_item">
                    <Link to="/admin/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <i className="fas fa-tachometer-alt mr-2"></i>Trang quản trị Admin
                    </Link>
                  </li>
                )}
                {user.role && user.role.toUpperCase() === 'HOST' && (
                  <li className="menu_item">
                    <Link to="/host/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <i className="fas fa-home mr-2"></i>Trang quản trị Host
                    </Link>
                  </li>
                )}
                <li className="menu_item">
                  <Link to="/notifications" onClick={() => setIsMenuOpen(false)}>
                    <i className="fas fa-bell mr-2"></i>Thông báo {unreadNotifications > 0 && <span className="badge">{unreadNotifications}</span>}
                  </Link>
                </li>
                <li className="menu_item">
                  <Link to="/messages" onClick={() => setIsMenuOpen(false)}>
                    <i className="fas fa-envelope mr-2"></i>Tin nhắn {unreadMessages > 0 && <span className="badge">{unreadMessages}</span>}
                  </Link>
                </li>
                <li className="menu_item">
                  <a href="#" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                    <i className="fas fa-sign-out-alt mr-2"></i>Đăng xuất
                  </a>
                </li>
              </>
            ) : (
              <li className="menu_item">
                <a href="#" onClick={() => { setIsAuthModalOpen(true); setIsMenuOpen(false); }}>
                  <i className="fas fa-sign-in-alt mr-2"></i>Đăng nhập hoặc Đăng ký
                </a>
              </li>
            )}
            <li className="menu_item">
              <Link to="/become-host" onClick={() => setIsMenuOpen(false)}>
                <i className="fas fa-home mr-2"></i>Trở thành Host
              </Link>
            </li>
            <li className="menu_item">
              <Link to="/find-host" onClick={() => setIsMenuOpen(false)}>
                <i className="fas fa-search mr-2"></i>Tìm Host
              </Link>
            </li>
            <li className="menu_item">
              <Link to="/support" onClick={() => setIsMenuOpen(false)}>
                <i className="fas fa-question-circle mr-2"></i>Hỗ trợ
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {isLanguageModalOpen && (
        <LanguageSelectorModal
          onSelect={handleLanguageSelect}
          onClose={() => setIsLanguageModalOpen(false)}
        />
      )}
      {isAuthModalOpen && (
        <AuthModal
          show={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
};

export default Header;
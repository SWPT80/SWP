import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown, Button, Modal } from 'react-bootstrap';
import logo from '../assets/images/logo.png';
import '@fortawesome/fontawesome-free/css/all.css';
import LanguageSelectorModal from './LanguageModal';
import AuthModal from './LoginSignupForm';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../assets/styles/Header.css';

const Header = () => {
  const { user, isLoggedIn, isLoading, checkAuth, setUser, setIsLoggedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [hasRedirected, setHasRedirected] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userDropdownRef = useRef(null);
  const hasRedirectedRef = useRef(false);

  useEffect(() => {
    if (isLoading) return; // Đợi trạng thái xác thực
    console.log('Header - isLoggedIn:', isLoggedIn, 'user:', user);
    if (isLoggedIn && user) {
      const fetchNotifications = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:8080/api/notifications/user/${user.id}/unread`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log('Header - Unread notifications:', response.data);
          setUnreadNotifications(response.data.length);
        } catch (error) {
          console.error('Header - Error fetching notifications:', error.response?.data || error.message);
          setUnreadNotifications(0);
        }
      };
      fetchNotifications();
      setUnreadMessages(2); // Thay bằng API thực tế
    } else {
      setUnreadNotifications(0);
      setUnreadMessages(0);
      setHasRedirected(false);
    }
  }, [isLoggedIn, user, isLoading]);

  useEffect(() => {
    if (isLoading) return;
    // Chỉ redirect khi đang ở trang chủ và chưa redirect
    if (user && user.role && location.pathname === '/' && !hasRedirectedRef.current) {
      if (user.role === 'ADMIN') {
        navigate('/admin/dashboard', { replace: true });
      } else if (user.role === 'HOST') {
        navigate('/host/dashboard', { replace: true });
      }
      hasRedirectedRef.current = true;
    }
    // Reset lại khi user logout hoặc về trạng thái chưa đăng nhập
    if (!user || !user.role) {
      hasRedirectedRef.current = false;
    }
  }, [user, location.pathname, navigate, isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (code) => {
    setCurrentLanguage(code);
    setIsLanguageModalOpen(false);
  };

  const handleLogout = () => {
    console.log('Header - Logging out');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
    setIsLoggedIn(false);
    setUserDropdownOpen(false);
    setUnreadNotifications(0);
    setUnreadMessages(0);
    hasRedirectedRef.current = false;
    navigate('/admin/login', { replace: true });
  };

  const handleAuthSuccess = async (userData) => {
    console.log('Header - Auth success, userData:', userData);
    try {
      await checkAuth();
      setIsAuthModalOpen(false);
      hasRedirectedRef.current = true;
      if (userData.role === 'ADMIN') {
        navigate('/admin/dashboard', { replace: true });
      } else if (userData.role === 'HOST') {
        navigate('/host/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('Header - Error during auth success:', error.response?.data || error.message);
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      setUser(null);
      setIsLoggedIn(false);
      setUnreadNotifications(0);
      setUnreadMessages(0);
      setIsAuthModalOpen(false);
      hasRedirectedRef.current = false;
      navigate('/admin/login', { replace: true });
    }
  };

  const getUserInitial = () => {
    return user && user.fullName ? user.fullName.charAt(0).toUpperCase() : '';
  };

  return (
    <div className="super_container" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1050, background: 'transparent' }}>
      <Navbar
        expand="lg"
        className={`header ${isScrolled ? 'scrolled' : ''}`}
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
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="main_nav_item" style={{ color: 'white', fontSize: '16px', fontWeight: 500, textTransform: 'uppercase', padding: '10px 15px' }}>
                About Us
              </Nav.Link>
              <Nav.Link as={Link} to="/offer" className="main_nav_item" style={{ color: 'white', fontSize: '16px', fontWeight: 500, textTransform: 'uppercase', padding: '10px 15px' }}>
                Offers
              </Nav.Link>
              <Nav.Link as={Link} to="/news" className="main_nav_item" style={{ color: 'white', fontSize: '16px', fontWeight: 500, textTransform: 'uppercase', padding: '10px 15px' }}>
                News
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" className="main_nav_item" style={{ color: 'white', fontSize: '16px', fontWeight: 500, textTransform: 'uppercase', padding: '10px 15px' }}>
                Contact
              </Nav.Link>
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
                >
                  {user ? getUserInitial() : <i className="fas fa-bars"></i>}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  align="end"
                  className="user_dropdown"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '10px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                    minWidth: '250px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    marginTop: '10px',
                  }}
                  ref={userDropdownRef}
                >
                  {user ? (
                    <>
                      <Dropdown.Item as={Link} to="/profile" onClick={() => setUserDropdownOpen(false)} style={{ color: '#333', padding: '12px 20px' }}>
                        <i className="fas fa-user me-2"></i>{user.fullName}
                      </Dropdown.Item>
                      {user.role === 'HOST' && (
                        <Dropdown.Item as={Link} to="/host/dashboard" onClick={() => setUserDropdownOpen(false)} style={{ color: '#333', padding: '12px 20px' }}>
                          <i className="fas fa-tachometer-alt me-2"></i>Bảng điều khiển Host
                        </Dropdown.Item>
                      )}
                      {user.role === 'ADMIN' && (
                        <Dropdown.Item as={Link} to="/admin/dashboard" onClick={() => setUserDropdownOpen(false)} style={{ color: '#333', padding: '12px 20px' }}>
                          <i className="fas fa-tachometer-alt me-2"></i>Bảng điều khiển Admin
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item as={Link} to="/become-host" onClick={() => setUserDropdownOpen(false)} style={{ color: '#333', padding: '12px 20px' }}>
                        <i className="fas fa-home me-2"></i>Trở thành Host
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/find-host" onClick={() => setUserDropdownOpen(false)} style={{ color: '#333', padding: '12px 20px' }}>
                        <i className="fas fa-search me-2"></i>Tìm Host
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/notifications" onClick={() => setUserDropdownOpen(false)} style={{ color: '#333', padding: '12px 20px' }}>
                        <i className="fas fa-bell me-2"></i>Thông báo{' '}
                        {unreadNotifications > 0 && (
                          <span className="badge" style={{ background: '#ff4444', color: 'white', fontSize: '12px', padding: '2px 6px', borderRadius: '10px', marginLeft: '8px' }}>
                            {unreadNotifications}
                          </span>
                        )}
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/messages" onClick={() => setUserDropdownOpen(false)} style={{ color: '#333', padding: '12px 20px' }}>
                        <i className="fas fa-envelope me-2"></i>Tin nhắn{' '}
                        {unreadMessages > 0 && (
                          <span className="badge" style={{ background: '#ff4444', color: 'white', fontSize: '12px', padding: '2px 6px', borderRadius: '10px', marginLeft: '8px' }}>
                            {unreadMessages}
                          </span>
                        )}
                      </Dropdown.Item>
                      <Dropdown.Divider style={{ background: 'rgba(0, 0, 0, 0.1)', margin: '5px 0' }} />
                      <Dropdown.Item as="a" href="#" onClick={handleLogout} style={{ color: '#333', padding: '12px 20px' }}>
                        <i className="fas fa-sign-out-alt me-2"></i>Đăng xuất
                      </Dropdown.Item>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item as="a" href="#" onClick={() => { setIsAuthModalOpen(true); setUserDropdownOpen(false); }} style={{ color: '#333', padding: '12px 20px' }}>
                        <i className="fas fa-sign-in-alt me-2"></i>Đăng nhập hoặc Đăng ký
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/become-host" onClick={() => setUserDropdownOpen(false)} style={{ color: '#333', padding: '12px 20px' }}>
                        <i className="fas fa-home me-2"></i>Trở thành Host
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/find-host" onClick={() => setUserDropdownOpen(false)} style={{ color: '#333', padding: '12px 20px' }}>
                        <i className="fas fa-search me-2"></i>Tìm Host
                      </Dropdown.Item>
                      <Dropdown.Divider style={{ background: 'rgba(0, 0, 0, 0.1)', margin: '5px 0' }} />
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
      <Modal
        show={isLanguageModalOpen}
        onHide={() => setIsLanguageModalOpen(false)}
        centered
        style={{ zIndex: 2000 }}
      >
        <LanguageSelectorModal
          onSelect={handleLanguageSelect}
          onClose={() => setIsLanguageModalOpen(false)}
        />
      </Modal>
      <Modal
        show={isAuthModalOpen}
        onHide={() => setIsAuthModalOpen(false)}
        centered
        style={{ zIndex: 2000 }}
      >
        <AuthModal
          show={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      </Modal>
    </div>
  );
};

export default Header;
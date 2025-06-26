import React, { useState, useEffect, useRef } from 'react';
import '../assets/styles/responsive.css';
import '../assets/styles/Header.css';
import logo from '../assets/images/logo.png';
import '@fortawesome/fontawesome-free/css/all.css';
import LanguageSelectorModal from './LanguageModal'; 
import { Modal, Button, Form, Tab, Tabs } from 'react-bootstrap';

const AuthModal = ({ show, onClose }) => {
  const [key, setKey] = useState('login');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., API call for login/register)
    console.log('Form submitted');
    onClose();
  };

  const handleSocialLogin = (provider) => {
    // Placeholder for social login (e.g., redirect to OAuth flow)
    console.log(`Login with ${provider}`);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Đăng nhập hoặc Đăng ký</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          id="auth-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="login" title="Đăng nhập">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Nhập email" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="loginPassword">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control type="password" placeholder="Nhập mật khẩu" required />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Đăng nhập
              </Button>
            </Form>
          </Tab>
          <Tab eventKey="register" title="Đăng ký">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="registerName">
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control type="text" placeholder="Nhập họ và tên" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="registerEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Nhập email" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="registerPassword">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control type="password" placeholder="Nhập mật khẩu" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="registerConfirmPassword">
                <Form.Label>Xác nhận mật khẩu</Form.Label>
                <Form.Control type="password" placeholder="Xác nhận mật khẩu" required />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Đăng ký
              </Button>
            </Form>
          </Tab>
        </Tabs>

        {/* Social Login Options */}
        <div className="social-login-section mt-4">
          <h6 className="text-center mb-3">hoặc</h6>
          <Button
            variant="outline-secondary"
            className="social-btn w-100 mb-2"
            onClick={() => handleSocialLogin('Google')}
          >
            <i className="fab fa-google"></i> Tiếp tục với Google
          </Button>
          <Button
            variant="outline-secondary"
            className="social-btn w-100 mb-2"
            onClick={() => handleSocialLogin('Apple')}
          >
            <i className="fab fa-apple"></i> Tiếp tục với Apple
          </Button>
          <Button
            variant="outline-secondary"
            className="social-btn w-100 mb-2"
            onClick={() => handleSocialLogin('Email')}
          >
            <i className="far fa-envelope"></i> Tiếp tục bằng email
          </Button>
          <Button
            variant="outline-secondary"
            className="social-btn w-100 mb-2"
            onClick={() => handleSocialLogin('Facebook')}
          >
            <i className="fab fa-facebook-f"></i> Tiếp tục với Facebook
          </Button>
          <Button
            variant="outline-secondary"
            className="social-btn w-100 mb-2"
            onClick={() => handleSocialLogin('Zalo')}
          >
            <i className="fab fa-zalo" style={{ color: '#0068ff' }}></i> Tiếp tục với Zalo
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const userDropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (code) => {
    setCurrentLanguage(code);
  };

  return (
    <div className="super_container">
      <header className={`header ${isMenuOpen ? 'menu-open' : ''} ${isScrolled ? 'scrolled' : ''}`}>
        {/* Top Bar */}
        <div className="top_bar">
          <div className="container">
            <div className="row">
              <div className="col d-flex flex-row align-items-center">
                <div className="phone">TraExco_fpt@gmail.com</div>
                <div className="social ml-auto">
                  <ul className="social_list">
                    <li className="social_list_item"><a href="#"><i className="fab fa-pinterest"></i></a></li>
                    <li className="social_list_item"><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                    <li className="social_list_item"><a href="#"><i className="fab fa-twitter"></i></a></li>
                    <li className="social_list_item"><a href="#"><i className="fab fa-dribbble"></i></a></li>
                    <li className="social_list_item"><a href="#"><i className="fab fa-behance"></i></a></li>
                    <li className="social_list_item"><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <nav className="main_nav">
          <div className="container">
            <div className="row">
              <div className="col main_nav_col d-flex flex-row align-items-center justify-content-between">
                <div className="logo_container">
                  <div className="logo"><a href="#"><img src={logo} alt=""/>TraExCo</a></div>
                </div>
                <div className="main_nav_container d-none d-lg-flex">
                  <ul className="main_nav_list">
                    <li className="main_nav_item"><a href="#">home</a></li>
                    <li className="main_nav_item"><a href="about.html">about us</a></li>
                    <li className="main_nav_item"><a href="offers.html">offers</a></li>
                    <li className="main_nav_item"><a href="blog.html">news</a></li>
                    <li className="main_nav_item"><a href="contact.html">contact</a></li>
                  </ul>
                </div>

                {/* Right Nav */}
                <div className="right_nav d-flex align-items-center">
                  <div className="become_host mr-3">
                    <a href="#" className="host_btn"><span className="host_text">Trở thành host</span></a>
                  </div>

                  <div className="language_selector mr-3">
                    <div 
                      className="language_icon" 
                      onClick={() => setIsLanguageModalOpen(true)}
                    >
                      <i className="fas fa-globe"></i>
                    </div>
                  </div>

                  <div className="user_auth">
                    <div 
                      className="user_menu_icon" 
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    >
                      <i className="fas fa-bars"></i>
                    </div>
                    {userDropdownOpen && (
                      <div className="user_dropdown" ref={userDropdownRef}>
                        <a href="#" className="dropdown_item" onClick={() => setIsAuthModalOpen(true)}>
                          <i className="fas fa-sign-in-alt mr-2"></i>Đăng nhập hoặc Đăng ký
                        </a>
                        <a href="#" className="dropdown_item"><i className="fas fa-home mr-2"></i> Trở thành host</a>
                        <a href="#" className="dropdown_item"><i className="fas fa-search mr-2"></i> Tìm host</a>
                        <div className="dropdown_divider"></div>
                        <a href="#" className="dropdown_item"><i className="fas fa-question-circle mr-2"></i> Hỗ trợ</a>
                      </div>
                    )}
                  </div>

                  <div className="hamburger ml-3" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <i className="fas fa-bars trans_200"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className={`menu trans_500 ${isMenuOpen ? 'active' : ''}`}>
          <div className="menu_content d-flex flex-column align-items-center justify-content-center text-center">
            <div className="menu_close_container" onClick={() => setIsMenuOpen(false)}>
              <div className="menu_close"></div>
            </div>
            <div className="logo menu_logo"><a href="#"><img src={logo} alt=""/></a></div>
            <ul id="menuItems">
              <li className="menu_item"><a href="#">home</a></li>
              <li className="menu_item"><a href="about.html">about us</a></li>
              <li className="menu_item"><a href="offers.html">offers</a></li>
              <li className="menu_item"><a href="blog.html">news</a></li>
              <li className="menu_item"><a href="contact.html">contact</a></li>
              <li className="menu_item">
                <a href="#" onClick={() => setIsAuthModalOpen(true)}>
                  <i className="fas fa-sign-in-alt mr-2"></i>Đăng nhập hoặc Đăng ký
                </a>
              </li>
              <li className="menu_item"><a href="#"><i className="fas fa-home mr-2"></i>Trở thành Host</a></li>
              <li className="menu_item"><a href="#"><i className="fas fa-search mr-2"></i>Tìm host</a></li>
              <li className="menu_item"><a href="#"><i className="fas fa-question-circle mr-2"></i>Hỗ trợ</a></li>
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
          />
        )}
      </header>
    </div>
  );
};

export default Header;
import React from 'react';
import HeaderLogo from '../components/header-logo';
import HeaderUser from '../components/header-user';

const Header = ({ onToggleSidebar, isOpen }) => {
  return (
    <div className="header">
      <button onClick={onToggleSidebar} className="toggle-btn">
        ☰
        <a className="mobile_btn" id="mobile_btn">
          <i className="fas fa-bars"></i>
        </a>
      </button>
      <HeaderLogo isSidebarOpen={isOpen} />

      <HeaderUser />
    </div>
  );
};

export default Header;

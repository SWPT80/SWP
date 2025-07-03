import React from 'react';
import HeaderLogo from './header-logo';
import HeaderUser from './header-user';

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

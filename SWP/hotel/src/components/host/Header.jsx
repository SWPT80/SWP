

import HeaderLogo from './Header-logo';
import HeaderUser from './Header-user';
import '../../assets/css/AdminHeader.css'; // Import custom styles for the header
const Header = ({ onToggleSidebar, isOpen }) => {
  return (
    <div className="admin_header">
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
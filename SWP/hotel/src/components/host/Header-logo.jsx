import React from 'react';
import logo from '../../assets/images/logo.png'; // Import logo image
const HeaderLogo = ({ isSidebarOpen }) => {
    return (
        <div
            className={`admin_header-left ${!isSidebarOpen ? "move-to-center" : "move-to-left"}`}  // Kiểm tra trạng thái sidebar
        >
            <a href="/" className="logo text-decoratin" style={{ textDecoration: "none" }}>
                <img src={logo} width="50" height="70" alt="logo" />
                <span className="logoclass">TRAEXCO</span>
            </a>

        </div>
    );
};

export default HeaderLogo;
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "../assets/styles/responsive.css";
// import "../assets/styles/Header.css";
// import "../assets/css/AdminHeader.css";
// import logo from "../assets/images/logo.png";
import "@fortawesome/fontawesome-free/css/all.css";

// import AuthModal from "./LoginSignupForm";
import axios from "axios";

const HeaderUser = () => {

    // const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const [isScrolled, setIsScrolled] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);

    // const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [unreadNotifications, setUnreadNotifications] = useState(0);
    const [unreadMessages, setUnreadMessages] = useState(0);
    const navigate = useNavigate();
    const userDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                userDropdownRef.current &&
                !userDropdownRef.current.contains(event.target)
            ) {
                setUserDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    //   const handleLanguageSelect = (code) => {
    //     setCurrentLanguage(code);
    //   };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setUserDropdownOpen(false);
        navigate("/");
    };

    return (
        <ul className="nav user-menu">
            {/* Notifications */}
            <li className="nav-item dropdown noti-dropdown">
                <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
                    <i className="fe fe-bell" ></i>
                    <span className="badge badge-pill">3</span>
                </a>
                <div className="dropdown-menu notifications">
                    <div className="topnav-dropdown-header">
                        <span className="notification-title">Notifications</span>
                        <a href="#" className="clear-noti">Clear All</a>
                    </div>
                    <div className="noti-content">
                        <ul className="notification-list">
                            {[
                                {
                                    name: "Carlson Tech",
                                    message: "has approved your estimate",
                                    avatar: "avatar-02.jpg",
                                    time: "4 mins ago"
                                },
                                {
                                    name: "International Software Inc",
                                    message: "has sent you a invoice in the amount of $218",
                                    avatar: "avatar-11.jpg",
                                    time: "6 mins ago"
                                },
                                {
                                    name: "John Hendry",
                                    message: "sent a cancellation request Apple iPhone XR",
                                    avatar: "avatar-17.jpg",
                                    time: "8 mins ago"
                                },
                                {
                                    name: "Mercury Software Inc",
                                    message: "added a new product Apple MacBook Pro",
                                    avatar: "avatar-13.jpg",
                                    time: "12 mins ago"
                                }
                            ].map((noti, idx) => (
                                <li className="notification-message" key={idx}>
                                    <a href="#">
                                        <div className="media">
                                            <span className="avatar avatar-sm">
                                                <img
                                                    className="avatar-img rounded-circle"
                                                    alt="User"
                                                    src={`/img/profiles/${noti.avatar}`}
                                                />
                                            </span>
                                            <div className="media-body">
                                                <p className="noti-details">
                                                    <span className="noti-title">{noti.name}</span> {noti.message}
                                                </p>
                                                <p className="noti-time">
                                                    <span className="notification-time">{noti.time}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="topnav-dropdown-footer">
                        <a href="#">View all Notifications</a>
                    </div>
                </div>
            </li>

            {/* User Menu */}
            {/* <li className="nav-item dropdown has-arrow">
                <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
                    <span className="user-img">
                        <img
                            className="rounded-circle"
                            src={usericon}
                            width="31"
                            alt="Soeng Souy"
                        />
                    </span>
                </a>
                <div className="dropdown-menu">
                    <div className="user-header">
                        <div className="avatar avatar-sm">
                            <img
                                src="assets/img/a1.jpg"
                                alt="User"
                                className="avatar-img rounded-circle"
                            />
                        </div>
                        <div className="user-text">
                            <h6>Soeng Souy</h6>
                            <p className="text-muted mb-0">Administrator</p>
                        </div>
                    </div>
                    <a className="dropdown-item" href="/profile.html">My Profile</a>
                    <a className="dropdown-item" href="/login.html">Logout</a>
                </div>
            </li> */}



            <div className="user_auth">
                <div
                    className={`user_menu_icon ${user ? "logged-in" : ""}`}
                    onClick={() => {
                        console.log(
                            "Dropdown toggled, userDropdownOpen:",
                            !userDropdownOpen
                        );
                        setUserDropdownOpen(!userDropdownOpen);
                    }}
                    style={
                        user
                            ? {
                                backgroundColor: "#ffa500",
                                color: "white",
                                borderRadius: "50%",
                                width: "40px",
                                height: "40px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "18px",
                                fontWeight: "bold",
                            }
                            : {}
                    }
                >
                    {/* {user ? (
                        getUserInitial()
                    ) : (
                        <i className="fas fa-bars"></i>
                    )} */}

                    <img width="50" height="35" alt="usericon" />
                </div>
                {userDropdownOpen && (
                    <div className="user_dropdown" ref={userDropdownRef}>
                        {console.log("Rendering dropdown, user:", user)}
                        {user ? (
                            <>
                                <Link
                                    to="/profile"
                                    className="dropdown_item"
                                    onClick={() => setUserDropdownOpen(false)}
                                >
                                    <i className="fas fa-user mr-2"></i>
                                    {user.fullName}
                                </Link>

                                <div className="dropdown_divider"></div>
                                <a
                                    href="#"
                                    className="dropdown_item"
                                    onClick={handleLogout}
                                >
                                    <i className="fas fa-sign-out-alt mr-2"></i>Đăng
                                    xuất
                                </a>
                            </>
                        ) : (
                            <>

                                <Link
                                    to="/profile"
                                    className="dropdown_item"
                                    onClick={() => setUserDropdownOpen(false)}
                                >
                                    <i className="fas fa-home mr-2"></i>Profile
                                </Link>
                                {/* <Link
                                    to="/find-host"
                                    className="dropdown_item"
                                    onClick={() => setUserDropdownOpen(false)}
                                >
                                    <i className="fas fa-search mr-2"></i>Tìm Host
                                </Link> */}
                                <a
                                    href="/support"
                                    className="dropdown_item"
                                    onClick={() => setUserDropdownOpen(false)}
                                >
                                    <i className="fas fa-question-circle mr-2"></i>Hỗ
                                    trợ
                                </a>
                                <div className="dropdown_divider"></div>
                                <a
                                    href="#"
                                    className="dropdown_item"
                                    onClick={handleLogout}
                                >
                                    <i className="fas fa-sign-out-alt mr-2"></i>Đăng
                                    xuất
                                </a>
                            </>
                        )}
                    </div>
                )}
            </div>


        </ul>
    )
}

export default HeaderUser;
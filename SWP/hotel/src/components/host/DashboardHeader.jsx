// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import NotificationDropdown from "../NotificationDropdown";
// import { Dropdown } from "react-bootstrap";
// import '../../assets/styles/DashboardHeader.css';

// export function DashboardHeader() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!user) {
//       setError("Không tìm thấy thông tin người dùng.");
//     } else {
//       setError(null);
//     }
//   }, [user]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest('.notification-dropdown')) {
//         setShowNotifications(false);
//       }
//       if (!event.target.closest('.user-menu-dropdown')) {
//         setShowUserMenu(false);
//       }
//     };

//     document.addEventListener('click', handleClickOutside);
//     return () => document.removeEventListener('click', handleClickOutside);
//   }, []);

//   const getTitle = () => {
//     switch (location.pathname) {
//       case "/host/rooms": return "Quản lý phòng";
//       case "/host/messages": return "Tin nhắn";
//       case "/host/billing": return "Hệ thống thanh toán";
//       case "/host/reports": return "Báo cáo khách hàng";
//       case "/host/services": return "Dịch vụ";
//       case "/host/dashboard": return "Bảng điều khiển Host";
//       case "/host/occupancy": return "Công suất";
//       case "/host/bookings": return "Đặt phòng";
//       case "/host/rooms/add": return "Thêm phòng";
//       case "/host/rooms/edit": return "Chỉnh sửa phòng";
//       case "/host/rooms/pricing": return "Giá phòng";
//       default: return "Bảng điều khiển Host";
//     }
//   };

//   const getAvatarPath = () => {
//     if (!user || !user.email) return "/images/admin/avatars/default-admin.jpg";
//     const email = user.email.toLowerCase();
//     if (email === "hosta@example.com") return "/images/host/avatars/hosta.jpg";
//     else if (email === "hostb@example.com") return "/images/host/avatars/hostb.jpg";
//     else return "/images/host/avatars/default-host.jpg";
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <header className="dashboard-header">
//       {error && (
//         <div className="error-alert">
//           <span>{error}</span>
//           <button onClick={() => setError(null)}>×</button>
//         </div>
//       )}

//       <div className="header-container">
//         <div className="header-left">
//           <div className="page-info">
//             <h1 className="page-title">{getTitle()}</h1>
//             <p className="page-subtitle">
//               Chào mừng trở lại, {user?.name || user?.fullName || 'Host'}
//             </p>
//           </div>
//         </div>

//         <div className="header-right d-flex align-items-center gap-4">
//           {/* Notification dropdown */}
//           {user && <NotificationDropdown theme="light" />}

//           {/* User dropdown */}
//           <Dropdown className="user-menu-dropdown">
//             <Dropdown.Toggle variant="link" id="host-user-dropdown" className="nav-link p-0">
//               <span className="user-img">
//                 <img
//                   src={getAvatarPath()}
//                   alt="Host"
//                   className="rounded-circle"
//                   width="40"
//                   height="40"
//                 />
//               </span>
//             </Dropdown.Toggle>

//             <Dropdown.Menu>
//               <div className="user-header text-center p-3 border-bottom">
//                 <div className="avatar avatar-sm mb-2">
//                   <img
//                     src={getAvatarPath()}
//                     alt="Người dùng"
//                     className="avatar-img rounded-circle"
//                     width="60"
//                     height="60"
//                   />
//                 </div>
//                 <div className="user-text">
//                   <h6 className="mb-0">{user?.fullName || user?.name || "Host"}</h6>
//                   <small className="text-muted">Chủ homestay</small>
//                 </div>
//               </div>

//               <Dropdown.Item href="/host/account-settings">Cài đặt tài khoản</Dropdown.Item>
//               <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       </div>
//     </header>
//   );
// }

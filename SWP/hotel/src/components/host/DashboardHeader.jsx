// // import React, { useEffect, useState } from "react";
// // import { Bell, ChevronDown } from "lucide-react";
// // import { Button, Badge, Dropdown } from "react-bootstrap";
// // import { useLocation } from "react-router-dom";
// // import axios from "axios";

// // export function DashboardHeader() {
// //   const location = useLocation();
// //   const [notifications, setNotifications] = useState([]);
// //   const [unreadCount, setUnreadCount] = useState(0);

// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     if (token) {
// //       axios
// //         .get("http://localhost:8080/api/notifications/me", {
// //           headers: { Authorization: `Bearer ${token}` },
// //         })
// //         .then((res) => {
// //           const allNotis = res.data;
// //           setNotifications(allNotis);
// //           setUnreadCount(allNotis.filter((n) => n.status === "unread").length);
// //         })
// //         .catch((err) => {
// //           console.error("Failed to fetch notifications", err);
// //         });
// //     }
// //   }, []);

// //   const getTitle = () => {
// //     switch (location.pathname) {
// //       case "/rooms":
// //         return "Rooms";
// //       case "/messages":
// //         return "Messages";
// //       case "/billingsystem":
// //         return "Billing System";
// //       case "/customerreport":
// //         return "Customer Report";
// //       case "/hostservice":
// //         return "Service";
// //       case "/hostdashboard":
// //         return "Dashboard";
// //       case "/occupancy":
// //         return "Occupancy";
// //       case "/booking":
// //         return "Booking";
// //       case "/rooms/allroom":
// //         return "All Room";
// //       case "/rooms/addroom":
// //         return "Add Room";
// //       case "/rooms/editroom":
// //         return "Edit Room";
// //       case "/rooms/roompricing":
// //         return "Room Pricing";
// //       default:
// //         return "Dashboard";
// //     }
// //   };

// //   return (
// //     <header className="d-flex align-items-center justify-content-between border-bottom bg-white px-3 py-3">
// //       <h2 className="ms-2">{getTitle()}</h2>

// //       <div className="d-flex align-items-center gap-3 me-5">
// //         {/* Notifications Dropdown */}
// //         <Dropdown>
// //           <Dropdown.Toggle variant="light" size="sm" className="position-relative">
// //             <Bell size={26} />
// //             {unreadCount > 0 && (
// //               <Badge
// //                 pill
// //                 bg="danger"
// //                 className="position-absolute top-0 start-100 translate-middle"
// //                 style={{ fontSize: "0.65rem" }}
// //               >
// //                 {unreadCount}
// //               </Badge>
// //             )}
// //           </Dropdown.Toggle>

// //           <Dropdown.Menu style={{ minWidth: "300px" }}>
// //             <Dropdown.Header>Notifications</Dropdown.Header>
// //             {notifications.length === 0 ? (
// //               <Dropdown.Item disabled>No notifications</Dropdown.Item>
// //             ) : (
// //               notifications.map((noti) => (
// //                 <Dropdown.Item key={noti.id} className="text-wrap">
// //                   <div className="fw-medium">{noti.message}</div>
// //                   <small className="text-muted">
// //                     {new Date(noti.timestamp).toLocaleString()}
// //                   </small>
// //                 </Dropdown.Item>
// //               ))
// //             )}
// //             <Dropdown.Divider />
// //             <Dropdown.Item href="#">View all</Dropdown.Item>
// //           </Dropdown.Menu>
// //         </Dropdown>

// //         {/* User Avatar Placeholder */}
// //         <div className="ms-3">
// //           <img
// //             src="/placeholder.svg?height=32&width=32"
// //             alt="User"
// //             width={40}
// //             height={40}
// //             className="rounded-circle"
// //           />
// //         </div>
// //       </div>
// //     </header>
// //   );
// // }





// import { useLocation } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import NotificationDropdown from "../NotificationDropdown";

// export function DashboardHeader() {
//   const location = useLocation();
//   const { user } = useAuth();

//   const getTitle = () => {
//     switch (location.pathname) {
//       case "/rooms":
//         return "Rooms";
//       case "/messages":
//         return "Messages";
//       case "/billingsystem":
//         return "Billing System";
//       case "/customerreport":
//         return "Customer Report";
//       case "/hostservice":
//         return "Service";
//       case "/hostdashboard":
//         return "Dashboard";
//       case "/occupancy":
//         return "Occupancy";
//       case "/booking":
//         return "Booking";
//       case "/rooms/allroom":
//         return "All Room";
//       case "/rooms/addroom":
//         return "Add Room";
//       case "/rooms/editroom":
//         return "Edit Room";
//       case "/rooms/roompricing":
//         return "Room Pricing";
//       default:
//         return "Dashboard";
//     }
//   };

//   return (
//     <header className="d-flex align-items-center justify-content-between border-bottom bg-white px-3 py-3">
//       <h2 className="ms-2 mb-0 text-secondary">{getTitle()}</h2>

//       <div className="d-flex align-items-center gap-3 me-4">
//         {/* ✅ Notification Dropdown (icon chuông + badge + dropdown) */}
//         {user && <NotificationDropdown theme="light" />}

//         {/* ✅ Avatar (giả định) */}
//         <div className="ms-2">
//           <img
//             src="/placeholder.svg?height=32&width=32"
//             alt="User"
//             width={40}
//             height={40}
//             className="rounded-circle"
//           />
//         </div>
//       </div>
//     </header>
//   );
// }

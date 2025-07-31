// import { Outlet } from 'react-router-dom';
// import { AppSidebar } from '../components/host/AppSidebar';
// import { DashboardHeader } from '../components/host/DashboardHeader';
// export default function HostLayout() {
//   return (
//     <div className="d-flex" style={{ minHeight: '100vh' }}>
//       {/* Sidebar cố định */}
//       <div style={{ width: '250px', flexShrink: 0 }}>
//         <AppSidebar />
//       </div>

//       {/* Phần nội dung chính */}
//       <div className="flex-grow-1 d-flex flex-column">
//         <DashboardHeader />
//         <main className="flex-grow-1 p-3 overflow-auto">
//           <Outlet /> {/* Nội dung trang sẽ render ở đây */}
//         </main>
//       </div>
//     </div>
//   );
// }

import { Outlet } from "react-router-dom";
import AppSidebar from "../components/host/AppSidebar";
import { DashboardHeader } from "../components/host/DashboardHeader";
import Header from "../components/host/Header";
import { useState } from "react";
export default function HostLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar cố định */}
      {/* <div style={{ width: "280px", flexShrink: 0 }}> */}
      <AppSidebar isOpen={isSidebarOpen} />
      {/* </div> */}
      <Header onToggleSidebar={toggleSidebar} />
      {/* Phần nội dung chính */}
      {/* <div className="flex-grow-1 d-flex flex-column "> */}
      {/* <DashboardHeader /> */}

      <div className="flex-grow-1 p-3 main-content dashboard-host">
        <Outlet /> {/* Nội dung trang sẽ render ở đây */}
      </div>
      {/* </div> */}
    </div>
  );
}

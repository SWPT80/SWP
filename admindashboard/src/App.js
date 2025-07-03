import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { VisitProvider } from "./context/VisitContext"; // Import Provider
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import "./assets/css/style.css"; // (Các import CSS khác giữ nguyên)
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
// import "bootstrap/dist/js/bootstrap.bundle.min"; // Import Bootstrap JS
library.add(fas);

function App() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <VisitProvider>
      {/* Bọc ứng dụng bằng Provider */}
      <Header onToggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} />
      <div className="main-content">
        <Outlet />
      </div>
    </VisitProvider>
  );
}
export default App;

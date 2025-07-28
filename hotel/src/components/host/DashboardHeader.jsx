import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NotificationDropdown from "../NotificationDropdown";

export function DashboardHeader() {
  const location = useLocation();
  const { user } = useAuth();

  const getTitle = () => {
    switch (location.pathname) {
      case "/rooms":
        return "Rooms";
      case "/messages":
        return "Messages";
      case "/billingsystem":
        return "Billing System";
      case "/customerreport":
        return "Customer Report";
      case "/hostservice":
        return "Service";
      case "/hostdashboard":
        return "Dashboard";
      case "/occupancy":
        return "Occupancy";
      case "/booking":
        return "Booking";
      case "/rooms/allroom":
        return "All Room";
      case "/rooms/addroom":
        return "Add Room";
      case "/rooms/editroom":
        return "Edit Room";
      case "/rooms/roompricing":
        return "Room Pricing";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="d-flex align-items-center justify-content-between border-bottom bg-white px-3 py-3">
      <h2 className="ms-2 mb-0 text-secondary">{getTitle()}</h2>

      <div className="d-flex align-items-center gap-3 me-4">
        {/* ✅ Notification Dropdown (icon chuông + badge + dropdown) */}
        {user && <NotificationDropdown theme="light" />}

        {/* ✅ Avatar (giả định) */}
        <div className="ms-2">
          <img
            src="/placeholder.svg?height=32&width=32"
            alt="User"
            width={40}
            height={40}
            className="rounded-circle"
          />
        </div>
      </div>
    </header>
  );
}

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import HomeLayout from "./layouts/HomeLayout";
import HostLayout from "./layouts/HostLayout";
import BookedLayout from "./layouts/BookedLayout";
import PrivateRoute from "./routes/PrivateRoute";
import Profiles from "./components/ProfilePage";
import BecomeHost from "./components/BecomeHost";
import ResetPassword from "./components/ResetPassword";
import ReviewPage from './pages/ReviewPage';
import ReportPage from './pages/ReportPage';

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import AllBooking from "./pages/admin/All-booking";
import EditBooking from "./pages/admin/Edit-booking";
import AllHost from "./pages/admin/All-hosts";
import EditHost from "./pages/admin/Edit-hosts";
import AllCustomer from "./pages/admin/All-customer";
import EditCustomer from "./pages/admin/Edit-customer";
import AllService from "./pages/admin/All-service";
import Invoices from "./pages/admin/Invoices";
import Expenses from "./pages/admin/Expenses";
import Activity from "./pages/admin/Activities";
import ExpenseReports from "./pages/admin/Expense-reports";
import InvoiceReports from "./pages/admin/Invoices-report";
import Profile from "./pages/admin/Profile";
import Error404 from "./pages/admin/Error-404";
import Gallery from "./pages/admin/Gallery";
import PendingServices from "./pages/admin/PendingServices";
import ReportList from "./pages/admin/ReportManagement/ReportList";
import HostRequestAdminPage from "./pages/admin/HostRequestAdminPage";

// Frontend Pages
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Service from "./pages/Service";
import RoomDetails from "./pages/RoomDetails";
import Offers from "./pages/Offer";
import Booked from "./pages/Booked";

// Host Pages
import HostDashboard from "./pages/host/Dashboard";
import Messages from "./pages/host/Messages";
import CustomerReport from "./pages/host/CustomerReport";
import BillingSystem from "./pages/host/BillingSystem";
import HostService from "./pages/host/HostService";
import Occupancy from './components/host/Occupancy';
import HostBooking from "./pages/host/Booking";
import AllRoom from "./pages/host/room/AllRoom";
import EditRoom from "./pages/host/room/EditRoom";
import AddRoom from "./pages/host/room/AddRoom";
import Room from "./pages/host/room/Room";
import RoomPricing from "./pages/host/room/RoomPricing";
import FacilitiesList from "./pages/host/FacilitiesList";
import EditService from "./pages/host/EditService";
import AddService from "./pages/host/AddService";
import HostAccountSettings from "./components/host/HostAccountSettings";

// Payment Pages
import PaymentCheckout from "./pages/payment/Payment-checkout";
import PaymentCallback from "./pages/payment/PaymentCallback";
import BookingSuccess from "./pages/payment/BookingSuccess";
import PaymentErrorHandler from "./pages/payment/PaymentErrorHandler";
import PaymentCancelledHandler from "./pages/payment/PaymentCancelledHandler";

import { AuthProvider } from './context/AuthContext';
import SearchResults from "./components/Search/SearchResultsHome";
import UserChatPage from "./components/Chat/ChatUsers";
import { WebSocketProvider } from './context/WebSocketContext';
import EmailVerificationPage from "./components/EmailVerificationPage";
import FavoriteListPage from "./pages/FavoriteListPage";
import FavoriteListDetail from "./components/FavoriteListDetail";

function App() {
  return (
    <AuthProvider>
      <WebSocketProvider>
        <Router>
          <Routes>
            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <PrivateRoute allowedRoles={['ADMIN']}>
                  <AdminLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="all-booking" element={<AllBooking />} />
              <Route path="edit-booking/:id" element={<EditBooking />} />
              <Route path="all-customer" element={<AllCustomer />} />
              <Route path="edit-customer/:id" element={<EditCustomer />} />
              <Route path="all-hosts" element={<AllHost />} />
              <Route path="edit-host/:id" element={<EditHost />} />
              <Route path="all-service" element={<AllService />} />
              <Route path="pending-services" element={<PendingServices />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="expenses" element={<Expenses />} />
              <Route path="activities" element={<Activity />} />
              <Route path="expense-reports" element={<ExpenseReports />} />
              <Route path="invoice-reports" element={<InvoiceReports />} />
              <Route path="profile" element={<Profile />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="*" element={<Error404 />} />
              <Route path="reports" element={<ReportList />} />
              <Route path="host-requests" element={<HostRequestAdminPage />} />
            </Route>

            {/* Frontend Routes */}
            <Route element={<HomeLayout />}>
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/" element={<Home />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/services" element={<Service />} />
              <Route path="/review" element={<ReviewPage />} />
              <Route path="/report" element={<ReportPage />} />
            </Route>

            {/* Host Routes */}
            <Route
              path="/host"
              element={
                <PrivateRoute allowedRoles={['HOST']}>
                  <HostLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<Navigate to="/host/dashboard" replace />} />
              <Route path="dashboard" element={<HostDashboard />} />

              <Route path="rooms" element={<Room />}>
                <Route index element={<AllRoom />} />
                <Route path="add" element={<AddRoom />} />
                <Route path="edit/:id" element={<EditRoom />} />
                <Route path="pricing" element={<RoomPricing />} />
              </Route>

              <Route path="messages" element={<Messages />} />
              <Route path="reports" element={<CustomerReport />} />
              <Route path="billing" element={<BillingSystem />} />
              <Route path="services" element={<HostService />} />
              <Route path="add-service" element={<AddService />} />
              <Route path="edit-service/:id" element={<EditService />} />
              <Route path="occupancy" element={<Occupancy />} />
              <Route path="bookings" element={<HostBooking />} />
              <Route path="facilities" element={<FacilitiesList />} />
              <Route path="/host/account-settings" element={<HostAccountSettings />} />
            </Route>

            {/* Booking/Payment Routes */}
            <Route element={<BookedLayout />}>
              <Route path="/offer" element={<Offers />} />
              <Route path="/room/roomdetails/:homestayId/:roomNumber" element={<RoomDetails />} />
              <Route path="/checkout" element={<PaymentCheckout />} />
              <Route path="/payment-callback" element={<PaymentCallback />} />
              <Route path="/payment-error" element={<PaymentErrorHandler />} />
              <Route path="/payment-cancelled" element={<PaymentCancelledHandler />} />
              <Route path="/booking-success" element={<BookingSuccess />} />
              <Route path="/booked" element={<Booked />} />
            </Route>

            <Route path="/chatuser" element={<UserChatPage />} />
            <Route path="*" element={<Error404 />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/become-host" element={<BecomeHost />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/email-verified" element={<EmailVerificationPage />} />
            <Route path="/wishlists" element={<FavoriteListPage />} />
            <Route path="/wishlist/:id" element={<FavoriteListDetail />} />
          </Routes>
        </Router>
      </WebSocketProvider>
    </AuthProvider>
  );
}

export default App;
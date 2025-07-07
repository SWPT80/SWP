import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Service from './pages/Service';
import HomeLayout from './layouts/HomeLayout';
import HostLayout from './layouts/HostLayout';
import Messages from './pages/host/Messages';
import CustomerReport from './pages/host/CustomerReport';
import BillingSystem from './pages/host/BillingSystem';
import Dashboard from './pages/host/Dashboard';
import HostService from './pages/host/HostService';
import Occupancy from './components/host/Occupancy';
import Booking from './pages/host/Booking';
import AllRoom from './pages/host/room/AllRoom';
import EditRoom from './pages/host/room/EditRoom';
import AddRoom from './pages/host/room/AddRoom';
import Room from './pages/host/room/Room';
import RoomPricing from './pages/host/room/RoomPricing';
import FacilitiesList from './pages/host/FacilitiesList';
import RoomDetails from './pages/RoomDetails';
import BookedLayout from './layouts/BookedLayout';
import Offers from './pages/Offer';

// payment
import PaymentCheckout from './pages/payment/Payment-checkout';
import PaymentCallback from './pages/payment/PaymentCallback';
import BookingSuccess from './pages/payment/BookingSuccess';


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/service" element={<Service />} />
        </Route>
        <Route element={<HostLayout />}>
          <Route path="/hostdashboard" element={<Dashboard />} />
          <Route path="/rooms" element={<Room />}>
            <Route path="allroom" element={<AllRoom />} />
            <Route path="addroom" element={<AddRoom />} />
            <Route path="editroom" element={<EditRoom />} />
            <Route path="roompricing" element={<RoomPricing />} />
          </Route>
          <Route path="/messages" element={<Messages />} />
          <Route path="/customerreport" element={<CustomerReport />} />
          <Route path="/billingsystem" element={<BillingSystem />} />
          <Route path="/hostservice" element={<HostService />} />
          <Route path="/occupancy" element={<Occupancy />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/roomfacilites" element={<FacilitiesList />} />
        </Route>
        <Route element={<BookedLayout />}>
          <Route path="/offer" element={<Offers />} />
          <Route path="/room/roomdetails/:homestayId/:roomNumber" element={<RoomDetails />} />
          <Route path="/checkout" element={<PaymentCheckout />} />
          <Route path="/payment-callback" element={<PaymentCallback />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
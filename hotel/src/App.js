import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Service from './pages/Service';
import HomeLayout from './layouts/HomeLayout';
import HostLayout from './layouts/HostLayout';
import Messages from './pages/Messages';
import CustomerReport from './pages/CustomerReport';
import BillingSystem from './pages/BillingSystem';
import Dashboard from './pages/Dashboard';
import HostService from './pages/HostService';
import Occupancy from './components/host/Occupancy';
import Booking from './pages/Booking';
import AllRoom from './pages/room/AllRoom';
import EditRoom from './pages/room/EditRoom';
import AddRoom from './pages/room/AddRoom';
import Room from './pages/room/Room';
import RoomPricing from './pages/room/RoomPricing';
import FacilitiesList from './pages/amenity/FacilitiesList';
import RoomDetails from './pages/RoomDetails';
import BookedLayout from './layouts/BookedLayout';
import PaymentCheckout from './pages/Payment-checkout';
import Offers from './pages/Offer';

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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
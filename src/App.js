import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Service from './pages/Service';
import HomeLayout from './layouts/HomeLayout';
import HostLayout from './layouts/HostLayout';
import CheckInOut from './pages/CheckInOut';
import Rooms from './pages/Rooms';
import Messages from './pages/Messages';
import CustomerReport from './pages/CustomerReport';
import BillingSystem from './pages/BillingSystem';
import Dashboard from './pages/Dashboard';
import HostService from './pages/HostService';

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
          <Route path="/checkinout" element={<CheckInOut />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/customerreport" element={<CustomerReport />} />
          <Route path="/billingsystem" element={<BillingSystem />} />
          <Route path="/hostservice" element={<HostService />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
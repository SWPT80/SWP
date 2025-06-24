import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Dashboard from "./pages/dashboard";
import AllBooking from "./pages/all-booking";
import EditBooking from "./pages/edit-booking";
import AllHost from "./pages/all-hosts";
import EditHost from "./pages/edit-hosts";
import AllCustomer from "./pages/all-customer";
import EditCustomer from "./pages/edit-customer";
import AllService from "./pages/all-service";
import EditService from "./pages/edit-service";
import AddService from "./pages/add-service";
import AllRoom from "./pages/all-rooms";
import EditRoom from "./pages/edit-room";
import AddRoom from "./pages/add-room";
import Invoices from "./pages/invoices";
import Expenses from "./pages/expenses";
import Activity from "./pages/activities";
import ExpenseReports from "./pages/expense-reports";
import InvoiceReports from "./pages/invoices-report";
import ForgotPassword from "./pages/forgot-password";
import ChangePassword from "./pages/change-password";
import LockScreen from "./pages/lock-screen";
import Profile from "./pages/profile";
import Error404 from "./pages/error-404";
import Error500 from "./pages/error-500";
import Login from "./pages/login";
import Register from "./pages/register";
import Gallery from "./pages/gallery";
import PendingServices from "./pages/pendingServices";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="all-booking" element={<AllBooking />} />
        <Route path="edit-booking" element={<EditBooking />} />
        <Route path="all-customer" element={<AllCustomer />} />
        <Route path="edit-customer" element={<EditCustomer />} />
        <Route path="all-hosts" element={<AllHost />} />
        <Route path="edit-host" element={<EditHost />} />
        <Route path="all-rooms" element={<AllRoom />} />
        <Route path="edit-room" element={<EditRoom />} />
        <Route path="add-room" element={<AddRoom />} />
        <Route path="all-service" element={<AllService />} />
        <Route path="edit-service" element={<EditService />} />
        <Route path="add-service" element={<AddService />} />
        <Route path="pendingServices" element={<PendingServices />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="activities" element={<Activity />} />
        <Route path="expense-reports" element={<ExpenseReports />} />
        <Route path="invoice-reports" element={<InvoiceReports />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="lock-screen" element={<LockScreen />} />
        <Route path="profile" element={<Profile />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="error-404" element={<Error404 />} />
        <Route path="error-500" element={<Error500 />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();

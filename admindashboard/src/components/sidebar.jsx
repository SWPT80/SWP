import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faSuitcase, faUser, faUserShield, faConciergeBell, faMoneyBillAlt, faBell, faColumns } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isOpen }) => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuKey) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  return (
    <div className={`sidebar sidebar-wrapper ${isOpen ? 'open' : 'closed'}`} id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li>
              <Link to="dashboard">
                <FontAwesomeIcon icon={faTachometerAlt} /> <span>Dashboard</span>
              </Link>
            </li>
            <li className="list-divider"></li>

            {/* Booking */}
            <li className={`submenu ${openMenus.booking ? 'open' : ''}`}>
              <a href='#' onClick={() => toggleMenu('booking')}>
                <FontAwesomeIcon icon={faSuitcase} />
                <span>Booking</span>
                <span className="menu-arrow"></span>
              </a>
              <ul className="submenu_class" style={{ display: openMenus.booking ? 'block' : 'none' }}>
                <li><Link to="/all-booking">All Booking</Link></li>
                <li><Link to="/edit-booking">Edit Booking</Link></li>
              </ul>
            </li>

            {/* Customers */}
            <li className={`submenu ${openMenus.customers ? 'open' : ''}`}>
              <a href='#' onClick={() => toggleMenu('customers')}>
                <FontAwesomeIcon icon={faUser} /> <span>Customers</span> <span className="menu-arrow"></span>
              </a>
              <ul className="submenu_class" style={{ display: openMenus.customers ? 'block' : 'none' }}>
                <li><Link to="/all-customer">All Customers</Link></li>
                <li><Link to="/edit-customer">Edit Customer</Link></li>
              </ul>
            </li>

            {/* Host */}
            <li className={`submenu ${openMenus.hosts ? 'open' : ''}`}>
              <a href='#' onClick={() => toggleMenu('hosts')}>
                <FontAwesomeIcon icon={faUserShield} /> <span>Hosts</span> <span className="menu-arrow"></span>
              </a>
              <ul className="submenu_class" style={{ display: openMenus.hosts ? 'block' : 'none' }}>
                <li><Link to="/all-hosts">All Hosts</Link></li>
                <li><Link to="/edit-host">Edit Host</Link></li>
              </ul>
            </li>

            {/* Service */}
            <li className={`submenu ${openMenus.service ? 'open' : ''}`}>
              <a href='#' onClick={() => toggleMenu('service')}>
                <FontAwesomeIcon icon={faConciergeBell} /> <span>Service</span> <span className="menu-arrow"></span>
              </a>
              <ul className="submenu_class" style={{ display: openMenus.service ? 'block' : 'none' }}>
                <li><Link to="/all-service">All Service</Link></li>
                <li><Link to="/edit-service">Edit Service</Link></li>
                <li><Link to="/add-service">Add Service</Link></li>
                <li><Link to="/pendingServices">Pending Services</Link></li>
              </ul>
            </li>

            {/* Accounts */}
            <li className={`submenu ${openMenus.accounts ? 'open' : ''}`}>
              <a href="#" onClick={() => toggleMenu('accounts')}>
                <FontAwesomeIcon icon={faMoneyBillAlt} /> <span>Accounts</span> <span className="menu-arrow"></span>
              </a>
              <ul className="submenu_class" style={{ display: openMenus.accounts ? 'block' : 'none' }}>
                <li><Link to="/invoices">Invoices</Link></li>
                <li><Link to="/expenses">Expenses</Link></li>
              </ul>
            </li>

            <li>
              <Link to="/activities">
                <FontAwesomeIcon icon={faBell} /> <span>Activities</span>
              </Link>
            </li>

            {/* Reports */}
            <li className={`submenu ${openMenus.reports ? 'open' : ''}`}>
              <a href="#" onClick={() => toggleMenu('reports')}>
                <FontAwesomeIcon icon={faColumns} /> <span>Reports</span> <span className="menu-arrow"></span>
              </a>
              <ul className="submenu_class" style={{ display: openMenus.reports ? 'block' : 'none' }}>
                <li><Link to="/expense-reports">Expense Report</Link></li>
                <li><Link to="/invoice-reports">Invoice Report</Link></li>
              </ul>
            </li>

            <li className="menu-title mt-3"><span>EXTRAS</span></li>

            {/* Extras Pages */}
            <li className={`submenu ${openMenus.pages ? 'open' : ''}`}>
              <a href="#" onClick={() => toggleMenu('pages')}>
                <FontAwesomeIcon icon={faColumns} /> <span>Pages</span> <span className="menu-arrow"></span>
              </a>
              <ul className="submenu_class" style={{ display: openMenus.pages ? 'block' : 'none' }}>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/forgot-password">Forgot Password</Link></li>
                <li><Link to="/change-password">Change Password</Link></li>
                <li><Link to="/lock-screen">Lockscreen</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/error-404">404 Error</Link></li>
                <li><Link to="/error-500">500 Error</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

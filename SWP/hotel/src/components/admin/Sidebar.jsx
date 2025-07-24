import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/Sidebar.css';

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar-wrapper ${isOpen ? 'open' : 'closed'}`} id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li>
              <Link to="dashboard">
                <i className="fas fa-tachometer-alt"></i> <span>Dashboard</span>
              </Link>
            </li>
            <li className="list-divider"></li>

            <li>
              <Link to="/admin/all-booking">
                <i className="fas fa-suitcase"></i> <span>All Booking</span>
              </Link>
            </li>

            <li>
              <Link to="/admin/all-customer">
                <i className="fas fa-user"></i> <span>All Customers</span>
              </Link>
            </li>

            <li>
              <Link to="/admin/all-hosts">
                <i className="fas fa-user-shield"></i> <span>All Hosts</span>
              </Link>
            </li>

            <li>
              <Link to="/admin/all-service">
                <i className="fas fa-concierge-bell"></i> <span>All Service</span>
              </Link>
            </li>

            <li>
              <Link to="/admin/pending-services">
                <i className="fas fa-concierge-bell"></i> <span>Pending Services</span>
              </Link>
            </li>

            <li>
              <Link to="/admin/expense-reports">
                <i className="far fa-table"></i> <span>Report</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
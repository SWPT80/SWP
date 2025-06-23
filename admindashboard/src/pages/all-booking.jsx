// File: AllBooking.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [isOpen, setIsOpen] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8080/api/bookings')
      .then((res) => setBookings(res.data))
      .catch((err) => console.error('Lỗi khi lấy danh sách booking:', err));
  }, []);

  const toggleDropdown = (id) => {
    setIsOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa booking này?')) return;
    axios.delete(`http://localhost:8080/api/bookings/${id}`)
      .then(() => setBookings((prev) => prev.filter((b) => b.bookingId !== id)))
      .catch((err) => {
        console.error('Lỗi khi xóa booking:', err);
        alert('Xóa thất bại.');
      });
  };

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <div className="mt-5">
                  <h4 className="card-title float-left mt-2">All Bookings</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table">
                <div className="card-body booking_card">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover table-center mb-0">
                      <thead>
                        <tr>
                          <th>Booking ID</th>
                          <th>Customer</th>
                          <th>Room</th>
                          <th>Check-in</th>
                          <th>Check-out</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((b) => (
                          <tr key={b.bookingId}>
                            <td>{b.bookingId}</td>
                            <td>{b.user?.fullName || 'N/A'}</td>
                            <td>{b.room?.roomNumber || 'N/A'}</td>
                            <td>{b.checkInDate}</td>
                            <td>{b.checkOutDate}</td>
                            <td>{b.totalAmount?.toLocaleString()} VND</td>
                            <td>
                              <span className={`badge ${b.status === 'Booked' ? 'badge-success' : 'badge-secondary'}`}>{b.status}</span>
                            </td>
                            <td className="text-right">
                              <div className="dropdown">
                                <button className="action-icon btn" onClick={() => toggleDropdown(b.bookingId)}>
                                  <i className="fas fa-ellipsis-v"></i>
                                </button>
                                <div className={`dropdown-menu dropdown-menu-right ${isOpen[b.bookingId] ? 'show' : ''}`}>
                                  <a className="dropdown-item" href={`/edit-booking?id=${b.bookingId}`}>
                                    <i className="fas fa-pencil-alt"></i> Edit
                                  </a>
                                  <button className="dropdown-item" onClick={() => handleDelete(b.bookingId)}>
                                    <i className="fas fa-trash-alt"></i> Delete
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {bookings.length === 0 && (
                          <tr>
                            <td colSpan="8" className="text-center">No bookings found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBooking;

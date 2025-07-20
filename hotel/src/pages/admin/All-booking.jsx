import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PAGE_SIZE = 10;

const AllBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [isOpen, setIsOpen] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get('http://localhost:8080/api/bookings/with-user-info', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setBookings(res.data))
      .catch((err) => {
        console.error('Lỗi khi lấy danh sách booking:', err);
        alert("Bạn không có quyền truy cập.");
      });
  }, []);

  const toggleDropdown = (id) => {
    setIsOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa booking này?')) return;
    axios
      .delete(`http://localhost:8080/api/bookings/${id}`)
      .then(() => setBookings((prev) => prev.filter((b) => b.id !== id)))
      .catch((err) => {
        console.error('Lỗi khi xóa booking:', err);
        alert('Xóa thất bại.');
      });
  };

  const totalPages = Math.ceil(bookings.length / PAGE_SIZE) || 1;
  const visibleBookings = bookings.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h4 className="card-title mt-2">
                  <i className="fas fa-clipboard-list text-primary mr-2"></i>
                  All Bookings
                </h4>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="cardDashboard  card-table">
                <div className="cardDashboard-body booking_card">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover table-center mb-0">
                      <thead>
                        <tr>
                          <th>Booking ID</th>
                          <th>Customer</th>
                          <th>Room</th>
                          <th>Check‑in</th>
                          <th>Check‑out</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visibleBookings.map((b) => (
                          <tr key={b.id}>
                            <td>{b.id}</td>
                            <td>{b.userFullName || 'N/A'}</td>
                            <td>{b.roomNumber || 'N/A'}</td>
                            <td>{b.checkInDate}</td>
                            <td>{b.checkOutDate}</td>
                            <td>{b.totalAmount?.toLocaleString()} VND</td>
                            <td>{b.status}</td>
                            <td className="text-right">
                              <div className="dropdown">
                                <button
                                  className="action-icon btn"
                                  onClick={() => toggleDropdown(b.id)}
                                >
                                  <i className="fas fa-ellipsis-v"></i>
                                </button>
                                <div
                                  className={`dropdown-menu dropdown-menu-right ${isOpen[b.id] ? 'show' : ''}`}
                                >
                                  <a className="dropdown-item" href={`/admin/edit-booking/${b.id}`}>
                                    <i className="fas fa-pencil-alt"></i> Edit
                                  </a>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleDelete(b.id)}
                                  >
                                    <i className="fas fa-trash-alt"></i> Delete
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {visibleBookings.length === 0 && (
                          <tr>
                            <td colSpan="8" className="text-center">
                              No bookings found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span>Page {currentPage} / {totalPages}</span>
                    <nav>
                      <ul className="pagination mb-0">
                        <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                          <button className="page-link" onClick={() => changePage(currentPage - 1)}>
                            «
                          </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                          <li key={p} className={`page-item ${currentPage === p && 'active'}`}>
                            <button className="page-link" onClick={() => changePage(p)}>
                              {p}
                            </button>
                          </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                          <button className="page-link" onClick={() => changePage(currentPage + 1)}>
                            »
                          </button>
                        </li>
                      </ul>
                    </nav>
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

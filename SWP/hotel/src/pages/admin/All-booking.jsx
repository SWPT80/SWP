import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PAGE_SIZE = 10;

const AllBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

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

  // Lọc bookings theo searchTerm (không phân biệt hoa thường)
  const filteredBookings = bookings.filter((b) => {
    const term = searchTerm.toLowerCase();
    return (
      b.homestayName?.toLowerCase().includes(term) ||
      b.userFullName?.toLowerCase().includes(term) ||
      b.roomNumber?.toString().toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredBookings.length / PAGE_SIZE) || 1;

  const visibleBookings = filteredBookings.slice(
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
                  <i className="fas fa-clipboard-list text-primary me-2"></i>
                  All Bookings
                </h4>
              </div>
              <div className="col-md-6 text-end">
                <div
                  className="position-relative d-inline-block"
                  style={{ maxWidth: '300px', width: '100%' }}
                >
                  <i
                    className="bi bi-search position-absolute"
                    style={{
                      top: '50%',
                      left: '12px',
                      transform: 'translateY(-50%)',
                      color: '#888',
                      fontSize: '16px',
                    }}
                  ></i>
                  <input
                    type="text"
                    className="form-control ps-5 py-2 rounded-pill border border-secondary-subtle"
                    placeholder="Tìm kiếm theo khách hàng, homestay, phòng..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // Reset về trang đầu khi search
                    }}
                    style={{
                      width: '100%',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                    }}
                  />
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
                          <th>Homestay Name</th>
                          <th>Customer</th>
                          <th>Room</th>
                          <th>Check‑in</th>
                          <th>Check‑out</th>
                          <th>Total</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visibleBookings.length > 0 ? (
                          visibleBookings.map((b) => (
                            <tr key={b.id}>
                              <td>{b.id}</td>
                              <td>{b.homestayName}</td>
                              <td>{b.userFullName || 'N/A'}</td>
                              <td>{b.roomNumber || 'N/A'}</td>
                              <td>{b.checkInDate}</td>
                              <td>{b.checkOutDate}</td>
                              <td>{b.totalAmount?.toLocaleString()} VND</td>
                              <td>{b.status}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8" className="text-center">
                              Không tìm thấy booking nào
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span>
                      Page {currentPage} / {totalPages}
                    </span>
                    <nav>
                      <ul className="pagination mb-0">
                        <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                          <button
                            className="page-link"
                            onClick={() => changePage(currentPage - 1)}
                          >
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
                          <button
                            className="page-link"
                            onClick={() => changePage(currentPage + 1)}
                          >
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PAGE_SIZE = 10;

const AllService = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/services')
      .then((res) => setServices(res.data))
      .catch((err) => console.error('Lỗi lấy danh sách dịch vụ:', err));
  }, []);

  const totalPages = Math.ceil(services.length / PAGE_SIZE) || 1;
  const visibleServices = services.slice(
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
              <div className="col-md-6 d-flex align-items-center">
                <h4 className="card-title mt-2">
                  <i className="fas fa-concierge-bell text-primary mr-2"></i>
                  All Services
                </h4>
                <div className="col-md-6 text-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate('/admin/pending-services')}
                  >
                    <i className="fas fa-hourglass-half mr-1"></i>
                    Pending Services
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card card-table">
            <div className="card-body booking_card">
              <div className="table-responsive">
                <table className="table table-striped table-hover table-center mb-0">
                  <thead>
                    <tr>
                      <th><i className="fas fa-receipt text-info mr-1"></i>Service ID</th>
                      <th><i className="fas fa-home text-primary mr-1"></i>Homestay</th>
                      <th><i className="fas fa-tags text-warning mr-1"></i>Type</th>
                      <th><i className="fas fa-dollar-sign text-success mr-1"></i>Price</th>
                      <th><i className="far fa-sticky-note text-secondary mr-1"></i>Notes</th>
                      <th><i className="fas fa-info-circle text-muted mr-1"></i>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleServices.map((s) => (
                      <tr key={s.id}>
                        <td className="text-info font-weight-bold">{s.id}</td>
                        <td>{s.homestayId ?? 'N/A'}</td>
                        <td>{s.serviceType?.serviceName ?? 'Unknown'}</td>
                        <td>
                          <span className="text-success font-weight-bold">
                            {s.price?.toLocaleString()} VND
                          </span>
                        </td>
                        <td>{s.specialNotes || '-'}</td>
                        <td>
                          {s.status ? (
                            <span className="badge badge-success d-inline-flex align-items-center">
                              <i className="fas fa-check-circle mr-1"></i>Active
                            </span>
                          ) : (
                            <span className="badge badge-danger d-inline-flex align-items-center">
                              <i className="fas fa-times-circle mr-1"></i>Inactive
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {visibleServices.length === 0 && (
                      <tr>
                        <td colSpan="7" className="text-center">No services found</td>
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
                    {/* First & Previous */}
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => changePage(1)}>«</button>
                    </li>
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => changePage(currentPage - 1)}>‹</button>
                    </li>

                    {/* Page Numbers with Ellipsis */}
                    {(() => {
                      const pageItems = [];
                      const maxPagesToShow = 5;
                      let start = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
                      let end = start + maxPagesToShow - 1;

                      if (end > totalPages) {
                        end = totalPages;
                        start = Math.max(1, end - maxPagesToShow + 1);
                      }

                      if (start > 1) {
                        pageItems.push(
                          <li key={1} className="page-item">
                            <button className="page-link" onClick={() => changePage(1)}>1</button>
                          </li>
                        );
                        if (start > 2) {
                          pageItems.push(
                            <li key="start-ellipsis" className="page-item disabled">
                              <span className="page-link">...</span>
                            </li>
                          );
                        }
                      }

                      for (let i = start; i <= end; i++) {
                        pageItems.push(
                          <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => changePage(i)}>{i}</button>
                          </li>
                        );
                      }

                      if (end < totalPages) {
                        if (end < totalPages - 1) {
                          pageItems.push(
                            <li key="end-ellipsis" className="page-item disabled">
                              <span className="page-link">...</span>
                            </li>
                          );
                        }
                        pageItems.push(
                          <li key={totalPages} className="page-item">
                            <button className="page-link" onClick={() => changePage(totalPages)}>{totalPages}</button>
                          </li>
                        );
                      }

                      return pageItems;
                    })()}

                    {/* Next & Last */}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => changePage(currentPage + 1)}>›</button>
                    </li>
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => changePage(totalPages)}>»</button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllService;

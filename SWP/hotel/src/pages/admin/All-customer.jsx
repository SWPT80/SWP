import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PAGE_SIZE = 10;

const AllCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCustomers();

    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
        setOpenIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchAllCustomers = () => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:8080/api/admin/users/customers', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCustomers(res.data);
        setError('');
        if (res.data.length === 0) {
          setError('Không tìm thấy khách hàng nào.');
        }
      })
      .catch((err) => {
        console.error('Lỗi khi tải danh sách khách hàng:', err);
        setError('Không thể tải danh sách khách hàng. Có thể bạn không có quyền.');
      });
  };

  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    setCurrentPage(1);

    const token = localStorage.getItem('token');
    if (keyword.trim() === '') {
      fetchAllCustomers();
    } else {
      axios
        .get('http://localhost:8080/api/admin/users/search', {
          params: { keyword: keyword.trim() },
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setCustomers(res.data);
          setError('');
          if (res.data.length === 0) {
            setError('Không tìm thấy khách hàng nào khớp với từ khóa.');
          }
        })
        .catch((err) => {
          console.error('Lỗi khi tìm kiếm khách hàng:', err);
          setError('Lỗi khi tìm kiếm khách hàng. Vui lòng thử lại.');
        });
    }
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('Bạn có chắc muốn xóa khách hàng này?')) return;

    axios
      .delete(`http://localhost:8080/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setCustomers((prev) => prev.filter((c) => c.id !== id));
        setError('');
      })
      .catch((err) => {
        console.error('Lỗi khi xóa khách hàng:', err);
        setError('Xóa khách hàng thất bại.');
      });
  };

  const totalPages = Math.ceil(customers.length / PAGE_SIZE) || 1;
  const visibleCustomers = customers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

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
                  <i className="fas fa-users text-primary mr-2"></i>Tất cả khách hàng
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
                    placeholder="Tìm kiếm theo tên..."
                    value={searchKeyword}
                    onChange={handleSearchChange}
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
                  {error && (
                    <Alert variant="info" onClose={() => setError('')} dismissible>
                      {error}
                    </Alert>
                  )}
                  <div className="table-responsive">
                    <table className="table table-striped table-hover table-center mb-0">
                      <thead>
                        <tr>
                          <th>Họ và tên</th>
                          <th>Tên đăng nhập</th>
                          <th>Email</th>
                          <th>Số điện thoại</th>
                          <th>Địa chỉ</th>
                          <th>Trạng thái</th>
                          <th className="text-right">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visibleCustomers.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <Alert variant="info">Không tìm thấy khách hàng.</Alert>
                            </td>
                          </tr>
                        ) : (
                          visibleCustomers.map((c, index) => (
                            <tr key={c.id}>
                              <td className="text-primary font-weight-bold">{c.fullName}</td>
                              <td>{c.userName}</td>
                              <td>{c.email}</td>
                              <td>{c.phone}</td>
                              <td>{c.address}</td>
                              <td>
                                {c.status ? (
                                  <span className="badge badge-success">Hoạt động</span>
                                ) : (
                                  <span className="badge badge-danger">Không hoạt động</span>
                                )}
                              </td>
                              <td className="text-right">
                                <div className="dropdown">
                                  <button
                                    className="action-icon btn"
                                    onClick={() => setOpenIndex(prev => (prev === index ? null : index))}
                                  >
                                    <i className="fas fa-ellipsis-v"></i>
                                  </button>
                                  <div className={`dropdown-menu dropdown-menu-right ${openIndex === index ? 'show' : ''}`}>
                                    <button
                                      className="dropdown-item"
                                      onClick={() => navigate(`/admin/edit-customer/${c.id}`)}
                                    >
                                      <i className="fas fa-pencil-alt"></i> Chỉnh sửa
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span>Trang {currentPage} / {totalPages}</span>
                    <nav>
                      <ul className="pagination mb-0">
                        <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                          <button className="page-link" onClick={() => changePage(currentPage - 1)}>«</button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                          <li key={p} className={`page-item ${currentPage === p && 'active'}`}>
                            <button className="page-link" onClick={() => changePage(p)}>{p}</button>
                          </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                          <button className="page-link" onClick={() => changePage(currentPage + 1)}>»</button>
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

export default AllCustomer;
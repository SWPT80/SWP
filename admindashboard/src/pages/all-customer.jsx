import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [isOpen, setIsOpen] = useState({});
  const [searchKeyword, setSearchKeyword] = useState('');

  // Lấy danh sách customer từ API ban đầu
  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const fetchAllCustomers = () => {
    axios.get('http://localhost:8080/api/users/customers')
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error('Lỗi khi lấy danh sách users:', err));
  };

  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    if (keyword.trim() === '') {
      fetchAllCustomers();
    } else {
      axios.get('http://localhost:8080/api/users/search', {
        params: { keyword: keyword.trim() }
      })
        .then((res) => setCustomers(res.data))
        .catch((err) => console.error('Lỗi tìm kiếm:', err));
    }
  };

  const toggleDropdown = (id) => {
    setIsOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa người dùng này?')) return;
    axios.delete(`http://localhost:8080/api/users/${id}`)
      .then(() => {
        setCustomers((prev) => prev.filter((u) => u.userId !== id));
      })
      .catch((err) => {
        console.error('Lỗi khi xóa user:', err);
        alert('Xóa thất bại.');
      });
  };

  return (
    <div className="main-wrapper">
      <div className="page-wrapper" style={{ paddingTop: '80px' }}>
        <div className="content container-fluid">
          {/* Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h4 className="card-title float-left mt-2">All Customers</h4>
              </div>
              <div className="col-md-6 text-right">
                <input
                  type="text"
                  className="form-control"
                  style={{ maxWidth: '300px', display: 'inline-block' }}
                  placeholder="Tìm kiếm theo tên..."
                  value={searchKeyword}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table">
                <div className="card-body booking_card">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover table-center mb-0">
                      <thead>
                        <tr>
                          <th>Full Name</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Address</th>
                          <th>Status</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customers.map((c) => (
                          <tr key={c.userId}>
                            <td>{c.fullName}</td>
                            <td>{c.userName}</td>
                            <td>{c.email}</td>
                            <td>{c.phone}</td>
                            <td>{c.address}</td>
                            <td>
                              {c.status ? (
                                <span className="badge badge-success">Active</span>
                              ) : (
                                <span className="badge badge-danger">Inactive</span>
                              )}
                            </td>
                            <td className="text-right">
                              <div className="dropdown">
                                <button
                                  className="action-icon btn"
                                  onClick={() => toggleDropdown(c.userId)}
                                >
                                  <i className="fas fa-ellipsis-v"></i>
                                </button>
                                <div className={`dropdown-menu dropdown-menu-right ${isOpen[c.userId] ? 'show' : ''}`}>
                                  <a className="dropdown-item" href={`/edit-customer?id=${c.userId}`}>
                                    <i className="fas fa-pencil-alt"></i> Edit
                                  </a>
                                  <button className="dropdown-item" onClick={() => handleDelete(c.userId)}>
                                    <i className="fas fa-trash-alt"></i> Delete
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {customers.length === 0 && (
                          <tr><td colSpan="7" className="text-center">Không tìm thấy khách hàng</td></tr>
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

export default AllCustomer;

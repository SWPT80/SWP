import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PAGE_SIZE = 10;

const AllHost = () => {
    const [hosts, setHosts] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
            .get('http://localhost:8080/api/host', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => {
                setHosts(res.data);
                setError('');
                if (res.data.length === 0) {
                    setError('Không tìm thấy chủ nhà nào.');
                }
            })
            .catch((err) => {
                console.error('Lỗi khi tải danh sách chủ nhà:', err);
                setError('Không thể tải danh sách chủ nhà. Vui lòng thử lại.');
            });

        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown')) {
                setOpenIndex(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = (index) => {
        setOpenIndex(prev => prev === index ? null : index);
    };

    const handleDelete = (id) => {
        const token = localStorage.getItem("token");
        if (!window.confirm('Bạn có chắc muốn xóa chủ nhà này?')) return;

        axios
            .delete(`http://localhost:8080/api/host/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
                setHosts((prev) => prev.filter((u) => u.userId !== id));
                setError('');
            })
            .catch((err) => {
                console.error('Lỗi khi xóa chủ nhà:', err);
                setError('Xóa chủ nhà thất bại.');
            });
    };

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
        setCurrentPage(1);
    };

    const filteredHosts = hosts.filter((h) =>
        h.fullName?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        h.userName?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        h.email?.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const totalPages = Math.ceil(filteredHosts.length / PAGE_SIZE) || 1;
    const visibleHosts = filteredHosts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

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
                            <div className="col-md-6">
                                <h4 className="card-title mt-2">
                                    <i className="fas fa-users-cog text-warning mr-2"></i>Tất cả chủ nhà
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
                                                {visibleHosts.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="7" className="text-center">
                                                            <Alert variant="info">Không tìm thấy chủ nhà nào.</Alert>
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    visibleHosts.map((h, index) => (
                                                        <tr key={index}>
                                                            <td>{h.fullName}</td>
                                                            <td>{h.userName}</td>
                                                            <td>{h.email}</td>
                                                            <td>{h.phone}</td>
                                                            <td>{h.address}</td>
                                                            <td>
                                                                {h.status ? (
                                                                    <span className="badge badge-success">
                                                                        <i className="fas fa-check-circle mr-1"></i>Hoạt động
                                                                    </span>
                                                                ) : (
                                                                    <span className="badge badge-danger">
                                                                        <i className="fas fa-times-circle mr-1"></i>Không hoạt động
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="text-right">
                                                                <div className="dropdown">
                                                                    <button
                                                                        className="action-icon btn"
                                                                        onClick={() => toggleDropdown(index)}
                                                                    >
                                                                        <i className="fas fa-ellipsis-v"></i>
                                                                    </button>
                                                                    <div
                                                                        className={`dropdown-menu dropdown-menu-right ${openIndex === index ? 'show' : ''}`}
                                                                    >
                                                                        <a href={`/admin/edit-host/${h.id}`} className="dropdown-item">
                                                                            <i className="fas fa-pencil-alt"></i> Chỉnh sửa
                                                                        </a>
                                                                        <button className="dropdown-item" onClick={() => handleDelete(h.userId)}>
                                                                            <i className="fas fa-trash-alt"></i> Xóa
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

export default AllHost;
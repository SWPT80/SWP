import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PAGE_SIZE = 10;

const AllHost = () => {
    const [hosts, setHosts] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
            .get('http://localhost:8080/api/host', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => setHosts(res.data))
            .catch((err) => console.error('Lỗi khi lấy danh sách host:', err));

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
        if (!window.confirm('Bạn có chắc muốn xóa host này?')) return;

        axios
            .delete(`http://localhost:8080/api/host/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => setHosts((prev) => prev.filter((u) => u.userId !== id)))
            .catch((err) => {
                console.error('Lỗi khi xóa host:', err);
                alert('Xóa thất bại.');
            });
    };

    const totalPages = Math.ceil(hosts.length / PAGE_SIZE) || 1;
    const visibleHosts = hosts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

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
                                    <i className="fas fa-users-cog text-warning mr-2"></i>All Hosts
                                </h4>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <div className="cardDashboard card-table">
                                <div className="cardDashboard-body booking_card">
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
                                                {visibleHosts.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="7" className="text-center">No hosts found</td>
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
                                                                        <i className="fas fa-check-circle mr-1"></i>Active
                                                                    </span>
                                                                ) : (
                                                                    <span className="badge badge-danger">
                                                                        <i className="fas fa-times-circle mr-1"></i>Inactive
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
                                                                            <i className="fas fa-pencil-alt"></i> Edit
                                                                        </a>
                                                                        <button className="dropdown-item" onClick={() => handleDelete(h.userId)}>
                                                                            <i className="fas fa-trash-alt"></i> Delete
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
                                        <span>Page {currentPage} / {totalPages}</span>
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

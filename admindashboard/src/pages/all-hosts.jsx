import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllHost = () => {
    const [hosts, setHosts] = useState([]);
    const [isOpen, setIsOpen] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8080/api/users/hosts')
            .then((res) => setHosts(res.data))
            .catch((err) => console.error('Lỗi khi lấy danh sách host:', err));
    }, []);

    const toggleDropdown = (id) => {
        setIsOpen((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleDelete = (id) => {
        if (!window.confirm('Bạn có chắc muốn xóa host này?')) return;

        axios.delete(`http://localhost:8080/api/users/${id}`)
            .then(() => {
                setHosts((prev) => prev.filter((u) => u.userId !== id));
            })
            .catch((err) => {
                console.error('Lỗi khi xóa host:', err);
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
                                    <h4 className="card-title float-left mt-2">All Hosts</h4>
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
                                                {hosts.map((h) => (
                                                    <tr key={h.userId}>
                                                        <td>{h.fullName}</td>
                                                        <td>{h.userName}</td>
                                                        <td>{h.email}</td>
                                                        <td>{h.phone}</td>
                                                        <td>{h.address}</td>
                                                        <td>
                                                            {h.status ? (
                                                                <span className="badge badge-success">Active</span>
                                                            ) : (
                                                                <span className="badge badge-danger">Inactive</span>
                                                            )}
                                                        </td>
                                                        <td className="text-right">
                                                            <div className="dropdown">
                                                                <button
                                                                    className="action-icon btn"
                                                                    onClick={() => toggleDropdown(h.userId)}
                                                                >
                                                                    <i className="fas fa-ellipsis-v"></i>
                                                                </button>
                                                                <div className={`dropdown-menu dropdown-menu-right ${isOpen[h.userId] ? 'show' : ''}`}>
                                                                    <a className="dropdown-item" href={`/edit-host?id=${h.userId}`}>
                                                                        <i className="fas fa-pencil-alt"></i> Edit
                                                                    </a>
                                                                    <button className="dropdown-item" onClick={() => handleDelete(h.userId)}>
                                                                        <i className="fas fa-trash-alt"></i> Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {hosts.length === 0 && (
                                                    <tr>
                                                        <td colSpan="7" className="text-center">No hosts found</td>
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

export default AllHost;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllService = () => {
  const [services, setServices] = useState([]);
  const [isOpen, setIsOpen] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8080/api/services')
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Lỗi lấy danh sách dịch vụ:", err));
  }, []);

  const toggleDropdown = (id) => {
    setIsOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa dịch vụ này?")) return;

    axios.delete(`http://localhost:8080/api/services/${id}`)
      .then(() => {
        setServices((prev) => prev.filter((s) => s.serviceId !== id));
      })
      .catch((err) => {
        console.error("Lỗi khi xóa service:", err);
        alert("Xóa thất bại.");
      });
  };

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <div className="mt-5 d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">All Services</h4>
                  <a href="/add-service" className="btn btn-primary">Add Service</a>
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
                      <th>Service ID</th>
                      <th>Homestay ID</th>
                      <th>Type</th>
                      <th>Price</th>
                      <th>Notes</th>
                      <th>Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((s) => (
                      <tr key={s.serviceId}>
                        <td>{s.serviceId}</td>
                        <td>{s.homestay?.homestayId || 'N/A'}</td>
                        <td>{s.type?.serviceName || 'Unknown'}</td>
                        <td>{s.price?.toLocaleString()} VND</td>
                        <td>{s.specialNotes || '-'}</td>
                        <td>
                          {s.status ? (
                            <span className="badge badge-success">Active</span>
                          ) : (
                            <span className="badge badge-danger">Inactive</span>
                          )}
                        </td>
                        <td className="text-right">
                          <div className="dropdown">
                            <button
                              className="action-icon btn"
                              onClick={() => toggleDropdown(s.serviceId)}
                            >
                              <i className="fas fa-ellipsis-v"></i>
                            </button>
                            <div className={`dropdown-menu dropdown-menu-right ${isOpen[s.serviceId] ? 'show' : ''}`}>
                              <a className="dropdown-item" href={`/edit-service?id=${s.serviceId}`}>
                                <i className="fas fa-pencil-alt"></i> Edit
                              </a>
                              <button className="dropdown-item" onClick={() => handleDelete(s.serviceId)}>
                                <i className="fas fa-trash-alt"></i> Delete
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {services.length === 0 && (
                      <tr>
                        <td colSpan="7" className="text-center">No services found</td>
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
  );
};

export default AllService;

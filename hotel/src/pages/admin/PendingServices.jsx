import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PendingServices = () => {
  const [pendingServices, setPendingServices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/services/pending")
      .then((res) => setPendingServices(res.data))
      .catch((err) => console.error("Lỗi khi lấy dịch vụ chờ duyệt:", err));
  }, []);

  const handleApprove = (id) => {
    axios.patch(`http://localhost:8080/api/services/${id}/status?status=true`)
      .then(() => {
        alert("Đã duyệt dịch vụ!");
        setPendingServices((prev) => prev.filter((s) => s.id !== id)); // ✅ dùng s.id
      })
      .catch(() => alert("Lỗi duyệt dịch vụ."));
  };

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          <h4 className="mb-4 mt-5">Pending Services</h4>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Service ID</th>
                <th>Homestay ID</th>
                <th>Type</th>
                <th>Price</th>
                <th>Note</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {pendingServices.length > 0 ? pendingServices.map((s) => (
                <tr key={s.id}> {/* ✅ s.id */}
                  <td>{s.id}</td>
                  <td>{s.homestayId || 'N/A'}</td> {/* ✅ s.homestayId */}
                  <td>{s.serviceType?.serviceName || 'N/A'}</td> {/* ✅ s.serviceType */}
                  <td>{s.price?.toLocaleString()} VND</td>
                  <td>{s.specialNotes || '-'}</td>
                  <td>
                    <button className="btn btn-success btn-sm" onClick={() => handleApprove(s.id)}>
                      Duyệt
                    </button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="6" className="text-center">Không có dịch vụ nào cần duyệt.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PendingServices;

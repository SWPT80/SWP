import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosConfig";
import { Pagination, Form, Row, Col } from "react-bootstrap";

const PAGE_SIZE = 10;

const PendingServices = () => {
  const [pendingServices, setPendingServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchHomestayId, setSearchHomestayId] = useState("");
  const [searchType, setSearchType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [homestayMap, setHomestayMap] = useState({});

  useEffect(() => {
    fetchPendingServices();
  }, []);

  useEffect(() => {
    const filtered = pendingServices.filter(s =>
      (searchHomestayId === "" ||
        s.homestayId?.toString().includes(searchHomestayId) ||
        homestayMap[s.homestayId]?.toLowerCase().includes(searchHomestayId.toLowerCase())) &&
      (searchType === "" || s.serviceType?.serviceName.toLowerCase().includes(searchType.toLowerCase()))
    );
    setFilteredServices(filtered);
    setCurrentPage(1);
  }, [searchHomestayId, searchType, pendingServices]);

  const fetchPendingServices = async () => {
    try {
      const res = await axios.get("/api/services/pending");
      setPendingServices(res.data);
      setFilteredServices(res.data);
      await fetchHomestayNames(res.data);
    } catch (err) {
      console.error("Error fetching pending services:", err);
      alert("Unable to load services list.");
    }
  };

  const fetchHomestayNames = async (services) => {
    const uniqueIds = [...new Set(services.map(s => s.homestayId).filter(id => id))];
    const promises = uniqueIds.map(id => axios.get(`/api/homestays/${id}`));
    try {
      const responses = await Promise.all(promises);
      const map = responses.reduce((acc, res) => {
        acc[res.data.id] = res.data.homestayName;
        return acc;
      }, {});
      setHomestayMap(map);
    } catch (err) {
      console.error("Error fetching homestay names:", err);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.patch(`/api/services/${id}/status?status=approved`);
      alert("Service approved successfully!");
      setPendingServices((prev) => prev.filter((s) => s.id !== id));
    } catch {
      alert("Error approving service.");
    }
  };

  const handleReject = async (id) => {
    const reason = prompt("Enter rejection reason (optional):");
    try {
      await axios.patch(`/api/services/${id}/status?status=rejected`);
      alert("Service has been rejected.");
      setPendingServices((prev) => prev.filter((s) => s.id !== id));
    } catch {
      alert("Error rejecting service.");
    }
  };

  const totalPages = Math.ceil(filteredServices.length / PAGE_SIZE) || 1;
  const visibleServices = filteredServices.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="container py-5">
      <h3 className="mb-4">Approve New Services</h3>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by Homestay ID"
            value={searchHomestayId}
            onChange={(e) => setSearchHomestayId(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by Service Type"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          />
        </Col>
      </Row>
      <div className="table-responsive">
        <table className="table table-hover table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Homestay</th>
              <th>Service Type</th>
              <th>Price</th>
              <th>Notes</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleServices.length > 0 ? (
              visibleServices.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.homestayId} - {homestayMap[s.homestayId] || "N/A"}</td>
                  <td>{s.serviceType?.serviceName || "N/A"}</td>
                  <td>{s.price?.toLocaleString()} VND</td>
                  <td>{s.specialNotes || "-"}</td>
                  <td><span className="badge bg-warning text-dark">Pending</span></td>
                  <td>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => handleApprove(s.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleReject(s.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-3">
                  No services found.
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
  );
};

export default PendingServices;
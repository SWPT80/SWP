import React, { useEffect, useState } from "react";
import { fetchAdminReports } from "./reportApi";
import ReportDetailModal from "./ReportDetailModal";
import "bootstrap/dist/css/bootstrap.min.css";

const PAGE_SIZE = 10;

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [alert, setAlert] = useState(null); // ✅ alert trạng thái xử lý

  useEffect(() => {
    fetchAdminReports().then((res) => setReports(res.data));
  }, []);

  const totalPages = Math.ceil(reports.length / PAGE_SIZE);
  const displayedReports = reports.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const showAlert = (message, variant = "success", duration = 4000) => {
    const id = Date.now();
    setAlert({ id, message, variant });
    setTimeout(() => {
      setAlert(null);
    }, duration);
  };

  const getStatusDisplay = (status) => {
    const statusConfig = {
      pending: {
        class: "badge badge-warning",
        text: "Chờ xử lý",
      },
      resolved: {
        class: "badge badge-success",
        text: "Đã giải quyết",
      },
    };

    return (
      statusConfig[status] || {
        class: "badge badge-light",
        text: status,
      }
    );
  };

  return (
    <div className="main-wrapper position-relative">
      {/* Alert Bootstrap cố định */}
      {alert && (
        <div
          className={`alert alert-${alert.variant} alert-dismissible fade show position-fixed`}
          style={{
            top: "20px",
            right: "20px",
            zIndex: 1050,
            minWidth: "300px",
          }}
        >
          <strong>
            {alert.variant === "success" && "✅ Thành công! "}
            {alert.variant === "danger" && "❌ Lỗi! "}
          </strong>
          {alert.message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setAlert(null)}
          ></button>
        </div>
      )}

      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h4 className="card-title mt-2">
                  <i className="fas fa-flag text-danger mr-2"></i>
                  Quản lý báo cáo vi phạm
                </h4>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover table-center mb-0">
                      <thead>
                        <tr>
                          <th>Tên Homestay</th>
                          <th>Tiêu đề</th>
                          <th>Loại vi phạm</th>
                          <th>Trạng thái</th>
                          <th>Ngày tạo</th>
                          <th className="text-end">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayedReports.map((report) => {
                          const statusDisplay = getStatusDisplay(report.status);
                          return (
                            <tr key={report.id}>
                              <td>{report.homestayName || "Không có"}</td>
                              <td>{report.title}</td>
                              <td>{report.reportType}</td>
                              <td>
                                <span className={statusDisplay.class}>
                                  {statusDisplay.text}
                                </span>
                              </td>
                              <td>
                                {new Date(report.createdAt).toLocaleString()}
                              </td>
                              <td className="text-end">
                                <button
                                  className="btn btn-sm btn-primary"
                                  onClick={() => setSelectedReport(report)}
                                >
                                  Xem
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                        {reports.length === 0 && (
                          <tr>
                            <td colSpan="6" className="text-center">
                              Không có báo cáo nào.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    {totalPages > 1 && (
                      <nav className="mt-3">
                        <ul className="pagination justify-content-center">
                          {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                          ).map((page) => (
                            <li
                              key={page}
                              className={`page-item ${
                                page === currentPage ? "active" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => handlePageChange(page)}
                              >
                                {page}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {selectedReport && (
            <ReportDetailModal
              report={selectedReport}
              onClose={() => setSelectedReport(null)}
              onResolved={() => {
                fetchAdminReports().then((res) => {
                  setReports(res.data);
                  showAlert("Đã xử lý báo cáo thành công.", "success");
                });
                setSelectedReport(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportList;

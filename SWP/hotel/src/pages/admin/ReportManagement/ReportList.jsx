import React, { useEffect, useState } from 'react';
import { fetchAdminReports } from './reportApi';
import ReportDetailModal from './ReportDetailModal';

const PAGE_SIZE = 10;

const ReportList = () => {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchAdminReports().then(res => setReports(res.data));
    }, []);

    const totalPages = Math.ceil(reports.length / PAGE_SIZE);
    const displayedReports = reports.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Function to get status badge class and text
    const getStatusDisplay = (status) => {
        const statusConfig = {
            'pending': {
                class: 'badge badge-warning',
                text: 'Chờ xử lý'
            },
            'resolved': {
                class: 'badge badge-success',
                text: 'Đã giải quyết'
            }
        };

        return statusConfig[status] || {
            class: 'badge badge-light',
            text: status
        };
    };

    return (
        <div className="main-wrapper">
            <style jsx>{`
                .status-pending {
                    background-color: #ffc107;
                    color: #212529;
                }
                .status-in_progress {
                    background-color: #17a2b8;
                    color: #fff;
                }
                .status-resolved {
                    background-color: #28a745;
                    color: #fff;
                }
                .status-closed {
                    background-color: #6c757d;
                    color: #fff;
                }
                .badge {
                    display: inline-block;
                    padding: 0.25em 0.4em;
                    font-size: 75%;
                    font-weight: 700;
                    line-height: 1;
                    text-align: center;
                    white-space: nowrap;
                    vertical-align: baseline;
                    border-radius: 0.25rem;
                }
                .badge-warning {
                    background-color: #ffc107;
                    color: #212529;
                }
                .badge-info {
                    background-color: #17a2b8;
                    color: #fff;
                }
                .badge-success {
                    background-color: #28a745;
                    color: #fff;
                }
                .badge-secondary {
                    background-color: #6c757d;
                    color: #fff;
                }
                .badge-light {
                    background-color: #f8f9fa;
                    color: #495057;
                }
            `}</style>

            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="page-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h4 className="card-title mt-2">
                                    <i className="fas fa-flag text-danger mr-2"></i>
                                    Báo cáo vi phạm
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
                                                    <th>Tên homestay</th>
                                                    <th>Tiêu đề</th>
                                                    <th>Loại</th>
                                                    <th>Trạng thái</th>
                                                    <th>Ngày tạo</th>
                                                    <th className="text-right">Hành động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {displayedReports.map(report => {
                                                    const statusDisplay = getStatusDisplay(report.status);
                                                    return (
                                                        <tr key={report.id}>
                                                            <td>{report.homestayName || 'null'}</td>
                                                            <td>{report.title}</td>
                                                            <td>{report.reportType}</td>
                                                            <td>
                                                                <span className={statusDisplay.class}>
                                                                    {statusDisplay.text}
                                                                </span>
                                                            </td>
                                                            <td>{new Date(report.createdAt).toLocaleString()}</td>
                                                            <td className="text-right">
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
                                                            Không có báo cáo nào
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>

                                        {totalPages > 1 && (
                                            <nav className="mt-3">
                                                <ul className="pagination justify-content-center">
                                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                        <li
                                                            key={page}
                                                            className={`page-item ${page === currentPage ? 'active' : ''}`}
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
                                fetchAdminReports().then(res => setReports(res.data));
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
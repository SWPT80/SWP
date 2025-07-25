import React, { useEffect, useState } from 'react';
import { fetchAdminReports } from './reportApi';
import ReportDetailModal from './ReportDetailModal';

const ReportList = () => {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);

    useEffect(() => {
        fetchAdminReports().then(res => setReports(res.data));
    }, []);

    return (
        <div className="main-wrapper">
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
                                                    <th>Tiêu đề</th>
                                                    <th>Loại</th>
                                                    <th>Trạng thái</th>
                                                    <th>Ngày tạo</th>
                                                    <th className="text-right">Hành động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reports.map(report => (
                                                    <tr key={report.id}>
                                                        <td>{report.title}</td>
                                                        <td>{report.reportType}</td>
                                                        <td>{report.status}</td>
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
                                                ))}
                                                {reports.length === 0 && (
                                                    <tr>
                                                        <td colSpan="5" className="text-center">
                                                            Không có báo cáo nào
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
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

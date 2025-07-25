import React, { useState, useEffect } from 'react';
import { resolveReport } from './reportApi';

const ACTIONS = ['Cảnh cáo', 'Phạt tiền', 'Đình chỉ', 'Cấm vĩnh viễn'];

const ReportDetailModal = ({ report, onClose, onResolved }) => {
    const [actionTaken, setActionTaken] = useState('');
    const [resolutionNote, setResolutionNote] = useState('');
    const isResolved = report.status === 'resolved';

    useEffect(() => {
        if (isResolved) {
            setActionTaken(report.actionTaken || '');
            setResolutionNote(report.resolutionNote || '');
        }
    }, [report, isResolved]);

    const handleSubmit = async () => {
        if (!actionTaken) {
            alert("Vui lòng chọn hành động xử lý!");
            return;
        }

        try {
            await resolveReport(report.id, {
                actionTaken,
                resolutionNote,
            });
            alert("Xử lý báo cáo thành công!");
            onResolved();
        } catch (error) {
            console.error("Lỗi xử lý báo cáo:", error);
            alert("Đã xảy ra lỗi khi xử lý báo cáo");
        }
    };

    return (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Chi tiết báo cáo</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <p><strong>Tiêu đề:</strong> {report.title}</p>
                        <p><strong>Loại:</strong> {report.reportType}</p>
                        <p><strong>Mô tả:</strong> {report.description}</p>

                        {isResolved ? (
                            <div className="alert alert-success mt-3">
                                <p><strong>Đã xử lý:</strong> {report.actionTaken}</p>
                                <p><strong>Ghi chú xử lý:</strong> {report.resolutionNote}</p>
                            </div>
                        ) : (
                            <>
                                <div className="form-group mt-3">
                                    <label>Hành động xử lý:</label>
                                    <select
                                        className="form-control"
                                        value={actionTaken}
                                        onChange={(e) => setActionTaken(e.target.value)}
                                    >
                                        <option value="">-- Chọn hành động --</option>
                                        {ACTIONS.map(a => (
                                            <option key={a} value={a}>{a}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group mt-3">
                                    <label>Ghi chú xử lý:</label>
                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        value={resolutionNote}
                                        onChange={(e) => setResolutionNote(e.target.value)}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
                        {!isResolved && (
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                Xác nhận xử lý
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportDetailModal;

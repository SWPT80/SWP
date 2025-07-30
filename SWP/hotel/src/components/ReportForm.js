import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import { Form, Button, Alert } from 'react-bootstrap';

const ReportForm = ({ bookingId, userId, homestayId, roomNumber }) => {
    const [reportType, setReportType] = useState('homestay');
    const [serviceId, setServiceId] = useState('');
    const [serviceOptions, setServiceOptions] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // 🟡 Khi chọn loại "service", tự động load danh sách dịch vụ từ API
    useEffect(() => {
        const fetchServices = async () => {
            if (reportType === 'service' && homestayId) {
                try {
                    const res = await axios.get(`/api/services/homestay/${homestayId}`);
                    setServiceOptions(res.data);
                } catch (err) {
                    console.error('Không thể load dịch vụ:', err);
                    setServiceOptions([]);
                }
            }
        };
        fetchServices();
    }, [reportType, homestayId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const reportData = {
            userId,
            homestayId: reportType === 'homestay' || reportType === 'service' ? homestayId : null,
            roomNumber: reportType === 'room' ? roomNumber : null,
            serviceId: reportType === 'service' ? Number(serviceId) : null,
            reportType,
            title,
            description
        };

        try {
            await axios.post('/api/host-reports', reportData);
            setSuccess('Gửi báo cáo thành công!');
            setTitle('');
            setDescription('');
            setServiceId('');
        } catch (err) {
            console.error('Lỗi gửi báo cáo:', err);
            setError('Không thể gửi báo cáo. Vui lòng thử lại.');
        }

        console.log("Report data gửi đi:", reportData);
    };

    return (
        <Form onSubmit={handleSubmit}>
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group controlId="reportType" className="mb-3">
                <Form.Label>Loại báo cáo</Form.Label>
                <Form.Select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                    <option value="homestay">Homestay</option>
                    <option value="room">Phòng</option>
                    <option value="service">Dịch vụ</option>
                </Form.Select>
            </Form.Group>

            {reportType === 'service' && (
                <Form.Group controlId="serviceId" className="mb-3">
                    <Form.Label>Chọn dịch vụ</Form.Label>
                    <Form.Select
                        value={serviceId}
                        onChange={(e) => setServiceId(e.target.value)}
                        required
                    >
                        <option value="">-- Chọn dịch vụ --</option>
                        {serviceOptions.map(service => (
                            <option key={service.id} value={service.id}>
                                {service.serviceType?.serviceName || service.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            )}

            <Form.Group controlId="title" className="mb-3">
                <Form.Label>Tiêu đề</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nhập tiêu đề"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="description" className="mb-3">
                <Form.Label>Mô tả chi tiết</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Nhập nội dung báo cáo"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </Form.Group>

            <Button variant="danger" type="submit">Gửi báo cáo</Button>
        </Form>
    );
};

export default ReportForm;

import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const ReviewForm = ({ bookingId, userId, services = [] }) => {
    const [roomRating, setRoomRating] = useState(5);
    const [roomComment, setRoomComment] = useState('');
    const [serviceReviews, setServiceReviews] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Khởi tạo serviceReviews khi services thay đổi
    useEffect(() => {
        if (Array.isArray(services) && services.length > 0) {
            const initialReviews = services.map(service => ({
                serviceId: service.id,
                rating: 5,
                comment: '',
            }));
            setServiceReviews(initialReviews);
        }
    }, [services]);

    const handleServiceChange = (index, field, value) => {
        const updated = [...serviceReviews];
        updated[index][field] = field === 'rating' ? parseFloat(value) : value;
        setServiceReviews(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/reviews/submit', {
                bookingId,
                userId,
                roomRating,
                roomComment,
                serviceReviews
            });
            setSuccessMessage("Đánh giá của bạn đã được gửi.");
            setErrorMessage('');
        } catch (err) {
            setErrorMessage(err.response?.data || 'Có lỗi xảy ra khi gửi đánh giá.');
            setSuccessMessage('');
        }
    };

    return (
        <Card className="p-4 my-4">
            <h3>Gửi đánh giá của bạn</h3>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Đánh giá phòng</Form.Label>
                    <Form.Control
                        type="number"
                        min="1"
                        max="5"
                        step="0.5"
                        value={roomRating}
                        onChange={(e) => setRoomRating(parseFloat(e.target.value))}
                        required
                    />
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Label>Nhận xét phòng</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={roomComment}
                        onChange={(e) => setRoomComment(e.target.value)}
                        required
                    />
                </Form.Group>

                <hr />
                <h5>Đánh giá dịch vụ</h5>
                {serviceReviews.length > 0 ? serviceReviews.map((s, index) => (
                    <div key={index}>
                        <Form.Group>
                            <Form.Label>Dịch vụ: {services[index]?.name || 'Không rõ'}</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="5"
                                step="0.5"
                                value={s.rating}
                                onChange={(e) => handleServiceChange(index, 'rating', e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nhận xét</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={s.comment}
                                onChange={(e) => handleServiceChange(index, 'comment', e.target.value)}
                            />
                        </Form.Group>
                    </div>
                )) : <p>Không có dịch vụ nào để đánh giá.</p>}

                <Button type="submit" variant="primary">Gửi đánh giá</Button>
            </Form>
        </Card>
    );
};

export default ReviewForm;

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../utils/axiosConfig';
import ReviewForm from './ReviewForm';

const ReviewPage = () => {
    const location = useLocation();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const bookingId = new URLSearchParams(location.search).get('bookingId');

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const res = await axios.get(`/api/bookings/${bookingId}`, {
                    params: { includeDetails: true }
                });

                const data = res.data;

                // Nếu serviceDetails null hoặc không phải mảng → gán []
                data.serviceDetails = Array.isArray(data.serviceDetails)
                    ? data.serviceDetails
                    : [];

                setBooking(data);
            } catch (err) {
                console.error(err);
                setError('Không thể tải thông tin đặt phòng.');
            } finally {
                setLoading(false);
            }
        };

        if (bookingId) {
            fetchBooking();
        } else {
            setError('Thiếu mã đặt phòng (bookingId).');
            setLoading(false);
        }
    }, [bookingId]);

    if (loading) return <div className="container my-5">Đang tải...</div>;
    if (error) return <div className="container my-5 text-danger">{error}</div>;

    return (
        <div className="container my-5">
            <h2>Đánh giá trải nghiệm</h2>
            {booking ? (
                <ReviewForm
                    bookingId={booking.id}
                    userId={booking.userId}
                    services={booking.serviceDetails.map(s => ({
                        id: s.id,
                        name: s.serviceType?.serviceName || `Dịch vụ #${s.id}`
                    }))}
                />
            ) : (
                <div>Không tìm thấy thông tin đặt phòng.</div>
            )}
        </div>
    );
};

export default ReviewPage;
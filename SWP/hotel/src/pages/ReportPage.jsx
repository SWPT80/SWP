import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../utils/axiosConfig';
import ReportForm from '../components/ReportForm';

const ReportPage = () => {
    const location = useLocation();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const bookingId = new URLSearchParams(location.search).get('bookingId');

    useEffect(() => {
        const fetchBookingInfo = async () => {
            try {
                const res = await axios.get(`/api/host-reports/booking-info/${bookingId}`);
                const data = res.data;

                // Gán serviceDetails nếu null hoặc không phải mảng
                data.serviceDetails = Array.isArray(data.serviceDetails)
                    ? data.serviceDetails
                    : [];

                setBooking(data);
            } catch (err) {
                console.error('Lỗi khi tải booking info:', err);
                setError('Không thể tải thông tin đặt phòng.');
            } finally {
                setLoading(false);
            }
        };

        if (bookingId) {
            fetchBookingInfo();
        } else {
            setError('Thiếu mã đặt phòng (bookingId).');
            setLoading(false);
        }
    }, [bookingId]);

    if (loading) return <div className="container my-5">Đang tải...</div>;
    if (error) return <div className="container my-5 text-danger">{error}</div>;

    return (
        <div className="container my-5">
            <h2>Báo cáo vi phạm</h2>
            {booking ? (
                <ReportForm
                    bookingId={booking.bookingId}
                    userId={booking.userId}
                    homestayId={booking.homestayId}
                    roomNumber={booking.roomNumber}
                    services={booking.serviceDetails.map(s => ({
                        id: s.id,
                        name: s.name || `Dịch vụ #${s.id}`
                    }))}
                />
            ) : (
                <div>Không tìm thấy thông tin đặt phòng.</div>
            )}
        </div>
    );
};

export default ReportPage;

import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from '../context/WebSocketContext';
import axios from '../utils/axiosConfig';

import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Form,
    Modal,
    ListGroup,
    Badge,
    Tabs,
    Tab,
    Alert,
    Spinner,
    Pagination,
    InputGroup
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReviewForm from './ReviewForm';

const Booked = () => {
    const { isLoggedIn, user } = useAuth();
    const { bookings: realTimeBookings } = useWebSocket();
    const navigate = useNavigate();

    const [activeReviewBookingId, setActiveReviewBookingId] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('all');

    const [selectedBooking, setSelectedBooking] = useState(null);

    const [showReportModal, setShowReportModal] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);

    const [reportType, setReportType] = useState('');
    const [reportContent, setReportContent] = useState('');
    const [reportTypes] = useState([
        'Chất lượng dịch vụ không như mô tả',
        'Vấn đề về vệ sinh',
        'Thái độ không chuyên nghiệp của host',
        'Vấn đề về an toàn',
        'Khác'
    ]);

    const [messageContent, setMessageContent] = useState('');

    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewContent, setReviewContent] = useState('');

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const showToast = (message, type = 'info') => {
        const options = {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        };
        if (type === 'error') {
            toast.error(message, options);
        } else if (type === 'success') {
            toast.success(message, options);
        } else {
            toast.info(message, options);
        }
    };

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
        fetchBookings();
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        console.log(bookings);
    }, [bookings]);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/bookings/user/${user.id}`);
            setBookings(response.data);
            if (response.data.length === 0) {
                showToast('Bạn chưa có booking nào');
            }
        } catch (err) {
            console.error('Lỗi khi lấy danh sách booking:', err);
            setError('Không thể tải danh sách đặt phòng. Vui lòng thử lại sau.');
            showToast('Không thể tải danh sách đặt phòng. Vui lòng thử lại sau.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const combinedBookings = useMemo(() => {
        const all = [...bookings, ...realTimeBookings];
        const map = new Map();
        all.forEach((booking) => {
            const key = `${booking.homestay?.id || booking.homestayId || booking.homestay?.homestayName}-${booking.room?.id || booking.roomId || booking.roomNumber || booking.room?.type}-${booking.checkInDate}-${booking.checkOutDate}-${booking.totalAmount}-${booking.totalPeople}`;
            if (!map.has(key)) {
                map.set(key, booking);
            }
        });
        return Array.from(map.values());
    }, [bookings, realTimeBookings]);

    const bookingTabs = useMemo(() => {
        const now = new Date();
        return {
            all: combinedBookings,
            upcoming: combinedBookings.filter(
                (b) => new Date(b.checkInDate) > now && b.status !== 'CANCELLED'
            ),
            current: combinedBookings.filter((b) => {
                const checkIn = new Date(b.checkInDate);
                const checkOut = new Date(b.checkOutDate);
                return checkIn <= now && checkOut >= now && b.status !== 'CANCELLED';
            }),
            past: combinedBookings.filter(
                (b) => new Date(b.checkOutDate) < now && b.status !== 'CANCELLED'
            ),
            cancelled: combinedBookings.filter((b) => b.status === 'CANCELLED'),
        };
    }, [combinedBookings]);

    const filteredBookings = useMemo(() => {
        const tabBookings = bookingTabs[activeTab];
        if (!searchQuery) return tabBookings;
        const lowerQuery = searchQuery.toLowerCase();
        return tabBookings.filter(booking =>
            (booking.homestay?.homestayName || '').toLowerCase().includes(lowerQuery) ||
            (booking.room?.type || '').toLowerCase().includes(lowerQuery) ||
            new Date(booking.checkInDate).toLocaleDateString('vi-VN').includes(lowerQuery) ||
            new Date(booking.checkOutDate).toLocaleDateString('vi-VN').includes(lowerQuery)
        );
    }, [bookingTabs, activeTab, searchQuery]);

    const paginatedBookings = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredBookings.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredBookings, currentPage]);

    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, searchQuery]);

    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm('Bạn chắc chắn muốn hủy đặt phòng này?')) return;
        try {
            await axios.put(`/api/bookings/${bookingId}/cancel`);
            showToast('Đã hủy đặt phòng thành công', 'success');
            fetchBookings();
        } catch (err) {
            console.error(err);
            showToast('Hủy đặt phòng thất bại: ' + (err.response?.data || err.message), 'error');
        }
    };

    // const handleSubmitReport = async () => {
    //     if (!reportType || !reportContent.trim()) {
    //         showToast('Vui lòng điền đầy đủ thông tin báo cáo', 'error');
    //         return;
    //     }

    //     try {
    //         await axios.post('/api/reports', {
    //             bookingId: selectedBooking.id,
    //             type: reportType,
    //             content: reportContent,
    //             homestayId: selectedBooking.homestayId
    //         });

    //         showToast('Gửi báo cáo thành công', 'success');
    //         setShowReportModal(false);
    //         setReportType('');
    //         setReportContent('');
    //     } catch (err) {
    //         console.error('Lỗi khi gửi báo cáo:', err);
    //         showToast('Không thể gửi báo cáo. Vui lòng thử lại.', 'error');
    //     }
    // };

    const handleReport = (booking) => {
        navigate(`/report?bookingId=${booking.id}`, {
            state: {
                bookingId: booking.id,
                userId: booking.user?.id,
                homestayId: booking.homestay?.id,
                roomNumber: booking.roomNumber,
                services: booking.serviceDetails || [],
            },
        });
    };

    const handleSendMessage = async () => {
        if (!messageContent.trim()) {
            showToast('Vui lòng nhập nội dung tin nhắn', 'error');
            return;
        }

        try {
            await axios.post('/api/messages', {
                bookingId: selectedBooking.id,
                recipientId: selectedBooking.homestay?.hostId,
                content: messageContent
            });

            showToast('Gửi tin nhắn thành công', 'success');
            setShowMessageModal(false);
            setMessageContent('');
        } catch (err) {
            console.error('Lỗi khi gửi tin nhắn:', err);
            showToast('Không thể gửi tin nhắn. Vui lòng thử lại.', 'error');
        }
    };

    const handleWriteReview = (booking) => {
        setSelectedBooking(booking);
        setReviewRating(0);
        setReviewContent('');
        setShowReviewModal(true);
    };

    // const handleSubmitReview = async () => {
    //     if (reviewRating === 0 || !reviewContent.trim()) {
    //         showToast('Vui lòng chọn số sao và nhập nội dung', 'error');
    //         return;
    //     }

    //     try {
    //         await axios.post('/api/reviews', {
    //             bookingId: selectedBooking.id,
    //             rating: reviewRating,
    //             content: reviewContent
    //         });
    //         showToast('Đánh giá thành công', 'success');
    //         setShowReviewModal(false);
    //         fetchBookings();
    //     } catch (err) {
    //         console.error('Lỗi khi gửi đánh giá:', err);
    //         showToast('Không thể gửi đánh giá. Vui lòng thử lại.', 'error');
    //     }
    // };

    const getStatusBadge = (status, checkInDate, checkOutDate) => {
        const now = new Date();
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        if (status === 'CANCELLED') {
            return { variant: 'danger', text: 'Đã hủy' };
        }

        if (status === 'PENDING') {
            return { variant: 'warning', text: 'Pending' };
        }

        if (status === 'COMPLETED') {
            return { variant: 'success', text: 'Hoàn thành' };
        }

        if (checkIn <= now && checkOut >= now) {
            return { variant: 'primary', text: 'Đang diễn ra' };
        }

        if (checkIn > now) {
            return { variant: 'success', text: 'Success' };
        }

        if (checkOut < now) {
            return { variant: 'secondary', text: 'Đã kết thúc' };
        }

        return { variant: 'info', text: 'Đã xác nhận' };
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    };

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Đang tải...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center py-5">
                <Alert variant="danger">{error}</Alert>
                <Button variant="primary" onClick={fetchBookings}>
                    Thử lại
                </Button>
            </Container>
        );
    }

    return (
        <Container className="my-4">
            <ToastContainer />

            <Row className="mb-4">
                <Col>
                    <h1 className="mb-4">Đặt phòng của tôi</h1>

                    <Tabs
                        activeKey={activeTab}
                        onSelect={(k) => setActiveTab(k)}
                        className="mb-4"
                    >
                        <Tab eventKey="all" title={`Tất cả (${bookingTabs.all.length})`} />
                        <Tab eventKey="upcoming" title={`Sắp tới (${bookingTabs.upcoming.length})`} />
                        <Tab eventKey="current" title={`Đang diễn ra (${bookingTabs.current.length})`} />
                        <Tab eventKey="past" title={`Đã kết thúc (${bookingTabs.past.length})`} />
                        <Tab eventKey="cancelled" title={`Đã hủy (${bookingTabs.cancelled.length})`} />
                    </Tabs>

                    <InputGroup className="mb-4">
                        <Form.Control
                            type="text"
                            placeholder="Tìm kiếm theo tên homestay, loại phòng, ngày..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button variant="outline-secondary">
                            <i className="bi bi-search"></i>
                        </Button>
                    </InputGroup>
                </Col>
            </Row>

            <Row>
                {paginatedBookings.length === 0 ? (
                    <Col>
                        <Alert variant="info" className="text-center">
                            <i className="bi bi-info-circle fs-1 mb-3 d-block"></i>
                            <h4>Không có đặt phòng nào</h4>
                            <p>Bạn chưa có đặt phòng nào trong danh mục này.</p>
                            <Button variant="primary" onClick={() => navigate('/')}>
                                Khám phá homestay
                            </Button>
                        </Alert>
                    </Col>
                ) : (
                    paginatedBookings.map((booking) => {
                        const statusBadge = getStatusBadge(booking.status, booking.checkInDate, booking.checkOutDate);
                        const now = new Date();
                        const checkIn = new Date(booking.checkInDate);
                        const checkOut = new Date(booking.checkOutDate);
                        const status = booking.status;
                        return (
                            <Col lg={6} key={booking.id} className="mb-4">
                                <Card className="h-100 shadow-sm booking-card">
                                    <Row className="g-0">
                                        <Col md={4}>
                                            <Card.Img
                                                variant="top"
                                                src={
                                                    booking.roomImages?.[0] ||
                                                    booking.homestayImages?.[0] ||
                                                    'images/homestay.jpg'
                                                }
                                                alt="Homestay"
                                                className="h-100"
                                                style={{ objectFit: 'cover', minHeight: '200px' }}
                                            />
                                        </Col>
                                        <Col md={8}>
                                            <Card.Body className="d-flex flex-column h-100">
                                                <div className="flex-grow-1">
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <Card.Title className="mb-1">
                                                            {booking.homestayName || 'Homestay'}
                                                        </Card.Title>
                                                        <Badge bg={statusBadge.variant}>
                                                            {statusBadge.text}
                                                        </Badge>
                                                    </div>

                                                    <Card.Subtitle className="mb-2 text-muted">
                                                        {booking.room?.type || `Phòng ${booking.roomNumber}`}
                                                    </Card.Subtitle>

                                                    <ListGroup variant="flush" className="small">
                                                        <ListGroup.Item className="px-0 py-1">
                                                            <i className="bi bi-calendar-check text-success me-2"></i>
                                                            Nhận phòng: {new Date(booking.checkInDate).toLocaleDateString('vi-VN')}
                                                        </ListGroup.Item>
                                                        <ListGroup.Item className="px-0 py-1">
                                                            <i className="bi bi-calendar-x text-danger me-2"></i>
                                                            Trả phòng: {new Date(booking.checkOutDate).toLocaleDateString('vi-VN')}
                                                        </ListGroup.Item>
                                                        <ListGroup.Item className="px-0 py-1">
                                                            <i className="bi bi-people text-primary me-2"></i>
                                                            Khách: {booking.totalPeople} người
                                                        </ListGroup.Item>
                                                        <ListGroup.Item className="px-0 py-1">
                                                            <i className="bi bi-cash text-warning me-2"></i>
                                                            Tổng tiền: <strong>{formatPrice(booking.totalAmount)}</strong>
                                                        </ListGroup.Item>
                                                    </ListGroup>
                                                </div>

                                                <div className="mt-3 pt-2 border-top">
                                                    <div className="d-flex gap-2 flex-wrap">
                                                        {status !== 'CANCELLED' && checkIn > now && (
                                                            <Button
                                                                variant="outline-danger"
                                                                size="sm"
                                                                onClick={() => handleCancelBooking(booking.id)}
                                                            >
                                                                <i className="bi bi-x-circle me-1"></i>
                                                                Hủy đặt phòng
                                                            </Button>
                                                        )}

                                                        {(status === 'COMPLETED' || checkOut < now) && !booking.reviews?.length && (
                                                            <Button
                                                                variant="outline-success"
                                                                size="sm"
                                                                onClick={() => handleWriteReview(booking)}
                                                            >
                                                                <i className="bi bi-star me-1"></i>
                                                                Đánh giá
                                                            </Button>
                                                        )}

                                                        {/* <Button
                                                            variant="outline-warning"
                                                            size="sm"
                                                            onClick={() => {
                                                                setSelectedBooking(booking);
                                                                setShowReportModal(true);
                                                            }}
                                                        >
                                                            <i className="bi bi-flag me-1"></i>
                                                            Báo cáo
                                                        </Button> */}

                                                        <Button variant="danger" onClick={() => handleReport(booking)}>
                                                            Báo cáo vi phạm
                                                        </Button>

                                                        <Button
                                                            variant="outline-info"
                                                            size="sm"
                                                            onClick={() => {
                                                                setSelectedBooking(booking);
                                                                setShowMessageModal(true);
                                                            }}
                                                        >
                                                            <i className="bi bi-chat-dots me-1"></i>
                                                            Nhắn tin
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        );
                    })
                )}
            </Row>

            {totalPages > 1 && (
                <Pagination className="justify-content-center mt-4">
                    <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <Pagination.Item key={page} active={page === currentPage} onClick={() => setCurrentPage(page)}>
                            {page}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
            )}

            {/* Modal gửi báo cáo */}
            {/* <Modal show={showReportModal} onHide={() => setShowReportModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Gửi báo cáo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Loại báo cáo</Form.Label>
                        <Form.Select
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                        >
                            <option value="">Chọn loại báo cáo...</option>
                            {reportTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Nội dung báo cáo</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            value={reportContent}
                            onChange={(e) => setReportContent(e.target.value)}
                            placeholder="Mô tả chi tiết vấn đề bạn gặp phải..."
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowReportModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="warning" onClick={handleSubmitReport}>
                        <i className="bi bi-flag me-1"></i>
                        Gửi báo cáo
                    </Button>
                </Modal.Footer>
            </Modal> */}

            {/* Modal nhắn tin với host */}
            <Modal show={showMessageModal} onHide={() => setShowMessageModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Nhắn tin với host</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Tin nhắn</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                            placeholder="Nhập tin nhắn bạn muốn gửi cho host..."
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowMessageModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="info" onClick={handleSendMessage}>
                        <i className="bi bi-send me-1"></i>
                        Gửi tin nhắn
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal đánh giá */}
            <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Đánh giá đặt phòng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedBooking && (
                        <ReviewForm
                            bookingId={selectedBooking.id}
                            userId={selectedBooking.userId}
                            services={selectedBooking.serviceDetails?.map((service) => ({
                                id: service.id,
                                name: service.serviceType?.serviceName || `Dịch vụ #${service.id}`,
                            }))}
                            onSuccess={() => setShowReviewModal(false)}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Booked;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Tabs, Tab, Form, Button, Table, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import '../assets/styles/Profile.css';
import Header from '../components/Header';
import { Toast, ToastContainer } from 'react-bootstrap';



const Profiles = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({
    userId: '',
    userName: '',
    fullName: '',
    email: '',
    phone: '',
    birthdate: '',
    address: '',
    role: 'user',
    status: 'active',
    bookings: [],

  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const [toastMessage, setToastMessage] = useState('');
const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vui lòng đăng nhập để truy cập trang này!');
      navigate('/admin/login');
      return;
    }

    const fetchBookings = async (userId) => {
      try {
        const res = await axios.get(`http://localhost:8080/api/bookings/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data && Array.isArray(res.data)) {
          setUserData((prev) => ({
            ...prev,
            bookings: res.data,
          }));
        }
      } catch (err) {
        console.error('Lỗi khi tải danh sách đặt chỗ:', err);
        setError('Không thể tải danh sách đặt chỗ.');
      }
    };

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://localhost:8080/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data && typeof response.data === 'object') {
          const userInfo = {
            userId: response.data.userId || '',
            userName: response.data.userName || '',
            fullName: response.data.fullName || '',
            email: response.data.email || '',
            phone: response.data.phone || '',
            birthdate: response.data.birthdate || '',
            address: response.data.address || '',
            role: response.data.role || 'user',
            status: response.data.status ? 'active' : 'inactive',
            emailConfirmed: response.data.emailConfirmed ?? false,
            invoices: response.data.invoices || [],
            trips: response.data.trips || [],
            bookings: [],
            favorites: response.data.favorites || [],
          };
          setUserData(userInfo);

          // 🔥 Gọi API bookings sau khi đã có userId
          await fetchBookings(userInfo.userId);
        } else {
          throw new Error('Dữ liệu trả về từ server không hợp lệ');
        }
      } catch (err) {
        const errorMessage = err.response
          ? `Mã lỗi ${err.response.status}: ${err.response.data.message || err.response.statusText}`
          : err.message;
        setError(`Không thể tải thông tin profile: ${errorMessage}`);
        if (err.response?.status === 401) {
          alert('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!');
          localStorage.removeItem('token');
          navigate('/admin/login');
        } else if (err.response?.status === 403) {
          setError('Bạn không có quyền truy cập trang này. Vui lòng kiểm tra vai trò hoặc liên hệ admin.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const saveProfile = async () => {
    setError('');
    setSuccess('');
    setLoading(true);
  
    if (!validateEmail(userData.email)) {
      setToastMessage('Định dạng email không hợp lệ!');
      setShowToast(true);
      setLoading(false);
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('http://localhost:8080/api/users/me', {
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        birthdate: userData.birthdate,
        address: userData.address,
        userName: userData.userName
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (res.data && typeof res.data === 'object') {
        setUserData((prev) => ({
          ...prev,
          ...res.data
        }));
      }
  
      setToastMessage('Cập nhật hồ sơ thành công!');
      setShowToast(true);
    } catch (err) {
      setToastMessage(err.response?.data?.message || 'Lỗi khi cập nhật hồ sơ');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };
  
  const cancelEdit = () => {
    setError('');
    setSuccess('');
    setToastMessage('Hủy bỏ các thay đổi!');
    setShowToast(true);
  };
  

  return (
    <>
    <Header />
    <Container className="light-style flex-grow-1 container-p-y" style={{ paddingTop: '143px' }}>
      <h4 className="font-weight-bold py-3 mb-4">Hồ Sơ Người Dùng</h4>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      {loading && <div className="text-center my-3"><Spinner animation="border" /></div>}
      {!loading && (
        <Card className="overflow-hidden">
          <Row className="no-gutters row-bordered row-border-light">
            <Col md={3} className="pt-0">
              <div className="list-group list-group-flush account-settings-links">
                <Button variant="link" className={`list-group-item list-group-item-action ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                  Hồ Sơ
                </Button>
                <Button variant="link" className={`list-group-item list-group-item-action ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
                  Đặt Chỗ
                </Button>
              </div>
            </Col>
            <Col md={9}>
              <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
                <Tab eventKey="profile" title="Thông Tin Hồ Sơ">
                  <div className="p-3">
                    <Card className="shadow-sm rounded-4 mb-4">
                      <Card.Body>
                        <h5 className="mb-4 fw-semibold">Thông Tin Cá Nhân</h5>
                        <Row className="gy-3">
                          <Col md={6}><Form.Group><Form.Label>Họ và tên</Form.Label><Form.Control type="text" value={userData.fullName} onChange={(e) => setUserData({ ...userData, fullName: e.target.value })} /></Form.Group></Col>
                          <Col md={6}><Form.Group><Form.Label>Tên đăng nhập</Form.Label><Form.Control type="text" value={userData.userName} onChange={(e) => setUserData({ ...userData, userName: e.target.value })} /></Form.Group></Col>
                          <Col md={6}><Form.Group><Form.Label>Email</Form.Label><Form.Control type="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} /></Form.Group></Col>
                          <Col md={6}><Form.Group><Form.Label>Số điện thoại</Form.Label><Form.Control type="tel" value={userData.phone} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} /></Form.Group></Col>
                          <Col md={6}><Form.Group><Form.Label>Ngày sinh</Form.Label><Form.Control type="date" value={userData.birthdate} onChange={(e) => setUserData({ ...userData, birthdate: e.target.value })} /></Form.Group></Col>
                          <Col md={6}><Form.Group><Form.Label>Địa chỉ</Form.Label><Form.Control type="text" value={userData.address} onChange={(e) => setUserData({ ...userData, address: e.target.value })} /></Form.Group></Col>
                          <Col md={6}><Form.Group><Form.Label>Vai trò</Form.Label><Form.Control as="select" value={userData.role} disabled><option value="user">Người dùng</option><option value="host">Host</option><option value="admin">Quản trị viên</option></Form.Control></Form.Group></Col>
                          <Col md={6}><Form.Group><Form.Label>Trạng thái</Form.Label><Form.Control as="select" value={userData.status} disabled><option value="active">Hoạt động</option><option value="inactive">Không hoạt động</option></Form.Control></Form.Group></Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </div>
                </Tab>
                <Tab eventKey="bookings" title="Đặt Chỗ">
                  <div className="p-3">
                    <h5 className="mb-4 fw-semibold">Danh Sách Đặt Chỗ</h5>
                    <Row xs={1} md={2} lg={3} className="g-4">
                      {userData.bookings.length > 0 ? (
                        userData.bookings.map((booking) => (
                          <Col key={booking.id}>
                            <Card className="h-100 shadow-sm">
                            <Card.Img
                                  variant="top"
                                  src={
                                    booking.homestayImages && booking.homestayImages.length > 0
                                      ? booking.homestayImages[0]
                                      : 'https://via.placeholder.com/300x200'
                                  }
                                />
                              <Card.Body>
                                <Card.Title>{booking.homestayName}</Card.Title>
                                <Card.Text>
                                  <strong>Ngày đặt:</strong> {new Date(booking.bookingDate).toLocaleDateString()}<br />
                                  <strong>Trạng thái:</strong> {booking.status}<br />
                                  <strong>Giá:</strong> {booking.totalPrice?.toLocaleString()} VND
                                </Card.Text>
                                <Button variant="primary" size="sm" onClick={() => navigate(`/booking/${booking.id}`)}>Xem Chi Tiết</Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))
                      ) : (
                        <p>Chưa có đặt chỗ nào.</p>
                      )}
                    </Row>
                  </div>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Card>
      )}
      <div className="text-end mt-4">
        <Button variant="primary" onClick={saveProfile} disabled={loading}>Lưu Thay Đổi</Button>
        <Button variant="secondary" className="ms-2" onClick={cancelEdit} disabled={loading}>Hủy</Button>
      </div>
    </Container>


    <ToastContainer
        position="middle-center"
        className="p-3"
        style={{ zIndex: 9999 }}
      >
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide bg="info">
          <Toast.Body className="text-white text-center">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default Profiles;
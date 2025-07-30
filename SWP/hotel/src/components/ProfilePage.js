import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Tabs, Tab, Form, Button, Table, Pagination, Collapse, Alert, Spinner } from 'react-bootstrap';
import axios from '../utils/axiosConfig';
import { useAuth } from '../context/AuthContext';
import '../assets/styles/Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profiles = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, checkAuth } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
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
    profilePhoto: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    emailConfirmed: false,
    invoices: [],
    trips: [],
    bookings: [],
    vouchers: [],
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [openCollapses, setOpenCollapses] = useState({});

  const homestayServices = {
    'Mountain Retreat': [
      { serviceId: 'SERV001', serviceName: 'Gói ăn sáng', price: '20.000đ', status: 'Đã xác nhận' },
      { serviceId: 'SERV002', serviceName: 'Hướng dẫn tham quan', price: '30.000đ', status: 'Có sẵn' },
    ],
    'Beachside Villa': [
      { serviceId: 'SERV003', serviceName: 'Đưa đón sân bay', price: '50.000đ', status: 'Đang chờ' },
      { serviceId: 'SERV004', serviceName: 'Gói spa', price: '70.000đ', status: 'Có sẵn' },
    ],
  };

  const itemsPerPage = 2;

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      setLoading(true);
      setError('');
      try {
        await checkAuth();

        const profileResponse = await axios.get('http://localhost:8080/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Phản hồi API Hồ sơ:', profileResponse.data);

        const vouchersResponse = await axios.get(`http://localhost:8080/api/vouchers/user/${user.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Phản hồi API Mã giảm giá:', vouchersResponse.data);

        if (profileResponse.data && typeof profileResponse.data === 'object') {
          setUserData({
            userId: profileResponse.data.userId || '',
            userName: profileResponse.data.userName || '',
            fullName: profileResponse.data.fullName || '',
            email: profileResponse.data.email || '',
            phone: profileResponse.data.phone || '',
            birthdate: profileResponse.data.birthdate || '',
            address: profileResponse.data.address || '',
            role: profileResponse.data.role || 'user',
            status: profileResponse.data.status ? 'active' : 'inactive',
            profilePhoto: 'https://bootdey.com/img/Content/avatar/avatar1.png',
            emailConfirmed: profileResponse.data.emailConfirmed || false,
            invoices: profileResponse.data.invoices || [],
            trips: profileResponse.data.trips || [],
            bookings: profileResponse.data.bookings || [],
            vouchers: vouchersResponse.data || [],
          });
        } else {
          throw new Error('Dữ liệu trả về từ server không hợp lệ');
        }
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu:', err.response ? err.response.data : err.message);
        let errorMessage = 'Không thể tải thông tin hồ sơ hoặc mã giảm giá.';
        if (err.response?.status === 401) {
          errorMessage = 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.';
          localStorage.removeItem('token');
          await checkAuth();
          navigate('/admin/login');
        } else if (err.response?.status === 500) {
          errorMessage = 'Lỗi server. Vui lòng thử lại sau hoặc liên hệ hỗ trợ.';
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, user, isLoggedIn, checkAuth]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const saveProfile = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    if (currentPassword || newPassword || repeatPassword) {
      if (!currentPassword) {
        setError('Vui lòng nhập mật khẩu hiện tại.');
        setLoading(false);
        return;
      }
      if (newPassword !== repeatPassword) {
        setError('Mật khẩu mới và mật khẩu xác nhận không khớp.');
        setLoading(false);
        return;
      }
      if (newPassword.length < 6) {
        setError('Mật khẩu mới phải có ít nhất 6 ký tự.');
        setLoading(false);
        return;
      }
    }

    if (!validateEmail(userData.email)) {
      setError('Định dạng email không hợp lệ.');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:8080/api/user/profile', {
        userId: userData.userId,
        userName: userData.userName,
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        birthdate: userData.birthdate,
        address: userData.address,
        role: userData.role,
        status: userData.status === 'active',
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (newPassword) {
        await axios.post('http://localhost:8080/api/user/change-password', {
          currentPassword,
          newPassword,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setSuccess('Cập nhật hồ sơ thành công.');
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi cập nhật hồ sơ.');
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setCurrentPassword('');
    setNewPassword('');
    setRepeatPassword('');
    setCurrentPage(1);
    setError('');
    setSuccess('');
    alert('Hủy bỏ các thay đổi.');
  };

  const toggleCollapse = (bookingId) => {
    setOpenCollapses((prev) => ({
      ...prev,
      [bookingId]: !prev[bookingId],
    }));
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(userData.bookings.length / itemsPerPage);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return <Pagination className="justify-content-center mt-3">{pages}</Pagination>;
  };

  return (
    <Container className="light-style flex-grow-1 container-p-y" style={{ paddingTop: '143px' }}>
      <h4 className="font-weight-bold py-3 mb-4">Hồ sơ người dùng</h4>
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}
      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" />
        </div>
      )}
      <Card className="overflow-hidden">
        <Row className="no-gutters row-bordered row-border-light">
          <Col md={3} className="pt-0">
            <div className="list-group list-group-flush account-settings-links">
              <Button
                variant="link"
                className={`list-group-item list-group-item-action ${activeTab === 'general' ? 'active' : ''}`}
                onClick={() => setActiveTab('general')}
              >
                Tổng quan
              </Button>
              <Button
                variant="link"
                className={`list-group-item list-group-item-action ${activeTab === 'change-password' ? 'active' : ''}`}
                onClick={() => setActiveTab('change-password')}
              >
                Đổi mật khẩu
              </Button>
              <Button
                variant="link"
                className={`list-group-item list-group-item-action ${activeTab === 'info' ? 'active' : ''}`}
                onClick={() => setActiveTab('info')}
              >
                Thông tin bổ sung
              </Button>
              <Button
                variant="link"
                className={`list-group-item list-group-item-action ${activeTab === 'invoices' ? 'active' : ''}`}
                onClick={() => setActiveTab('invoices')}
              >
                Hóa đơn
              </Button>
              <Button
                variant="link"
                className={`list-group-item list-group-item-action ${activeTab === 'trips' ? 'active' : ''}`}
                onClick={() => setActiveTab('trips')}
              >
                Chuyến đi
              </Button>
              <Button
                variant="link"
                className={`list-group-item list-group-item-action ${activeTab === 'bookings' ? 'active' : ''}`}
                onClick={() => setActiveTab('bookings')}
              >
                Đơn đặt phòng
              </Button>
              <Button
                variant="link"
                className={`list-group-item list-group-item-action ${activeTab === 'vouchers' ? 'active' : ''}`}
                onClick={() => setActiveTab('vouchers')}
              >
                Mã giảm giá
              </Button>
            </div>
          </Col>
          <Col md={9}>
            <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
              <Tab eventKey="general" title="Tổng quan">
                <div className="card-body media align-items-center">
                  <img src={userData.profilePhoto} alt="Hồ sơ người dùng" className="d-block ui-w-80" />
                  <div className="media-body ml-4">
                    <div className="text-light small mt-1">Chức năng tải ảnh hiện không được hỗ trợ.</div>
                  </div>
                </div>
                <hr className="border-light m-0" />
                <div className="card-body">
                  <Form.Group>
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control
                      type="text"
                      value={userData.userName}
                      onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Họ và tên</Form.Label>
                    <Form.Control
                      type="text"
                      value={userData.fullName}
                      onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                    {!userData.emailConfirmed && (
                      <Alert variant="warning" className="mt-3">
                        Email của bạn chưa được xác nhận. Vui lòng kiểm tra hộp thư.
                        <br />
                        <a href="#" onClick={() => alert('Đã gửi lại email xác nhận.')}>
                          Gửi lại email xác nhận
                        </a>
                      </Alert>
                    )}
                  </Form.Group>
                </div>
              </Tab>
              <Tab eventKey="change-password" title="Đổi mật khẩu">
                <div className="card-body pb-2">
                  <Form.Group>
                    <Form.Label>Mật khẩu hiện tại</Form.Label>
                    <Form.Control
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Mật khẩu mới</Form.Label>
                    <Form.Control
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                    <Form.Control
                      type="password"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                  </Form.Group>
                </div>
              </Tab>
              <Tab eventKey="info" title="Thông tin bổ sung">
                <div className="card-body pb-2">
                  <Form.Group>
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      type="tel"
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Ngày sinh</Form.Label>
                    <Form.Control
                      type="date"
                      value={userData.birthdate}
                      onChange={(e) => setUserData({ ...userData, birthdate: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={userData.address}
                      onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Vai trò</Form.Label>
                    <Form.Control as="select" value={userData.role} disabled>
                      <option value="user">Người dùng</option>
                      <option value="admin">Quản trị viên</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Trạng thái</Form.Label>
                    <Form.Control as="select" value={userData.status} disabled>
                      <option value="active">Hoạt động</option>
                      <option value="inactive">Không hoạt động</option>
                    </Form.Control>
                  </Form.Group>
                </div>
              </Tab>
              <Tab eventKey="invoices" title="Hóa đơn">
                <div className="card-body pb-2">
                  <h6 className="mb-4">Hóa đơn của bạn</h6>
                  <Table className="invoice-table">
                    <thead>
                      <tr>
                        <th>Mã hóa đơn</th>
                        <th>Homestay</th>
                        <th>Ngày nhận phòng</th>
                        <th>Ngày trả phòng</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.invoices.length > 0 ? (
                        userData.invoices.map((invoice) => (
                          <tr key={invoice.invoiceId}>
                            <td>{invoice.invoiceId}</td>
                            <td>{invoice.homestay}</td>
                            <td>{invoice.checkIn}</td>
                            <td>{invoice.checkOut}</td>
                            <td>{invoice.totalAmount}</td>
                            <td>{invoice.status}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">Bạn chưa có hóa đơn nào.</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </Tab>
              <Tab eventKey="trips" title="Chuyến đi">
                <div className="card-body pb-2">
                  <h6 className="mb-4">Chuyến đi của bạn</h6>
                  <Table className="trip-table">
                    <thead>
                      <tr>
                        <th>Mã chuyến đi</th>
                        <th>Homestay</th>
                        <th>Ngày nhận phòng</th>
                        <th>Ngày trả phòng</th>
                        <th>Địa điểm</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.trips.length > 0 ? (
                        userData.trips.map((trip) => (
                          <tr key={trip.tripId}>
                            <td>{trip.tripId}</td>
                            <td>{trip.homestay}</td>
                            <td>{trip.checkIn}</td>
                            <td>{trip.checkOut}</td>
                            <td>{trip.location}</td>
                            <td>{trip.status}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">Bạn chưa có chuyến đi nào.</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </Tab>
              <Tab eventKey="bookings" title="Đơn đặt phòng">
                <div className="card-body pb-2">
                  <h6 className="mb-4">Đơn đặt phòng của bạn</h6>
                  {userData.bookings.length > 0 ? (
                    userData.bookings
                      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                      .map((booking) => (
                        <div className="booking-row" key={booking.bookingId}>
                          <div
                            className="collapse-header"
                            onClick={() => toggleCollapse(booking.bookingId)}
                          >
                            Mã đặt phòng: {booking.bookingId} - {booking.homestay} ({booking.checkIn} đến {booking.checkOut})
                          </div>
                          <Collapse in={openCollapses[booking.bookingId]}>
                            <div id={`booking-${booking.bookingId}`}>
                              <Table className="booking-table">
                                <thead>
                                  <tr>
                                    <th>Mã đặt phòng</th>
                                    <th>Homestay</th>
                                    <th>Ngày nhận phòng</th>
                                    <th>Ngày trả phòng</th>
                                    <th>Khách</th>
                                    <th>Trạng thái</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>{booking.bookingId}</td>
                                    <td>{booking.homestay}</td>
                                    <td>{booking.checkIn}</td>
                                    <td>{booking.checkOut}</td>
                                    <td>{booking.guests}</td>
                                    <td>{booking.status}</td>
                                  </tr>
                                </tbody>
                              </Table>
                              <h6 className="mt-3 text-primary">Dịch vụ:</h6>
                              <Table className="service-table">
                                <thead>
                                  <tr>
                                    <th>Mã dịch vụ</th>
                                    <th>Tên dịch vụ</th>
                                    <th>Giá</th>
                                    <th>Trạng thái</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {(homestayServices[booking.homestay] || []).map((service) => (
                                    <tr key={service.serviceId}>
                                      <td>{service.serviceId}</td>
                                      <td>{service.serviceName}</td>
                                      <td>{service.price}</td>
                                      <td>{service.status}</td>
                                    </tr>
                                  ))}
                                  {!(homestayServices[booking.homestay]?.length) && (
                                    <tr>
                                      <td colSpan="4" className="text-center">Không có dịch vụ nào.</td>
                                    </tr>
                                  )}
                                </tbody>
                              </Table>
                            </div>
                          </Collapse>
                        </div>
                      ))
                  ) : (
                    <Alert variant="info">Bạn chưa có đơn đặt phòng nào.</Alert>
                  )}
                  {renderPagination()}
                </div>
              </Tab>
              <Tab eventKey="vouchers" title="Mã giảm giá">
                <div className="card-body pb-2">
                  <h6 className="mb-4">Mã giảm giá của bạn</h6>
                  <Table className="voucher-table">
                    <thead>
                      <tr>
                        <th>Mã giảm giá</th>
                        <th>Giảm giá</th>
                        <th>Homestay áp dụng</th>
                        <th>Điều kiện</th>
                        <th>Mã đặt phòng</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.vouchers.length > 0 ? (
                        userData.vouchers.map((voucher) => (
                          <tr key={voucher.voucherId}>
                            <td>{voucher.voucherName}</td>
                            <td>{voucher.discount * 100}%</td>
                            <td>{voucher.homestayName || 'Tất cả homestay'}</td>
                            <td>{voucher.condition || 'Không có điều kiện'}</td>
                            <td>{voucher.bookingId || 'N/A'}</td>
                            <td>{voucher.status || 'Hợp lệ'}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">Bạn chưa có mã giảm giá nào.</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Card>
      <div className="text-right mt-4">
        <Button variant="primary" onClick={saveProfile} disabled={loading}>
          Lưu thay đổi
        </Button>
        <Button variant="outline-secondary" className="ml-2" onClick={cancelEdit} disabled={loading}>
          Hủy
        </Button>
      </div>
    </Container>
  );
};

export default Profiles;
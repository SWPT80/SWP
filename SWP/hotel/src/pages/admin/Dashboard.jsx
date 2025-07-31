import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../assets/css/Dashboard.css";
import LineChartDashboard from '../../components/admin/LineChartDashboard';
import DonutChartDashboard from '../../components/admin/DonutChartDashboard';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [activeUsers, setActiveUsers] = useState(0);
  const [totalHosts, setTotalHosts] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:8080/api/bookings/with-user-info', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setBookings(res.data);
        setError('');
        if (res.data.length === 0) {
          setError('Không tìm thấy đơn đặt phòng nào.');
        }
      })
      .catch(err => {
        console.error("Lỗi khi tải danh sách đặt phòng:", err.response?.data || err.message);
        setError('Bạn không có quyền truy cập hoặc không thể tải danh sách đặt phòng.');
      });

    axios.get('http://localhost:8080/api/monitor/active-users')
      .then(res => {
        setActiveUsers(res.data);
        setError('');
      })
      .catch(err => {
        console.error("Lỗi khi tải số người dùng đang hoạt động:", err);
        setError('Không thể tải số người dùng đang hoạt động.');
      });

    axios.get('http://localhost:8080/api/admin/users/count/hosts', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setTotalHosts(res.data);
        setError('');
      })
      .catch(err => {
        console.error("Lỗi khi tải số lượng chủ nhà:", err);
        setError('Không thể tải số lượng chủ nhà.');
      });

    axios.get('http://localhost:8080/api/admin/users/count/customers', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setTotalCustomers(res.data);
        setError('');
      })
      .catch(err => {
        console.error("Lỗi khi tải số lượng khách hàng:", err);
        setError('Không thể tải số lượng khách hàng.');
      });
  }, []);

  const displayedBookings = showAll ? bookings : bookings.slice(0, 5);

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          {error && (
            <Alert variant="info" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h4 className="card-title mt-2">Xin chào Quản trị viên!
                  <ul>Bảng điều khiển</ul>
                </h4>
              </div>
            </div>
          </div>

          <div className="row">
            {[
              { title: 'Tổng đơn đặt phòng', value: bookings.length, icon: 'user-plus' },
              { title: 'Tổng khách hàng', value: totalCustomers, icon: 'users' },
              { title: 'Tổng chủ nhà', value: totalHosts, icon: 'user-check' },
              { title: 'Người dùng đang hoạt động', value: activeUsers, icon: 'users' }
            ].map((card, index) => (
              <div className="col-xl-3 col-sm-6 col-12" key={index}>
                <div className="card board1 fill">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <div>
                        <h3 className="card_widget_header">{card.value}</h3>
                        <h6 className="text-muted">{card.title}</h6>
                      </div>
                      <div className="ml-auto mt-md-3 mt-lg-0">
                        <span className="opacity-7 text-muted">
                          <i className={`fe fe-${card.icon}`}></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-md-12 col-lg-6">
              <div className="card card-chart">
                <div className="card-header">
                  <h4 className="card-title">Doanh thu</h4>
                </div>
                <div className="card-body">
                  <LineChartDashboard />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="card card-chart">
                <div className="card-header">
                  <h4 className="card-title">Phòng đã đặt</h4>
                </div>
                <div className="card-body">
                  <DonutChartDashboard />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 d-flex">
              <div className="card card-table flex-fill">
                <div className="card-header">
                  <h4 className="card-title float-left mt-2">Đơn đặt phòng</h4>
                  <button
                    type="button"
                    className="btn btn-primary float-right veiwbutton"
                    onClick={() => navigate('/admin/all-booking')}
                  >
                    Xem tất cả
                  </button>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover table-center">
                      <thead>
                        <tr>
                          <th>Mã đặt phòng</th>
                          <th>Khách hàng</th>
                          <th>Phòng</th>
                          <th>Nhận phòng</th>
                          <th>Trả phòng</th>
                          <th>Tổng tiền</th>
                          <th>Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayedBookings.length > 0 ? (
                          displayedBookings.map((b) => (
                            <tr key={b.id}>
                              <td>{b.id}</td>
                              <td>{b.userId}</td>
                              <td>{b.roomNumber}</td>
                              <td>{b.checkInDate}</td>
                              <td>{b.checkOutDate}</td>
                              <td>{b.totalAmount?.toLocaleString()} đ</td>
                              <td>
                                <span className={`badge ${b.status === 'booked' ? 'badge-success' : 'badge-secondary'}`}>
                                  {b.status === 'booked' ? 'Đã đặt' : b.status}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <Alert variant="info">Không tìm thấy đơn đặt phòng nào.</Alert>
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

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
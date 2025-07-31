import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Dropdown, Alert } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import HostChatApp from "../../components/Chat/ChatHost";
import { useNavigate } from "react-router-dom";
import { BookingsTable } from "../../components/host/BookingsTable";
import '../../assets/styles/Dashboard.css'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler);

export default function Dashboard() {
  const navigate = useNavigate();
  const [hostId, setHostId] = useState(() => localStorage.getItem("hostId"));
  const [timeRange, setTimeRange] = useState('day');
  const [activeTab, setActiveTab] = useState('room');
  const [revenueChart, setRevenueChart] = useState({ labels: [], datasets: [] });
  const [roomChart, setRoomChart] = useState({ labels: [], datasets: [] });
  const [showAll, setShowAll] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [metrics, setMetrics] = useState({
    totalBookings: 0,
    availableRooms: 0,
    revenue: 0,
    rating: 4.5
  });
  const [loading, setLoading] = useState({
    metrics: true,
    bookings: true,
    charts: true
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Không tìm thấy token. Vui lòng đăng nhập lại.");
      navigate("/", { replace: true });
      return;
    }
    if (!hostId) {
      axios.get("http://localhost:8080/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          const user = res.data;
          if (user.role !== 'HOST') {
            setError("Bạn không phải là chủ nhà. Vui lòng đăng nhập bằng tài khoản chủ nhà.");
            navigate("/", { replace: true });
            return;
          }
          localStorage.setItem("hostId", user.id);
          setHostId(user.id);
          setError('');
        })
        .catch(() => {
          setError("Lỗi xác thực. Vui lòng đăng nhập lại.");
          navigate("/", { replace: true });
        });
    }
  }, [navigate, hostId]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/api/bookings/host/${hostId}/metrics`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMetrics({
          totalBookings: response.data.totalBookings,
          availableRooms: response.data.availableRooms,
          revenue: response.data.revenue,
          rating: 4.5
        });
        setError('');
      } catch (error) {
        console.error("Lỗi khi tải số liệu:", error);
        setError("Không thể tải số liệu thống kê.");
      } finally {
        setLoading(prev => ({ ...prev, metrics: false }));
      }
    };

    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/bookings/with-user-info', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(response.data);
        setError('');
        if (response.data.length === 0) {
          setError('Không tìm thấy đơn đặt phòng nào.');
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách đặt phòng:", error.response?.data || error.message);
        setError("Không thể tải danh sách đặt phòng.");
      } finally {
        setLoading(prev => ({ ...prev, bookings: false }));
      }
    };

    const fetchCharts = async () => {
      try {
        const rangeLabel = {
          day: 'Ngày ',
          month: 'Tháng ',
          year: 'Năm '
        };

        const fillTimeLabels = (range) => {
          if (range === 'day') return Array.from({ length: 31 }, (_, i) => `Ngày ${i + 1}`);
          if (range === 'month') return Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`);
          if (range === 'year') {
            const currentYear = new Date().getFullYear();
            return Array.from({ length: 5 }, (_, i) => `Năm ${currentYear - 4 + i}`);
          }
          return [];
        };

        const timeLabels = fillTimeLabels(timeRange);

        const revenueUrl = activeTab === 'room'
          ? `http://localhost:8080/api/reports/revenue/room?hostId=${hostId}&range=${timeRange}`
          : `http://localhost:8080/api/reports/revenue/service?hostId=${hostId}&range=${timeRange}`;

        const revenueRes = await axios.get(revenueUrl);
        const revenueMap = new Map();
        revenueRes.data.forEach(item => {
          const label = `${rangeLabel[timeRange]}${item.time}`;
          revenueMap.set(label, item.totalRevenue);
        });
        const revenueValues = timeLabels.map(label => revenueMap.get(label) || 0);

        setRevenueChart({
          labels: timeLabels,
          datasets: [{
            label: 'Tổng doanh thu',
            data: revenueValues,
            borderColor: activeTab === 'room' ? 'rgba(255, 105, 180, 1)' : 'rgba(255, 159, 64, 1)',
            backgroundColor: activeTab === 'room' ? 'rgba(255, 105, 180, 0.2)' : 'rgba(255, 159, 64, 0.2)',
            fill: true
          }]
        });

        const bookingUrl = activeTab === 'room'
          ? `http://localhost:8080/api/reports/count/bookings?hostId=${hostId}&range=${timeRange}`
          : `http://localhost:8080/api/reports/count/services?hostId=${hostId}&range=${timeRange}`;

        const bookingRes = await axios.get(bookingUrl);
        const labelSet = new Set();
        const typeSet = new Set();
        const grouped = {};

        bookingRes.data.forEach(item => {
          const time = item.day || item.time || item[0];
          const type = activeTab === 'room' ? item.roomType : item.serviceName;
          const count = parseInt(item.bookingCount || item[3]) || 0;
          const label = `${rangeLabel[timeRange]}${time}`;
          labelSet.add(label);
          typeSet.add(type);
          if (!grouped[type]) grouped[type] = {};
          grouped[type][label] = count;
        });

        const types = Array.from(typeSet);
        const datasets = types.map(type => ({
          label: type,
          data: timeLabels.map(label => grouped[type]?.[label] || 0),
          borderColor: activeTab === 'room' ? 'rgba(54, 162, 235, 1)' : 'rgba(153, 102, 255, 1)',
          backgroundColor: activeTab === 'room' ? 'rgba(54, 162, 235, 0.2)' : 'rgba(153, 102, 255, 0.2)',
          fill: true
        }));

        setRoomChart({ labels: timeLabels, datasets });
        setError('');
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu biểu đồ:", error);
        setError("Không thể tải dữ liệu biểu đồ.");
      } finally {
        setLoading(prev => ({ ...prev, charts: false }));
      }
    };

    if (hostId) {
      fetchMetrics();
      fetchBookings();
      fetchCharts();
    }
  }, [hostId, timeRange, activeTab]);

  const overallRating = 4.5;
  const ratingDetails = [
    { label: 'Vệ sinh', value: 4.5 },
    { label: 'Tiện nghi', value: 4.0 },
    { label: 'Tiện nghi phòng', value: 4.2 },
    { label: 'Dịch vụ', value: 4.3 },
    { label: 'Giá trị', value: 4.1 }
  ];

  const displayedBookings = showAll ? bookings : bookings.slice(0, 5);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          {error && (
            <Alert variant="danger" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12 mt-5">
                <h3 className="page-title mt-3">Bảng điều khiển của Host</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item active">Bảng điều khiển</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            {[
              {
                title: 'Tổng đơn đặt phòng',
                value: loading.metrics ? '...' : metrics.totalBookings,
                icon: 'user-plus'
              },
              {
                title: 'Phòng trống',
                value: loading.metrics ? '...' : metrics.availableRooms,
                icon: 'home'
              },
              {
                title: 'Doanh thu',
                value: loading.metrics ? '...' : formatCurrency(metrics.revenue),
                icon: 'dollar-sign'
              },
              {
                title: 'Đánh giá',
                value: overallRating,
                icon: 'star'
              }
            ].map((card, index) => (
              <div className="col-xl-3 col-sm-6 col-12" key={index}>
                <div className="cardDashboard board1 fill">
                  <div className="cardDashboard-body">
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
              <div className="cardDashboard card-chart">
                <div className="card-header">
                  <h4 className="card-title">Tổng quan doanh thu</h4>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" size="sm">
                      {timeRange === 'day' ? 'Ngày' : timeRange === 'month' ? 'Tháng' : 'Năm'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setTimeRange('day')}>Ngày</Dropdown.Item>
                      <Dropdown.Item onClick={() => setTimeRange('month')}>Tháng</Dropdown.Item>
                      <Dropdown.Item onClick={() => setTimeRange('year')}>Năm</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="cardDashboard-body">
                  {loading.charts ? (
                    <div className="text-center py-5">Đang tải biểu đồ...</div>
                  ) : (
                    <Line
                      data={revenueChart}
                      options={{ maintainAspectRatio: false }}
                      style={{ height: '300px' }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="cardDashboard card-chart">
                <div className="card-header">
                  <h4 className="card-title">{activeTab === 'room' ? 'Đơn đặt phòng' : 'Sử dụng dịch vụ'}</h4>
                  <div className="d-flex">
                    <Dropdown className="mr-2">
                      <Dropdown.Toggle variant="secondary" size="sm">
                        {timeRange === 'day' ? 'Ngày' : timeRange === 'month' ? 'Tháng' : 'Năm'}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setTimeRange('day')}>Ngày</Dropdown.Item>
                        <Dropdown.Item onClick={() => setTimeRange('month')}>Tháng</Dropdown.Item>
                        <Dropdown.Item onClick={() => setTimeRange('year')}>Năm</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                      <Dropdown.Toggle variant="info" size="sm">
                        {activeTab === 'room' ? 'Phòng' : 'Dịch vụ'}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setActiveTab('room')}>Phòng</Dropdown.Item>
                        <Dropdown.Item onClick={() => setActiveTab('service')}>Dịch vụ</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="cardDashboard-body">
                  {loading.charts ? (
                    <div className="text-center py-5">Đang tải biểu đồ...</div>
                  ) : (
                    <Line
                      data={roomChart}
                      options={{
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: { stepSize: 1 }
                          }
                        }
                      }}
                      style={{ height: '300px' }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 d-flex">
              <div className="cardDashboard card-table flex-fill">
                <div className="card-header">
                  <h4 className="card-title float-left mt-2">Đơn đặt phòng gần đây</h4>
                  <button
                    type="button"
                    className="btn btn-primary float-right veiwbutton"
                    onClick={() => setShowAll(!showAll)}
                    disabled={loading.bookings}
                  >
                    {showAll ? 'Thu gọn' : 'Xem tất cả'}
                  </button>
                </div>
                <div className="cardDashboard-body">
                  <BookingsTable></BookingsTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
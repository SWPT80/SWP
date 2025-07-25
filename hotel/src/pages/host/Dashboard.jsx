import { useState, useEffect } from "react";
import axios from "axios";
import { BookingsTable } from '../../components/host/BookingsTable';
import { Container, Row, Col, Card, Dropdown } from 'react-bootstrap';
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
import "../../assets/css/Dashboard.css";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler);

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('day');
  const [activeTab, setActiveTab] = useState('room');
  const [revenueChart, setRevenueChart] = useState({ labels: [], datasets: [] });
  const [roomChart, setRoomChart] = useState({ labels: [], datasets: [] });
  const [showAll, setShowAll] = useState(false);
  const [bookings, setBookings] = useState([]);

  const hostId = 21;

  useEffect(() => {
    const rangeLabel = {
      day: 'Day ',
      month: 'Month ',
      year: 'Year '
    };

    const fillTimeLabels = (range) => {
      if (range === 'day') {
        return Array.from({ length: 31 }, (_, i) => `Day ${i + 1}`);
      }
      if (range === 'month') {
        return Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`);
      }
      if (range === 'year') {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 5 }, (_, i) => `Year ${currentYear - 4 + i}`);
      }
      return [];
    };

    const timeLabels = fillTimeLabels(timeRange);

    const revenueUrl = activeTab === 'room'
      ? `http://localhost:8080/api/reports/revenue/room?hostId=${hostId}&range=${timeRange}`
      : `http://localhost:8080/api/reports/revenue/service?hostId=${hostId}&range=${timeRange}`;

    axios.get(revenueUrl)
      .then(res => {
        const raw = res.data;
        const map = new Map();
        raw.forEach(item => {
          map.set(`${rangeLabel[timeRange]}${item.time}`, item.totalRevenue);
        });
        const values = timeLabels.map(label => map.get(label) || 0);
        console.log("Revenue API result:", res.data);
        setRevenueChart({
          labels: timeLabels,
          datasets: [{
            label: 'Total Revenue',
            data: values,
            borderColor: activeTab === 'room' ? 'rgba(255, 105, 180, 1)' : 'rgba(255, 159, 64, 1)',
            backgroundColor: activeTab === 'room' ? 'rgba(255, 105, 180, 0.2)' : 'rgba(255, 159, 64, 0.2)',
            fill: true
          }]
        });
      });

    const bookingUrl = activeTab === 'room'
      ? `http://localhost:8080/api/reports/count/bookings?hostId=${hostId}&range=${timeRange}`
      : `http://localhost:8080/api/reports/count/services?hostId=${hostId}&range=${timeRange}`;

    axios.get(bookingUrl)
      .then(res => {
        const raw = res.data;
        const labelSet = new Set();
        const typeSet = new Set();
        const grouped = {};

        raw.forEach(item => {
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
      });

    // Fetch bookings data
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/api/bookings/with-user-info', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => setBookings(res.data))
      .catch(err => {
        console.error("Lỗi khi lấy danh sách booking:", err.response?.data || err.message);
      });
  }, [hostId, timeRange, activeTab]);

  const overallRating = 4.5;
  const ratingDetails = [
    { label: 'Cleanliness', value: 4.5 },
    { label: 'Facilities', value: 4.0 },
    { label: 'Room Comfort', value: 4.2 },
    { label: 'Service', value: 4.3 },
    { label: 'Value for money', value: 4.1 }
  ];

  const displayedBookings = showAll ? bookings : bookings.slice(0, 5);

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12 mt-5">
                <h3 className="page-title mt-3">Host Dashboard</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item active">Dashboard</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            {[
              { title: 'Total Bookings', value: bookings.length, icon: 'user-plus' },
              { title: 'Available Rooms', value: 180, icon: 'dollar-sign' },
              { title: 'Revenue', value: 1538, icon: 'file-plus' },
              { title: 'Rating', value: overallRating, icon: 'globe' }
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
                  <h4 className="card-title">Revenue Overview</h4>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" size="sm">
                      {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setTimeRange('day')}>Day</Dropdown.Item>
                      <Dropdown.Item onClick={() => setTimeRange('month')}>Month</Dropdown.Item>
                      <Dropdown.Item onClick={() => setTimeRange('year')}>Year</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="cardDashboard-body">
                  <Line data={revenueChart} options={{ maintainAspectRatio: false }} style={{ height: '300px' }} />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="cardDashboard card-chart">
                <div className="card-header">
                  <h4 className="card-title">{activeTab === 'room' ? 'Room Bookings' : 'Service Usage'}</h4>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" size="sm">
                      {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setTimeRange('day')}>Day</Dropdown.Item>
                      <Dropdown.Item onClick={() => setTimeRange('month')}>Month</Dropdown.Item>
                      <Dropdown.Item onClick={() => setTimeRange('year')}>Year</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="cardDashboard-body">
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
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 d-flex">
              <div className="cardDashboard card-table flex-fill">
                <div className="card-header">
                  <h4 className="card-title float-left mt-2">Recent Bookings</h4>
                  <button
                    type="button"
                    className="btn btn-primary float-right veiwbutton"
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll ? 'Show Less' : 'View All'}
                  </button>
                </div>
                <div className="cardDashboard-body">
                  <div className="table-responsive">
                    <table className="table table-hover table-center">
                      <thead>
                        <tr>
                          <th>Booking ID</th>
                          <th>Customer</th>
                          <th>Room</th>
                          <th>Check-in</th>
                          <th>Check-out</th>
                          <th>Total</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayedBookings.map((b) => (
                          <tr key={b.id}>
                            <td>{b.id}</td>
                            <td>{b.userId}</td>
                            <td>{b.roomNumber}</td>
                            <td>{b.checkInDate}</td>
                            <td>{b.checkOutDate}</td>
                            <td>{b.totalAmount?.toLocaleString()} VND</td>
                            <td>
                              <span className={`badge ${b.status === 'booked' ? 'badge-success' : 'badge-secondary'}`}>
                                {b.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {bookings.length === 0 && (
                          <tr>
                            <td colSpan="7" className="text-center">No bookings found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 col-lg-6">
              <div className="cardDashboard card-chart">
                <div className="card-header">
                  <h4 className="card-title">Overall Rating <small>This Week</small></h4>
                </div>
                <div className="cardDashboard-body">
                  <div className="text-center">
                    <div className="display-4">{overallRating}/5</div>
                    {ratingDetails.map((item, index) => (
                      <div key={index} className="d-flex justify-content-between">
                        <span>{item.label}</span>
                        <span>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="cardDashboard card-chart">
                <div className="card-header">
                  <h4 className="card-title">Quick Actions</h4>
                </div>
                <div className="cardDashboard-body">
                  <div className="row">
                    <div className="col-6 mb-3">
                      <button className="btn btn-primary w-100">Add Room</button>
                    </div>
                    <div className="col-6 mb-3">
                      <button className="btn btn-success w-100">View Reports</button>
                    </div>
                    <div className="col-6 mb-3">
                      <button className="btn btn-info w-100">Chat Support</button>
                    </div>
                    <div className="col-6 mb-3">
                      <button className="btn btn-warning w-100">Settings</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="cardDashboard card-chart">
                <div className="card-header">
                  <h4 className="card-title">Chat Support</h4>
                </div>
                <div className="cardDashboard-body">
                  <HostChatApp hostId={11}/>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

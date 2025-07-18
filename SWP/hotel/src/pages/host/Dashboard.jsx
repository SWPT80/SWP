// ✅ File: Dashboard.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler);

export default function Dashboard() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('day');
  const [activeTab, setActiveTab] = useState('room');
  const [revenueChart, setRevenueChart] = useState({ labels: [], datasets: [] });
  const [roomChart, setRoomChart] = useState({ labels: [], datasets: [] });
  const [hostId, setHostId] = useState(() => localStorage.getItem("hostId"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
      return;
    }
    // Nếu chưa có hostId => gọi /me
    if (!hostId) {
      axios.get("http://localhost:8080/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          const user = res.data;
          if (user.role !== 'HOST') {
            navigate("/", { replace: true });
            return;
          }
          localStorage.setItem("hostId", user.id);
          setHostId(user.id);
        })
        .catch(() => navigate("/", { replace: true }));
    }
  }, [navigate, hostId]);

  useEffect(() => {
    if (!hostId) return;

    const rangeLabel = { day: 'Day ', month: 'Month ', year: 'Year ' };
    const fillTimeLabels = (range) => {
      if (range === 'day') return Array.from({ length: 31 }, (_, i) => `Day ${i + 1}`);
      if (range === 'month') return Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`);
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

    axios.get(revenueUrl).then(res => {
      const raw = res.data;
      const map = new Map();
      raw.forEach(item => map.set(`${rangeLabel[timeRange]}${item.time}`, item.totalRevenue));
      const values = timeLabels.map(label => map.get(label) || 0);
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

    axios.get(bookingUrl).then(res => {
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
  }, [hostId, timeRange, activeTab]);

  return (
    <Container fluid className="px-0">
      <h1>Dashboard của Host ID: {hostId}</h1>
      <Row className="mb-3 justify-content-center">
        <Col lg={6} className="text-center">
          <button className={`btn btn-${activeTab === 'room' ? 'primary' : 'outline-primary'} mx-2`} onClick={() => setActiveTab('room')}>Room</button>
          <button className={`btn btn-${activeTab === 'service' ? 'primary' : 'outline-primary'} mx-2`} onClick={() => setActiveTab('service')}>Service</button>
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              Revenue Overview
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
            </Card.Header>
            <Card.Body>
              <Line data={revenueChart} options={{ maintainAspectRatio: false }} style={{ height: '300px' }} />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              {activeTab === 'room' ? 'Room Bookings' : 'Service Usage'}
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
            </Card.Header>
            <Card.Body>
              <Line
                data={roomChart}
                options={{ maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }}
                style={{ height: '300px' }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <BookingsTable />
        </Col>
      </Row>

      <div><HostChatApp hostId={hostId} /></div>
    </Container>
  );
}

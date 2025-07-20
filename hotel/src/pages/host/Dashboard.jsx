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

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler);

export default function Dashboard() {
  // Sửa default timeRange thành "day" để tải biểu đồ thống kê theo ngày theo mặc định
  const [timeRange, setTimeRange] = useState('day');
  const [activeTab, setActiveTab] = useState('room');
  const [revenueChart, setRevenueChart] = useState({ labels: [], datasets: [] });
  const [roomChart, setRoomChart] = useState({ labels: [], datasets: [] });

  const hostId = 21;

  useEffect(() => {
    const rangeLabel = {
      day: 'Day ',
      month: 'Month ',
      year: 'Year '
    };

    // Sửa hàm fillTimeLabels: nếu range là 'day' thì trả về 31 nhãn
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

    // Chọn API doanh thu dựa trên activeTab
    const revenueUrl = activeTab === 'room'
      ? `http://localhost:8080/api/reports/revenue/room?hostId=${hostId}&range=${timeRange}`
      : `http://localhost:8080/api/reports/revenue/service?hostId=${hostId}&range=${timeRange}`;

    axios.get(revenueUrl)
      .then(res => {
        const raw = res.data;
        const map = new Map();
        // Giả sử từ API, mỗi đối tượng có thuộc tính "time" (ví dụ: 23) và "totalRevenue"
        raw.forEach(item => {
          // Nếu báo cáo theo ngày, key sẽ là "Day 23"
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
          // Sử dụng key "day" nếu có, hoặc "time" nếu không có, hoặc phần tử đầu tiên của mảng nếu cần
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

  const overallRating = 4.5;
  const ratingDetails = [
    { label: 'Cleanliness', value: 4.5 },
    { label: 'Facilities', value: 4.0 },
    { label: 'Room Comfort', value: 4.2 },
    { label: 'Service', value: 4.3 },
    { label: 'Value for money', value: 4.1 }
  ];

  return (
    <Container fluid className="px-0">
      <Row className="mb-3 justify-content-center">
        <Col lg={6} className="text-center">
          <button className={`btn btn-${activeTab === 'room' ? 'primary' : 'outline-primary'} mx-2`} onClick={() => setActiveTab('room')}>Room</button>
          <button className={`btn btn-${activeTab === 'service' ? 'primary' : 'outline-primary'} mx-2`} onClick={() => setActiveTab('service')}>Service</button>
        </Col>
      </Row>

      <Row>
        {/* Revenue Chart */}
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

        {/* Booking Count Chart */}
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
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Bookings Table */}
      <Row>
        <Col lg={12}>
          <BookingsTable />
        </Col>
      </Row>
                <div>
                  <HostChatApp hostId={11}/>
                </div>
      {/* Overall Rating */}
      <Row>
        <Col lg={6}>
          <Card className="mb-4">
            <Card.Header>Overall Rating <small>This Week</small></Card.Header>
            <Card.Body className="text-center">
              <div className="display-4">{overallRating}/5</div>
              {ratingDetails.map((item, index) => (
                <div key={index} className="d-flex justify-content-between">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    
  );
}

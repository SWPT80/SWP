import { Card, Button, Dropdown, Row, Col, Alert } from "react-bootstrap";
import { ChevronDown } from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import 'bootstrap/dist/css/bootstrap.min.css';

const revenueData = [
  { name: "T2", value: 8 },
  { name: "T3", value: 12 },
  { name: "T4", value: 15 },
  { name: "T5", value: 10 },
  { name: "T6", value: 13 },
  { name: "T7", value: 14 },
];

const guestsData = [
  { name: "T2", value: 20 },
  { name: "T3", value: 25 },
  { name: "T4", value: 30 },
  { name: "T5", value: 22 },
  { name: "T6", value: 28 },
];

const roomsData = [
  { name: "T2", occupied: 25, booked: 15, available: 10 },
  { name: "T3", occupied: 30, booked: 12, available: 8 },
  { name: "T4", occupied: 28, booked: 18, available: 4 },
  { name: "T5", occupied: 32, booked: 10, available: 8 },
  { name: "T6", occupied: 35, booked: 8, available: 7 },
  { name: "T7", occupied: 38, booked: 6, available: 6 },
];

export function ChartsSection() {
  const [error, setError] = useState(null);

  // Kiểm tra dữ liệu biểu đồ
  useEffect(() => {
    if (!revenueData.length || !guestsData.length || !roomsData.length) {
      setError("Không có dữ liệu biểu đồ để hiển thị.");
    } else {
      setError(null);
    }
  }, []);

  return (
    <Row className="g-4">
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      {/* Biểu đồ Doanh thu */}
      <Col lg={4}>
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Doanh thu</h6>
            <Dropdown>
              <Dropdown.Toggle variant="light" size="sm">
                Tuần này <ChevronDown size={16} className="ms-1" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Tuần này</Dropdown.Item>
                <Dropdown.Item>Tháng này</Dropdown.Item>
                <Dropdown.Item>Năm nay</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Header>
          <Card.Body>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <Tooltip />
                <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      </Col>

      {/* Biểu đồ Khách hàng */}
      <Col lg={4}>
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Khách hàng</h6>
            <Dropdown>
              <Dropdown.Toggle variant="light" size="sm">
                Tuần này <ChevronDown size={16} className="ms-1" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Tuần này</Dropdown.Item>
                <Dropdown.Item>Tháng này</Dropdown.Item>
                <Dropdown.Item>Năm nay</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Header>
          <Card.Body>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={guestsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      </Col>

      {/* Biểu đồ Phòng */}
      <Col lg={4}>
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Phòng</h6>
            <Dropdown>
              <Dropdown.Toggle variant="light" size="sm">
                Tuần này <ChevronDown size={16} className="ms-1" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Tuần này</Dropdown.Item>
                <Dropdown.Item>Tháng này</Dropdown.Item>
                <Dropdown.Item>Năm nay</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Header>
          <Card.Body>
            <div className="mb-3">
              <small className="text-muted">Tổng cộng 50 phòng</small>
              <div className="d-flex gap-3 mt-2">
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle" style={{ width: 12, height: 12, backgroundColor: '#3b82f6' }} />
                  <span>Đã sử dụng</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle" style={{ width: 12, height: 12, backgroundColor: '#10b981' }} />
                  <span>Đã đặt</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle" style={{ width: 12, height: 12, backgroundColor: '#f59e0b' }} />
                  <span>Trống</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={roomsData}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Bar dataKey="occupied" stackId="a" fill="#3b82f6" />
                <Bar dataKey="booked" stackId="a" fill="#10b981" />
                <Bar dataKey="available" stackId="a" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
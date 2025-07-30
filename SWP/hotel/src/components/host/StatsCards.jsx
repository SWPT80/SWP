import { Card, Badge, Row, Col, Alert } from "react-bootstrap";
import { ArrowRight, ArrowLeft, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export function StatsCards() {
  const [error, setError] = useState(null);

  // Kiểm tra dữ liệu thống kê
  useEffect(() => {
    // Giả sử dữ liệu thống kê cần được kiểm tra
    const hasData = true; // Thay bằng kiểm tra thực tế nếu có API
    if (!hasData) {
      setError("Không có dữ liệu thống kê để hiển thị.");
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
      <Col md={3}>
        <Card>
          <Card.Body className="d-flex align-items-center gap-3">
            <div className="d-flex justify-content-center align-items-center rounded-circle bg-primary bg-opacity-10" style={{ width: 48, height: 48 }}>
              <ArrowRight size={24} className="text-primary" />
            </div>
            <div>
              <div className="text-muted small">Lượt đến (Tuần này)</div>
              <div className="fs-4 fw-bold">73</div>
              <Badge bg="success" className="mt-1">+24%</Badge>
              <div className="text-muted small mt-1">Tuần trước: 35</div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card>
          <Card.Body className="d-flex align-items-center gap-3">
            <div className="d-flex justify-content-center align-items-center rounded-circle bg-warning bg-opacity-10" style={{ width: 48, height: 48 }}>
              <ArrowLeft size={24} className="text-warning" />
            </div>
            <div>
              <div className="text-muted small">Lượt đi (Tuần này)</div>
              <div className="fs-4 fw-bold">35</div>
              <Badge bg="danger" className="mt-1">-12%</Badge>
              <div className="text-muted small mt-1">Tuần trước: 97</div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card>
          <Card.Body className="d-flex align-items-center gap-3">
            <div className="d-flex justify-content-center align-items-center rounded-circle bg-info bg-opacity-10" style={{ width: 48, height: 48 }}>
              <Calendar size={24} className="text-info" />
            </div>
            <div>
              <div className="text-muted small">Đặt phòng (Tuần này)</div>
              <div className="fs-4 fw-bold">237</div>
              <Badge bg="success" className="mt-1">+31%</Badge>
              <div className="text-muted small mt-1">Tuần trước: 187</div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card>
          <Card.Body>
            <div className="mb-3 text-muted small">Hoạt động hôm nay</div>
            <div className="mb-3 d-flex gap-2">
              <Badge bg="primary">5</Badge>
              <Badge bg="primary">10</Badge>
              <Badge bg="primary">15</Badge>
            </div>
            <div className="text-muted small mb-3">Phòng trống - Đã đặt - Khách</div>
            <div>
              <div className="text-muted small">Tổng doanh thu</div>
              <div className="fs-4 fw-bold">35.000.000đ</div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
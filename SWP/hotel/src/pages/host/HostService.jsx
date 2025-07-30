import {
  ProgressBar,
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
} from "react-bootstrap";
import {
  BsCupHot,
  BsHouse,
  BsTools,
  BsChatDots,
  BsPlusLg,
  BsPencilSquare,
  BsTrash,
} from "react-icons/bs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HostService() {
  const [services, setServices] = useState([]);
  const [homestays, setHomestays] = useState([]);
  const navigate = useNavigate();

  const fetchServices = async () => {
    const hostId = localStorage.getItem("hostId");
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `http://localhost:8080/api/services/host/${hostId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setServices(res.data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách dịch vụ:", err);
      alert("Không thể tải danh sách dịch vụ.");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    const hostId = localStorage.getItem("hostId");
    const token = localStorage.getItem("token");
    axios.get(`http://localhost:8080/api/homestays/by-host/${hostId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setHomestays(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Bạn có chắc chắn muốn xoá dịch vụ này?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Lỗi khi xoá dịch vụ:", err);
      alert("Xoá thất bại.");
    }
  };

  const getTypeName = (service) => {
    return service.serviceType?.serviceName || "Unknown";
  };

  const getBadgeStatus = (status) => {
    switch (status) {
      case "approved":
        return <Badge bg="success">Đã duyệt</Badge>;
      case "pending":
        return <Badge bg="warning">Chờ duyệt</Badge>;
      case "rejected":
        return <Badge bg="danger">Từ chối</Badge>;
      default:
        return <Badge bg="secondary">Không xác định</Badge>;
    }
  };

  const distribution = services.reduce((acc, s) => {
    const name = s.serviceType?.serviceName || "Khác";
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});
  const total = services.length || 1;

  const colors = [
    "#0d6efd",
    "#198754",
    "#ffc107",
    "#fd7e14",
    "#6f42c1",
    "#20c997",
    "#e83e8c",
    "#dc3545",
  ];
  const getColor = (index) => colors[index % colors.length];

  const homestayMap = homestays.reduce(
    (acc, h) => ({ ...acc, [h.id]: h.homestayName }),
    {}
  );

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Container className="my-4 flex-grow-1">
        {/* Stats cards */}
        <Row className="g-4 mb-4">
          {Object.entries(distribution).map(([type, count], idx) => (
            <Col md={3} key={type}>
              <Card className="text-center p-3">
                <BsTools size={32} className="text-warning mb-2 mx-auto" />
                <div className="text-muted">{type}</div>
                <h3>{count}</h3>
                <div className="text-muted small">Đang sử dụng</div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Table */}
        <Row className="mb-3">
          <Col className="text-end">
            <Button
              onClick={() => navigate("/host/add-service")}
              variant="primary"
            >
              <BsPlusLg className="mr-1" /> Thêm Dịch Vụ
            </Button>
          </Col>
        </Row>

        <Row className="g-4">
          <Col>
            <Card>
              <Card.Header>Dịch vụ của bạn</Card.Header>
              <Card.Body className="p-0">
                <Table responsive hover className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Homestay</th>
                      <th>Loại Dịch Vụ</th>
                      <th>Giá</th>
                      <th>Ghi Chú</th>
                      <th>Trạng Thái</th>
                      <th>Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.length > 0 ? (
                      services.map((s) => (
                        <tr key={s.id}>
                          <td>
                            {homestayMap[s.homestayId]
                              ? `${homestayMap[s.homestayId]} (ID: ${s.homestayId})`
                              : `Unknown (ID: ${s.homestayId})`}
                          </td>
                          <td>{getTypeName(s)}</td>
                          <td>{s.price?.toLocaleString()} VND</td>
                          <td>{s.specialNotes}</td>
                          <td>{getBadgeStatus(s.status)}</td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-2"
                              onClick={() =>
                                navigate(`/host/edit-service/${s.id}`)
                              }
                            >
                              <BsPencilSquare />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(s.id)}
                            >
                              <BsTrash />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-3">
                          Không có dịch vụ nào
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* Service Distribution Chart */}
            <Card className="mt-4">
              <Card.Header>Phân Bổ Dịch Vụ</Card.Header>
              <Card.Body>
                {Object.entries(distribution).map(([type, count], idx) => {
                  const percent = Math.round((count / total) * 100);
                  return (
                    <div key={type} className="mb-3">
                      <div className="d-flex justify-content-between small mb-1">
                        <span>{type}</span>
                        <span>{percent}%</span>
                      </div>
                      <ProgressBar
                        now={percent}
                        label={`${percent}%`}
                        style={{ backgroundColor: "#e9ecef", height: "20px", backgroundColor: "#f0f0f0" }}
                        variant={null}
                        animated
                        striped
                        className="mb-2"
                      >
                        <div
                          style={{
                            width: `${percent}%`,
                            backgroundColor: getColor(idx),
                          }}
                        ></div>
                      </ProgressBar>
                    </div>
                  );
                })}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
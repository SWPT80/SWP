import { useState, useEffect } from "react";
import {
  Table,
  Modal,
  Button,
  Form,
  Row,
  Col,
  Container,
  Card,
  Alert,
  AlertContainer
} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AllRoom() {
  const api = 'http://localhost:8080/api/rooms';
  const navigate = useNavigate();
  const [hostId, setHostId] = useState(() => localStorage.getItem("hostId"));
  const [alerts, setAlerts] = useState([]);

  const showAlert = (message, variant = 'success', duration = 4000) => {
    const id = Date.now();
    const newAlert = {
      id,
      message,
      variant,
      show: true,
      duration,
      startTime: Date.now(),
      progress: 0
    };
    setAlerts(prev => [...prev, newAlert]);

    const progressInterval = setInterval(() => {
      setAlerts(prev => prev.map(alert => {
        if (alert.id === id) {
          const elapsed = Date.now() - alert.startTime;
          const progress = Math.min((elapsed / duration) * 100, 100);
          return { ...alert, progress };
        }
        return alert;
      }));
    }, 50);

    setTimeout(() => {
      clearInterval(progressInterval);
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, duration);
  };

  const hideAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      showAlert("Không tìm thấy token. Vui lòng đăng nhập lại.", "danger");
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
            showAlert("Quyền truy cập bị từ chối. Yêu cầu vai trò chủ nhà.", "danger");
            navigate("/", { replace: true });
            return;
          }
          localStorage.setItem("hostId", user.id);
          setHostId(user.id);
          showAlert(`Chào mừng quay lại, ${user.name || 'Chủ nhà'}!`, "success");
        })
        .catch(() => {
          showAlert("Xác thực thất bại.", "danger");
          navigate("/", { replace: true });
        });
    }
  }, [navigate, hostId]);

  const fetchRooms = async () => {
    try {
      const res = await fetch(`${api}/host/${hostId}`);
      const data = await res.json();
      setRooms(data);
      showAlert("Tải danh sách phòng thành công.", "success", 2000);
    } catch (error) {
      showAlert("Không thể tải danh sách phòng.", "danger");
    }
  };

  useEffect(() => {
    if (hostId) {
      fetchRooms();
    }
  }, [hostId]);

  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (homestayId, roomId) => {
    try {
      const res = await fetch(`${api}/${homestayId}/${roomId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        showAlert("🗑️ Xóa phòng thành công!", "success");
        fetchRooms();
        window.dispatchEvent(new CustomEvent('roomDeleted', {
          detail: { homestayId, roomId }
        }));
      } else {
        showAlert("Không thể xóa phòng.", "danger");
      }
    } catch (error) {
      showAlert("Đã xảy ra lỗi khi xóa phòng.", "danger");
    }
  };

  const updateField = (field, value) => {
    setSelectedRoom((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const updateBody = {
        roomType: selectedRoom.roomType,
        roomCapacity: parseInt(selectedRoom.roomCapacity),
        roomPrice: parseFloat(selectedRoom.roomPrice),
        rating: parseFloat(selectedRoom.rating),
        status: selectedRoom.status
      };

      const res = await fetch(`${api}/${selectedRoom.homestayId}/${selectedRoom.roomId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateBody)
      });

      if (!res.ok) {
        showAlert("❌ Cập nhật thất bại!", "danger");
        return;
      }

      showAlert("✅ Cập nhật phòng thành công!", "success");
      setShowModal(false);
      fetchRooms();

    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
      showAlert("Đã xảy ra lỗi khi cập nhật phòng.", "danger");
    }
  };

  return (
    <Container className="mt-5">
      {alerts.map((alert) => (
        <div key={alert.id} className="position-relative">
          <Alert
            show={alert.show}
            onClose={() => hideAlert(alert.id)}
            variant={alert.variant}
            className="text-white position-fixed"
            style={{ minWidth: '300px', top: '20px', right: '20px', zIndex: 9999 }}
          >
            <Alert.Heading>
              <span className="me-2">
                {alert.variant === 'success' && '✅'}
                {alert.variant === 'danger' && '❌'}
                {alert.variant === 'warning' && '⚠️'}
                {alert.variant === 'info' && 'ℹ️'}
              </span>
              <strong className="me-auto">
                {alert.variant === 'success' && 'Thành công'}
                {alert.variant === 'danger' && 'Lỗi'}
                {alert.variant === 'warning' && 'Cảnh báo'}
                {alert.variant === 'info' && 'Thông tin'}
              </strong>
            </Alert.Heading>
            <div>{alert.message}</div>
            <div className="mt-2">
              <div
                className="progress"
                style={{
                  height: '3px',
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  borderRadius: '2px'
                }}
              >
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${alert.progress}%`,
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    transition: 'width 0.05s linear',
                    borderRadius: '2px'
                  }}
                />
              </div>
            </div>
          </Alert>
        </div>
      ))}
      <Card className="shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>🏠 Quản lý phòng</h2>
          <Button
            variant="success"
            size="lg"
            onClick={() => navigate('/host/rooms/add')}
            className="d-flex align-items-center gap-2"
          >
            ➕ Thêm phòng mới
          </Button>
        </div>
        <Table responsive bordered hover className="align-middle text-center">
          <thead className="table-primary">
            <tr>
              <th>Mã phòng</th>
              <th>Loại phòng</th>
              <th>Sức chứa</th>
              <th>Giá</th>
              <th>Đánh giá</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  <Alert variant="info">Không tìm thấy phòng nào.</Alert>
                </td>
              </tr>
            ) : (
              rooms.map((room) => (
                <tr
                  key={`${room.homestayId}-${room.roomId}`}
                  onClick={() => {
                    setSelectedRoom(room);
                    setShowModal(true);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{room.roomId}</td>
                  <td>{room.roomType}</td>
                  <td>{room.roomCapacity}</td>
                  <td>{room.roomPrice.toLocaleString()} đ</td>
                  <td>{room.rating}</td>
                  <td>
                    <span className={`badge ${room.status ? 'bg-success' : 'bg-secondary'}`}>
                      {room.status ? 'Hoạt động' : 'Không hoạt động'}
                    </span>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <Button
                      size="sm"
                      variant="warning"
                      className="me-2"
                      onClick={() => navigate(`/host/rooms/edit/${room.homestayId}_${room.roomId}`, { state: room })}
                    >
                      ✏️ Chỉnh sửa
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(room.homestayId, room.roomId);
                      }}
                    >
                      🗑️ Xóa
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa phòng #{selectedRoom?.roomId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Loại phòng</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedRoom?.roomType || ""}
                    onChange={(e) => updateField("roomType", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Sức chứa</Form.Label>
                  <Form.Control
                    type="number"
                    value={selectedRoom?.roomCapacity || 0}
                    onChange={(e) => updateField("roomCapacity", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Giá</Form.Label>
                  <Form.Control
                    type="number"
                    value={selectedRoom?.roomPrice || 0}
                    onChange={(e) => updateField("roomPrice", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Đánh giá</Form.Label>
                  <Form.Control
                    type="number"
                    value={selectedRoom?.rating || 0}
                    onChange={(e) => updateField("rating", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Trạng thái</Form.Label>
                  <Form.Select
                    value={selectedRoom?.status}
                    onChange={(e) => updateField("status", e.target.value === 'true')}
                  >
                    <option value={true}>Hoạt động</option>
                    <option value={false}>Không hoạt động</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
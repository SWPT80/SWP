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
  Toast,
  ToastContainer
} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function AllRoom() {
  const api = 'http://localhost:8080/api/rooms';
  const navigate = useNavigate();
  const [hostId, setHostId] = useState(() => localStorage.getItem("hostId"));

  // Toast states
  const [toasts, setToasts] = useState([]);

  // Function to show toast
  const showToast = (message, type = 'success', duration = 4000) => {
    const id = Date.now();
    const newToast = {
      id,
      message,
      type, // 'success', 'error', 'warning', 'info'
      show: true,
      duration,
      startTime: Date.now(),
      progress: 0
    };
    setToasts(prev => [...prev, newToast]);
    
    // Update progress bar
    const progressInterval = setInterval(() => {
      setToasts(prev => prev.map(toast => {
        if (toast.id === id) {
          const elapsed = Date.now() - toast.startTime;
          const progress = Math.min((elapsed / duration) * 100, 100);
          return { ...toast, progress };
        }
        return toast;
      }));
    }, 50);
    
    // Auto hide after duration
    setTimeout(() => {
      clearInterval(progressInterval);
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration);
  };

  const hideToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

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

  const fetchRooms = async () => {
    try {
      const res = await fetch(`${api}/host/${hostId}`);
      const data = await res.json();
      setRooms(data);
    } catch (error) {
      showToast("Failed to load rooms", "error");
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
        showToast("🗑️ Room deleted successfully!", "success");
        fetchRooms();

        // Dispatch custom event để thông báo cho các component khác
        window.dispatchEvent(new CustomEvent('roomDeleted', {
          detail: { homestayId, roomId }
        }));
      } else {
        showToast("Failed to delete room", "error");
      }
    } catch (error) {
      showToast("An error occurred while deleting room", "error");
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
        showToast("❌ Update failed!", "error");
        return;
      }

      showToast("✅ Room updated successfully!", "success");
      setShowModal(false);
      fetchRooms(); // reload danh sách

    } catch (err) {
      console.error("Update error:", err);
      showToast("An error occurred while updating room", "error");
    }
  };

  const getToastVariant = (type) => {
    switch (type) {
      case 'success': return 'success';
      case 'error': return 'danger';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'primary';
    }
  };

  const getToastIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>🏠 Manage Your Rooms</h2>
          <Button 
            variant="success" 
            size="lg"
            onClick={() => navigate('/host/rooms/add')}
            className="d-flex align-items-center gap-2"
          >
            ➕ Add New Room
          </Button>
        </div>
        <Table responsive bordered hover className="align-middle text-center">
          <thead className="table-primary">
            <tr>
              <th>Room ID</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
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
                <td>${room.roomPrice.toLocaleString()}</td>
                <td>{room.rating}</td>
                <td>
                  <span className={`badge ${room.status ? 'bg-success' : 'bg-secondary'}`}>
                    {room.status ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => navigate(`/host/rooms/edit/${room.homestayId}_${room.roomId}`, { state: room })}
                  >
                    ✏️ Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(room.homestayId, room.roomId);
                    }}
                  >
                    🗑️ Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Room #{selectedRoom?.roomId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Room Type</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedRoom?.roomType || ""}
                    onChange={(e) => updateField("roomType", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Capacity</Form.Label>
                  <Form.Control
                    type="number"
                    value={selectedRoom?.roomCapacity || 0}
                    onChange={(e) => updateField("roomCapacity", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={selectedRoom?.roomPrice || 0}
                    onChange={(e) => updateField("roomPrice", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type="number"
                    value={selectedRoom?.rating || 0}
                    onChange={(e) => updateField("rating", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={selectedRoom?.status}
                    onChange={(e) => updateField("status", e.target.value === 'true')}
                  >
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Container */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        {toasts.map((toast) => (
          <div key={toast.id} className="position-relative">
            <Toast
              show={toast.show}
              onClose={() => hideToast(toast.id)}
              bg={getToastVariant(toast.type)}
              className="text-white"
              style={{ minWidth: '300px' }}
            >
              <Toast.Header>
                <span className="me-2">{getToastIcon(toast.type)}</span>
                <strong className="me-auto">
                  {toast.type === 'success' && 'Success'}
                  {toast.type === 'error' && 'Error'}
                  {toast.type === 'warning' && 'Warning'}
                  {toast.type === 'info' && 'Info'}
                </strong>
              </Toast.Header>
              <Toast.Body>
                {toast.message}
                {/* Progress Bar */}
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
                        width: `${toast.progress}%`,
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        transition: 'width 0.05s linear',
                        borderRadius: '2px'
                      }}
                    />
                  </div>
                </div>
              </Toast.Body>
            </Toast>
          </div>
        ))}
      </ToastContainer>
    </Container>
  );
}
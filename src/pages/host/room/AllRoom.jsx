import { useState, useEffect } from "react";
import {
  Table,
  Modal,
  Button,
  Form,
  Row,
  Col,
  Container,
  Card
} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
export default function AllRoom() {
  const api = 'http://localhost:8080/api/rooms';
   const navigate = useNavigate();
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
  const fetchRooms = async () => {
    const res = await fetch(`${api}/host/${hostId}`);
    const data = await res.json();
    setRooms(data);
  };

  useEffect(() => {
    fetchRooms();
  }, [hostId]);

  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (homestayId, roomId) => {
    const res = await fetch(`${api}/${homestayId}/${roomId}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      alert('Room deleted');
      fetchRooms();
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
        alert('Update failed!');
        return;
      }

      alert('Room updated!');
      setShowModal(false);
      fetchRooms(); // reload danh sách

    } catch (err) {
      console.error("Update error:", err);
      alert("An error occurred while updating room.");
    }
  };


  return (
    <Container className="mt-5">
      <Card className="shadow p-4">
        <h2 className="text-center mb-4">🏠 Manage Your Rooms</h2>
        <Table responsive bordered hover className="align-middle text-center">
          <thead className="table-primary">
            <tr>
              <th>Room ID</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Images</th>
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
                <td>
                  {room.roomImages?.length > 0 ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center' }}>
                      {room.roomImages.map((img, index) => (
                        <img
                          key={index}
                          src={img.url}
                          alt={`room-${index}`}
                          width={80}
                          height={60}
                          style={{ objectFit: 'cover', borderRadius: '4px' }}
                        />
                      ))}
                    </div>
                  ) : (
                    <span>No image</span>
                  )}
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
    </Container>
  );
}

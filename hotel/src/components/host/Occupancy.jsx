import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Form, Badge } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useWebSocket } from "../../context/WebSocketContext";

export default function Occupancy() {
  const { user } = useAuth();
  const { subscribe } = useWebSocket();
  const hostId = user?.id;

  const [rooms, setRooms] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [roomTypeFilter, setRoomTypeFilter] = useState("All");
  const [bedSizeFilter, setBedSizeFilter] = useState("All");

  // Fetch rooms from API
  const fetchRooms = async () => {
    if (!hostId) return;
    try {
      const res = await axios.get(`http://localhost:8080/api/rooms/host/${hostId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRooms(res.data || []);
    } catch (err) {
      console.error("Failed to load rooms", err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [hostId]);

  // Subscribe WebSocket to receive booking updates
  useEffect(() => {
    if (!user || !hostId) return;

    const topic = `/topic/notifications/${user.id}`;
    subscribe(topic, () => {
      console.log("🔔 Có thay đổi trạng thái phòng, đang reload...");
      fetchRooms();
    });
  }, [user, hostId, subscribe]);

  const filteredRooms = rooms.filter((room) => {
    const statusMatch = statusFilter === "All" || (room.status ? "Available" : "Booked") === statusFilter;
    const typeMatch = roomTypeFilter === "All" || room.roomType === roomTypeFilter;
    const bedMatch = bedSizeFilter === "All" || (room.bed?.includes?.(bedSizeFilter) ?? true);
    return statusMatch && typeMatch && bedMatch;
  });

  return (
    <div className="p-3">
      <h2 className="mb-4">Room Availability</h2>
      <Row className="mb-3">
        <Col md={3}>
          <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select value={roomTypeFilter} onChange={(e) => setRoomTypeFilter(e.target.value)}>
            <option value="All">All Room Types</option>
            {[...new Set(rooms.map((r) => r.roomType))].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select value={bedSizeFilter} onChange={(e) => setBedSizeFilter(e.target.value)}>
            <option value="All">All Bed Sizes</option>
            {[...new Set(rooms.map((r) => r.bed || ""))].map((bed) => (
              <option key={bed} value={bed}>{bed}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Button variant="secondary" onClick={() => {
            setStatusFilter("Available");
            setRoomTypeFilter("All");
            setBedSizeFilter("All");
          }}>Clear</Button>
        </Col>
      </Row>

      <Row>
        {filteredRooms.map((room, index) => (
          <Col key={index} md={3} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <strong>Room</strong>
                  <Badge bg={room.status ? "success" : "danger"}>
                    {room.status ? "Available" : "Booked"}
                  </Badge>
                </div>
                <h4 className="mt-2">#{room.roomId || "N/A"}</h4>
                <div className="mb-2">{room.roomType || "N/A"}</div>
                <div className="mb-1">
                  <small>Capacity: {room.roomCapacity || "-"}</small>
                </div>
                <div>
                  <small>Price: {room.roomPrice ? `VND ${room.roomPrice.toLocaleString()}` : "-"}</small>
                </div>
                <Button variant="link" size="sm" className="p-0 mt-2">Add Guest</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

import { Container, Row, Col, Card } from "react-bootstrap";
import { Calendar, Home, Clock } from "lucide-react";
import { BookingsTable } from "../../components/host/BookingsTable";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function Booking() {
  const { user } = useAuth();
  const hostId = user?.id;
  const [stats, setStats] = useState({
    checkIns: 0,
    checkOuts: 0,
    pendingActions: 0,
    completedCheckIns: 0,
    completedCheckOuts: 0,
  });
  const [error, setError] = useState("");
  const stompClientRef = useRef(null);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/bookings/homestay/${hostId}/stats`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setStats(res.data);
    } catch (err) {
      setError("Failed to load booking stats: " + err.message);
    }
  };

  useEffect(() => {
    if (!hostId) return;

    fetchStats();

    // WebSocket setup
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/topic/notifications/${hostId}`, (message) => {
          const notification = JSON.parse(message.body);
          if (
            notification.type === "BOOKING_CREATED" ||
            notification.type === "BOOKING_STATUS_UPDATE"
          ) {
            fetchStats(); // Cập nhật số liệu khi có thông báo mới
          }
        });
      },
    });
    client.activate();
    stompClientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [hostId]);

  return (
    <Container fluid className="py-4">
      {error && <div className="text-danger mb-4">{error}</div>}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <div
                className="mb-3 d-flex justify-content-center align-items-center bg-primary bg-opacity-10 rounded-circle"
                style={{ width: 48, height: 48 }}
              >
                <Calendar className="text-primary" />
              </div>
              <div className="text-muted mb-1">Today's Check-ins</div>
              <h4>{stats.checkIns}</h4>
              <div className="text-success">{stats.completedCheckIns} completed</div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <div
                className="mb-3 d-flex justify-content-center align-items-center bg-success bg-opacity-10 rounded-circle"
                style={{ width: 48, height: 48 }}
              >
                <Home className="text-success" />
              </div>
              <div className="text-muted mb-1">Today's Check-outs</div>
              <h4>{stats.checkOuts}</h4>
              <div className="text-success">{stats.completedCheckOuts} completed</div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <div
                className="mb-3 d-flex justify-content-center align-items-center bg-warning bg-opacity-10 rounded-circle"
                style={{ width: 48, height: 48 }}
              >
                <Clock className="text-warning" />
              </div>
              <div className="text-muted mb-1">Pending Actions</div>
              <h4>{stats.pendingActions}</h4>
              <div className="text-warning">Requires attention</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <BookingsTable hostId={hostId} />
    </Container>
  );
}
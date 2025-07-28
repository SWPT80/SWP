import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Spinner, Card } from "react-bootstrap";
import { BookingsTable } from "../../components/host/BookingsTable";
import { useAuth } from "../../context/AuthContext";
import "../../assets/css/Dashboard.css";

export default function BookingPage() {
  const { user } = useAuth();
  const hostId = user?.id;

  const [metrics, setMetrics] = useState({
    totalBookings: 0,
    availableRooms: 0,
    revenue: 0,
    rating: 4.5,
  });

  const [loading, setLoading] = useState({ metrics: true });

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!hostId) return;
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/api/bookings/host/${hostId}/metrics`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMetrics({
          totalBookings: response.data.totalBookings,
          availableRooms: response.data.availableRooms,
          revenue: response.data.revenue,
          rating: 4.5,
        });
      } catch (error) {
        console.error("Error fetching metrics:", error);
      } finally {
        setLoading((prev) => ({ ...prev, metrics: false }));
      }
    };

    fetchMetrics();
  }, [hostId]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12 mt-5">
                <h3 className="page-title mt-3">Booking Management</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item active">Bookings</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <Row className="mb-4">
            {[
              {
                title: "Total Bookings",
                value: loading.metrics ? "..." : metrics.totalBookings,
                icon: "user-plus",
              },
              {
                title: "Available Rooms",
                value: loading.metrics ? "..." : metrics.availableRooms,
                icon: "home",
              },
              {
                title: "Revenue",
                value: loading.metrics ? "..." : formatCurrency(metrics.revenue),
                icon: "dollar-sign",
              },
              {
                title: "Rating",
                value: metrics.rating,
                icon: "star",
              },
            ].map((card, index) => (
              <Col xl={3} sm={6} key={index} className="mb-3">
                <div className="cardDashboard board1 fill h-100">
                  <div className="cardDashboard-body">
                    <div className="dash-widget-header d-flex justify-content-between align-items-center">
                      <div>
                        <h3 className="card_widget_header">{card.value}</h3>
                        <h6 className="text-muted">{card.title}</h6>
                      </div>
                      <span className="opacity-7 text-muted">
                        <i className={`fe fe-${card.icon}`}></i>
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          {/* Bookings Table */}
          <Card className="cardDashboard">
            <Card.Header as="h5">Bookings</Card.Header>
            <Card.Body>
              {loading.metrics ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <BookingsTable hostId={hostId} metrics={metrics} />
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
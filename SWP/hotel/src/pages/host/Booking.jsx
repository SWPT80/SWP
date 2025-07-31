import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosConfig';
import { useAuth } from "../../context/AuthContext";
import { Container, Row, Col, Spinner, Card, Alert } from "react-bootstrap";
import { BookingsTable } from "../../components/host/BookingsTable";
import "../../assets/styles/Dashboard.css";

export default function BookingPage() {
  const { user } = useAuth();
  const hostId = user?.id;
  const [error, setError] = useState('');

  const [metrics, setMetrics] = useState({
    totalBookings: 0,
    availableRooms: 0,
    revenue: 0,
    rating: 4.5,
  });

  const [loading, setLoading] = useState({ metrics: true });

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!hostId) {
        setError('Không tìm thấy Host ID. Vui lòng đăng nhập lại.');
        return;
      }
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
        setError('');
      } catch (error) {
        console.error("Lỗi khi tải số liệu:", error);
        setError("Không thể tải số liệu thống kê.");
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
          {error && (
            <Alert variant="danger" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12 mt-5">
                <h3 className="page-title mt-3">Quản lý đặt phòng</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item active">Đặt phòng</li>
                </ul>
              </div>
            </div>
          </div>

          <Row className="mb-4">
            {[
              {
                title: "Tổng đơn đặt phòng",
                value: loading.metrics ? "..." : metrics.totalBookings,
                icon: "user-plus",
              },
              {
                title: "Phòng trống",
                value: loading.metrics ? "..." : metrics.availableRooms,
                icon: "home",
              },
              {
                title: "Doanh thu",
                value: loading.metrics ? "..." : formatCurrency(metrics.revenue),
                icon: "dollar-sign",
              },
              {
                title: "Đánh giá",
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

          <Card className="cardDashboard">
            <Card.Header as="h5">Đặt phòng</Card.Header>
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
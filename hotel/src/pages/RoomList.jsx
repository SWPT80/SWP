// src/pages/RoomList.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const RoomList = () => {
  const { homestayId } = useParams();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/rooms/homestay/${homestayId}`);
        setRooms(response.data);
      } catch (err) {
        console.error('Failed to fetch rooms:', err);
        setError('Không thể tải danh sách phòng. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [homestayId]);

  const handleRoomClick = (roomNumber) => {
    navigate(`/room/roomdetails?homestayId=${homestayId}&roomNumber=${roomNumber}`);
  };

  if (loading) return <div className="text-center py-10">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <Container className="my-5">
      <h2 className="mb-4">Danh sách phòng</h2>
      <Row>
        {rooms.length === 0 ? (
          <Col>
            <p>Không có phòng nào được tìm thấy cho homestay này.</p>
          </Col>
        ) : (
          rooms.map((room) => (
            <Col md={4} key={room.roomNumber} className="mb-4">
              <Card
                className="shadow-sm"
                style={{ cursor: 'pointer' }}
                onClick={() => handleRoomClick(room.roomNumber)}
              >
                <Card.Img
                  variant="top"
                  src={room.images?.[0]?.imageUrl || '/images/placeholder.jpg'}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{room.type}</Card.Title>
                  <Card.Text>
                    Phòng số: {room.roomNumber}
                    <br />
                    Giá: {room.price.toLocaleString('vi-VN')} VND/đêm
                    <br />
                    Sức chứa: {room.capacity} người
                    <br />
                    Đánh giá: {room.rating ? room.rating.toFixed(1) : 'Chưa có'}
                  </Card.Text>
                  <Button variant="primary">Xem chi tiết</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default RoomList;
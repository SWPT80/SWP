import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const FavoriteListDetail = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [listName, setListName] = useState('');
  const [error, setError] = useState('');
  const userId = localStorage.getItem('userId') || localStorage.getItem('hostId');

  useEffect(() => {
    if (!userId) {
      setError('Không tìm thấy ID người dùng.');
      return;
    }

    const fetchFavorites = async () => {
      try {
        const [favRes, listRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/favorites/user/${userId}`),
          axios.get(`http://localhost:8080/api/favorites/lists/${userId}`)
        ]);

        const matchedList = listRes.data.find(l => l.id.toString() === id);
        if (matchedList) {
          setListName(matchedList.name);
        } else {
          setError('Không tìm thấy danh sách yêu thích.');
        }

        const filtered = favRes.data.filter(item => Number(item.listId) === Number(id));
        setItems(filtered);
        setError('');
      } catch (err) {
        console.error('Lỗi khi tải danh sách yêu thích:', err);
        setError('Không thể tải danh sách yêu thích. Vui lòng thử lại.');
      }
    };

    fetchFavorites();
  }, [id, userId]);

  const handleRemove = async (favoriteId) => {
    try {
      await axios.delete(`http://localhost:8080/api/favorites/${favoriteId}`);
      setItems(prev => prev.filter(item => item.favoriteId !== favoriteId));
      setError('');
    } catch (err) {
      console.error('Lỗi khi xóa mục yêu thích:', err);
      setError('Không thể xóa mục yêu thích. Vui lòng thử lại.');
    }
  };

  const handleBooking = (item) => {
    const redirectUrl = {
      homestay: `/offer?homestayId=${item.targetId}`,
      experience: `/experience/${item.targetId}`,
      service: `/service/${item.targetId}`
    }[item.targetType];

    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      setError('Không thể chuyển hướng đến trang đặt phòng.');
    }
  };

  return (
    <Container className="mt-5">
      {error && (
        <Alert variant="danger" onClose={() => setError('')} dismissible>
          {error}
        </Alert>
      )}
      <h2 className="mb-4 fw-bold">{listName || 'Danh sách yêu thích'}</h2>
      {items.length === 0 && !error ? (
        <Alert variant="info">
          Danh sách yêu thích trống.
        </Alert>
      ) : (
        <Row xs={1} sm={2} md={3} className="g-4">
          {items.map(item => (
            <Col key={item.favoriteId}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={item.imageUrl?.startsWith('http') ? item.imageUrl : `/${item.imageUrl}`}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{item.name || 'Không rõ tên'}</Card.Title>
                  <Card.Text>Loại: {item.targetType === 'homestay' ? 'Homestay' : item.targetType === 'experience' ? 'Trải nghiệm' : 'Dịch vụ'}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="outline-danger" onClick={() => handleRemove(item.favoriteId)}>Xóa</Button>
                    <Button variant="primary" onClick={() => handleBooking(item)}>Xem chi tiết</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default FavoriteListDetail;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const FavoriteListDetail = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [listName, setListName] = useState('');
  const userId = localStorage.getItem('userId') || localStorage.getItem('hostId');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const [favRes, listRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/favorites/user/${userId}`),
          axios.get(`http://localhost:8080/api/favorites/lists/${userId}`)
        ]);

        const matchedList = listRes.data.find(l => l.id.toString() === id);
        if (matchedList) setListName(matchedList.name);

        const filtered = favRes.data.filter(item => Number(item.listId) === Number(id));
        setItems(filtered);
      } catch (err) {
        console.error('Failed to fetch wishlist:', err);
      }
    };

    fetchFavorites();
  }, [id, userId]);

  const handleRemove = async (favoriteId) => {
    try {
      await axios.delete(`http://localhost:8080/api/favorites/${favoriteId}`);
      setItems(prev => prev.filter(item => item.favoriteId !== favoriteId));
    } catch (err) {
      console.error('Remove failed:', err);
    }
  };

  const handleBooking = (item) => {
    const redirectUrl = {
      homestay: `/offer?homestayId=${item.targetId}`,
      experience: `/experience/${item.targetId}`,
      service: `/service/${item.targetId}`
    }[item.targetType];

    if (redirectUrl) window.location.href = redirectUrl;
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 fw-bold">{listName}</h2>
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
                <Card.Text>Loại: {item.targetType}</Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="outline-danger" onClick={() => handleRemove(item.favoriteId)}>Xoá</Button>
                  <Button variant="primary" onClick={() => handleBooking(item)}>Xem chi tiết</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FavoriteListDetail;

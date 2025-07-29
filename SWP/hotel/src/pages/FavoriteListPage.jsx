import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const FavoriteListPage = () => {
  const userId = localStorage.getItem('userId') || localStorage.getItem('hostId');
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    const fetchLists = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/favorites/lists/${userId}`);
        const resItems = await axios.get(`http://localhost:8080/api/favorites/user/${userId}`);

        const enriched = res.data.map((list) => {
          // Fix: ép kiểu rõ ràng listId và list.id để tránh === bị fail
          const listItems = resItems.data.filter(item => Number(item.listId) === Number(list.id));

          const randomImage = listItems.length > 0
            ? listItems[Math.floor(Math.random() * listItems.length)].imageUrl
            : null;

          return {
            ...list,
            imageUrl: randomImage,
            itemCount: listItems.length,
          };
        });

        setLists(enriched);
      } catch (err) {
        console.error('Lỗi khi lấy danh sách yêu thích:', err);
      }
    };

    fetchLists();
  }, [userId]);

  const goToListDetail = (listId) => {
    navigate(`/wishlist/${listId}`);
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 fw-bold">Yêu thích</h2>
      <Row xs={1} sm={2} md={3} className="g-4">
        {lists.map((list) => (
          <Col key={list.id}>
            <Card className="h-100 shadow-sm" onClick={() => goToListDetail(list.id)} style={{ cursor: 'pointer' }}>
              <Card.Img
                variant="top"
                src={list.imageUrl || '/images/default.jpg'}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{list.name}</Card.Title>
                <Card.Text>Đã lưu {list.itemCount || 0} mục</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FavoriteListPage;

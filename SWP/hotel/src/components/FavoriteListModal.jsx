import React, { useEffect, useState } from 'react';
import { Modal, Button, Card, Row, Col, Image, Spinner } from 'react-bootstrap';
import axios from 'axios';

const FavoriteListModal = ({ show, onClose, userId, targetId, targetType, onAdded, onCreateNew }) => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show && userId) {
      axios.get(`http://localhost:8080/api/favorites/lists/${userId}`)
        .then(res => setLists(res.data))
        .catch(err => console.error('Failed to load favorite lists:', err));
    }
  }, [show, userId]);

  const handleSelectList = async (listId) => {
    try {
      setLoading(true);
      await axios.post(`http://localhost:8080/api/favorites/add-to-list`, {
        userId: parseInt(userId),
        targetId,
        targetType,
        listId
      });
      onAdded?.();
      onClose();
    } catch (err) {
      console.error('Failed to add to list:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered size="md" dialogClassName="favorite-list-modal">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Lưu vào danh sách yêu thích</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        {lists.length === 0 ? (
            <p className="text-muted">Chưa có danh sách yêu thích nào.</p>
        ) : (
            <Row xs={1} md={2} className="g-3">
            {lists.map((list) => (
                <Col key={list.id}>
                <Card
                    className="h-100 border-0 shadow-sm card-hover"
                    role="button"
                    onClick={() => handleSelectList(list.id)}
                    style={{ borderRadius: '16px' }}
                >
                    <Card.Img
                    variant="top"
                    src={
                        list.imageUrl?.startsWith('http')
                        ? list.imageUrl
                        : `/${list.imageUrl || 'default.jpg'}`
                    }
                    alt={list.name}
                    style={{ height: '160px', objectFit: 'cover', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}
                    />
                    <Card.Body className="pt-2 pb-3">
                    <Card.Title className="fw-semibold mb-1" style={{ fontSize: '15px' }}>
                        {list.name}
                    </Card.Title>
                    <Card.Text className="text-muted small mb-0">
                        Đã lưu {list.itemCount || 0} mục
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
            ))}
            </Row>
        )}
        </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" className="w-100 py-2 fw-semibold" onClick={onCreateNew}>
          Tạo danh sách mong muốn mới
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FavoriteListModal;

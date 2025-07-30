import React, { useEffect, useState } from 'react';
import { Modal, Button, Card, Row, Col, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const FavoriteListModal = ({ show, onClose, userId, targetId, targetType, onAdded, onCreateNew }) => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (show && userId) {
      setLoading(true);
      axios.get(`http://localhost:8080/api/favorites/lists/${userId}`)
        .then(res => {
          setLists(res.data);
          setError('');
        })
        .catch(err => {
          console.error('Lỗi khi tải danh sách yêu thích:', err);
          setError('Không thể tải danh sách yêu thích. Vui lòng thử lại.');
        })
        .finally(() => setLoading(false));
    } else if (show && !userId) {
      setError('Không tìm thấy ID người dùng.');
      setLoading(false);
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
      setError('');
    } catch (err) {
      console.error('Lỗi khi thêm vào danh sách:', err);
      setError('Không thể thêm vào danh sách yêu thích. Vui lòng thử lại.');
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
        {error && (
          <Alert variant="danger" onClose={() => setError('')} dismissible>
            {error}
          </Alert>
        )}
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Đang tải danh sách...</p>
          </div>
        ) : lists.length === 0 ? (
          <Alert variant="info">Chưa có danh sách yêu thích nào.</Alert>
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
                    alt={list.name || 'Danh sách yêu thích'}
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
          Tạo danh sách yêu thích mới
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FavoriteListModal;
import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateFavoriteListModal = ({ show, onClose, userId, onCreated }) => {
  const [name, setName] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    if (!name.trim()) {
      setError('Tên danh sách không được để trống.');
      return;
    }
    if (!userId) {
      setError('Không tìm thấy ID người dùng.');
      return;
    }
    setCreating(true);
    try {
      const res = await axios.post(`http://localhost:8080/api/favorites/lists`, {
        userId: parseInt(userId),
        name: name.trim()
      });
      onCreated?.(res.data);
      onClose();
      setName('');
      setError('');
    } catch (err) {
      setError('Lỗi khi tạo danh sách yêu thích. Vui lòng thử lại.');
      console.error('Lỗi khi tạo danh sách:', err);
    } finally {
      setCreating(false);
    }
  };

  const handleClose = () => {
    setName('');
    setError('');
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Tạo danh sách yêu thích</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Nhập tên danh sách"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
            />
            {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Hủy</Button>
        <Button variant="primary" onClick={handleCreate} disabled={creating || !name.trim()}>
          Tạo
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateFavoriteListModal;
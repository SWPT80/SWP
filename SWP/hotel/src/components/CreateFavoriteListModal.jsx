import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const CreateFavoriteListModal = ({ show, onClose, userId, onCreated }) => {
  const [name, setName] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    if (!name.trim()) {
      setError('Tên danh sách không được để trống.');
      return;
    }
    setCreating(true);
    try {
      const res = await axios.post(`http://localhost:8080/api/favorites/lists`, {
        userId: parseInt(userId),
        name: name.trim()
      });
      onCreated?.(res.data); // callback trả về danh sách vừa tạo
      onClose();
      setName('');
    } catch (err) {
      setError('Lỗi khi tạo danh sách.');
      console.error('Create list error:', err);
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
        <Modal.Title>Tạo Danh sách yêu thích</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Tên danh sách"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
            />
            {error && <div className="text-danger mt-1">{error}</div>}
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

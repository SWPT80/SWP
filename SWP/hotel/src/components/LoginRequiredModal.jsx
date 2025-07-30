import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginRequiredModal = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Thông báo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="warning">
          ⚠️ Bạn cần đăng nhập để sử dụng tính năng này.
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>Đóng</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginRequiredModal;
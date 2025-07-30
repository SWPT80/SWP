import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const LoginRequiredModal = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Thông báo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>⚠️ Bạn cần đăng nhập để sử dụng tính năng này.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>Đóng</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginRequiredModal;

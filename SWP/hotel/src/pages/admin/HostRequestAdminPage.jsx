import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Badge, Spinner, Alert, Modal } from 'react-bootstrap';

const HostRequestAdminPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalVariant, setModalVariant] = useState('success');

  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/host/requests', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequests(response.data);
    } catch (err) {
      console.error('Failed to load host requests:', err);
      if (err.response?.status === 403) {
        setError('Bạn không có quyền truy cập chức năng này.');
      } else {
        setError('Không thể tải danh sách yêu cầu host.');
      }
    } finally {
      setLoading(false);
    }
  };

  const showCenteredModal = (message, variant = 'success') => {
    setModalMessage(message);
    setModalVariant(variant);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000);
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/host/requests/${id}/approve`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchRequests();
      showCenteredModal('✅ Yêu cầu đã được duyệt thành công.', 'success');
    } catch (err) {
      const msg = err.response?.data || '❌ Không thể duyệt yêu cầu.';
      showCenteredModal(msg, 'danger');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/host/requests/${id}/reject`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchRequests();
      showCenteredModal('✅ Yêu cầu đã bị từ chối.', 'warning');
    } catch (err) {
      console.error('Reject failed:', err);
      showCenteredModal('❌ Không thể từ chối yêu cầu.', 'danger');
    }
  };



  return (
    <div className="container mt-5">
      <h2 className="mb-4">Duyệt Yêu Cầu Trở Thành Host</h2>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Loại</th>
              <th>Chi tiết</th>
              <th>Ảnh giấy tờ</th>
              <th>Xác minh email</th>
              <th>Video giới thiệu</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.fullName}</td>
                <td>{req.email}</td>
                <td>{req.phone}</td>
                <td>{req.type}</td>

                {/* Chi tiết mô tả */}
                <td>
                  <strong>{req.field1}</strong>
                  {req.field2 && <div>{req.field2}</div>}
                  <div>{req.description}</div>
                  {req.documentType && (
                    <div><strong>Loại giấy tờ:</strong> {req.documentType}</div>
                  )}
                  {req.socialLink && (
                    <div>
                      <strong>Mạng xã hội:</strong>{' '}
                      <a href={req.socialLink} target="_blank" rel="noopener noreferrer">
                        {req.socialLink}
                      </a>
                    </div>
                  )}
                </td>

                {/* Cột ảnh giấy tờ */}
                <td style={{ textAlign: 'center' }}>
                  {req.identityFileUrl && (
                    <>
                      <img
                        src={`http://localhost:8080${req.identityFileUrl}`}
                        alt="Giấy tờ"
                        onClick={() => {
                          setSelectedImageUrl(`http://localhost:8080${req.identityFileUrl}`);
                          setShowImageModal(true);
                        }}
                        style={{
                          width: '120px',
                          height: '90px',
                          objectFit: 'cover',
                          border: '1px solid #ccc',
                          cursor: 'pointer',
                          borderRadius: '4px',
                        }}
                      />
                      <div style={{ fontSize: '12px', color: '#666' }}>(Click để xem)</div>
                    </>
                  )}
                </td>
                <td>
                  <Badge bg={req.emailVerified ? 'success' : 'secondary'}>
                    {req.emailVerified ? 'Đã xác minh' : 'Chưa xác minh'}
                  </Badge>
                </td>

                {/* Cột video */}
                <td style={{ textAlign: 'center' }}>
                  {req.introVideoUrl && (
                    <video
                      width="140"
                      height="90"
                      controls
                      src={`http://localhost:8080/${req.introVideoUrl}`}
                      style={{
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                      }}
                    >
                      Không hỗ trợ video.
                    </video>
                  )}
                </td>

                <td>
                  <Badge bg={
                    req.status === 'PENDING'
                      ? 'warning'
                      : req.status === 'APPROVED'
                        ? 'success'
                        : 'danger'
                  }>
                    {req.status}
                  </Badge>
                </td>

                <td>
                  {req.status === 'PENDING' && (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        disabled={!req.emailVerified || req.status !== 'PENDING'}
                        onClick={() => handleApprove(req.id)}
                      >
                        Duyệt
                      </Button>{' '}
                      <Button variant="danger" size="sm" onClick={() => handleReject(req.id)}>Từ chối</Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal thông báo duyệt/từ chối */}
      <Modal show={showModal} centered backdrop="static" keyboard={false}>
        <Modal.Body className="text-center">
          <Alert variant={modalVariant}>{modalMessage}</Alert>
        </Modal.Body>
      </Modal>

      <Modal
        show={showImageModal}
        onHide={() => setShowImageModal(false)}
        centered
        size="xl"
        dialogClassName="fullscreen-image-modal"
      >
        <Modal.Body className="text-center p-0">
          <img
            src={selectedImageUrl}
            alt="Ảnh chi tiết"
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HostRequestAdminPage;
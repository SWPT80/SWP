import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  Pagination,
  Card,
  Modal,
  Alert,
  Spinner
} from "react-bootstrap";
import { Edit, Trash2, Plus } from "lucide-react";
import axios from "axios";
import removeAccents from "remove-accents";
import { useNavigate } from "react-router-dom";

export default function FacilitiesList() {
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [currentFacility, setCurrentFacility] = useState(null);
  const [hostId, setHostId] = useState(() => localStorage.getItem("hostId"));
  const [formData, setFormData] = useState({
    typeId: "",
    typeName: "",
    iconClass: "",
    homestayId: "",
  });
  const [loading, setLoading] = useState(true);
  const [homestays, setHomestays] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const showAlert = (message, variant = 'success', duration = 4000) => {
    const id = Date.now();
    const newAlert = {
      id,
      message,
      variant,
      show: true,
      duration,
      startTime: Date.now(),
      progress: 0
    };
    setAlerts(prev => [...prev, newAlert]);

    const progressInterval = setInterval(() => {
      setAlerts(prev => prev.map(alert => {
        if (alert.id === id) {
          const elapsed = Date.now() - alert.startTime;
          const progress = Math.min((elapsed / duration) * 100, 100);
          return { ...alert, progress };
        }
        return alert;
      }));
    }, 50);

    setTimeout(() => {
      clearInterval(progressInterval);
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, duration);
  };

  const hideAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  useEffect(() => {
    if (hostId) {
      axios.get(`http://localhost:8080/api/homestays/by-host/${hostId}`)
        .then(res => {
          console.log("Danh sách homestay đã tải:", res.data);
          setHomestays(res.data);
          if (res.data.length === 1) {
            const hId = res.data[0].id;
            setFormData(prev => ({ ...prev, homestayId: hId }));
            console.log("Đặt homestayId:", hId);
          }
          showAlert("Tải danh sách homestay thành công.", "success", 2000);
        })
        .catch(err => {
          console.error("Lỗi khi tải homestay:", err);
          showAlert("Không thể tải danh sách homestay.", "danger");
        });
    }
  }, [hostId]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      showAlert("Không tìm thấy token. Vui lòng đăng nhập lại.", "danger");
      navigate("/", { replace: true });
      return;
    }
    if (!hostId) {
      axios.get("http://localhost:8080/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          const user = res.data;
          if (user.role !== 'HOST') {
            showAlert("Quyền truy cập bị từ chối. Yêu cầu vai trò chủ nhà.", "danger");
            navigate("/", { replace: true });
            return;
          }
          localStorage.setItem("hostId", user.id);
          setHostId(user.id);
          showAlert(`Chào mừng quay lại, ${user.name || 'Chủ nhà'}!`, "success");
        })
        .catch(() => {
          showAlert("Xác thực thất bại.", "danger");
          navigate("/", { replace: true });
        });
    }
  }, [navigate, hostId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, entriesPerPage]);

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    if (!formData.homestayId) return;

    try {
      const response = await axios.get(
        `http://localhost:8080/api/amenities/homestay/${formData.homestayId}`
      );
      setFacilities(response.data);
      showAlert("Tải danh sách tiện nghi thành công.", "success", 2000);
    } catch (error) {
      console.error("Lỗi khi tải tiện nghi:", error);
      showAlert("Không thể tải danh sách tiện nghi.", "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formData.homestayId) {
      fetchFacilities();
    }
  }, [formData.homestayId]);

  const handleAddFacility = () => {
    setFormData({ typeId: "", typeName: "", iconClass: "", homestayId: formData.homestayId });
    setShowAddModal(true);
  };

  const handleEdit = (facility) => {
    setCurrentFacility(facility);
    setFormData({
      typeId: facility.typeId,
      typeName: facility.typeName,
      iconClass: facility.iconClass,
      homestayId: formData.homestayId,
    });
    setShowEditModal(true);
  };

  const handleDelete = (facility) => {
    setCurrentFacility(facility);
    setShowDeleteAlert(true);
  };

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:8080/api/amenities", {
        ...formData,
        homestayId: parseInt(formData.homestayId, 10)
      });
      fetchFacilities();
      setShowAddModal(false);
      showAlert("Thêm tiện nghi thành công!", "success");
    } catch (error) {
      console.error("Lỗi khi thêm tiện nghi:", error);
      showAlert("Không thể thêm tiện nghi.", "danger");
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/amenities/${currentFacility.typeId}`, {
        ...formData,
        homestayId: parseInt(formData.homestayId, 10)
      });
      fetchFacilities();
      setShowEditModal(false);
      setCurrentFacility(null);
      showAlert("Cập nhật tiện nghi thành công!", "success");
    } catch (error) {
      console.error("Lỗi khi cập nhật tiện nghi:", error);
      showAlert("Không thể cập nhật tiện nghi.", "danger");
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/amenities/${currentFacility.typeId}`);
      fetchFacilities();
      setShowDeleteAlert(false);
      setCurrentFacility(null);
      showAlert("Xóa tiện nghi thành công!", "success");
    } catch (error) {
      console.error("Lỗi khi xóa tiện nghi:", error);
      showAlert("Không thể xóa tiện nghi.", "danger");
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const filteredFacilities = facilities.filter((facility) => {
    const search = removeAccents(searchTerm.trim().toLowerCase());
    const typeName = removeAccents(facility.typeName?.toLowerCase() || "");
    const iconClass = removeAccents(facility.iconClass?.toLowerCase() || "");
    const typeId = facility.typeId?.toString() || "";

    return (
      typeName.includes(search) ||
      iconClass.includes(search) ||
      typeId.includes(search)
    );
  });

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentFacilities = filteredFacilities.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalEntries = filteredFacilities.length;
  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);

  return (
    <Container fluid className="p-4">
      {alerts.map((alert) => (
        <div key={alert.id} className="position-relative">
          <Alert
            show={alert.show}
            onClose={() => hideAlert(alert.id)}
            variant={alert.variant}
            className="text-white position-fixed"
            style={{ minWidth: '300px', top: '20px', right: '20px', zIndex: 9999 }}
          >
            <Alert.Heading>
              <span className="me-2">
                {alert.variant === 'success' && '✅'}
                {alert.variant === 'danger' && '❌'}
                {alert.variant === 'warning' && '⚠️'}
                {alert.variant === 'info' && 'ℹ️'}
              </span>
              <strong className="me-auto">
                {alert.variant === 'success' && 'Thành công'}
                {alert.variant === 'danger' && 'Lỗi'}
                {alert.variant === 'warning' && 'Cảnh báo'}
                {alert.variant === 'info' && 'Thông tin'}
              </strong>
            </Alert.Heading>
            <div>{alert.message}</div>
            <div className="mt-2">
              <div 
                className="progress" 
                style={{ 
                  height: '3px', 
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  borderRadius: '2px'
                }}
              >
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${alert.progress}%`,
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    transition: 'width 0.05s linear',
                    borderRadius: '2px'
                  }}
                />
              </div>
            </div>
          </Alert>
        </div>
      ))}
      <Card>
        <Card.Body>
          <Row className="mb-4 mt-5 align-items-center">
            <Col>
              <h4 className="mb-0 fw-bold">Danh sách tiện nghi</h4>
            </Col>
            <Col xs="auto">
              <Button variant="dark" onClick={handleAddFacility} className="d-flex align-items-center gap-2">
                <Plus size={16} /> Thêm tiện nghi
              </Button>
            </Col>
          </Row>

          <Row className="mb-3 align-items-center">
            <Col xs="auto">
              <div className="d-flex align-items-center gap-2">
                <span>Hiển thị</span>
                <Form.Select
                  size="sm"
                  style={{ width: "auto" }}
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </Form.Select>
                <span>mục</span>
              </div>
            </Col>
            <Col></Col>
            <Col xs="auto">
              <div className="d-flex align-items-center gap-2">
                <span>Tìm kiếm:</span>
                <Form.Control
                  type="text"
                  size="sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: "200px" }}
                />
              </div>
            </Col>
          </Row>

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Table responsive className="mb-4">
              <thead className="table-light">
                <tr>
                  <th>Mã</th>
                  <th>Biểu tượng</th>
                  <th>Tên</th>
                  <th>Biểu tượng</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {currentFacilities.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      <Alert variant="info">Không tìm thấy tiện nghi nào.</Alert>
                    </td>
                  </tr>
                ) : (
                  currentFacilities.map((facility) => (
                    <tr key={facility.typeId}>
                      <td>{facility.typeId}</td>
                      <td>{facility.iconClass}</td>
                      <td>{facility.typeName}</td>
                      <td>
                        <i className={`${facility.iconClass} fa-2x text-dark`} />
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button variant="outline-primary" size="sm" onClick={() => handleEdit(facility)}>
                            <Edit size={14} />
                          </Button>
                          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(facility)}>
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          )}

          <Row className="align-items-center">
            <Col>
              <span className="text-muted">
                Hiển thị {startEntry} đến {endEntry} của {totalEntries} mục
              </span>
            </Col>
            <Col xs="auto">
              <Pagination className="mb-0">
                <Pagination.Prev
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  Trước
                </Pagination.Prev>

                {Array.from({ length: Math.ceil(totalEntries / entriesPerPage) }, (_, i) => i + 1)
                  .map((page) => (
                    <Pagination.Item
                      key={page}
                      active={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Pagination.Item>
                  ))}

                <Pagination.Next
                  disabled={currentPage === Math.ceil(totalEntries / entriesPerPage)}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(totalEntries / entriesPerPage)))
                  }
                >
                  Sau
                </Pagination.Next>
              </Pagination>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thêm tiện nghi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên loại tiện nghi</Form.Label>
              <Form.Control
                type="text"
                value={formData.typeName}
                onChange={(e) => handleInputChange("typeName", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Lớp biểu tượng tiện nghi</Form.Label>
              <Form.Control
                type="text"
                value={formData.iconClass}
                onChange={(e) => handleInputChange("iconClass", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Homestay</Form.Label>
              <Form.Select
                value={formData.homestayId}
                onChange={(e) => handleInputChange("homestayId", e.target.value)}
              >
                <option value="">-- Chọn Homestay --</option>
                {homestays.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.homestayName} (ID: {h.id})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa tiện nghi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên loại tiện nghi</Form.Label>
              <Form.Control
                type="text"
                value={formData.typeName}
                onChange={(e) => handleInputChange("typeName", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Lớp biểu tượng tiện nghi</Form.Label>
              <Form.Control
                type="text"
                value={formData.iconClass}
                onChange={(e) => handleInputChange("iconClass", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Homestay</Form.Label>
              <Form.Select
                value={formData.homestayId}
                onChange={(e) => handleInputChange("homestayId", e.target.value)}
              >
                <option value="">-- Chọn Homestay --</option>
                {homestays.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.homestayName} (ID: {h.id})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Cập nhật thay đổi
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteAlert} onHide={() => setShowDeleteAlert(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có chắc chắn muốn xóa tiện nghi này?</p>
          {currentFacility && (
            <Alert variant="warning">
              <strong>Tiện nghi:</strong> {currentFacility.typeName} - {currentFacility.iconClass}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteAlert(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
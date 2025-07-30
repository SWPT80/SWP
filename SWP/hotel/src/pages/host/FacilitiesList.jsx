import { useEffect, useState } from "react"
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
  Spinner,
} from "react-bootstrap"
import { Edit, Trash2, Plus } from "lucide-react";
import axios from "axios"
import removeAccents from "remove-accents";
import { useNavigate } from "react-router-dom";

export default function FacilitiesList() {

  const navigate = useNavigate();
  const [facilities, setFacilities] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [currentFacility, setCurrentFacility] = useState(null)
  const [hostId, setHostId] = useState(() => localStorage.getItem("hostId"));
  const [formData, setFormData] = useState({
    typeId: "",
    typeName: "",
    iconClass: "",
  })
  const [loading, setLoading] = useState(true)
  const [homestays, setHomestays] = useState([]);
  useEffect(() => {
    if (hostId) {
      axios.get(`http://localhost:8080/api/homestays/by-host/${hostId}`)
        .then(res => {
          console.log("Fetched homestays:", res.data); // ✅ debug
          setHomestays(res.data);
          if (res.data.length === 1) {
            const hId = res.data[0].id;
            setFormData(prev => ({ ...prev, homestayId: hId }));
            console.log("Set homestayId:", hId);
          }
        })
        .catch(err => console.error("Failed to fetch homestays", err));
    }
  }, [hostId]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
      return;
    }
    // Nếu chưa có hostId => gọi /me
    if (!hostId) {
      axios.get("http://localhost:8080/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          const user = res.data;
          if (user.role !== 'HOST') {
            navigate("/", { replace: true });
            return;
          }
          localStorage.setItem("hostId", user.id);
          setHostId(user.id);
        })
        .catch(() => navigate("/", { replace: true }));
    }
  }, [navigate, hostId]);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, entriesPerPage]);

  useEffect(() => {
    fetchFacilities()
  }, [])

  const fetchFacilities = async () => {
    if (!formData.homestayId) return; // ⛔ tránh lỗi nếu homestay chưa sẵn sàng

    try {
      const response = await axios.get(
        `http://localhost:8080/api/amenities/homestay/${formData.homestayId}`
      );
      setFacilities(response.data);
    } catch (error) {
      console.error("Error fetching facilities:", error);
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
    setFormData({ typeId: "", typeName: "", iconClass: "" })
    setShowAddModal(true)
  }

  const handleEdit = (facility) => {
    setCurrentFacility(facility)
    setFormData({
      typeId: facility.typeId,
      typeName: facility.typeName,
      iconClass: facility.iconClass,
    })
    setShowEditModal(true)
  }

  const handleDelete = (facility) => {
    setCurrentFacility(facility)
    setShowDeleteAlert(true)
  }

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:8080/api/amenities", formData)
      fetchFacilities()
      setShowAddModal(false)
    } catch (error) {
      console.error("Error adding facility:", error)
    }
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/amenities/${currentFacility.typeId}`, formData)
      fetchFacilities()
      setShowEditModal(false)
      setCurrentFacility(null)
    } catch (error) {
      console.error("Error updating facility:", error)
    }
  }

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/amenities/${currentFacility.typeId}`)
      fetchFacilities()
      setShowDeleteAlert(false)
      setCurrentFacility(null)
    } catch (error) {
      console.error("Error deleting facility:", error)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

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
  const totalEntries = filteredFacilities.length
  const startEntry = (currentPage - 1) * entriesPerPage + 1
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries)

  return (
    <Container fluid className="p-4">
      <Card>
        <Card.Body>
          <Row className="mb-4 align-items-center">
            <Col>
              <h4 className="mb-0 fw-bold">Facilities Details List</h4>
            </Col>
            <Col xs="auto">
              <Button variant="dark" onClick={handleAddFacility} className="d-flex align-items-center gap-2">
                <Plus size={16} /> Add Facilities
              </Button>
            </Col>
          </Row>

          <Row className="mb-3 align-items-center">
            <Col xs="auto">
              <div className="d-flex align-items-center gap-2">
                <span>Show</span>
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
                <span>entries</span>
              </div>
            </Col>
            <Col></Col>
            <Col xs="auto">
              <div className="d-flex align-items-center gap-2">
                <span>Search:</span>
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
                  <th>ID</th>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Icon</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentFacilities.map((facility) => (
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
                ))}
              </tbody>
            </Table>
          )}

          <Row className="align-items-center">
            <Col>
              <span className="text-muted">
                Showing {startEntry} to {endEntry} of {totalEntries} entries
              </span>
            </Col>
            <Col xs="auto">
              <Pagination className="mb-0">
                <Pagination.Prev
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  Previous
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
                  Next
                </Pagination.Next>
              </Pagination>

            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Facility</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Facility Type Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.typeName}
                onChange={(e) => handleInputChange("typeName", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Facility Icon Class</Form.Label>
              <Form.Control
                type="text"
                value={formData.iconClass}
                onChange={(e) => handleInputChange("iconClass", e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Facility</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Facility Type Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.typeName}
                onChange={(e) => handleInputChange("typeName", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Facility Icon Class</Form.Label>
              <Form.Control
                type="text"
                value={formData.iconClass}
                onChange={(e) => handleInputChange("iconClass", e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteAlert} onHide={() => setShowDeleteAlert(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this facility?</p>
          {currentFacility && (
            <Alert variant="warning">
              <strong>Facility:</strong> {currentFacility.typeName} - {currentFacility.iconClass}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteAlert(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
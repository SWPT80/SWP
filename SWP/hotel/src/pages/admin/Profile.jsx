import React, { useEffect, useState } from "react";
import { Tab, Tabs, Form, Button, Col, Row, Card, Alert, Modal } from "react-bootstrap";
import axios from "../../utils/axiosConfig";

const AdminProfile = () => {
  const [admin, setAdmin] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchAdminInfo();
  }, []);

  const fetchAdminInfo = async () => {
    try {
      const res = await axios.get("/api/admins/me");
      setAdmin(res.data);
    } catch (err) {
      console.error("Failed to load admin info", err);
    }
  };

  const handleInputChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    try {
      await axios.put("/api/admins/me", admin);
      setMessage("Thông tin đã được cập nhật thành công.");
      setEditMode(false);
    } catch (err) {
      setMessage("Cập nhật thất bại.");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const uploadAvatar = async () => {
    if (!avatarFile) return;
    const formData = new FormData();
    formData.append("avatar", avatarFile);
    try {
      await axios.post("/api/admins/upload-avatar", formData);
      setMessage("Ảnh đại diện đã được cập nhật.");
      fetchAdminInfo();
    } catch (err) {
      setMessage("Lỗi khi cập nhật ảnh đại diện.");
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage("Mật khẩu mới không khớp.");
      return;
    }
    try {
      await axios.patch("/api/admins/change-password", passwordData);
      setMessage("Mật khẩu đã được đổi thành công.");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setMessage("Đổi mật khẩu thất bại.");
    }
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">Trang cá nhân quản trị viên</h4>
      {message && <Alert variant="info">{message}</Alert>}

      <div className="row">
        <div className="col-md-3 text-center">
          <img
            src={avatarPreview || admin.avatarUrl || "/img/default-avatar.png"}
            alt="Avatar"
            className="rounded-circle mb-3"
            width={130}
            height={130}
          />
          <Form.Control type="file" accept="image/*" onChange={handleAvatarChange} className="mb-2" />
          <Button variant="primary" size="sm" onClick={uploadAvatar}>
            Cập nhật ảnh
          </Button>
        </div>

        <div className="col-md-9">
          <Card className="mb-4">
            <Card.Body>
              <h5 className="d-flex justify-content-between">
                <span>Thông tin cá nhân</span>
                <Button variant="link" onClick={() => setEditMode(!editMode)}>
                  <i className="fa fa-edit mr-1"></i> {editMode ? "Hủy" : "Chỉnh sửa"}
                </Button>
              </h5>

              {!editMode ? (
                <>
                  <Row className="mb-2">
                    <Col sm={3}>Họ tên</Col>
                    <Col sm={9}>{admin.fullName}</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col sm={3}>Email</Col>
                    <Col sm={9}>{admin.email}</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col sm={3}>Quyền</Col>
                    <Col sm={9}>Administrator</Col>
                  </Row>
                </>
              ) : (
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Họ tên</Form.Label>
                        <Form.Control
                          type="text"
                          name="fullName"
                          value={admin.fullName || ""}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={admin.email || ""} disabled />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="success" onClick={handleSaveProfile}>
                    Lưu thay đổi
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5>Đổi mật khẩu</h5>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Mật khẩu hiện tại</Form.Label>
                  <Form.Control
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, currentPassword: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Mật khẩu mới</Form.Label>
                  <Form.Control
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, newPassword: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nhập lại mật khẩu mới</Form.Label>
                  <Form.Control
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                    }
                  />
                </Form.Group>
                <Button variant="warning" onClick={handlePasswordChange}>
                  Đổi mật khẩu
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

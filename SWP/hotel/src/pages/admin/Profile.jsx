import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminAccountSettings = () => {
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/api/admin/account/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAdmin(res.data);
        setError('');
      })
      .catch((err) => {
        console.error("Lỗi khi tải thông tin quản trị viên:", err);
        setError("Không thể tải thông tin quản trị viên.");
      });
  }, []);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSaveInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:8080/api/admin/account/update-profile", admin, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Cập nhật hồ sơ thành công.");
      setError('');
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Lỗi khi cập nhật hồ sơ:", err);
      setError("Lỗi khi cập nhật hồ sơ.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:8080/api/admin/account/change-password",
        passwordData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess("Đổi mật khẩu thành công.");
      setPasswordData({ oldPassword: "", newPassword: "" });
      setError('');
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Lỗi khi đổi mật khẩu:", err);
      setError("Đổi mật khẩu thất bại.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const getAvatarPath = () => {
    if (!admin || !admin.email) return "/images/admin/avatars/default-admin.jpg";

    const email = admin.email.toLowerCase();

    if (email === "hoangdhde180623@fpt.edu.vn") return "/images/admin/avatars/hahoang.jpg";
    else if (email === "hoangndhde180637@fpt.edu.vn") return "/images/admin/avatars/huyhoang.jpg";
    else if (email === "huyldnde180697@fpt.edu.vn") return "/images/admin/avatars/nhathuy.jpg";
    else if (email === "datltde180619@fpt.edu.vn") return "/images/admin/avatars/thanhdat.jpg";
    else if (email === "hoanglvmde180724@fpt.edu.vn") return "/images/admin/avatars/minhhoang.jpg";
    else return "/images/admin/avatars/default-admin.jpg";
  };

  if (!admin) return (
    <div className="container mt-4">
      <Alert variant="info">Đang tải thông tin...</Alert>
    </div>
  );

  return (
    <div className="container mt-4">
      <h3>Cài đặt tài khoản quản trị viên</h3>

      {error && (
        <Alert variant="danger" onClose={() => setError('')} dismissible>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" onClose={() => setSuccess('')} dismissible>
          {success}
        </Alert>
      )}

      <div className="mb-3">
        <label className="form-label">Ảnh đại diện</label>
        <div>
          <img
            src={getAvatarPath()}
            alt="Ảnh đại diện"
            width={100}
            height={100}
            className="rounded-circle border"
          />
        </div>
      </div>

      <div className="mb-3">
        <label>Họ và tên</label>
        <input
          type="text"
          name="fullName"
          className="form-control"
          value={admin.fullName || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={admin.email || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Số điện thoại</label>
        <input
          type="text"
          name="phone"
          className="form-control"
          value={admin.phone || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Địa chỉ</label>
        <input
          type="text"
          name="address"
          className="form-control"
          value={admin.address || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Ngày sinh</label>
        <input
          type="date"
          name="birthdate"
          className="form-control"
          value={admin.birthdate || ""}
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-success" onClick={handleSaveInfo}>
        Lưu thay đổi
      </button>

      <div className="mt-4 p-4 border rounded bg-light">
        <h5 className="mb-3">Đổi mật khẩu</h5>
        <div className="mb-3">
          <label>Mật khẩu hiện tại</label>
          <input
            type="password"
            className="form-control"
            value={passwordData.oldPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, oldPassword: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label>Mật khẩu mới</label>
          <input
            type="password"
            className="form-control"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
          />
        </div>
        <button className="btn btn-warning" onClick={handleChangePassword}>
          Đổi mật khẩu
        </button>
      </div>
    </div>
  );
};

export default AdminAccountSettings;
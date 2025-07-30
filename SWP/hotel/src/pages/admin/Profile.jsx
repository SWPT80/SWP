import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAccountSettings = () => {
  const [admin, setAdmin] = useState(null);
  const [updateStatus, setUpdateStatus] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");
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
      .then((res) => setAdmin(res.data))
      .catch((err) => {
        console.error("Error getting admin info:", err);
        setUpdateStatus("Unable to get admin information.");
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
      setUpdateStatus("Profile updated successfully.");
      setTimeout(() => setUpdateStatus(""), 3000);
    } catch (err) {
      console.error(err);
      setUpdateStatus("Error updating profile.");
      setTimeout(() => setUpdateStatus(""), 3000);
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
      setPasswordStatus("Password changed successfully.");
      setPasswordData({ oldPassword: "", newPassword: "" });
      setTimeout(() => setPasswordStatus(""), 3000);
    } catch (err) {
      console.error(err);
      setPasswordStatus("Password change failed.");
      setTimeout(() => setPasswordStatus(""), 3000);
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

  if (!admin) return <div>Loading information...</div>;

  return (
    <div className="container mt-4">
      <h3>Admin Account Settings</h3>

      {/* Avatar for static display from public folder */}
      <div className="mb-3">
        <label className="form-label">Profile Picture</label>
        <div>
          <img
            src={getAvatarPath()}
            alt="avatar"
            width={100}
            height={100}
            className="rounded-circle border"
          />
        </div>
      </div>

      {/* Personal Info */}
      <div className="mb-3">
        <label>Full Name</label>
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
        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          className="form-control"
          value={admin.phone || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Address</label>
        <input
          type="text"
          name="address"
          className="form-control"
          value={admin.address || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Date of Birth</label>
        <input
          type="date"
          name="birthdate"
          className="form-control"
          value={admin.birthdate || ""}
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-success" onClick={handleSaveInfo}>
        Save Changes
      </button>

      {updateStatus && (
        <div
          className={`mt-3 alert ${updateStatus.includes("successfully") ? "alert-success" : "alert-danger"
            }`}
        >
          {updateStatus}
        </div>
      )}

      {/* Change Password Section - In a Frame */}
      <div className="mt-4 p-4 border rounded bg-light">
        <h5 className="mb-3">Change Password</h5>
        <div className="mb-3">
          <label>Current Password</label>
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
          <label>New Password</label>
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
          Change Password
        </button>

        {passwordStatus && (
          <div
            className={`mt-3 alert ${passwordStatus.includes("successfully") ? "alert-success" : "alert-danger"
              }`}
          >
            {passwordStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAccountSettings;

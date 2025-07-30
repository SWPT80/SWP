import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditHost = () => {
    /* --- Lấy id từ URL --- */
    const { id } = useParams();          //  -> phải khớp với :id trong Route
    const navigate = useNavigate();

    /* --- State --- */
    const [host, setHost] = useState({
        fullName: "",
        userName: "",
        email: "",
        phone: "",
        birthdate: "",
        address: "",
        role: "host",
        status: true,
    });

    /* --- Load data lần đầu --- */
    useEffect(() => {
        if (!id) return;                         // phòng trường hợp id chưa có
        const token = localStorage.getItem("token");

        axios
            .get(`http://localhost:8080/api/host/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setHost(res.data))
            .catch((err) => {
                console.error("Lỗi lấy thông tin host:", err);
                alert("Không thể tải thông tin host. Bạn có thể không có quyền.");
            });
    }, [id]);

    /* --- Handler --- */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setHost((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const token = localStorage.getItem("token");
        axios
            .put(`http://localhost:8080/api/host/${id}`, host, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                alert("Cập nhật thành công");
                navigate("/admin/all-hosts");
            })
            .catch((err) => {
                console.error("Lỗi cập nhật:", err);
                alert("Cập nhật thất bại");
            });
    };

    /* --- UI --- */
    return (
        <div className="main-wrapper">
            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="page-header">
                        <h3 className="page-title mt-5">Edit Host</h3>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <form>
                                <div className="row formtype">
                                    {/* Full name */}
                                    <div className="col-md-4">
                                        <label>Full Name</label>
                                        <input
                                            className="form-control"
                                            name="fullName"
                                            value={host.fullName}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Username (read‑only) */}
                                    <div className="col-md-4">
                                        <label>Username</label>
                                        <input
                                            className="form-control"
                                            name="userName"
                                            value={host.userName}
                                            disabled
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="col-md-4">
                                        <label>Email</label>
                                        <input
                                            className="form-control"
                                            name="email"
                                            value={host.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div className="col-md-4">
                                        <label>Phone</label>
                                        <input
                                            className="form-control"
                                            name="phone"
                                            value={host.phone}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Birthdate */}
                                    <div className="col-md-4">
                                        <label>Birthdate</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="birthdate"
                                            value={host.birthdate || ""}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Address */}
                                    <div className="col-md-4">
                                        <label>Address</label>
                                        <input
                                            className="form-control"
                                            name="address"
                                            value={host.address}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Status */}
                                    <div className="col-md-4">
                                        <label>Status</label>
                                        <select
                                            className="form-control"
                                            name="status"
                                            value={host.status ? "true" : "false"}
                                            onChange={(e) =>
                                                setHost((prev) => ({
                                                    ...prev,
                                                    status: e.target.value === "true",
                                                }))
                                            }
                                        >
                                            <option value="true">Active</option>
                                            <option value="false">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                            </form>

                            <button
                                type="button"
                                className="btn btn-primary buttonedit"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditHost;

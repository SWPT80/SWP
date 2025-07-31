import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditHost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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

    useEffect(() => {
        if (!id) {
            setError('Không tìm thấy ID chủ nhà.');
            return;
        }

        const token = localStorage.getItem("token");

        axios
            .get(`http://localhost:8080/api/host/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setHost(res.data);
                setError('');
            })
            .catch((err) => {
                console.error("Lỗi khi tải thông tin chủ nhà:", err);
                setError("Không thể tải thông tin chủ nhà. Bạn có thể không có quyền.");
            });
    }, [id]);

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
                setSuccess("Cập nhật chủ nhà thành công.");
                setError('');
                navigate("/admin/all-hosts");
            })
            .catch((err) => {
                console.error("Lỗi khi cập nhật chủ nhà:", err);
                setError("Cập nhật chủ nhà thất bại.");
            });
    };

    return (
        <div className="main-wrapper">
            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="page-header">
                        <h3 className="page-title mt-5">Chỉnh sửa chủ nhà</h3>
                    </div>

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

                    <div className="row">
                        <div className="col-lg-12">
                            <form>
                                <div className="row formtype">
                                    <div className="col-md-4">
                                        <label>Họ và tên</label>
                                        <input
                                            className="form-control"
                                            name="fullName"
                                            value={host.fullName}
                                            onChange={handleChange}
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label>Tên đăng nhập</label>
                                        <input
                                            className="form-control"
                                            name="userName"
                                            value={host.userName}
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label>Email</label>
                                        <input
                                            className="form-control"
                                            name="email"
                                            value={host.email}
                                            onChange={handleChange}
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label>Số điện thoại</label>
                                        <input
                                            className="form-control"
                                            name="phone"
                                            value={host.phone}
                                            onChange={handleChange}
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label>Ngày sinh</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="birthdate"
                                            value={host.birthdate || ""}
                                            onChange={handleChange}
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label>Địa chỉ</label>
                                        <input
                                            className="form-control"
                                            name="address"
                                            value={host.address}
                                            onChange={handleChange}
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label>Trạng thái</label>
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
                                            <option value="true">Hoạt động</option>
                                            <option value="false">Không hoạt động</option>
                                        </select>
                                    </div>
                                </div>
                            </form>

                            <button
                                type="button"
                                className="btn btn-primary buttonedit"
                                onClick={handleSave}
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditHost;
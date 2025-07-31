import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [user, setUser] = useState({
    fullName: '',
    userName: '',
    email: '',
    phone: '',
    birthdate: '',
    address: '',
    status: true
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`http://localhost:8080/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setError('');
      })
      .catch((err) => {
        console.error('Lỗi khi tải thông tin khách hàng:', err);
        setError('Không thể tải thông tin khách hàng.');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (e) => {
    setUser((prev) => ({ ...prev, status: e.target.value === 'true' }));
  };

  const handleSave = () => {
    const token = localStorage.getItem('token');
    axios
      .put(`http://localhost:8080/api/admin/users/${id}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setSuccess('Cập nhật khách hàng thành công.');
        setError('');
        navigate('/admin/all-customer');
      })
      .catch((err) => {
        console.error('Lỗi khi cập nhật khách hàng:', err);
        setError('Cập nhật khách hàng thất bại.');
      });
  };

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title mt-5">Chỉnh sửa khách hàng</h3>
              </div>
            </div>
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
                    <div className="form-group">
                      <label>Họ và tên</label>
                      <input
                        className="form-control"
                        name="fullName"
                        value={user.fullName}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Tên đăng nhập</label>
                      <input
                        className="form-control"
                        name="userName"
                        value={user.userName}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        className="form-control"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Số điện thoại</label>
                      <input
                        className="form-control"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Ngày sinh</label>
                      <input
                        type="date"
                        className="form-control"
                        name="birthdate"
                        value={user.birthdate || ''}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Địa chỉ</label>
                      <input
                        className="form-control"
                        name="address"
                        value={user.address}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Trạng thái</label>
                      <select
                        className="form-control"
                        name="status"
                        value={user.status ? 'true' : 'false'}
                        onChange={handleStatusChange}
                      >
                        <option value="true">Hoạt động</option>
                        <option value="false">Không hoạt động</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
              <button type="button" className="btn btn-primary buttonedit" onClick={handleSave}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
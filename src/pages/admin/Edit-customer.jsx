import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
      })
      .catch((err) => {
        console.error('Lỗi lấy thông tin user:', err);
        alert('Không thể tải thông tin khách hàng.');
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
        alert('Cập nhật thành công');
        navigate('/admin/all-customer');
      })
      .catch((err) => {
        console.error('Lỗi cập nhật:', err);
        alert('Cập nhật thất bại');
      });
  };

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title mt-5">Edit Customer</h3>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <form>
                <div className="row formtype">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        className="form-control"
                        name="fullName"
                        value={user.fullName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Username</label>
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
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        className="form-control"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Birthdate</label>
                      <input
                        type="date"
                        className="form-control"
                        name="birthdate"
                        value={user.birthdate || ''}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Address</label>
                      <input
                        className="form-control"
                        name="address"
                        value={user.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        className="form-control"
                        name="status"
                        value={user.status ? 'true' : 'false'}
                        onChange={handleStatusChange}
                      >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
              <button type="button" className="btn btn-primary buttonedit" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebook, FaGoogle, FaApple } from 'react-icons/fa';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [countryCode, setCountryCode] = useState('+84');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Xử lý đăng nhập
      console.log('Đăng nhập với:', formData.email, formData.password);
    } else {
      // Xử lý đăng ký
      if (formData.password !== formData.confirmPassword) {
        alert('Mật khẩu không khớp!');
        return;
      }
      console.log('Đăng ký với:', formData);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">
                {isLogin ? 'Đăng nhập' : 'Đăng ký'}
              </h2>
              
              <h5 className="text-center mb-4">Chào mừng bạn đến với Airbnb</h5>
              
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Tên người dùng</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                {!isLogin && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Quốc gia/Khu vực</label>
                      <select 
                        className="form-select"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                      >
                        <option value="+84">Việt Nam (+84)</option>
                        <option value="+1">USA (+1)</option>
                        {/* Thêm các quốc gia khác */}
                      </select>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">Số điện thoại</label>
                      <div className="input-group">
                        <span className="input-group-text">{countryCode}</span>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <small className="text-muted">
                        Chúng tôi sẽ gọi điện hoặc nhắn tin cho bạn để xác nhận số điện thoại. 
                        Có áp dụng phí dữ liệu và phí tin nhắn tiêu chuẩn.
                      </small>
                    </div>
                  </>
                )}
                
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Mật khẩu</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button 
                      className="btn btn-outline-secondary" 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Ẩn' : 'Hiện'}
                    </button>
                  </div>
                </div>
                
                {!isLogin && (
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Nhập lại mật khẩu</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
                
                <div className="d-grid gap-2 mb-3">
                  <button type="submit" className="btn btn-danger">
                    {isLogin ? 'Đăng nhập' : 'Đăng ký'}
                  </button>
                </div>
              </form>
              
              <div className="text-center mb-3">
                <small className="text-muted">
                  {isLogin ? 'Bạn chưa có tài khoản?' : 'Bạn đã có tài khoản?'}
                  <button 
                    className="btn btn-link p-0 ms-1"
                    onClick={toggleAuthMode}
                  >
                    {isLogin ? 'Đăng ký' : 'Đăng nhập'}
                  </button>
                </small>
              </div>
              
              <div className="text-center mb-3">
                <small className="text-muted">hoặc</small>
              </div>
              
              <div className="d-grid gap-2">
                <button className="btn btn-outline-dark mb-2 d-flex align-items-center justify-content-center">
                  <FaGoogle className="me-2" />
                  Tiếp tục với Google
                </button>
                <button className="btn btn-outline-dark mb-2 d-flex align-items-center justify-content-center">
                  <FaApple className="me-2" />
                  Tiếp tục với Apple
                </button>
                <button className="btn btn-outline-dark d-flex align-items-center justify-content-center">
                  <FaFacebook className="me-2" />
                  Tiếp tục với Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
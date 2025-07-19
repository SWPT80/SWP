import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ allowedRoles, children }) => {
  const { user, isLoggedIn, isLoading } = useAuth();

  console.log('PrivateRoute - Checking auth:', { isLoggedIn, user, allowedRoles, isLoading });

  // Nếu đang tải trạng thái xác thực, hiển thị spinner hoặc null
  if (isLoading) {
    return <div>Loading...</div>; // Có thể thay bằng spinner component
  }

  // Nếu không đăng nhập, chuyển hướng về trang đăng nhập
  if (!isLoggedIn || !user) {
    console.log('PrivateRoute - Redirecting to /admin/login (not logged in)');
    return <Navigate to="/admin/login" replace />;
  }

  // Nếu vai trò không nằm trong danh sách allowedRoles, chuyển hướng về trang chính
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log('PrivateRoute - Redirecting to / (role not allowed)', user.role);
    return <Navigate to="/" replace />;
  }

  console.log('PrivateRoute - Rendering children for role:', user.role);
  return children ? children : <Outlet />;
};

export default PrivateRoute;
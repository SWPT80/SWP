// routes/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles, children }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // ví dụ: ADMIN, HOST

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        // Nếu vai trò không hợp lệ → redirect về trang chính
        return <Navigate to="/" replace />;
    }

    // Nếu có children → bọc children
    return children ? children : <Outlet />;
};

export default PrivateRoute;

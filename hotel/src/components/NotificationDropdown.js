import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from '../utils/axiosConfig';
import { useAuth } from '../context/AuthContext';
import '@fortawesome/fontawesome-free/css/all.css';

const NotificationDropdown = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const notificationDropdownRef = useRef(null);
  const stompClient = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
        setNotificationDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem('token');
    const fetchNotifications = async () => {
      try {
        const endpoint = user.role === 'ADMIN'
          ? '/api/notifications'
          : `/api/notifications/user/${user.id}`;
        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(response.data);
        setUnreadNotifications(response.data.filter((n) => !n.status).length);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };

    fetchNotifications();

    const socket = new SockJS('http://localhost:8080/ws');
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      connectHeaders: { Authorization: `Bearer ${token}` },
      onConnect: () => {
        const topic = user.role === 'ADMIN' ? '/topic/notifications' : `/topic/notifications/${user.id}`;
        stompClient.current.subscribe(topic, (message) => {
          const notification = JSON.parse(message.body);
          if (user.role === 'ADMIN' || notification.userId === user.id) {
            setNotifications((prev) => [notification, ...prev]);
            if (!notification.status) {
              setUnreadNotifications((prev) => prev + 1);
            }
          }
        });
      },
      onStompError: (error) => {
        console.error('WebSocket connection error:', error);
      },
    });
    stompClient.current.activate();

    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
  }, [user]);

  const markNotificationAsRead = async (notificationId) => {
    try {
      await axios.put(`http://localhost:8080/api/notifications/${notificationId}/read`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, status: true } : n))
      );
      setUnreadNotifications((prev) => prev - 1);
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  return (
    <Dropdown show={notificationDropdownOpen} onToggle={() => setNotificationDropdownOpen(!notificationDropdownOpen)}>
      <Dropdown.Toggle
        as="div"
        style={{
          color: 'white',
          fontSize: '20px',
          cursor: 'pointer',
          padding: '10px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          marginRight: '10px',
          position: 'relative',
        }}
        ref={notificationDropdownRef}
      >
        <i className="fas fa-bell"></i>
        {unreadNotifications > 0 && (
          <span
            className="badge bg-danger"
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              fontSize: '5px',
              borderRadius: '50%',
              padding: '2px 6px',
            }}
          >
            {unreadNotifications}
          </span>
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu align="end" style={{ minWidth: '300px' }}>
        <Dropdown.Header>Thông báo</Dropdown.Header>
        {notifications.length === 0 ? (
          <Dropdown.Item disabled>Không có thông báo mới</Dropdown.Item>
        ) : (
          notifications.map((notification) => (
            <Dropdown.Item
              key={notification.id}
              onClick={() => markNotificationAsRead(notification.id)}
              style={{ color: notification.status ? '#666' : '#333', fontWeight: notification.status ? 'normal' : 'bold' }}
            >
              {notification.message}
              <br />
              <small>{new Date(notification.createdAt).toLocaleString()}</small>
            </Dropdown.Item>
          ))
        )}
        <Dropdown.Item as={Link} to="/notifications" onClick={() => setNotificationDropdownOpen(false)}>
          Xem tất cả thông báo
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationDropdown;
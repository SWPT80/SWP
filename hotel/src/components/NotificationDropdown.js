import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from '../utils/axiosConfig';
import { useAuth } from '../context/AuthContext';
import '@fortawesome/fontawesome-free/css/all.css';

const NotificationDropdown = ({ theme = 'dark' }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const notificationDropdownRef = useRef(null);
  const stompClient = useRef(null);

  // Style theo theme
  const iconStyle = {
    color: theme === 'light' ? '#333' : 'white',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '50%',
    background: theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)',
    border: theme === 'light' ? '1px solid #ccc' : '1px solid rgba(255, 255, 255, 0.2)',
    marginRight: '10px',
    position: 'relative',
  };

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
        const endpoint =
          user.role === 'ADMIN'
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
        const topic =
          user.role === 'ADMIN'
            ? '/topic/notifications'
            : `/topic/notifications/${user.id}`;
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
      await axios.put(
        `http://localhost:8080/api/notifications/${notificationId}/read`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, status: true } : n))
      );
      setUnreadNotifications((prev) => prev - 1);
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadIds = notifications.filter(n => !n.status).map(n => n.id);
      await Promise.all(unreadIds.map(id => axios.put(
        `http://localhost:8080/api/notifications/${id}/read`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )));
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, status: true }))
      );
      setUnreadNotifications(0);
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  const handleToggle = (isOpen) => {
    setNotificationDropdownOpen(isOpen);
    if (isOpen && unreadNotifications > 0) {
      markAllAsRead();
    }
  };

  return (
    <Dropdown
      show={notificationDropdownOpen}
      onToggle={handleToggle}
    >
      <Dropdown.Toggle as="div" style={iconStyle} ref={notificationDropdownRef}>
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
      <Dropdown.Menu
        align="end"
        style={{
          minWidth: '340px',
          borderRadius: '20px',
          padding: '10px',
          backgroundColor: 'white',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Dropdown.Header style={{ fontWeight: 'bold' }}>Thông báo</Dropdown.Header>

        {/* ✅ Vùng này sẽ cuộn nếu thông báo nhiều */}
        <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '6px' }}>
          {notifications.length === 0 ? (
            <Dropdown.Item disabled>Không có thông báo mới</Dropdown.Item>
          ) : (
            notifications.map((notification) => (
              <Dropdown.Item
                key={notification.id}
                onClick={() => markNotificationAsRead(notification.id)}
                style={{
                  color: notification.status ? '#666' : '#333',
                  fontWeight: notification.status ? 'normal' : 'bold',
                  whiteSpace: 'normal',
                  backgroundColor: notification.status ? 'transparent' : '#f0f3ff',
                  borderRadius: '8px',
                  marginBottom: '4px',
                }}
              >
                {notification.message}
                <br />
                <small style={{ color: '#777' }}>
                  {new Date(notification.createdAt).toLocaleString()}
                </small>
              </Dropdown.Item>
            ))
          )}
        </div>

        <Dropdown.Item
          as={Link}
          to="/notifications"
          onClick={() => setNotificationDropdownOpen(false)}
          style={{ textAlign: 'center', fontWeight: '500', marginTop: '8px' }}
        >
          Xem tất cả thông báo
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationDropdown;
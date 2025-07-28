// context/WebSocketContext.js
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useAuth } from './AuthContext';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const { user } = useAuth();
  const stompClientRef = useRef(null);

  const [connected, setConnected] = useState(false);
  const [client, setClient] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem('token');
    const socket = new SockJS('http://localhost:8080/ws');

    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 5000,
      onConnect: () => {
        setConnected(true);
        setClient(stompClient);
        console.log('✅ WebSocket connected');

        const notificationTopic = `/topic/notifications/${user.id}`;
        const bookingTopic = `/topic/bookings/user/${user.id}`;

        stompClient.subscribe(notificationTopic, (message) => {
          const notification = JSON.parse(message.body);
          setNotifications((prev) => [notification, ...prev]);
        });

        stompClient.subscribe(bookingTopic, (message) => {
          const newBooking = JSON.parse(message.body);
          setBookings((prev) => [newBooking, ...prev]);
        });
      },
      onDisconnect: () => {
        console.log('❌ WebSocket disconnected');
        setConnected(false);
        setClient(null);
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame.headers['message']);
      },
      onWebSocketError: (error) => {
        console.error('WebSocket error:', error);
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, [user]);

  return (
  <WebSocketContext.Provider
    value={{
      stompClient: client,
      connected,
      notifications,
      bookings,
      subscribe: (topic, callback) => {
        if (client && connected) {
          return client.subscribe(topic, callback);
        } else {
          console.warn("WebSocket client not ready");
          return { unsubscribe: () => {} }; // fallback giả nếu chưa kết nối
        }
      },
    }}
  >
    {children}
  </WebSocketContext.Provider>
);
};

export const useWebSocket = () => useContext(WebSocketContext);

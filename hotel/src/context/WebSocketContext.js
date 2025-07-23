import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useAuth } from './AuthContext';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const { user } = useAuth();
  const stompClientRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const subscribe = (topic, callback) => {
    if (stompClientRef.current && connected) {
      stompClientRef.current.subscribe(topic, callback);
    } else {
      console.warn('STOMP client chưa kết nối. Không thể subscribe topic:', topic);
    }
  };

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem('token');
    const socket = new SockJS('http://localhost:8080/ws');

    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: { Authorization: `Bearer ${token}` },
      onConnect: () => {
        setConnected(true);
        console.log('WebSocket connected');

        const topic = user.role === 'ADMIN'
          ? `/topic/notifications`
          : `/topic/notifications/${user.id}`;

        stompClient.subscribe(topic, (message) => {
          const notification = JSON.parse(message.body);
          setNotifications((prev) => [notification, ...prev]);
        });
      },
      onDisconnect: () => {
        setConnected(false);
        console.log('WebSocket disconnected');
      },
      onStompError: (frame) => {
        console.error('WebSocket error:', frame.headers['message']);
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
      value={{ stompClient: stompClientRef.current, connected, notifications, subscribe }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
export const useWebSocket = () => useContext(WebSocketContext);

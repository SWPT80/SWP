import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useAuth } from './AuthContext';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const { user } = useAuth();
  const stompClientRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [subscriptions, setSubscriptions] = useState({});
  const [notifications, setNotifications] = useState([]);

  // Gửi message
  const sendMessage = (destination, messageObj) => {
    if (connected && stompClientRef.current) {
      stompClientRef.current.publish({
        destination,
        body: JSON.stringify(messageObj),
      });
    }
  };

  // Đăng ký nhận dữ liệu
  const subscribe = (topic, callback) => {
    if (subscriptions[topic]) return; // đã đăng ký rồi thì bỏ qua

    if (connected && stompClientRef.current) {
      const subscription = stompClientRef.current.subscribe(topic, (message) => {
        const body = JSON.parse(message.body);
        callback(body);
      });
      setSubscriptions((prev) => ({ ...prev, [topic]: subscription }));
    } else {
      const interval = setInterval(() => {
        if (connected && stompClientRef.current) {
          const subscription = stompClientRef.current.subscribe(topic, (message) => {
            const body = JSON.parse(message.body);
            callback(body);
          });
          setSubscriptions((prev) => ({ ...prev, [topic]: subscription }));
          clearInterval(interval);
        }
      }, 500);
    }
  };

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem('token');
    const stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      connectHeaders: { Authorization: `Bearer ${token}` },
      debug: (str) => console.log('[WebSocket Debug]:', str),
      reconnectDelay: 5000,
      onConnect: () => {
        setConnected(true);
        console.log('✅ WebSocket connected');

        // Mặc định đăng ký topic notification (nếu cần)
        const topic = user.role === 'ADMIN'
          ? `/topic/notifications`
          : `/topic/notifications/${user.id}`;

        const subscription = stompClient.subscribe(topic, (message) => {
          const notification = JSON.parse(message.body);
          setNotifications((prev) => [notification, ...prev]);
        });

        setSubscriptions((prev) => ({ ...prev, [topic]: subscription }));
      },
      onDisconnect: () => {
        setConnected(false);
        console.log('❌ WebSocket disconnected');
        setSubscriptions({});
      },
      onStompError: (frame) => {
        console.error('🔥 WebSocket STOMP error:', frame.headers['message']);
      },
    });

    stompClientRef.current = stompClient;
    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [user]);

  return (
    <WebSocketContext.Provider
      value={{
        stompClient: stompClientRef.current,
        connected,
        notifications,
        subscribe,
        sendMessage,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);

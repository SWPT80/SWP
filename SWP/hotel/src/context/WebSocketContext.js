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
  const [bookings, setBookings] = useState([]);

  // Gửi message
  const sendMessage = (destination, messageObj) => {
    if (connected && stompClientRef.current) {
      stompClientRef.current.publish({
        destination,
        body: JSON.stringify(messageObj),
      });
    }
  };

  // Đăng ký nhận dữ liệu với callback tùy chỉnh
  const subscribe = (topic, callback) => {
    if (subscriptions[topic]) return subscriptions[topic]; // đã đăng ký rồi thì trả về subscription hiện tại

    if (connected && stompClientRef.current) {
      const subscription = stompClientRef.current.subscribe(topic, (message) => {
        const body = JSON.parse(message.body);
        callback(body);
      });
      setSubscriptions((prev) => ({ ...prev, [topic]: subscription }));
      return subscription;
    } else {
      console.warn("WebSocket client not ready");
      // Thử kết nối lại sau một khoảng thời gian
      const interval = setInterval(() => {
        if (connected && stompClientRef.current) {
          const subscription = stompClientRef.current.subscribe(topic, (message) => {
            const body = JSON.parse(message.body);
            callback(body);
          });
          setSubscriptions((prev) => ({ ...prev, [topic]: subscription }));
          clearInterval(interval);
          return subscription;
        }
      }, 500);

      // Fallback subscription object
      return {
        unsubscribe: () => {
          clearInterval(interval);
        }
      };
    }
  };

  // Hủy đăng ký topic
  const unsubscribe = (topic) => {
    if (subscriptions[topic]) {
      subscriptions[topic].unsubscribe();
      setSubscriptions((prev) => {
        const newSubscriptions = { ...prev };
        delete newSubscriptions[topic];
        return newSubscriptions;
      });
    }
  };

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem('token');
    const socket = new SockJS('http://localhost:8080/ws');

    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`
      },
      debug: (str) => console.log('[WebSocket Debug]:', str),
      reconnectDelay: 5000,
      onConnect: () => {
        setConnected(true);
        console.log('✅ WebSocket connected');

        // Đăng ký các topic mặc định
        const notificationTopic = user.role === 'ADMIN'
          ? `/topic/notifications`
          : `/topic/notifications/${user.id}`;

        const bookingTopic = `/topic/bookings/user/${user.id}`;

        // Subscribe notification topic
        const notificationSubscription = stompClient.subscribe(notificationTopic, (message) => {
          const notification = JSON.parse(message.body);
          setNotifications((prev) => [notification, ...prev]);
        });

        // Subscribe booking topic
        const bookingSubscription = stompClient.subscribe(bookingTopic, (message) => {
          const newBooking = JSON.parse(message.body);
          setBookings((prev) => [newBooking, ...prev]);
        });

        // Lưu các subscription mặc định
        setSubscriptions((prev) => ({
          ...prev,
          [notificationTopic]: notificationSubscription,
          [bookingTopic]: bookingSubscription
        }));
      },
      onDisconnect: () => {
        setConnected(false);
        console.log('❌ WebSocket disconnected');
        setSubscriptions({});
      },
      onStompError: (frame) => {
        console.error('🔥 WebSocket STOMP error:', frame.headers['message']);
      },
      onWebSocketError: (error) => {
        console.error('WebSocket error:', error);
      },
    });

    stompClientRef.current = stompClient;
    stompClient.activate();

    return () => {
      // Cleanup tất cả subscriptions
      Object.values(subscriptions).forEach(subscription => {
        if (subscription && subscription.unsubscribe) {
          subscription.unsubscribe();
        }
      });
      stompClient.deactivate();
      setSubscriptions({});
    };
  }, [user]);

  return (
    <WebSocketContext.Provider
      value={{
        stompClient: stompClientRef.current,
        connected,
        notifications,
        bookings,
        subscriptions,
        subscribe,
        unsubscribe,
        sendMessage,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
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
  const isConnectingRef = useRef(false);
  const connectionAttempts = useRef(0);
  const maxRetries = 3;

  // Memoize sendMessage để tránh re-create
  const sendMessage = useCallback((destination, messageObj) => {
    if (connected && stompClientRef.current) {
      try {
        stompClientRef.current.publish({
          destination,
          body: JSON.stringify(messageObj),
        });
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  }, [connected]);

  // Memoize subscribe để tránh re-create
  const subscribe = useCallback((topic, callback) => {
    if (subscriptions[topic]) return subscriptions[topic];

    if (connected && stompClientRef.current) {
      try {
        const subscription = stompClientRef.current.subscribe(topic, (message) => {
          try {
            const body = JSON.parse(message.body);
            callback(body);
          } catch (error) {
            console.error('Failed to parse message:', error);
          }
        });
        setSubscriptions((prev) => ({ ...prev, [topic]: subscription }));
        return subscription;
      } catch (error) {
        console.error('Failed to subscribe:', error);
      }
    }

    return {
      unsubscribe: () => console.log('Dummy unsubscribe for', topic)
    };
  }, [connected, subscriptions]);

  // Memoize unsubscribe
  const unsubscribe = useCallback((topic) => {
    if (subscriptions[topic]) {
      try {
        subscriptions[topic].unsubscribe();
        setSubscriptions((prev) => {
          const newSubscriptions = { ...prev };
          delete newSubscriptions[topic];
          return newSubscriptions;
        });
      } catch (error) {
        console.error('Failed to unsubscribe:', error);
      }
    }
  }, [subscriptions]);

  useEffect(() => {
    // Ngừng nếu không có user hoặc đang connecting
    if (!user || isConnectingRef.current) return;

    // Reset connection attempts khi user thay đổi
    connectionAttempts.current = 0;
    isConnectingRef.current = true;

    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found, skipping WebSocket connection');
      isConnectingRef.current = false;
      return;
    }

    console.log('🔄 Establishing WebSocket connection for user:', user.id);

    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`
      },
      debug: (str) => {
        // Chỉ log debug khi cần thiết
        if (process.env.NODE_ENV === 'development') {
          console.log('[WebSocket Debug]:', str);
        }
      },
      reconnectDelay: 5000,
      maxReconnectDelay: 30000,
      reconnectDelayIncrease: 1.3,
      maxReconnectAttempts: maxRetries,

      onConnect: () => {
        console.log('✅ WebSocket connected successfully');
        setConnected(true);
        isConnectingRef.current = false;
        connectionAttempts.current = 0;

        try {
          // Đăng ký các topic mặc định
          const notificationTopic = user.role === 'ADMIN'
            ? `/topic/notifications`
            : `/topic/notifications/${user.id}`;

          const bookingTopic = `/topic/bookings/user/${user.id}`;

          // Subscribe notification topic
          const notificationSubscription = stompClient.subscribe(notificationTopic, (message) => {
            try {
              const notification = JSON.parse(message.body);
              setNotifications((prev) => {
                // Tránh duplicate notifications
                if (prev.some(n => n.id === notification.id)) return prev;
                return [notification, ...prev.slice(0, 49)]; // Giới hạn 50 notifications
              });
            } catch (error) {
              console.error('Failed to process notification:', error);
            }
          });

          // Subscribe booking topic
          const bookingSubscription = stompClient.subscribe(bookingTopic, (message) => {
            try {
              const newBooking = JSON.parse(message.body);
              setBookings((prev) => {
                // Tránh duplicate bookings
                if (prev.some(b => b.id === newBooking.id)) return prev;
                return [newBooking, ...prev.slice(0, 49)]; // Giới hạn 50 bookings
              });
            } catch (error) {
              console.error('Failed to process booking:', error);
            }
          });

          // Lưu các subscription mặc định
          setSubscriptions({
            [notificationTopic]: notificationSubscription,
            [bookingTopic]: bookingSubscription
          });

        } catch (error) {
          console.error('Failed to setup subscriptions:', error);
        }
      },

      onDisconnect: () => {
        console.log('❌ WebSocket disconnected');
        setConnected(false);
        isConnectingRef.current = false;
        setSubscriptions({});
      },

      onStompError: (frame) => {
        console.error('🔥 WebSocket STOMP error:', frame.headers['message']);
        connectionAttempts.current++;
        isConnectingRef.current = false;

        if (connectionAttempts.current >= maxRetries) {
          console.error('Max connection attempts reached, stopping reconnection');
          stompClient.deactivate();
        }
      },

      onWebSocketError: (error) => {
        console.error('WebSocket error:', error);
        isConnectingRef.current = false;
      },
    });

    stompClientRef.current = stompClient;

    try {
      stompClient.activate();
    } catch (error) {
      console.error('Failed to activate WebSocket:', error);
      isConnectingRef.current = false;
    }

    // Cleanup function
    return () => {
      console.log('🧹 Cleaning up WebSocket connection');

      // Cleanup tất cả subscriptions
      Object.values(subscriptions).forEach(subscription => {
        if (subscription && typeof subscription.unsubscribe === 'function') {
          try {
            subscription.unsubscribe();
          } catch (error) {
            console.error('Error unsubscribing:', error);
          }
        }
      });

      if (stompClient && stompClient.connected) {
        try {
          stompClient.deactivate();
        } catch (error) {
          console.error('Error deactivating WebSocket:', error);
        }
      }

      setSubscriptions({});
      setConnected(false);
      isConnectingRef.current = false;
    };
  }, [user?.id]); // Chỉ depend vào user.id, không phải toàn bộ user object

  // Memoize context value
  const contextValue = {
    stompClient: stompClientRef.current,
    connected,
    notifications,
    bookings,
    subscriptions,
    subscribe,
    unsubscribe,
    sendMessage,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
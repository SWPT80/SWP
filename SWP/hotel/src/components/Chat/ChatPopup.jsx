import React, { useEffect, useState, useRef } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { FaFacebookMessenger } from "react-icons/fa";
import { useWebSocket } from "../../context/WebSocketContext";
import './chat.css'

const BASE_URL = "http://localhost:8080";

const ChatPopup = ({ currentUserId, targetUser, type, onClose, positionOffset, position = "left" }) => {
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [minimized, setMinimized] = useState(false);
  const messageEndRef = useRef();

  const { subscribe } = useWebSocket();

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${hours}:${minutes} ${day}/${month}`;
  };

  // Tạo hoặc lấy conversation
  useEffect(() => {
    const createOrGetConversation = async () => {
      try {
        const customerId = type === "userToHost" ? currentUserId : targetUser.userId;
        const hostId = type === "hostToUser" ? currentUserId : targetUser.userId;

        if (!customerId || !hostId ) {
          console.error("❌ Thiếu hoặc sai kiểu dữ liệu để tạo cuộc trò chuyện", {
            customerId,
            hostId,
          });
          return;
        }

        const params = new URLSearchParams({ customerId, hostId });

        const res = await fetch(`${BASE_URL}/api/chat/conversation?${params.toString()}`, {
          method: "POST",
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("🚨 Conversation error:", text);
          alert("Không thể tạo cuộc trò chuyện: " + text);
          return;
        }

        const data = await res.json();
        setConversationId(data.id);
      } catch (error) {
        console.error("❌ Lỗi khi tạo cuộc trò chuyện:", error);
      }
    };

    createOrGetConversation();
  }, [currentUserId, targetUser, type]);

  // Lắng nghe WebSocket khi đã có conversationId
  useEffect(() => {
    if (!conversationId) return;

    fetch(`${BASE_URL}/api/chat/messages/${conversationId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data.map((m) => ({ ...m, status: "sent" }))));

    const topic = `/topic/chat/${conversationId}`;
    subscribe(topic, (message) => {
      const newMsg = JSON.parse(message.body);
      const receivedMessage = {
        ...newMsg,
        status: "received",
      };
      setMessages((prev) => [...prev, receivedMessage]);
    });
  }, [conversationId, subscribe]);

  // Gửi tin nhắn
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    if (!conversationId) return;

    const tempId = Date.now().toString();
    
    const tempMessage = {
      id: tempId,
      conversationId,
      senderId: currentUserId,
      content: newMessage,
      sentAt: new Date().toISOString(),
      status: "sending",
    };

    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage("");

    fetch(`${BASE_URL}/api/chat/message?conversationId=${conversationId}&senderId=${currentUserId}&content=${encodeURIComponent(newMessage)}`, {
      method: "POST",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((savedMessage) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempId
              ? { ...savedMessage, status: "sent" }
              : msg
          )
        );
      })
      .catch((err) => {
        console.error("Lỗi khi gửi tin nhắn:", err);
        setMessages((prev) => prev.filter(msg => msg.id !== tempId));
        alert("Lỗi khi gửi tin nhắn: " + err.message);
      });
  };

  // Auto scroll khi có tin nhắn mới
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Xử lý đóng popup
  const handleClose = (event) => {
    console.log("🔴 Close button clicked");
    
    try {
      if (event) {
        event.stopPropagation();
        event.preventDefault();
      }
    } catch (error) {
      console.warn("Warning: Could not stop event propagation:", error);
    }
    
    console.log("🔴 Calling onClose function");
    if (typeof onClose === 'function') {
      onClose();
    } else {
      console.error("❌ onClose is not a function:", onClose);
    }
  };

  // Xử lý minimize
  const handleMinimize = (event) => {
    console.log("📉 Minimize clicked");
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    setMinimized(true);
  };

  // Calculate position based on position prop
  const getPosition = () => {
    if (position === "left") {
      return `${20 + positionOffset}px`;
    } else {
      return `${20 + positionOffset}px`;
    }
  };

  // Khi minimized, hiển thị dưới dạng nút tròn - MOVED TO LEFT
  if (minimized) {
    return (
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: getPosition(), // Changed from right to left
          zIndex: 9999,
          width: "60px",
          height: "60px",
        }}
      >
        <button
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "#0084ff",
            border: "none",
            boxShadow: "0 4px 12px rgba(0,132,255,0.3)",
            color: "#fff",
            fontSize: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
            position: "relative",
          }}
          onClick={() => setMinimized(false)}
          title={targetUser.fullname}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 6px 16px rgba(0,132,255,0.4)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 4px 12px rgba(0,132,255,0.3)";
          }}
        >
          {targetUser.avatar ? (
            <img
              src={targetUser.avatar}
              alt={targetUser.fullname}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover"
              }}
            />
          ) : (
            <FaFacebookMessenger />
          )}
        </button>

        {/* Nút X cho trạng thái minimized */}
        <button
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "#ff3b30",
            border: "2px solid white",
            color: "white",
            fontSize: "12px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            zIndex: 10001,
          }}
          onClick={handleClose}
          title="Đóng chat"
        >
          ×
        </button>
      </div>
    );
  }

  // Khi mở rộng, hiển thị dưới dạng popup chat - MOVED TO LEFT
  return (
    <div
      style={{
        position: "fixed",
        bottom: "0px",
        left: getPosition(), // Changed from right to left
        zIndex: 9999,
        width: "350px",
        height: "500px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
        boxShadow: "0 8px 28px rgba(0,0,0,0.12)",
        borderRadius: "12px 12px 0 0",
        overflow: "hidden",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #0084ff, #00a8ff)",
          color: "#fff",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "12px 12px 0 0",
        }}
      >
        <div 
          style={{ 
            display: "flex", 
            alignItems: "center",
            cursor: "pointer",
            flex: 1,
          }}
          onClick={handleMinimize}
        >
          {targetUser.avatar && (
            <img
              src={targetUser.avatar}
              alt={targetUser.fullname}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                marginRight: "8px",
                border: "2px solid rgba(255,255,255,0.3)",
                objectFit: "cover"
              }}
            />
          )}
          <div>
            <div style={{ fontWeight: "600", fontSize: "14px" }}>
              {targetUser.fullname}
            </div>
            <div style={{ fontSize: "12px", opacity: 0.8 }}>
              Đang hoạt động
            </div>
          </div>
        </div>

        {/* Nút X riêng biệt */}
        <button
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "2px solid rgba(255,255,255,0.3)",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            zIndex: 10002,
            flexShrink: 0,
          }}
          onClick={handleClose}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "rgba(255,255,255,0.2)";
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "rgba(255,255,255,0.1)";
            e.target.style.transform = "scale(1)";
          }}
          title="Đóng chat"
        >
          ×
        </button>
      </div>

      {/* Messages Body */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          background: "#f8f9fa",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {messages.map((msg, idx) => {
          const isSender = parseInt(msg.senderId) === parseInt(currentUserId);
          
          if (process.env.NODE_ENV === 'development') {
            console.log(`Message ${idx}: senderId=${msg.senderId}, currentUserId=${currentUserId}, isSender=${isSender}`);
          }

          return (
            <div
              key={`${msg.id}-${idx}`}
              style={{
                display: "flex",
                justifyContent: isSender ? "flex-end" : "flex-start",
                marginBottom: "4px",
              }}
            >
              <div
                style={{
                  maxWidth: "80%",
                  padding: "8px 12px",
                  borderRadius: isSender ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: isSender ? "#0084ff" : "#e4e6ea",
                  color: isSender ? "#fff" : "#050505",
                  fontSize: "14px",
                  lineHeight: "1.3",
                  wordBreak: "break-word",
                  position: "relative",
                }}
              >
                <div>{msg.content}</div>
                <div
                  style={{
                    fontSize: "11px",
                    marginTop: "4px",
                    color: isSender ? "rgba(255,255,255,0.7)" : "#65676b",
                    textAlign: "right",
                  }}
                >
                  {msg.sentAt ? (
                    new Date(msg.sentAt).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  ) : (
                    "Đang gửi..."
                  )}
                  {isSender && msg.status === "sending" && (
                    <span style={{ marginLeft: "4px" }}>⏳</span>
                  )}
                  {isSender && msg.status === "sent" && (
                    <span style={{ marginLeft: "4px" }}>✓</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      {/* Input Footer */}
      <div
        style={{
          padding: "12px 16px",
          background: "#fff",
          borderTop: "1px solid #e4e6ea",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="text"
            placeholder="Nhập tin nhắn..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            style={{
              flex: 1,
              padding: "8px 12px",
              border: "1px solid #ccd0d5",
              borderRadius: "20px",
              fontSize: "14px",
              outline: "none",
              background: "#f1f3f4",
              transition: "all 0.2s ease",
            }}
            onFocus={(e) => {
              e.target.style.background = "#fff";
              e.target.style.borderColor = "#0084ff";
            }}
            onBlur={(e) => {
              e.target.style.background = "#f1f3f4";
              e.target.style.borderColor = "#ccd0d5";
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            style={{
              background: newMessage.trim() ? "#0084ff" : "#ccd0d5",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: newMessage.trim() ? "pointer" : "not-allowed",
              transition: "all 0.2s ease",
              color: "#fff",
              fontSize: "14px",
            }}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
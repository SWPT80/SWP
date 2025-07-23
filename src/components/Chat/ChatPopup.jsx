import React, { useEffect, useState, useRef } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { FaFacebookMessenger } from "react-icons/fa";

const BASE_URL = "http://localhost:8080";

const ChatPopup = ({ currentUserId, targetUser, type, onClose, positionOffset }) => {
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [minimized, setMinimized] = useState(false);
  const messageEndRef = useRef();

  // Tạo hoặc lấy conversation, truyền đúng userId, hostId, homestayId
  useEffect(() => {
    const createOrGetConversation = async () => {
      try {
        const customerId = type === "userToHost" ? currentUserId : targetUser.userId;
        const hostId = type === "hostToUser" ? currentUserId : targetUser.userId;
        const homestayId = targetUser.homestayId;

        if (!customerId || !hostId || !homestayId) {
          console.error("❌ Thiếu thông tin để tạo cuộc trò chuyện", {
            customerId,
            hostId,
            homestayId,
          });
          return;
        }

        const params = new URLSearchParams({
          customerId,
          hostId,
          homestayId,
        });

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


  // Lấy tin nhắn theo conversationId
  useEffect(() => {
    if (conversationId) {
      fetch(`${BASE_URL}/api/chat/messages/${conversationId}`)
        .then((res) => res.json())
        .then(setMessages);
    }
  }, [conversationId]);

  // Gửi tin nhắn
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    if (!conversationId) {
      console.error("❌ Chưa có conversationId, không thể gửi tin nhắn.");
      return;
    }

    fetch(
      `${BASE_URL}/api/chat/message?conversationId=${conversationId}&senderId=${currentUserId}&content=${encodeURIComponent(
        newMessage
      )}`,
      {
        method: "POST",
      }
    )
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText);
        }
        return res.json();
      })
      .then(() => {
        setNewMessage("");
        fetch(`${BASE_URL}/api/chat/messages/${conversationId}`)
          .then((res) => res.json())
          .then(setMessages);
      })
      .catch((err) => {
        console.error("Lỗi khi gửi tin nhắn:", err.message);
        alert("Lỗi khi gửi tin nhắn: " + err.message);
      });
  };

  // Auto scroll
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (minimized) {
    return (
      <div
        style={{
          position: "fixed",
          bottom: 20,
          right: 20 + positionOffset,
          zIndex: 1050,
        }}
      >
        <button
          style={{
            width: 54,
            height: 54,
            borderRadius: "50%",
            background: "#0084ff",
            border: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            color: "#fff",
            fontSize: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => setMinimized(false)}
          title={targetUser.fullname}
        >
          {targetUser.avatar ? (
            <img
              src={targetUser.avatar}
              alt={targetUser.fullname}
              style={{ width: 32, height: 32, borderRadius: "50%" }}
            />
          ) : (
            <FaFacebookMessenger />
          )}
        </button>
      </div>
    );
  }

  return (
    <Card
      style={{
        width: 360,
        height: 500,
        position: "fixed",
        bottom: 0,
        right: 20 + positionOffset,
        zIndex: 1050,
        display: "flex",
        flexDirection: "column",
        borderRadius: 12,
      }}
    >
      <Card.Header
        style={{ cursor: "pointer" }}
        onClick={() => setMinimized(true)}
        className="d-flex justify-content-between align-items-center bg-primary text-white"
      >
        <strong>{targetUser.fullname}</strong>
        <Button
          variant="light"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          ×
        </Button>
      </Card.Header>

      <Card.Body
        style={{
          flex: 1,
          overflowY: "auto",
          background: "#f0f2f5",
          padding: 10,
          maxHeight: 380,
        }}
      >
        {messages.map((msg, idx) => {
          const isSender =
            msg.senderId === currentUserId || msg.sender?.id === currentUserId;
          return (
            <div
              key={idx}
              style={{
                textAlign: isSender ? "right" : "left",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  background: isSender ? "#0084ff" : "#e4e6eb",
                  color: isSender ? "#fff" : "#000",
                  borderRadius: 12,
                  padding: "6px 10px",
                  display: "inline-block",
                  maxWidth: "80%",
                }}
              >
                {msg.content}
              </span>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </Card.Body>

      <Card.Footer className="bg-white border-top">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="d-flex"
        >
          <Form.Control
            type="text"
            placeholder="Nhập tin nhắn..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            style={{ borderRadius: 20 }}
          />
          <Button
            type="submit"
            variant="primary"
            className="ms-2"
            disabled={!newMessage.trim()}
          >
            Gửi
          </Button>
        </Form>
      </Card.Footer>
    </Card>
  );
};

export default ChatPopup;

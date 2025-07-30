import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReceivedMessages = ({ conversationId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!conversationId || !receiverId) {
      setError("Thiếu ID cuộc trò chuyện hoặc ID người nhận.");
      return;
    }

    setLoading(true);
    axios
      .get('http://localhost:8080/api/chat/messages/received', {
        params: {
          conversationId,
          receiverId,
        },
        headers: {
          'Accept': 'application/json; charset=UTF-8',
        },
      })
      .then(response => {
        setMessages(response.data);
        setError(null);
      })
      .catch(error => {
        console.error('Lỗi khi tải tin nhắn đã nhận:', error);
        setError('Không thể tải tin nhắn đã nhận. Vui lòng thử lại.');
      })
      .finally(() => setLoading(false));
  }, [conversationId, receiverId]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Arial, sans-serif",
        background: "#f0f2f5",
        padding: "20px",
        borderRadius: "8px",
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Thông báo lỗi */}
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <div
        style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "#050505",
          marginBottom: "16px",
        }}
      >
        Tin nhắn đã nhận
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {loading ? (
          <div style={{ color: "#888", textAlign: "center", paddingTop: "100px" }}>
            Đang tải tin nhắn...
          </div>
        ) : messages.length > 0 ? (
          messages.map((msg, idx) => {
            const isReceiver = msg.sender?.id !== receiverId;
            return (
              <div
                key={idx}
                style={{
                  marginBottom: "12px",
                  display: "flex",
                  justifyContent: isReceiver ? "flex-start" : "flex-end",
                  alignItems: "flex-end",
                }}
              >
                {isReceiver && (
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: "#e4e6eb",
                      marginRight: 8,
                      backgroundImage: msg.sender?.avatar ? `url(${msg.sender.avatar})` : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                )}

                <div
                  style={{
                    padding: "10px 14px",
                    background: isReceiver ? "#e4e6eb" : "#0084ff",
                    color: isReceiver ? "#050505" : "#fff",
                    borderRadius: "18px",
                    maxWidth: "70%",
                    wordBreak: "break-word",
                    fontSize: "15px",
                    lineHeight: "20px",
                  }}
                >
                  <div style={{ fontWeight: "600", fontSize: "13px", marginBottom: 4 }}>
                    {msg.sender?.fullname || msg.sender?.username || "Người dùng"}
                  </div>
                  <div>{msg.content}</div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: isReceiver ? "#65676b" : "rgba(255,255,255,0.7)",
                      marginTop: "4px",
                      textAlign: "right",
                    }}
                  >
                    {msg.sentAt
                      ? new Date(msg.sentAt).toLocaleString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                      })
                      : ""}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ color: "#65676b", textAlign: "center", padding: "20px" }}>
            Chưa có tin nhắn nào
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ReceivedMessages;
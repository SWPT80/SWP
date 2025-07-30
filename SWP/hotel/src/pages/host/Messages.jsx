import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { MessageCircle, Users, Clock, CheckCircle, AlertCircle, Send } from "lucide-react";
import ChatPopupManager from "../../components/Chat/ChatPopupManager";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Messages() {
  const [userList, setUserList] = useState([]);
  const [openChatIds, setOpenChatIds] = useState([]);
  const [lastMessages, setLastMessages] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [hostId, setHostId] = useState(() => localStorage.getItem("hostId"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    if (!hostId) {
      axios.get("http://localhost:8080/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          const user = res.data;
          if (user.role !== 'HOST') {
            navigate("/", { replace: true });
            return;
          }
          localStorage.setItem("hostId", user.id);
          setHostId(user.id);
        })
        .catch(() => navigate("/", { replace: true }));
    }
  }, [navigate, hostId]);

  useEffect(() => {
    if (!hostId) return;

    setLoading(true);
    fetch(`http://localhost:8080/api/chat/users?hostId=${hostId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          setUserList([]);
          setLoading(false);
          return;
        }

        let formattedUsers = [];

        data.forEach((user) => {
          if (user.bookings && Array.isArray(user.bookings) && user.bookings.length > 0) {
            user.bookings.forEach((booking) => {
              formattedUsers.push({
                id: `${user.id || user.userId}-${booking.homestayId}`,
                userId: user.id || user.userId,
                homestayId: booking.homestayId,
                fullname: user.fullName || user.userName || "User",
                avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || user.userName || "User")}&background=random`,
                lastSeen: new Date(Date.now() - Math.random() * 86400000),
                isOnline: Math.random() > 0.5,
              });
            });
          } else {
            formattedUsers.push({
              id: `${user.id || user.userId}-default`,
              userId: user.id || user.userId,
              homestayId: 'default',
              fullname: user.fullName || user.userName || "User",
              avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || user.userName || "User")}&background=random`,
              lastSeen: new Date(Date.now() - Math.random() * 86400000),
              isOnline: Math.random() > 0.5,
            });
          }
        });

        setUserList(formattedUsers);

        // Fetch last messages for each conversation (userId + homestayId)
        Promise.all(
          formattedUsers.map(async (user) => {
            if (user.homestayId && user.homestayId !== 'default') {
              try {
                const res = await fetch(`http://localhost:8080/api/chat/messages/last?userId=${user.userId}&homestayId=${user.homestayId}`);
                if (res.ok) {
                  const msg = await res.json();
                  return { id: user.id, content: msg.content || "Chưa có tin nhắn", timestamp: msg.timestamp || new Date().toISOString(), isRead: Math.random() > 0.3 };
                }
              } catch {
                return { id: user.id, content: "Khách hàng đã đặt phòng của bạn", timestamp: new Date().toISOString(), isRead: true };
              }
            }
            return { id: user.id, content: "Khách hàng mới, chưa có cuộc trò chuyện", timestamp: new Date().toISOString(), isRead: true };
          })
        ).then(results => {
          const lastMsgs = {};
          results.forEach(r => {
            if (r) lastMsgs[r.id] = { content: r.content, timestamp: r.timestamp, isRead: r.isRead };
          });
          setLastMessages(lastMsgs);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.error("Lỗi tải danh sách user:", err);
        setLoading(false);
      });
  }, [hostId]);

  const handleOpenChat = (userId) => {
    if (!openChatIds.includes(userId)) {
      setOpenChatIds([...openChatIds, userId]);
    }
  };

  const formatLastSeen = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Vừa xong";
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    return `${days} ngày trước`;
  };

  const unreadCount = Object.values(lastMessages).filter(msg => !msg.isRead).length;
  const totalMessages = userList.length;
  const repliedCount = Math.floor(totalMessages * 0.75);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Đang tải tin nhắn...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      minHeight: "100vh",
      paddingBottom: "2rem"
    }}>
      {/* Header */}
      <div style={{
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        padding: "2rem 0",
        marginBottom: "2rem"
      }}>
        <Container>
          <div className="text-center text-white">
            <MessageCircle size={48} className="mb-3" />
            <h1 style={{ fontWeight: "700", fontSize: "2.5rem", marginBottom: "0.5rem" }}>
              Quản lý tin nhắn
            </h1>
            <p style={{ fontSize: "1.2rem", opacity: 0.9 }}>
              Kết nối và trò chuyện với khách hàng của bạn
            </p>
          </div>
        </Container>
      </div>

      <Container>
        {/* Statistics Cards */}
        <Row className="mb-4">
          <Col md={3}>
            <Card style={{
              border: "none",
              borderRadius: "16px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              height: "160px"
            }}>
              <Card.Body className="text-center d-flex flex-column justify-content-center">
                <MessageCircle size={40} className="mb-3 mx-auto" style={{ opacity: 0.9 }} />
                <h3 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "0.5rem" }}>
                  {totalMessages}
                </h3>
                <p style={{ margin: 0, opacity: 0.9 }}>Tổng cuộc trò chuyện</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card style={{
              border: "none",
              borderRadius: "16px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
              color: "white",
              height: "160px"
            }}>
              <Card.Body className="text-center d-flex flex-column justify-content-center">
                <CheckCircle size={40} className="mb-3 mx-auto" style={{ opacity: 0.9 }} />
                <h3 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "0.5rem" }}>
                  {repliedCount}
                </h3>
                <p style={{ margin: 0, opacity: 0.9 }}>Đã phản hồi</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card style={{
              border: "none",
              borderRadius: "16px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
              color: "#8b4513",
              height: "160px"
            }}>
              <Card.Body className="text-center d-flex flex-column justify-content-center">
                <Clock size={40} className="mb-3 mx-auto" style={{ opacity: 0.8 }} />
                <h3 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "0.5rem" }}>
                  {totalMessages - repliedCount}
                </h3>
                <p style={{ margin: 0, opacity: 0.8 }}>Chờ phản hồi</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card style={{
              border: "none",
              borderRadius: "16px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
              color: "#d63384",
              height: "160px"
            }}>
              <Card.Body className="text-center d-flex flex-column justify-content-center">
                <AlertCircle size={40} className="mb-3 mx-auto" style={{ opacity: 0.8 }} />
                <h3 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "0.5rem" }}>
                  {unreadCount}
                </h3>
                <p style={{ margin: 0, opacity: 0.8 }}>Tin nhắn mới</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Messages List */}
        <Card style={{
          border: "none",
          borderRadius: "20px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)"
        }}>
          <Card.Header style={{
            background: "rgba(255,255,255,0.8)",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "20px 20px 0 0",
            padding: "1.5rem"
          }}>
            <div className="d-flex justify-content-between align-items-center">
              <h4 style={{ margin: 0, fontWeight: "600", color: "#2c3e50" }}>
                <Users size={24} className="me-2" />
                Danh sách khách hàng
              </h4>
              <Badge
                bg="primary"
                style={{
                  fontSize: "0.9rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "50px"
                }}
              >
                {userList.length} khách hàng
              </Badge>
            </div>
          </Card.Header>

          <Card.Body style={{ padding: "1.5rem" }}>
            {userList.length === 0 ? (
              <div className="text-center py-5">
                <MessageCircle size={64} className="text-muted mb-3" />
                <h5 className="text-muted mb-2">Chưa có tin nhắn nào</h5>
                <p className="text-muted">Khi có khách hàng nhắn tin, họ sẽ xuất hiện ở đây</p>
              </div>
            ) : (
              <div style={{ maxHeight: "600px", overflowY: "auto" }}>
                {userList.map((user, index) => {
                  const lastMsg = lastMessages[user.id];
                  return (
                    <div
                      key={user.id}
                      style={{
                        background: lastMsg && !lastMsg.isRead ? "rgba(0,132,255,0.05)" : "transparent",
                        borderRadius: "16px",
                        padding: "1rem",
                        marginBottom: "0.5rem",
                        border: "1px solid rgba(0,0,0,0.08)",
                        transition: "all 0.3s ease",
                        cursor: "pointer"
                      }}
                      className="message-item"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                        e.currentTarget.style.background = "rgba(0,132,255,0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.background = lastMsg && !lastMsg.isRead ? "rgba(0,132,255,0.05)" : "transparent";
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center flex-grow-1">
                          <div style={{ position: "relative", marginRight: "1rem" }}>
                            <img
                              src={user.avatar}
                              alt={user.fullname}
                              style={{
                                width: "56px",
                                height: "56px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                border: "3px solid #fff",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                              }}
                            />
                            {user.isOnline && (
                              <div
                                style={{
                                  position: "absolute",
                                  bottom: "2px",
                                  right: "2px",
                                  width: "16px",
                                  height: "16px",
                                  background: "#10b981",
                                  border: "3px solid #fff",
                                  borderRadius: "50%",
                                }}
                              />
                            )}
                          </div>

                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <h6 style={{
                                  margin: "0 0 0.25rem 0",
                                  fontWeight: "600",
                                  fontSize: "1.1rem",
                                  color: "#2c3e50"
                                }}>
                                  {user.fullname}
                                  {lastMsg && !lastMsg.isRead && (
                                    <Badge bg="primary" className="ms-2" style={{ fontSize: "0.7rem" }}>
                                      Mới
                                    </Badge>
                                  )}
                                </h6>
                                <p style={{
                                  margin: "0 0 0.25rem 0",
                                  color: "#6c757d",
                                  fontSize: "0.9rem",
                                  fontWeight: lastMsg && !lastMsg.isRead ? "600" : "400"
                                }}>
                                  {lastMsg ? lastMsg.content : "Chưa có tin nhắn"}
                                </p>
                                <small style={{ color: "#9ca3af" }}>
                                  {user.isOnline ? (
                                    <span className="text-success">
                                      <span style={{ color: "#10b981" }}>●</span> Đang hoạt động
                                    </span>
                                  ) : (
                                    `Hoạt động ${formatLastSeen(user.lastSeen)}`
                                  )}
                                </small>
                              </div>

                              <div className="text-end">
                                <small className="text-muted d-block mb-2">
                                  {lastMsg && new Date(lastMsg.timestamp).toLocaleTimeString("vi-VN", {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                  })}
                                </small>
                                <Button
                                  size="sm"
                                  style={{
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    border: "none",
                                    borderRadius: "20px",
                                    padding: "0.4rem 1rem",
                                    fontWeight: "600"
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenChat(user.id);
                                  }}
                                >
                                  <Send size={14} className="me-1" />
                                  Chat
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>

      {/* Chat Popup Manager */}
      <ChatPopupManager
        currentUserId={hostId}
        listToChatWith={userList}
        type="hostToUser"
        openChatIds={openChatIds}
        lastMessages={lastMessages}
      />

      <style jsx>{`
        .message-item:hover {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

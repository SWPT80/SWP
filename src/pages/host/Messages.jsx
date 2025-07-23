import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { MessageCircle } from "lucide-react";
import ChatPopupManager from "../../components/Chat/ChatPopupManager";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Messages() {
  const [userList, setUserList] = useState([]);
  const [openChatIds, setOpenChatIds] = useState([]);
    const navigate = useNavigate();
  const [hostId, setHostId] = useState(() => localStorage.getItem("hostId"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
      return;
    }
    // Nếu chưa có hostId => gọi /me
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
  fetch(`http://localhost:8080/api/chat/users?hostId=${hostId}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Data từ API user:", data);
      setUserList(
        data.map((user) => ({
          id: user.id,
          // Check tên đúng là gì, ví dụ: user.fullName hoặc user.userName
          fullname: user.fullName || user.userName || "User",
          avatar: user.avatar || "",
        }))
      );
    })
    .catch((err) => console.error("Lỗi tải danh sách user:", err));
}, [hostId]);


  const handleOpenChat = (userId) => {
    if (!openChatIds.includes(userId)) {
      setOpenChatIds([...openChatIds, userId]);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Container className="flex-grow-1 py-4">
        <Row className="mb-4">
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <div className="mb-3">
                  <MessageCircle size={32} className="text-primary" />
                </div>
                <Card.Title>Total Messages</Card.Title>
                <h3>{userList.length}</h3>
                <Card.Text>This week</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <div className="mb-3">
                  <MessageCircle size={32} className="text-success" />
                </div>
                <Card.Title>Replied</Card.Title>
                <h3>18</h3>
                <Card.Text className="text-success">75% response rate</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <div className="mb-3">
                  <MessageCircle size={32} className="text-warning" />
                </div>
                <Card.Title>Pending</Card.Title>
                <h3>{userList.length - 18}</h3>
                <Card.Text className="text-warning">Awaiting response</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card>
          <Card.Header>
            <h5 className="mb-0">Recent Messages</h5>
          </Card.Header>
          <Card.Body>
            {userList.length === 0 ? (
              <p className="text-muted">Không có tin nhắn gần đây.</p>
            ) : (
              userList.map((user) => (
                <div
                  key={user.id}
                  className="border rounded p-3 mb-3 d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={
                        user.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullname)}`
                      }
                      alt={user.fullname}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        marginRight: 12,
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <strong>{user.fullname}</strong>
                      <div className="text-muted small">Đã từng nhắn với bạn</div>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => handleOpenChat(user.id)}>
                    Chat
                  </Button>
                </div>
              ))
            )}
          </Card.Body>
        </Card>
      </Container>

      {/* Quản lý popup chat (như Messenger) */}
      <ChatPopupManager
        currentUserId={hostId}
        listToChatWith={userList}
        type="hostToUser"
        openChatIds={openChatIds}
      />
    </div>
  );
}

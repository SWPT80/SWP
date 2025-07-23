import React, { useEffect, useState } from "react";
import ChatPopupManager from "./ChatPopupManager";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserChatPage() {
  const [hostList, setHostList] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Kiểm tra token và lấy userId từ /me nếu chưa có
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    const storedUserId = localStorage.getItem("userID");

    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      axios
        .get("http://localhost:8080/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const user = res.data;
          if (!["USER", "HOST", "ADMIN"].includes(user.role)) {
            navigate("/", { replace: true });
            return;
          }
          localStorage.setItem("userID", user.id);
          setUserId(user.id);
        })
        .catch((err) => {
          console.error("Lỗi xác thực:", err);
          navigate("/", { replace: true });
        });
    }
  }, [navigate]);

  // Gọi API lấy danh sách host đã trò chuyện khi có userId
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:8080/api/chat/hosts-booked?userId=${userId}`)
      .then((res) => {
        const data = res.data;
        const formatted = data.map((host) => ({
          id: `${host.hostId}-${host.homestayId}`,
          userId: host.hostId,
          homestayId: host.homestayId,
          fullname: host.fullname,
          avatar: host.avatar || "", // thêm avatar nếu có
        }));
        setHostList(formatted);
      })
      .catch((err) => {
        console.error("Lỗi tải danh sách host:", err);
      });
  }, [userId]);

  return (
    <div>
      <h2 className="text-center mt-3">Giao diện người dùng</h2>
      <ChatPopupManager
        currentUserId={userId}
        listToChatWith={hostList}
        type="userToHost"
      />
    </div>
  );
}

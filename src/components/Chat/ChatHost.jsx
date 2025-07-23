import React, { useEffect, useState } from "react";
import ChatPopupManager from "./ChatPopupManager";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function HostChatPage() {
  const [userList, setUserList] = useState([]);
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
        // Giả sử API trả kèm bookings hoặc homestayId theo user
        // Nếu chưa có, cần backend update
        const usersWithHomestay = data.flatMap(user =>
          (user.bookings || []).map(b => ({
            id: `${user.id}-${b.homestayId}`, // unique key kết hợp userId + homestayId
            userId: user.id,
            homestayId: b.homestayId,
            fullname: user.fullname || user.username || "User",
            avatar: user.avatar || "",
          }))
        );
        setUserList(usersWithHomestay);
      })
      .catch((err) => console.error("Lỗi tải danh sách user:", err));
  }, [hostId]);

  return (
    <div>
      <h2 className="text-center mt-3">Giao diện Host</h2>
      <ChatPopupManager
        currentUserId={hostId}
        listToChatWith={userList}
        type="hostToUser"
      />
    </div>
  );
}

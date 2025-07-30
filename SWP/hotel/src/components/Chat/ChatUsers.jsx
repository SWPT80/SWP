import React, { useEffect, useState } from "react";
import ChatPopupManager from "./ChatPopupManager";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function UserChatPage() {
  const [hostList, setHostList] = useState([]);
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

 const handleOpenChat = (host) => {
  window.dispatchEvent(
    new CustomEvent("open-chat", {
      detail: {
        id: `${host.userId}-${host.homestayId}`,
        userId: host.userId,
        homestayId: host.homestayId,
        fullname: host.fullname,
        avatar: host.avatar,
      },
    })
  );
};

  useEffect(() => {
    console.log("UserChat mounted");
  }, []);

  useEffect(() => {
    if (!user) return;

    const userId = user.id;
    const role = user.role?.toUpperCase();

    console.log("Token:", localStorage.getItem("token"));
    console.log("userID:", userId);

    // Nếu không đúng vai trò thì điều hướng về trang chủ
    if (![ "HOST", "ADMIN"].includes(role)) {
      navigate("/", { replace: true });
      return;
    }

    // Gọi API lấy danh sách host đã trò chuyện
    axios
      .get(`http://localhost:8080/api/chat/hosts-booked?userId=${userId}`)
      .then((res) => {
        const data = res.data;
        const formatted = data.map((host) => ({
          id: `${host.hostId}-${host.homestayId}`,
          userId: host.hostId,
          homestayId: host.homestayId,
          fullname: host.fullname,
          avatar: host.avatar || "",
        }));
        setHostList(formatted);
      })
      .catch((err) => {
        console.error("Lỗi tải danh sách host:", err);
      });
  }, [user, navigate]);

  if (!isLoggedIn || !user) {
    return <div className="text-center mt-5">Đang tải...</div>;

  }

  return (
  <div className="container mt-4">
    <div className="list-group">
      {hostList.map((host) => (
        <button
          key={host.id}
          className="list-group-item list-group-item-action d-flex align-items-center"
          onClick={() => handleOpenChat(host)}
        >
          <img
            src={host.avatar || "https://via.placeholder.com/40"}
            alt="avatar"
            className="rounded-circle me-2"
            width={40}
            height={40}
          />
          {host.fullname}
        </button>
      ))}
    </div>

    <ChatPopupManager
      currentUserId={user.id}
      listToChatWith={hostList}
      type="userToHost"
    />
  </div>
);

}

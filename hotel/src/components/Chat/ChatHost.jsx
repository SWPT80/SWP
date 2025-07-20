import React, { useEffect, useState } from "react";
import ChatPopupManager from "./ChatPopupManager";

export default function HostChatPage() {
  const [userList, setUserList] = useState([]);
  const hostId = 21; // Lấy từ login hoặc context

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

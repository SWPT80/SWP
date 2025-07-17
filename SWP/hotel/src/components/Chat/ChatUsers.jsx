import React, { useEffect, useState } from "react";
import ChatPopupManager from "./ChatPopupManager";

export default function UserChatPage() {
  const [hostList, setHostList] = useState([]);
  const userId = 1; // Lấy từ login hoặc context

  useEffect(() => {
    fetch(`http://localhost:8080/api/chat/hosts-booked?userId=${userId}`)
      .then((res) => res.json())
      .then((data) =>
        setHostList(
          data.map((host) => ({
            id: `${host.hostId}-${host.homestayId}`, // unique key kết hợp hostId + homestayId
            userId: host.hostId,
            homestayId: host.homestayId,
            fullname: host.fullname,
            avatar: "", // nếu có avatar thì thêm
          }))
        )
      )
      .catch((err) => console.error("Lỗi tải danh sách host:", err));
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

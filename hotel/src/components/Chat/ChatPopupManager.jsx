import React, { useState, useEffect, useRef } from "react";
import ChatPopup from "./ChatPopup";
import { FaFacebookMessenger } from "react-icons/fa";

const ChatPopupManager = ({
  currentUserId,
  listToChatWith,
  type,
  openChatIds = [], // prop nhận từ component ngoài
}) => {
  const [openPopups, setOpenPopups] = useState([]);
  const [showList, setShowList] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  // Mở popup chat với targetUser
  const openChatWith = (targetUser) => {
    if (!openPopups.find((u) => u.id === targetUser.id)) {
      setOpenPopups([...openPopups, targetUser]);
    }
    setShowList(false);
    setHasNewMessage(false);
  };

  const closePopup = (id) => {
    setOpenPopups(openPopups.filter((u) => u.id !== id));
  };

  // Tự động mở popup chat theo openChatIds
  useEffect(() => {
    const newOpenPopups = listToChatWith.filter(
      (u) => openChatIds.includes(u.id) && !openPopups.find((p) => p.id === u.id)
    );
    if (newOpenPopups.length > 0) {
      setOpenPopups((prev) => [...prev, ...newOpenPopups]);
    }
  }, [openChatIds, listToChatWith]);

  return (
    <>
      {/* Floating Messenger Button */}
      {!showList && openPopups.length === 0 && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 2000,
          }}
        >
          <button
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "#0084ff",
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              color: "#fff",
              fontSize: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => {
              setShowList(true);
              setHasNewMessage(false);
            }}
            aria-label="Mở chat"
          >
            <FaFacebookMessenger />
            {hasNewMessage && (
              <span
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  background: "#ff3b30",
                  color: "#fff",
                  borderRadius: "50%",
                  width: 22,
                  height: 22,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                  border: "2px solid #fff",
                  boxShadow: "0 0 4px rgba(0,0,0,0.15)",
                  pointerEvents: "none",
                }}
              >
                1
              </span>
            )}
          </button>
        </div>
      )}

      {/* Danh sách chọn người để chat */}
      {showList && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            right: 24,
            zIndex: 2000,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
            padding: 16,
            minWidth: 220,
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Chọn người để chat</div>
          {listToChatWith.map((target) => (
            <div
              key={target.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 10,
                cursor: "pointer",
                borderRadius: 8,
                padding: "6px 8px",
                transition: "background 0.2s",
              }}
              onClick={() => openChatWith(target)}
              onMouseOver={(e) => (e.currentTarget.style.background = "#f0f2f5")}
              onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <img
                src={
                  target.avatar ||
                  "https://ui-avatars.com/api/?name=" + encodeURIComponent(target.fullname)
                }
                alt={target.fullname}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  marginRight: 10,
                  objectFit: "cover",
                }}
              />
              <span>{target.fullname}</span>
            </div>
          ))}
          <div style={{ textAlign: "right" }}>
            <button
              style={{
                background: "none",
                border: "none",
                color: "#0084ff",
                fontWeight: 600,
                cursor: "pointer",
                marginTop: 4,
              }}
              onClick={() => setShowList(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Danh sách popup chat */}
      {openPopups.map((target, idx) => (
        <ChatPopup
          key={target.id} // key unique
          currentUserId={currentUserId}
          targetUser={target}
          type={type}
          onClose={() => closePopup(target.id)}
          positionOffset={idx * 320}
        />
      ))}
    </>
  );
};

export default ChatPopupManager;

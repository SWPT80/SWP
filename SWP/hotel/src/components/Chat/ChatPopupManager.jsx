// ChatPopupManager.js - Left-positioned version
import React, { useState, useEffect } from "react";
import ChatPopup from "./ChatPopup";
import { FaFacebookMessenger } from "react-icons/fa";

const BASE_URL = "http://localhost:8080";

const ChatPopupManager = ({
  currentUserId,
  listToChatWith,
  type,
  openChatIds = [],
  onChatsUpdate,
  startPositionOffset = 0
}) => {
  const [activeChats, setActiveChats] = useState([]);
  const [openPopups, setOpenPopups] = useState([]);
  const [showList, setShowList] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [enhancedUserList, setEnhancedUserList] = useState([]);

  // Function để fetch thêm homestayId cho users
  const enhanceUsersWithHomestayId = async (users) => {
    try {
      const enhancedUsers = await Promise.all(
        users.map(async (user) => {
          if (user.homestayId) {
            return user;
          }

          try {
            const response = await fetch(
              `${BASE_URL}/api/chat/user/${user.id}/homestay-info`
            );

            if (response.ok) {
              const data = await response.json();
              return {
                ...user,
                homestayId: data.homestayId || null,
                homestayName: data.homestayName || null,
              };
            } else {
              console.warn(`❌ Không lấy được homestay info cho user ${user.id}`);
              return user;
            }
          } catch (error) {
            console.error(`❌ Error fetching homestay for user ${user.id}:`, error);
            return user;
          }
        })
      );

      return enhancedUsers;
    } catch (error) {
      console.error("❌ Error enhancing users:", error);
      return users;
    }
  };

  // Enhance users khi listToChatWith thay đổi
  useEffect(() => {
    if (listToChatWith && listToChatWith.length > 0) {
      enhanceUsersWithHomestayId(listToChatWith).then(setEnhancedUserList);
    } else {
      setEnhancedUserList([]);
    }
  }, [listToChatWith]);

  // Lắng nghe sự kiện mở chat từ window
  useEffect(() => {
    const handleOpenChat = (event) => {
      const target = event.detail;

      const alreadyOpen = openPopups.some(
        (chat) =>
          chat.userId === target.userId && chat.homestayId === target.homestayId
      );

      if (!alreadyOpen) {
        setOpenPopups((prev) => [...prev, target]);
      }

      setShowList(false);
      setHasNewMessage(false);
    };

    window.addEventListener("open-chat", handleOpenChat);
    return () => {
      window.removeEventListener("open-chat", handleOpenChat);
    };
  }, []);

  // Mở popup khi click danh sách
  const openChatWith = (targetUser) => {
    console.log("🔥 Opening chat with user:", targetUser);
    console.log("📍 HomestayId:", targetUser.homestayId);

    if (!openPopups.find((u) => u.id === targetUser.id)) {
      setOpenPopups([...openPopups, targetUser]);
    }
    setShowList(false);
    setHasNewMessage(false);
  };

  // Đóng popup
  const closePopup = (id) => {
    setOpenPopups(openPopups.filter((u) => u.id !== id));
  };

  // Tự động mở popup khi nhận openChatIds
  useEffect(() => {
    const newOpenPopups = enhancedUserList.filter(
      (u) =>
        openChatIds.includes(u.id) &&
        !openPopups.find((p) => p.id === u.id)
    );

    if (newOpenPopups.length > 0) {
      setOpenPopups((prev) => [...prev, ...newOpenPopups]);
    }
  }, [openChatIds, enhancedUserList, openPopups]);

  const usersToShow = enhancedUserList.length > 0 ? enhancedUserList : listToChatWith;

  return (
    <>
      {/* Nút mở danh sách chat - MOVED TO LEFT */}
      {!showList && openPopups.length === 0 && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            left: "24px", // Changed from right to left
            zIndex: 9998,
          }}
        >
          <button
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #0084ff, #00a8ff)",
              border: "none",
              boxShadow: "0 4px 16px rgba(0,132,255,0.3)",
              color: "#fff",
              fontSize: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
              transition: "all 0.3s ease",
            }}
            onClick={() => {
              setShowList(true);
              setHasNewMessage(false);
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,132,255,0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,132,255,0.3)";
            }}
            aria-label="Mở chat"
          >
            <FaFacebookMessenger />
            {hasNewMessage && (
              <span
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "4px",
                  background: "#ff3b30",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "700",
                  border: "2px solid #fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  pointerEvents: "none",
                }}
              >
                1
              </span>
            )}
          </button>
        </div>
      )}

      {/* Danh sách người để chọn chat - MOVED TO LEFT */}
      {showList && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9997,
              background: "transparent",
            }}
            onClick={() => setShowList(false)}
          />

          <div
            style={{
              position: "fixed",
              bottom: "90px",
              left: "24px", // Changed from right to left
              zIndex: 9998,
              background: "#fff",
              borderRadius: "16px",
              boxShadow:
                "0 8px 28px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)",
              padding: "16px",
              minWidth: "280px",
              maxWidth: "320px",
              maxHeight: "400px",
              overflowY: "auto",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
              border: "1px solid #e4e6ea",
            }}
          >
            <div
              style={{
                fontWeight: "600",
                marginBottom: "12px",
                fontSize: "16px",
                color: "#1c1e21",
                paddingBottom: "8px",
                borderBottom: "1px solid #e4e6ea",
              }}
            >
              Chọn người để chat
            </div>

            {usersToShow.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "20px 0",
                  color: "#65676b",
                  fontSize: "14px",
                }}
              >
                Chưa có ai để chat
              </div>
            ) : (
              usersToShow.map((target) => (
                <div
                  key={target.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 8px",
                    cursor: "pointer",
                    borderRadius: "8px",
                    transition: "background 0.2s ease",
                    marginBottom: "4px",
                  }}
                  onClick={() => openChatWith(target)}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "#f2f3f5")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <div
                    style={{
                      position: "relative",
                      marginRight: "12px",
                    }}
                  >
                    <img
                      src={
                        target.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          target.fullname
                        )}&background=0084ff&color=fff`
                      }
                      alt={target.fullname}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #e4e6ea",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "0px",
                        right: "0px",
                        width: "12px",
                        height: "12px",
                        background: "#42b883",
                        border: "2px solid #fff",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#1c1e21",
                        marginBottom: "2px",
                      }}
                    >
                      {target.fullname}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#65676b",
                      }}
                    >
                      {target.homestayName ? `🏠 ${target.homestayName}` : "Đang hoạt động"}
                    </div>
                  </div>

                  {process.env.NODE_ENV === 'development' && target.homestayId && (
                    <div
                      style={{
                        fontSize: "10px",
                        color: "#42b883",
                        fontWeight: "500",
                        padding: "2px 6px",
                        background: "#e8f5e8",
                        borderRadius: "4px",
                      }}
                    >
                      ID: {target.homestayId}
                    </div>
                  )}
                </div>
              ))
            )}

            <div
              style={{
                textAlign: "center",
                marginTop: "12px",
                paddingTop: "12px",
                borderTop: "1px solid #e4e6ea",
              }}
            >
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#0084ff",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "14px",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  transition: "background 0.2s ease",
                }}
                onClick={() => setShowList(false)}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#f2f3f5";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "none";
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </>
      )}

      {/* Hiển thị các popup chat đang mở - MOVED TO LEFT */}
      {openPopups.map((target, idx) => (
        <ChatPopup
          key={`${target.id}-${target.homestayId || 'no-homestay'}`}
          currentUserId={currentUserId}
          targetUser={target}
          type={type}
          onClose={() => closePopup(target.id)}
          positionOffset={idx * 370}
          position="left" // Add position prop
        />
      ))}
    </>
  );
};

export default ChatPopupManager;
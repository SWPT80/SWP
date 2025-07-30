import React, { useEffect, useState } from "react";
import ChatPopupManager from "./ChatPopupManager";

export default function HostChatPage() {
  const [userList, setUserList] = useState([]);
  const [lastMessages, setLastMessages] = useState({});
  const [debugInfo, setDebugInfo] = useState(null);

  // Mock data cho demo - thay thế bằng real data từ context
  const user = { id: 1, fullname: "Host Demo", username: "host1", role: "HOST" };
  const isLoggedIn = true;

  // Kiểm tra authentication và role
  useEffect(() => {
    if (!isLoggedIn || !user) {
      console.log("User not logged in or not found");
      return;
    }

    if (user.role !== "HOST") {
      console.log("User is not a host");
      return;
    }
  }, [user, isLoggedIn]);

  // API endpoint để lấy homestayId cho host
  const getHomestaysByHost = async (hostId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/homestays/by-host/${hostId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const homestays = await response.json();


      return homestays;
    } catch (error) {
      return [];
    }
  };

  // API endpoint để lấy bookings cho mỗi homestay
  const getBookingsForHomestay = async (homestayId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/bookings/homestay/${homestayId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const bookings = await response.json();
      console.log(`✅ Bookings for homestay ${homestayId}:`, bookings);
      return bookings;
    } catch (error) {
      console.error(`❌ Error fetching bookings for homestay ${homestayId}:`, error);
      return [];
    }
  };

  // API endpoint để lấy thông tin user
  const getUserInfo = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const userInfo = await response.json();
      return userInfo;
    } catch (error) {
      console.error(`❌ Error fetching user info for ${userId}:`, error);
      return null;
    }
  };

  // *** PHƯƠNG PHÁP MỚI: Sử dụng API getUsersWithHomestaysForHost với từng homestayId ***
  const fetchUserListUsingNewAPI = async () => {
    if (!user || user.role !== "HOST") return;

    try {


      // Bước 1: Lấy tất cả homestays của host
      const homestays = await getHomestaysByHost(user.id);
      if (homestays.length === 0) {

        setUserList([]);
        return;
      }

      // Bước 2: Gọi API getUsersWithHomestaysForHost cho từng homestay
      const allUsersWithHomestay = [];

      for (const homestay of homestays) {
        console.log(`🏠 Processing homestay: ${homestay.name} (ID: ${homestay.id})`);


        try {
          // ✅ FIX: Đảm bảo homestayId là số nguyên, không phải "default"
          const homestayId = parseInt(homestay.id);
          if (isNaN(homestayId)) {
            console.error(`❌ Invalid homestayId: ${homestay.id}`);
            continue;
          }

          const response = await fetch(
            `http://localhost:8080/api/chat/users/homestay?hostId=${user.id}&homestayId=${homestayId}`
          );

          if (response.ok) {
            const users = await response.json();
            console.log(`✅ Found ${users.length} users for homestay ${homestayId}:`, users);

            // Xử lý từng user từ API response
            users.forEach(userDto => {
              allUsersWithHomestay.push({
                id: `${userDto.userId}-${homestayId}`, // unique id với homestayId đã validate
                userId: userDto.userId,
                homestayId: homestayId, // ✅ Đảm bảo là số nguyên
                homestayName: homestay.name,
                fullname: userDto.fullname || "User",
                avatar: userDto.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(userDto.fullname || "User")}&background=0084ff&color=fff`,
                conversationId: userDto.conversationId,
                lastMessage: userDto.lastMessage,
                lastMessageTime: userDto.lastMessageTime,
                // Thêm thông tin homestay
                homestayLocation: homestay.location,
                homestayDescription: homestay.description
              });
            });
          } else {
            console.log(`⚠️ No users found for homestay ${homestayId} (Status: ${response.status})`);
            if (response.status === 400) {
              console.error(`❌ Bad Request for homestayId ${homestayId}. Check if it's a valid integer.`);
            }
          }
        } catch (error) {
          console.error(`❌ Error fetching users for homestay ${homestay.id}:`, error);
        }
      }

      // Loại bỏ duplicate (nếu có)
      const uniqueUsers = allUsersWithHomestay.reduce((acc, current) => {
        const existingUser = acc.find(item => item.id === current.id);
        if (!existingUser) {
          acc.push(current);
        } else {
          // Nếu trùng, lấy cái có lastMessageTime mới hơn
          if (current.lastMessageTime && (!existingUser.lastMessageTime ||
            new Date(current.lastMessageTime) > new Date(existingUser.lastMessageTime))) {
            const index = acc.findIndex(item => item.id === current.id);
            acc[index] = current;
          }
        }
        return acc;
      }, []);

      console.log("🎉 Final processed users with homestayId:", uniqueUsers);
      setUserList(uniqueUsers);
      setDebugInfo({
        method: "NEW_API",
        homestaysCount: homestays.length,
        usersCount: uniqueUsers.length,
        users: uniqueUsers
      });

      // Xử lý lastMessages nếu cần (đã có từ API rồi)
      const newLastMessages = {};
      uniqueUsers.forEach(user => {
        if (user.lastMessage) {
          newLastMessages[user.id] = {
            content: user.lastMessage,
            timestamp: user.lastMessageTime || new Date().toISOString()
          };
        }
      });
      setLastMessages(newLastMessages);

    } catch (error) {

      throw error; // Re-throw để fallback method có thể catch
    }
  };

  // Phương pháp cũ - dùng làm fallback
  const fetchUserListWithHomestayId = async () => {
    if (!user || user.role !== "HOST") return;

    try {


      // Bước 1: Lấy tất cả homestays của host
      const homestays = await getHomestaysByHost(user.id);
      if (homestays.length === 0) {
        console.log("No homestays found for this host");
        setUserList([]);
        return;
      }

      // Bước 2: Lấy tất cả bookings cho mỗi homestay
      const allUsersWithHomestay = [];
      for (const homestay of homestays) {
        // ✅ FIX: Validate homestayId trước khi sử dụng
        const homestayId = parseInt(homestay.id);
        if (isNaN(homestayId)) {

          continue;
        }

        const bookings = await getBookingsForHomestay(homestayId);

        // Lọc chỉ lấy booking đã confirmed hoặc completed
        const validBookings = bookings.filter(booking =>
          ['CONFIRMED', 'COMPLETED', 'CHECKED_OUT'].includes(booking.status)
        );

        for (const booking of validBookings) {
          // Bước 3: Lấy thông tin user cho mỗi booking
          const userInfo = await getUserInfo(booking.userId || booking.user_id);
          if (userInfo) {
            allUsersWithHomestay.push({
              id: `${userInfo.id}-${homestayId}`, // unique id với homestayId đã validate
              userId: userInfo.id,
              homestayId: homestayId, // ✅ Đảm bảo là số nguyên
              homestayName: homestay.name,
              fullname: userInfo.fullname || userInfo.username || "User",
              avatar: userInfo.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo.fullname || userInfo.username || "User")}&background=0084ff&color=fff`,
              bookingId: booking.id,
              bookingStatus: booking.status
            });
          }
        }
      }

      // Loại bỏ duplicate users (cùng user book nhiều lần cùng homestay)
      const uniqueUsers = allUsersWithHomestay.reduce((acc, current) => {
        const existingUser = acc.find(item => item.id === current.id);
        if (!existingUser) {
          acc.push(current);
        }
        return acc;
      }, []);

      setUserList(uniqueUsers);
      setDebugInfo({
        method: "FALLBACK",
        homestaysCount: homestays.length,
        usersCount: uniqueUsers.length,
        users: uniqueUsers
      });

      // Lấy tin nhắn cuối cùng
      if (uniqueUsers.length > 0) {
        const lastMessagesPromises = uniqueUsers.map(async (entry) => {
          try {
            // ✅ FIX: Đảm bảo homestayId là số nguyên khi gọi API messages
            console.log(`Fetching last message for userId: ${entry.userId}, homestayId: ${entry.homestayId}`);
            const msgResponse = await fetch(
              `http://localhost:8080/api/chat/messages/last?userId=${entry.userId}&homestayId=${entry.homestayId}`
            );
            if (msgResponse.ok) {
              const msg = await msgResponse.json();
              return {
                id: entry.id,
                content: msg.content,
                timestamp: msg.timestamp,
              };
            } else {

              return {
                id: entry.id,
                content: "Chưa có tin nhắn nào",
                timestamp: new Date().toISOString(),
              };
            }
          } catch (err) {


            return {
              id: entry.id,
              content: "Khách hàng mới, chưa có cuộc trò chuyện",
              timestamp: new Date().toISOString(),
            };
          }
        });

        const results = await Promise.all(lastMessagesPromises);
        const newLastMessages = {};
        results.forEach((result) => {
          if (result) {
            newLastMessages[result.id] = {
              content: result.content,
              timestamp: result.timestamp,
            };
          }
        });

        setLastMessages(newLastMessages);
      }
    } catch (error) {
      setUserList([]);
    }
  };

  // UseEffect để fetch data - thử API mới trước, fallback về phương pháp cũ
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Thử API mới trước (sử dụng ChatService.getUsersWithHomestaysForHost)
        await fetchUserListUsingNewAPI();
      } catch (error) {
        // Nếu không được thì dùng phương pháp booking fallback
        try {
          await fetchUserListWithHomestayId();
        } catch (fallbackError) {
          console.error("❌ Both methods failed:", fallbackError);
          setUserList([]);
          setDebugInfo({
            method: "BOTH_FAILED",
            error: fallbackError.message
          });
        }
      }
    };

    fetchData();
  }, [user]);

  // Nếu chưa đăng nhập hoặc không phải HOST
  if (!isLoggedIn || !user || user.role !== "HOST") {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "18px",
        color: "#65676b"
      }}>
        Đang kiểm tra quyền truy cập...
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
        padding: "40px 0",
        textAlign: "center",
        marginBottom: "40px"
      }}>
        <div style={{ margin: "0 auto", padding: "0 20px" }}>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "10px",
            textShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            Chào mừng Host {user.fullname || user.username}
          </h1>
          <p style={{
            fontSize: "1.2rem",
            opacity: 0.9,
            marginBottom: "0"
          }}>
            Quản lý tin nhắn với khách hàng của bạn
          </p>
        </div>
      </div>

      {/* Debug Info - Enhanced */}
      {debugInfo && (
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto 20px",
          padding: "0 20px"
        }}>
          <div style={{
            background: debugInfo.method === "NEW_API" ? "#d4edda" :
              debugInfo.method === "FALLBACK" ? "#fff3cd" : "#f8d7da",
            border: `1px solid ${debugInfo.method === "NEW_API" ? "#c3e6cb" :
              debugInfo.method === "FALLBACK" ? "#ffeaa7" : "#f5c6cb"}`,
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "20px"
          }}>
            <h4 style={{
              color: debugInfo.method === "NEW_API" ? "#155724" :
                debugInfo.method === "FALLBACK" ? "#856404" : "#721c24",
              marginBottom: "10px"
            }}>
              🔍 Debug Info - Method: {debugInfo.method}
            </h4>
            <div style={{
              fontSize: "14px",
              marginBottom: "10px",
              color: debugInfo.method === "NEW_API" ? "#155724" :
                debugInfo.method === "FALLBACK" ? "#856404" : "#721c24"
            }}>
              <strong>Homestays:</strong> {debugInfo.homestaysCount || 0} |
              <strong> Users:</strong> {debugInfo.usersCount || 0}
              {debugInfo.error && (
                <div style={{ color: "#721c24", marginTop: "5px" }}>
                  <strong>Error:</strong> {debugInfo.error}
                </div>
              )}
            </div>
            <details>
              <summary style={{ cursor: "pointer", fontWeight: "bold", marginBottom: "5px" }}>
                View Raw Data
              </summary>
              <pre style={{
                background: "#f8f9fa",
                padding: "10px",
                borderRadius: "4px",
                overflow: "auto",
                fontSize: "12px",
                color: "#495057",
                maxHeight: "300px"
              }}>
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        {userList.length > 0 ? (
          <div style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "30px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            textAlign: "center"
          }}>
            <h3 style={{
              color: "#1c1e21",
              marginBottom: "20px",
              fontSize: "1.5rem",
              fontWeight: "600"
            }}>
              Bạn có {userList.length} khách hàng có thể chat
            </h3>
            <p style={{
              color: "#65676b",
              fontSize: "16px",
              marginBottom: "30px",
              lineHeight: "1.5"
            }}>
              Click vào nút chat ở góc dưới bên phải để bắt đầu trò chuyện với khách hàng
            </p>

            {/* Danh sách khách hàng */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              marginTop: "30px"
            }}>
              {userList.map((customer) => (
                <div
                  key={customer.id}
                  style={{
                    background: "#f8f9fa",
                    borderRadius: "12px",
                    padding: "20px",
                    border: "1px solid #e4e6ea",
                    transition: "all 0.2s ease",
                    cursor: "pointer"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  onClick={() => {
                    // Log để debug - hiển thị homestayId đã được validate
                    console.log("🔥 Opening chat with customer:", {
                      ...customer,
                      homestayIdType: typeof customer.homestayId,
                      homestayIdValid: Number.isInteger(customer.homestayId)
                    });

                    // Mở chat với khách hàng này
                    window.dispatchEvent(new CustomEvent("open-chat", {
                      detail: customer
                    }));
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                    <img
                      src={customer.avatar}
                      alt={customer.fullname}
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        marginRight: "12px",
                        objectFit: "cover",
                        border: "2px solid #42b883"
                      }}
                    />
                    <div style={{ textAlign: "left" }}>
                      <div style={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: "#1c1e21",
                        marginBottom: "4px"
                      }}>
                        {customer.fullname}
                      </div>
                      <div style={{ fontSize: "14px", color: "#65676b" }}>
                        🏠 {customer.homestayName || `Homestay ID: ${customer.homestayId}`}
                      </div>
                      <div style={{ fontSize: "12px", color: "#999", marginTop: "2px" }}>
                        👤 User ID: {customer.userId} | 🏠 Homestay ID: {customer.homestayId}
                        {/* ✅ Hiển thị validation status */}
                        <span style={{
                          marginLeft: "8px",
                          fontSize: "10px",
                          padding: "1px 4px",
                          background: Number.isInteger(customer.homestayId) ? "#e8f5e8" : "#fee",
                          color: Number.isInteger(customer.homestayId) ? "#2d7d2d" : "#d00",
                          borderRadius: "3px"
                        }}>
                          {Number.isInteger(customer.homestayId) ? "✅ Valid" : "❌ Invalid"}
                        </span>
                        {customer.bookingStatus && (
                          <span style={{
                            marginLeft: "8px",
                            fontSize: "11px",
                            padding: "2px 6px",
                            background: "#e8f5e8",
                            color: "#2d7d2d",
                            borderRadius: "3px"
                          }}>
                            {customer.bookingStatus}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {lastMessages[customer.id] && (
                    <div style={{
                      background: "#fff",
                      borderRadius: "8px",
                      padding: "10px",
                      fontSize: "14px",
                      color: "#65676b",
                      textAlign: "left",
                      border: "1px solid #e4e6ea"
                    }}>
                      <strong>Tin nhắn cuối:</strong> {lastMessages[customer.id].content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "60px 30px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "64px", marginBottom: "20px" }}>💬</div>
            <h3 style={{
              color: "#1c1e21",
              marginBottom: "15px",
              fontSize: "1.5rem"
            }}>
              Chưa có khách hàng nào
            </h3>
            <p style={{
              color: "#65676b",
              fontSize: "16px",
              lineHeight: "1.5"
            }}>
              Khi có khách hàng đặt phòng homestay của bạn, họ sẽ xuất hiện ở đây để bạn có thể chat
            </p>
          </div>
        )}
      </div>

      {/* Chat Manager - Luôn hiển thị */}
      <ChatPopupManager
        currentUserId={user.id}
        listToChatWith={userList} // ✅ userList đã có homestayId đầy đủ và đã validate
        type="hostToUser"
        lastMessages={lastMessages}
      />

      {/* Chat indicator */}
      <div style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#42b883",
        color: "white",
        padding: "12px 20px",
        borderRadius: "25px",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        fontSize: "14px",
        fontWeight: "600",
        pointerEvents: "none"
      }}>
        💬 Chat ({userList.length})
        {userList.length > 0 && userList[0].homestayId && Number.isInteger(userList[0].homestayId) && (
          <div style={{ fontSize: "10px", opacity: 0.8 }}>
            ✅ HomestayId validated
          </div>
        )}
      </div>
    </div>
  );
}
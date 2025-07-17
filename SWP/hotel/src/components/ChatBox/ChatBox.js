import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BsChatDotsFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import RoomCard from "./RoomCard";
import "./ChatBox.css";
import { marked } from "marked";

const Chatbox = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/api/chatbox", {
        model: "deepseek/deepseek-chat-v3-0324",
        messages: [
          {
            role: "system",
            content:
              `Bạn là chatbot AI hỗ trợ tìm phòng homestay/khách sạn. 
   Khi người dùng hỏi về tìm phòng (theo địa điểm, ngày, loại phòng, giá), bạn PHẢI trả về dữ liệu JSON có cấu trúc sau:
   {
     "intent": "searchHotel",
     "location": "Huế",
     "checkIn": "2025-07-15",
     "checkOut": "2025-07-18",
     "minPrice": 500000,
     "minRating": 3
   }

   Không được viết mô tả dài. Tuyệt đối KHÔNG viết đoạn văn mô tả gợi ý. 
   Nếu không chắc, hãy hỏi lại người dùng để rõ yêu cầu. 
   Nếu không phải tìm phòng, mới được trả lời dạng văn bản thông thường.`


          },
          ...messages,
          userMsg,
        ],
      });

      const replyText = res.data.reply;

      const jsonMatch = replyText.match(/```json([\s\S]*?)```/);
      if (jsonMatch) {
        const jsonString = jsonMatch[1].trim();
        try {
          const parsed = JSON.parse(jsonString);

          if (parsed.intent === "searchHotel") {
            const hotelRes = await axios.post("http://localhost:8080/api/rooms/search-advanced", {
              location: parsed.location,
              checkInDate: parsed.checkIn || null,
              checkOutDate: parsed.checkOut || null,
              minPrice: parsed.minPrice,
              minRating: parsed.minRating,
            });
            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                content: { type: "hotelList", data: hotelRes.data },
              },
            ]);
            return;
          }

          if (parsed.intent === "roomPricing") {
            const priceRes = await axios.get("http://localhost:8080/api/seasonal-pricing/room-price", {
              params: {
                homestayId: parsed.homestayId,
                roomType: parsed.roomType,
                checkIn: parsed.checkIn,
                checkOut: parsed.checkOut,
              },
            });
            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                content: { type: "roomPriceList", data: priceRes.data },
              },
            ]);
            return;
          }
        } catch (e) {
          console.error("Lỗi phân tích JSON:", e);
        }
      }

      // Nếu không phải JSON → hiện như cũ
      setMessages((prev) => [...prev, { role: "assistant", content: replyText }]);
    } catch (err) {
      const errorReply = {
        role: "assistant",
        content: "❌ Error: " + (err.response?.data?.reply || "Connection failed"),
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  if (!open) {
    return (
      <button className="chatbox-fab" onClick={() => setOpen(true)} title="Chat với AI">
        <BsChatDotsFill />
      </button>
    );
  }

  return (
    <div className="chatbox-popup">
      <div className="chatbox-header">
        Chat AI hỗ trợ
        <button className="chatbox-close" onClick={() => setOpen(false)} title="Thu nhỏ">
          ×
        </button>
      </div>
      <div className="chatbox-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chatbox-message${msg.role === "user" ? " user" : ""}`}>
            {messages.map((msg, i) => (
              <div key={i} className={`chatbox-message${msg.role === "user" ? " user" : ""}`}>
                {typeof msg.content === "object" && msg.content?.type === "hotelList" ? (
                  msg.content.data.map((room, idx) => <RoomCard key={idx} room={room} />)
                ) : typeof msg.content === "object" && msg.content?.type === "roomPriceList" ? (
                  msg.content.data.map((price, idx) => <RoomCard key={idx} price={price} />)
                ) : (
                  <div className="chatbox-bubble">{msg.content}</div>
                )}
              </div>
            ))}


          </div>
        ))}
        {loading && (
          <div className="chatbox-message">
            <div className="chatbox-bubble">
              <em>Bot is typing...</em>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbox-input-area">
        <input
          className="chatbox-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Nhập câu hỏi..."
          disabled={loading}
        />
        <button
          className="chatbox-send-btn"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          title="Gửi"
        >
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default Chatbox;

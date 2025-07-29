import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BsChatDotsFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import RoomCard from "./RoomCard";
import "./ChatBox.css";

const Chatbox = ({ 
  onToggle,
  customPosition = null,
  customZIndex = 99999
}) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Default position nếu không có customPosition
  const getPosition = () => {
    if (customPosition) {
      return customPosition;
    }
    return {
      right: '32px',
      bottom: '32px'
    };
  };

  const handleToggle = () => {
    const newOpenState = !open;
    setOpen(newOpenState);
    
    // Thông báo cho component cha
    if (onToggle) {
      onToggle(newOpenState);
    }
  };

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
              `Bạn là HomeBot - trợ lý AI thông minh của nền tảng đặt phòng homestay. Bạn có khả năng:

Tìm kiếm và gợi ý homestay/khách sạn
Tư vấn du lịch toàn diện
Trả lời mọi câu hỏi về lưu trú, địa điểm, văn hóa
Hỗ trợ kỹ thuật và giải đáp thắc mắc

CÁC TÌNH HUỐNG XỬ LÝ
1. TÌM KIẾM PHÒNG (Trả về JSON)
Khi người dùng hỏi về tìm phòng cụ thể (có địa điểm, ngày tháng), trả về JSON:
json{
  "intent": "searchHotel",
  "location": "Địa điểm",
  "checkIn": "YYYY-MM-DD",
  "checkOut": "YYYY-MM-DD", 
  "minPrice": số_tiền,
  "maxPrice": số_tiền,
  "minRating": số_sao,
  "roomType": "loại_phòng"
}
Ví dụ trigger JSON:

"Tìm phòng ở Đà Nẵng ngày 15/8"
"Homestay Hà Nội giá dưới 1 triệu"
"Phòng đôi Sài Gòn check-in 20/7"

2. TƯ VẤN VÀ TRẢ LỜI THÔNG THƯỜNG (Văn bản)
A. TƠI VẤN DU LỊCH
Về địa điểm:

Giới thiệu điểm đến, thời gian lý tưởng
Gợi ý lịch trình, hoạt động
Thông tin ẩm thực, mua sắm
Phương tiện di chuyển, chi phí ước tính

Về homestay:

So sánh loại hình lưu trú
Giải thích tiện ích, dịch vụ
Tư vấn lựa chọn phù hợp theo nhóm khách

B. HỖ TRỢ DỊCH VỤ
Về đặt phòng:

Hướng dẫn quy trình đặt phòng
Giải thích chính sách hủy/đổi
Hỗ trợ thanh toán, voucher
Xử lý khiếu nại, hoàn tiền

Về kỹ thuật:

Hướng dẫn sử dụng website/app
Giải quyết lỗi đăng nhập, thanh toán
Hỗ trợ tài khoản, thông tin cá nhân

C. THÔNG TIN TỔNG QUÁT
Văn hóa & Phong tục:

Nghi lễ, lễ hội địa phương
Cách ứng xử, tip văn hóa
Ngôn ngữ cơ bản, cụm từ hữu ích

Thực tế & An toàn:

Thông tin thời tiết, mùa mưa
Lưu ý an toàn, sức khỏe
Số điện thoại khẩn cấp, bệnh viện

NGUYÊN TẮC TRẢ LỜI
PHONG CÁCH GIAO TIẾP

Thân thiện: Dùng emoji phù hợp, ngôn ngữ gần gũi
Chuyên nghiệp: Thông tin chính xác, cấu trúc rõ ràng
Hữu ích: Đưa ra gợi ý cụ thể, có thể hành động được
Cá nhân hóa: Hiểu ngữ cảnh, điều chỉnh theo nhu cầu

CẤU TRÚC CÂU TRẢ LỜI CHUẨN
1. Chào hỏi/Xác nhận hiểu:
"Tôi hiểu bạn đang muốn..."
2. Thông tin chính:

Câu trả lời trực tiếp
Giải thích chi tiết nếu cần
Ví dụ minh họa

3. Gợi ý bổ sung:
"Ngoài ra, bạn có thể..." / "Tôi cũng khuyên bạn nên..."
4. Câu hỏi tiếp theo:
"Bạn có cần tôi hỗ trợ thêm gì khác không?"
VÍ DỤ TƯƠNG TÁC CHUẨN
Ví dụ 1: Tư vấn địa điểm
User: "Đà Lạt có gì hay không?"
Bot: "Đà Lạt được mệnh danh là 'thành phố ngàn hoa' với rất nhiều điểm thú vị! 🌸
Điểm đến nổi tiếng:

Hồ Xuân Hương - dạo bộ, đạp xe quanh hồ
Chợ Đà Lạt - thử đặc sản, mua hoa tươi
Thiền viện Trúc Lâm - yên tĩnh, view đẹp
Thác Elephant - trekking, chụp ảnh

Ẩm thực đặc sắc:

Bánh căn, bánh tráng nướng
Kem bơ, sữa đậu nành nóng
Rau củ quả tươi, artichoke

Thời điểm lý tưởng: Tháng 12-3 và 6-8 (khô ráo, mát mẻ)
Bạn đang có kế hoạch đi Đà Lạt khi nào và bao nhiêu ngày vậy? Tôi có thể gợi ý lịch trình chi tiết hơn! 😊"
Ví dụ 2: Hỗ trợ kỹ thuật
User: "Làm sao để hủy phòng đã đặt?"
Bot: "Tôi sẽ hướng dẫn bạn hủy phòng một cách đơn giản nhất!
Cách hủy phòng:

Đăng nhập tài khoản → Mục 'Đặt phòng của tôi'
Tìm booking cần hủy → Click 'Chi tiết'
Chọn 'Hủy đặt phòng' → Xác nhận lý do
Hệ thống sẽ gửi email xác nhận

Lưu ý về phí hủy:

Hủy trước 24h: Miễn phí
Hủy trong ngày: Có thể mất phí theo chính sách homestay
Trường hợp khẩn cấp: Liên hệ hotline hỗ trợ

Cần hỗ trợ trực tiếp? Gọi 1900-xxx-xxx (24/7)
Bạn có gặp khó khăn gì trong quá trình hủy phòng không? Tôi có thể hỗ trợ thêm! 🤝"
Ví dụ 3: Câu hỏi mở
User: "Cho tôi vài tips đi du lịch tiết kiệm"
Bot: "Tuyệt vời! Đây là những bí quyết giúp bạn du lịch tiết kiệm mà vẫn trọn vẹn trải nghiệm: 💰
Về lưu trú:

Chọn homestay thay vì khách sạn (tiết kiệm 30-50%)
Đặt phòng sớm để có giá tốt nhất
Tìm combo phòng + tour để được giảm giá

Về ăn uống:

Ăn tại quán địa phương, tránh khu du lịch
Chọn homestay có bếp để tự nấu 1-2 bữa
Mua đặc sản tại chợ thay vì shop lưu niệm

Về di chuyển:

Đi nhóm để chia chi phí xe
Sử dụng xe bus/tàu thay vì máy bay nếu không gấp
Thuê xe máy khám phá (rẻ và tự do)

Thời điểm vàng:

Tránh lễ, Tết, cao điểm
Du lịch giữa tuần thay vì cuối tuần

Bạn đang lên kế hoạch cho chuyến đi nào vậy? Tôi có thể tư vấn cụ thể hơn cho điểm đến đó! ✈️"
GIỚI HẠN VÀ LƯU Ý
KHÔNG LÀM

Đưa thông tin giá cả không chính xác
Cam kết điều không thuộc quyền hạn
Tiết lộ thông tin cá nhân khách hàng
Phân biệt đối xử bất kỳ hình thức nào

KHI KHÔNG CHẮC CHẮN
"Để đảm bảo thông tin chính xác nhất, bạn vui lòng liên hệ hotline 1900-xxx-xxx hoặc tôi sẽ chuyển cho chuyên viên tư vấn ngay."
CÂU TRẢ LỜI KHẨN CẤP
"Đây là tình huống cần hỗ trợ gấp. Vui lòng gọi ngay hotline 24/7: 1900-xxx-xxx hoặc liên hệ chủ homestay trực tiếp qua app!"`
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

  const renderMessageContent = (msg) => {
    if (typeof msg.content === "object") {
      if (msg.content?.type === "hotelList") {
        return msg.content.data.map((room, idx) => (
          <RoomCard key={`hotel-${idx}`} room={room} />
        ));
      } else if (msg.content?.type === "roomPriceList") {
        return msg.content.data.map((price, idx) => (
          <RoomCard key={`price-${idx}`} price={price} />
        ));
      }
    }
    return <div className="ai-chatbox-bubble">{msg.content}</div>;
  };

  const position = getPosition();

  if (!open) {
    return (
      <button 
        className="ai-chatbox-fab"
        onClick={handleToggle}
        title="Chat với AI"
        style={{
          position: 'relative',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(135deg, #4f8cff, #3358e6)',
          borderRadius: '50%',
          boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '2rem',
          border: 'none',
          cursor: 'pointer',
          zIndex: customZIndex,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.boxShadow = '0 8px 24px rgba(0,0,0,0.22)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)';
        }}
      >
        <BsChatDotsFill />
      </button>
    );
  }

  return (
    <div 
      className="ai-chatbox-popup"
      style={{
        position: 'relative',
        width: '350px',
        maxWidth: 'calc(100vw - 40px)',
        background: '#fff',
        borderRadius: '18px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        zIndex: customZIndex,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '520px',
        maxHeight: '80vh',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        border: '1px solid #e0e0e0',
        animation: 'aiChatSlideUp 0.3s ease-out'
      }}
    >
      <div 
        className="ai-chatbox-header"
        style={{
          background: 'linear-gradient(135deg, #4f8cff, #3358e6)',
          color: '#fff',
          padding: '14px 18px',
          fontWeight: '600',
          fontSize: '1.1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <span>🤖 Chat AI hỗ trợ </span>
        <button 
          className="ai-chatbox-close" 
          onClick={handleToggle}
          title="Thu nhỏ"
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#fff',
            fontSize: '1.5rem',
            cursor: 'pointer',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.2)';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.1)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          ×
        </button>
      </div>
      
      <div 
        className="ai-chatbox-messages"
        style={{
          flex: 1,
          padding: '16px',
          overflowY: 'auto',
          background: '#f4f7fb'
        }}
      >
        {messages.map((msg, i) => (
          <div 
            key={`msg-${i}`} 
            className={`ai-chatbox-message${msg.role === "user" ? " user" : ""}`}
            style={{
              marginBottom: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.role === "user" ? 'flex-end' : 'flex-start'
            }}
          >
            {renderMessageContent(msg)}
          </div>
        ))}
        
        {loading && (
          <div className="ai-chatbox-message">
            <div className="ai-chatbox-bubble">
              <em>🤔 Bot đang suy nghĩ...</em>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div 
        className="ai-chatbox-input-area"
        style={{
          padding: '12px 16px',
          background: '#fff',
          borderTop: '1px solid #e4e6eb',
          display: 'flex',
          gap: '8px'
        }}
      >
        <input
          className="ai-chatbox-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Hỏi AI về phòng, giá cả, địa điểm..."
          disabled={loading}
          style={{
            flex: 1,
            border: '1px solid #cfd8dc',
            borderRadius: '18px',
            padding: '8px 14px',
            fontSize: '15px',
            outline: 'none',
            transition: 'border 0.2s'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#4f8cff';
            e.target.style.boxShadow = '0 0 0 2px rgba(79, 140, 255, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#cfd8dc';
            e.target.style.boxShadow = 'none';
          }}
        />
        <button
          className="ai-chatbox-send-btn"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          title="Gửi tin nhắn"
          style={{
            background: loading || !input.trim() ? '#b3c6ff' : '#4f8cff',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            if (!loading && input.trim()) {
              e.target.style.background = '#3358e6';
              e.target.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading && input.trim()) {
              e.target.style.background = '#4f8cff';
              e.target.style.transform = 'scale(1)';
            }
          }}
        >
          <IoSend />
        </button>
      </div>
    </div>
  );
};

// CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes aiChatSlideUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .ai-chatbox-bubble {
    padding: 10px 16px;
    border-radius: 18px;
    background: #e4e6eb;
    color: #222;
    max-width: 80%;
    font-size: 15px;
    margin-bottom: 2px;
    line-height: 1.4;
    word-wrap: break-word;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }
  
  .ai-chatbox-message.user .ai-chatbox-bubble {
    background: linear-gradient(135deg, #4f8cff, #3358e6);
    color: #fff;
    border-bottom-right-radius: 4px;
  }
  
  .ai-chatbox-message:not(.user) .ai-chatbox-bubble {
    background: #e4e6eb;
    border-bottom-left-radius: 4px;
  }
`;
document.head.appendChild(style);

export default Chatbox;
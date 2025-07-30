const RoomCard = ({ room, price }) => {
  const formatPrice = (value) =>
    typeof value === "number" ? value.toLocaleString() + "đ" : "Không rõ";

  if (room) {
    return (
      <div className="room-card">
        <h3>{room.homestayName ?? "Không có tên homestay"}</h3>
        <h4>{room.type ?? "Không có loại phòng"}</h4>
        <p>📍 Địa điểm: {room.location ?? "Không rõ"}</p>
        <p>🏠 Địa chỉ: {room.address ?? "Không rõ"}</p>
        <p>🛏️ Sức chứa: {room.capacity ?? "?"} khách</p>
        <p>💰 Giá: {formatPrice(room.price)}/đêm</p>
        <p>⭐ Đánh giá: {room.rating ?? "Chưa có"}</p>
        <p>🟢 Trạng thái: {room.status ? "Hoạt động" : "Không hoạt động"}</p>

        {room.serviceNames?.length > 0 && (
          <p>🛎️ Dịch vụ: {room.serviceNames.join(", ")}</p>
        )}

        {room.experienceDescriptions?.length > 0 && (
          <p>🎉 Trải nghiệm: {room.experienceDescriptions.join(", ")}</p>
        )}

        {room.imageUrls?.length > 0 && (
          <div className="room-images">
            {room.imageUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`room-${idx}`}
                style={{ width: "100px", marginRight: "5px", borderRadius: "6px" }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (price) {
    return (
      <div className="room-card">
        <p>📅 <strong>{price.date ?? "Không rõ ngày"}</strong></p>
        <p>💰 <strong>{formatPrice(price.price)}</strong></p>
      </div>
    );
  }

  return null;
};

export default RoomCard;

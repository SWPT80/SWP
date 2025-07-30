import React from 'react';
import { Link } from 'react-router-dom';
import './CardStyles.css'; // Dùng chung CSS

const RoomCard = ({ room }) => {
  const formatPrice = (value) =>
    typeof value === 'number' ? value.toLocaleString() + 'đ' : 'Không rõ';

  return (
    <Link to={`/offer?homestayId=${room.homestayId}`} className="room-card-link">
      <div className="room-card-box">
        <img
          src={room.imageUrls?.[0] || '/images/default.jpg'}
          alt={room.homestayName}
          className="room-card-img"
        />
        <div className="room-card-body">
          <h3 className="room-card-title">{room.homestayName}</h3>
          <p className="room-card-location">📍 {room.location}</p>
          <p className="room-card-info">🛏 {room.type} - {room.capacity} khách</p>
          <p className="room-card-price">💰 {formatPrice(room.price)} / đêm</p>
          <p className="room-card-rating">⭐ {room.rating || 'Chưa có'}</p>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;

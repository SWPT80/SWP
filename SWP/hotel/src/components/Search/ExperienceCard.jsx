import React from 'react';
import './CardStyles.css'; // dùng chung CSS
import { Link } from 'react-router-dom';

const ExperienceCard = ({ data }) => {
  const {
    address,
    experienceName,
    imageUrls,
    price,
    specialNotes,
    homestayId
  } = data;

  const imageUrl = imageUrls && imageUrls.length > 0
    ? imageUrls[0]
    : '/images/placeholder.jpg';

  return (
    <Link to={`/offer?homestayId=${homestayId}`} className="room-card-link">
      <div className="service-card service-card-equal-height">
        <div className="service-card-image-container">
          <img
            src={imageUrl}
            alt={experienceName || specialNotes || 'Trải nghiệm'}
            className="service-card-img"
          />
        </div>

        <div className="service-card-body">
          <h3 className="service-card-title">
            {experienceName || specialNotes || 'Tên trải nghiệm'}
          </h3>
          <p className="service-card-location">
            📍 {address || 'Không rõ địa điểm'}
          </p>
          <p className="service-card-description">
            📄 {specialNotes || 'Không có mô tả'}
          </p>
          {price !== undefined && (
            <div className="service-card-footer">
              <p className="service-card-price">
                💰 {price.toLocaleString('vi-VN')} VND
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ExperienceCard;
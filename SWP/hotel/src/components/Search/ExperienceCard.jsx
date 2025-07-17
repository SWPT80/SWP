// File: ExperienceCard.jsx
import React from 'react';
import './CardStyles.css'; // dùng chung CSS

const ExperienceCard = ({ data }) => {
  const {
    experienceName,
    location,
    description,
    imageUrls,
    homestayId
  } = data;

  return (
    <div className="service-card">
      <img
        src={`http://localhost:8080/api/experiences/${data.experienceId}/images`}
        alt={data.experienceName}
        className="service-card-img"
      />

      <div className="service-card-body">
        <h3 className="service-card-title">{experienceName}</h3>
        <p className="service-card-location">📍 {location || 'Không rõ địa điểm'}</p>
        <p className="service-card-description">📄 {description || 'Không có mô tả'}</p>
      </div>
    </div>
  );
};

export default ExperienceCard;

import React from 'react';
import { Link } from 'react-router-dom';
import './CardStyles.css'; // dùng chung CSS


const ServiceCard = ({ service }) => {
  const {
    homestayName,
    location,
    serviceNames,
    imageUrls,
    homestayId,
  } = service;

  return (
    <Link to={`/offer?homestayId=${homestayId}`} className="service-card-link">
      <div className="service-card">
        <img
          src={imageUrls?.[0] || '/images/default.jpg'}
          alt={homestayName}
          className="service-card-img"
        />
        <div className="service-card-body">
          <h3 className="service-card-title">{homestayName}</h3>
          <p className="service-card-location">📍 {location}</p>
          {serviceNames?.length > 0 && (
            <p className="service-card-services">
              🛎️ Dịch vụ: {serviceNames.join(', ')}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;

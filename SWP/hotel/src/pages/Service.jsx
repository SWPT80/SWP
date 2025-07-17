import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import '../assets/styles/Explore.css';
import '../assets/styles/RoomCarousel.css';
import hue from '../assets/images/hue.jpg';
import { useNavigate } from 'react-router-dom';

const serviceCategories = [
  { name: 'Chụp ảnh', count: '22 dịch vụ', img: hue },
  { name: 'Đầu bếp', count: '11 dịch vụ', img: hue },
  { name: 'Đồ ăn chuẩn bị sẵn', count: '14 dịch vụ', img: hue },
  { name: 'Massage', count: '14 dịch vụ', img: hue },
  { name: 'Đào tạo', count: '9 dịch vụ', img: hue },
  { name: 'Trang điểm', count: '11 dịch vụ', img: hue },
  { name: 'Làm tóc', count: '9 dịch vụ', img: hue },
  { name: 'Chăm sóc spa', count: '12 dịch vụ', img: hue },
  { name: 'Dịch vụ ăn uống', count: '20 dịch vụ', img: hue },
  { name: 'Làm móng', count: '14 dịch vụ', img: hue },
];

// ExploreServices Component
const ExploreServices = ({ onCategoryClick }) => {
  return (
    <div className="explore-container">
      <h2 className="explore-title">Khám phá dịch vụ</h2>
      <p className="explore-subtitle">Các dịch vụ tiện ích giúp chuyến đi của bạn trọn vẹn hơn</p>

      <div className="explore-slider-wrapper">
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {serviceCategories.map((category, index) => (
            <SwiperSlide key={index}>
              <div
                className="explore-card"
                onClick={() => onCategoryClick(category.name)}
                style={{ cursor: 'pointer' }}
              >
                <img src={category.img} alt={category.name} className="explore-img" />
                <div className="explore-name">{category.name}</div>
                <div className="explore-stays">{category.count}</div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </Swiper>
      </div>
    </div>
  );
};

// ServiceCarousel Component
const ServiceCarousel = ({ title, services }) => {
  const navigate = useNavigate();
  const scrollRef = useRef();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleServiceClick = (homestayId) => {
    navigate(`/offer?homestayId=${homestayId}`);
  };

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">{title}</h2>
      <div className="relative">
        <button className="nav-button nav-left" onClick={() => scroll('left')}>
          ❮
        </button>
        <div ref={scrollRef} className="carousel-scroll">
          {services.map((service, index) => (
            <div
              key={index}
              className="room-card"
              onClick={() => handleServiceClick(service.homestayId)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={service.images?.[0]?.imageUrl || '/images/placeholder.jpg'}
                alt={service.specialNotes || 'Dịch vụ'}
                className="room-image"
              />
              <div className="room-info">
                <h3 className="room-title">{service.specialNotes}</h3>
                <p className="room-location">{service.price.toLocaleString('vi-VN')} VND</p>
              </div>
            </div>
          ))}
        </div>
        <button className="nav-button nav-right" onClick={() => scroll('right')}>
          ❯
        </button>
      </div>
    </div>
  );
};

// ServiceContent Component
const ServiceContent = () => {
  const [services, setServices] = useState([]);
  const [categoryServices, setCategoryServices] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, typesRes] = await Promise.all([
          axios.get('http://localhost:8080/api/services'),
          axios.get('http://localhost:8080/api/service-types'),
        ]);
        console.log('Services:', servicesRes.data);
        console.log('Service Types:', typesRes.data);

        const typeMap = typesRes.data.reduce((map, type) => {
          map[type.id] = type.serviceName;
          return map;
        }, {});

        const groupedServices = servicesRes.data.reduce((groups, service) => {
          const categoryName = typeMap[service.typeId] || 'Khác';
          if (!groups[categoryName]) {
            groups[categoryName] = [];
          }
          groups[categoryName].push(service);
          return groups;
        }, {});

        setServices(servicesRes.data);
        setCategoryServices(groupedServices);
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu:', err);
        setError('Không thể tải dữ liệu dịch vụ. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    console.log('Clicked category:', category);
    setSelectedCategory(category);
  };

  if (loading) return <div className="text-center py-10">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="px-6 py-10">
      <ExploreServices onCategoryClick={handleCategoryClick} />
      <div className="mt-10">
        {selectedCategory && console.log('Selected Category Data:', categoryServices[selectedCategory])}
        {selectedCategory ? (
          categoryServices[selectedCategory]?.length > 0 ? (
            <ServiceCarousel
              title={`Dịch vụ ${selectedCategory}`}
              services={categoryServices[selectedCategory].slice(0, 10)}
            />
          ) : (
            <div className="text-center py-10">
              Không có dịch vụ nào thuộc danh mục {selectedCategory}.
            </div>
          )
        ) : (
          Object.keys(categoryServices).map((category) => (
            <ServiceCarousel
              key={category}
              title={`Dịch vụ ${category}`}
              services={categoryServices[category].slice(0, 10)}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Service Component
const Service = () => {
  return <ServiceContent />;
};

export default Service;
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

// Định nghĩa mảng địa điểm ban đầu (số lượng sẽ được cập nhật)
const initialExperienceDestinations = [
  { name: 'Huế', activities: '0 trải nghiệm', img: hue },
  { name: 'Hội An', activities: '0 trải nghiệm', img: hue },
  { name: 'Sapa', activities: '0 trải nghiệm', img: hue },
  { name: 'Phú Quốc', activities: '0 trải nghiệm', img: hue },
  { name: 'Hà Giang', activities: '0 trải nghiệm', img: hue },
  { name: 'Đà Lạt', activities: '0 trải nghiệm', img: hue },
];

// Hàm ánh xạ homestayId với địa điểm
const getLocationByHomestayId = (homestayId) => {
  const locationMap = {
    1: 'Đà Lạt', 2: 'Đà Lạt', 3: 'Đà Lạt', 4: 'Đà Lạt', 5: 'Đà Lạt', 6: 'Đà Lạt', 7: 'Đà Lạt',
    8: 'Đà Nẵng', 9: 'Đà Nẵng', 10: 'Đà Nẵng', 11: 'Đà Nẵng', 12: 'Đà Nẵng', 13: 'Đà Nẵng',
    14: 'Hội An', 15: 'Hội An', 16: 'Hội An', 17: 'Hội An',
    18: 'Hà Nội', 19: 'Hà Nội', 20: 'Hà Nội',
    21: 'Phú Quốc', 22: 'Phú Quốc',
    23: 'Hà Giang', 29: 'Hà Giang',
    38: 'Sapa',
    24: 'Phong Nha', 25: 'Phong Nha',
    26: 'Côn Đảo', 27: 'Vũng Tàu',
    28: 'Mũi Né',
    30: 'Ba Bể',
    31: 'Lạng Sơn',
    32: 'Quy Nhơn', 33: 'Quy Nhơn',
    34: 'Cà Mau',
    35: 'Hòa Bình',
    36: 'Bến Tre', 37: 'Vĩnh Long',
    39: 'Tây Ninh',
    40: 'Nam Định',
  };
  return locationMap[homestayId] || 'Khác';
};

// ExploreExperiences Component
const ExploreExperiences = ({ onDestinationClick, destinations }) => {
  return (
    <div className="explore-container">
      <h2 className="explore-title">Khám phá trải nghiệm</h2>
      <p className="explore-subtitle">Những hoạt động độc đáo đang chờ bạn khám phá</p>

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
          {destinations.map((place, index) => (
            <SwiperSlide key={index}>
              <div
                className="explore-card"
                onClick={() => onDestinationClick(place.name)}
                style={{ cursor: 'pointer' }}
              >
                <img src={place.img} alt={place.name} className="explore-img" />
                <div className="explore-name">{place.name}</div>
                <div className="explore-stays">{place.activities}</div>
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

// ExperienceCarousel Component
const ExperienceCarousel = ({ title, experiences }) => {
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

  const handleExperienceClick = (homestayId) => {
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
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="room-card"
              onClick={() => handleExperienceClick(experience.homestayId)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={experience.images?.[0]?.imageUrl || '/images/placeholder.jpg'}
                alt={experience.specialNotes || 'Trải nghiệm'}
                className="room-image"
              />
              <div className="room-info">
                <h3 className="room-title">{experience.specialNotes}</h3>
                <p className="room-location">{experience.price.toLocaleString('vi-VN')} VND</p>
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

// ExperienceContent Component
const ExperienceContent = () => {
  const [experiences, setExperiences] = useState([]);
  const [locationExperiences, setLocationExperiences] = useState({});
  const [destinations, setDestinations] = useState(initialExperienceDestinations);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/experiences');
        console.log('All Experiences:', response.data);

        setExperiences(response.data);

        const locationData = {};
        const experienceCounts = {};

        // Tính số lượng trải nghiệm cho từng địa điểm
        response.data.forEach((exp) => {
          const expLocation = getLocationByHomestayId(exp.homestayId);
          if (!experienceCounts[expLocation]) {
            experienceCounts[expLocation] = 0;
          }
          experienceCounts[expLocation]++;
        });

        // Cập nhật destinations với số lượng thực tế
        const updatedDestinations = initialExperienceDestinations.map((dest) => ({
          ...dest,
          activities: `${experienceCounts[dest.name] || 0} trải nghiệm`,
        }));
        setDestinations(updatedDestinations);

        // Lọc trải nghiệm theo địa điểm
        for (const location of initialExperienceDestinations.map((d) => d.name)) {
          const filteredExperiences = response.data.filter((exp) => {
            const expLocation = getLocationByHomestayId(exp.homestayId);
            return expLocation === location;
          });
          console.log(`Experiences for ${location}:`, filteredExperiences);
          locationData[location] = filteredExperiences;
        }

        setLocationExperiences(locationData);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        setError('Không thể tải dữ liệu trải nghiệm. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDestinationClick = (location) => {
    console.log('Selected Location:', location);
    setSelectedLocation(location);
  };

  if (loading) return <div className="text-center py-10">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="px-6 py-10">
      <ExploreExperiences onDestinationClick={handleDestinationClick} destinations={destinations} />
      <div className="mt-10">
        {selectedLocation ? (
          locationExperiences[selectedLocation]?.length > 0 ? (
            <ExperienceCarousel
              title={`Trải nghiệm tại ${selectedLocation}`}
              experiences={locationExperiences[selectedLocation].slice(0, 10)}
            />
          ) : (
            <div className="text-center py-10">
              Không có trải nghiệm nào tại {selectedLocation}.
            </div>
          )
        ) : (
          destinations.map((location) => (
            locationExperiences[location.name]?.length > 0 ? (
              <ExperienceCarousel
                key={location.name}
                title={`Trải nghiệm tại ${location.name}`}
                experiences={locationExperiences[location.name].slice(0, 10)}
              />
            ) : (
              <div key={location.name} className="text-center py-10">
                Không có trải nghiệm nào tại {location.name}.
              </div>
            )
          ))
        )}
      </div>
    </div>
  );
};

// Experience Component
const Experience = () => {
  return <ExperienceContent />;
};

export default Experience;
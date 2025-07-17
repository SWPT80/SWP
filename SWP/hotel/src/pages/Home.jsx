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
import { Link } from 'react-router-dom';

// Định nghĩa mảng địa điểm ban đầu (số lượng sẽ được cập nhật)
const initialDestinations = [
  { name: 'TP. Hồ Chí Minh', stays: '0 chỗ nghỉ', img: hue },
  { name: 'Đà Nẵng', stays: '0 chỗ nghỉ', img: hue },
  { name: 'Vũng Tàu', stays: '0 chỗ nghỉ', img: hue },
  { name: 'Hà Nội', stays: '0 chỗ nghỉ', img: hue },
  { name: 'Đà Lạt', stays: '0 chỗ nghỉ', img: hue },
  { name: 'Nha Trang', stays: '0 chỗ nghỉ', img: hue },
];

// ExploreVietnam Component
const ExploreVietnam = ({ destinations, onDestinationClick }) => {
  return (
    <div className="explore-container">
      <h2 className="explore-title">Khám phá Việt Nam</h2>
      <p className="explore-subtitle">Các điểm đến phổ biến này có nhiều điều chờ đón bạn</p>

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
                <div className="explore-stays">{place.stays}</div>
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

// RoomCarousel Component
const RoomCarousel = ({ title, homestays }) => {
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

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">{title}</h2>
      <div className="relative">
        <button className="nav-button nav-left" onClick={() => scroll('left')}>
          ❮
        </button>
        <div ref={scrollRef} className="carousel-scroll">
          {homestays.map((homestay, index) => (
            <Link
              key={homestay.id || index}
              to={`/offer?homestayId=${homestay.id}`}
              className="room-card"
              style={{ textDecoration: 'none' }}
            >
              <img
                src={homestay.images?.[0]?.imageUrl || '/images/default.jpg'}
                alt={homestay.homestayName || 'Homestay'}
                className="room-image"
              />
              <div className="room-info">
                <h3 className="room-title">{homestay.homestayName}</h3>
                <p className="room-location">{homestay.location}</p>
              </div>
            </Link>
          ))}
        </div>
        <button className="nav-button nav-right" onClick={() => scroll('right')}>
          ❯
        </button>
      </div>
    </div>
  );
};

// HomeContent Component
const HomeContent = () => {
  const [homestays, setHomestays] = useState([]);
  const [locationHomestays, setLocationHomestays] = useState({});
  const [destinations, setDestinations] = useState(initialDestinations);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomestays = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/homestays');
        console.log('All Homestays:', response.data);

        setHomestays(response.data);

        const locationData = {};
        const stayCounts = {};

        // Tính số lượng homestay cho từng địa điểm
        response.data.forEach((homestay) => {
          const location = homestay.location || 'Khác';
          if (!stayCounts[location]) {
            stayCounts[location] = 0;
          }
          stayCounts[location]++;
        });

        // Cập nhật destinations với số lượng thực tế
        const updatedDestinations = initialDestinations.map((dest) => ({
          ...dest,
          stays: `${stayCounts[dest.name] || 0} chỗ nghỉ`,
        }));
        setDestinations(updatedDestinations);

        // Lấy homestay theo từng location
        const locations = initialDestinations.map((d) => d.name);
        for (const location of locations) {
          try {
            const res = await axios.get(`http://localhost:8080/api/homestays/location?location=${location}`);
            console.log(`Homestays for ${location}:`, res.data);
            locationData[location] = res.data;
          } catch (error) {
            console.error(`Failed to fetch homestays for ${location}:`, error);
            locationData[location] = [];
          }
        }

        setLocationHomestays(locationData);
      } catch (error) {
        console.error('Failed to fetch homestays:', error);
        setError('Không thể tải dữ liệu homestay. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchHomestays();
  }, []);

  const handleDestinationClick = (location) => {
    console.log('Selected Location:', location);
    setSelectedLocation(location);
  };

  if (loading) return <div className="text-center py-10">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="px-6 py-10">
      <ExploreVietnam destinations={destinations} onDestinationClick={handleDestinationClick} />
      <div className="mt-10">
        {selectedLocation ? (
          locationHomestays[selectedLocation]?.length > 0 ? (
            <RoomCarousel
              title={`Chỗ ở tại ${selectedLocation}`}
              homestays={locationHomestays[selectedLocation].slice(0, 10)}
            />
          ) : (
            <div className="text-center py-10">
              Không có chỗ nghỉ nào tại {selectedLocation}.
            </div>
          )
        ) : (
          Object.keys(locationHomestays).map((location) => (
            locationHomestays[location]?.length > 0 ? (
              <RoomCarousel
                key={location}
                title={`Chỗ ở tại ${location}`}
                homestays={locationHomestays[location].slice(0, 10)}
              />
            ) : (
              <div key={location} className="text-center py-10">
                Không có chỗ nghỉ nào tại {location}.
              </div>
            )
          ))
        )}
      </div>
    </div>
  );
};

// Home Component
const Home = () => {
  return <HomeContent />;
};

export default Home;
import React, { useState, useEffect, useRef } from 'react';
import homeSliderImg from '../assets/images/home_slider.jpg';
import '../assets/styles/responsive.css';
import '../assets/styles/HomePage.css';
import '../assets/styles/Search.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Chatbox from './ChatBox/ChatBox';

const slides = [
  {
    title1: 'Homestays',
    title2: 'in Viet Nam'
  },
];

const tabs = [
  { id: 'nhà', icon: 'fas fa-home', label: 'Nhà' },
  { id: 'trải nghiệm', icon: 'fas fa-hiking', label: 'Trải nghiệm' },
  { id: 'dịch vụ', icon: 'fas fa-concierge-bell', label: 'Dịch vụ' },
];

const services = [
  { value: 'Chụp ảnh', icon: 'fas fa-camera' },
  { value: 'Đầu bếp', icon: 'fas fa-utensils' },
  { value: 'Đồ ăn chuẩn bị sẵn', icon: 'fas fa-concierge-bell' },
  { value: 'Massage', icon: 'fas fa-spa' },
  { value: 'Đào tạo', icon: 'fas fa-chalkboard-teacher' },
  { value: 'Trang điểm', icon: 'fas fa-magic' },
  { value: 'Làm tóc', icon: 'fas fa-cut' },
  { value: 'Chăm sóc spa', icon: 'fas fa-hot-tub' },
  { value: 'Dịch vụ ăn uống', icon: 'fas fa-hamburger' },
  { value: 'Làm móng', icon: 'fas fa-hand-paper' },
];

const HomeSlider = () => {
  return (
    <div className="home">
      <div className="home_slider_container">
        <div className="home_slider owl-carousel owl-theme">
          {slides.map((slide, index) => (
            <div className="owl-item home_slider_item" key={index}>
              <div
                className="home_slider_background"
                style={{ backgroundImage: `url(${homeSliderImg})` }}
              ></div>
              <div className="home_slider_content text-center">
                <div
                  className="home_slider_content_inner"
                  data-animation-in="flipInX"
                  data-animation-out="animate-out fadeOut"
                >
                  <h1>{slide.title1}</h1>
                  <h1>{slide.title2}</h1>
                  <div className="button home_slider_button">
                    <div className="button_bcg"></div>
                    <a href="#">
                      explore now<span></span><span></span><span></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="home_slider_dots">
          <ul id="home_slider_custom_dots" className="home_slider_custom_dots">
            <li className="home_slider_custom_dot active">
              <div></div>01.
            </li>
            <li className="home_slider_custom_dot">
              <div></div>02.
            </li>
            <li className="home_slider_custom_dot">
              <div></div>03.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Search = () => {
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const serviceInputRef = useRef(null);
  const serviceOptionsRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(() => {
    if (location.pathname.includes('/experience')) return 'trải nghiệm';
    if (location.pathname.includes('/services')) return 'dịch vụ';
    return 'nhà';
  });

  // Ref riêng cho từng tab
  const hotelLocationRef = useRef(null);
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);

  const experienceLocationRef = useRef(null);
  const experienceNameRef = useRef(null);

  const serviceLocationRef = useRef(null);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    switch (tabId) {
      case 'trải nghiệm':
        navigate('/experience');
        break;
      case 'dịch vụ':
        navigate('/services');
        break;
      default:
        navigate('/');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        serviceInputRef.current &&
        serviceOptionsRef.current &&
        !serviceInputRef.current.contains(event.target) &&
        !serviceOptionsRef.current.contains(event.target)
      ) {
        setServiceDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleServiceInputClick = () => {
    setServiceDropdownOpen(true);
  };

  const handleServiceOptionClick = (value) => {
    if (serviceInputRef.current) {
      serviceInputRef.current.value = value;
    }
    setServiceDropdownOpen(false);
  };

  const handleSearch = () => {
    if (activeTab === 'nhà') {
      const params = new URLSearchParams({
        type: 'nhà',
        location: hotelLocationRef.current?.value || '',
        checkIn: checkInRef.current?.value || '',
        checkOut: checkOutRef.current?.value || '',
      });
      navigate(`/search-results?${params.toString()}`);
    }

    if (activeTab === 'trải nghiệm') {
      const params = new URLSearchParams({
        type: 'trải nghiệm',
        location: experienceLocationRef.current?.value || '',
        experienceName: experienceNameRef.current?.value || '',
        description: '',
      });
      navigate(`/search-results?${params.toString()}`);
    }

    if (activeTab === 'dịch vụ') {
      const params = new URLSearchParams({
        type: 'dịch vụ',
        serviceName: serviceInputRef.current?.value || '',
      });
      navigate(`/search-results?${params.toString()}`);
    }
  };

  return (
    <div className="search">
      <div className="search_container">
        <div className="search_tabs_container">
          <ul className="search_tabs">
            {tabs.map((tab, index) => (
              <li
                key={tab.id}
                className={`search_tab ${index === 0 ? 'first' : ''} ${index === tabs.length - 1 ? 'last' : ''} ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <div>
                  <i className={`${tab.icon} search-tab-icon`}></i>
                  {tab.label}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="search_panels">
          {/* Nhà */}
          <div className={`search_panel ${activeTab === 'nhà' ? 'active' : ''}`}>
            <div className="search_panel_content">
              <div className="search_item">
                <div>Địa điểm</div>
                <input ref={hotelLocationRef} type="text" className="search_input destination" placeholder="Tìm kiếm địa điểm" required />
              </div>
              <div className="search_item">
                <div>Check in</div>
                <input ref={checkInRef} type="date" className="search_input check_in" />
              </div>
              <div className="search_item">
                <div>Check out</div>
                <input ref={checkOutRef} type="date" className="search_input check_out" />
              </div>
              <div className="search_button" onClick={handleSearch}>
                <button type="button">search</button>
              </div>
            </div>
          </div>

          {/* Trải nghiệm */}
          <div className={`search_panel ${activeTab === 'trải nghiệm' ? 'active' : ''}`}>
            <div className="search_panel_content">
              <div className="search_item">
                <div>Địa điểm</div>
                <input ref={experienceLocationRef} type="text" className="search_input destination" placeholder="Tìm kiếm địa điểm" required />
              </div>
              <div className="search_item">
                <div>Tên trải nghiệm</div>
                <input ref={experienceNameRef} type="text" className="search_input" placeholder="Nhập tên trải nghiệm" />
              </div>
              <div className="search_button" onClick={handleSearch}>
                <button type="button">search</button>
              </div>
            </div>
          </div>

          {/* Dịch vụ */}
          <div className={`search_panel ${activeTab === 'dịch vụ' ? 'active' : ''}`}>
            <div className="search_panel_content">
              <div className="search_item">
                <div>Địa điểm</div>
                <input ref={serviceLocationRef} type="text" className="search_input destination" placeholder="Tìm kiếm địa điểm" required />
              </div>
              <div className="search_item">
                <div>Dịch vụ</div>
                <div className="service-selector">
                  <input
                    type="text"
                    ref={serviceInputRef}
                    className="search_input form-control"
                    placeholder="Tìm kiếm dịch vụ"
                    onClick={handleServiceInputClick}
                    readOnly
                  />
                  <ul
                    id="service_options"
                    ref={serviceOptionsRef}
                    className={`dropdown-menu ${serviceDropdownOpen ? 'show' : ''}`}
                  >
                    {services.map((service) => (
                      <li
                        key={service.value}
                        className="service-option"
                        onClick={() => handleServiceOptionClick(service.value)}
                      >
                        <i className={service.icon}></i> {service.value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="search_button" onClick={handleSearch}>
                <button type="button">search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div>
      <HomeSlider />
      <Chatbox />
      <Search />
    </div>
  );
};

export default HomePage;
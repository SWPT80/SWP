import React, { useState, useEffect, useRef } from 'react';
import homeSliderImg from '../assets/images/home_slider.jpg';
import '../assets/styles/responsive.css';
import '../assets/styles/HomePage.css';
import '../assets/styles/Search.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Chatbox from './ChatBox/ChatBox';
import ChatPopupManager from './Chat/ChatPopupManager';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import ChatManager from './ChatBox/ChatManager ';
import CozeChat from './ChatBox/CozeChat';

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

// Dữ liệu mẫu cho suggestions - có thể thay thế bằng API call
const locationSuggestions = [
  'Đà Nẵng', 'Hội An', 'Huế', 'Sapa', 'Hạ Long', 'Phú Quốc', 
  'Nha Trang', 'Đà Lạt', 'Hà Nội', 'TP. Hồ Chí Minh', 'Mũi Né', 
  'Cần Thơ', 'Vũng Tàu', 'Quy Nhon', 'Phan Thiết'
];

const experienceSuggestions = [
  { name: 'Tour thành phố Đà Nẵng', location: 'Đà Nẵng' },
  { name: 'Trekking Sapa', location: 'Sapa' },
  { name: 'Du thuyền Hạ Long', location: 'Hạ Long' },
  { name: 'Cooking class Hội An', location: 'Hội An' },
  { name: 'Đi bộ phố cổ Hà Nội', location: 'Hà Nội' },
  { name: 'Lặn biển Đà Nẵng', location: 'Đà Nẵng' },
  { name: 'Khám phá rừng quốc gia', location: 'Đà Lạt' },
  { name: 'Câu cá biển', location: 'Phú Quốc' },
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
  
  // States cho suggestions
  const [locationSuggestionsOpen, setLocationSuggestionsOpen] = useState(false);
  const [experienceNameSuggestionsOpen, setExperienceNameSuggestionsOpen] = useState(false);
  const [filteredLocationSuggestions, setFilteredLocationSuggestions] = useState([]);
  const [filteredExperienceSuggestions, setFilteredExperienceSuggestions] = useState([]);
  
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
  const ratingRef = useRef(null);
  const minPriceRef = useRef(null);

  const experienceLocationRef = useRef(null);
  const experienceNameRef = useRef(null);

  const serviceLocationRef = useRef(null);

  // Refs cho suggestions
  const locationSuggestionsRef = useRef(null);
  const experienceNameSuggestionsRef = useRef(null);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    // Đóng tất cả suggestions khi chuyển tab
    setLocationSuggestionsOpen(false);
    setExperienceNameSuggestionsOpen(false);

    if (tabId === 'trải nghiệm' && location.pathname !== '/experience') {
      navigate('/experience');
    } else if (tabId === 'dịch vụ' && location.pathname !== '/services') {
      navigate('/services');
    } else if (tabId === 'nhà' && location.pathname !== '/') {
      navigate('/');
    }
  };

  // Xử lý click outside để đóng dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Service dropdown
      if (
        serviceInputRef.current &&
        serviceOptionsRef.current &&
        !serviceInputRef.current.contains(event.target) &&
        !serviceOptionsRef.current.contains(event.target)
      ) {
        setServiceDropdownOpen(false);
      }

      // Location suggestions
      if (
        locationSuggestionsRef.current &&
        !locationSuggestionsRef.current.contains(event.target)
      ) {
        setLocationSuggestionsOpen(false);
      }

      // Experience name suggestions
      if (
        experienceNameSuggestionsRef.current &&
        !experienceNameSuggestionsRef.current.contains(event.target)
      ) {
        setExperienceNameSuggestionsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Xử lý input địa điểm
  const handleLocationInput = (e, type) => {
    const value = e.target.value;
    if (value.length > 0) {
      const filtered = locationSuggestions.filter(location =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocationSuggestions(filtered);
      setLocationSuggestionsOpen(true);
    } else {
      setLocationSuggestionsOpen(false);
    }
  };

  // Xử lý input tên trải nghiệm
  const handleExperienceNameInput = (e) => {
    const value = e.target.value;
    if (value.length > 0) {
      const filtered = experienceSuggestions.filter(exp =>
        exp.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredExperienceSuggestions(filtered);
      setExperienceNameSuggestionsOpen(true);
    } else {
      setExperienceNameSuggestionsOpen(false);
    }
  };

  // Chọn suggestion địa điểm
  const handleLocationSuggestionClick = (suggestionValue, inputRef) => {
    if (inputRef.current) {
      inputRef.current.value = suggestionValue;
    }
    setLocationSuggestionsOpen(false);
  };

  // Chọn suggestion trải nghiệm
  const handleExperienceNameSuggestionClick = (experience) => {
    if (experienceNameRef.current) {
      experienceNameRef.current.value = experience.name;
    }
    if (experienceLocationRef.current) {
      experienceLocationRef.current.value = experience.location;
    }
    setExperienceNameSuggestionsOpen(false);
  };

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
        minRating: ratingRef.current?.value || '',
        minPrice: minPriceRef.current?.value || '',
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
              <div className="search_item" style={{ position: 'relative' }}>
                <div>Địa điểm</div>
                <input 
                  ref={hotelLocationRef} 
                  type="text" 
                  className="search_input destination" 
                  placeholder="Tìm kiếm địa điểm" 
                  required 
                  onChange={(e) => handleLocationInput(e, 'hotel')}
                  onFocus={(e) => handleLocationInput(e, 'hotel')}
                />
                {locationSuggestionsOpen && (
                  <div ref={locationSuggestionsRef} className="search-suggestions">
                    {filteredLocationSuggestions.map((suggestion, index) => (
                      <div 
                        key={index}
                        className="search-suggestion-item"
                        onClick={() => handleLocationSuggestionClick(suggestion, hotelLocationRef)}
                      >
                        <i className="fas fa-map-marker-alt"></i>
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="search_item">
                <div>Đánh giá tối thiểu</div>
                <select
                  ref={ratingRef}
                  className="search_input rating"
                >
                  <option value="">Chọn đánh giá</option>
                  <option value="1">1 sao trở lên</option>
                  <option value="2">2 sao trở lên</option>
                  <option value="3">3 sao trở lên</option>
                  <option value="4">4 sao trở lên</option>
                  <option value="5">5 sao</option>
                </select>
              </div>
              <div className="search_item">
                <div>Giá tối thiểu (VND)</div>
                <input
                  ref={minPriceRef}
                  type="number"
                  className="search_input min_price"
                  placeholder="Nhập giá tối thiểu"
                  min="0"
                  step="50000"
                />
              </div>
              <div className="search_button" onClick={handleSearch}>
                <button type="button">search</button>
              </div>
            </div>
          </div>

          {/* Trải nghiệm */}
          <div className={`search_panel ${activeTab === 'trải nghiệm' ? 'active' : ''}`}>
            <div className="search_panel_content">
              <div className="search_item" style={{ position: 'relative' }}>
                <div>Địa điểm</div>
                <input 
                  ref={experienceLocationRef} 
                  type="text" 
                  className="search_input destination" 
                  placeholder="Tìm kiếm địa điểm" 
                  required 
                  onChange={(e) => handleLocationInput(e, 'experience')}
                  onFocus={(e) => handleLocationInput(e, 'experience')}
                />
                {locationSuggestionsOpen && (
                  <div ref={locationSuggestionsRef} className="search-suggestions">
                    {filteredLocationSuggestions.map((suggestion, index) => (
                      <div 
                        key={index}
                        className="search-suggestion-item"
                        onClick={() => handleLocationSuggestionClick(suggestion, experienceLocationRef)}
                      >
                        <i className="fas fa-map-marker-alt"></i>
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="search_item" style={{ position: 'relative' }}>
                <div>Tên trải nghiệm</div>
                <input 
                  ref={experienceNameRef} 
                  type="text" 
                  className="search_input" 
                  placeholder="Nhập tên trải nghiệm" 
                  onChange={handleExperienceNameInput}
                  onFocus={handleExperienceNameInput}
                />
                {experienceNameSuggestionsOpen && (
                  <div ref={experienceNameSuggestionsRef} className="search-suggestions">
                    {filteredExperienceSuggestions.map((experience, index) => (
                      <div 
                        key={index}
                        className="search-suggestion-item experience-suggestion"
                        onClick={() => handleExperienceNameSuggestionClick(experience)}
                      >
                        <div className="experience-suggestion-content">
                          <div className="experience-name">
                            <i className="fas fa-hiking"></i>
                            {experience.name}
                          </div>
                          <div className="experience-location">
                            <i className="fas fa-map-marker-alt"></i>
                            {experience.location}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="search_button" onClick={handleSearch}>
                <button type="button">search</button>
              </div>
            </div>
          </div>

          {/* Dịch vụ */}
          <div className={`search_panel ${activeTab === 'dịch vụ' ? 'active' : ''}`}>
            <div className="search_panel_content">
              <div className="search_item" style={{ position: 'relative' }}>
                <div>Địa điểm</div>
                <input 
                  ref={serviceLocationRef} 
                  type="text" 
                  className="search_input destination" 
                  placeholder="Tìm kiếm địa điểm" 
                  required 
                  onChange={(e) => handleLocationInput(e, 'service')}
                  onFocus={(e) => handleLocationInput(e, 'service')}
                />
                {locationSuggestionsOpen && (
                  <div ref={locationSuggestionsRef} className="search-suggestions">
                    {filteredLocationSuggestions.map((suggestion, index) => (
                      <div 
                        key={index}
                        className="search-suggestion-item"
                        onClick={() => handleLocationSuggestionClick(suggestion, serviceLocationRef)}
                      >
                        <i className="fas fa-map-marker-alt"></i>
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
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

const handleMessageHost = (host) => {
  window.dispatchEvent(new CustomEvent("open-chat", {
    detail: {
      id: `${host.userId}-${host.homestayId}`,
      userId: host.userId,
      homestayId: host.homestayId,
      fullname: host.fullname,
      avatar: host.avatar,
    }
  }));
};

const HomePage = () => {
  const [hostList, setHostList] = useState([]);
  const { user, isLoggedIn } = useAuth();

  // Lấy danh sách host để chat
  useEffect(() => {
    if (!user || !isLoggedIn) return;

    const fetchChatList = async () => {
      try {
        // Lấy danh sách host đã book hoặc có thể chat
        const response = await axios.get(`http://localhost:8080/api/chat/hosts-booked?userId=${user.id}`);
        const data = response.data;
        
        const formatted = data.map((host) => ({
          id: `${host.hostId}-${host.homestayId}`,
          userId: host.hostId,
          homestayId: host.homestayId,
          fullname: host.fullname,
          avatar: host.avatar || "",
        }));
        
        setHostList(formatted);
      } catch (error) {
        console.error("Lỗi khi tải danh sách chat:", error);
        
        // Dữ liệu mẫu nếu API lỗi hoặc chưa có dữ liệu
        setHostList([
          {
            id: "1-1",
            userId: 1,
            homestayId: 1,
            fullname: "Nguyễn Văn A - Host",
            avatar: "https://ui-avatars.com/api/?name=Nguyen+Van+A&background=0084ff&color=fff"
          },
          {
            id: "2-2", 
            userId: 2,
            homestayId: 2,
            fullname: "Trần Thị B - Host",
            avatar: "https://ui-avatars.com/api/?name=Tran+Thi+B&background=0084ff&color=fff"
          }
        ]);
      }
    };

    fetchChatList();
  }, [user, isLoggedIn]);

  return (
    <div>
      <HomeSlider />
      {/* <ChatManager /> */}
      <Search />
      <CozeChat/>
      {/* Chat Integration - Chỉ hiển thị khi user đã đăng nhập */}
      {isLoggedIn && user && (
        <ChatPopupManager
          currentUserId={user.id}
          listToChatWith={hostList}
          type="userToHost"
        />
      )}
    </div>
  );
};

export default HomePage;
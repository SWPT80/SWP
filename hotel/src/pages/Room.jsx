import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Form, 
  Button, 
  Badge,
  Dropdown
} from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, 
  faStarHalfAlt, 
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [filters, setFilters] = useState({
    sortBy: 'default',
    stars: '*',
    bookingType: 'all',
    amenities: [],
    priceRange: [0, 500],
    anything: { rating: '', reviews: '', distance: '' },
    showPrice: false,
  });

  // Dữ liệu homestay với tọa độ mẫu
  const homestayData = [
    {
      id: "H1",
      name: "Mountain Retreat",
      location: "Đà Lạt, Việt Nam",
      price: 150,
      image: "images/offer_1.jpg",
      rating: 4,
      reviews: 500,
      distance: "1.5 km",
      bookingType: "Đặt ngay",
      amenities: ["Wi-Fi", "Bãi đỗ xe", "Điều hòa"],
      coordinates: [11.9417, 108.4419], // Đà Lạt
    },
    {
      id: "H2",
      name: "Beachside Villa",
      location: "Phú Quốc, Việt Nam",
      price: 200,
      image: "images/offer_2.jpg",
      rating: 3,
      reviews: 300,
      distance: "2.0 km",
      bookingType: "Yêu cầu đặt",
      amenities: ["Wi-Fi", "Hồ bơi", "Bữa sáng"],
      coordinates: [10.2271, 103.9532], // Phú Quốc
    },
    {
      id: "H3",
      name: "Forest Cabin",
      location: "Đà Nẵng, Việt Nam",
      price: 120,
      image: "images/offer_3.jpg",
      rating: 5,
      reviews: 700,
      distance: "1.2 km",
      bookingType: "Đặt ngay",
      amenities: ["Wi-Fi", "Bãi đỗ xe", "Thân thiện với thú cưng"],
      coordinates: [16.0544, 108.2022], // Đà Nẵng
    },
    {
      id: "H4",
      name: "City Loft",
      location: "Thành phố Hồ Chí Minh, Việt Nam",
      price: 180,
      image: "images/offer_4.jpg",
      rating: 4,
      reviews: 400,
      distance: "1.8 km",
      bookingType: "Yêu cầu đặt",
      amenities: ["Wi-Fi", "Điều hòa", "Bữa sáng"],
      coordinates: [10.7769, 106.7009], // TP.HCM
    },
    {
      id: "H5",
      name: "Ocean Breeze Homestay",
      location: "Đà Nẵng, Việt Nam",
      price: 90,
      image: "images/offer_5.jpg",
      rating: 3,
      reviews: 200,
      distance: "1.7 km",
      bookingType: "Đặt ngay",
      amenities: ["Wi-Fi", "Hồ bơi", "Thân thiện với thú cưng"],
      coordinates: [16.0544, 108.2022], // Đà Nẵng
    },
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const destination = urlParams.get('destination') || '';

    const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    let results = homestayData.filter(homestay =>
      removeAccents(homestay.location).includes(removeAccents(destination))
    );

    results = applyFilters(results, filters);
    setOffers(results);
  }, [filters]);

  const applyFilters = (data, filters) => {
    let result = [...data];

    if (filters.stars !== '*') result = result.filter(h => h.rating === parseInt(filters.stars));
    if (filters.bookingType !== 'all') result = result.filter(h => h.bookingType === filters.bookingType);
    if (filters.amenities.length > 0) result = result.filter(h => filters.amenities.every(a => h.amenities.includes(a)));
    result = result.filter(h => h.price >= filters.priceRange[0] && h.price <= filters.priceRange[1]);
    const { rating, reviews, distance } = filters.anything;
    if (rating) result = result.filter(h => (h.rating / 5) * 10 >= parseFloat(rating));
    if (reviews) result = result.filter(h => h.reviews >= parseInt(reviews));
    if (distance) result = result.filter(h => parseFloat(h.distance) <= parseFloat(distance) || !isNaN(parseFloat(h.distance)));

    switch (filters.sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'location-asc': result.sort((a, b) => a.location.localeCompare(b.location)); break;
      default: break;
    }

    return result;
  };

  const handleFilterChange = (category, value) => setFilters(prev => ({ ...prev, [category]: value }));
  const handleAmenityChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFilters(prev => ({ ...prev, amenities: selectedOptions }));
  };
  const handlePriceRangeChange = (e, index) => {
    const value = parseInt(e.target.value);
    setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], prev.priceRange[1]].map((v, i) => i === index ? value : v) }));
  };
  const handleAnythingChange = (field, value) => setFilters(prev => ({ ...prev, anything: { ...prev.anything, [field]: value } }));
  const toggleShowPrice = () => setFilters(prev => ({ ...prev, showPrice: !prev.showPrice }));

  const StarRating = ({ rating }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-warning" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} className="text-warning" />);
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={farStar} className="text-warning" />);
      }
    }
    
    return <div className="d-flex">{stars}</div>;
  };

  return (
    <Container className="my-5">
      {/* Filter Section */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row className="g-3">
            <Col md={6} lg={2}>
              <Form.Group>
                <Form.Label>Sắp xếp</Form.Label>
                <Form.Select 
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
                  <option value="default">Mặc định</option>
                  <option value="price-asc">Giá: Thấp → Cao</option>
                  <option value="price-desc">Giá: Cao → Thấp</option>
                  <option value="rating-desc">Đánh giá: Cao → Thấp</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={6} lg={2}>
              <Form.Group>
                <Form.Label>Đánh giá</Form.Label>
                <Form.Select 
                  onChange={(e) => handleFilterChange('stars', e.target.value)}
                >
                  <option value="*">Tất cả</option>
                  <option value="3">3★ trở lên</option>
                  <option value="4">4★ trở lên</option>
                  <option value="5">5★</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={6} lg={2}>
              <Form.Group>
                <Form.Label>Loại đặt</Form.Label>
                <Form.Select 
                  onChange={(e) => handleFilterChange('bookingType', e.target.value)}
                >
                  <option value="all">Tất cả</option>
                  <option value="Đặt ngay">Đặt ngay</option>
                  <option value="Yêu cầu đặt">Yêu cầu đặt</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label>Tiện nghi</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start">
                    {filters.amenities.length > 0 ? `${filters.amenities.length} đã chọn` : 'Chọn tiện nghi'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="p-3" style={{ width: '300px'  ,zIndex: 9999}}>
                    {['Wi-Fi', 'Bãi đỗ xe', 'Hồ bơi', 'Điều hòa', 'Bữa sáng', 'Thân thiện với thú cưng'].map(amenity => (
                      <Form.Check
                        key={amenity}
                        type="checkbox"
                        label={amenity}
                        value={amenity}
                        checked={filters.amenities.includes(amenity)}
                        onChange={(e) => {
                          const amenity = e.target.value;
                          setFilters(prev => ({
                            ...prev,
                            amenities: e.target.checked
                              ? [...prev.amenities, amenity]
                              : prev.amenities.filter(a => a !== amenity)
                          }));
                        }}
                        className="mb-2"
                      />
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Col>
            
            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label>Khoảng giá (VND)</Form.Label>
                <div className="d-flex align-items-center gap-2">
                  <Form.Control
                    type="number"
                    placeholder="Từ"
                    value={filters.priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(e, 0)}
                    min="0"
                    max={filters.priceRange[1]}
                  />
                  <span>-</span>
                  <Form.Control
                    type="number"
                    placeholder="Đến"
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(e, 1)}
                    min={filters.priceRange[0]}
                    max="1000"
                  />
                </div>
                <div className="d-flex gap-2 mt-2">
                  <Form.Range
                    min="0"
                    max="1000"
                    value={filters.priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(e, 0)}
                  />
                  <Form.Range
                    min="0"
                    max="1000"
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(e, 1)}
                  />
                </div>
              </Form.Group>
            </Col>
            
            <Col md={6} lg={2} className="d-flex align-items-end">
              <Button 
                variant={filters.showPrice ? 'outline-primary' : 'primary'}
                onClick={toggleShowPrice}
                className="w-100"
              >
                {filters.showPrice ? 'Ẩn giá' : 'Hiện giá'}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row>
        {/* Offers List */}
        <Col lg={8}>
          {offers.length === 0 ? (
            <Card className="text-center p-5">
              <Card.Body>
                <Card.Title>Không tìm thấy kết quả</Card.Title>
                <Card.Text>Hãy thử điều chỉnh bộ lọc của bạn</Card.Text>
                <Button 
                  variant="primary"
                  onClick={() => setFilters({
                    sortBy: 'default',
                    stars: '*',
                    bookingType: 'all',
                    amenities: [],
                    priceRange: [0, 500],
                    anything: { rating: '', reviews: '', distance: '' },
                    showPrice: false,
                  })}
                >
                  Reset bộ lọc
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <div className="d-flex flex-column gap-4">
              {offers.map(homestay => (
                <Card key={homestay.id} className="shadow-sm">
                  <Card.Body>
                    <Row>
                      <Col md={4}>
                        <div 
                          className="rounded-3 overflow-hidden mb-3 mb-md-0" 
                          style={{
                            height: '200px',
                            backgroundImage: `url(${homestay.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        >
                          <Badge bg="primary" className="m-2">
                            {homestay.name}
                          </Badge>
                        </div>
                      </Col>
                      
                      <Col md={5}>
                        <div className="h-100 d-flex flex-column">
                          {filters.showPrice && (
                            <h4 className="text-primary mb-2">
                              ${homestay.price} <small className="text-muted">mỗi đêm</small>
                            </h4>
                          )}
                          
                          <div className="mb-2">
                            <StarRating rating={homestay.rating} />
                          </div>
                          
                          <p className="mb-1">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary me-2" />
                            {homestay.location}
                          </p>
                          
                          <p className="mb-1">
                            <small className="text-muted">Loại đặt:</small> {homestay.bookingType}
                          </p>
                          
                          <div className="mb-2">
                            <small className="text-muted">Tiện nghi:</small>
                            <div className="d-flex flex-wrap gap-1 mt-1">
                              {homestay.amenities.map((amenity, i) => (
                                <Badge key={i} bg="light" text="dark" className="me-1 mb-1">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <Button variant="primary" className="mt-auto align-self-start">
                            Đặt ngay
                          </Button>
                        </div>
                      </Col>
                      
                      <Col md={3}>
                        <Card className="h-100 bg-light">
                          <Card.Body className="d-flex flex-column justify-content-between">
                            <div>
                              <h5 className="text-success">
                                Tuyệt vời {((homestay.rating / 5) * 10).toFixed(1)}
                              </h5>
                              <p className="text-muted small mb-2">
                                {homestay.reviews} đánh giá
                              </p>
                              <p className="text-muted small mb-2">
                                Địa điểm {(homestay.rating + 1).toFixed(1)}
                              </p>
                              <p className="text-muted small">
                                {homestay.distance}, hồ, khu
                              </p>
                            </div>
                            
                            <div className="text-center">
                              <Badge pill bg="warning" className="fs-5 p-2">
                                {((homestay.rating / 5) * 10).toFixed(1)}
                              </Badge>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Col>
        
        {/* Map Section */}
        <Col lg={4}>
          <Card className="shadow-sm sticky-top" style={{ top: '20px' }}>
            <Card.Body className="p-0" style={{ height: '600px' }}>
              <MapContainer
                center={[16.0, 106.0]} // Trung tâm Việt Nam
                zoom={offers.length > 0 ? 6 : 5} // Zoom out hơn khi không có dữ liệu
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%', borderRadius: '0.375rem' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {offers.length > 0 ? (
                  offers.map(homestay => (
                    <Marker 
                      key={homestay.id} 
                      position={homestay.coordinates}
                    >
                      <Popup>
                        <div>
                          <h5>{homestay.name}</h5>
                          <p><strong>Vị trí:</strong> {homestay.location}</p>
                          <p><strong>Giá:</strong> {homestay.price.toLocaleString()} VND/đêm</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))
                ) : (
                  <Popup 
                    position={[16.0, 106.0]}
                    className="no-data-popup"
                  >
                    <div>
                      <h5>Không tìm thấy địa điểm phù hợp</h5>
                      <p>Hãy thử điều chỉnh bộ lọc của bạn</p>
                    </div>
                  </Popup>
                )}
              </MapContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Offers;
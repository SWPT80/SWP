
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faUsers, faCheckCircle, faBan } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { useSearchParams, Link } from 'react-router-dom';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Hàm kiểm tra tọa độ hợp lệ
const isValidCoordinate = (lat, lng) => {
  return lat !== null && lng !== null && !isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
};

// Hàm lấy tọa độ mặc định (Việt Nam)
const getDefaultCoordinates = () => [15.9267, 107.9652]; // Trung tâm Việt Nam
const getFallbackCoordinates = () => [21.0278, 105.8342]; // Hà Nội làm fallback nếu cần

const Offer = () => {
  const [searchParams] = useSearchParams();
  const homestayId = searchParams.get('homestayId');
  const destination = searchParams.get('destination');
  const [offers, setOffers] = useState([]);
  const [homestay, setHomestay] = useState(null);
  const [availableCapacities, setAvailableCapacities] = useState([]);
  const [filters, setFilters] = useState({
    sortBy: 'default',
    stars: '*',
    bookingType: 'all',
    capacity: 'all',
    priceRange: [0, 5000000],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState(getDefaultCoordinates());
  const [mapZoom, setMapZoom] = useState(6);
  const [displayHomestays, setDisplayHomestays] = useState([]); // Dữ liệu homestay để hiển thị trên bản đồ

  // Hàm lọc dữ liệu
  const applyFilters = useCallback((data, filters) => {
    let result = [...data];

    if (filters.stars !== '*') {
      result = result.filter((item) => Math.round(item.rating) >= parseInt(filters.stars));
    }

    if (filters.bookingType !== 'all') {
      result = result.filter((item) => item.bookingType === filters.bookingType);
    }

    if (filters.capacity !== 'all') {
      if (filters.capacity === '3-4') {
        result = result.filter((item) => item.capacity >= 3 && item.capacity <= 4);
      } else if (filters.capacity === '>4') {
        result = result.filter((item) => item.capacity > 4);
      } else {
        result = result.filter((item) => item.capacity === parseInt(filters.capacity));
      }
    }

    result = result.filter(
      (item) => item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1]
    );

    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, []);

  // Lấy danh sách sức chứa
  useEffect(() => {
    const fetchCapacities = async () => {
      try {
        let capacities = new Set();
        if (homestayId) {
          const roomsResponse = await axios.get(`http://localhost:8080/api/rooms/homestay/${homestayId}`);
          roomsResponse.data.forEach((room) => capacities.add(room.capacity));
        } else {
          const response = await axios.get(
            destination
              ? `http://localhost:8080/api/homestays/location?location=${encodeURIComponent(destination)}`
              : 'http://localhost:8080/api/homestays'
          );
          const homestays = response.data;
          for (const hs of homestays) {
            const roomsResponse = await axios.get(`http://localhost:8080/api/rooms/homestay/${hs.id}`);
            roomsResponse.data.forEach((room) => capacities.add(room.capacity));
          }
        }

        const capacityOptions = Array.from(capacities)
          .sort((a, b) => a - b)
          .reduce((acc, cap) => {
            if (cap <= 2) acc.push(cap.toString());
            else if (cap <= 4) acc.push('3-4');
            else acc.push('>4');
            return acc;
          }, ['all']);

        setAvailableCapacities([...new Set(capacityOptions)]);
      } catch (error) {
        console.error('Failed to fetch capacities:', error);
      }
    };

    fetchCapacities();
  }, [homestayId, destination]);

  // Lấy dữ liệu và cập nhật bản đồ
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let newOffers = [];
        let mainHomestay = null;
        let validCoordinatesFound = false;

        if (homestayId) {
          const homestayResponse = await axios.get(`http://localhost:8080/api/homestays/${homestayId}`);
          mainHomestay = homestayResponse.data;
          setHomestay(mainHomestay);
          setDisplayHomestays([mainHomestay]);

          if (isValidCoordinate(mainHomestay.latitude, mainHomestay.longitude)) {
            setMapCenter([mainHomestay.latitude, mainHomestay.longitude]);
            setMapZoom(15);
            validCoordinatesFound = true;
          } else {
            console.warn(`Tọa độ không hợp lệ cho homestay ${homestayId}:`, mainHomestay.latitude, mainHomestay.longitude);
          }

          const roomsResponse = await axios.get(`http://localhost:8080/api/rooms/homestay/${homestayId}`);
          const rooms = roomsResponse.data;

          newOffers = await Promise.all(rooms.map(async (room) => {
            const reviewsResponse = await axios.get(
              `http://localhost:8080/api/reviews/room/${homestayId}/${room.roomNumber}`
            );
            const reviews = reviewsResponse.data;
            const averageRating = reviews.length > 0
              ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
              : 0;

            return {
              id: room.roomNumber,
              homestayId: homestayId,
              name: `${mainHomestay.homestayName} - ${room.roomNumber}`,
              type: room.type,
              location: mainHomestay.location,
              price: room.price,
              capacity: room.capacity,
              rating: room.rating || averageRating,
              status: room.status,
              image: room.images?.[0]?.imageUrl || '/images/placeholder.jpg',
              reviews: reviews.length,
              distance: '1.5 km',
              coordinates: isValidCoordinate(mainHomestay.latitude, mainHomestay.longitude)
                ? [mainHomestay.latitude, mainHomestay.longitude]
                : getDefaultCoordinates(),
            };
          }));
        } else {
          const response = await axios.get(
            destination
              ? `http://localhost:8080/api/homestays/location?location=${encodeURIComponent(destination)}`
              : 'http://localhost:8080/api/homestays'
          );
          setDisplayHomestays(response.data);

          // Tính trung bình tọa độ với ngưỡng để tránh lệch quá nhiều
          const validCoordinates = response.data
            .filter(hs => isValidCoordinate(hs.latitude, hs.longitude))
            .map(hs => [hs.latitude, hs.longitude]);
          console.log('Valid coordinates:', validCoordinates);
          if (validCoordinates.length > 0) {
            const latSum = validCoordinates.reduce((sum, coord) => sum + coord[0], 0);
            const lngSum = validCoordinates.reduce((sum, coord) => sum + coord[1], 0);
            const avgLat = latSum / validCoordinates.length;
            const avgLng = lngSum / validCoordinates.length;

            // Kiểm tra nếu trung bình lệch quá xa trung tâm Việt Nam, dùng fallback
            const distanceFromCenter = Math.sqrt(
              Math.pow(avgLat - 15.9267, 2) + Math.pow(avgLng - 107.9652, 2)
            );
            if (distanceFromCenter > 5) { // Ngưỡng 5 độ (khoảng 500-600km)
              console.warn('Trung bình tọa độ lệch quá xa, dùng fallback:', [avgLat, avgLng]);
              setMapCenter(getFallbackCoordinates()); // Sử dụng Hà Nội làm fallback
            } else {
              setMapCenter([avgLat, avgLng]);
            }
            setMapZoom(6);
          } else {
            setMapCenter(getDefaultCoordinates());
            setMapZoom(6);
          }

          newOffers = await Promise.all(response.data.map(async (hs) => {
            const roomsResponse = await axios.get(`http://localhost:8080/api/rooms/homestay/${hs.id}`);
            const rooms = roomsResponse.data;
            const minPrice = rooms.length > 0 ? Math.min(...rooms.map(room => room.price)) : 0;

            let totalRating = 0;
            let totalReviews = 0;
            for (const room of rooms) {
              const reviewsResponse = await axios.get(
                `http://localhost:8080/api/reviews/room/${hs.id}/${room.roomNumber}`
              );
              const reviews = reviewsResponse.data;
              if (reviews.length > 0) {
                const roomRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
                totalRating += roomRating;
                totalReviews += reviews.length;
              }
            }
            const averageRating = rooms.length > 0 ? totalRating / rooms.length : 0;

            const coordinates = isValidCoordinate(hs.latitude, hs.longitude)
              ? [hs.latitude, hs.longitude]
              : getDefaultCoordinates();

            if (!validCoordinatesFound && isValidCoordinate(hs.latitude, hs.longitude)) {
              setMapCenter(coordinates);
              setMapZoom(10);
              validCoordinatesFound = true;
            }

            return {
              id: hs.id,
              name: hs.homestayName,
              location: hs.location,
              price: minPrice,
              image: hs.images?.[0]?.imageUrl || '/images/placeholder.jpg',
              rating: averageRating,
              reviews: totalReviews,
              distance: '1.5 km',
              bookingType: 'Đặt ngay',
              coordinates: coordinates,
              capacity: rooms.length > 0 ? Math.max(...rooms.map(room => room.capacity)) : 0,
            };
          }));
        }

        const filteredOffers = applyFilters(newOffers, filters);
        setOffers(filteredOffers);

      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [homestayId, destination, filters, applyFilters]);

  // Xử lý thay đổi bộ lọc
  const handleFilterChange = (category, value) => {
    setFilters(prev => ({ ...prev, [category]: value }));
  };

  const handlePriceRangeChange = (e, index) => {
    const value = parseInt(e.target.value) || 0;
    setFilters(prev => ({
      ...prev,
      priceRange: index === 0
        ? [value, prev.priceRange[1]]
        : [prev.priceRange[0], value]
    }));
  };

  // Component đánh giá sao
  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    return (
      <div className="d-flex">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <FontAwesomeIcon key={i} icon={faStar} className="text-warning" />;
          } else if (i === fullStars && hasHalfStar) {
            return <FontAwesomeIcon key={i} icon={faStarHalfAlt} className="text-warning" />;
          } else {
            return <FontAwesomeIcon key={i} icon={farStar} className="text-warning" />;
          }
        })}
      </div>
    );
  };

  if (loading) return <div className="text-center py-5">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-center py-5 text-danger">{error}</div>;

  return (
    <Container className="my-5">
      <h2 className="mb-4">
        {homestayId ? `Các phòng tại ${homestay?.homestayName || 'Homestay'}` : 'Ưu đãi chỗ nghỉ'}
      </h2>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row className="g-3">
            <Col md={6} lg={2}>
              <Form.Group>
                <Form.Label>Sắp xếp</Form.Label>
                <Form.Select value={filters.sortBy} onChange={(e) => handleFilterChange('sortBy', e.target.value)}>
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
                <Form.Select value={filters.stars} onChange={(e) => handleFilterChange('stars', e.target.value)}>
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
                <Form.Select value={filters.bookingType} onChange={(e) => handleFilterChange('bookingType', e.target.value)}>
                  <option value="all">Tất cả</option>
                  <option value="Đặt ngay">Đặt ngay</option>
                  <option value="Yêu cầu đặt">Yêu cầu đặt</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label>Sức chứa</Form.Label>
                <Form.Select value={filters.capacity} onChange={(e) => handleFilterChange('capacity', e.target.value)}>
                  <option value="all">Tất cả</option>
                  {availableCapacities.map((cap, index) => (
                    <option key={index} value={cap}>
                      {cap === 'all' ? 'Tất cả' : cap === '3-4' ? '3-4 người' : cap === '>4' ? 'Trên 4 người' : `${cap} người`}
                    </option>
                  ))}
                </Form.Select>
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
                    max="10000000"
                  />
                </div>
                <div className="d-flex gap-2 mt-2">
                  <Form.Range
                    min="0"
                    max="10000000"
                    value={filters.priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(e, 0)}
                  />
                  <Form.Range
                    min="0"
                    max="10000000"
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(e, 1)}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row>
        <Col lg={8}>
          {offers.length === 0 ? (
            <Card className="text-center p-5">
              <Card.Body>
                <Card.Title>Không tìm thấy kết quả</Card.Title>
                <Card.Text>Hãy thử điều chỉnh bộ lọc của bạn</Card.Text>
                <Button
                  variant="primary"
                  onClick={() =>
                    setFilters({
                      sortBy: 'default',
                      stars: '*',
                      bookingType: 'all',
                      capacity: 'all',
                      priceRange: [0, 5000000],
                    })
                  }
                >
                  Reset bộ lọc
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <div className="d-flex flex-column gap-4">
              {offers.map((item) => (
                <Card key={item.id} className="shadow-sm">
                  <Card.Body>
                    <Row>
                      <Col md={4}>
                        <div
                          className="rounded-3 overflow-hidden mb-3 mb-md-0"
                          style={{
                            height: '200px',
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        >
                          <Badge bg="primary" className="m-2">
                            {item.name}
                          </Badge>
                        </div>
                      </Col>
                      <Col md={5}>
                        <div className="h-100 d-flex flex-column">
                          <h4 className="text-primary mb-2">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}{' '}
                            <small className="text-muted">mỗi đêm</small>
                          </h4>
                          {homestayId && (
                            <>
                              <p className="mb-1">
                                <small className="text-muted">Loại phòng:</small> {item.type}
                              </p>
                              <p className="mb-1">
                                <FontAwesomeIcon icon={faUsers} className="text-primary me-2" />
                                Sức chứa: {item.capacity} người
                              </p>
                              <p className="mb-1">
                                <FontAwesomeIcon
                                  icon={item.status ? faCheckCircle : faBan}
                                  className={item.status ? 'text-success me-2' : 'text-danger me-2'}
                                />
                                Trạng thái: {item.status ? 'Còn trống' : 'Đã đặt'}
                              </p>
                            </>
                          )}
                          <div className="mb-2">
                            <StarRating rating={item.rating} />
                            <small className="text-muted ms-2">({item.reviews} đánh giá)</small>
                          </div>
                          <Link
                            to={
                              homestayId
                                ? `/room/roomdetails/${item.homestayId}/${item.id}`
                                : `/offer?homestayId=${item.id}`
                            }
                            className="btn btn-primary mt-auto align-self-start"
                          >
                            Đặt ngay
                          </Link>
                        </div>
                      </Col>
                      <Col md={3}>
                        <Card className="h-100 bg-light">
                          <Card.Body className="d-flex flex-column justify-content-between">
                            <div>
                              <h5 className="text-success">
                                Tuyệt vời {((item.rating / 5) * 10).toFixed(1)}
                              </h5>
                              <p className="text-muted small mb-2">{item.reviews} đánh giá</p>
                              <p className="text-muted small mb-2">Địa điểm {(item.rating + 1).toFixed(1)}</p>
                              <p className="text-muted small">{item.distance}, khu vực</p>
                            </div>
                            <div className="text-center">
                              <Badge pill bg="warning" className="fs-5 p-2">
                                {((item.rating / 5) * 10).toFixed(1)}
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

        <Col lg={4}>
          <Card className="shadow-sm sticky-top" style={{ top: '20px' }}>
            <Card.Body className="p-0" style={{ height: '600px' }}>
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%', borderRadius: '0.375rem' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Marker cho homestays được hiển thị */}
                {displayHomestays.map((hs) => {
                  const coordinates = isValidCoordinate(hs.latitude, hs.longitude)
                    ? [hs.latitude, hs.longitude]
                    : getDefaultCoordinates();
                  return (
                    <Marker key={hs.id} position={coordinates}>
                      <Popup>
                        <div>
                          <h5>{hs.homestayName}</h5>
                          <p><strong>Vị trí:</strong> {hs.location}</p>
                          <p><strong>Địa chỉ:</strong> {hs.address}</p>
                          <Link
                            to={`/offer?homestayId=${hs.id}`}
                            className="btn btn-sm btn-primary mt-2"
                          >
                            Xem chi tiết
                          </Link>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Offer;
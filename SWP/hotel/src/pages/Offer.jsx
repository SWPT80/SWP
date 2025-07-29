import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faUsers, faCheckCircle, faBan } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { useSearchParams, Link } from 'react-router-dom';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import FavoriteHeart from '../components/FavoriteHeart';
import { useAuth } from '../context/AuthContext';


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

const RoutingMachine = ({ userPosition, homestayPosition }) => {
  const map = useMap();
  const routingControlRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (
      !map ||
      !userPosition ||
      !homestayPosition ||
      !Array.isArray(userPosition) ||
      !Array.isArray(homestayPosition) ||
      !isValidCoordinate(userPosition[0], userPosition[1]) ||
      !isValidCoordinate(homestayPosition[0], homestayPosition[1])
    ) {
      return;
    }

    if (routingControlRef.current) {
      try {
        if (routingControlRef.current._map) {
          map.removeControl(routingControlRef.current);
        }
      } catch (error) {
        console.warn('Không thể removeControl:', error);
      }
      routingControlRef.current = null;
    }

    timeoutRef.current = setTimeout(() => {
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(userPosition[0], userPosition[1]),
          L.latLng(homestayPosition[0], homestayPosition[1]),
        ],
        routeWhileDragging: false,
        addWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        show: false,
        lineOptions: {
          styles: [{ color: '#007bff', weight: 4 }],
        },
        createMarker: () => null,
        router: L.Routing.osrmv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1'
        })
      });

      routingControlRef.current = routingControl;
      routingControl.addTo(map);
    }, 100);

    return () => {
      clearTimeout(timeoutRef.current);
      if (routingControlRef.current) {
        try {
          if (routingControlRef.current._map) {
            map.removeControl(routingControlRef.current);
          }
        } catch (error) {
          console.warn('Cleanup lỗi:', error);
        }
        routingControlRef.current = null;
      }
    };
  }, [map, userPosition, homestayPosition]);

  return null;
};



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
  const [displayHomestays, setDisplayHomestays] = useState([]);
  const [userPosition, setUserPosition] = useState(null);
  const [selectedHomestay, setSelectedHomestay] = useState(null);

  const { user } = useAuth();
  const userId = user?.id;


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
        result.sort((a, b) => b.price - b.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'distance-asc':
        result.sort((a, b) => (parseFloat(a.distance) || Number.MAX_VALUE) - (parseFloat(b.distance) || Number.MAX_VALUE));
        break;
      default:
        break;
    }

    return result;
  }, []);

  // Lấy vị trí người dùng
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setError('Không thể lấy vị trí của bạn. Sử dụng tọa độ mặc định.');
          setUserPosition(getDefaultCoordinates());
        }
      );
    } else {
      setError('Trình duyệt không hỗ trợ định vị.');
      setUserPosition(getDefaultCoordinates());
    }
  }, []);

  // Lấy danh sách sức chứa
  useEffect(() => {
    const fetchCapacities = async () => {
      try {
        let capacities = new Set();
        if (homestayId) {
          const roomsResponse = await axios.get(`http://localhost:8080/api/rooms/homestay/${homestayId}`);
          const activeRooms = roomsResponse.data.filter(room => room.status === true);
          activeRooms.forEach((room) => capacities.add(room.capacity));
        } else {
          const response = await axios.get(
            destination
              ? `http://localhost:8080/api/homestays/location?location=${encodeURIComponent(destination)}`
              : 'http://localhost:8080/api/homestays'
          );
          const homestays = response.data;
          for (const hs of homestays) {
            const roomsResponse = await axios.get(`http://localhost:8080/api/rooms/homestay/${hs.id}`);
            const activeRooms = roomsResponse.data.filter(room => room.status === true);
            activeRooms.forEach((room) => capacities.add(room.capacity));
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

  // Hàm lấy giá theo seasonal pricing
  const getSeasonalPrice = async (homestayId, roomType, basePrice) => {
    try {
      const today = new Date();
      const checkIn = today.toISOString().slice(0, 10);
      const checkOut = new Date(today.getTime() + 86400000).toISOString().slice(0, 10); // +1 ngày

      const response = await axios.get(`http://localhost:8080/api/seasonal-pricing/room-price`, {
        params: {
          homestayId: homestayId,
          roomType: roomType,
          checkIn: checkIn,
          checkOut: checkOut,
        },
      });

      if (response.data && response.data.length > 0) {
        // Lấy giá đầu tiên từ kết quả
        const seasonalData = response.data[0];
        return {
          price: seasonalData.finalPrice || basePrice,
          basePrice: seasonalData.basePrice || basePrice,
          seasonApplied: seasonalData.seasonApplied || null,
          increaseRate: seasonalData.increaseRate || 1,
        };
      }

      return {
        price: basePrice,
        basePrice: basePrice,
        seasonApplied: null,
        increaseRate: 1,
      };
    } catch (error) {
      console.error('Error fetching seasonal price:', error);
      return {
        price: basePrice,
        basePrice: basePrice,
        seasonApplied: null,
        increaseRate: 1,
      };
    }
  };

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

          const homestayWithCoords = {
            ...mainHomestay,
            coordinates: isValidCoordinate(mainHomestay.latitude, mainHomestay.longitude)
              ? [mainHomestay.latitude, mainHomestay.longitude]
              : getDefaultCoordinates(),
            distance: '1.5 km'
          };
          setDisplayHomestays([homestayWithCoords]);

          if (isValidCoordinate(mainHomestay.latitude, mainHomestay.longitude)) {
            setMapCenter([mainHomestay.latitude, mainHomestay.longitude]);
            setMapZoom(15);
            validCoordinatesFound = true;
            setSelectedHomestay(homestayWithCoords);
          } else {
            console.warn(`Tọa độ không hợp lệ cho homestay ${homestayId}:`, mainHomestay?.latitude, mainHomestay?.longitude);
            setMapCenter(getDefaultCoordinates());
            setMapZoom(6);
            setSelectedHomestay(homestayWithCoords);
          }

          const roomsResponse = await axios.get(`http://localhost:8080/api/rooms/homestay/${homestayId}`);
          const rooms = roomsResponse.data;

          // ✅ LỌC CHỈ LẤY PHÒNG CÓ STATUS = TRUE (CHƯA BỊ XÓA)
          const activeRooms = rooms.filter(room => room.status === true);

          newOffers = await Promise.all(rooms.map(async (room) => {
            try {
              const reviewsResponse = await axios.get(
                `http://localhost:8080/api/reviews/room/${homestayId}/${room.roomNumber}`
              );
              const reviews = reviewsResponse.data;
              const averageRating = reviews.length > 0
                ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
                : 0;

              // ✅ LẤY GIÁ THEO SEASONAL PRICING
              const priceData = await getSeasonalPrice(homestayId, room.type, room.price);

              return {
                id: room.roomNumber,
                homestayId: homestayId,
                name: `${mainHomestay.homestayName} - ${room.roomNumber}`,
                type: room.type,
                location: mainHomestay.location,
                price: priceData.price, // Giá sau khi áp dụng seasonal
                basePrice: priceData.basePrice, // Giá gốc
                seasonApplied: priceData.seasonApplied, // Tên mùa được áp dụng
                increaseRate: priceData.increaseRate, // Hệ số tăng
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
            } catch (error) {
              console.error(`Error fetching reviews for room ${room.roomNumber}:`, error);
              return null; // Trả về null nếu có lỗi
            }
          }));
          // Lọc bỏ các phần tử null
          newOffers = newOffers.filter(offer => offer !== null);

        } else {
          const apiUrl = destination
            ? `http://localhost:8080/api/homestays/location?location=${encodeURIComponent(destination)}`
            : 'http://localhost:8080/api/homestays';

          const response = await axios.get(apiUrl);
          let homestays = response.data;

          // Chỉ gọi /nearby nếu userPosition hợp lệ
          if (!destination && userPosition && Array.isArray(userPosition) && isValidCoordinate(userPosition[0], userPosition[1])) {
            const nearbyResponse = await axios.get(
              `http://localhost:8080/api/homestays/nearby?userLatitude=${userPosition[0]}&userLongitude=${userPosition[1]}`
            );
            homestays = nearbyResponse.data;
          }

          const homestaysWithCoords = homestays.map(hs => ({
            ...hs,
            coordinates: isValidCoordinate(hs.latitude, hs.longitude)
              ? [hs.latitude, hs.longitude]
              : getDefaultCoordinates(),
            distance: hs.distance ? `${hs.distance.toFixed(2)} km` : '1.5 km'
          }));
          setDisplayHomestays(homestaysWithCoords);

          const validCoordinates = homestaysWithCoords
            .filter(hs => isValidCoordinate(hs.latitude, hs.longitude))
            .map(hs => hs.coordinates);
          if (validCoordinates.length > 0) {
            const latSum = validCoordinates.reduce((sum, coord) => sum + coord[0], 0);
            const lngSum = validCoordinates.reduce((sum, coord) => sum + coord[1], 0);
            const avgLat = latSum / validCoordinates.length;
            const avgLng = lngSum / validCoordinates.length;

            const distanceFromCenter = Math.sqrt(
              Math.pow(avgLat - 15.9267, 2) + Math.pow(avgLng - 107.9652, 2)
            );
            if (distanceFromCenter > 5) {
              console.warn('Trung bình tọa độ lệch quá xa, dùng fallback:', [avgLat, avgLng]);
              setMapCenter(userPosition && Array.isArray(userPosition) ? userPosition : getFallbackCoordinates());
            } else {
              setMapCenter([avgLat, avgLng]);
            }
            setMapZoom(6);
          } else {
            setMapCenter(userPosition && Array.isArray(userPosition) ? userPosition : getDefaultCoordinates());
            setMapZoom(6);
          }

          newOffers = await Promise.all(homestaysWithCoords.map(async (hs) => {

            const roomsResponse = await axios.get(`http://localhost:8080/api/rooms/homestay/${hs.id}`);
            const rooms = roomsResponse.data;
            const minPrice = rooms.length > 0 ? Math.min(...rooms.map(room => room.price)) : 0;
            // ✅ CHỈ LẤY PHÒNG CÓ STATUS = TRUE
            const activeRooms = rooms.filter(room => room.status === true);

            if (activeRooms.length === 0) {
              return null; // Không có phòng active thì bỏ qua homestay này
            }

            // ✅ TÍNH GIÁ THẤP NHẤT SAU KHI ÁP DỤNG SEASONAL PRICING

            let minPriceRoom = null;

            for (const room of activeRooms) {
              const priceData = await getSeasonalPrice(hs.id, room.type, room.price);
              if (priceData.price < minPrice) {
                minPrice = priceData.price;
                minPriceRoom = {
                  ...room,
                  seasonalPrice: priceData.price,
                  basePrice: priceData.basePrice,
                  seasonApplied: priceData.seasonApplied,
                  increaseRate: priceData.increaseRate
                };
              }
            }

            let totalRating = 0;
            let totalReviews = 0;
            for (const room of rooms) {
              try {
                const reviewsResponse = await axios.get(
                  `http://localhost:8080/api/reviews/room/${hs.id}/${room.roomNumber}`
                );
                const reviews = reviewsResponse.data;
                if (reviews.length > 0) {
                  const roomRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
                  totalRating += roomRating;
                  totalReviews += reviews.length;
                }
              } catch (error) {
                console.error(`Error fetching reviews for room ${room.roomNumber}:`, error);
              }
            }
            const averageRating = rooms.length > 0 ? totalRating / rooms.length : 0;

            return {
              id: hs.id,
              name: hs.homestayName,
              location: hs.location,
              price: minPrice, // Giá thấp nhất sau khi áp dụng seasonal
              basePrice: minPriceRoom?.basePrice || minPrice, // Giá gốc
              seasonApplied: minPriceRoom?.seasonApplied || null, // Mùa được áp dụng
              increaseRate: minPriceRoom?.increaseRate || 1, // Hệ số tăng
              image: hs.images?.[0]?.imageUrl || '/images/placeholder.jpg',
              rating: averageRating,
              reviews: totalReviews,
              distance: hs.distance,
              bookingType: 'Đặt ngay',
              coordinates: hs.coordinates,
              capacity: rooms.length > 0 ? Math.max(...rooms.map(room => room.capacity)) : 0,
            };
          }));
          // Lọc bỏ các homestay null (không có phòng active)
          newOffers = newOffers.filter(offer => offer !== null);
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
  }, [homestayId, destination, filters, applyFilters, userPosition]);

  // Lắng nghe sự kiện xóa phòng từ component khác
  useEffect(() => {
    const handleRoomDeleted = (event) => {
      const { homestayId, roomId } = event.detail;

      // Cập nhật lại offers bằng cách loại bỏ phòng đã xóa
      setOffers(prevOffers =>
        prevOffers.filter(offer =>
          !(offer.homestayId === homestayId && offer.id === roomId)
        )
      );
    };

    // Thêm event listener
    window.addEventListener('roomDeleted', handleRoomDeleted);

    // Cleanup function
    return () => {
      window.removeEventListener('roomDeleted', handleRoomDeleted);
    };
  }, []);

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
                  <option value="distance-asc">Khoảng cách: Gần → Xa</option>
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
                            position: 'relative', // cần để icon trái tim có thể định vị
                          }}
                        >
                          {/* ✅ Thêm trái tim ở góc trên phải */}
                          {!homestayId && (
                            <FavoriteHeart
                              userId={userId}
                              targetId={item.id}
                              targetType="homestay"
                            />
                          )}

                          <Badge bg="primary" className="m-2">
                            {item.name}
                          </Badge>
                        </div>
                      </Col>
                      <Col md={5}>
                        <div className="h-100 d-flex flex-column">
                          <div className="mb-2">
                            <h4 className="text-primary mb-2">
                              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}{' '}
                              <small className="text-muted">mỗi đêm</small>
                            </h4>
                            {/* ✅ HIỂN THỊ THÔNG TIN SEASONAL PRICING */}
                            {item.seasonApplied && item.increaseRate > 1 && (
                              <div className="mb-2">
                                <small className="text-muted">
                                  Giá gốc: <span style={{ textDecoration: 'line-through' }}>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.basePrice)}
                                  </span>
                                </small>
                                <br />
                                <small className="text-success">
                                  🎉 {item.seasonApplied} (x{item.increaseRate})
                                </small>
                              </div>
                            )}
                          </div>
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
                          <div className="d-flex gap-2">
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
                            <Button
                              variant="outline-primary"
                              className="mt-auto align-self-start"
                              onClick={() => setSelectedHomestay({
                                ...item,
                                coordinates: item.coordinates || getDefaultCoordinates(),
                                distance: item.distance || '1.5 km'
                              })}
                            >
                              Xem đường đi
                            </Button>
                          </div>
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
                              <p className="text-muted small mb-2">Khoảng cách: {item.distance}</p>
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
                {userPosition && Array.isArray(userPosition) && selectedHomestay && selectedHomestay.coordinates &&
                  Array.isArray(selectedHomestay.coordinates) && isValidCoordinate(selectedHomestay.coordinates[0], selectedHomestay.coordinates[1]) && (
                    <RoutingMachine
                      userPosition={userPosition}
                      homestayPosition={selectedHomestay.coordinates}
                    />
                  )}
                {displayHomestays.map((hs) => (
                  <Marker
                    key={hs.id}
                    position={hs.coordinates || getDefaultCoordinates()}
                  >
                    <Popup>
                      <div>
                        <h5>{hs.homestayName}</h5>
                        <p><strong>Vị trí:</strong> {hs.location}</p>
                        <p><strong>Địa chỉ:</strong> {hs.address || 'N/A'}</p>
                        <p><strong>Khoảng cách:</strong> {hs.distance}</p>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => setSelectedHomestay({
                            ...hs,
                            coordinates: hs.coordinates || getDefaultCoordinates(),
                            distance: hs.distance || '1.5 km'
                          })}
                        >
                          Xem đường đi
                        </Button>
                        <Link
                          to={`/offer?homestayId=${hs.id}`}
                          className="btn btn-sm btn-primary mt-2"
                        >
                          Xem chi tiết
                        </Link>
                      </div>
                    </Popup>
                  </Marker>
                ))}
                {userPosition && Array.isArray(userPosition) && (
                  <Marker position={userPosition}>
                    <Popup>
                      <div>
                        <h5>Vị trí của bạn</h5>
                      </div>
                    </Popup>
                  </Marker>
                )}
              </MapContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Offer;
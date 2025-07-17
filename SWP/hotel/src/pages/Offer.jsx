// import React, { useState, useEffect, useCallback } from 'react';
// import { Container, Row, Col, Card, Form, Button, Badge, Dropdown } from 'react-bootstrap';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar, faStarHalfAlt, faUsers, faCheckCircle, faBan } from '@fortawesome/free-solid-svg-icons';
// import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
// import axios from 'axios';
// import { useSearchParams, Link } from 'react-router-dom';

// // Fix Leaflet marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// });

// // Hàm ánh xạ tọa độ (giả lập vì backend không cung cấp tọa độ)
// const getCoordinatesByLocation = (location) => {
//   const locationCoordinates = {
//     'Đà Lạt': [11.9417, 108.4419],
//     'Phú Quốc': [10.2271, 103.9532],
//     'Đà Nẵng': [16.0544, 108.2022],
//     'Thành phố Hồ Chí Minh': [10.7769, 106.7009],
//     'Hà Nội': [21.0285, 105.8542],
//   };
//   return locationCoordinates[location] || [16.0, 106.0];
// };

// const Offers = () => {
//   const [searchParams] = useSearchParams();
//   const homestayId = searchParams.get('homestayId');
//   const destination = searchParams.get('destination');
//   const [offers, setOffers] = useState([]);
//   const [homestay, setHomestay] = useState(null);
//   const [availableCapacities, setAvailableCapacities] = useState([]);
//   const [filters, setFilters] = useState({
//     sortBy: 'default',
//     stars: '*',
//     bookingType: 'all',
//     capacity: 'all',
//     priceRange: [0, 5000000],
//     anything: { rating: '', reviews: '', distance: '' },
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Lấy danh sách sức chứa động
//   useEffect(() => {
//     const fetchCapacities = async () => {
//       try {
//         let capacities = new Set();
//         if (homestayId) {
//           const roomsResponse = await axios.get(`http://localhost:8080/api/rooms/homestay/${homestayId}`);
//           roomsResponse.data.forEach(room => capacities.add(room.capacity));
//         } else {
//           const response = await axios.get(
//             destination
//               ? `http://localhost:8080/api/homestays/location?location=${encodeURIComponent(destination)}`
//               : 'http://localhost:8080/api/homestays'
//           );
//           const homestays = response.data;
//           await Promise.all(
//             homestays.map(async (homestay) => {
//               const roomsResponse = await axios.get(`http://localhost:8080/api/rooms/homestay/${homestay.id}`);
//               roomsResponse.data.forEach(room => capacities.add(room.capacity));
//             })
//           );
//         }
//         // Tạo danh sách sức chứa (ví dụ: "1", "2", "3-4", ">4")
//         const capacityOptions = [...capacities].sort((a, b) => a - b).reduce((acc, cap) => {
//           if (cap <= 2) acc.push(cap.toString());
//           else if (cap <= 4) acc.push('3-4');
//           else acc.push('>4');
//           return acc;
//         }, ['all']);
//         setAvailableCapacities([...new Set(capacityOptions)]);
//       } catch (error) {
//         console.error('Failed to fetch capacities:', error);
//       }
//     };

//     fetchCapacities();
//   }, [homestayId, destination]);

//   // Lấy dữ liệu phòng hoặc homestay
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         if (homestayId) {
//           // Lấy thông tin homestay
//           const homestayResponse = await axios.get(`http://localhost:8080/api/homestays/${homestayId}`);
//           const homestayData = homestayResponse.data;
//           setHomestay(homestayData);

//           // Lấy danh sách phòng
//           const roomsResponse = await axios.get(`http://localhost:8080/api/rooms/homestay/${homestayId}`);
//           const rooms = roomsResponse.data;
//           // Lấy đánh giá và thông tin phòng
//           const roomsWithDetails = await Promise.all(
//             rooms.map(async (room) => {
//               const reviewsResponse = await axios.get(
//                 `http://localhost:8080/api/reviews/room/${homestayId}/${room.roomNumber}`
//               );
//               const reviews = reviewsResponse.data;
//               const averageRating = reviews.length > 0
//                 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
//                 : 0;

//               return {
//                 id: room.roomNumber,
//                 homestayId: homestayId,
//                 name: `${homestayData.homestayName} - ${room.roomNumber}`,
//                 type: room.type,
//                 location: homestayData.location,
//                 price: room.price,
//                 capacity: room.capacity,
//                 rating: room.rating || averageRating,
//                 status: room.status,
//                 image: room.images?.[0]?.imageUrl || 'images/default.jpg',
//                 reviews: reviews.length,
//                 distance: '1.5 km',
//                 coordinates: getCoordinatesByLocation(homestayData.location),
//               };
//             })
//           );

//           const filteredRooms = applyFilters(roomsWithDetails, filters);
//           setOffers(filteredRooms);
//         } else {
//           // Lấy danh sách homestay
//           const response = await axios.get(
//             destination
//               ? `http://localhost:8080/api/homestays/location?location=${encodeURIComponent(destination)}`
//               : 'http://localhost:8080/api/homestays'
//           );

//           const homestaysWithDetails = await Promise.all(
//             response.data.map(async (homestay) => {
//               const roomsResponse = await axios.get(`http://localhost:8080/api/rooms/homestay/${homestay.id}`);
//               const rooms = roomsResponse.data;
//               const minPrice = rooms.length > 0
//                 ? Math.min(...rooms.map(room => room.price))
//                 : 0;

//               let averageRating = 0;
//               let totalReviews = 0;
//               for (const room of rooms) {
//                 const reviewsResponse = await axios.get(
//                   `http://localhost:8080/api/reviews/room/${homestay.id}/${room.roomNumber}`
//                 );
//                 const reviews = reviewsResponse.data;
//                 if (reviews.length > 0) {
//                   const roomRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
//                   averageRating += roomRating;
//                   totalReviews += reviews.length;
//                 }
//               }
//               averageRating = rooms.length > 0 ? (averageRating / rooms.length) : 0;

//               let amenities = ['Wi-Fi', 'Bãi đỗ xe', 'Điều hòa'];
//               try {
//                 const amenitiesResponse = await axios.get(`http://localhost:8080/api/amenities/homestay/${homestay.id}`);
//                 amenities = amenitiesResponse.data.map(a => a.typeName);
//               } catch (error) {
//                 console.error(`Failed to fetch amenities for homestay ${homestay.id}:`, error);
//               }

//               return {
//                 id: homestay.id,
//                 name: homestay.homestayName,
//                 location: homestay.location,
//                 price: minPrice,
//                 image: homestay.images?.[0]?.imageUrl || 'images/default.jpg',
//                 rating: averageRating,
//                 reviews: totalReviews,
//                 distance: '1.5 km',
//                 bookingType: 'Đặt ngay',
//                 amenities: amenities,
//                 coordinates: getCoordinatesByLocation(homestay.location),
//               };
//             })
//           );

//           const filteredResults = applyFilters(homestaysWithDetails, filters);
//           setOffers(filteredResults);
//         }
//       } catch (error) {
//         console.error('Failed to fetch data:', error);
//         setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [homestayId, destination, filters]);

//   const applyFilters = useCallback((data, filters) => {
//     let result = [...data];

//     if (filters.stars !== '*') result = result.filter(item => Math.round(item.rating) >= parseInt(filters.stars));
//     if (filters.bookingType !== 'all') result = result.filter(item => item.bookingType === filters.bookingType);
//     if (filters.capacity !== 'all') {
//       if (filters.capacity === '3-4') {
//         result = result.filter(item => item.capacity >= 3 && item.capacity <= 4);
//       } else if (filters.capacity === '>4') {
//         result = result.filter(item => item.capacity > 4);
//       } else {
//         result = result.filter(item => item.capacity === parseInt(filters.capacity));
//       }
//     }
//     result = result.filter(item => item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1]);
//     const { rating, reviews, distance } = filters.anything;
//     if (rating) result = result.filter(item => (item.rating / 5) * 10 >= parseFloat(rating));
//     if (reviews) result = result.filter(item => item.reviews >= parseInt(reviews));
//     if (distance) result = result.filter(item => parseFloat(item.distance) <= parseFloat(distance) || !isNaN(parseFloat(item.distance)));

//     switch (filters.sortBy) {
//       case 'price-asc': result.sort((a, b) => a.price - b.price); break;
//       case 'price-desc': result.sort((a, b) => b.price - b.price); break;
//       case 'location-asc': result.sort((a, b) => a.location.localeCompare(b.location)); break;
//       default: break;
//     }

//     return result;
//   }, []);

//   const handleFilterChange = (category, value) => setFilters(prev => ({ ...prev, [category]: value }));
//   const handleCapacityChange = (value) => setFilters(prev => ({ ...prev, capacity: value }));
//   const handlePriceRangeChange = (e, index) => {
//     const value = parseInt(e.target.value) || 0;
//     setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], prev.priceRange[1]].map((v, i) => i === index ? value : v) }));
//   };
//   const handleAnythingChange = (field, value) => setFilters(prev => ({ ...prev, anything: { ...prev.anything, [field]: value } }));

//   const StarRating = ({ rating }) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;

//     for (let i = 1; i <= 5; i++) {
//       if (i <= fullStars) {
//         stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-warning" />);
//       } else if (i === fullStars + 1 && hasHalfStar) {
//         stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} className="text-warning" />);
//       } else {
//         stars.push(<FontAwesomeIcon key={i} icon={farStar} className="text-warning" />);
//       }
//     }

//     return <div className="d-flex">{stars}</div>;
//   };

//   if (loading) return <div className="text-center py-10">Đang tải dữ liệu...</div>;
//   if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

//   return (
//     <Container className="my-5">
//       <h2 className="mb-4">{homestayId ? `Các phòng tại ${homestay?.homestayName || 'Homestay'}` : 'Ưu đãi chỗ nghỉ'}</h2>

//       <Card className="mb-4 shadow-sm">
//         <Card.Body>
//           <Row className="g-3">
//             <Col md={6} lg={2}>
//               <Form.Group>
//                 <Form.Label>Sắp xếp</Form.Label>
//                 <Form.Select onChange={(e) => handleFilterChange('sortBy', e.target.value)}>
//                   <option value="default">Mặc định</option>
//                   <option value="price-asc">Giá: Thấp → Cao</option>
//                   <option value="price-desc">Giá: Cao → Thấp</option>
//                   <option value="rating-desc">Đánh giá: Cao → Thấp</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col md={6} lg={2}>
//               <Form.Group>
//                 <Form.Label>Đánh giá</Form.Label>
//                 <Form.Select onChange={(e) => handleFilterChange('stars', e.target.value)}>
//                   <option value="*">Tất cả</option>
//                   <option value="3">3★ trở lên</option>
//                   <option value="4">4★ trở lên</option>
//                   <option value="5">5★</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col md={6} lg={2}>
//               <Form.Group>
//                 <Form.Label>Loại đặt</Form.Label>
//                 <Form.Select onChange={(e) => handleFilterChange('bookingType', e.target.value)}>
//                   <option value="all">Tất cả</option>
//                   <option value="Đặt ngay">Đặt ngay</option>
//                   <option value="Yêu cầu đặt">Yêu cầu đặt</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col md={6} lg={3}>
//               <Form.Group>
//                 <Form.Label>Sức chứa</Form.Label>
//                 <Form.Select
//                   value={filters.capacity}
//                   onChange={(e) => handleCapacityChange(e.target.value)}
//                 >
//                   <option value="all">Tất cả</option>
//                   {availableCapacities.length > 0 ? (
//                     availableCapacities.map((capacity, index) => (
//                       <option key={index} value={capacity}>
//                         {capacity === 'all'
//                           ? 'Tất cả'
//                           : capacity === '>4'
//                             ? 'Trên 4 người'
//                             : capacity === '3-4'
//                               ? '3-4 người'
//                               : `${capacity} người`}
//                       </option>
//                     ))
//                   ) : (
//                     <option value="all" disabled>
//                       Không có tùy chọn sức chứa
//                     </option>
//                   )}
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col md={6} lg={3}>
//               <Form.Group>
//                 <Form.Label>Khoảng giá (VND)</Form.Label>
//                 <div className="d-flex align-items-center gap-2">
//                   <Form.Control
//                     type="number"
//                     placeholder="Từ"
//                     value={filters.priceRange[0]}
//                     onChange={(e) => handlePriceRangeChange(e, 0)}
//                     min="0"
//                     max={filters.priceRange[1]}
//                   />
//                   <span>-</span>
//                   <Form.Control
//                     type="number"
//                     placeholder="Đến"
//                     value={filters.priceRange[1]}
//                     onChange={(e) => handlePriceRangeChange(e, 1)}
//                     min={filters.priceRange[0]}
//                     max="10000000"
//                   />
//                 </div>
//                 <div className="d-flex gap-2 mt-2">
//                   <Form.Range
//                     min="0"
//                     max="10000000"
//                     value={filters.priceRange[0]}
//                     onChange={(e) => handlePriceRangeChange(e, 0)}
//                   />
//                   <Form.Range
//                     min="0"
//                     max="10000000"
//                     value={filters.priceRange[1]}
//                     onChange={(e) => handlePriceRangeChange(e, 1)}
//                   />
//                 </div>
//               </Form.Group>
//             </Col>
//           </Row>
//         </Card.Body>
//       </Card>

//       <Row>
//         <Col lg={8}>
//           {offers.length === 0 ? (
//             <Card className="text-center p-5">
//               <Card.Body>
//                 <Card.Title>Không tìm thấy kết quả</Card.Title>
//                 <Card.Text>Hãy thử điều chỉnh bộ lọc của bạn</Card.Text>
//                 <Button
//                   variant="primary"
//                   onClick={() => setFilters({
//                     sortBy: 'default',
//                     stars: '*',
//                     bookingType: 'all',
//                     capacity: 'all',
//                     priceRange: [0, 5000000],
//                     anything: { rating: '', reviews: '', distance: '' },
//                   })}
//                 >
//                   Reset bộ lọc
//                 </Button>
//               </Card.Body>
//             </Card>
//           ) : (
//             <div className="d-flex flex-column gap-4">
//               {offers.map(item => (
//                 <Card key={item.id} className="shadow-sm">
//                   <Card.Body>
//                     <Row>
//                       <Col md={4}>
//                         <div
//                           className="rounded-3 overflow-hidden mb-3 mb-md-0"
//                           style={{
//                             height: '200px',
//                             backgroundImage: `url(${item.image})`,
//                             backgroundSize: 'cover',
//                             backgroundPosition: 'center'
//                           }}
//                         >
//                           <Badge bg="primary" className="m-2">
//                             {item.name}
//                           </Badge>
//                         </div>
//                       </Col>
//                       <Col md={5}>
//                         <div className="h-100 d-flex flex-column">
//                           <h4 className="text-primary mb-2">
//                             {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)} <small className="text-muted">mỗi đêm</small>
//                           </h4>
//                           {homestayId && (
//                             <>
//                               <p className="mb-1">
//                                 <small className="text-muted">Loại phòng:</small> {item.type}
//                               </p>
//                               <p className="mb-1">
//                                 <FontAwesomeIcon icon={faUsers} className="text-primary me-2" />
//                                 Sức chứa: {item.capacity} người
//                               </p>
//                               <p className="mb-1">
//                                 <FontAwesomeIcon
//                                   icon={item.status ? faCheckCircle : faBan}
//                                   className={item.status ? 'text-success me-2' : 'text-danger me-2'}
//                                 />
//                                 Trạng thái: {item.status ? 'Còn trống' : 'Đã đặt'}
//                               </p>
//                             </>
//                           )}
//                           <div className="mb-2">
//                             <StarRating rating={item.rating} />
//                             <small className="text-muted ms-2">({item.reviews} đánh giá)</small>
//                           </div>
//                           <Link
//                             to={homestayId ? `/room/roomdetails/${item.homestayId}/${item.id}` : `/offer?homestayId=${item.id}`}
//                             className="btn btn-primary mt-auto align-self-start"
//                           >
//                             Đặt ngay
//                           </Link>
//                         </div>
//                       </Col>
//                       <Col md={3}>
//                         <Card className="h-100 bg-light">
//                           <Card.Body className="d-flex flex-column justify-content-between">
//                             <div>
//                               <h5 className="text-success">
//                                 Tuyệt vời {((item.rating / 5) * 5).toFixed(1)}
//                               </h5>
//                               <p className="text-muted small mb-2">
//                                 {item.reviews} đánh giá
//                               </p>
//                               <p className="text-muted small mb-2">
//                                 Địa điểm {(item.rating + 1).toFixed(1)}
//                               </p>
//                               <p className="text-muted small">
//                                 {item.distance}, khu vực
//                               </p>
//                             </div>
//                             <div className="text-center">
//                               <Badge pill bg="warning" className="fs-5 p-2">
//                                 {((item.rating / 5) * 5).toFixed(1)}
//                               </Badge>
//                             </div>
//                           </Card.Body>
//                         </Card>
//                       </Col>
//                     </Row>
//                   </Card.Body>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </Col>
//         <Col lg={4}>
//           <Card className="shadow-sm sticky-top" style={{ top: '20px' }}>
//             <Card.Body className="p-0" style={{ height: '600px' }}>
//               <MapContainer
//                 center={offers.length > 0 ? offers[0].coordinates : [16.0, 106.0]}
//                 zoom={offers.length > 0 ? 8 : 5}
//                 scrollWheelZoom={true}
//                 style={{ height: '100%', width: '100%', borderRadius: '0.375rem' }}
//               >
//                 <TileLayer
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />
//                 {offers.length > 0 ? (
//                   offers.map(item => (
//                     <Marker key={item.id} position={item.coordinates}>
//                       <Popup>
//                         <div>
//                           <h5>{item.name}</h5>
//                           <p><strong>Vị trí:</strong> {item.location}</p>
//                           <p><strong>Giá:</strong> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}/đêm</p>
//                         </div>
//                       </Popup>
//                     </Marker>
//                   ))
//                 ) : (
//                   <Popup position={[16.0, 106.0]} className="no-data-popup">
//                     <div>
//                       <h5>Không tìm thấy địa điểm phù hợp</h5>
//                       <p>Hãy thử điều chỉnh bộ lọc của bạn</p>
//                     </div>
//                   </Popup>
//                 )}
//               </MapContainer>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Offers;

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
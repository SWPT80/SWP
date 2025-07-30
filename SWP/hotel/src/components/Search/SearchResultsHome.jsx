  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import { useLocation } from 'react-router-dom';

  import ExperienceCard from './ExperienceCard';
  import RoomCard from './RoomCardHome';
  import ServiceCard from './ServiceCard ';
  import './SearchHome.css';

  const SearchResults = () => {
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 20;

    const location = useLocation();

    useEffect(() => {
      const fetchResults = async () => {
        const params = new URLSearchParams(location.search);
        const type = params.get('type');

        try {
          if (type === 'nhà') {
            const res = await axios.get('http://localhost:8080/api/rooms/search-hotel', { params });
            setResults(res.data);
          } else if (type === 'dịch vụ') {
            const res = await axios.get('http://localhost:8080/api/rooms/search-by-service', {
              params: { serviceName: params.get('serviceName') },
            });
            setResults(res.data);
          } else if (type === 'trải nghiệm') {
            const res = await axios.get('http://localhost:8080/api/rooms/search-experiences', {
              params: {
                location: params.get('location'),
                experienceName: params.get('experienceName'),
                description: params.get('description'),
              },
            });
            setResults(res.data);
          }
          setCurrentPage(1); // reset page khi tìm kiếm mới
        } catch (error) {
          console.error('Lỗi khi tìm kiếm:', error);
          setResults([]);
        }
      };

      fetchResults();
    }, [location.search]);

    const renderCard = (item, index) => {
  const type = new URLSearchParams(location.search).get('type');
  console.log('Render item:', item);
  switch (type) {
    case 'trải nghiệm':
      return <ExperienceCard key={index} data={item} />;
    case 'dịch vụ':
      return <ServiceCard key={index} service={item} />;
    case 'nhà':
    default:
      return <RoomCard key={index} room={item} />;
  }
};


    // Pagination logic
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
    const totalPages = Math.ceil(results.length / resultsPerPage);

    return (
      <div className="px-6 py-10">
        <h2 className="text-2xl font-bold mb-4">🔍 Kết quả tìm kiếm</h2>
        {results.length === 0 ? (
          <p>Không tìm thấy kết quả.</p>
        ) : (
          <>
            <div className="search-grid">
              {currentResults.map((item, index) => renderCard(item, index))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                ◀
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="page-btn"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                ▶
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  export default SearchResults;

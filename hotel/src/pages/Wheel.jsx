import React, { useState, useRef } from 'react';
import axios from '../utils/axiosConfig';
import { useAuth } from '../context/AuthContext';

const Wheel = () => {
  const { isLoggedIn } = useAuth();
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);
  const wheelRef = useRef(null);

  const prizes = [
    { name: 'Giải nhất', discount: 0.50 },
    { name: 'Giải nhì', discount: 0.30 },
    { name: 'Giải ba', discount: 0.20 },
    { name: 'Giải khuyến khích', discount: 0.10 },
    { name: 'Chúc may mắn lần sau', discount: 0.00 },
    { name: 'Giải đặc biệt', discount: 0.75 }
  ];

  const spinWheel = async () => {
    if (spinning || !isLoggedIn) return;

    setSpinning(true);
    setResult(null);

    try {
      const response = await axios.post('/api/lucky-wheel/spin', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      const prize = response.data;
      const prizeIndex = prizes.findIndex(p => p.name === prize.voucherName.split('-')[0]);

      // Số vòng quay ngẫu nhiên (5-10 vòng)
      const spins = 5 + Math.floor(Math.random() * 5);
      // Góc dừng dựa trên chỉ số giải thưởng
      const segmentAngle = 360 / prizes.length;
      const finalAngle = prizeIndex * segmentAngle;
      // Tổng góc quay
      const totalRotation = rotation + spins * 360 + finalAngle;

      setRotation(totalRotation);

      setTimeout(() => {
        setSpinning(false);
        setResult(prize.discount > 0
          ? `Chúc mừng bạn đã trúng: ${prize.voucherName} (Giảm ${prize.discount * 100}%)!`
          : 'Chúc may mắn lần sau!');
      }, 3000); // Thời gian quay 3 giây
    } catch (error) {
      console.error('Error spinning wheel:', error);
      setSpinning(false);
      setResult('Lỗi: Không thể quay. Vui lòng thử lại.');
    }
  };

  const segmentAngle = 360 / prizes.length;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
      padding: '20px'
    }}>
      <h1 style={{ marginBottom: '30px' }}>Vòng Quay May Mắn</h1>
      
      <div style={{
        position: 'relative',
        width: '300px',
        height: '300px',
        marginBottom: '30px'
      }}>
        {/* Vòng quay */}
        <div
          ref={wheelRef}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 3s ease-out',
            transform: `rotate(${rotation}deg)`,
            boxShadow: '0 0 10px rgba(0,0,0,0.3)'
          }}
        >
          {prizes.map((prize, index) => {
            const startAngle = index * segmentAngle;
            const endAngle = (index + 1) * segmentAngle;
            
            // Màu sắc ngẫu nhiên cho mỗi phần
            const hue = (index * (360 / prizes.length)) % 360;
            const color = `hsl(${hue}, 70%, 50%)`;
            
            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  width: '50%',
                  height: '50%',
                  left: '50%',
                  top: '0',
                  transformOrigin: 'left bottom',
                  transform: `rotate(${startAngle}deg) skewY(${90 - segmentAngle}deg)`,
                  backgroundColor: color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box',
                  paddingLeft: '30px'
                }}
              >
                <span style={{
                  transform: `skewY(${segmentAngle - 90}deg) rotate(${segmentAngle / 2}deg)`,
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  textAlign: 'center'
                }}>
                  {prize.name}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Con trỏ */}
        <div style={{
          position: 'absolute',
          top: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0',
          height: '0',
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: '20px solid red',
          zIndex: '10'
        }} />
      </div>
      
      <button
        onClick={spinWheel}
        disabled={spinning || !isLoggedIn}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: (spinning || !isLoggedIn) ? '#ccc' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: (spinning || !isLoggedIn) ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.3s'
        }}
      >
        {spinning ? 'Đang quay...' : 'Quay ngay!'}
      </button>
      
      {result && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: result.includes('Lỗi') ? '#dc3545' : '#4CAF50',
          color: 'white',
          borderRadius: '5px',
          fontWeight: 'bold'
        }}>
          {result}
        </div>
      )}
    </div>
  );
};

export default Wheel;
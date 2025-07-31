import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import FavoriteListModal from './FavoriteListModal';
import AuthModal from './LoginSignupForm';
import LoginRequiredModal from './LoginRequiredModal';
import { useAuth } from '../context/AuthContext'; // 🔥 import context
import CreateFavoriteListModal from './CreateFavoriteListModal'; // 🧩 nhớ import


const FavoriteHeart = ({ targetId, targetType, size = 20, onToggle }) => {
  const { user, isLoggedIn, checkAuth } = useAuth(); // 🔥 lấy từ context
  const userId = user?.id || null;

  const [favorited, setFavorited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSelectList, setShowSelectList] = useState(false);
  const [showCreateList, setShowCreateList] = useState(false);


  useEffect(() => {
    console.log('👤 FavoriteHeart - user:', user);
    console.log('🔑 FavoriteHeart - userId:', userId);
  }, [user]);
  // ✅ Check trạng thái yêu thích mỗi khi userId thay đổi
  useEffect(() => {
    if (!userId) {
      setFavorited(false); // Đăng xuất thì reset icon
      return;
    }

    const checkFavorite = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/favorites/is-favorited`, {
          params: { userId, targetId, targetType }
        });
        setFavorited(res.data === true);
      } catch (err) {
        console.error('Check favorite failed:', err);
      }
    };

    checkFavorite();
  }, [userId, targetId, targetType]);

  // ✅ Xử lý nhấn trái tim
  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent?.stopImmediatePropagation();

    if (!userId) {
      setShowWarningModal(true); // chưa login thì cảnh báo
      return;
    }

    if (loading) return;

    if (favorited) {
      setLoading(true);
      axios.post(`http://localhost:8080/api/favorites/toggle`, {
        userId,
        targetId,
        targetType
      }).then(() => {
        setFavorited(false);
        onToggle?.(false);
      }).catch(err => {
        console.error('Toggle failed:', err);
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setShowSelectList(true);
    }
  };

  const handleAddToList = async (listId) => {
    try {
      setLoading(true);
      await axios.post(`http://localhost:8080/api/favorites/add-to-list`, {
        userId,
        targetId,
        targetType,
        listId
      });
      setFavorited(true);
      onToggle?.(true);
    } catch (err) {
      console.error('Add to list failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleListCreated = (newList) => {
    handleAddToList(newList.id);
    setShowCreateList(false);
    setShowSelectList(false);
  };

  const handleLoginSuccess = async () => {
    await checkAuth();                     // cập nhật AuthContext
    setShowAuthModal(false);
  
    // 🔁 Delay để đảm bảo context đã cập nhật kịp
    setTimeout(() => {
      setShowSelectList(true);
    }, 200);
  };

  return (
    <>
      <div
        onClick={toggle}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 10,
          cursor: 'pointer'
        }}
      >
        {favorited ? (
          <FaHeart size={size} color="#ff385c" />
        ) : (
          <FaRegHeart size={size} color="#ffffff" style={{ stroke: '#000', strokeWidth: '15px' }} />
        )}
      </div>

      <LoginRequiredModal
        show={showWarningModal}
        onClose={() => {
          setShowWarningModal(false);
          setShowAuthModal(true);
        }}
      />

      <AuthModal
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleLoginSuccess}
      />

      <FavoriteListModal
        show={showSelectList}
        onClose={() => setShowSelectList(false)}
        userId={userId}
        targetId={targetId}
        targetType={targetType}
        onAdded={() => {
          setFavorited(true);
          setShowSelectList(false);
          onToggle?.(true);
        }}
        onCreateNew={() => {
          setShowSelectList(false);
          setShowCreateList(true);
        }}
      />

      <CreateFavoriteListModal
        show={showCreateList}
        onClose={() => setShowCreateList(false)}
        userId={userId}
        onCreated={(newList) => {
          handleAddToList(newList.id);     // Thêm luôn mục vào danh sách vừa tạo
          setShowCreateList(false);        // Ẩn modal
          setFavorited(true);              // Đánh dấu đã yêu thích
          onToggle?.(true);
        }}
      />
    </>
  );
};

export default FavoriteHeart;

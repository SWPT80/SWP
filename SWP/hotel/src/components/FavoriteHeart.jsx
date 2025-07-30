import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import FavoriteListModal from './FavoriteListModal';
import AuthModal from './LoginSignupForm';
import LoginRequiredModal from './LoginRequiredModal';
import { useAuth } from '../context/AuthContext';
import CreateFavoriteListModal from './CreateFavoriteListModal';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const FavoriteHeart = ({ targetId, targetType, size = 20, onToggle }) => {
  const { user, isLoggedIn, checkAuth } = useAuth();
  const userId = user?.id || null;

  const [favorited, setFavorited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSelectList, setShowSelectList] = useState(false);
  const [showCreateList, setShowCreateList] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) {
      setFavorited(false);
      return;
    }

    const checkFavorite = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/favorites/is-favorited`, {
          params: { userId, targetId, targetType }
        });
        setFavorited(res.data === true);
        setError('');
      } catch (err) {
        console.error('Lỗi khi kiểm tra trạng thái yêu thích:', err);
        setError('Không thể kiểm tra trạng thái yêu thích.');
      }
    };

    checkFavorite();
  }, [userId, targetId, targetType]);

  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent?.stopImmediatePropagation();

    if (!userId) {
      setShowWarningModal(true);
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
        setError('');
      }).catch(err => {
        console.error('Lỗi khi bỏ yêu thích:', err);
        setError('Không thể bỏ yêu thích. Vui lòng thử lại.');
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
      setError('');
    } catch (err) {
      console.error('Lỗi khi thêm vào danh sách:', err);
      setError('Không thể thêm vào danh sách yêu thích.');
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
    await checkAuth();
    setShowAuthModal(false);
    setShowSelectList(true);
  };

  return (
    <>
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible style={{ position: 'absolute', top: '50px', left: '50%', transform: 'translateX(-50%)', zIndex: 10000, maxWidth: '500px' }}>
          {error}
        </Alert>
      )}
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
          handleAddToList(newList.id);
          setShowCreateList(false);
          setFavorited(true);
          onToggle?.(true);
        }}
      />
    </>
  );
};

export default FavoriteHeart;
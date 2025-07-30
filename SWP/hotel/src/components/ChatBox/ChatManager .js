import React, { useState, useEffect } from 'react';
import Chatbox from './ChatBox';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatManager.css';

const ChatManager = () => {
  const [chatboxes, setChatboxes] = useState([
    {
      id: 'ai-chat',
      type: 'ai',
      isOpen: false,
      isActive: false,
      title: 'Chat AI hỗ trợ'
    }
  ]);
  const [activeChatIndex, setActiveChatIndex] = useState(null);
  const [activeChatTypes, setActiveChatTypes] = useState({
    aiChat: false,
    userChats: []
  });
  const [error, setError] = useState(null);

  // Xử lý khi chatbox được toggle
  const handleChatToggle = (chatIndex, isOpen) => {
    setChatboxes(prev =>
      prev.map((chat, index) =>
        index === chatIndex
          ? { ...chat, isOpen }
          : chat
      )
    );

    // Đặt chatbox đang mở làm active
    if (isOpen) {
      setActiveChatIndex(chatIndex);
      setChatboxes(prev =>
        prev.map((chat, index) => ({
          ...chat,
          isActive: index === chatIndex
        }))
      );
    } else {
      // Nếu đóng chatbox active, tìm chatbox khác đang mở
      const openChats = chatboxes.filter(chat => chat.isOpen);
      if (openChats.length > 1) {
        const nextActiveIndex = chatboxes.findIndex(
          (chat, index) => chat.isOpen && index !== chatIndex
        );
        setActiveChatIndex(nextActiveIndex);
        setChatboxes(prev =>
          prev.map((chat, index) => ({
            ...chat,
            isActive: index === nextActiveIndex
          }))
        );
      } else {
        setActiveChatIndex(null);
        setChatboxes(prev =>
          prev.map(chat => ({ ...chat, isActive: false }))
        );
      }
    }
  };

  // Thêm chatbox mới
  const addChatbox = (newChat) => {
    if (!newChat.id || !newChat.title) {
      setError("Không thể thêm chatbox: Thiếu ID hoặc tiêu đề.");
      return;
    }
    setChatboxes(prev => [...prev, {
      ...newChat,
      isOpen: false,
      isActive: false
    }]);
    setError(null);
  };

  // Xóa chatbox
  const removeChatbox = (chatId) => {
    const chatExists = chatboxes.some(chat => chat.id === chatId);
    if (!chatExists) {
      setError("Không tìm thấy chatbox để xóa.");
      return;
    }
    setChatboxes(prev => prev.filter(chat => chat.id !== chatId));
    setError(null);
  };

  // Tính toán vị trí cho từng chatbox
  const getVisibleChatboxes = () => {
    return chatboxes.map((chat, index) => ({
      ...chat,
      positionIndex: index
    }));
  };

  // Tính toán vị trí cho AI Chatbox dựa trên số lượng user chat đang mở
  const getAIChatPosition = () => {
    const openUserChats = activeChatTypes.userChats.filter(chat => chat.isOpen).length;
    return {
      positionIndex: openUserChats,
      zIndex: 99999 - openUserChats
    };
  };

  // Handle AI chat toggle
  const handleAIChatToggle = (isOpen) => {
    setActiveChatTypes(prev => ({
      ...prev,
      aiChat: isOpen
    }));
  };

  // Handle user chat updates từ ChatPopupManager
  const handleUserChatsUpdate = (userChats) => {
    setActiveChatTypes(prev => ({
      ...prev,
      userChats: userChats
    }));
  };

  const aiChatPosition = getAIChatPosition();

  return (
    <div className="chat-manager">
      {error && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10000,
            maxWidth: '500px',
            width: '90%',
          }}
        >
          <Alert variant="danger" onClose={() => setError(null)} dismissible>
            {error}
          </Alert>
        </div>
      )}

      {getVisibleChatboxes().map((chat, index) => (
        <Chatbox
          key={chat.id}
          positionIndex={chat.positionIndex}
          onToggle={handleChatToggle}
          isActive={chat.isActive}
          chatData={chat}
        />
      ))}

      {/* Debug info */}
      {process.env.NODE_ENV === 'development' && (
        <div
          style={{
            position: 'fixed',
            top: '10px',
            left: '10px',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '12px',
            zIndex: 99999
          }}
        >
          <div>Chat đang hoạt động: {activeChatIndex !== null ? activeChatIndex : 'Không có'}</div>
          <div>Số chat đang mở: {chatboxes.filter(c => c.isOpen).length}</div>
        </div>
      )}
    </div>
  );
};

export default ChatManager;
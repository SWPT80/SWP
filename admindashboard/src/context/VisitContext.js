// Provider component
import React, { createContext, useContext, useState, useEffect } from "react";
// Tạo context
const VisitContext = createContext();
export const VisitProvider = ({ children }) => {
  const [visitCount, setVisitCount] = useState(0);
  // Load visit count từ localStorage khi khởi động
  useEffect(() => {
    const savedCount = localStorage.getItem("visitCount");
    if (savedCount) {
      setVisitCount(parseInt(savedCount, 10));
    }
    incrementVisit(); // Tăng lượt truy cập khi trang được load
  }, []);
  // Lưu lượt truy cập vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("visitCount", visitCount.toString());
  }, [visitCount]);
  // Hàm tăng lượt truy cập
  const incrementVisit = () => {
    setVisitCount((prev) => prev + 1);
  };
  return (
    <VisitContext.Provider value={{ visitCount, incrementVisit }}>
      {children}
    </VisitContext.Provider>
  );
};
// Hook tiện ích
export const useVisit = () => useContext(VisitContext);

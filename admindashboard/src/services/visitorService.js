import axios from "axios";

export const getVisitorStats = async (startDate, endDate) => {
  const response = await axios.get("/api/visitors/stats", {
    params: {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    },
  });
  return response.data;
};

export const trackVisit = async () => {
  // Lấy IP từ client (thông qua service như https://ipapi.co/json/)
  const ipResponse = await fetch("https://ipapi.co/json/");
  const ipData = await ipResponse.json();

  await axios.post("/api/visitors/track", {
    ipAddress: ipData.ip,
    pageUrl: window.location.pathname,
  });
};

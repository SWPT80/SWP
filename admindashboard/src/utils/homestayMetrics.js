export const calculateRevPAR = (revenue, availableRooms) => {
  return revenue / (availableRooms || 1);
};

export const calculateCLV = (avgBookingValue, repeatRate) => {
  return avgBookingValue * (1 / (1 - repeatRate));
};

export const detectAnomalies = (current, historicalAvg, threshold = 0.3) => {
  const diff = (current - historicalAvg) / historicalAvg;
  return Math.abs(diff) >= threshold ? diff : null;
};

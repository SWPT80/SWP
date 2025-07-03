export const calculateMetrics = (data) => {
  const totalRevenue = data.bookings.reduce(
    (sum, booking) => sum + booking.revenue,
    0
  );
  const totalNights = data.bookings.reduce(
    (sum, booking) => sum + booking.nights,
    0
  );
  const totalRooms = data.roomTypes.reduce((sum, type) => sum + type.count, 0);

  const adr = totalRevenue / totalNights;
  const revpar = totalRevenue / totalRooms;
  const occupancyRate = (data.bookings.length / (totalRooms * 30)) * 100;

  return {
    adr: Math.round(adr),
    revpar: Math.round(revpar),
    occupancyRate: occupancyRate.toFixed(1),
  };
};

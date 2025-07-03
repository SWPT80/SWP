import axios from "axios";

export const fetchAdvancedStats = async (params) => {
  const { data } = await axios.get("/api/analytics", { params });
  return {
    bookings: {
      total: data.total_bookings,
      trend: data.booking_trend,
      byLocation: data.booking_by_location,
    },
    revenue: {
      total: `$${data.total_revenue}`,
      change: data.revenue_change_percent,
      byMonth: data.monthly_revenue,
    },
    // Các metrics khác
  };
};

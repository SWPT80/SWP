package Homestay.model;

public enum BookingStatus {
    PENDING,      // khách vừa đặt – chờ host duyệt
    CONFIRMED,    // host đã duyệt
    CHECKED_IN,   // khách đã nhận phòng
    COMPLETED,    // khách trả phòng
    CANCELLED     // khách/host hủy
}

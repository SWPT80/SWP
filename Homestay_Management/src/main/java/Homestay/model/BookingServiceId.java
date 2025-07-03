package Homestay.model;

import java.io.Serializable;
import java.util.Objects;

public class BookingServiceId implements Serializable {
    private Integer booking;
    private Integer service;

    public BookingServiceId() {}

    public BookingServiceId(Integer booking, Integer service) {
        this.booking = booking;
        this.service = service;
    }

    // equals & hashCode
    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        BookingServiceId that = (BookingServiceId) o;
        return Objects.equals(booking, that.booking) && Objects.equals(service, that.service);
    }

    @Override
    public int hashCode() {
        return Objects.hash(booking, service);
    }
}
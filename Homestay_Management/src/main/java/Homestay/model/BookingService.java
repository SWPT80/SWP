package Homestay.model;

import jakarta.persistence.*;

@Entity
@IdClass(BookingServiceId.class)
@Table(name = "BookingServices")
public class BookingService {
    @Id
    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @Id
    @ManyToOne
    @JoinColumn(name = "service_id")
    private HomestayService service;

    @Column(name = "quantity")
    private int quantity;

    // Getters and Setters
    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public HomestayService getService() {
        return service;
    }

    public void setService(HomestayService service) {
        this.service = service;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
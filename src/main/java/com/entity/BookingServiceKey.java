package com.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class BookingServiceKey implements Serializable {

    @Column(name = "booking_id")
    private Integer bookingId;

    @Column(name = "service_id") // đổi từ option_id sang service_id
    private Integer serviceId;

    // Constructors, equals(), hashCode()...
}

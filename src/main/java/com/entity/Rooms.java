package com.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@IdClass(RoomId.class)
@Table(name = "Rooms", schema = "dbo")
public class Rooms {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ✅ Auto-increment
    private int homestayId;

    @Id
    private String roomId;
    @ManyToOne
    @JoinColumn(name = "homestay_id", insertable = false, updatable = false)
    private Homestays homestay;
    @Column(name = "type")
    private String roomType;

    @Column(name = "capacity")
    private int roomCapacity;

    @Column(name = "price",precision = 10, scale = 2) // Tuỳ vào độ chính xác mong muốn
    private BigDecimal roomPrice;

    @Column(name = "rating")
    private double rating;

    @Column(name = "status")
    private boolean status;

    // === GETTERS & SETTERS ===

    public int getHomestayId() {
        return homestayId;
    }

    public void setHomestayId(int homestayId) {
        this.homestayId = homestayId;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public int getRoomCapacity() {
        return roomCapacity;
    }

    public void setRoomCapacity(int roomCapacity) {
        this.roomCapacity = roomCapacity;
    }

    public BigDecimal getRoomPrice() {
        return roomPrice;
    }

    public void setRoomPrice(BigDecimal roomPrice) {
        this.roomPrice = roomPrice;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Homestays getHomestay() {
        return homestay;
    }

    public void setHomestay(Homestays homestay) {
        this.homestay = homestay;
    }
}

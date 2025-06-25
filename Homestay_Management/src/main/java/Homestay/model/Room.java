package Homestay.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@IdClass(RoomId.class)
@Table(name = "Rooms")
public class Room {
    @Id
    @Column(name = "homestay_id")
    private Integer homestayId;

    @Id
    @Column(name = "room_number")
    private String roomNumber;

    @Column(name = "type")
    private String type;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "status")
    private Boolean status;

    // Getters and Setters

    public Integer getHomestayId() {
        return homestayId;
    }

    public void setHomestayId(Integer homestayId) {
        this.homestayId = homestayId;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}

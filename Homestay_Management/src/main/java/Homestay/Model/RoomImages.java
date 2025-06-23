package Homestay.Model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "RoomImages")
public class RoomImages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "roomImage_id")
    private Integer roomImageId;

    @Column(name = "room_number")
    private String roomNumber;

    @Column(name = "homestay_id")
    private Integer homestayId;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "homestay_id", referencedColumnName = "homestay_id", insertable = false, updatable = false),
            @JoinColumn(name = "room_number", referencedColumnName = "room_number", insertable = false, updatable = false)
    })
    private Room room;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "description")
    private String description;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Getters and Setters

    public Integer getRoomImageId() {
        return roomImageId;
    }

    public void setRoomImageId(Integer roomImageId) {
        this.roomImageId = roomImageId;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public Integer getHomestayId() {
        return homestayId;
    }

    public void setHomestayId(Integer homestayId) {
        this.homestayId = homestayId;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

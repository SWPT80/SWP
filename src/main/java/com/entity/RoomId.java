package com.entity;

import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.*;

@Embeddable
public class RoomId implements Serializable {

    @Column(name = "homestay_id")
    private int homestayId;

    @Column(name = "room_number")
    private String roomId;

    public RoomId() {}

    public RoomId(int homestayId, String roomId) {
        this.homestayId = homestayId;
        this.roomId = roomId;
    }

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RoomId)) return false;
        RoomId that = (RoomId) o;
        return homestayId == that.homestayId && Objects.equals(roomId, that.roomId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(homestayId, roomId);
    }
}

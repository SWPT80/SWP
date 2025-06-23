package Homestay.Model;

import java.io.Serializable;
import java.util.Objects;

public class RoomId implements Serializable {
    private Integer homestayId;
    private String roomNumber;

    public RoomId() {}

    public RoomId(Integer homestayId, String roomNumber) {
        this.homestayId = homestayId;
        this.roomNumber = roomNumber;
    }

    // equals & hashCode
    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        RoomId roomId = (RoomId) o;
        return Objects.equals(homestayId, roomId.homestayId) && Objects.equals(roomNumber, roomId.roomNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(homestayId, roomNumber);
    }
}

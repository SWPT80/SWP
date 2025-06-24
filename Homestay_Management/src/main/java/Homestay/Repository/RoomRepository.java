package Homestay.Repository;

import Homestay.Model.Room;
import Homestay.Model.RoomId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, RoomId> {
    List<Room> findByHomestayId(Integer homestayId);
    Room findByHomestayIdAndRoomNumber(Integer homestayId, String roomNumber);
}

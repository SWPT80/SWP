package Homestay.repository;

import Homestay.model.Room;
import Homestay.model.RoomId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, RoomId> {
    List<Room> findByHomestayId(Integer homestayId);
    Room findByHomestayIdAndRoomNumber(Integer homestayId, String roomNumber);
}

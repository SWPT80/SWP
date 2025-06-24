package Homestay.Repository;

import Homestay.Model.ReviewRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRoomRepository extends JpaRepository<ReviewRoom, Integer> {
    List<ReviewRoom> findByRoom_RoomNumber(String roomNumber);
    List<ReviewRoom> findByRoom_HomestayId(Integer homestayId);
}
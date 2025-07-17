package com.traexcohomestay.hoteltraexco.repository;

import com.traexcohomestay.hoteltraexco.model.Room;
import com.traexcohomestay.hoteltraexco.model.RoomId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, RoomId> {
    List<Room> findByHomestay_HomestayId(Integer homestayId);
    List<Room> findByHomestayHostId(Integer hostId);
    List<Room> findByHomestay_HomestayIdAndType(int homestayId, String roomType);
    @Query("SELECT DISTINCT r.type FROM Room r WHERE r.homestay.hostId = :hostId")
    List<String> findDistinctRoomTypesByHostId(@Param("hostId") int hostId);
    Optional<Room> findFirstByHomestay_HomestayIdAndType(int homestayId, String type);
}
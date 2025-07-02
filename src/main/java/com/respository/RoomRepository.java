package com.respository;

import com.entity.Rooms;
import com.entity.RoomId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Rooms, RoomId> {
    List<Rooms> findByHomestayHostId(Integer hostId);
    List<Rooms> findByHomestayIdAndRoomType(int homestayId, String roomType);
    @Query("SELECT DISTINCT r.roomType FROM Rooms r WHERE r.homestay.hostId = :hostId")
    List<String> findDistinctRoomTypesByHostId(@Param("hostId") int hostId);
}


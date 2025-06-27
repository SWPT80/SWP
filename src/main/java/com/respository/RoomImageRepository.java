package com.respository;


import com.entity.RoomImage;
import com.entity.Rooms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomImageRepository extends JpaRepository<RoomImage, Integer> {
    List<RoomImage> findByRooms(Rooms rooms);
}

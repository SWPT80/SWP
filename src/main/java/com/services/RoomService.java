package com.services;

import com.dto.request.RoomCreateRequest;
import com.dto.request.RoomUpdateRequest;
import com.entity.RoomId;
import com.entity.Rooms;
import com.respository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;

    public Rooms createRoom(RoomCreateRequest request) {
        Rooms newRoom = new Rooms();
        newRoom.setRoomType(request.getRoomType());
        newRoom.setRoomCapacity(request.getRoomCapacity());
        newRoom.setRoomPrice(request.getRoomPrice());
        newRoom.setRating(request.getRating());
        newRoom.setStatus(request.isStatus());
        return roomRepository.save(newRoom);
    }
    public List<Rooms> getAllRooms() {
        return roomRepository.findAll();
    }
    public Rooms getRoomById(int homestayId, String roomId) {
        RoomId id = new RoomId(homestayId, roomId); // ✅ Tạo đối tượng khóa chính phức hợp
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
    }
    public Rooms updateRoom(int homestayId, String roomId, RoomUpdateRequest request) {
        Rooms room = getRoomById(homestayId, roomId);
        if (room == null) {
            throw new RuntimeException("Room not found");
        }

        if (request.getRoomPrice() != null) room.setRoomPrice(request.getRoomPrice());
        if (request.getRoomCapacity() != 0) room.setRoomCapacity(request.getRoomCapacity());
        if (request.getRating() != 0) room.setRating(request.getRating());
        if (request.isStatus() != true) room.setStatus(request.isStatus());
        if (request.getRoomType() != null) room.setRoomType(request.getRoomType());

        return roomRepository.save(room);
    }
    public void deleteRoom(int homestayId, String roomId) {
        RoomId id = new RoomId(homestayId, roomId);
        Rooms room = roomRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Room not found"));

        try {
            // Soft delete: set status = false thay vì xóa thật
            room.setStatus(false);
            roomRepository.save(room);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error occurred during soft delete.");
        }
    }
}

package com.traexcohomestay.hoteltraexco.controller;

import com.traexcohomestay.hoteltraexco.dto.RoomDTO;
import com.traexcohomestay.hoteltraexco.dto.RoomSearchDTO;
import com.traexcohomestay.hoteltraexco.dto.RoomDetailsDTO;
import com.traexcohomestay.hoteltraexco.dto.request.RoomCreateRequest;
import com.traexcohomestay.hoteltraexco.dto.request.RoomUpdateRequest;
import com.traexcohomestay.hoteltraexco.dto.response.RoomResponseWithImages;
import com.traexcohomestay.hoteltraexco.model.Room;
import com.traexcohomestay.hoteltraexco.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    @Autowired
    private RoomService roomService;

    @GetMapping("/{homestayId}/{roomNumber}")
    public ResponseEntity<RoomDetailsDTO> getRoomDetails(
            @PathVariable Integer homestayId,
            @PathVariable String roomNumber) {
        return ResponseEntity.ok(roomService.getRoomDetails(homestayId, roomNumber));
    }

    @GetMapping("/homestay/{homestayId}")
    public ResponseEntity<List<RoomDTO>> getRoomsByHomestayId(@PathVariable Integer homestayId) {
        return ResponseEntity.ok(roomService.getRoomsByHomestayId(homestayId));
    }
    @PostMapping
    public ResponseEntity<RoomDTO> createRoom(@RequestBody RoomCreateRequest request) {
        RoomDTO createdRoom = roomService.createRoom(request);
        return ResponseEntity.ok(createdRoom);
    }

    @GetMapping("/by-id/{homestayId}/{roomId}")
    public Room getRoom(@PathVariable int homestayId, @PathVariable String roomId) {
        return roomService.getRoomById(homestayId, roomId);
    }

    @PutMapping("/{homestayId}/{roomId}")
    public ResponseEntity<RoomDTO> updateRoom(@PathVariable int homestayId,
                                              @PathVariable String roomId,
                                              @RequestBody RoomUpdateRequest request) {
        Room updatedRoom = roomService.updateRoom(homestayId, roomId, request);

        // Chuyển sang DTO trước khi trả
        RoomDTO dto = new RoomDTO();
        dto.setHomestayId(updatedRoom.getId().getHomestayId());
        dto.setRoomNumber(updatedRoom.getId().getRoomNumber());
        dto.setType(updatedRoom.getType());
        dto.setCapacity(updatedRoom.getCapacity());
        dto.setPrice(updatedRoom.getPrice());
        dto.setRating(updatedRoom.getRating());
        dto.setStatus(updatedRoom.getStatus());
        dto.setImages(null); // nếu có ảnh thì load sau

        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{homestayId}/{roomId}")
    public ResponseEntity<String> deleteRoom(@PathVariable int homestayId, @PathVariable String roomId) {
        roomService.deleteRoom(homestayId, roomId);
        return ResponseEntity.ok("Room marked as inactive");
    }
    @GetMapping("/host/{hostId}")
    public List<RoomResponseWithImages> getRoomsByHost(@PathVariable Integer hostId) {
        return roomService.getRoomsByHostId(hostId);
    }
}
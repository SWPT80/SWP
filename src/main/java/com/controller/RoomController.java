package com.controller;

import com.dto.request.RoomCreateRequest;
import com.dto.request.RoomUpdateRequest;
import com.entity.Rooms;
import com.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    // CREATE
    @PostMapping
    public Rooms createRoom(@RequestBody RoomCreateRequest request) {
        return roomService.createRoom(request);
    }

    // READ ALL
    @GetMapping("/rooms")
    public List<Rooms> getAllRooms() {
        return roomService.getAllRooms();
    }

    // READ ONE (dùng @PathVariable đúng)
    @GetMapping("/{homestayId}/{roomId}")
    public Rooms getRoomById(@PathVariable int homestayId, @PathVariable String roomId) {
        return roomService.getRoomById(homestayId, roomId);
    }

    // UPDATE
    @PutMapping("/{homestayId}/{roomId}")
    public Rooms updateRoom(@PathVariable int homestayId,
                            @PathVariable String roomId,
                            @RequestBody RoomUpdateRequest request) {
        return roomService.updateRoom(homestayId, roomId, request);
    }

    // DELETE
    @DeleteMapping("/{homestayId}/{roomId}")
    public ResponseEntity<String> deleteRoom(@PathVariable int homestayId, @PathVariable String roomId) {
        try {
            roomService.deleteRoom(homestayId, roomId);
            return ResponseEntity.ok("Room status set to inactive (soft deleted) successfully");
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        }
    }
}

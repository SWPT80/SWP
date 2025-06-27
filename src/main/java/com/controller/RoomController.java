package com.controller;

import com.dto.request.RoomCreateRequest;
import com.dto.request.RoomUpdateRequest;
import com.dto.response.RoomResponseWithImages;
import com.entity.Rooms;
import com.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/rooms")
@CrossOrigin(origins = "http://localhost:3000")
public class RoomController {

    @Autowired private RoomService roomService;

    @PostMapping
    public Rooms createRoom(@RequestBody RoomCreateRequest request) {
        return roomService.createRoom(request);
    }


    @GetMapping("/{homestayId}/{roomId}")
    public Rooms getRoom(@PathVariable int homestayId, @PathVariable String roomId) {
        return roomService.getRoomById(homestayId, roomId);
    }

    @PutMapping("/{homestayId}/{roomId}")
    public Rooms updateRoom(@PathVariable int homestayId,
                            @PathVariable String roomId,
                            @RequestBody RoomUpdateRequest request) {
        return roomService.updateRoom(homestayId, roomId, request);
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


package com.services;

import com.dto.request.RoomCreateRequest;
import com.dto.request.RoomUpdateRequest;
import com.dto.response.RoomResponseWithImages;
import com.entity.Homestays;
import com.entity.RoomId;
import com.entity.Rooms;
import com.respository.HomestaysRepository;
import com.respository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RoomService {
    @Autowired private RoomRepository roomRepository;
    @Autowired private HomestaysRepository homestayRepository;

    public Rooms createRoom(RoomCreateRequest request) {
        Homestays homestay = homestayRepository.findByHostId(request.getHostId())
                .orElseThrow(() -> new RuntimeException("Homestay not found for hostId: " + request.getHostId()));

        RoomId roomId = new RoomId(homestay.getHomestayId(), request.getRoomId());

        Rooms room = new Rooms();
        room.setHomestayId(homestay.getHomestayId());
        room.setRoomId(request.getRoomId());
        room.setRoomType(request.getRoomType());
        room.setRoomCapacity(request.getRoomCapacity());
        room.setRoomPrice(request.getRoomPrice());
        room.setRating(request.getRating());
        room.setStatus(request.isStatus());
        room.setHomestay(homestay);

        return roomRepository.save(room);
    }

    public List<RoomResponseWithImages> getRoomsByHostId(Integer hostId) {
        List<Rooms> rooms = roomRepository.findByHomestayHostId(hostId);

        return rooms.stream().map(room -> {
            RoomResponseWithImages dto = new RoomResponseWithImages();
            dto.setHomestayId(room.getHomestayId());
            dto.setRoomId(room.getRoomId());
            dto.setRoomType(room.getRoomType());
            dto.setRoomCapacity(room.getRoomCapacity());
            dto.setRoomPrice(room.getRoomPrice());
            dto.setRating(room.getRating());
            dto.setStatus(room.isStatus());

            // Map image URLs
            if (room.getRoomImages() != null) {
                List<String> urls = room.getRoomImages().stream()
                        .map(img -> img.getImageUrl())
                        .toList();
                dto.setImageUrls(urls);
            }

            return dto;
        }).toList();
    }

    public Rooms getRoomById(int homestayId, String roomId) {
        RoomId id = new RoomId(homestayId, roomId);
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
    }

    public Rooms updateRoom(int homestayId, String roomId, RoomUpdateRequest request) {
        Rooms room = getRoomById(homestayId, roomId);

        if (request.getRoomPrice() != null) room.setRoomPrice(request.getRoomPrice());
        if (request.getRoomCapacity() > 0) room.setRoomCapacity(request.getRoomCapacity());
        if (request.getRating() >= 0) room.setRating(request.getRating());
        room.setStatus(request.isStatus());
        if (request.getRoomType() != null) room.setRoomType(request.getRoomType());

        return roomRepository.save(room);
    }

    public void deleteRoom(int homestayId, String roomId) {
        RoomId id = new RoomId(homestayId, roomId);
        Rooms room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        room.setStatus(false);
        roomRepository.save(room);
    }
}

package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.*;
import com.traexcohomestay.hoteltraexco.dto.request.RoomCreateRequest;
import com.traexcohomestay.hoteltraexco.dto.request.RoomUpdateRequest;
import com.traexcohomestay.hoteltraexco.dto.response.RoomResponseWithImages;
import com.traexcohomestay.hoteltraexco.exception.ResourceNotFoundException;
import com.traexcohomestay.hoteltraexco.model.*;
import com.traexcohomestay.hoteltraexco.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class RoomServiceImpl implements RoomService {
    private static final Logger logger = LoggerFactory.getLogger(RoomServiceImpl.class);
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private HomestayRepository homestayRepository;

    @Autowired
    private RoomImageRepository roomImageRepository;

    @Autowired
    private AmenityRepository amenityRepository;

    @Override
    @Transactional(readOnly = true)
    public RoomDetailsDTO getRoomDetails(Integer homestayId, String roomNumber) {
        logger.info("Đang lấy chi tiết phòng cho homestayId: {}, roomNumber: {}", homestayId, roomNumber);
        RoomId roomId = new RoomId(homestayId, roomNumber);
        logger.debug("RoomId được tạo: {}", roomId);
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> {
                    logger.error("Không tìm thấy phòng với homestayId: {} và roomNumber: {}", homestayId, roomNumber);
                    return new ResourceNotFoundException("Không tìm thấy phòng với homestayId: " + homestayId + " và roomNumber: " + roomNumber);
                });
        logger.info("Tìm thấy phòng: {}", room);
        Homestay homestay = homestayRepository.findById(homestayId)
                .orElseThrow(() -> {
                    logger.error("Không tìm thấy homestay với id: {}", homestayId);
                    return new ResourceNotFoundException("Không tìm thấy homestay với id: " + homestayId);
                });
        logger.info("Tìm thấy homestay: {}", homestay);
        List<RoomImage> images = roomImageRepository.findByRooms_Id_HomestayIdAndRooms_Id_RoomNumber(homestayId, roomNumber);
        logger.debug("Số lượng hình ảnh phòng: {}", images.size());
        List<Amenity> amenities = amenityRepository.findByHomestay_HomestayId(homestayId);
        logger.debug("Số lượng tiện nghi: {}", amenities.size());
        for (Amenity amenity : amenities) {
            logger.debug("Amenity: homestay_id={}, type_id={}", amenity.getHomestay().getHomestayId(), amenity.getType() != null ? amenity.getType().getId() : null);
        }
        return convertToDTO(room, homestay, images, amenities);
    }

    @Override
    public List<RoomDTO> getRoomsByHomestayId(Integer homestayId) {
        List<Room> rooms = roomRepository.findByHomestay_HomestayId(homestayId);
        return rooms.stream().map(room -> {
            RoomDTO dto = convertToRoomDTO(room);
            // Lấy danh sách ảnh cho từng phòng
            List<RoomImage> images = roomImageRepository.findByRooms_Id_HomestayIdAndRooms_Id_RoomNumber(
                    room.getId().getHomestayId(),
                    room.getId().getRoomNumber()
            );
            // Convert sang DTO
            List<RoomImageDTO> imageDTOs = images.stream()
                    .map(img -> {
                        RoomImageDTO imgDTO = new RoomImageDTO();
                        imgDTO.setImageUrl(img.getImageUrl());
                        imgDTO.setDescription(img.getDescription());
                        return imgDTO;
                    })
                    .collect(Collectors.toList());
            dto.setImages(imageDTOs);
            return dto;
        }).collect(Collectors.toList());
    }

    private RoomDTO convertToRoomDTO(Room room) {
        RoomDTO dto = new RoomDTO();
        dto.setHomestayId(room.getId().getHomestayId());
        dto.setRoomNumber(room.getId().getRoomNumber());
        dto.setType(room.getType());
        dto.setPrice(room.getPrice());
        dto.setCapacity(room.getCapacity());
        dto.setRating(room.getRating());
        dto.setStatus(room.getStatus());
        return dto;
    }

    private RoomDetailsDTO convertToDTO(Room room, Homestay homestay, List<RoomImage> images, List<Amenity> amenities) {
        RoomDetailsDTO dto = new RoomDetailsDTO();

        // Room
        RoomDTO roomDTO = new RoomDTO();
        roomDTO.setHomestayId(room.getId().getHomestayId());
        roomDTO.setRoomNumber(room.getId().getRoomNumber());
        roomDTO.setType(room.getType());
        roomDTO.setPrice(room.getPrice());
        roomDTO.setCapacity(room.getCapacity());
        roomDTO.setRating(room.getRating());
        roomDTO.setStatus(room.getStatus());
        dto.setRoom(roomDTO);

        // Homestay
        HomestayDTO homestayDTO = new HomestayDTO();
        homestayDTO.setId(homestay.getHomestayId());
        homestayDTO.setHomestayName(homestay.getHomestayName());
        homestayDTO.setAddress(homestay.getAddress());
        homestayDTO.setLocation(homestay.getLocation());
        homestayDTO.setDescription(homestay.getDescription());
        homestayDTO.setHostId(homestay.getHostId());
        homestayDTO.setStatus(homestay.getStatus());
        dto.setHomestay(homestayDTO);

        // Images
        List<RoomImageDTO> imageDTOs = images.stream().map(image -> {
            RoomImageDTO imgDTO = new RoomImageDTO();
            imgDTO.setImageUrl(image.getImageUrl());
            imgDTO.setDescription(image.getDescription());
            return imgDTO;
        }).collect(Collectors.toList());
        dto.setImages(imageDTOs);

        // Amenities
        List<AmenityDTO> amenityDTOs = amenities.stream().map(amenity -> {
            AmenityDTO amenityDTO = new AmenityDTO();
            amenityDTO.setTypeId(amenity.getType().getId());
            amenityDTO.setTypeName(amenity.getType().getTypeName());
            amenityDTO.setIconClass(amenity.getType().getAmenityIcon().getIconClass());
            return amenityDTO;
        }).collect(Collectors.toList());
        dto.setAmenities(amenityDTOs);

        return dto;
    }


    @Override
    public RoomDTO createRoom(RoomCreateRequest request) {
        Room room = new Room();

        // Gán ID tổng hợp đúng
        RoomId roomId = new RoomId();
        roomId.setHomestayId(request.getHomestayId()); // ✅ đúng ID homestay
        roomId.setRoomNumber(request.getRoomId());
        room.setId(roomId);

        // Lấy đối tượng Homestay từ DB
        Homestay homestay = homestayRepository.findById(request.getHomestayId())
                .orElseThrow(() -> new RuntimeException("Homestay not found"));

        room.setHomestay(homestay); // ✅ ràng buộc đúng entity

        room.setType(request.getRoomType());
        room.setCapacity(request.getRoomCapacity());
        room.setPrice(request.getRoomPrice());
        room.setRating(request.getRating());
        room.setStatus(request.isStatus());

        Room savedRoom = roomRepository.save(room);

        // Convert to DTO như cũ
        RoomDTO dto = new RoomDTO();
        dto.setHomestayId(savedRoom.getId().getHomestayId());
        dto.setRoomNumber(savedRoom.getId().getRoomNumber());
        dto.setType(savedRoom.getType());
        dto.setPrice(savedRoom.getPrice());
        dto.setCapacity(savedRoom.getCapacity());
        dto.setRating(savedRoom.getRating());
        dto.setStatus(savedRoom.getStatus());

        return dto;
    }



    public List<RoomResponseWithImages> getRoomsByHostId(Integer hostId) {
        List<Room> rooms = roomRepository.findByHomestayHostId(hostId);

        return rooms.stream().map(room -> {
            RoomResponseWithImages dto = new RoomResponseWithImages();
            dto.setHomestayId(room.getHomestay().getHomestayId());
            dto.setRoomId(room.getId().getRoomNumber());
            dto.setRoomType(room.getType());
            dto.setRoomCapacity(room.getCapacity());
            dto.setRoomPrice(room.getPrice());
            dto.setRating(room.getRating());
            dto.setStatus(room.getStatus());

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

    public Room getRoomById(int homestayId, String roomId) {
        RoomId id = new RoomId(homestayId, roomId);
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
    }

    public Room updateRoom(int homestayId, String roomId, RoomUpdateRequest request) {
        Room room = getRoomById(homestayId, roomId);

        if (request.getRoomPrice() != null) room.setPrice(request.getRoomPrice());
        if (request.getRoomCapacity() > 0) room.setCapacity(request.getRoomCapacity());
        if (request.getRating() >= 0) room.setRating(request.getRating());
        room.setStatus(request.isStatus());
        if (request.getRoomType() != null) room.setType(request.getRoomType());

        return roomRepository.save(room);
    }

    public void deleteRoom(int homestayId, String roomId) {
        RoomId id = new RoomId(homestayId, roomId);
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        room.setStatus(false);
        roomRepository.save(room);
    }

    @Override
    public List<RoomDetailsDTO> getRoomDetailsByHostId(Integer hostId) {
        List<Room> rooms = roomRepository.findByHomestayHostId(hostId);

        return rooms.stream().map(room -> {
            Integer homestayId = room.getId().getHomestayId();
            String roomNumber = room.getId().getRoomNumber();

            Homestay homestay = homestayRepository.findById(homestayId)
                    .orElseThrow(() -> new ResourceNotFoundException("Homestay not found"));

            List<RoomImage> images = roomImageRepository
                    .findByRooms_Id_HomestayIdAndRooms_Id_RoomNumber(homestayId, roomNumber);

            List<Amenity> amenities = amenityRepository.findByHomestay_HomestayId(homestayId);

            return convertToDTO(room, homestay, images, amenities);
        }).collect(Collectors.toList());
    }

    @Override
    public boolean checkRoomAvailability(Integer homestayId, String roomNumber, LocalDate checkInDate, LocalDate checkOutDate) {
        List<Booking> conflictingBookings = bookingRepository.findByRooms_Id_HomestayIdAndRooms_Id_RoomNumber(homestayId, roomNumber)
                .stream()
                .filter(b -> b.getStatus().equals("CONFIRMED") &&
                        !(checkOutDate.isBefore(b.getCheckInDate()) || checkInDate.isAfter(b.getCheckOutDate())))
                .collect(Collectors.toList());
        return conflictingBookings.isEmpty();
    }
}
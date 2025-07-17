package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.ExperienceResponseDTO;
import com.traexcohomestay.hoteltraexco.dto.RoomSearchDTO;
import com.traexcohomestay.hoteltraexco.model.Homestay;
import com.traexcohomestay.hoteltraexco.model.Room;
import com.traexcohomestay.hoteltraexco.model.RoomImage;
import com.traexcohomestay.hoteltraexco.repository.SearchResponrity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchService {

    @Autowired
    private SearchResponrity searchResponrity;

    // ✅ searchRooms → trả RoomSearchDTO
    public List<RoomSearchDTO> searchRooms(String keyword, BigDecimal minPrice, BigDecimal maxPrice,
                                           Double minRating, LocalDate checkInDate, LocalDate checkOutDate,
                                           String serviceKeyword, String experienceKeyword) {
        return searchResponrity.searchRoomsByFilters(
                        keyword, minPrice, maxPrice, minRating,
                        checkInDate, checkOutDate, serviceKeyword, experienceKeyword
                )
                .stream()
                .map(room -> mapToDTO(room, checkInDate, checkOutDate))
                .collect(Collectors.toList());
    }

    // ✅ searchHotel
    public List<RoomSearchDTO> searchHotel(String location, LocalDate checkIn, LocalDate checkOut,
                                           BigDecimal minPrice, Double minRating) {
        return searchResponrity.searchHotel(location, checkIn, checkOut, minPrice, minRating)
                .stream()
                .map(room -> mapToDTO(room, checkIn, checkOut))
                .collect(Collectors.toList());
    }

    // ✅ search by service
    public List<RoomSearchDTO> searchHotelByServiceName(String serviceName) {
        return searchResponrity.searchHotelByServiceName(serviceName)
                .stream()
                .map(room -> mapToDTO(room, null, null))
                .collect(Collectors.toList());
    }

    // ✅ search experiences
    public List<ExperienceResponseDTO> searchExperiences(String location, String experienceName, String description) {
        List<Object[]> rawResults = searchResponrity.searchExperiencesRaw(location, experienceName, description);
        return rawResults.stream()
                .map(obj -> new ExperienceResponseDTO(
                        (Integer) obj[0],
                        (BigDecimal) obj[1],
                        (String) obj[2],
                        (String) obj[3],
                        (String) obj[4]
                ))
                .collect(Collectors.toList());
    }

    // ✅ map Room → RoomSearchDTO
    private RoomSearchDTO mapToDTO(Room room, LocalDate checkInDate, LocalDate checkOutDate) {
        Homestay homestay = room.getHomestay();

        // Lấy danh sách tên dịch vụ từ ServiceType
        List<String> serviceNames = homestay.getServices() != null
                ? homestay.getServices().stream()
                .filter(s -> s.getServiceType() != null)
                .map(s -> s.getServiceType().getServiceName())
                .collect(Collectors.toList())
                : Collections.emptyList();

        // Lấy mô tả trải nghiệm từ ExperienceType
        List<String> experienceDescriptions = homestay.getExperiences() != null
                ? homestay.getExperiences().stream()
                .filter(e -> e.getExperienceType() != null)
                .map(e -> e.getExperienceType().getDescription())
                .collect(Collectors.toList())
                : Collections.emptyList();

        // Lấy URL ảnh phòng
        List<String> imageUrls = room.getRoomImages() != null
                ? room.getRoomImages().stream()
                .map(RoomImage::getImageUrl)
                .collect(Collectors.toList())
                : Collections.emptyList();

        // Build DTO
        return new RoomSearchDTO(
                homestay.getHomestayId(),
                room.getType(),
                room.getCapacity(),
                room.getPrice(),
                room.getRating(),
                room.getStatus(),
                homestay.getHomestayName(),
                homestay.getLocation(),
                homestay.getAddress(),
                serviceNames,
                experienceDescriptions,
                checkInDate,
                checkOutDate,
                imageUrls
        );
    }

}

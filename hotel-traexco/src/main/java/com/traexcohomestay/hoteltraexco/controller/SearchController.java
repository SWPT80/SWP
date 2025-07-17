package com.traexcohomestay.hoteltraexco.controller;

import com.traexcohomestay.hoteltraexco.dto.ExperienceResponseDTO;
import com.traexcohomestay.hoteltraexco.dto.RoomSearchDTO;
import com.traexcohomestay.hoteltraexco.dto.SearchRequestDTO;
import com.traexcohomestay.hoteltraexco.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/rooms")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @GetMapping("/search")
    public List<RoomSearchDTO> searchRooms(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Double minRating,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
            @RequestParam(required = false) String serviceKeyword,
            @RequestParam(required = false) String experienceKeyword
    ) {
        return searchService.searchRooms(
                keyword, minPrice, maxPrice, minRating, checkInDate, checkOutDate, serviceKeyword, experienceKeyword
        );
    }

    @GetMapping("/search-hotel")
    public List<RoomSearchDTO> searchHotel(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) Double minRating
    ) {
        return searchService.searchHotel(location, checkInDate, checkOutDate, minPrice, minRating);
    }

    @GetMapping("/search-by-service")
    public List<RoomSearchDTO> searchByService(@RequestParam String serviceName) {
        return searchService.searchHotelByServiceName(serviceName);
    }

    @GetMapping("/search-experiences")
    public List<ExperienceResponseDTO> searchExperiences(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String experienceName,
            @RequestParam(required = false) String description
    ) {
        return searchService.searchExperiences(location, experienceName, description);
    }

    @PostMapping("/search-advanced")
    public List<RoomSearchDTO> searchHotelAdvanced(@RequestBody SearchRequestDTO request) {
        return searchService.searchHotel(
                request.getLocation(),
                request.getCheckInDate(),
                request.getCheckOutDate(),
                request.getMinPrice(),
                request.getMinRating()
        );
    }
}

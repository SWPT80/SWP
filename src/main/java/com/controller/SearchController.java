package com.controller;

import com.dto.dto.ExperienceResponseDTO;
import com.entity.Rooms;
import com.services.SearchService;
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
    public List<Rooms> searchRooms(
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

    // ✅ searchHotel
    @GetMapping("/search-hotel")
    public List<Rooms> searchHotel(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) Double minRating
    ) {
        return searchService.searchHotel(location, checkInDate, checkOutDate, minPrice, minRating);
    }

    // ✅ search by service name
    @GetMapping("/search-by-service")
    public List<Rooms> searchByService(@RequestParam String serviceName) {
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


}

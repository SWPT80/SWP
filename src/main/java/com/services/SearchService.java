package com.services;

import com.dto.dto.ExperienceResponseDTO;
import com.entity.Rooms;
import com.respository.SearchResponrity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchService {

    @Autowired
    private SearchResponrity searchResponrity;

    public List<Rooms> searchRooms(String keyword, BigDecimal minPrice, BigDecimal maxPrice,
                                   Double minRating, LocalDate checkInDate, LocalDate checkOutDate,
                                   String serviceKeyword, String experienceKeyword) {
        return searchResponrity.searchRoomsByFilters(
                keyword, minPrice, maxPrice, minRating, checkInDate, checkOutDate, serviceKeyword, experienceKeyword
        );
    }

    // ✅ searchHotel
    public List<Rooms> searchHotel(String location, LocalDate checkIn, LocalDate checkOut,
                                   BigDecimal minPrice, Double minRating) {
        return searchResponrity.searchHotel(location, checkIn, checkOut, minPrice, minRating);
    }

    // ✅ searchHotelByServiceName
    public List<Rooms> searchHotelByServiceName(String serviceName) {
        return searchResponrity.searchHotelByServiceName(serviceName);
    }
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


}

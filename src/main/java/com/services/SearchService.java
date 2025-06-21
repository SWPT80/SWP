package com.services;

import com.entity.Rooms;
import com.respository.RoomRepository;
import com.respository.SearchResponrity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class SearchService {
    @Autowired
    private SearchResponrity searchResponrity;

    public List<Rooms> searchRooms(String keyword, BigDecimal minPrice, BigDecimal maxPrice, Double minRating,
                                   LocalDate checkInDate, LocalDate checkOutDate) {
        return searchResponrity.searchRoomsByFilters(keyword, minPrice, maxPrice, minRating, checkInDate, checkOutDate);
    }

}

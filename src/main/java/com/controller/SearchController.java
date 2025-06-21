package com.controller;

import com.entity.Rooms;
import com.services.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
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
            @RequestParam(required = false) Double minRating
    ) {
        return searchService.searchRooms(keyword, minPrice, maxPrice, minRating);
    }
}


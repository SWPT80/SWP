package com.controller;

import com.dto.dto.RoomPriceResponseDTO;
import com.dto.dto.SeasonPricingRequestDTO;
import com.entity.SeasonPricing;
import com.services.SeasonPricingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/seasonal-pricing")
@CrossOrigin(origins = "*")
public class SeasonPricingController {

    @Autowired
    private SeasonPricingService seasonPricingService;

    @PostMapping
    public ResponseEntity<String> createSeasonPricing(@RequestBody SeasonPricingRequestDTO dto) {
        String result = seasonPricingService.createSeasonPricing(dto);

        if (result.contains("thất bại") || result.contains("phải sau")) {
            return ResponseEntity.badRequest().body(result);
        }

        return ResponseEntity.ok(result);
    }
    @GetMapping("/room-price")
    public ResponseEntity<List<RoomPriceResponseDTO>> getRoomPrices(
            @RequestParam int homestayId,
            @RequestParam String roomType,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkIn,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOut
    )
    {
        return ResponseEntity.ok(seasonPricingService.getRoomPricesWithSeason(homestayId, roomType, checkIn, checkOut));
    }
    @GetMapping("/room-types")
    public ResponseEntity<List<String>> getRoomTypesByHost(@RequestParam int hostId) {
        return ResponseEntity.ok(seasonPricingService.getRoomTypesByHost(hostId));
    }
    @GetMapping("/all")
    public ResponseEntity<List<SeasonPricing>> getAllByHost(@RequestParam int hostId) {
        return ResponseEntity.ok(seasonPricingService.getAllByHostId(hostId));
    }
}

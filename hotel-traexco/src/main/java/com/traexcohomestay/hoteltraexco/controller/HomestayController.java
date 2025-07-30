package com.traexcohomestay.hoteltraexco.controller;

import com.traexcohomestay.hoteltraexco.dto.HomestayDTO;
import com.traexcohomestay.hoteltraexco.model.Homestay;
import com.traexcohomestay.hoteltraexco.repository.HomestayRepository;
import com.traexcohomestay.hoteltraexco.service.GeocodingService;
import com.traexcohomestay.hoteltraexco.service.HomestayService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/homestays")
public class HomestayController {

    private static final Logger logger = LoggerFactory.getLogger(HomestayController.class);

    @Autowired
    private HomestayRepository homestayRepository;

    @Autowired
    private HomestayService homestayService;

    @Autowired
    private GeocodingService geocodingService;

    @GetMapping
    public ResponseEntity<List<HomestayDTO>> getAllHomestays() {
        return ResponseEntity.ok(homestayService.getAllHomestays());
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<HomestayDTO>> getAllHomestaysPaged(Pageable pageable) {
        return ResponseEntity.ok(homestayService.getAllHomestaysPaged(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<HomestayDTO> getHomestayById(@PathVariable Integer id) {
        return ResponseEntity.ok(homestayService.getHomestayById(id));
    }

    @PreAuthorize("hasAnyRole('HOST', 'ADMIN')")
    @PostMapping
    public ResponseEntity<HomestayDTO> createHomestay(@RequestBody HomestayDTO homestayDTO) {
        return ResponseEntity.ok(homestayService.createHomestay(homestayDTO));
    }

    @PreAuthorize("hasAnyRole('HOST', 'ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<HomestayDTO> updateHomestay(@PathVariable Integer id, @RequestBody HomestayDTO homestayDTO) {
        return ResponseEntity.ok(homestayService.updateHomestay(id, homestayDTO));
    }

    @PreAuthorize("hasAnyRole('HOST', 'ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHomestay(@PathVariable Integer id) {
        homestayService.deleteHomestay(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<HomestayDTO>> searchHomestays(@RequestParam String name) {
        return ResponseEntity.ok(homestayService.searchHomestays(name));
    }

    @GetMapping("/location")
    public ResponseEntity<List<HomestayDTO>> getHomestaysByLocation(@RequestParam String location) {
        return ResponseEntity.ok(homestayService.searchByLocation(location));
    }

    @GetMapping("/by-host/{hostId}")
    public ResponseEntity<List<HomestayDTO>> getHomestaysByHost(@PathVariable int hostId) {
        return ResponseEntity.ok(homestayService.getHomestaysByHostId(hostId));
    }

    @PreAuthorize("hasAnyRole('HOST', 'ADMIN')")
    @PostMapping("/bulk-update")
    public ResponseEntity<String> bulkUpdateHomestays() {
        try {
            List<Homestay> homestays = homestayRepository.findAll();
            logger.info("Bắt đầu cập nhật tọa độ cho {} homestays", homestays.size());

            int updatedCount = 0;

            for (Homestay hs : homestays) {
                boolean invalidCoords = hs.getLatitude() == null || hs.getLongitude() == null
                        || hs.getLatitude() < 8 || hs.getLatitude() > 24
                        || hs.getLongitude() < 102 || hs.getLongitude() > 110;

                if (invalidCoords) {
                    if (hs.getAddress() != null && hs.getLocation() != null) {
                        String fullAddress = String.format("%s, %s, Vietnam",
                                hs.getAddress().trim(), hs.getLocation().trim());

                        logger.info("Truy vấn toạ độ: {}", fullAddress);

                        Float[] coords = geocodingService.getCoordinatesFromAddress(fullAddress);
                        if (coords != null) {
                            hs.setLatitude(coords[0]);
                            hs.setLongitude(coords[1]);
                            homestayRepository.save(hs);
                            updatedCount++;

                            logger.info("Đã cập nhật tọa độ cho ID {}: [lat={}, lng={}]",
                                    hs.getHomestayId(), coords[0], coords[1]);
                        } else {
                            logger.warn("Không tìm thấy tọa độ cho ID {}: {}", hs.getHomestayId(), fullAddress);
                        }

                        Thread.sleep(1000); // tránh bị chặn API
                    } else {
                        logger.warn("Bỏ qua ID {}: Địa chỉ hoặc location rỗng", hs.getHomestayId());
                    }
                } else {
                    logger.info("Homestay ID {} đã có tọa độ hợp lệ, bỏ qua.", hs.getHomestayId());
                }
            }

            logger.info("Cập nhật hoàn tất. Tổng số homestay đã cập nhật: {}", updatedCount);
            return ResponseEntity.ok("Cập nhật thành công " + updatedCount + " homestays");

        } catch (Exception e) {
            logger.error("Lỗi khi bulk update: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Lỗi cập nhật tọa độ: " + e.getMessage());
        }
    }

    @GetMapping("/nearby")
    public ResponseEntity<List<HomestayDTO>> getNearbyHomestays(
            @RequestParam double userLatitude,
            @RequestParam double userLongitude) {
        logger.info("Lấy danh sách homestay gần vị trí: lat={}, lng={} [{}]",
                userLatitude, userLongitude, java.time.LocalDateTime.now());
        List<HomestayDTO> homestays = homestayService.getNearbyHomestays(userLatitude, userLongitude);
        return ResponseEntity.ok(homestays);
    }
}

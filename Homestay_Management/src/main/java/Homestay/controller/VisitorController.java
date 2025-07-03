package Homestay.controller;



import Homestay.dto.VisitorStatsDTO;
import Homestay.service.VisitorService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/visitors")
public class VisitorController {

    private final VisitorService visitorService;

    public VisitorController(VisitorService visitorService) {
        this.visitorService = visitorService;
    }

    @GetMapping("/stats")
    public VisitorStatsDTO getStats(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date end) {
        return visitorService.getVisitorStats(start, end);
    }

    @PostMapping("/track")
    public void trackVisit(
            @RequestParam String ipAddress,
            @RequestParam(required = false) String pageUrl) {
        visitorService.recordVisit(ipAddress, pageUrl);
    }
}

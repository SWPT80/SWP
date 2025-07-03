package Homestay.service;


import Homestay.dto.VisitorStatsDTO;
import Homestay.model.Visitor;
import Homestay.repository.VisitorRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.stream.Collectors;

@Service
public class VisitorService {

    private final VisitorRepository visitorRepository;

    public VisitorService(VisitorRepository visitorRepository) {
        this.visitorRepository = visitorRepository;
    }

    public VisitorStatsDTO getVisitorStats(Date start, Date end) {
        VisitorStatsDTO stats = new VisitorStatsDTO();

        // Tổng lượt truy cập
        stats.setTotalVisitors(visitorRepository.countByVisitTimeBetween(start, end));

        // Xu hướng theo ngày
        stats.setDailyCounts(
                visitorRepository.getVisitorTrend(start, end).stream()
                        .map(row -> new VisitorStatsDTO.DailyVisitorCount(
                                row[0] != null ? row[0].toString() : null, // Ngày
                                row[1] != null ? ((Number) row[1]).longValue() : 0 // Số lượng
                        ))
                        .collect(Collectors.toList())
        );

        return stats;
    }


    public void recordVisit(String ipAddress, String pageUrl) {
        Visitor visitor = new Visitor();
        visitor.setIpAddress(ipAddress);
        visitor.setPageUrl(pageUrl);
        visitor.setVisitTime(new Date());
        visitorRepository.save(visitor);
    }
}

package Homestay.dto;

import lombok.Data;

import java.util.List;

@Data
public class VisitorStatsDTO {
    private long totalVisitors;
    private List<DailyVisitorCount> dailyCounts;

    @Data
    public static class DailyVisitorCount {
        private String date; // Kiểu String cho ngày
        private long count;  // Kiểu long cho số lượng

        // Constructor
        public DailyVisitorCount(String date, long count) {
            this.date = date;
            this.count = count;
        }
    }
}

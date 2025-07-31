package Homestay.jobs;



import com.traexcohomestay.hoteltraexco.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class MessageCleanupJob {

    @Autowired
    private MessageRepository messageRepository;

    // ✅ Chạy mỗi ngày lúc 2:00 AM
    @Scheduled(cron = "0 0 2 * * *")
    public void deleteOldMessages() {
        LocalDateTime cutoffDate = LocalDateTime.now().minusDays(30);
        int deletedCount = messageRepository.deleteBySentAtBefore(cutoffDate);
        System.out.println("🧹 Dọn dẹp: Đã xóa " + deletedCount + " tin nhắn cũ hơn 30 ngày");
    }
}


package com.services;


import com.respository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MessageCleanupService {

    @Autowired
    private MessageRepository messageRepository;

    // Chạy mỗi ngày lúc 3 giờ sáng
    @Scheduled(cron = "0 0 3 * * ?")
    public void deleteOldMessages() {
        LocalDateTime cutoff = LocalDateTime.now().minusDays(30);
        int deletedCount = messageRepository.deleteBySentAtBefore(cutoff);
        System.out.println("🧹 Deleted " + deletedCount + " old messages.");
    }
}

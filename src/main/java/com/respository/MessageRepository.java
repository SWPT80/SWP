package com.respository;

import com.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
    List<Message> findByConversationConversationIdOrderBySentAtAsc(int conversationId);

    // ✅ Thêm phương thức xóa các tin nhắn trước một thời điểm
    int deleteBySentAtBefore(LocalDateTime cutoffDate);
}

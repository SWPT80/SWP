package com.traexcohomestay.hoteltraexco.repository;

import com.traexcohomestay.hoteltraexco.dto.MessageDTO;
import com.traexcohomestay.hoteltraexco.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
    List<Message> findByConversationConversationIdOrderBySentAtAsc(int conversationId);

    // ✅ Thêm phương thức xóa các tin nhắn trước một thời điểm
    int deleteBySentAtBefore(LocalDateTime cutoffDate);

        @Query("SELECT new com.traexcohomestay.hoteltraexco.dto.MessageDTO(" +
                "m.id, m.sender.id, m.content, m.sentAt) " +
                "FROM Message m " +
                "WHERE m.conversation.homestay.homestayId = :homestayId AND m.sender.id = :senderId " +
                "ORDER BY m.sentAt DESC")
        Optional<MessageDTO> findTopMessageDTOByHomestayIdAndSenderId(@Param("homestayId") int homestayId,
                                                                      @Param("senderId") int senderId);

        @Query("SELECT new com.traexcohomestay.hoteltraexco.dto.MessageDTO(" +
                "m.id, m.sender.id, m.content, m.sentAt) " +
                "FROM Message m " +
                "WHERE m.conversation.homestay.homestayId = :homestayId " +
                "ORDER BY m.sentAt DESC")
        Optional<MessageDTO> findTopMessageDTOByHomestayId(@Param("homestayId") int homestayId);
    }



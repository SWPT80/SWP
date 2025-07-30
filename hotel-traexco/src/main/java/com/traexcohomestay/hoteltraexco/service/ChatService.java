package com.traexcohomestay.hoteltraexco.service;


import com.traexcohomestay.hoteltraexco.dto.MessageDTO;
import com.traexcohomestay.hoteltraexco.model.Conversation;
import com.traexcohomestay.hoteltraexco.model.Message;
import com.traexcohomestay.hoteltraexco.model.User;
import com.traexcohomestay.hoteltraexco.repository.ConversationRepository;
import com.traexcohomestay.hoteltraexco.repository.HomestaysRepository;
import com.traexcohomestay.hoteltraexco.repository.MessageRepository;
import com.traexcohomestay.hoteltraexco.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
public class ChatService {
    @Autowired private ConversationRepository conversationRepo;
    @Autowired private MessageRepository messageRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private HomestaysRepository homestayRepo;

    public Conversation getOrCreateConversation(int customerId, int hostId) {
        List<Conversation> conversations = conversationRepo.findByCustomer_IdAndHost_Id(customerId, hostId);

        if (!conversations.isEmpty()) {
            return conversations.get(0); // lấy cuộc trò chuyện đầu tiên
        }

        // Nếu chưa tồn tại thì tạo mới
        Conversation c = new Conversation();
        c.setCustomer(userRepo.findById(customerId).orElseThrow(() -> new RuntimeException("Customer not found")));
        c.setHost(userRepo.findById(hostId).orElseThrow(() -> new RuntimeException("Host not found")));
        return conversationRepo.save(c);
    }


    public Message sendMessage(int conversationId, int senderId, String content) {
        try {
            // Decode content để hỗ trợ tiếng Việt
            String decodedContent = URLDecoder.decode(content, StandardCharsets.UTF_8.name());
            Message m = new Message();
            m.setConversation(conversationRepo.findById(conversationId)
                    .orElseThrow(() -> new RuntimeException("Conversation not found")));
            m.setSender(userRepo.findById(senderId)
                    .orElseThrow(() -> new RuntimeException("Sender not found")));
            m.setContent(decodedContent);
            return messageRepo.save(m);
        } catch (Exception e) {
            throw new RuntimeException("Error decoding message content", e);
        }
    }

    public List<Message> getMessages(int conversationId) {
        return messageRepo.findByConversationConversationIdOrderBySentAtAsc(conversationId);
    }

    public List<User> getHostsForUser(int userId) {
        List<Integer> hostIds = conversationRepo.findDistinctHostIdsByUserId(userId);
        return userRepo.findByIdIn(hostIds);
    }

    public Optional<Conversation> getConversationById(Integer conversationId) {
        return conversationRepo.findById(conversationId);
    }

    public List<User> getUsersForHost(int hostId) {
        return conversationRepo.findUsersChattedWithHost(hostId);
    }
    public Optional<MessageDTO> getLastMessage(int userId, int homestayId) {
        return messageRepo.findTopMessageDTOByHomestayIdAndSenderId(homestayId, userId);
    }
    public List<MessageDTO> getUsersWithHomestaysForHost(int hostId) {
        List<Object[]> results = conversationRepo.findUsersAndHomestaysByHost(hostId);
        List<MessageDTO> list = new ArrayList<>();

        for (Object[] row : results) {
            Integer userId = (Integer) row[0];
            Integer homestayId = (Integer) row[2];

            MessageDTO dto = new MessageDTO();
            dto.setUserId(userId);
            dto.setHomestayId(homestayId);
            list.add(dto);
        }

        return list;
    }
    // Thêm các method này vào ChatService.java hiện có của bạn

    // Method cập nhật để lấy users theo hostId và homestayId cụ thể
    public List<MessageDTO> getUsersWithHomestaysForHost(int hostId, int homestayId) {
        // Sử dụng repository method có sẵn của bạn với filter thêm homestayId
        List<Object[]> results = conversationRepo.findUsersAndHomestaysByHostAndHomestayId(hostId,homestayId);
        List<MessageDTO> list = new ArrayList<>();

        for (Object[] row : results) {
            Integer userId = (Integer) row[0];
            String fullname = (String) row[1];
            Integer currentHomestayId = (Integer) row[2];
            String avatar = (String) row[3];
            Integer conversationId = (Integer) row[4];

            MessageDTO dto = new MessageDTO();
            dto.setUserId(userId);
            dto.setHomestayId(currentHomestayId);

            // Lấy tin nhắn cuối cùng nếu có
            Optional<MessageDTO> lastMsg = getLastMessage(userId, currentHomestayId);

            list.add(dto);
        }

        System.out.println("✅ Found " + list.size() + " users for hostId: " + hostId + ", homestayId: " + homestayId);
        return list;
    }

    // Method để lấy homestay info theo userId
    public Map<String, Object> getHomestayInfoByUserId(int userId) {
        Map<String, Object> result = new HashMap<>();

        try {
            // Lấy thông tin từ conversations where user là customer hoặc host
            List<Object[]> conversations = conversationRepo.findHomestayInfoByUserId(userId);

            if (!conversations.isEmpty()) {
                Object[] row = conversations.get(0);
                Integer homestayId = (Integer) row[0];
                String homestayName = (String) row[1];
                String homestayLocation = (String) row[2];

                result.put("homestayId", homestayId);
                result.put("homestayName", homestayName);
                result.put("homestayLocation", homestayLocation);

                System.out.println("✅ Found homestay info for userId " + userId + ": " + result);
            } else {
                System.out.println("⚠️ No homestay found for userId: " + userId);
            }

        } catch (Exception e) {
            System.err.println("❌ Error getting homestay info for userId " + userId + ": " + e.getMessage());
        }

        return result;
    }
}

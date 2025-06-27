package com.services;

import com.entity.Conversation;
import com.entity.Message;
import com.entity.Users;
import com.respository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@Service
public class ChatService {
    @Autowired private ConversationRepository conversationRepo;
    @Autowired private MessageRepository messageRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private HomestaysRepository homestayRepo;

    public Conversation getOrCreateConversation(int customerId, int hostId, int homestayId) {
        return conversationRepo.findByCustomer_IdAndHost_IdAndHomestay_HomestayId(customerId, hostId, homestayId)
                .orElseGet(() -> {
                    Conversation c = new Conversation();
                    c.setCustomer(userRepo.findById(customerId).orElseThrow(() -> new RuntimeException("Customer not found")));
                    c.setHost(userRepo.findById(hostId).orElseThrow(() -> new RuntimeException("Host not found")));
                    c.setHomestay(homestayRepo.findById(homestayId).orElseThrow(() -> new RuntimeException("Homestay not found")));
                    return conversationRepo.save(c);
                });
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

    public List<Users> getHostsForUser(int userId) {
        List<Integer> hostIds = conversationRepo.findDistinctHostIdsByUserId(userId);
        return userRepo.findByIdIn(hostIds);
    }

    public Optional<Conversation> getConversationById(Integer conversationId) {
        return conversationRepo.findById(conversationId);
    }

    public List<Users> getUsersForHost(int hostId) {
        return conversationRepo.findUsersChattedWithHost(hostId);
    }
}
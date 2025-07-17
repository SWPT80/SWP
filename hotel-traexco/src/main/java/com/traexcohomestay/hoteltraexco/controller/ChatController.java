package com.traexcohomestay.hoteltraexco.controller;


import com.traexcohomestay.hoteltraexco.dto.MessageDTO;
import com.traexcohomestay.hoteltraexco.dto.response.ConversationDTO;
import com.traexcohomestay.hoteltraexco.model.Conversation;
import com.traexcohomestay.hoteltraexco.model.Message;
import com.traexcohomestay.hoteltraexco.model.User;
import com.traexcohomestay.hoteltraexco.repository.ConversationRepository;
import com.traexcohomestay.hoteltraexco.repository.MessageRepository;
import com.traexcohomestay.hoteltraexco.repository.UserRepository;
import com.traexcohomestay.hoteltraexco.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private ConversationRepository conversationRepo;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping(value = "/conversation", produces = MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")
    public ResponseEntity<ConversationDTO> startConversation(
            @RequestParam Integer customerId,
            @RequestParam Integer hostId,
            @RequestParam Integer homestayId) {
        Conversation conversation = chatService.getOrCreateConversation(customerId, hostId, homestayId);
        return ResponseEntity.ok(new ConversationDTO(conversation.getConversationId()));
    }

    @PostMapping(value = "/message", produces = MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")
    public ResponseEntity<?> sendMessage(
            @RequestParam Integer conversationId,
            @RequestParam Integer senderId,
            @RequestParam String content) {

        if (conversationId == null || senderId == null || content == null || content.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Thiếu tham số");
        }

        Optional<Conversation> conversationOpt = chatService.getConversationById(conversationId);
        if (!conversationOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy cuộc trò chuyện");
        }

        Optional<User> senderOpt = userRepository.findById(senderId);
        if (!senderOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy người gửi");
        }

        String decodedContent;
        try {
            decodedContent = java.net.URLDecoder.decode(content, StandardCharsets.UTF_8);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Lỗi decode nội dung: " + e.getMessage());
        }

        Message message = new Message();
        message.setConversation(conversationOpt.get());
        message.setSender(senderOpt.get());
        message.setContent(decodedContent);
        message.setSentAt(LocalDateTime.now());

        Message saved = messageRepository.save(message);

        // ✅ Chỉ trả về DTO, tránh lỗi Hibernate proxy
        MessageDTO dto = new MessageDTO(saved.getId(), senderId, saved.getContent(), saved.getSentAt());
        return ResponseEntity.ok(dto);
    }


    @GetMapping(value = "/messages/{conversationId}", produces = MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")
    public ResponseEntity<List<MessageDTO>> getMessages(@PathVariable int conversationId) {
        List<Message> messages = chatService.getMessages(conversationId);
        List<MessageDTO> dtoList = messages.stream()
                .map(m -> new MessageDTO(m.getId(), m.getSender().getId(), m.getContent(), m.getSentAt()))
                .toList();
        return ResponseEntity.ok(dtoList);
    }


    @GetMapping(value = "/hosts", produces = MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")
    public ResponseEntity<List<User>> getHostsForCurrentUser(@RequestParam int userId) {
        List<User> hosts = chatService.getHostsForUser(userId);
        return ResponseEntity.ok(hosts);
    }

    @GetMapping(value = "/messages/received", produces = MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")
    public ResponseEntity<?> getReceivedMessages(
            @RequestParam int conversationId,
            @RequestParam int receiverId) {
        Optional<Conversation> conversationOpt = chatService.getConversationById(conversationId);
        if (!conversationOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy cuộc trò chuyện");
        }

        List<Message> messages = chatService.getMessages(conversationId);
        List<Message> receivedMessages = messages.stream()
                .filter(m -> m.getSender().getId() != receiverId)
                .toList();
        return ResponseEntity.ok(receivedMessages);
    }

    @GetMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")
    public ResponseEntity<List<User>> getUsersChattedWithHost(@RequestParam int hostId) {
        List<User> users = chatService.getUsersForHost(hostId);
        return ResponseEntity.ok(users);
    }
    @GetMapping(value = "/hosts-booked", produces = MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")
    public ResponseEntity<?> getHostsUserBooked(@RequestParam int userId) {
        List<Object[]> results = conversationRepo.findHostAndHomestayByUserBooking(userId);

        List<Map<String, Object>> hosts = results.stream().map(row -> {
            Map<String, Object> map = new HashMap<>();
            map.put("hostId", row[0]);
            map.put("homestayId", row[1]);
            map.put("fullname", row[2]);
            return map;
        }).toList();

        return ResponseEntity.ok(hosts);
    }

}

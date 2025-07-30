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
    public ResponseEntity<ConversationDTO> startConversation(@RequestParam Integer customerId, @RequestParam Integer hostId) {
        Conversation conversation = chatService.getOrCreateConversation(customerId, hostId);
        return ResponseEntity.ok(new ConversationDTO(conversation.getConversationId()));
    }

    @PostMapping(value = "/message", produces = MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")
    public ResponseEntity<?> sendMessage(@RequestParam Integer conversationId, @RequestParam Integer senderId, @RequestParam String content) {

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
        List<MessageDTO> dtoList = messages.stream().map(m -> new MessageDTO(m.getId(), m.getSender().getId(), m.getContent(), m.getSentAt())).toList();
        return ResponseEntity.ok(dtoList);
    }


    @GetMapping(value = "/hosts", produces = MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")
    public ResponseEntity<List<User>> getHostsForCurrentUser(@RequestParam int userId) {
        List<User> hosts = chatService.getHostsForUser(userId);
        return ResponseEntity.ok(hosts);
    }

    @GetMapping(value = "/messages/received", produces = MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")
    public ResponseEntity<?> getReceivedMessages(@RequestParam int conversationId, @RequestParam int receiverId) {
        Optional<Conversation> conversationOpt = chatService.getConversationById(conversationId);
        if (!conversationOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy cuộc trò chuyện");
        }

        List<Message> messages = chatService.getMessages(conversationId);
        List<Message> receivedMessages = messages.stream().filter(m -> m.getSender().getId() != receiverId).toList();
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

    @GetMapping(value = "/messages/last", produces = MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")
    public ResponseEntity<?> getLastMessage(@RequestParam int userId, @RequestParam(required = false) Integer homestayId) {

        if (homestayId == null) {
            return ResponseEntity.badRequest().body("homestayId không hợp lệ");
        }

        Optional<MessageDTO> messageOpt = chatService.getLastMessage(userId, homestayId);

        return messageOpt.map(ResponseEntity::ok).orElse(ResponseEntity.noContent().build());
    }

    @GetMapping("/users/homestay")
    public ResponseEntity<List<MessageDTO>> getUsersForHost(@RequestParam int hostId, @RequestParam int homestayId) {
        try {
            List<MessageDTO> users = chatService.getUsersWithHomestaysForHost(hostId, homestayId);
            System.out.println("🔥 API called - hostId: " + hostId + ", homestayId: " + homestayId);
            System.out.println("📊 Found " + users.size() + " users");
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            System.err.println("❌ Error in getUsersForHost: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    // API để lấy homestay info theo userId cho ChatPopupManager
    // API Controller - Sửa lại để trả về data thay vì noContent
    @GetMapping("/user/{userId}/homestay-info")
    public ResponseEntity<Map<String, Object>> getUserHomestayInfo(@PathVariable int userId) {
        try {
            Map<String, Object> homestayInfo = chatService.getHomestayInfoByUserId(userId);

            // Thay vì trả về noContent, hãy trả về empty object với default values
            if (homestayInfo.isEmpty()) {
                System.out.println("⚠️ No homestay info found for userId: " + userId);

                // Trả về object rỗng thay vì noContent
                Map<String, Object> defaultInfo = new HashMap<>();
                defaultInfo.put("homestayId", null);
                defaultInfo.put("homestayName", null);
                defaultInfo.put("homestayLocation", null);

                return ResponseEntity.ok(defaultInfo);
            }

            System.out.println("✅ Homestay info for userId " + userId + ": " + homestayInfo);
            return ResponseEntity.ok(homestayInfo);
        } catch (Exception e) {
            System.err.println("❌ Error getting homestay info: " + e.getMessage());

            // Trả về error object thay vì internal server error
            Map<String, Object> errorInfo = new HashMap<>();
            errorInfo.put("error", true);
            errorInfo.put("message", e.getMessage());
            errorInfo.put("homestayId", null);
            errorInfo.put("homestayName", null);
            errorInfo.put("homestayLocation", null);

            return ResponseEntity.ok(errorInfo); // Hoặc có thể dùng status 200 với error flag
        }
    }

    // Hoặc cách khác là sửa service method
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

                // Thay vì return empty map, return map với null values
                result.put("homestayId", null);
                result.put("homestayName", null);
                result.put("homestayLocation", null);
            }

        } catch (Exception e) {
            System.err.println("❌ Error getting homestay info for userId " + userId + ": " + e.getMessage());

            // Return default values thay vì empty map
            result.put("homestayId", null);
            result.put("homestayName", null);
            result.put("homestayLocation", null);
            result.put("error", e.getMessage());
        }

        return result;
    }
}

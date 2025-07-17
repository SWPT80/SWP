package com.controller;

import com.dto.response.ConversationDTO;
import com.entity.Conversation;
import com.entity.Message;
import com.entity.Users;
import com.respository.UserRepository;
import com.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping(value = "/conversation", produces = MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")
    public ResponseEntity<ConversationDTO> startConversation(
            @RequestParam int customerId,
            @RequestParam int hostId,
            @RequestParam int homestayId) {
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

        Optional<Users> senderOpt = userRepository.findById(senderId);
        if (!senderOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy người gửi");
        }

        // Decode content để xử lý tiếng Việt
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

        Message savedMessage = messageRepository.save(message);
        return ResponseEntity.ok(savedMessage);
    }

    @GetMapping(value = "/messages/{conversationId}", produces = MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")
    public ResponseEntity<List<Message>> getMessages(@PathVariable int conversationId) {
        List<Message> messages = chatService.getMessages(conversationId);
        return ResponseEntity.ok(messages);
    }

    @GetMapping(value = "/hosts", produces = MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")
    public ResponseEntity<List<Users>> getHostsForCurrentUser(@RequestParam int userId) {
        List<Users> hosts = chatService.getHostsForUser(userId);
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
    public ResponseEntity<List<Users>> getUsersChattedWithHost(@RequestParam int hostId) {
        List<Users> users = chatService.getUsersForHost(hostId);
        return ResponseEntity.ok(users);
    }
}
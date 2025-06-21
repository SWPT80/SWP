package com.controller;

import com.dto.response.ConversationDTO;
import com.entity.Conversation;
import com.entity.Message;
import com.entity.Users;
import com.respository.MessageRepository;
import com.respository.UserRepository;
import com.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    // ✅ Lấy hoặc tạo cuộc trò chuyện

    @PostMapping("/conversation")
    public ResponseEntity<ConversationDTO> startConversation(
            @RequestParam int customerId,
            @RequestParam int hostId,
            @RequestParam int homestayId) {

        Conversation conversation = chatService.getOrCreateConversation(customerId, hostId, homestayId);
        return ResponseEntity.ok(new ConversationDTO(conversation.getConversationId()));
    }


    // ✅ Gửi tin nhắn
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/message")
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

        Message message = new Message();
        message.setConversation(conversationOpt.get());
        message.setSender(senderOpt.get()); // ✅ Đúng cách
        message.setContent(content);
        message.setSentAt(LocalDateTime.now());

        Message savedMessage = messageRepository.save(message);
        return ResponseEntity.ok(savedMessage);
    }


    // ✅ Lấy tin nhắn
    @GetMapping("/messages/{conversationId}")
    public List<Message> getMessages(@PathVariable int conversationId) {
        return chatService.getMessages(conversationId);
    }

    // ✅ Lấy danh sách host đã chat với user
    @GetMapping("/hosts")
    public List<Users> getHostsForCurrentUser(@RequestParam int userId) {
        return chatService.getHostsForUser(userId);
    }
    // ✅ Lấy tin nhắn đến của người dùng cụ thể (theo conversation và receiver)
    @GetMapping("/messages/received")
    public ResponseEntity<?> getReceivedMessages(
            @RequestParam int conversationId,
            @RequestParam int receiverId) {

        Optional<Conversation> conversationOpt = chatService.getConversationById(conversationId);
        if (!conversationOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy cuộc trò chuyện");
        }

        List<Message> messages = chatService.getMessages(conversationId);

        // ✅ Lọc ra tin nhắn mà sender khác receiver
        List<Message> receivedMessages = messages.stream()
                .filter(m -> m.getSender().getId() != receiverId)
                .toList();

        return ResponseEntity.ok(receivedMessages);
    }
    @GetMapping("/users")
    public List<Users> getUsersChattedWithHost(@RequestParam int hostId) {
        return chatService.getUsersForHost(hostId); // viết hàm này trong service
    }

}

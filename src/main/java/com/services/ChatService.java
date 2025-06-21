package com.services;

import com.entity.Conversation;
import com.entity.Message;
import com.entity.Users;
import com.respository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatService {
    @Autowired private ConversationRepository conversationRepo;
    @Autowired private MessageRepository messageRepo;
    @Autowired
    private UserRepository userRepo;
    @Autowired private HomestaysRepository homestayRepo;


    public Conversation getOrCreateConversation(int customerId, int hostId, int homestayId) {
        return conversationRepo.findByCustomer_IdAndHost_IdAndHomestay_HomestayId(customerId, hostId, homestayId)
                .orElseGet(() -> {
                    Conversation c = new Conversation();
                    c.setCustomer(userRepo.findById(customerId).orElseThrow());
                    c.setHost(userRepo.findById(hostId).orElseThrow());
                    c.setHomestay(homestayRepo.findById(homestayId).orElseThrow());
                    return conversationRepo.save(c);
                });
    }


    public Message sendMessage(int conversationId, int senderId, String content) {
        Message m = new Message();
        m.setConversation(conversationRepo.findById(conversationId).orElseThrow());
        m.setSender(userRepo.findById(senderId).orElseThrow());
        m.setContent(content);
        return messageRepo.save(m);
    }

    public List<Message> getMessages(int conversationId) {
        return messageRepo.findByConversationConversationIdOrderBySentAtAsc(conversationId);
    }
    @Autowired
    private ConversationRepository bookingRepo;

    @Autowired
    private UserRepository usersRepo;

    public List<Users> getHostsForUser(int userId) {
        List<Integer> hostIds = bookingRepo.findDistinctHostIdsByUserId(userId);
        return usersRepo.findByIdIn(hostIds);
    }
    @Autowired
    private ConversationRepository conversationRepository;

    public Optional<Conversation> getConversationById(Integer conversationId) {
        return conversationRepository.findById(conversationId);
    }
    public List<Users> getUsersForHost(int hostId) {
        return conversationRepository.findUsersChattedWithHost(hostId); // viết custom query
    }

}

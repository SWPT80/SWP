package com.traexcohomestay.hoteltraexco.controller;


import com.traexcohomestay.hoteltraexco.dto.request.ChatRequest;
import com.traexcohomestay.hoteltraexco.dto.response.ChatResponse;
import com.traexcohomestay.hoteltraexco.service.ChatBoxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatbox")
@CrossOrigin(origins = "*") // Cho React truy cập
public class ChatBoxController {

    @Autowired
    private ChatBoxService chatBoxService;

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {
        return chatBoxService.sendChatRequest(request);
    }
}

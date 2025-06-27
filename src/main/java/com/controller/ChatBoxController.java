package com.controller;

import com.dto.request.ChatRequest;
import com.dto.response.ChatResponse;
import com.services.ChatBoxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*") // Cho React truy cập
public class ChatBoxController {

    @Autowired
    private ChatBoxService chatBoxService;

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {
        return chatBoxService.sendChatRequest(request);
    }
}

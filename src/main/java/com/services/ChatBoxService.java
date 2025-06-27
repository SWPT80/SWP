package com.services;

import com.dto.request.ChatRequest;
import com.dto.response.ChatResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class ChatBoxService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.url}")
    private String apiUrl;

    public ChatResponse sendChatRequest(ChatRequest userRequest) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> body = new HashMap<>();
        body.put("model", userRequest.getModel()); // e.g. gpt-3.5-turbo
        body.put("messages", userRequest.getMessages());

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                    apiUrl,
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            Map responseBody = response.getBody();
            Map firstChoice = ((java.util.List<Map>) responseBody.get("choices")).get(0);
            Map message = (Map) firstChoice.get("message");
            String reply = (String) message.get("content");

            return new ChatResponse(reply);
        } catch (Exception e) {
            return new ChatResponse("⚠️ Server error: " + e.getMessage());
        }
    }
}

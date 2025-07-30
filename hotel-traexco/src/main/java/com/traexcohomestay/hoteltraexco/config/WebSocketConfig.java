package com.traexcohomestay.hoteltraexco.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Định cấu hình cho message broker, các topic bắt đầu với /topic
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Đăng ký STOMP endpoint "/ws" và cho phép SockJS
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")  // Allow cross-origin requests
                .withSockJS()
                .setSessionCookieNeeded(false);  // Disable session cookies
    }
}

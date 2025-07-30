package com.traexcohomestay.hoteltraexco.util;

import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ActiveUserStore {

    private final Map<String, Instant> activeUsers = new ConcurrentHashMap<>();

    public void markUserActive(String username) {
        activeUsers.put(username, Instant.now());
    }

    public int getActiveUserCount() {
        Instant now = Instant.now();
        return (int) activeUsers.entrySet().stream()
                .filter(entry -> now.minusSeconds(300).isBefore(entry.getValue())) // 5 phút gần nhất
                .count();
    }

    public Map<String, Instant> getActiveUsers() {
        return activeUsers;
    }
}

package com.traexcohomestay.hoteltraexco.controller;

import com.traexcohomestay.hoteltraexco.util.ActiveUserStore;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MonitorController {

    private final ActiveUserStore activeUserStore;

    public MonitorController(ActiveUserStore activeUserStore) {
        this.activeUserStore = activeUserStore;
    }

    @GetMapping("/api/monitor/active-users")
    public int getActiveUserCount() {
        return activeUserStore.getActiveUserCount();
    }
}

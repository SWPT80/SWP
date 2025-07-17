package com.traexcohomestay.hoteltraexco.controller;

import com.traexcohomestay.hoteltraexco.model.User;
import com.traexcohomestay.hoteltraexco.service.UserManagement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/host")
public class HostController {

    @Autowired
    private UserManagement userService;

    // ⭐ LẤY DANH SÁCH HOST
    @GetMapping                //  <─ /api/host  (không có {id})
    public List<User> getAllHosts() {
        return userService.getHosts();   // hoặc userService.getAllHostsForManagement()
    }

    // ─────────────────────────────────────────────────────────
    @GetMapping("/{id}")       //  /api/host/{id}
    public User getHostById(@PathVariable Integer id) {
        return userService.getHostForManagement(id);
    }

    @PutMapping("/{id}")
    public User updateHost(@PathVariable Integer id, @RequestBody User updated) {
        updated.setRole("host");
        return userService.updateHost(id, updated);
    }

    @DeleteMapping("/{id}")
    public void deleteHost(@PathVariable Integer id) {
        userService.deleteHost(id);
    }
}


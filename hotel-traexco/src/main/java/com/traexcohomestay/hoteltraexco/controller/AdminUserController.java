package com.traexcohomestay.hoteltraexco.controller;

import com.traexcohomestay.hoteltraexco.model.User;
import com.traexcohomestay.hoteltraexco.service.UserManagement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {

    @Autowired
    private UserManagement userManagement;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsersAndHosts() {
        return ResponseEntity.ok(userManagement.getAllUsersAndHosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(userManagement.getById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<User>> search(@RequestParam String keyword) {
        return ResponseEntity.ok(userManagement.searchByKeyword(keyword));
    }

    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user) {
        return ResponseEntity.ok(userManagement.create(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Integer id, @RequestBody User updatedUser) {
        return ResponseEntity.ok(userManagement.update(id, updatedUser));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        userManagement.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/hosts")
    public ResponseEntity<List<User>> getHosts() {
        return ResponseEntity.ok(userManagement.getHosts());
    }

    @GetMapping("/customers")
    public ResponseEntity<List<User>> getCustomers() {
        return ResponseEntity.ok(userManagement.getCustomers());
    }
}

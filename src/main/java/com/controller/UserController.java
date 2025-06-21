package com.controller;

import com.dto.request.UserCreateRequest;
import com.dto.request.UserUpdateRequest;
import com.entity.Users;
import com.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.services.UserService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping()
    Users createUser(@RequestBody UserCreateRequest request) {
         return userService.createUser(request);
    }

    @GetMapping
    List<Users> getAllUsers() {
        return userService.getAllUsers();
    }
    @GetMapping("/{userId}")
    Users getUser(@PathVariable int userId) {
        return userService.getUserById(userId);
    }
    @PutMapping("/{userID}")

    Users updateUser(@PathVariable int userID,@RequestBody UserUpdateRequest request) {
        return userService.updateUser(userID,request);
    }
    @DeleteMapping("/{userID}")

    String deleteUser(@PathVariable int userID) {
        userService.deleteUser(userID);
        return "User deleted";
    }
}

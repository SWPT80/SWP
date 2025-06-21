package com.services;


import com.dto.request.UserCreateRequest;
import com.dto.request.UserUpdateRequest;
import com.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.respository.UserRepository;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Users createUser(UserCreateRequest request){
        Users user = new Users();

        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setFullname(request.getFullname());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setBirthdate(request.getBirthday());
        user.setRole(request.getRole());
        user.setStatus(request.isStatus());
        return userRepository.save(user);
    }
    public List<Users> getAllUsers(){
        return userRepository.findAll();
    }
    public Users getUserById(int id){
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }
    public Users updateUser(int userId,UserUpdateRequest request){
        Users user=getUserById(userId);

        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setFullname(request.getFullname());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setBirthdate(request.getBirthday());
        user.setRole(request.getRole());
        user.setStatus(request.isStatus());
        return userRepository.save(user);
    }
    public void deleteUser(int userId){
        userRepository.deleteById(userId);
    }
}

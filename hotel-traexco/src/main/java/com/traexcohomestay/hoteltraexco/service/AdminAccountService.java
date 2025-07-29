package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.model.User;
import com.traexcohomestay.hoteltraexco.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminAccountService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User getCurrentAdmin(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
    }

    public User updateAdminProfile(String username, User updated) {
        User admin = getCurrentAdmin(username);
        admin.setFullName(updated.getFullName());
        admin.setPhone(updated.getPhone());
        admin.setEmail(updated.getEmail());
        admin.setAddress(updated.getAddress());
        admin.setBirthdate(updated.getBirthdate());
        return userRepo.save(admin);
    }

    public void changePassword(String username, String oldPass, String newPass) {
        User admin = getCurrentAdmin(username);
        if (!passwordEncoder.matches(oldPass, admin.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        admin.setPassword(passwordEncoder.encode(newPass));
        userRepo.save(admin);
    }
}

package com.traexcohomestay.hoteltraexco.service;
import com.traexcohomestay.hoteltraexco.model.User;
import com.traexcohomestay.hoteltraexco.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserManagement {
    @Autowired
    private UserRepository userRepo;

    public List<User> getAllUsersAndHosts() {
        return userRepo.findByRoleIn(List.of("user", "host"));
    }

    public List<User> searchByKeyword(String keyword) {
        return userRepo.findByFullNameContainingIgnoreCaseAndRoleIn(keyword, List.of("user", "host"));
    }

    public List<User> getHosts() {
        return userRepo.findByRole("host");
    }

    public List<User> getCustomers() {
        return userRepo.findByRole("user");
    }

    public User getById(Integer id) {
        User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        // Chỉ cho phép lấy user có role là user hoặc host
        if (!user.getRole().equals("user") && !user.getRole().equals("host")) {
            throw new RuntimeException("Access denied: not user or host");
        }

        return user;
    }

    public User create(User user) {
        if (!user.getRole().equals("user") && !user.getRole().equals("host")) {
            throw new RuntimeException("Only user or host can be created");
        }
        return userRepo.save(user);
    }

    public User update(Integer id, User updated) {
        User existing = getById(id);

        // Chỉ cho update nếu là user hoặc host
        if (!existing.getRole().equals("user") && !existing.getRole().equals("host")) {
            throw new RuntimeException("Update restricted to user/host roles");
        }

        existing.setFullName(updated.getFullName());
        existing.setPhone(updated.getPhone());
        existing.setEmail(updated.getEmail());
        existing.setAddress(updated.getAddress());
        existing.setBirthdate(updated.getBirthdate());
        existing.setStatus(updated.getStatus());
        return userRepo.save(existing);
    }

    public void delete(Integer id) {
        User user = getById(id);

        // Chỉ xoá user/host
        if (!user.getRole().equals("user") && !user.getRole().equals("host")) {
            throw new RuntimeException("Cannot delete admin accounts");
        }

        userRepo.deleteById(id);
    }

    public User getHostForManagement(Integer id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Kiểm tra user có phải là host không
        if (!user.getRole().equals("host")) {
            throw new RuntimeException("User is not a host");
        }

        // Kiểm tra quyền của user hiện tại
        String currentRole = SecurityContextHolder.getContext()
                .getAuthentication().getAuthorities().toString();

        // ADMIN và HOST đều có thể truy cập host management
        if (currentRole.contains("ROLE_ADMIN") || currentRole.contains("ROLE_HOST")) {
            return user;
        }

        throw new RuntimeException("Access denied: Only ADMIN or HOST can access host management");
    }

    // Method mới cho update host
    public User updateHost(Integer id, User updated) {
        User existing = getHostForManagement(id);  // Sử dụng method mới

        existing.setFullName(updated.getFullName());
        existing.setPhone(updated.getPhone());
        existing.setEmail(updated.getEmail());
        existing.setAddress(updated.getAddress());
        existing.setBirthdate(updated.getBirthdate());
        existing.setStatus(updated.getStatus());
        existing.setRole("host");

        return userRepo.save(existing);
    }

    // Method mới cho delete host
    public void deleteHost(Integer id) {
        User user = getHostForManagement(id);  // Sử dụng method mới
        userRepo.deleteById(id);
    }

    public long countHosts() {
        return userRepo.countByRole("host");
    }

    public long countCustomers() {
        return userRepo.countByRole("user");
    }
}
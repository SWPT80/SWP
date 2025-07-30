package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.exception.ResourceNotFoundException;
import com.traexcohomestay.hoteltraexco.model.HostRequest;
import com.traexcohomestay.hoteltraexco.model.User;
import com.traexcohomestay.hoteltraexco.repository.HostRequestRepository;
import com.traexcohomestay.hoteltraexco.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class HostRequestServiceImpl implements HostRequestService {

    @Autowired
    private HostRequestRepository hostRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MailService mailService;

    @Override
    public HostRequest submitRequest(HostRequest req) {
        Integer userId = req.getUser() != null ? req.getUser().getId() : null;
        if (userId == null) {
            throw new IllegalArgumentException("Yêu cầu phải đính kèm thông tin user (user_id)");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + userId));

        req.setUser(user);
        req.setStatus("PENDING");
        req.setCreatedAt(LocalDateTime.now());
        String token = java.util.UUID.randomUUID().toString();
        req.setVerifyToken(token);
        req.setEmailVerified(false);

        HostRequest saved = hostRequestRepository.save(req);
        String verifyLink = "http://localhost:8080/api/host/verify-email?token=" + token;

        try {
            mailService.sendVerificationEmail(user.getEmail(), verifyLink);
        } catch (Exception e) {
            hostRequestRepository.delete(saved);
            throw new RuntimeException("Không gửi được email xác minh. Vui lòng thử lại sau.");
        }

        return saved;
    }

    @Override
    public List<HostRequest> getAll() {
        return hostRequestRepository.findAll();
    }

    @Override
    public List<HostRequest> getPending() {
        return hostRequestRepository.findByStatus("PENDING");
    }

    @Override
    public HostRequest approve(Integer id) {
        HostRequest request = hostRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy yêu cầu"));

        if (!Boolean.TRUE.equals(request.getEmailVerified())) {
            throw new IllegalStateException("Email chưa được xác minh.");
        }

        request.setStatus("APPROVED");
        hostRequestRepository.save(request);

        User user = request.getUser();
        if (user != null) {
            user.setRole("host");
            userRepository.save(user);
            mailService.sendCongratulationEmail(user.getEmail());
        }

        return request;
    }

    @Override
    public HostRequest reject(Integer id) {
        HostRequest request = hostRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy yêu cầu"));

        User user = request.getUser();
        if (user != null) {
            mailService.sendRejectionEmail(user.getEmail(), user.getFullName());
        }

        hostRequestRepository.delete(request);
        return request;
    }

    @Override
    public HostRequest findByVerifyToken(String token) {
        return hostRequestRepository.findByVerifyToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Token không hợp lệ"));
    }

    @Override
    public HostRequest save(HostRequest req) {
        return hostRequestRepository.save(req);
    }

    @Override
    public boolean existsByUserIdAndStatusNot(Integer userId, String status) {
        return hostRequestRepository.existsByUserIdAndStatusNot(userId, status);
    }
}

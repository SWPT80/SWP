package com.traexcohomestay.hoteltraexco.controller;

import com.traexcohomestay.hoteltraexco.dto.HostRequestDTO;
import com.traexcohomestay.hoteltraexco.model.HostRequest;
import com.traexcohomestay.hoteltraexco.model.User;
import com.traexcohomestay.hoteltraexco.repository.UserRepository;
import com.traexcohomestay.hoteltraexco.service.HostRequestService;
import com.traexcohomestay.hoteltraexco.service.MailService;
import com.traexcohomestay.hoteltraexco.service.UserManagement;
import com.traexcohomestay.hoteltraexco.util.FileStorageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/host")
public class HostController {

    @Autowired
    private UserManagement userService;

    @Autowired
    private HostRequestService hostRequestService;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MailService mailService;

    // Đăng ký trở thành host
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestParam("type") String type,
            @RequestParam("specificField1") String field1,
            @RequestParam(value = "specificField2", required = false) String field2,
            @RequestParam("description") String description,
            @RequestParam("documentType") String documentType,
            @RequestParam("identityFile") MultipartFile identityFile,
            @RequestParam(value = "socialLink", required = false) String socialLink,
            @RequestParam(value = "introVideo", required = false) MultipartFile introVideo,
            Authentication authentication
    ) {
        String emailAuth = authentication.getName();
        User user = userRepository.findByEmail(emailAuth)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));

        if (hostRequestService.existsByUserIdAndStatusNot(user.getId(), "REJECTED")) {
            return ResponseEntity.badRequest().body("Bạn đã gửi yêu cầu và đang chờ xét duyệt. Chỉ có thể gửi lại khi bị từ chối.");
        }

        String identityPath = FileStorageUtil.save(identityFile, "identity");
        String videoPath = (introVideo != null && !introVideo.isEmpty()) ? FileStorageUtil.save(introVideo, "video") : null;

        HostRequest req = new HostRequest();
        req.setUser(user);
        req.setType(type);
        req.setField1(field1);
        req.setField2(field2);
        req.setDescription(description);
        req.setDocumentType(documentType);
        req.setIdentityFileUrl(identityPath);
        req.setSocialLink(socialLink);
        req.setIntroVideoUrl(videoPath);

        // ✅ Gọi đúng method để sinh token + gửi email + save
        hostRequestService.submitRequest(req);

        return ResponseEntity.ok("Đăng ký thành công! Vui lòng kiểm tra email để xác minh.");
    }

    // Lấy danh sách các yêu cầu trở thành host dưới dạng DTO
    @GetMapping("/requests")
    public List<HostRequestDTO> getAllRequests() {
        return hostRequestService.getAll().stream().map(hr -> {
            HostRequestDTO dto = new HostRequestDTO();
            dto.setId(hr.getId());
            dto.setType(hr.getType());
            dto.setField1(hr.getField1());
            dto.setField2(hr.getField2());
            dto.setDescription(hr.getDescription());
            dto.setStatus(hr.getStatus());

            // 🧩 Bổ sung các trường còn thiếu
            dto.setDocumentType(hr.getDocumentType());
            dto.setIdentityFileUrl(hr.getIdentityFileUrl());
            dto.setSocialLink(hr.getSocialLink());
            dto.setIntroVideoUrl(hr.getIntroVideoUrl());

            if (hr.getUser() != null) {
                dto.setFullName(hr.getUser().getFullName());
                dto.setEmail(hr.getUser().getEmail());
                dto.setPhone(hr.getUser().getPhone());
            }

            return dto;
        }).collect(Collectors.toList());
    }


    // Chấp nhận yêu cầu trở thành host
    @PutMapping("/requests/{id}/approve")
    public ResponseEntity<HostRequestDTO> approve(@PathVariable Integer id) {
        HostRequest hr = hostRequestService.approve(id);
        HostRequestDTO dto = new HostRequestDTO();
        dto.setId(hr.getId());
        dto.setType(hr.getType());
        dto.setField1(hr.getField1());
        dto.setField2(hr.getField2());
        dto.setDescription(hr.getDescription());
        dto.setStatus(hr.getStatus());
        if (hr.getUser() != null) {
            dto.setFullName(hr.getUser().getFullName());
            dto.setEmail(hr.getUser().getEmail());
            dto.setPhone(hr.getUser().getPhone());
        }
        return ResponseEntity.ok(dto);
    }

    // Từ chối yêu cầu trở thành host
    @PutMapping("/requests/{id}/reject")
    public ResponseEntity<HostRequestDTO> reject(@PathVariable Integer id) {
        HostRequest hr = hostRequestService.reject(id);
        HostRequestDTO dto = new HostRequestDTO();
        dto.setId(hr.getId());
        dto.setType(hr.getType());
        dto.setField1(hr.getField1());
        dto.setField2(hr.getField2());
        dto.setDescription(hr.getDescription());
        dto.setStatus(hr.getStatus());
        if (hr.getUser() != null) {
            dto.setFullName(hr.getUser().getFullName());
            dto.setEmail(hr.getUser().getEmail());
            dto.setPhone(hr.getUser().getPhone());
        }
        return ResponseEntity.ok(dto);
    }
    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam String token) {
        try {
            HostRequest req = hostRequestService.findByVerifyToken(token);
            req.setEmailVerified(true);
            req.setVerifyToken(null);
            hostRequestService.save(req);

            return ResponseEntity.ok("Xác minh email thành công. Bạn có thể quay lại ứng dụng.");
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Xác minh thất bại: Token không hợp lệ hoặc đã được sử dụng.");
        }
    }
    @GetMapping("/check-request-status")
    public ResponseEntity<?> checkRequestStatus(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));

        boolean exists = hostRequestService.existsByUserIdAndStatusNot(user.getId(), "REJECTED");
        return ResponseEntity.ok(exists); // true = đã gửi (status khác REJECTED)
    }





    // ⭐ LẤY DANH SÁCH HOST
    @GetMapping
    public List<User> getAllHosts() {
        return userService.getHosts();
    }

    @GetMapping("/{id}")
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
package com.traexcohomestay.hoteltraexco.controller;

import com.traexcohomestay.hoteltraexco.dto.ServiceDTO;
import com.traexcohomestay.hoteltraexco.model.Notification;
import com.traexcohomestay.hoteltraexco.model.User;
import com.traexcohomestay.hoteltraexco.repository.UserRepository;
import com.traexcohomestay.hoteltraexco.service.NotificationService;
import com.traexcohomestay.hoteltraexco.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public ResponseEntity<List<ServiceDTO>> getAllServices() {
        return ResponseEntity.ok(serviceService.getAllServices());
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<ServiceDTO>> getAllServicesPaged(Pageable pageable) {
        return ResponseEntity.ok(serviceService.getAllServicesPaged(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceDTO> getServiceById(@PathVariable Integer id) {
        return ResponseEntity.ok(serviceService.getServiceById(id));
    }

//    @PostMapping
//    public ResponseEntity<ServiceDTO> createService(@RequestBody ServiceDTO serviceDTO) {
//        return ResponseEntity.ok(serviceService.createService(serviceDTO));
//    }

    @PostMapping
    public ResponseEntity<ServiceDTO> createService(@RequestBody ServiceDTO serviceDTO) {
        try {
            System.out.println("=== CREATE SERVICE REQUEST ===");
            System.out.println("- homestayId: " + serviceDTO.getHomestayId());
            System.out.println("- typeId: " + serviceDTO.getTypeId());
            System.out.println("- price: " + serviceDTO.getPrice());
            System.out.println("- specialNotes: " + serviceDTO.getSpecialNotes());
            System.out.println("- status: " + serviceDTO.getStatus());

            // Validate required fields
            if (serviceDTO.getHomestayId() == null) {
                return ResponseEntity.badRequest().body(null);
            }
            if (serviceDTO.getTypeId() == null) {
                return ResponseEntity.badRequest().body(null);
            }
            if (serviceDTO.getPrice() == null) {
                return ResponseEntity.badRequest().body(null);
            }

            // ✅ Tạo dịch vụ
            ServiceDTO created = serviceService.createService(serviceDTO);
            System.out.println("Service created successfully with ID: " + created.getId());

            // ✅ Gửi thông báo cho Admin
            List<User> admins = userRepository.findByRole("ADMIN");
            for (User admin : admins) {
                String message = String.format("Host đã yêu cầu thêm dịch vụ mới cho homestay ID %d (Service ID: %d).", serviceDTO.getHomestayId(), created.getId());

                Notification noti = notificationService.createNotification(admin, message, "Yêu cầu thêm dịch vụ");
                notificationService.sendEmail(admin, noti);
            }

            return ResponseEntity.ok(created);

        } catch (Exception e) {
            System.err.println("Error creating service: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<ServiceDTO> updateService(@PathVariable Integer id, @RequestBody ServiceDTO serviceDTO) {
        return ResponseEntity.ok(serviceService.updateService(id, serviceDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Integer id) {
        serviceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/homestay/{homestayId}")
    public ResponseEntity<List<ServiceDTO>> getServicesByHomestayId(@PathVariable Integer homestayId) {
        return ResponseEntity.ok(serviceService.findByHomestayId(homestayId));
    }

    // ✅ Lấy danh sách các dịch vụ có status = pending
    @GetMapping("/pending")
    public ResponseEntity<List<ServiceDTO>> getPendingServices() {
        return ResponseEntity.ok(serviceService.getServicesByStatus("pending"));
    }

    @GetMapping("/host/{hostId}")
    public ResponseEntity<List<ServiceDTO>> getServicesByHost(@PathVariable Integer hostId) {
        List<ServiceDTO> services = serviceService.findByHostId(hostId);
        return ResponseEntity.ok(services);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateServiceStatus(@PathVariable Integer id, @RequestParam("status") String status) {
        if (!status.equalsIgnoreCase("approved") && !status.equalsIgnoreCase("rejected")) {
            return ResponseEntity.badRequest().body("Invalid status. Use 'approved' or 'rejected'.");
        }

        try {
            ServiceDTO updatedService = serviceService.updateStatus(id, status.toLowerCase());

            // ✅ Gửi thông báo tới host
            Integer homestayId = updatedService.getHomestayId();
            Optional<User> hostOpt = userRepository.findHostByHomestayId(homestayId);

            if (hostOpt.isPresent()) {
                User host = hostOpt.get();

                String message = status.equalsIgnoreCase("approved") ? "Dịch vụ bạn yêu cầu đã được phê duyệt." : "Dịch vụ bạn yêu cầu đã bị từ chối.";

                Notification noti = notificationService.createNotification(host, message + " (Service ID: " + updatedService.getId() + ")", "Kết quả xét duyệt dịch vụ");
                notificationService.sendEmail(host, noti);
            }

            return ResponseEntity.ok(updatedService);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to update status: " + e.getMessage());
        }
    }


}
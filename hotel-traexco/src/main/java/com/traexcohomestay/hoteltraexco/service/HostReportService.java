package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.ReportDTO;
import com.traexcohomestay.hoteltraexco.model.*;
import com.traexcohomestay.hoteltraexco.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HostReportService {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final ServiceRepository serviceRepository;
    private final NotificationService notificationService;

    public List<ReportDTO> getAllReportsForAdmin() {
        return reportRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public List<ReportDTO> getReportsByUser(Integer userId) {
        return reportRepository.findByUser_Id(userId).stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Transactional
    public ReportDTO submitReport(ReportDTO dto) {
        Report report = new Report();

        // Set user gửi báo cáo
        User sender = userRepository.findById(dto.getUserId()).orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));
        report.setUser(sender);

        // Xử lý theo loại báo cáo
        String type = dto.getReportType();

        // Báo cáo phòng → cần cả homestayId và roomNumber
        if ("room".equalsIgnoreCase(type) && dto.getHomestayId() != null && dto.getRoomNumber() != null) {

            Room room = roomRepository.findById_HomestayIdAndId_RoomNumber(dto.getHomestayId(), dto.getRoomNumber()).orElse(null);

            if (room != null) {
                report.setRooms(room);
            }

            // Báo cáo homestay → chỉ cần homestayId, lấy phòng bất kỳ trong đó
        } else if ("homestay".equalsIgnoreCase(type) && dto.getHomestayId() != null) {

            Room anyRoom = roomRepository.findFirstByHomestay_HomestayId(dto.getHomestayId()).orElse(null);

            if (anyRoom != null) {
                report.setRooms(anyRoom);
            }
        }

        // Báo cáo dịch vụ
        if ("service".equalsIgnoreCase(type) && dto.getServiceId() != null) {
            com.traexcohomestay.hoteltraexco.model.Service service = serviceRepository.findById(dto.getServiceId()).orElse(null);
            if (service != null) {
                report.setService(service);
            }
        }

        // Gán thông tin cơ bản
        report.setReportType(type);
        report.setTitle(dto.getTitle());
        report.setDescription(dto.getDescription());
        report.setStatus("pending");
        report.setCreatedAt(Instant.now());

        // Log để kiểm tra
        System.out.println("ReportDTO nhận được:");
        System.out.println("User ID: " + dto.getUserId());
        System.out.println("Homestay ID: " + dto.getHomestayId());
        System.out.println("Room Number: " + dto.getRoomNumber());
        System.out.println("Service ID: " + dto.getServiceId());

        // Lưu và trả về DTO
        return mapToDTO(reportRepository.save(report));
    }

    private ReportDTO mapToDTO(Report r) {
        ReportDTO dto = new ReportDTO();
        dto.setId(r.getId());
        dto.setUserId(r.getUser().getId());
        dto.setServiceId(r.getService() != null ? r.getService().getId() : null);
        dto.setReportType(r.getReportType());
        dto.setTitle(r.getTitle());
        dto.setDescription(r.getDescription());
        dto.setStatus(r.getStatus());
        dto.setCreatedAt(r.getCreatedAt());
        dto.setUpdatedAt(r.getUpdatedAt());

        // ✅ BỔ SUNG DÒNG NÀY
        dto.setActionTaken(r.getActionTaken());
        dto.setResolutionNote(r.getResolutionNote());
        dto.setResolvedAt(r.getResolvedAt());

        if (r.getRooms() != null && r.getRooms().getHomestay() != null) {
            dto.setHomestayId(r.getRooms().getHomestay().getHomestayId());
            dto.setHomestayName(r.getRooms().getHomestay().getHomestayName()); // 👈 Lấy tên homestay
            dto.setRoomNumber(r.getRooms().getRoomNumber());
        }

        return dto;
    }

    @Transactional
    public ReportDTO resolveReport(Integer reportId, ReportDTO resolutionDTO) {
        Report report = reportRepository.findById(reportId).orElseThrow(() -> new RuntimeException("Không tìm thấy báo cáo"));

        report.setActionTaken(resolutionDTO.getActionTaken());
        report.setResolutionNote(resolutionDTO.getResolutionNote());
        report.setStatus("resolved");
        report.setUpdatedAt(Instant.now());
        report.setResolvedAt(Instant.now());

        // Xử lý Cấm vĩnh viễn
        if ("Cấm vĩnh viễn".equalsIgnoreCase(resolutionDTO.getActionTaken())) {
            User host = null;

            if (report.getRooms() != null) {
                Room room = report.getRooms();
                if (room.getHomestay() != null) {
                    host = room.getHomestay().getHost();
                }
            } else if (report.getService() != null) {
                com.traexcohomestay.hoteltraexco.model.Service service = report.getService();
                if (service.getHomestay() != null) {
                    host = service.getHomestay().getHost();
                }
            }

            if (host != null && "host".equalsIgnoreCase(host.getRole())) {
                host.setStatus(false); // Khóa tài khoản host
                userRepository.save(host);
            } else {
                throw new RuntimeException("Không xác định được Host từ báo cáo");
            }
        }

        // Gửi cảnh báo nếu là hình thức "Cảnh cáo"
        if ("Cảnh cáo".equalsIgnoreCase(resolutionDTO.getActionTaken())) {
            User host = null;

            if (report.getRooms() != null) {
                Room room = report.getRooms();
                if (room.getHomestay() != null) {
                    host = room.getHomestay().getHost();
                }
            } else if (report.getService() != null) {
                com.traexcohomestay.hoteltraexco.model.Service service = report.getService();
                if (service.getHomestay() != null) {
                    host = service.getHomestay().getHost();
                }
            }

            if (host != null && "host".equalsIgnoreCase(host.getRole())) {
                notificationService.sendEmail(host, notificationService.createNotification(host, "Bạn đã bị cảnh cáo do vi phạm nội quy hệ thống. Vui lòng xem lại và tuân thủ quy định.", "Cảnh cáo"));
            }
        }

        return mapToDTO(reportRepository.save(report));
    }
}

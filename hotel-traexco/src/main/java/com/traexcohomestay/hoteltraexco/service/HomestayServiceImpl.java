package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.HomestayDTO;
import com.traexcohomestay.hoteltraexco.dto.HomestayImageDTO;
import com.traexcohomestay.hoteltraexco.exception.ResourceNotFoundException;
import com.traexcohomestay.hoteltraexco.model.Homestay;
import com.traexcohomestay.hoteltraexco.repository.HomestayRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class HomestayServiceImpl implements HomestayService {

    private static final Logger logger = LoggerFactory.getLogger(HomestayServiceImpl.class);

    @Autowired
    private HomestayRepository homestayRepository;

    @Autowired
    private GeocodingService geocodingService;

    @Override
    @Transactional(readOnly = true)
    public List<HomestayDTO> getAllHomestays() {
        return homestayRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Page<HomestayDTO> getAllHomestaysPaged(Pageable pageable) {
        return homestayRepository.findAll(pageable).map(this::convertToDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public HomestayDTO getHomestayById(Integer id) {
        Homestay homestay = homestayRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Homestay not found with id: " + id));
        return convertToDTO(homestay);
    }
//
//    @Override
//    public HomestayDTO createHomestay(HomestayDTO homestayDTO) {
//        Homestay homestay = convertToEntity(homestayDTO);
//        Homestay savedHomestay = homestayRepository.save(homestay);
//        return convertToDTO(savedHomestay);
//    }
//
//    @Override
//    public HomestayDTO updateHomestay(Integer id, HomestayDTO homestayDTO) {
//        Homestay homestay = homestayRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Homestay not found with id: " + id));
//
//        homestay.setHomestayName(homestayDTO.getHomestayName());
//        homestay.setAddress(homestayDTO.getAddress());
//        homestay.setLocation(homestayDTO.getLocation()); // Thêm dòng này
//        homestay.setDescription(homestayDTO.getDescription());
//        homestay.setHostId(homestayDTO.getHostId());
//        homestay.setStatus(homestayDTO.getStatus());
//
//        Homestay updatedHomestay = homestayRepository.save(homestay);
//        return convertToDTO(updatedHomestay);
//    }

    @Override
    public HomestayDTO createHomestay(HomestayDTO homestayDTO) {
        Homestay homestay = convertToEntity(homestayDTO);

        String fullAddress = buildFullAddress(homestayDTO);
        logger.info("Truy vấn toạ độ cho địa chỉ: {}", fullAddress);

        Float[] coords = geocodingService.getCoordinatesFromAddress(fullAddress);
        if (coords != null) {
            homestay.setLatitude(coords[0]);
            homestay.setLongitude(coords[1]);
            logger.info("Đã lấy toạ độ lat={}, lng={} cho địa chỉ mới", coords[0], coords[1]);
        } else {
            logger.warn("Không tìm thấy toạ độ cho homestay mới: {}, địa chỉ: {}", homestay.getHomestayName(), fullAddress);
        }

        Homestay savedHomestay = homestayRepository.save(homestay);
        return convertToDTO(savedHomestay);
    }

    @Override
    public HomestayDTO updateHomestay(Integer id, HomestayDTO homestayDTO) {
        Homestay homestay = homestayRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Homestay not found"));

        homestay.setHomestayName(homestayDTO.getHomestayName());
        homestay.setAddress(homestayDTO.getAddress());
        homestay.setLocation(homestayDTO.getLocation());
        homestay.setDescription(homestayDTO.getDescription());
        homestay.setStatus(homestayDTO.getStatus());

        String fullAddress = buildFullAddress(homestayDTO);
        logger.info("Truy vấn toạ độ khi cập nhật cho ID {}: {}", id, fullAddress);

        Float[] coords = geocodingService.getCoordinatesFromAddress(fullAddress);
        if (coords != null) {
            homestay.setLatitude(coords[0]);
            homestay.setLongitude(coords[1]);
            logger.info("Đã cập nhật toạ độ lat={}, lng={} cho ID {}", coords[0], coords[1], id);
        } else {
            logger.warn("Không tìm thấy toạ độ khi cập nhật ID {}: {}", id, fullAddress);
        }

        Homestay updatedHomestay = homestayRepository.save(homestay);
        return convertToDTO(updatedHomestay);
    }

    @Override
    public void deleteHomestay(Integer id) {
        Homestay homestay = homestayRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Homestay not found with id: " + id));
        homestayRepository.delete(homestay);
    }

    @Override
    @Transactional(readOnly = true)
    public List<HomestayDTO> searchHomestays(String name) {
        return homestayRepository.findByHomestayNameContainingIgnoreCase(name).stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<HomestayDTO> searchByLocation(String location) {
        return homestayRepository.findByLocationContainingIgnoreCase(location).stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private String buildFullAddress(HomestayDTO dto) {
        Set<String> parts = new LinkedHashSet<>();

        if (dto.getAddress() != null && !dto.getAddress().trim().isEmpty()) {
            parts.add(dto.getAddress().trim());
        }

        if (dto.getLocation() != null && !dto.getLocation().trim().isEmpty()) {
            parts.add(dto.getLocation().trim());
        }

        parts.add("Vietnam");

        return String.join(", ", parts);
    }

//    private HomestayDTO convertToDTO(Homestay homestay) {
//        HomestayDTO dto = new HomestayDTO();
//        dto.setId(homestay.getHomestayId());
//        dto.setHomestayName(homestay.getHomestayName());
//        dto.setAddress(homestay.getAddress());
//        dto.setLocation(homestay.getLocation()); // Thêm dòng này
//        dto.setDescription(homestay.getDescription());
//        dto.setHostId(homestay.getHostId());
//        dto.setStatus(homestay.getStatus());
//
//        // Lấy danh sách ảnh
//        if (homestay.getImages() != null) {
//            List<HomestayImageDTO> imageDTOs = homestay.getImages().stream().map(image -> {
//                HomestayImageDTO imgDTO = new HomestayImageDTO();
//                imgDTO.setImageUrl(image.getImageUrl());
//                imgDTO.setDescription(image.getDescription());
//                return imgDTO;
//            }).collect(Collectors.toList());
//            dto.setImages(imageDTOs);
//        }
//
//        return dto;
//    }

    private HomestayDTO convertToDTO(Homestay homestay) {
        HomestayDTO dto = new HomestayDTO();
        dto.setId(homestay.getHomestayId());
        dto.setHomestayName(homestay.getHomestayName());
        dto.setAddress(homestay.getAddress());
        dto.setLocation(homestay.getLocation());
        dto.setDescription(homestay.getDescription());
        dto.setHostId(homestay.getHostId());
        dto.setStatus(homestay.getStatus());
        dto.setLatitude(homestay.getLatitude());
        dto.setLongitude(homestay.getLongitude());

        if (homestay.getImages() != null) {
            List<HomestayImageDTO> imageDTOs = homestay.getImages().stream().map(image -> {
                HomestayImageDTO imgDTO = new HomestayImageDTO();
                imgDTO.setImageUrl(image.getImageUrl());
                imgDTO.setDescription(image.getDescription());
                return imgDTO;
            }).collect(Collectors.toList());
            dto.setImages(imageDTOs);
        }

        return dto;
    }

//    private Homestay convertToEntity(HomestayDTO dto) {
//        Homestay homestay = new Homestay();
//        homestay.setHomestayId(dto.getId());
//        homestay.setHomestayName(dto.getHomestayName());
//        homestay.setAddress(dto.getAddress());
//        homestay.setLocation(dto.getLocation()); // Thêm dòng này
//        homestay.setDescription(dto.getDescription());
//        homestay.setHostId(dto.getHostId());
//        homestay.setStatus(dto.getStatus());
//        return homestay;
//    }

    private Homestay convertToEntity(HomestayDTO dto) {
        Homestay homestay = new Homestay();
        homestay.setHomestayId(dto.getId());
        homestay.setHomestayName(dto.getHomestayName());
        homestay.setAddress(dto.getAddress());
        homestay.setLocation(dto.getLocation());
        homestay.setDescription(dto.getDescription());
        homestay.setHostId(dto.getHostId());
        homestay.setStatus(dto.getStatus());
        homestay.setLatitude(dto.getLatitude());
        homestay.setLongitude(dto.getLongitude());
        return homestay;
    }

    public List<HomestayDTO> getHomestaysByHostId(int hostId) {
        List<Homestay> homestays = homestayRepository.findByHostId(hostId);
        return homestays.stream().map(h -> {
            HomestayDTO dto = new HomestayDTO();
            dto.setId(h.getHomestayId());
            dto.setHostId(h.getHostId());
            dto.setHomestayName(h.getHomestayName());
            dto.setAddress(h.getAddress());
            dto.setDescription(h.getDescription());
            dto.setStatus(h.getStatus());
            dto.setLocation(h.getLocation());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<HomestayDTO> getNearbyHomestays(double userLatitude, double userLongitude) {
        logger.info("Tính khoảng cách đến homestays từ vị trí: lat={}, lng={}", userLatitude, userLongitude);
        if (!isValidCoordinate(userLatitude, userLongitude)) {
            logger.error("Tọa độ người dùng không hợp lệ: lat={}, lng={}", userLatitude, userLongitude);
            return List.of();
        }

        List<Homestay> homestays = homestayRepository.findAll();
        return homestays.stream().map(homestay -> {
            HomestayDTO dto = convertToDTO(homestay);
            if (homestay.getLatitude() != null && homestay.getLongitude() != null) {
                double distance = calculateDistance(userLatitude, userLongitude, homestay.getLatitude(), homestay.getLongitude());
                if (homestay.getLocation().contains("Đà Lạt") && userLatitude >= 15.0 && userLatitude <= 17.0 && distance < 500) {
                    logger.warn("Khoảng cách đến homestay {} tại Đà Lạt bất thường: {} km", homestay.getHomestayId(), distance);
                }
                dto.setDistance(distance);
                logger.debug("Khoảng cách từ ({}, {}) đến homestay {}: {} km", userLatitude, userLongitude, homestay.getHomestayId(), distance);
            }
            return dto;
        }).filter(dto -> dto.getDistance() != null && dto.getDistance() != Double.MAX_VALUE).sorted(Comparator.comparing(HomestayDTO::getDistance)).collect(Collectors.toList());
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        if (!isValidCoordinate(lat1, lon1) || !isValidCoordinate(lat2, lon2)) {
            logger.warn("Tọa độ không hợp lệ: lat1={}, lon1={}, lat2={}, lon2={}", lat1, lon1, lat2, lon2);
            return Double.MAX_VALUE;
        }
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return 6371 * c; // Khoảng cách tính bằng km
    }

    private boolean isValidCoordinate(double lat, double lon) {
        return !Double.isNaN(lat) && !Double.isNaN(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
    }
}
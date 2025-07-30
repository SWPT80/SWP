package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.HomestayDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface HomestayService {
    List<HomestayDTO> getAllHomestays();
    Page<HomestayDTO> getAllHomestaysPaged(Pageable pageable);
    HomestayDTO getHomestayById(Integer id);
    HomestayDTO createHomestay(HomestayDTO homestayDTO);
    HomestayDTO updateHomestay(Integer id, HomestayDTO homestayDTO);
    void deleteHomestay(Integer id);
    List<HomestayDTO> searchHomestays(String name);
    List<HomestayDTO> searchByLocation(String location);
    List<HomestayDTO> getHomestaysByHostId(int hostId);
    // Thêm phương thức mới để lấy homestays gần vị trí người dùng
    List<HomestayDTO> getNearbyHomestays(double userLatitude, double userLongitude);
}
package Homestay.Repository;

import Homestay.Model.HomestayService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<HomestayService, Integer> {
    List<HomestayService> findByType_TypeId(Integer typeId); // Lấy tất cả dịch vụ theo loại (ẩm thực, tour...)
    List<HomestayService> findByStatus(Boolean status);
    List<HomestayService> findByHomestay_HomestayId(Integer homestayId);
}

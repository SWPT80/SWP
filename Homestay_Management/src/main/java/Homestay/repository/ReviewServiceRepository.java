package Homestay.repository;

import Homestay.model.ReviewService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewServiceRepository extends JpaRepository<ReviewService, Integer> {
    List<ReviewService> findByService_Homestay_HomestayId(Integer homestayId);
    List<ReviewService> findByService_ServiceId(Integer serviceId);
}
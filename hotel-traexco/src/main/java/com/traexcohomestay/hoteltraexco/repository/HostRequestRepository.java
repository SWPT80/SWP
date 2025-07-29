package com.traexcohomestay.hoteltraexco.repository;

import com.traexcohomestay.hoteltraexco.model.HostRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface HostRequestRepository extends JpaRepository<HostRequest, Integer> {
    List<HostRequest> findByStatus(String status);
    Optional<HostRequest> findByVerifyToken(String token);
    boolean existsByUserIdAndStatusNot(Integer userId, String status);

}

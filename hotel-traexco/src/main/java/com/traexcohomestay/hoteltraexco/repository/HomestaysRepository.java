package com.traexcohomestay.hoteltraexco.repository;
import com.traexcohomestay.hoteltraexco.model.Homestay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HomestaysRepository extends JpaRepository<Homestay, Integer> {
    Optional<Homestay> findByHostId(Integer hostId);
    List<Homestay> findByHomestayNameContainingIgnoreCase(String name);
    List<Homestay> findByLocationContainingIgnoreCase(String location);
}



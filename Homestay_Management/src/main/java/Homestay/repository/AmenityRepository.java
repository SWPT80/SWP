package Homestay.repository;

import Homestay.model.Amenity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AmenityRepository extends JpaRepository<Amenity, Integer> {
    List<Amenity> findByHomestay_HomestayId(Integer homestayId);
}
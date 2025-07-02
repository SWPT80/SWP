package com.respository;

import com.entity.Homestays;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HomestayRepository extends JpaRepository<Homestays, Integer> {
    List<Homestays> findByHostId(int hostId);
}

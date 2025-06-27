package com.respository;



import com.entity.Homestays;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HomestaysRepository extends JpaRepository<Homestays, Integer> {
    Optional<Homestays> findByHostId(Integer hostId);
}



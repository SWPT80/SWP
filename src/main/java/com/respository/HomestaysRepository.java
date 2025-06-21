package com.respository;



import com.entity.Homestays;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomestaysRepository extends JpaRepository<Homestays, Integer> {
    // Bạn có thể thêm các hàm custom nếu cần, ví dụ:
    // List<Homestay> findByHostUserId(int hostId);
}


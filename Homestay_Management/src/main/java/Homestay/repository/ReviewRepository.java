// ReviewRepository.java
package Homestay.repository;

import Homestay.model.Review;
import Homestay.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findByUser(User user);
    List<Review> findByUser_UserId(Integer userId);
}

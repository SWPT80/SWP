package Homestay.repository;

import Homestay.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByRoleIn(List<String> roles); // Tìm theo nhiều role
    List<User> findByRole(String role);
    List<User> findByStatus(Boolean status);
    Optional<User> findByEmail(String email);
    Optional<User> findByResetToken(String token);
    List<User> findByFullNameContainingIgnoreCaseAndRoleIn(String fullName, List<String> roles);
}

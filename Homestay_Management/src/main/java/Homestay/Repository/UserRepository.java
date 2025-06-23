package Homestay.Repository;

import Homestay.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByRoleIn(List<String> roles); // Tìm theo nhiều role
    List<User> findByRole(String role);
    List<User> findByStatus(Boolean status);
    List<User> findByFullNameContainingIgnoreCaseAndRoleIn(String fullName, List<String> roles);
}

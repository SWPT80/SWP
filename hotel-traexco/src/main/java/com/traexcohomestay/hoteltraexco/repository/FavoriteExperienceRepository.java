package com.traexcohomestay.hoteltraexco.repository;

import com.traexcohomestay.hoteltraexco.model.Experience;
import com.traexcohomestay.hoteltraexco.model.FavoriteExperience;
import com.traexcohomestay.hoteltraexco.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface FavoriteExperienceRepository extends JpaRepository<FavoriteExperience, Integer> {
    Optional<FavoriteExperience> findByUserAndExperience(User user, Experience experience);
    List<FavoriteExperience> findByUser(User user);
    void deleteByUserAndExperience(User user, Experience experience);
}

package com.traexcohomestay.hoteltraexco.repository;

import com.traexcohomestay.hoteltraexco.model.FavoriteServiceModel;
import com.traexcohomestay.hoteltraexco.model.Service;
import com.traexcohomestay.hoteltraexco.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteServiceRepository extends JpaRepository<FavoriteServiceModel, Integer> {
    Optional<FavoriteServiceModel> findByUserAndService(User user, Service service);
    List<FavoriteServiceModel> findByUser(User user);
    void deleteByUserAndService(User user, Service service);
}
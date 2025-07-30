package com.traexcohomestay.hoteltraexco.repository;

import com.traexcohomestay.hoteltraexco.model.FavoriteHomestay;
import com.traexcohomestay.hoteltraexco.model.Homestay;
import com.traexcohomestay.hoteltraexco.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteHomestayRepository extends JpaRepository<FavoriteHomestay, Integer> {
    Optional<FavoriteHomestay> findByUserAndHomestay(User user, Homestay homestay);
    List<FavoriteHomestay> findByUser(User user);
    void deleteByUserAndHomestay(User user, Homestay homestay);
}

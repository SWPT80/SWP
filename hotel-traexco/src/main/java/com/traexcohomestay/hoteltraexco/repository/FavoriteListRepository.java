package com.traexcohomestay.hoteltraexco.repository;

import com.traexcohomestay.hoteltraexco.model.FavoriteList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteListRepository extends JpaRepository<FavoriteList, Integer> {
    List<FavoriteList> findByUser_Id(Integer userId);
}

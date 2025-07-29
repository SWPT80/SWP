package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.FavoriteListDTO;

import java.util.List;

public interface FavoriteListService {
    List<FavoriteListDTO> getListsByUser(Integer userId);
    FavoriteListDTO createList(Integer userId, String name);
    void addToList(Integer userId, Integer targetId, String targetType, Integer listId);

}
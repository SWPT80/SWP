package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.FavoriteResponseDTO;

import java.util.List;

public interface FavoriteService {
    void toggleFavorite(Integer userId, Integer targetId, String targetType);
    void addToList(Integer userId, Integer targetId, String targetType, Integer listId); // <- thêm dòng này
    List<FavoriteResponseDTO> getUserFavorites(Integer userId);
    boolean isFavorited(Integer userId, Integer targetId, String targetType);
}



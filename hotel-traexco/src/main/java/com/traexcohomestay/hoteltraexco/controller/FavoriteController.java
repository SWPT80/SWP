package com.traexcohomestay.hoteltraexco.controller;

import com.traexcohomestay.hoteltraexco.dto.*;

import com.traexcohomestay.hoteltraexco.model.FavoriteList;
import com.traexcohomestay.hoteltraexco.model.User;
import com.traexcohomestay.hoteltraexco.repository.FavoriteListRepository;
import com.traexcohomestay.hoteltraexco.repository.UserRepository;
import com.traexcohomestay.hoteltraexco.service.FavoriteService;
import com.traexcohomestay.hoteltraexco.service.FavoriteListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteController {
    private final UserRepository userRepository;
    private final FavoriteListRepository favoriteListRepository;
    private final FavoriteService favoriteService;
    private final FavoriteListService favoriteListService;

    // 1. Toggle yêu thích (icon trái tim) - chỉ dùng nếu không chọn danh sách cụ thể
    @PostMapping("/toggle")
    public ResponseEntity<?> toggleFavorite(@RequestBody FavoriteRequestDTO request) {
        favoriteService.toggleFavorite(
                request.getUserId().intValue(),
                request.getTargetId().intValue(),
                request.getTargetType()
        );
        return ResponseEntity.ok().build();
    }

    // 2. Lưu vào danh sách yêu thích cụ thể (sau khi chọn/tạo trong popup)
    @PostMapping("/add-to-list")
    public ResponseEntity<?> addToFavoriteList(@RequestBody AddToFavoriteListDTO dto) {
        favoriteService.addToList(dto.getUserId(), dto.getTargetId(), dto.getTargetType(), dto.getListId());
        return ResponseEntity.ok().build();
    }

    // 3. Lấy danh sách yêu thích của user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FavoriteResponseDTO>> getUserFavorites(@PathVariable Integer userId) {
        return ResponseEntity.ok(favoriteService.getUserFavorites(userId));
    }

    // 4. Lấy các danh sách yêu thích (dùng cho popup tạo/chọn)
    @GetMapping("/lists/{userId}")
    public ResponseEntity<List<FavoriteListDTO>> getUserFavoriteLists(@PathVariable Integer userId) {
        return ResponseEntity.ok(favoriteListService.getListsByUser(userId));
    }

    // 5. Tạo danh sách yêu thích mới
    @PostMapping("/lists")
    public ResponseEntity<FavoriteListResponseDTO> createFavoriteList(@RequestBody CreateFavoriteListDTO request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow();

        FavoriteList list = new FavoriteList();
        list.setUser(user);
        list.setName(request.getName());
        list.setCreatedAt(LocalDateTime.now());

        FavoriteList savedList = favoriteListRepository.save(list);

        FavoriteListResponseDTO response = new FavoriteListResponseDTO(
                savedList.getId(),
                user.getId(),
                savedList.getName(),
                savedList.getCreatedAt()
        );

        return ResponseEntity.ok(response);
    }
    @GetMapping("/is-favorited")
    public ResponseEntity<Boolean> checkIsFavorited(
            @RequestParam Integer userId,
            @RequestParam Integer targetId,
            @RequestParam String targetType) {
        return ResponseEntity.ok(favoriteService.isFavorited(userId, targetId, targetType));
    }

}


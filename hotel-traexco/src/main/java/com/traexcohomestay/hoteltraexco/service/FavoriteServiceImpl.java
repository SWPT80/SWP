package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.FavoriteResponseDTO;
import com.traexcohomestay.hoteltraexco.model.*;
import com.traexcohomestay.hoteltraexco.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteServiceImpl implements FavoriteService  {
    private final FavoriteListRepository favoriteListRepository;


    private final UserRepository userRepository;
    private final HomestayRepository homestayRepository;
    private final ExperienceRepository experienceRepository;
    private final ServiceRepository serviceRepository;

    private final FavoriteHomestayRepository favoriteHomestayRepository;
    private final FavoriteExperienceRepository favoriteExperienceRepository;
    private final FavoriteServiceRepository favoriteServiceRepository;

    @Override
    public void toggleFavorite(Integer userId, Integer targetId, String targetType) {
        User user = userRepository.findById(userId).orElseThrow();

        switch (targetType.toLowerCase()) {
            case "homestay" -> {
                Homestay homestay = homestayRepository.findById(targetId).orElseThrow();
                favoriteHomestayRepository.findByUserAndHomestay(user, homestay)
                        .ifPresentOrElse(
                                favoriteHomestayRepository::delete,
                                () -> {
                                    FavoriteHomestay f = new FavoriteHomestay();
                                    f.setUser(user);
                                    f.setHomestay(homestay);
                                    f.setCreatedAt(LocalDateTime.now());
                                    favoriteHomestayRepository.save(f);
                                }
                        );
            }
            case "experience" -> {
                Experience exp = experienceRepository.findById(targetId).orElseThrow();
                favoriteExperienceRepository.findByUserAndExperience(user, exp)
                        .ifPresentOrElse(
                                favoriteExperienceRepository::delete,
                                () -> {
                                    FavoriteExperience f = new FavoriteExperience();
                                    f.setUser(user);
                                    f.setExperience(exp);
                                    f.setCreatedAt(LocalDateTime.now());
                                    favoriteExperienceRepository.save(f);
                                }
                        );
            }
            case "service" -> {
                com.traexcohomestay.hoteltraexco.model.Service service = serviceRepository.findById(targetId).orElseThrow();
                FavoriteServiceModel f = new FavoriteServiceModel();
                f.setUser(user);
                f.setService(service);
                f.setCreatedAt(LocalDateTime.now());
                favoriteServiceRepository.save(f);
            }
            default -> throw new IllegalArgumentException("Invalid targetType: " + targetType);
        }
    }

    @Override
    public List<FavoriteResponseDTO> getUserFavorites(Integer userId) {
        User user = userRepository.findById(userId).orElseThrow();
        List<FavoriteResponseDTO> result = new ArrayList<>();

        // --- HOMESTAY ---
        favoriteHomestayRepository.findByUser(user).forEach(f -> {
            Homestay h = f.getHomestay();
            String imageUrl = (h.getImages() != null && !h.getImages().isEmpty())
                    ? h.getImages().get(0).getImageUrl()
                    : null;

            result.add(new FavoriteResponseDTO(
                    f.getFavoriteId().longValue(),
                    user.getId().longValue(),
                    h.getHomestayId().longValue(),
                    "homestay",
                    f.getCreatedAt(),
                    h.getHomestayName(),
                    imageUrl,
                    f.getFavoriteList() != null ? f.getFavoriteList().getId() : null // ✅ thêm dòng này
            ));
        });

        // --- EXPERIENCE ---
        favoriteExperienceRepository.findByUser(user).forEach(f -> {
            Experience exp = f.getExperience();
            String name = exp.getExperienceType() != null ? exp.getExperienceType().getExperienceName() : "Trải nghiệm";
            String imageUrl = (exp.getExperienceImages() != null && !exp.getExperienceImages().isEmpty())
                    ? exp.getExperienceImages().get(0).getImageUrl()
                    : null;

            result.add(new FavoriteResponseDTO(
                    f.getFavoriteId().longValue(),
                    user.getId().longValue(),
                    exp.getId().longValue(),
                    "experience",
                    f.getCreatedAt(),
                    name,
                    imageUrl,
                    f.getFavoriteList() != null ? f.getFavoriteList().getId() : null
            ));
        });

        // --- SERVICE ---
        favoriteServiceRepository.findByUser(user).forEach(f -> {
            com.traexcohomestay.hoteltraexco.model.Service s = f.getService();
            String name = s.getServiceType() != null ? s.getServiceType().getServiceName() : "Dịch vụ";
            String imageUrl = (s.getImages() != null && !s.getImages().isEmpty())
                    ? s.getImages().get(0).getImageUrl()
                    : null;

            result.add(new FavoriteResponseDTO(
                    f.getFavoriteId().longValue(),
                    user.getId().longValue(),
                    s.getId().longValue(),
                    "service",
                    f.getCreatedAt(),
                    name,
                    imageUrl,
                    f.getFavoriteList() != null ? f.getFavoriteList().getId() : null
            ));
        });

        return result;
    }




    @Override
    public boolean isFavorited(Integer userId, Integer targetId, String targetType) {
        User user = userRepository.findById(userId).orElseThrow();

        return switch (targetType.toLowerCase()) {
            case "homestay" -> favoriteHomestayRepository
                    .findByUserAndHomestay(user, homestayRepository.findById(targetId).orElseThrow())
                    .isPresent();
            case "experience" -> favoriteExperienceRepository
                    .findByUserAndExperience(user, experienceRepository.findById(targetId).orElseThrow())
                    .isPresent();
            case "service" -> favoriteServiceRepository
                    .findByUserAndService(user, serviceRepository.findById(targetId).orElseThrow())
                    .isPresent();
            default -> throw new IllegalArgumentException("Invalid targetType: " + targetType);
        };
    }

    @Override
    public void addToList(Integer userId, Integer targetId, String targetType, Integer listId) {
        User user = userRepository.findById(userId).orElseThrow();
        FavoriteList favoriteList = favoriteListRepository.findById(listId).orElseThrow();

        switch (targetType.toLowerCase()) {
            case "homestay" -> {
                Homestay homestay = homestayRepository.findById(targetId).orElseThrow();
                if (favoriteHomestayRepository.findByUserAndHomestay(user, homestay).isEmpty()) {
                    FavoriteHomestay fav = new FavoriteHomestay();
                    fav.setUser(user);
                    fav.setHomestay(homestay);
                    fav.setFavoriteList(favoriteList);
                    fav.setCreatedAt(LocalDateTime.now());
                    favoriteHomestayRepository.save(fav);
                }
            }
            case "experience" -> {
                Experience exp = experienceRepository.findById(targetId).orElseThrow();
                if (favoriteExperienceRepository.findByUserAndExperience(user, exp).isEmpty()) {
                    FavoriteExperience fav = new FavoriteExperience();
                    fav.setUser(user);
                    fav.setExperience(exp);
                    fav.setFavoriteList(favoriteList);
                    fav.setCreatedAt(LocalDateTime.now());
                    favoriteExperienceRepository.save(fav);
                }
            }
            case "service" -> {
                com.traexcohomestay.hoteltraexco.model.Service service = serviceRepository.findById(targetId).orElseThrow();
                if (favoriteServiceRepository.findByUserAndService(user, service).isEmpty()) {
                    FavoriteServiceModel fav = new FavoriteServiceModel();
                    fav.setUser(user);
                    fav.setService(service);
                    fav.setFavoriteList(favoriteList);
                    fav.setCreatedAt(LocalDateTime.now());
                    favoriteServiceRepository.save(fav);
                }
            }
            default -> throw new IllegalArgumentException("Invalid targetType: " + targetType);
        }
    }

}

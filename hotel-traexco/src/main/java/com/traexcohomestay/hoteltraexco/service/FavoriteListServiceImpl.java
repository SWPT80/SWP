package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.FavoriteListDTO;
import com.traexcohomestay.hoteltraexco.model.*;
import com.traexcohomestay.hoteltraexco.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteListServiceImpl implements FavoriteListService {

    private final FavoriteListRepository favoriteListRepository;
    private final UserRepository userRepository;

    private final HomestayRepository homestayRepository;
    private final ExperienceRepository experienceRepository;
    private final ServiceRepository serviceRepository;

    private final FavoriteHomestayRepository favoriteHomestayRepository;
    private final FavoriteExperienceRepository favoriteExperienceRepository;
    private final FavoriteServiceRepository favoriteServiceRepository;

    @Override
    public List<FavoriteListDTO> getListsByUser(Integer userId) {
        List<FavoriteList> lists = favoriteListRepository.findByUser_Id(userId);

        return lists.stream().map(list -> {
            int totalItems = 0;
            String thumbnail = null;

            // Lấy tất cả các mục yêu thích của user
            List<FavoriteHomestay> homestays = favoriteHomestayRepository.findByUser(list.getUser());
            List<FavoriteExperience> experiences = favoriteExperienceRepository.findByUser(list.getUser());
            List<FavoriteServiceModel> services = favoriteServiceRepository.findByUser(list.getUser());

            // Lọc theo từng list
            List<FavoriteHomestay> homestayInList = homestays.stream()
                    .filter(f -> f.getFavoriteList() != null && f.getFavoriteList().getId().equals(list.getId()))
                    .toList();
            List<FavoriteExperience> experienceInList = experiences.stream()
                    .filter(f -> f.getFavoriteList() != null && f.getFavoriteList().getId().equals(list.getId()))
                    .toList();
            List<FavoriteServiceModel> serviceInList = services.stream()
                    .filter(f -> f.getFavoriteList() != null && f.getFavoriteList().getId().equals(list.getId()))
                    .toList();

            totalItems = homestayInList.size() + experienceInList.size() + serviceInList.size();

            // Ưu tiên ảnh từ homestay
            if (!homestayInList.isEmpty()) {
                Homestay h = homestayInList.get(0).getHomestay();
                if (h.getImages() != null && !h.getImages().isEmpty())
                    thumbnail = h.getImages().get(0).getImageUrl();
            } else if (!experienceInList.isEmpty()) {
                Experience e = experienceInList.get(0).getExperience();
                if (e.getExperienceImages() != null && !e.getExperienceImages().isEmpty())
                    thumbnail = e.getExperienceImages().get(0).getImageUrl();
            } else if (!serviceInList.isEmpty()) {
                com.traexcohomestay.hoteltraexco.model.Service s = serviceInList.get(0).getService();
                if (s.getImages() != null && !s.getImages().isEmpty())
                    thumbnail = s.getImages().get(0).getImageUrl();
            }

            return new FavoriteListDTO(
                    list.getId(),
                    list.getName(),
                    thumbnail,
                    totalItems
            );
        }).toList();
    }

    @Override
    public FavoriteListDTO createList(Integer userId, String name) {
        User user = userRepository.findById(userId).orElseThrow();
        FavoriteList list = new FavoriteList();
        list.setUser(user);
        list.setName(name);
        list.setCreatedAt(LocalDateTime.now());
        FavoriteList saved = favoriteListRepository.save(list);

        // Trả về DTO rút gọn (không thumbnail, không itemCount)
        return new FavoriteListDTO(saved.getId(), saved.getName(), null, 0);
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

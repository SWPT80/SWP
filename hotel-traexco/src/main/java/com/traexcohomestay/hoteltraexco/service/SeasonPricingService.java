package com.traexcohomestay.hoteltraexco.service;


import com.traexcohomestay.hoteltraexco.dto.RoomPriceResponseDTO;
import com.traexcohomestay.hoteltraexco.dto.SeasonPricingRequestDTO;
import com.traexcohomestay.hoteltraexco.dto.SeasonPricingResponseDTO;
import com.traexcohomestay.hoteltraexco.model.Homestay;
import com.traexcohomestay.hoteltraexco.model.Room;
import com.traexcohomestay.hoteltraexco.model.SeasonPricing;
import com.traexcohomestay.hoteltraexco.repository.HomestayRepository;
import com.traexcohomestay.hoteltraexco.repository.RoomRepository;
import com.traexcohomestay.hoteltraexco.repository.SeasonPricingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SeasonPricingService {

    @Autowired
    private SeasonPricingRepository seasonPricingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private HomestayRepository homestayRepository;

    public String createSeasonPricing(SeasonPricingRequestDTO dto) {
        if (dto.getEndDate().isBefore(dto.getStartDate())) {
            return "Ngày kết thúc phải sau ngày bắt đầu.";
        }

        Optional<Homestay> optionalHomestay = homestayRepository.findById(dto.getHomestayId());
        if (optionalHomestay.isEmpty()) {
            return "Homestay không tồn tại.";
        }

        SeasonPricing season = new SeasonPricing();
        season.setHomestay(optionalHomestay.get());
        season.setSeason(dto.getSeason());
        season.setIncreaseRate(dto.getIncreaseRate());
        season.setTypeRoom(dto.getRoomType());
        season.setStartDate(dto.getStartDate());
        season.setEndDate(dto.getEndDate());

        seasonPricingRepository.save(season);
        return "Cập nhật giá theo mùa thành công.";
    }

    public List<RoomPriceResponseDTO> getRoomPricesWithSeason(int homestayId, String roomType, LocalDate checkIn, LocalDate checkOut) {
        List<Room> rooms = roomRepository.findByHomestay_HomestayIdAndType(homestayId, roomType);
        List<SeasonPricing> seasonList = seasonPricingRepository.findByHomestay_HomestayIdAndTypeRoom(homestayId, roomType);

        List<RoomPriceResponseDTO> response = new ArrayList<>();

        for (Room room : rooms) {
            BigDecimal basePrice = room.getPrice();
            BigDecimal finalPrice = basePrice;
            String seasonApplied = null;
            BigDecimal rate = BigDecimal.ONE; // default 1.0 (no increase)

            for (SeasonPricing s : seasonList) {
                boolean overlap = !(checkOut.isBefore(s.getStartDate()) || checkIn.isAfter(s.getEndDate()));
                if (overlap) {
                    rate = s.getIncreaseRate(); // Example: 1.30
                    finalPrice = basePrice.multiply(rate); // Correct way
                    seasonApplied = s.getSeason();
                    break;
                }
            }

            response.add(new RoomPriceResponseDTO(
                    room.getType(),
                    basePrice,
                    finalPrice,
                    seasonApplied,
                    rate
            ));
        }

        return response;
    }
    public List<String> getRoomTypesByHost(int hostId) {
        return roomRepository.findDistinctRoomTypesByHostId(hostId);
    }
    public List<SeasonPricingResponseDTO> getAllByHost(int hostId) {
        List<SeasonPricing> list = seasonPricingRepository.findByHomestay_HostId(hostId);

        return list.stream().map(p -> {
            SeasonPricingResponseDTO dto = new SeasonPricingResponseDTO();
            dto.setId(p.getId());
            dto.setHostId(p.getHomestay().getHostId());
            dto.setHomestayName(p.getHomestay().getHomestayName());

            // Lấy roomName từ Room repository
            Optional<Room> roomOptional = roomRepository
                    .findFirstByHomestay_HomestayIdAndType(p.getHomestay().getHomestayId(), p.getTypeRoom());
            if (roomOptional.isPresent()) {
                Room room = roomOptional.get();
                dto.setRoomId(room.getId().getRoomNumber()); // hoặc parse nếu cần int
                dto.setRoomName(room.getType());

                BigDecimal basePrice = room.getPrice();
                BigDecimal rate = p.getIncreaseRate();
                BigDecimal finalPrice = basePrice.multiply(rate);

                dto.setBasePrice(basePrice);
                dto.setFinalPrice(finalPrice);
            }

            dto.setSeasonName(p.getSeason());
            dto.setPrice(p.getIncreaseRate());
            dto.setStartDate(p.getStartDate());
            dto.setEndDate(p.getEndDate());
            return dto;
        }).collect(Collectors.toList());
    }



}

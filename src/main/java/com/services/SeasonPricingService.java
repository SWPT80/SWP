package com.services;

import com.dto.dto.RoomPriceResponseDTO;
import com.dto.dto.SeasonPricingRequestDTO;
import com.entity.Homestays;
import com.entity.Rooms;
import com.entity.SeasonPricing;
import com.respository.HomestayRepository;
import com.respository.RoomRepository;
import com.respository.SeasonPricingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

        Optional<Homestays> optionalHomestay = homestayRepository.findById(dto.getHomestayId());
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
        List<Rooms> rooms = roomRepository.findByHomestayIdAndRoomType(homestayId, roomType);
        List<SeasonPricing> seasonList = seasonPricingRepository.findByHomestay_HomestayIdAndTypeRoom(homestayId, roomType);

        List<RoomPriceResponseDTO> response = new ArrayList<>();

        for (Rooms room : rooms) {
            BigDecimal basePrice = room.getRoomPrice();
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
                    room.getRoomType(),
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
    public List<SeasonPricing> getAllByHostId(int hostId) {
        return seasonPricingRepository.findByHomestay_HostId(hostId);
    }
}

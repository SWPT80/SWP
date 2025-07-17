package com.traexcohomestay.hoteltraexco.repository;


import com.traexcohomestay.hoteltraexco.model.SeasonPricing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeasonPricingRepository extends JpaRepository<SeasonPricing, Integer> {
    List<SeasonPricing> findByHomestay_HomestayIdAndTypeRoom(int homestayId, String typeRoom);
    List<SeasonPricing> findByHomestay_HostId(int hostId);

}

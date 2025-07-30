package com.traexcohomestay.hoteltraexco.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReportBookingInfoDTO {
    private Integer bookingId;
    private Integer userId;
    private Integer homestayId;
    private String roomNumber;
    private List<ServiceSummary> serviceDetails;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ServiceSummary {
        private Integer id;
        private String name;
    }
}

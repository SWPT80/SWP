package com.traexcohomestay.hoteltraexco.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
@Getter
@Setter
public class ReportDTO {
    private Integer id;
    private Integer userId;
    private Integer homestayId;
    private String homestayName;
    private String roomNumber;
    private Integer serviceId;
    private String reportType;
    private String title;
    private String description;
    private String status;
    private Instant createdAt;
    private Instant updatedAt;
    private String actionTaken;
    private String resolutionNote;
    private Instant resolvedAt;
}

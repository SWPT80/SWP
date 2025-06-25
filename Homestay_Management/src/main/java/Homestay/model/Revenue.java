package Homestay.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "Revenue")
public class Revenue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "revenue_id")
    private Integer revenueId;

    @ManyToOne
    @JoinColumn(name = "homestay_id")
    private Homestay homestay;

    @Column(name = "period_type")
    private String periodType; // weekly, monthly, yearly

    @Column(name = "year")
    private Integer year;

    @Column(name = "month")
    private Integer month;

    @Column(name = "week")
    private Integer week;

    @Column(name = "total_revenue")
    private BigDecimal totalRevenue;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Getters and Setters

    public Integer getRevenueId() {
        return revenueId;
    }

    public void setRevenueId(Integer revenueId) {
        this.revenueId = revenueId;
    }

    public Homestay getHomestay() {
        return homestay;
    }

    public void setHomestay(Homestay homestay) {
        this.homestay = homestay;
    }

    public String getPeriodType() {
        return periodType;
    }

    public void setPeriodType(String periodType) {
        this.periodType = periodType;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getWeek() {
        return week;
    }

    public void setWeek(Integer week) {
        this.week = week;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

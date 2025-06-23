package Homestay.Model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "RevenueAdmin")
public class RevenueAdmin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "revenueAdmin_id")
    private Integer revenueAdminId;

    @ManyToOne
    @JoinColumn(name = "revenue_id")
    private Revenue revenue;

    @Column(name = "profitPercentage")
    private BigDecimal profitPercentage;

    @Column(name = "revenue")
    private BigDecimal revenueAmount;

    // Getters and Setters

    public Integer getRevenueAdminId() {
        return revenueAdminId;
    }

    public void setRevenueAdminId(Integer revenueAdminId) {
        this.revenueAdminId = revenueAdminId;
    }

    public Revenue getRevenue() {
        return revenue;
    }

    public void setRevenue(Revenue revenue) {
        this.revenue = revenue;
    }

    public BigDecimal getProfitPercentage() {
        return profitPercentage;
    }

    public void setProfitPercentage(BigDecimal profitPercentage) {
        this.profitPercentage = profitPercentage;
    }

    public BigDecimal getRevenueAmount() {
        return revenueAmount;
    }

    public void setRevenueAmount(BigDecimal revenueAmount) {
        this.revenueAmount = revenueAmount;
    }
}

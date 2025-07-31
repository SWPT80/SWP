package Homestay.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

public class SeasonPricing {
    @Id
    @Column(name = "season_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ✅ Thêm dòng này để ID tự sinh

    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "homestay_id")
    private Homestay homestay;

    @Nationalized
    @Column(name = "season", length = 50)
    private String season;

    @Column(name = "increaseRate", precision = 4, scale = 2)
    private BigDecimal increaseRate;

    @Column(name = "typeRoom", length = 50)
    private String typeRoom;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

}
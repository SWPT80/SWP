    package com.entity;

    import jakarta.persistence.*;
    import lombok.Data;

    import java.math.BigDecimal;
    import java.time.LocalDate;

    @Entity
    @Data
    @Table(name = "SeasonPricing")
    public class SeasonPricing {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "season_id")
        private int seasonId;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "homestay_id", nullable = false)
        private Homestays homestay;

        private String season;

        @Column(precision = 4, scale = 2)
        private BigDecimal increaseRate;

        @Column(name = "typeRoom")
        private String typeRoom;

        @Column(name = "start_date")
        private LocalDate startDate;

        @Column(name = "end_date")
        private LocalDate endDate;

        public int getSeasonId() {
            return seasonId;
        }

        public void setSeasonId(int seasonId) {
            this.seasonId = seasonId;
        }

        public Homestays getHomestay() {
            return homestay;
        }

        public void setHomestay(Homestays homestay) {
            this.homestay = homestay;
        }

        public String getSeason() {
            return season;
        }

        public void setSeason(String season) {
            this.season = season;
        }

        public BigDecimal getIncreaseRate() {
            return increaseRate;
        }

        public void setIncreaseRate(BigDecimal increaseRate) {
            this.increaseRate = increaseRate;
        }

        public String getTypeRoom() {
            return typeRoom;
        }

        public void setTypeRoom(String typeRoom) {
            this.typeRoom = typeRoom;
        }

        public LocalDate getStartDate() {
            return startDate;
        }

        public void setStartDate(LocalDate startDate) {
            this.startDate = startDate;
        }

        public LocalDate getEndDate() {
            return endDate;
        }

        public void setEndDate(LocalDate endDate) {
            this.endDate = endDate;
        }
    }

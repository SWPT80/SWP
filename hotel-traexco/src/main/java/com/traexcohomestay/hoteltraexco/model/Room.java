package com.traexcohomestay.hoteltraexco.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "Rooms")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

public class Room {

    @EmbeddedId
    private RoomId id;

    @MapsId("homestayId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "homestay_id", nullable = false)
    private Homestay homestay;

    @Column(name = "type", length = 50)
    private String type;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "price", precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "rating")
    private Double rating;

    @ColumnDefault("1")
    @Column(name = "status")
    private Boolean status;

    @OneToMany(mappedBy = "rooms", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<RoomImage> roomImages;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "Room_Services",
            joinColumns = {
                    @JoinColumn(name = "homestay_id", referencedColumnName = "homestay_id"),
                    @JoinColumn(name = "room_number", referencedColumnName = "room_number") // ✅ dùng room_number thay vì room_id
            },
            inverseJoinColumns = @JoinColumn(name = "service_id")
    )
    private List<Service> services;

}

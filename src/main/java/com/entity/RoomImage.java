package com.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "RoomImages")
public class RoomImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "roomImage_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "homestay_id", referencedColumnName = "homestay_id"),
            @JoinColumn(name = "room_number", referencedColumnName = "room_number")
    })
    @JsonIgnore // ✅ cắt vòng lặp JSON
    private Rooms rooms; // <-- tên field phải là "rooms"

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "description", length = 100)
    private String description;

    @ColumnDefault("getdate()")
    @Column(name = "created_at")
    private LocalDateTime createdAt;

}
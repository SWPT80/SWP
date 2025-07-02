package com.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "Homestays")
public class Homestays {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "homestay_id")
    private Integer homestayId;
    @JsonIgnore
    @Column(name = "host_id")
    private Integer hostId;

    @Column(name = "homestayName")
    private String homestaysName;

    @Column(name = "address")
    private String address;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    private Boolean status;

    // Getters, setters...
    @ManyToOne
    @JoinColumn(name = "host_id", insertable = false, updatable = false)
    private Users host;

    public Users getHost() {
        return host;
    }

    public void setHost(Users host) {
        this.host = host;
    }

    public Integer getHomestayId() {
        return homestayId;
    }

    public void setHomestayId(Integer homestayId) {
        this.homestayId = homestayId;
    }

    public Integer getHostId() {
        return hostId;
    }

    public void setHostId(Integer hostId) {
        this.hostId = hostId;
    }

    public String getHomestaysName() {
        return homestaysName;
    }

    public void setHomestaysName(String homestaysName) {
        this.homestaysName = homestaysName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}

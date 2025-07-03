package Homestay.model;


import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "Visitor")
public class Visitor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "visitor_id")
    private Integer visitorId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // Thay thế bằng thực thể User

    @ManyToOne
    @JoinColumn(name = "homestay_id")
    private Homestay homestay; // Thay thế bằng thực thể Homestay

    @Column(name = "visit_time")
    private Date visitTime;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "page_url")
    private String pageUrl;

    // Getters and Setters

    public Homestay getHomestay() {
        return homestay;
    }

    public void setHomestay(Homestay homestay) {
        this.homestay = homestay;
    }

    public Integer getVisitorId() {
        return visitorId;
    }

    public void setVisitorId(Integer visitorId) {
        this.visitorId = visitorId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getVisitTime() {
        return visitTime;
    }

    public void setVisitTime(Date visitTime) {
        this.visitTime = visitTime;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getPageUrl() {
        return pageUrl;
    }

    public void setPageUrl(String pageUrl) {
        this.pageUrl = pageUrl;
    }
}

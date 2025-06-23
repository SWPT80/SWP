package Homestay.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "ServiceImage")
public class ServiceImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Integer imageId;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private HomestayService service;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "status")
    private Boolean status;

    // Getters and Setters

    public Integer getImageId() {
        return imageId;
    }

    public void setImageId(Integer imageId) {
        this.imageId = imageId;
    }

    public HomestayService getService() {
        return service;
    }

    public void setService(HomestayService service) {
        this.service = service;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}

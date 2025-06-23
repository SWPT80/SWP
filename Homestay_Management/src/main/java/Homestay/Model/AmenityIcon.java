package Homestay.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "AmenityIcon")
public class AmenityIcon {

    @Id
    @Column(name = "type_id")
    private Integer typeId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "type_id")
    private AmenityType amenityType;

    @Column(name = "icon_class")
    private String iconClass;

    // Getters and Setters

    public Integer getTypeId() {
        return typeId;
    }

    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    public AmenityType getAmenityType() {
        return amenityType;
    }

    public void setAmenityType(AmenityType amenityType) {
        this.amenityType = amenityType;
    }

    public String getIconClass() {
        return iconClass;
    }

    public void setIconClass(String iconClass) {
        this.iconClass = iconClass;
    }
}

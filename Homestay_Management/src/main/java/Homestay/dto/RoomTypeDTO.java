package Homestay.dto;

public class RoomTypeDTO {
    private String name;
    private Long value;

    public RoomTypeDTO(String name, Long value) {
        this.name = name;
        this.value = value;
    }

    // getters and setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getValue() {
        return value;
    }

    public void setValue(Long value) {
        this.value = value;
    }
}

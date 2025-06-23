package Homestay.DTO;

public class RevenueDTO {
    private String name;
    private Double doanhThu;

    public RevenueDTO(String name, Double doanhThu) {
        this.name = name;
        this.doanhThu = doanhThu;
    }

    // getters and setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getDoanhThu() {
        return doanhThu;
    }

    public void setDoanhThu(Double doanhThu) {
        this.doanhThu = doanhThu;
    }
}

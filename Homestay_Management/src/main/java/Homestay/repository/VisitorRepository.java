package Homestay.repository;

import Homestay.model.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface VisitorRepository extends JpaRepository<Visitor, Long> {

    // Đếm tổng lượt truy cập trong khoảng thời gian
    @Query("SELECT COUNT(v) FROM Visitor v WHERE v.visitTime BETWEEN :start AND :end")
    long countByVisitTimeBetween(@Param("start") Date start, @Param("end") Date end);

    // Lấy xu hướng theo ngày
    @Query("SELECT DATE(v.visitTime) as visitDate, COUNT(v) as visitorCount " +
            "FROM Visitor v WHERE v.visitTime BETWEEN :start AND :end " +
            "GROUP BY DATE(v.visitTime)")


    List<Object[]> getVisitorTrend(@Param("start") Date start, @Param("end") Date end);
}

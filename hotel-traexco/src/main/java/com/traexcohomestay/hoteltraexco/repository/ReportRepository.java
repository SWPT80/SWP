package com.traexcohomestay.hoteltraexco.repository;

import com.traexcohomestay.hoteltraexco.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

    List<Report> findByUser_Id(Integer userId); // user xem lịch sử báo cáo của họ

}

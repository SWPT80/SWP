package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.model.HostRequest;
import java.util.List;

public interface HostRequestService {
    HostRequest submitRequest(HostRequest request);
    List<HostRequest> getAll();
    List<HostRequest> getPending();
    HostRequest approve(Integer id);
    HostRequest reject(Integer id);
    HostRequest findByVerifyToken(String token);
    HostRequest save(HostRequest req);

    // ✅ THÊM DÒNG NÀY
    boolean existsByUserIdAndStatusNot(Integer userId, String status);
}

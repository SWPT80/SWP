package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.PaymentDTO;
import jakarta.servlet.http.HttpServletResponse;


import java.io.IOException;
import java.util.List;
import java.util.Map;


public interface PaymentService {
    PaymentDTO createPayment(PaymentDTO paymentDTO);

    List<PaymentDTO> getPendingPaymentsByHostId(Integer hostId);

    PaymentDTO updatePaymentStatus(Integer paymentId, String status);

    String createPaymentUrl(PaymentDTO paymentDTO) throws java.io.UnsupportedEncodingException;

    void handlePaymentCallback(String vnpResponseCode, String vnpTxnRef, String vnpAmount, String momoResultCode, String momoOrderId, String momoAmount, String vnpSecureHash, Map<String, String> params, HttpServletResponse response) throws IOException;

    /**
     * Xử lý khi người dùng hủy thanh toán
     */
    void handlePaymentCancel(String vnpTxnRef, String momoOrderId, Integer bookingId);

    /**
     * Lấy trạng thái thanh toán của booking
     */
    Map<String, Object> getPaymentStatus(Integer bookingId);

    /**
     * Thử lại thanh toán đã thất bại
     */
    PaymentDTO retryFailedPayment(Integer paymentId);

    /**
     * Tự động hủy các payment timeout
     */
    void cancelExpiredPayments();
}




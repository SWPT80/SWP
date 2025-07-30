package com.traexcohomestay.hoteltraexco.scheduler;

import com.traexcohomestay.hoteltraexco.service.PaymentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class PaymentScheduler {
    private static final Logger logger = LoggerFactory.getLogger(PaymentScheduler.class);

    @Autowired
    private PaymentService paymentService;

    /**
     * Tự động hủy các payment hết hạn mỗi 10 phút
     */
    @Scheduled(fixedRate = 600000) // 10 phút = 600,000 ms
    public void cancelExpiredPayments() {
        logger.info("Running scheduled task to cancel expired payments...");
        try {
            paymentService.cancelExpiredPayments();
            logger.info("Completed scheduled task to cancel expired payments");
        } catch (Exception e) {
            logger.error("Error in scheduled task to cancel expired payments: {}", e.getMessage(), e);
        }
    }

    /**
     * Log thống kê payment mỗi giờ
     */
    @Scheduled(fixedRate = 3600000) // 1 giờ = 3,600,000 ms
    public void logPaymentStatistics() {
        logger.info("Running scheduled task to log payment statistics...");
        // Có thể thêm logic để log thống kê payment
    }
}
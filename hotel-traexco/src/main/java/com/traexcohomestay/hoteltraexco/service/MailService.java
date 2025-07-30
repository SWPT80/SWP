package com.traexcohomestay.hoteltraexco.service;

public interface MailService {
    void sendEmail(String to, String subject, String htmlContent);
    void sendVerificationEmail(String email, String link);
    void sendCongratulationEmail(String email);
    void sendRejectionEmail(String email, String name);
}

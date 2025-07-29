package com.traexcohomestay.hoteltraexco.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailServiceImpl implements MailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendEmail(String to, String subject, String htmlContent) {
        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true); // true = HTML
            helper.setFrom("hoangndhde180637@fpt.edu.vn"); // same as in spring.mail.username

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
            throw new RuntimeException("Lỗi gửi email: " + e.getMessage());
        }
    }

    @Override
    public void sendVerificationEmail(String email, String link) {
        String subject = "Xác minh địa chỉ email của bạn";
        String html = "<div style='font-family:Arial,sans-serif;'>" +
                "<h2 style='color:#5a2d82;'>Xác minh địa chỉ email</h2>" +
                "<p>Chào bạn,</p>" +
                "<p>Vui lòng nhấn vào nút bên dưới để xác minh email và hoàn tất đăng ký trở thành host:</p>" +
                "<a href='" + link + "' style='display:inline-block;background-color:#ff6b35;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;'>Xác minh ngay</a>" +
                "<p style='margin-top:20px;'>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>" +
                "<hr/><p style='font-size:12px;color:#999;'>Traexco Team</p>" +
                "</div>";
        sendEmail(email, subject, html);
    }

    @Override
    public void sendCongratulationEmail(String email) {
        String subject = "Chúc mừng bạn đã trở thành host!";
        String html = "<div style='font-family:Arial,sans-serif;'>" +
                "<h2 style='color:#28a745;'>Chúc mừng bạn!</h2>" +
                "<p>Bạn đã chính thức trở thành host trên nền tảng <strong>Traexco</strong>.</p>" +
                "<p>Hãy bắt đầu quản lý dịch vụ của bạn và tạo trải nghiệm tuyệt vời cho khách hàng.</p>" +
                "<a href='http://localhost:3000' style='display:inline-block;margin-top:15px;background-color:#007bff;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;'>Truy cập Bảng điều khiển</a>" +
                "<p style='margin-top:20px;'>Chúc bạn thành công!</p>" +
                "<hr/><p style='font-size:12px;color:#999;'>Traexco Team</p>" +
                "</div>";
        sendEmail(email, subject, html);
    }

    @Override
    public void sendRejectionEmail(String email, String name) {
        String subject = "Thông báo từ chối yêu cầu trở thành host";
        String html = "<div style='font-family:Arial,sans-serif;'>" +
                "<h2 style='color:#dc3545;'>Xin lỗi " + name + ",</h2>" +
                "<p>Chúng tôi rất tiếc phải thông báo rằng yêu cầu trở thành host của bạn trên <strong>Traexco</strong> đã bị từ chối.</p>" +
                "<p>Nếu bạn có thắc mắc hoặc cần hỗ trợ thêm, hãy liên hệ với đội ngũ hỗ trợ của chúng tôi.</p>" +
                "<p>Cảm ơn bạn đã quan tâm đến Traexco.</p>" +
                "<hr/><p style='font-size:12px;color:#999;'>Traexco Team</p>" +
                "</div>";
        sendEmail(email, subject, html);
    }
}

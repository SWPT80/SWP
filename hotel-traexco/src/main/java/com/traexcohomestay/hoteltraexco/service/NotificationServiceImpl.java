package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.model.Notification;
import com.traexcohomestay.hoteltraexco.model.User;
import com.traexcohomestay.hoteltraexco.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public void sendEmail(User user, Notification notification) {
        if (user.getEmail() != null) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(user.getEmail());
            message.setSubject("Thông báo từ HomestayManagement: " + notification.getType());
            message.setText(notification.getMessage());
            mailSender.send(message);
        }
    }

    @Override
    public Notification createNotification(User receiver, String message, String type) {
        Notification notification = new Notification();
        notification.setUser(receiver);
        notification.setMessage(message);
        notification.setType(type);
        notification.setStatus(false);
        notification.setCreatedAt(Instant.now());
        return notificationRepository.save(notification);
    }
}
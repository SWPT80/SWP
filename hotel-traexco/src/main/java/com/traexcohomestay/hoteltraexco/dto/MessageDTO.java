package com.traexcohomestay.hoteltraexco.dto;

import java.time.LocalDateTime;

public class MessageDTO {
    private Integer id;
    private Integer senderId;
    private String content;
    private LocalDateTime sentAt;

    // Constructors
    public MessageDTO() {}

    public MessageDTO(Integer id, Integer senderId, String content, LocalDateTime sentAt) {
        this.id = id;
        this.senderId = senderId;
        this.content = content;
        this.sentAt = sentAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSenderId() {
        return senderId;
    }

    public void setSenderId(Integer senderId) {
        this.senderId = senderId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getSentAt() {
        return sentAt;
    }

    public void setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt;
    }
}

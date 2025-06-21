package com.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "Conversations")

public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "conversation_id")
    private Integer conversationId;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Users customer;

    @ManyToOne
    @JoinColumn(name = "host_id")
    private Users host;

    @ManyToOne
    @JoinColumn(name = "homestay_id")
    private Homestays homestay;

    @Column(name = "created_at")
    private LocalDateTime startedAt = LocalDateTime.now();


    // Getters and setters

    public Integer getConversationId() {
        return conversationId;
    }

    public void setConversationId(Integer conversationId) {
        this.conversationId = conversationId;
    }

    public Users getCustomer() {
        return customer;
    }

    public void setCustomer(Users customer) {
        this.customer = customer;
    }

    public Users getHost() {
        return host;
    }

    public void setHost(Users host) {
        this.host = host;
    }

    public Homestays getHomestay() {
        return homestay;
    }

    public void setHomestay(Homestays homestay) {
        this.homestay = homestay;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }
}

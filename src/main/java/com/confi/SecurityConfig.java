package com.confi;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // disable CSRF for Postman testing
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // allow all endpoints
                );
        return http.build();
    }
}
//GET /api/reports/revenue/monthly → tổng doanh thu từng tháng
//
//GET /api/reports/revenue/room → doanh thu theo phòng
//
//GET /api/reports/revenue/service → doanh thu theo dịch vụ
//
//GET /api/reports/count/bookings → số lượt đặt phòng
//
//GET /api/reports/count/services → số lượt đặt dịch vụ


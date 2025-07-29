package com.traexcohomestay.hoteltraexco.security;

import io.jsonwebtoken.security.Keys;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserDetailsService userDetailsService;

    public SecurityConfig(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // Các API công khai
                        .requestMatchers(
                                "/api/auth/**",
                                "/api/homestays/**",
                                "/api/rooms/**",
                                "/api/services/**",
                                "/api/service-types/**",
                                "/api/experiences/**",
                                "/api/experience-types/**",
                                "/api/amenities/**",
                                "/api/reviews/**",
                                "/api/cancellation-policies/**",
                                "/api/homestay-rules/**",
                                "/api/chart/**",
                                "/api/payments/callback",
                                "/api/reports/**",
                                "/api/bookings/**",
                                "/api/chat/**",
                                "/api/chatbox/**",
                                "/api/homestays/**",
                                "/api/seasonal-pricing/**",
                                "/api/monitor/active-users"
                        ).permitAll()

                        // Cho phép WebSocket kết nối không cần xác thực
                        .requestMatchers("/ws/**").permitAll()

                        // Các API cần quyền
                        .requestMatchers("/img/**", "/images/**", "/static/**").permitAll()

                        // Chỉ GET các homestay là permitAll, còn POST/PUT/DELETE phải đăng nhập
                        .requestMatchers("/api/homestays").authenticated()
                        .requestMatchers("/api/homestays/{id}").authenticated()
                        .requestMatchers("/api/homestays/bulk-update").authenticated()

                        // Các API cần quyền
                        .requestMatchers("/api/bookings").hasAnyRole("USER", "ADMIN")
                        .requestMatchers("/api/bookings/homestay/**").hasAnyRole("HOST", "ADMIN")
                        .requestMatchers("/api/users/me").authenticated()
                        .requestMatchers("/api/users/{id}").hasAnyRole("USER", "HOST", "ADMIN")
                        .requestMatchers("/api/notifications/user/{userId}/**").hasAnyRole("USER", "HOST", "ADMIN")

                        // ✅ Cho phép cả HOST và ADMIN dùng /api/host/**
                        .requestMatchers("/api/host/**").hasAnyRole("HOST", "ADMIN")

                        // Chỉ ADMIN được dùng API admin
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .requestMatchers(
                                "/api/services/pending",
                                "/api/services/*/approve",
                                "/api/services/*/reject",
                                "/api/admin/account/**"
                        ).hasRole("ADMIN")
                        // Các request khác yêu cầu xác thực
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowedOrigins(List.of("http://localhost:3000"));
//        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        config.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));
//        config.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", config);
//        return source;
//    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000")); // client React
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        config.setAllowedHeaders(List.of("*")); // Cho phép tất cả headers
        config.setAllowCredentials(true); // Cho phép gửi cookie, token

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // Áp dụng cho tất cả route
        return source;
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(userDetailsService, jwtSigningKey());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecretKey jwtSigningKey() {
        String secret = "your-very-long-secret-key-min-64-bytes-for-hs512-like-this-one-here-to-avoid-weak-key-error";
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
}

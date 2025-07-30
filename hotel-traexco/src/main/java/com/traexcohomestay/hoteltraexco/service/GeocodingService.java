package com.traexcohomestay.hoteltraexco.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.traexcohomestay.hoteltraexco.util.AddressUtils;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;
import java.util.logging.Logger;

@Service
public class GeocodingService {
    private static final Logger logger = Logger.getLogger(GeocodingService.class.getName());
    private static final String NOMINATIM_URL = "https://nominatim.openstreetmap.org/search?format=json&q=";
    private static final int MAX_RETRIES = 3;

    public Float[] getCoordinatesFromAddress(String rawAddress) {
        if (rawAddress == null || rawAddress.trim().isEmpty()) {
            logger.warning("Địa chỉ rỗng hoặc null.");
            return null;
        }

        String normalizedAddress = AddressUtils.normalizeAddress(rawAddress);

        for (int attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                String url = NOMINATIM_URL + URLEncoder.encode(normalizedAddress, StandardCharsets.UTF_8);
                HttpURLConnection conn = (HttpURLConnection) URI.create(url).toURL().openConnection();
                conn.setRequestMethod("GET");
                conn.setRequestProperty("User-Agent", "TraexcoHomestay/1.0 (contact@yourdomain.com)");

                if (conn.getResponseCode() != 200) {
                    logger.warning("Yêu cầu thất bại với mã " + conn.getResponseCode());
                    continue;
                }

                try (Scanner scanner = new Scanner(conn.getInputStream())) {
                    String json = scanner.useDelimiter("\\A").next();
                    ObjectMapper mapper = new ObjectMapper();
                    JsonNode root = mapper.readTree(json);
                    if (root.isArray() && root.size() > 0) {
                        JsonNode first = root.get(0);
                        Float lat = (float) first.get("lat").asDouble();
                        Float lon = (float) first.get("lon").asDouble();
                        return new Float[]{lat, lon};
                    }
                }

                logger.warning("Không tìm thấy tọa độ cho địa chỉ: " + normalizedAddress);

            } catch (IOException e) {
                logger.warning("Lỗi khi gọi Nominatim API (lần " + attempt + "): " + e.getMessage());
            }

            try {
                Thread.sleep(1000); // Tránh spam API
            } catch (InterruptedException ignored) {}
        }

        logger.warning("Không thể lấy tọa độ sau " + MAX_RETRIES + " lần thử: " + normalizedAddress);
        return null;
    }
}

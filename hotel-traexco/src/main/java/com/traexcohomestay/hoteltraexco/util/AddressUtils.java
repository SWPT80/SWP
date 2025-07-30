package com.traexcohomestay.hoteltraexco.util;

import java.util.*;
import java.util.stream.Collectors;

public class AddressUtils {

    public static String normalizeAddress(String address) {
        if (address == null || address.isEmpty()) return address;

        // Loại bỏ các từ không cần thiết, chuẩn hóa tên
        String cleaned = address.toLowerCase()
                .replaceAll("(?i)\\b(thôn|xóm|ấp|khu phố|bản|tổ|ngõ|ngách|hẻm|số nhà|sn)\\b\\s*", "")
                .replaceAll("(?i)\\b(phường|xã|thị trấn|tt|tp|t.p|quận|huyện)\\b", "")
                .replaceAll("\\s+", " ")
                .trim();

        // Viết hoa chữ cái đầu
        String[] parts = cleaned.split(",");
        List<String> normalized = new ArrayList<>();
        for (String part : parts) {
            part = part.trim();
            normalized.add(Arrays.stream(part.split(" "))
                    .map(word -> word.isEmpty() ? "" : Character.toUpperCase(word.charAt(0)) + word.substring(1))
                    .collect(Collectors.joining(" ")));
        }

        return String.join(", ", normalized);
    }
    public static String buildFullAddress(String address, String location) {
        List<String> parts = new ArrayList<>();

        if (address != null && !address.trim().isEmpty()) {
            parts.add(address.trim());
        }
        if (location != null && !location.trim().isEmpty()) {
            parts.add(location.trim());
        }
        parts.add("Vietnam");

        return String.join(", ", parts);
    }

}

package com.traexcohomestay.hoteltraexco.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public class FileStorageUtil {

    public static String save(MultipartFile file, String folder) {
        try {
            // Lấy đường dẫn tuyệt đối đến thư mục gốc của dự án
            String projectRoot = System.getProperty("user.dir");
            String uploadDir = projectRoot + File.separator + "uploads" + File.separator + folder;

            // Tạo thư mục nếu chưa tồn tại
            File dir = new File(uploadDir);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            // Tạo tên file duy nhất
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            String fullPath = uploadDir + File.separator + fileName;

            // Lưu file
            file.transferTo(new File(fullPath));

            // Trả về đường dẫn tương đối để frontend có thể dùng nếu cần
            return "/uploads/" + folder + "/" + fileName;

        } catch (IOException e) {
            throw new RuntimeException("Không thể lưu file: " + e.getMessage());
        }
    }
}

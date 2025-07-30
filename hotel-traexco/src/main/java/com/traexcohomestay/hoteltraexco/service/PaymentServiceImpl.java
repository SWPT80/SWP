package com.traexcohomestay.hoteltraexco.service;


import com.traexcohomestay.hoteltraexco.config.MoMoConfig;
import com.traexcohomestay.hoteltraexco.config.VNPayConfig;
import com.traexcohomestay.hoteltraexco.dto.PaymentDTO;
import com.traexcohomestay.hoteltraexco.exception.ResourceNotFoundException;
import com.traexcohomestay.hoteltraexco.model.*;
import com.traexcohomestay.hoteltraexco.repository.*;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;


import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;


@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {
    private static final Logger logger = LoggerFactory.getLogger(PaymentServiceImpl.class);


    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final HomestayRepository homestayRepository;
    private final NotificationRepository notificationRepository;
    private final JavaMailSender mailSender;
    private final RestTemplate restTemplate;
    private final MoMoConfig moMoConfig;
    private final VNPayConfig vnPayConfig;


    @Autowired
    public PaymentServiceImpl(PaymentRepository paymentRepository, BookingRepository bookingRepository, HomestayRepository homestayRepository, NotificationRepository notificationRepository, JavaMailSender mailSender, RestTemplate restTemplate, MoMoConfig moMoConfig, VNPayConfig vnPayConfig) {
        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
        this.homestayRepository = homestayRepository;
        this.notificationRepository = notificationRepository;
        this.mailSender = mailSender;
        this.restTemplate = restTemplate;
        this.moMoConfig = moMoConfig;
        this.vnPayConfig = vnPayConfig;
    }


    @Override
    public PaymentDTO createPayment(PaymentDTO paymentDTO) {
        logger.info("Nhận được paymentDTO: {}", paymentDTO);
        if (paymentDTO == null) {
            logger.error("PaymentDTO là null");
            throw new IllegalArgumentException("PaymentDTO không được null");
        }
        if (paymentDTO.getBookingId() == null) {
            logger.error("BookingId là null");
            throw new IllegalArgumentException("BookingId là bắt buộc");
        }
        if (paymentDTO.getAmount() == null) {
            logger.error("Amount là null");
            throw new IllegalArgumentException("Amount là bắt buộc");
        }
        if (paymentDTO.getPaymentMethod() == null || paymentDTO.getPaymentMethod().isEmpty()) {
            logger.error("PaymentMethod là null hoặc rỗng");
            throw new IllegalArgumentException("PaymentMethod là bắt buộc");
        }
        if (paymentDTO.getPaymentMethod().toUpperCase().length() > 50) {
            logger.error("PaymentMethod vượt quá 50 ký tự: {}", paymentDTO.getPaymentMethod());
            throw new IllegalArgumentException("PaymentMethod không được vượt quá 50 ký tự");
        }


        Booking booking = bookingRepository.findById(paymentDTO.getBookingId()).orElseThrow(() -> {
            logger.error("Không tìm thấy Booking với id: {}", paymentDTO.getBookingId());
            return new ResourceNotFoundException("Không tìm thấy Booking với id: " + paymentDTO.getBookingId());
        });
        if (booking.getRooms() == null || booking.getRooms().getId() == null) {
            logger.error("Booking {} không có Room liên kết", paymentDTO.getBookingId());
            throw new IllegalStateException("Booking không có Room liên kết");
        }


        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(paymentDTO.getAmount());
        payment.setPaymentMethod(paymentDTO.getPaymentMethod().toUpperCase());
        payment.setStatus("PENDING");
        payment.setPaymentDetails(paymentDTO.getPaymentDetails());
        payment.setPaymentDate(Instant.now());
        payment.setIsDeposit(paymentDTO.getIsDeposit() != null ? paymentDTO.getIsDeposit() : false);


        try {
            Payment savedPayment = paymentRepository.save(payment);
            logger.info("Đã lưu thanh toán: {}", savedPayment);


            Homestay homestay = homestayRepository.findById(booking.getRooms().getId().getHomestayId()).orElseThrow(() -> {
                logger.error("Không tìm thấy Homestay với id: {}", booking.getRooms().getId().getHomestayId());
                return new ResourceNotFoundException("Không tìm thấy Homestay với id: " + booking.getRooms().getId().getHomestayId());
            });


            Notification notification = new Notification();
            notification.setUser(homestay.getHost());
            notification.setMessage("Yêu cầu thanh toán mới cho đặt phòng #" + booking.getId() + " tại " + homestay.getHomestayName());
            notification.setType("PAYMENT_REQUEST");
            notification.setStatus(false);
            notification.setCreatedAt(Instant.now());
            notificationRepository.save(notification);
            logger.info("Đã lưu thông báo cho host: {}", notification);


            return convertToDTO(savedPayment);
        } catch (Exception e) {
            logger.error("Lỗi khi lưu thanh toán cho bookingId: {}", paymentDTO.getBookingId(), e);
            throw new RuntimeException("Lỗi khi lưu thanh toán: " + e.getMessage(), e);
        }
    }


    @Override
    public String createPaymentUrl(PaymentDTO paymentDTO) throws UnsupportedEncodingException {
        if (paymentDTO.getBookingId() == null || paymentDTO.getAmount() == null) {
            throw new IllegalArgumentException("BookingId và Amount là bắt buộc");
        }


        Booking booking = bookingRepository.findById(paymentDTO.getBookingId()).orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy Booking với id: " + paymentDTO.getBookingId()));


        String paymentMethod = paymentDTO.getPaymentMethod().toUpperCase();
        String txnRef = "TX" + System.currentTimeMillis();


        if (paymentMethod.startsWith("DEPOSIT_")) {
            paymentDTO.setIsDeposit(true);
        }


        if (paymentMethod.equals("VNPAY") || paymentMethod.equals("DEPOSIT_VNPAY")) {
            logger.info("Creating VNPay URL for booking ID: {}", paymentDTO.getBookingId());
            return createVNPayUrl(paymentDTO, booking, txnRef);
        } else if (paymentMethod.equals("MOMO") || paymentMethod.equals("QR") || paymentMethod.equals("DEPOSIT_QR")) {
            logger.info("Creating MoMo URL for booking ID: {}", paymentDTO.getBookingId());
            return createMoMoUrl(paymentDTO, booking, txnRef);
        } else {
            logger.error("Unsupported payment method: {}", paymentMethod);
            throw new IllegalArgumentException("Phương thức thanh toán không hỗ trợ: " + paymentMethod);
        }
    }


    private String createVNPayUrl(PaymentDTO paymentDTO, Booking booking, String txnRef) throws UnsupportedEncodingException {
        logger.info("Creating VNPay URL for booking ID: {}, amount: {}, txnRef: {}", paymentDTO.getBookingId(), paymentDTO.getAmount(), txnRef);


        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String vnp_OrderInfo = "Thanh toan don hang #" + paymentDTO.getBookingId();
        String vnp_OrderType = "250000";
        String vnp_Amount = String.valueOf(paymentDTO.getAmount().multiply(new java.math.BigDecimal(100)).longValue());
        String vnp_IpAddr = "0.0.0.0";
        String vnp_CreateDate = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
        String vnp_Locale = "vn";
        String vnp_CurrCode = "VND";


        Map<String, String> vnp_Params = new TreeMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnPayConfig.vnp_TmnCode);
        vnp_Params.put("vnp_Amount", vnp_Amount);
        vnp_Params.put("vnp_CurrCode", vnp_CurrCode);
        vnp_Params.put("vnp_TxnRef", txnRef);
        vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
        vnp_Params.put("vnp_OrderType", vnp_OrderType);
        vnp_Params.put("vnp_Locale", vnp_Locale);
        vnp_Params.put("vnp_ReturnUrl", vnPayConfig.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);


        if (vnPayConfig.vnp_TmnCode == null || vnPayConfig.vnp_TmnCode.isEmpty()) {
            logger.error("VNPay TmnCode is not configured");
            throw new IllegalStateException("VNPay TmnCode is not configured");
        }
        if (vnPayConfig.vnp_HashSecret == null || vnPayConfig.vnp_HashSecret.isEmpty()) {
            logger.error("VNPay HashSecret is not configured");
            throw new IllegalStateException("VNPay HashSecret is not configured");
        }
        if (vnPayConfig.vnp_Url == null || vnPayConfig.vnp_Url.isEmpty()) {
            logger.error("VNPay URL is not configured");
            throw new IllegalStateException("VNPay URL is not configured");
        }


        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        for (Map.Entry<String, String> entry : vnp_Params.entrySet()) {
            String fieldValue = entry.getValue();
            if (fieldValue != null && !fieldValue.isEmpty()) {
                hashData.append(entry.getKey()).append('=').append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString())).append('&');
                query.append(entry.getKey()).append('=').append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString())).append('&');
            }
        }
        if (hashData.length() > 0) {
            hashData.setLength(hashData.length() - 1);
            query.setLength(query.length() - 1);
        }


        String vnp_SecureHash = hmacSHA512(vnPayConfig.vnp_HashSecret, hashData.toString());
        query.append("&vnp_SecureHash=").append(vnp_SecureHash);


        String paymentUrl = vnPayConfig.vnp_Url + "?" + query;
        logger.info("VNPay parameters: {}", vnp_Params);
        logger.info("VNPay hash data: {}", hashData.toString());
        logger.info("VNPay secure hash: {}", vnp_SecureHash);
        logger.info("Final VNPay payment URL: {}", paymentUrl);


        savePayment(paymentDTO, booking, paymentDTO.getPaymentMethod(), txnRef);
        return paymentUrl;
    }


    private String createMoMoUrl(PaymentDTO paymentDTO, Booking booking, String txnRef) {
        String orderId = txnRef;
        String requestId = orderId;
        String orderInfo = "Thanh toan don hang #" + paymentDTO.getBookingId();
        String amount = paymentDTO.getAmount().toString();
        String extraData = "";
        String lang = "vi";


        String rawSignature = "accessKey=" + moMoConfig.getAccessKey() + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + moMoConfig.getIpnUrl() + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + moMoConfig.getPartnerCode() + "&redirectUrl=" + moMoConfig.getRedirectUrl() + "&requestId=" + requestId + "&requestType=captureWallet";


        String signature = hmacSHA256(moMoConfig.getSecretKey(), rawSignature);


        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("partnerCode", moMoConfig.getPartnerCode());
        requestBody.put("partnerName", "Traexco Homestay");
        requestBody.put("storeId", "TraexcoStore");
        requestBody.put("requestId", requestId);
        requestBody.put("amount", amount);
        requestBody.put("orderId", orderId);
        requestBody.put("orderInfo", orderInfo);
        requestBody.put("redirectUrl", moMoConfig.getRedirectUrl());
        requestBody.put("ipnUrl", moMoConfig.getIpnUrl());
        requestBody.put("lang", lang);
        requestBody.put("extraData", extraData);
        requestBody.put("autoCapture", true);
        requestBody.put("requestType", "captureWallet");
        requestBody.put("signature", signature);


        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);


        try {
            logger.warn(">>> Final MoMo Request Body: {}", requestBody);
            Map<String, Object> response = restTemplate.postForObject(moMoConfig.getApiUrl(), entity, Map.class);
            String payUrl = (String) response.get("payUrl");
            savePayment(paymentDTO, booking, paymentDTO.getPaymentMethod(), txnRef);
            return payUrl;
        } catch (Exception e) {
            logger.error("Lỗi khi tạo URL thanh toán MoMo: {}", e.getMessage());
            throw new RuntimeException("Lỗi khi tạo URL thanh toán MoMo: " + e.getMessage());
        }
    }


    private void savePayment(PaymentDTO paymentDTO, Booking booking, String paymentMethod, String txnRef) {
        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(paymentDTO.getAmount());
        payment.setPaymentMethod(paymentMethod);
        payment.setStatus("PENDING");
        payment.setPaymentDetails("TxnRef: " + txnRef);
        payment.setIsDeposit(paymentDTO.getIsDeposit());
        payment.setPaymentDate(Instant.now());
        paymentRepository.save(payment);
    }


    @Override
    public void handlePaymentCallback(String vnpResponseCode, String vnpTxnRef, String vnpAmount, String momoResultCode, String momoOrderId, String momoAmount, String vnpSecureHash, Map<String, String> params, HttpServletResponse response) throws IOException {
        logger.info("Received payment callback with params: {}", params);


        if (vnpResponseCode != null && vnpTxnRef != null && vnpSecureHash != null) {
            // Validate VNPay secure hash
            Map<String, String> hashParams = new TreeMap<>(params);
            hashParams.remove("vnp_SecureHash");
            hashParams.remove("vnp_SecureHashType");


            StringBuilder hashData = new StringBuilder();
            for (Map.Entry<String, String> entry : hashParams.entrySet()) {
                if (entry.getValue() != null && !entry.getValue().isEmpty()) {
                    hashData.append(entry.getKey()).append('=').append(URLEncoder.encode(entry.getValue(), StandardCharsets.US_ASCII.toString())).append('&');
                }
            }
            if (hashData.length() > 0) {
                hashData.setLength(hashData.length() - 1);
            }


            String calculatedHash = hmacSHA512(vnPayConfig.vnp_HashSecret, hashData.toString());
            if (!calculatedHash.equals(vnpSecureHash)) {
                logger.error("Invalid secure hash for VNPay callback: expected {}, received {}", calculatedHash, vnpSecureHash);
                response.sendRedirect("http://localhost:3000/payment-error?error=InvalidSecureHash");
                return;
            }


            Optional<Payment> paymentOpt = paymentRepository.findByPaymentDetailsContaining(vnpTxnRef);
            if (paymentOpt.isEmpty()) {
                logger.error("Không tìm thấy thanh toán với TxnRef: {}", vnpTxnRef);
                response.sendRedirect("http://localhost:3000/payment-error?error=PaymentNotFound");
                return;
            }


            Payment payment = paymentOpt.get();
            if ("00".equals(vnpResponseCode)) {
                payment.setStatus(payment.getIsDeposit() ? "CONFIRMED" : "APPROVED");
                paymentRepository.save(payment);
                try {
                    sendPaymentSuccessEmail(payment);
                    logger.info("Redirecting to booking-success for TxnRef: {}", vnpTxnRef);
                    response.sendRedirect("http://localhost:3000/booking-success?bookingId=" + payment.getBooking().getId() + "&txnRef=" + vnpTxnRef);
                } catch (MessagingException e) {
                    logger.error("Lỗi khi gửi email xác nhận: {}", e.getMessage());
                    response.sendRedirect("http://localhost:3000/payment-error?error=EmailFailed");
                }
            } else {
                payment.setStatus("FAILED");
                paymentRepository.save(payment);
                logger.error("VNPay payment failed with response code: {}", vnpResponseCode);
                response.sendRedirect("http://localhost:3000/payment-error?error=ResponseCode" + vnpResponseCode);
            }
        } else if (momoResultCode != null && momoOrderId != null) {
            Optional<Payment> paymentOpt = paymentRepository.findByPaymentDetailsContaining(momoOrderId);
            if (paymentOpt.isEmpty()) {
                logger.error("Không tìm thấy thanh toán với OrderId: {}", momoOrderId);
                response.sendRedirect("http://localhost:3000/payment-error?error=PaymentNotFound");
                return;
            }


            Payment payment = paymentOpt.get();
            if ("0".equals(momoResultCode)) {
                payment.setStatus(payment.getIsDeposit() ? "CONFIRMED" : "APPROVED");
                paymentRepository.save(payment);
                try {
                    sendPaymentSuccessEmail(payment);
                    logger.info("Redirecting to booking-success for OrderId: {}", momoOrderId);
                    response.sendRedirect("http://localhost:3000/booking-success?bookingId=" + payment.getBooking().getId() + "&orderId=" + momoOrderId);
                } catch (MessagingException e) {
                    logger.error("Lỗi khi gửi email xác nhận: {}", e.getMessage());
                    response.sendRedirect("http://localhost:3000/payment-error?error=EmailFailed");
                }
            } else {
                payment.setStatus("FAILED");
                paymentRepository.save(payment);
                logger.error("MoMo payment failed with result code: {}", momoResultCode);
                response.sendRedirect("http://localhost:3000/payment-error?error=ResultCode" + momoResultCode);
            }
        } else {
            logger.error("Thông tin callback không hợp lệ");
            response.sendRedirect("http://localhost:3000/payment-error?error=InvalidCallback");
        }
    }


    private void sendPaymentSuccessEmail(Payment payment) throws MessagingException {
        Booking booking = payment.getBooking();
        if (booking == null || booking.getRooms() == null || booking.getRooms().getId() == null) {
            logger.error("Booking không hợp lệ hoặc không có Room liên kết cho payment: {}", payment);
            throw new IllegalStateException("Booking không hợp lệ hoặc không có Room liên kết");
        }


        Homestay homestay = homestayRepository.findById(booking.getRooms().getId().getHomestayId()).orElseThrow(() -> {
            logger.error("Không tìm thấy Homestay với id: {}", booking.getRooms().getId().getHomestayId());
            return new ResourceNotFoundException("Không tìm thấy Homestay với id: " + booking.getRooms().getId().getHomestayId());
        });


        User user = booking.getUser();
        if (user == null || user.getEmail() == null || user.getEmail().isEmpty()) {
            logger.error("User không hợp lệ hoặc thiếu email cho booking: {}", booking.getId());
            throw new IllegalStateException("User không hợp lệ hoặc thiếu email");
        }


        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        try {
            helper.setTo(user.getEmail());
            helper.setSubject("Xác nhận thanh toán thành công - Traexco Homestay");
            helper.setFrom("no-reply@traexcohomestay.com");


            String emailContent = "<h2>Xác nhận thanh toán thành công</h2>" + "<p>Kính gửi " + (user.getFullName() != null ? user.getFullName() : "Khách hàng") + ",</p>" + "<p>Cảm ơn bạn đã đặt phòng tại Traexco Homestay. Thanh toán của bạn đã được xác nhận.</p>" + "<h3>Thông tin đặt phòng:</h3>" + "<ul>" + "<li><strong>Homestay:</strong> " + homestay.getHomestayName() + "</li>" + "<li><strong>Phòng:</strong> " + booking.getRooms().getId().getRoomNumber() + "</li>" + "<li><strong>Ngày nhận phòng:</strong> " + booking.getCheckInDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) + "</li>" + "<li><strong>Ngày trả phòng:</strong> " + booking.getCheckOutDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) + "</li>" + "<li><strong>Số khách:</strong> " + booking.getTotalPeople() + "</li>" + "<li><strong>" + (payment.getIsDeposit() ? "Số tiền đặt cọc" : "Tổng tiền") + ":</strong> " + payment.getAmount() + " VND</li>" + "</ul>" + "<p>Vui lòng liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi nào.</p>" + "<p>Trân trọng,<br>Traexco Homestay</p>";


            helper.setText(emailContent, true);
            mailSender.send(message);
            logger.info("Email xác nhận thanh toán đã được gửi tới: {}", user.getEmail());
        } catch (MessagingException e) {
            logger.error("Lỗi khi gửi email xác nhận tới {}: {}", user.getEmail(), e.getMessage());
            throw e;
        }
    }


    private String hmacSHA256(String key, String data) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(keySpec);
            byte[] messageDigest = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : messageDigest) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            throw new RuntimeException("Lỗi khi tạo hash SHA-256", e);
        }
    }


    private String hmacSHA512(String key, String data) {
        try {
            Mac mac = Mac.getInstance("HmacSHA512");
            SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
            mac.init(keySpec);
            byte[] messageDigest = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : messageDigest) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            throw new RuntimeException("Lỗi khi tạo hash SHA-512", e);
        }
    }


    @Override
    @Transactional(readOnly = true)
    public List<PaymentDTO> getPendingPaymentsByHostId(Integer hostId) {
        logger.info("Đang lấy các thanh toán đang chờ xử lý cho hostId: {}", hostId);
        if (hostId == null) {
            logger.error("HostId là null");
            throw new IllegalArgumentException("HostId là bắt buộc");
        }
        List<Payment> payments = paymentRepository.findByBookingRoomsHomestayHostIdAndStatus(hostId, "PENDING");
        logger.info("Tìm thấy {} thanh toán đang chờ xử lý cho hostId: {}", payments.size(), hostId);
        return payments.stream().map(this::convertToDTO).collect(Collectors.toList());
    }


    @Override
    public PaymentDTO updatePaymentStatus(Integer paymentId, String status) {
        logger.info("Đang cập nhật trạng thái thanh toán cho paymentId: {} thành {}", paymentId, status);


        if (paymentId == null) {
            logger.error("PaymentId là null");
            throw new IllegalArgumentException("PaymentId là bắt buộc");
        }
        if (status == null || (!status.equals("APPROVED") && !status.equals("REJECTED") && !status.equals("CONFIRMED"))) {
            logger.error("Trạng thái không hợp lệ: {}", status);
            throw new IllegalArgumentException("Trạng thái phải là APPROVED, CONFIRMED hoặc REJECTED");
        }


        Payment payment = paymentRepository.findById(paymentId).orElseThrow(() -> {
            logger.error("Không tìm thấy thanh toán với id: {}", paymentId);
            return new ResourceNotFoundException("Không tìm thấy thanh toán với id: " + paymentId);
        });


        payment.setStatus(status);
        Payment updatedPayment = paymentRepository.save(payment);
        logger.info("Đã cập nhật thanh toán: {}", updatedPayment);


        Notification notification = new Notification();
        notification.setUser(updatedPayment.getBooking().getUser());
        notification.setMessage("Yêu cầu thanh toán #" + paymentId + " đã được " + (status.equals("APPROVED") || status.equals("CONFIRMED") ? "chấp nhận" : "từ chối") + " bởi chủ host.");
        notification.setType("PAYMENT_STATUS_UPDATE");
        notification.setStatus(false);
        notification.setCreatedAt(Instant.now());
        notificationRepository.save(notification);
        logger.info("Đã lưu thông báo cho người dùng: {}", notification);


        return convertToDTO(updatedPayment);
    }


    private PaymentDTO convertToDTO(Payment payment) {
        PaymentDTO dto = new PaymentDTO();
        dto.setBookingId(payment.getBooking().getId());
        dto.setAmount(payment.getAmount());
        dto.setPaymentMethod(payment.getPaymentMethod());
        dto.setStatus(payment.getStatus());
        dto.setPaymentDetails(payment.getPaymentDetails());
        dto.setIsDeposit(payment.getIsDeposit());
        return dto;
    }

    @Override
    public void handlePaymentCancel(String vnpTxnRef, String momoOrderId, Integer bookingId) {
        logger.info("Handling payment cancel - vnpTxnRef: {}, momoOrderId: {}, bookingId: {}", vnpTxnRef, momoOrderId, bookingId);

        Optional<Payment> paymentOpt = Optional.empty();

        // Tìm payment theo txnRef hoặc orderId
        if (vnpTxnRef != null && !vnpTxnRef.isEmpty()) {
            paymentOpt = paymentRepository.findByPaymentDetailsContaining(vnpTxnRef);
        } else if (momoOrderId != null && !momoOrderId.isEmpty()) {
            paymentOpt = paymentRepository.findByPaymentDetailsContaining(momoOrderId);
        } else if (bookingId != null) {
            // Tìm payment pending gần nhất của booking này
            List<Payment> bookingPayments = paymentRepository.findByBookingIdAndStatus(bookingId, "PENDING");
            if (!bookingPayments.isEmpty()) {
                paymentOpt = Optional.of(bookingPayments.get(bookingPayments.size() - 1)); // Lấy cái mới nhất
            }
        }

        if (paymentOpt.isPresent()) {
            Payment payment = paymentOpt.get();
            payment.setStatus("CANCELLED");
            payment.setPaymentDetails(payment.getPaymentDetails() + " - Cancelled by user");
            paymentRepository.save(payment);

            // Tạo notification cho user
            Notification notification = new Notification();
            notification.setUser(payment.getBooking().getUser());
            notification.setMessage("Thanh toán cho đặt phòng #" + payment.getBooking().getId() + " đã bị hủy.");
            notification.setType("PAYMENT_CANCELLED");
            notification.setStatus(false);
            notification.setCreatedAt(Instant.now());
            notificationRepository.save(notification);

            logger.info("Payment cancelled successfully: {}", payment.getId());
        } else {
            logger.warn("No payment found to cancel with given parameters");
        }
    }

    @Override
    public Map<String, Object> getPaymentStatus(Integer bookingId) {
        logger.info("Getting payment status for booking: {}", bookingId);

        if (bookingId == null) {
            throw new IllegalArgumentException("BookingId là bắt buộc");
        }

        Booking booking = bookingRepository.findById(bookingId).orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy Booking với id: " + bookingId));

        // Lấy tất cả payments của booking này
        List<Payment> payments = paymentRepository.findByBookingIdOrderByPaymentDateDesc(bookingId);

        Map<String, Object> result = new HashMap<>();
        result.put("bookingId", bookingId);
        result.put("bookingStatus", booking.getStatus());

        if (payments.isEmpty()) {
            result.put("paymentStatus", "NO_PAYMENT");
            result.put("message", "Chưa có thanh toán nào cho booking này");
        } else {
            Payment latestPayment = payments.get(0); // Payment mới nhất
            result.put("paymentStatus", latestPayment.getStatus());
            result.put("paymentId", latestPayment.getId());
            result.put("amount", latestPayment.getAmount());
            result.put("paymentMethod", latestPayment.getPaymentMethod());
            result.put("paymentDate", latestPayment.getPaymentDate());

            // Đếm số lần thất bại
            long failedCount = payments.stream().filter(p -> "FAILED".equals(p.getStatus()) || "CANCELLED".equals(p.getStatus())).count();
            result.put("failedAttempts", failedCount);

            // Check nếu có payment đang pending quá lâu (> 30 phút)
            if ("PENDING".equals(latestPayment.getStatus())) {
                Instant thirtyMinutesAgo = Instant.now().minusSeconds(30 * 60);
                if (latestPayment.getPaymentDate().isBefore(thirtyMinutesAgo)) {
                    result.put("message", "Thanh toán đang chờ xử lý quá lâu, có thể đã hết hạn");
                    result.put("isExpired", true);
                } else {
                    result.put("message", "Thanh toán đang được xử lý");
                    result.put("isExpired", false);
                }
            }
        }

        return result;
    }

    @Override
    public PaymentDTO retryFailedPayment(Integer paymentId) {
        logger.info("Retrying failed payment: {}", paymentId);

        if (paymentId == null) {
            throw new IllegalArgumentException("PaymentId là bắt buộc");
        }

        Payment failedPayment = paymentRepository.findById(paymentId).orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy Payment với id: " + paymentId));

        // Chỉ cho phép retry với payment FAILED hoặc CANCELLED
        if (!"FAILED".equals(failedPayment.getStatus()) && !"CANCELLED".equals(failedPayment.getStatus())) {
            throw new IllegalArgumentException("Chỉ có thể thử lại với thanh toán đã thất bại hoặc bị hủy");
        }

        // Tạo payment mới từ payment cũ
        PaymentDTO newPaymentDTO = new PaymentDTO();
        newPaymentDTO.setBookingId(failedPayment.getBooking().getId());
        newPaymentDTO.setAmount(failedPayment.getAmount());
        newPaymentDTO.setPaymentMethod(failedPayment.getPaymentMethod());
        newPaymentDTO.setPaymentDetails("Retry of payment #" + paymentId);
        newPaymentDTO.setIsDeposit(failedPayment.getIsDeposit());

        // Tạo payment mới
        return createPayment(newPaymentDTO);
    }

    @Override
    @Transactional
    public void cancelExpiredPayments() {
        logger.info("Cancelling expired payments...");

        // Tìm các payment PENDING quá 30 phút
        Instant thirtyMinutesAgo = Instant.now().minusSeconds(30 * 60);
        List<Payment> expiredPayments = paymentRepository.findByStatusAndPaymentDateBefore("PENDING", thirtyMinutesAgo);

        for (Payment payment : expiredPayments) {
            payment.setStatus("EXPIRED");
            payment.setPaymentDetails(payment.getPaymentDetails() + " - Expired due to timeout");
            paymentRepository.save(payment);

            // Tạo notification cho user
            Notification notification = new Notification();
            notification.setUser(payment.getBooking().getUser());
            notification.setMessage("Thanh toán cho đặt phòng #" + payment.getBooking().getId() + " đã hết hạn do không được hoàn thành trong thời gian quy định.");
            notification.setType("PAYMENT_EXPIRED");
            notification.setStatus(false);
            notification.setCreatedAt(Instant.now());
            notificationRepository.save(notification);

            logger.info("Payment {} marked as expired", payment.getId());
        }

        logger.info("Cancelled {} expired payments", expiredPayments.size());
    }

    private void handleVNPayCallback(String vnpResponseCode, String vnpTxnRef, String vnpAmount, String vnpSecureHash, Map<String, String> params, HttpServletResponse response) throws IOException {
        // Validate secure hash nếu có
        if (vnpSecureHash != null) {
            Map<String, String> hashParams = new TreeMap<>(params);
            hashParams.remove("vnp_SecureHash");
            hashParams.remove("vnp_SecureHashType");

            StringBuilder hashData = new StringBuilder();
            for (Map.Entry<String, String> entry : hashParams.entrySet()) {
                if (entry.getValue() != null && !entry.getValue().isEmpty()) {
                    hashData.append(entry.getKey()).append('=').append(URLEncoder.encode(entry.getValue(), StandardCharsets.US_ASCII.toString())).append('&');
                }
            }
            if (hashData.length() > 0) {
                hashData.setLength(hashData.length() - 1);
            }

            String calculatedHash = hmacSHA512(vnPayConfig.vnp_HashSecret, hashData.toString());
            if (!calculatedHash.equals(vnpSecureHash)) {
                logger.error("Invalid secure hash for VNPay callback: expected {}, received {}", calculatedHash, vnpSecureHash);
                response.sendRedirect("http://localhost:3000/payment-error?error=InvalidSecureHash");
                return;
            }
        }

        Optional<Payment> paymentOpt = paymentRepository.findByPaymentDetailsContaining(vnpTxnRef);
        if (paymentOpt.isEmpty()) {
            logger.error("Không tìm thấy thanh toán với TxnRef: {}", vnpTxnRef);
            response.sendRedirect("http://localhost:3000/payment-error?error=PaymentNotFound&txnRef=" + vnpTxnRef);
            return;
        }

        Payment payment = paymentOpt.get();

        // Xử lý các mã response khác nhau của VNPay
        switch (vnpResponseCode) {
            case "00":
                // Thành công
                payment.setStatus("APPROVED");
                paymentRepository.save(payment);
                try {
                    sendPaymentSuccessEmail(payment);
                    logger.info("Redirecting to booking-success for TxnRef: {}", vnpTxnRef);
                    response.sendRedirect("http://localhost:3000/booking-success?bookingId=" + payment.getBooking().getId() + "&txnRef=" + vnpTxnRef);
                } catch (MessagingException e) {
                    logger.error("Lỗi khi gửi email xác nhận: {}", e.getMessage());
                    response.sendRedirect("http://localhost:3000/payment-error?error=EmailFailed");
                }
                break;

            case "24":
                // Người dùng hủy giao dịch
                payment.setStatus("CANCELLED");
                paymentRepository.save(payment);
                logger.info("VNPay payment cancelled by user for TxnRef: {}", vnpTxnRef);
                response.sendRedirect("http://localhost:3000/payment-cancelled?bookingId=" + payment.getBooking().getId() + "&reason=UserCancelled");
                break;

            case "11":
                // Thẻ/Tài khoản hết hạn
                payment.setStatus("FAILED");
                payment.setPaymentDetails(payment.getPaymentDetails() + " - Card/Account expired");
                paymentRepository.save(payment);
                logger.error("VNPay payment failed - Card expired for TxnRef: {}", vnpTxnRef);
                response.sendRedirect("http://localhost:3000/payment-error?error=CardExpired&bookingId=" + payment.getBooking().getId());
                break;

            case "12":
                // Thẻ/Tài khoản bị khóa
                payment.setStatus("FAILED");
                payment.setPaymentDetails(payment.getPaymentDetails() + " - Card/Account locked");
                paymentRepository.save(payment);
                logger.error("VNPay payment failed - Card locked for TxnRef: {}", vnpTxnRef);
                response.sendRedirect("http://localhost:3000/payment-error?error=CardLocked&bookingId=" + payment.getBooking().getId());
                break;

            case "13":
                // Sai mật khẩu OTP
                payment.setStatus("FAILED");
                payment.setPaymentDetails(payment.getPaymentDetails() + " - Wrong OTP");
                paymentRepository.save(payment);
                logger.error("VNPay payment failed - Wrong OTP for TxnRef: {}", vnpTxnRef);
                response.sendRedirect("http://localhost:3000/payment-error?error=WrongOTP&bookingId=" + payment.getBooking().getId());
                break;

            case "51":
                // Tài khoản không đủ số dư
                payment.setStatus("FAILED");
                payment.setPaymentDetails(payment.getPaymentDetails() + " - Insufficient balance");
                paymentRepository.save(payment);
                logger.error("VNPay payment failed - Insufficient balance for TxnRef: {}", vnpTxnRef);
                response.sendRedirect("http://localhost:3000/payment-error?error=InsufficientBalance&bookingId=" + payment.getBooking().getId());
                break;

            default:
                // Các lỗi khác
                payment.setStatus("FAILED");
                payment.setPaymentDetails(payment.getPaymentDetails() + " - Error code: " + vnpResponseCode);
                paymentRepository.save(payment);
                logger.error("VNPay payment failed with response code: {} for TxnRef: {}", vnpResponseCode, vnpTxnRef);
                response.sendRedirect("http://localhost:3000/payment-error?error=ResponseCode" + vnpResponseCode + "&bookingId=" + payment.getBooking().getId());
                break;
        }
    }

    private void handleMoMoCallback(String momoResultCode, String momoOrderId, String momoAmount, HttpServletResponse response) throws IOException {
        Optional<Payment> paymentOpt = paymentRepository.findByPaymentDetailsContaining(momoOrderId);
        if (paymentOpt.isEmpty()) {
            logger.error("Không tìm thấy thanh toán với OrderId: {}", momoOrderId);
            response.sendRedirect("http://localhost:3000/payment-error?error=PaymentNotFound&orderId=" + momoOrderId);
            return;
        }

        Payment payment = paymentOpt.get();

        // Xử lý các mã kết quả khác nhau của MoMo
        switch (momoResultCode) {
            case "0":
                // Thành công
                payment.setStatus("APPROVED");
                paymentRepository.save(payment);
                try {
                    sendPaymentSuccessEmail(payment);
                    logger.info("Redirecting to booking-success for OrderId: {}", momoOrderId);
                    response.sendRedirect("http://localhost:3000/booking-success?bookingId=" + payment.getBooking().getId() + "&orderId=" + momoOrderId);
                } catch (MessagingException e) {
                    logger.error("Lỗi khi gửi email xác nhận: {}", e.getMessage());
                    response.sendRedirect("http://localhost:3000/payment-error?error=EmailFailed");
                }
                break;

            case "1006":
                // Người dùng hủy giao dịch
                payment.setStatus("CANCELLED");
                paymentRepository.save(payment);
                logger.info("MoMo payment cancelled by user for OrderId: {}", momoOrderId);
                response.sendRedirect("http://localhost:3000/payment-cancelled?bookingId=" + payment.getBooking().getId() + "&reason=UserCancelled");
                break;

            case "1005":
                // URL hoặc QR code đã hết hạn
                payment.setStatus("EXPIRED");
                paymentRepository.save(payment);
                logger.error("MoMo payment expired for OrderId: {}", momoOrderId);
                response.sendRedirect("http://localhost:3000/payment-error?error=PaymentExpired&bookingId=" + payment.getBooking().getId());
                break;

            default:
                // Các lỗi khác
                payment.setStatus("FAILED");
                payment.setPaymentDetails(payment.getPaymentDetails() + " - MoMo error code: " + momoResultCode);
                paymentRepository.save(payment);
                logger.error("MoMo payment failed with result code: {} for OrderId: {}", momoResultCode, momoOrderId);
                response.sendRedirect("http://localhost:3000/payment-error?error=ResultCode" + momoResultCode + "&bookingId=" + payment.getBooking().getId());
                break;
        }
    }
}




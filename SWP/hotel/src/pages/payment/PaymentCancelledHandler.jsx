"use client"

import { useState, useEffect } from "react"
import { XCircle, RefreshCw, ArrowLeft, CreditCard, Clock } from "lucide-react"
import "../../assets/styles/payment-styles.css"

const PaymentCancelledHandler = () => {
    const [bookingId, setBookingId] = useState("")
    const [reason, setReason] = useState("")
    const [paymentStatus, setPaymentStatus] = useState(null)
    const [isRetrying, setIsRetrying] = useState(false)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const bookingIdParam = urlParams.get("bookingId")
        const reasonParam = urlParams.get("reason")

        setBookingId(bookingIdParam || "")
        setReason(reasonParam || "")

        if (bookingIdParam) {
            checkPaymentStatus(bookingIdParam)
        }
    }, [])

    const checkPaymentStatus = async (bookingId) => {
        try {
            const response = await fetch(`/api/payments/status/${bookingId}`)
            const data = await response.json()
            setPaymentStatus(data)
        } catch (error) {
            console.error("Error checking payment status:", error)
        }
    }

    const createNewPayment = async () => {
        if (!paymentStatus) return

        setIsRetrying(true)
        try {
            // Tạo payment mới
            const paymentResponse = await fetch("/api/payments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bookingId: Number.parseInt(bookingId),
                    amount: paymentStatus.amount,
                    paymentMethod: paymentStatus.paymentMethod || "VNPAY",
                }),
            })

            if (paymentResponse.ok) {
                const newPayment = await paymentResponse.json()
                // Tạo URL thanh toán mới
                const urlResponse = await fetch("/api/payments/create-payment-url", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        bookingId: newPayment.bookingId,
                        amount: newPayment.amount,
                        paymentMethod: newPayment.paymentMethod,
                    }),
                })

                if (urlResponse.ok) {
                    const paymentUrl = await urlResponse.text()
                    window.location.href = paymentUrl
                } else {
                    throw new Error("Failed to create payment URL")
                }
            } else {
                throw new Error("Failed to create payment")
            }
        } catch (error) {
            console.error("Error creating new payment:", error)
            alert("Không thể tạo thanh toán mới. Vui lòng thử lại sau.")
        } finally {
            setIsRetrying(false)
        }
    }

    const getReasonMessage = (reason) => {
        switch (reason) {
            case "UserCancelled":
                return "Bạn đã chọn hủy giao dịch trong quá trình thanh toán."
            case "Timeout":
                return "Phiên thanh toán đã hết thời gian chờ."
            case "NetworkError":
                return "Kết nối mạng bị gián đoạn trong quá trình thanh toán."
            default:
                return "Giao dịch thanh toán đã bị hủy."
        }
    }

    return (
        <div className="payment-container">
            <div className="payment-card">
                <div className="payment-content">
                    <div className="status-icon warning">
                        <XCircle size={32} />
                    </div>

                    <h1 className="payment-title">Thanh toán đã bị hủy</h1>

                    <p className="payment-message">{getReasonMessage(reason)}</p>

                    {paymentStatus && (
                        <div className="booking-info">
                            <h3 className="booking-title">Thông tin đặt phòng:</h3>
                            <div className="booking-details">
                                <div className="detail-row">
                                    <span className="detail-label">Booking ID:</span>
                                    <span className="detail-value">#{paymentStatus.bookingId}</span>
                                </div>
                                {paymentStatus.amount && (
                                    <div className="detail-row">
                                        <span className="detail-label">Số tiền:</span>
                                        <span className="detail-value amount">{paymentStatus.amount.toLocaleString()} VND</span>
                                    </div>
                                )}
                                <div className="detail-row">
                                    <span className="detail-label">Trạng thái:</span>
                                    <span className="status-badge cancelled">
                                        {paymentStatus.paymentStatus === "CANCELLED" ? "Đã hủy" : paymentStatus.paymentStatus}
                                    </span>
                                </div>
                                {paymentStatus.failedAttempts > 0 && (
                                    <div className="detail-row">
                                        <span className="detail-label">Số lần thất bại:</span>
                                        <span className="detail-value">{paymentStatus.failedAttempts}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="notice-box">
                        <div className="notice-header">
                            <Clock size={16} />
                            <span>Lưu ý quan trọng</span>
                        </div>
                        <p className="notice-text">
                            Booking của bạn vẫn được giữ chỗ trong vòng 30 phút. Hãy hoàn tất thanh toán để xác nhận đặt phòng.
                        </p>
                    </div>

                    <div className="action-buttons">
                        <button onClick={createNewPayment} disabled={isRetrying} className="btn btn-primary">
                            {isRetrying ? (
                                <>
                                    <RefreshCw size={16} className="spinning" />
                                    Đang tạo thanh toán mới...
                                </>
                            ) : (
                                <>
                                    <CreditCard size={16} />
                                    Thanh toán ngay
                                </>
                            )}
                        </button>

                        <button
                            onClick={() => (window.location.href = `/booking-details/${bookingId}`)}
                            className="btn btn-secondary"
                        >
                            Xem chi tiết đặt phòng
                        </button>

                        <button onClick={() => (window.location.href = "/")} className="btn btn-outline">
                            <ArrowLeft size={16} />
                            Quay lại trang chủ
                        </button>
                    </div>

                    <div className="support-section">
                        <p className="support-text">
                            Gặp khó khăn trong thanh toán?
                            <br />
                            Liên hệ hỗ trợ:{" "}
                            <a href="tel:+84123456789" className="support-link">
                                0123 456 789
                            </a>{" "}
                            hoặc{" "}
                            <a href="mailto:support@traexcohomestay.com" className="support-link">
                                support@traexcohomestay.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentCancelledHandler

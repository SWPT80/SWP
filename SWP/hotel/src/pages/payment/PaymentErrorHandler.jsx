"use client"

import { useState, useEffect } from "react"
import { AlertCircle, RefreshCw, ArrowLeft, CreditCard } from "lucide-react"
import "../../assets/styles/payment-styles.css"

const PaymentErrorHandler = () => {
    const [error, setError] = useState("")
    const [bookingId, setBookingId] = useState("")
    const [isRetrying, setIsRetrying] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState(null)

    useEffect(() => {
        // Lấy error parameters từ URL
        const urlParams = new URLSearchParams(window.location.search)
        const errorParam = urlParams.get("error")
        const bookingIdParam = urlParams.get("bookingId")
        const txnRef = urlParams.get("txnRef")
        const orderId = urlParams.get("orderId")

        setError(errorParam || "")
        setBookingId(bookingIdParam || "")

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

    const retryPayment = async () => {
        if (!paymentStatus?.paymentId) return

        setIsRetrying(true)
        try {
            const response = await fetch(`/api/payments/retry/${paymentStatus.paymentId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            })

            if (response.ok) {
                const newPayment = await response.json()
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
                }
            } else {
                alert("Không thể thử lại thanh toán. Vui lòng thử lại sau.")
            }
        } catch (error) {
            console.error("Error retrying payment:", error)
            alert("Có lỗi xảy ra khi thử lại thanh toán.")
        } finally {
            setIsRetrying(false)
        }
    }

    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case "UserCancelled":
                return {
                    title: "Thanh toán đã bị hủy",
                    message: "Bạn đã hủy giao dịch thanh toán.",
                    type: "warning",
                }
            case "CardExpired":
                return {
                    title: "Thẻ đã hết hạn",
                    message: "Thẻ của bạn đã hết hạn. Vui lòng sử dụng thẻ khác.",
                    type: "error",
                }
            case "CardLocked":
                return {
                    title: "Thẻ bị khóa",
                    message: "Thẻ của bạn đã bị khóa. Vui lòng liên hệ ngân hàng.",
                    type: "error",
                }
            case "WrongOTP":
                return {
                    title: "Sai mã OTP",
                    message: "Mã OTP không chính xác. Vui lòng thử lại.",
                    type: "error",
                }
            case "InsufficientBalance":
                return {
                    title: "Không đủ số dư",
                    message: "Tài khoản của bạn không đủ số dư để thực hiện giao dịch.",
                    type: "error",
                }
            case "PaymentExpired":
                return {
                    title: "Thanh toán đã hết hạn",
                    message: "Phiên thanh toán đã hết hạn. Vui lòng thử lại.",
                    type: "warning",
                }
            case "PaymentNotFound":
                return {
                    title: "Không tìm thấy thanh toán",
                    message: "Không tìm thấy thông tin thanh toán.",
                    type: "error",
                }
            case "InvalidSecureHash":
                return {
                    title: "Lỗi bảo mật",
                    message: "Có lỗi xảy ra trong quá trình xác thực. Vui lòng thử lại.",
                    type: "error",
                }
            default:
                return {
                    title: "Thanh toán thất bại",
                    message: "Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.",
                    type: "error",
                }
        }
    }

    const errorInfo = getErrorMessage(error)

    return (
        <div className="payment-container">
            <div className="payment-card">
                <div className="payment-content">
                    <div className={`status-icon ${errorInfo.type}`}>
                        <AlertCircle size={32} />
                    </div>

                    <h1 className="payment-title">{errorInfo.title}</h1>

                    <p className="payment-message">{errorInfo.message}</p>

                    {paymentStatus && (
                        <div className="booking-info">
                            <h3 className="booking-title">Thông tin đặt phòng:</h3>
                            <div className="booking-details">
                                <div className="detail-row">
                                    <span className="detail-label">Booking ID:</span>
                                    <span className="detail-value">#{paymentStatus.bookingId}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Số tiền:</span>
                                    <span className="detail-value amount">{paymentStatus.amount?.toLocaleString()} VND</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Trạng thái:</span>
                                    <span className="status-badge failed">{paymentStatus.paymentStatus}</span>
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

                    <div className="action-buttons">
                        {(paymentStatus?.paymentStatus === "FAILED" || paymentStatus?.paymentStatus === "CANCELLED") && (
                            <button onClick={retryPayment} disabled={isRetrying} className="btn btn-primary">
                                {isRetrying ? (
                                    <>
                                        <RefreshCw size={16} className="spinning" />
                                        Đang xử lý...
                                    </>
                                ) : (
                                    <>
                                        <CreditCard size={16} />
                                        Thử thanh toán lại
                                    </>
                                )}
                            </button>
                        )}

                        <button onClick={() => (window.location.href = "/")} className="btn btn-secondary">
                            <ArrowLeft size={16} />
                            Quay lại trang chủ
                        </button>
                    </div>

                    <div className="support-section">
                        <p className="support-text">
                            Cần hỗ trợ? Liên hệ{" "}
                            <a href="tel:+84123456789" className="support-link">
                                hotline: 0123 456 789
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentErrorHandler

import React, { useEffect, useState } from 'react';
import { Container, Alert, Button, Spinner } from 'react-bootstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from '../../utils/axiosConfig';

const PaymentCallback = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [isLoadingState, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return; // Đợi xác thực xong mới xử lý

    const fetchPaymentStatus = async () => {
      setIsLoading(true);

      const token = localStorage.getItem('token');
     
      const vnpResponseCode = searchParams.get('vnp_ResponseCode');
      const vnpTxnRef = searchParams.get('vnp_TxnRef');
      const vnpAmount = searchParams.get('vnp_Amount');
      const momoResultCode = searchParams.get('resultCode');
      const momoOrderId = searchParams.get('orderId');
      const momoAmount = searchParams.get('amount');

      try {
        const response = await axios.get(`/api/payments/callback`, {
          params: {
            vnp_ResponseCode: vnpResponseCode,
            vnp_TxnRef: vnpTxnRef,
            vnp_Amount: vnpAmount,
            resultCode: momoResultCode,
            orderId: momoOrderId,
            amount: momoAmount
          }
        });
        setMessage(response.data);
        console.log('Payment callback response:', response.data);

        // Sửa điều kiện chuyển hướng dựa vào response từ backend
        if (
          response.data?.success === true ||
          response.data?.status === 'success' ||
          vnpResponseCode === '00' ||
          momoResultCode === '0'
        ) {
          setStatus('success');
          setTimeout(() => navigate('/booking-success'), 2000);
        } else {
          setStatus('danger');
        }
      } catch (error) {
        console.error('Error processing payment callback:', error);
        setMessage('Lỗi khi xử lý thanh toán. Vui lòng thử lại.');
        setStatus('danger');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentStatus();
  }, [searchParams, navigate, isLoggedIn, isLoading]);

  return (
    <Container className="my-5 text-center">
      {isLoadingState ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <Spinner animation="border" variant="primary" />
          <span className="ms-3">Đang xử lý thanh toán...</span>
        </div>
      ) : (
        <Alert variant={status}>
          <Alert.Heading>{status === 'success' ? 'Thanh toán thành công!' : 'Thanh toán thất bại'}</Alert.Heading>
          <p>{message}</p>
          <hr />
          <p className="mb-0">
            {status === 'success'
              ? 'Cảm ơn bạn đã đặt phòng. Bạn sẽ được chuyển hướng đến trang xác nhận.'
              : 'Vui lòng thử lại hoặc liên hệ hỗ trợ.'}
          </p>
          {status !== 'success' && (
            <Button variant="primary" className="mt-3" onClick={() => navigate('/')}>
              Quay về trang chủ
            </Button>
          )}
        </Alert>
      )}
    </Container>
  );
};

export default PaymentCallback;
import { useState, useEffect } from "react";
import { Card, Badge, Button, Table, Pagination } from "react-bootstrap";
import { CreditCard, DollarSign, Clock, MoreHorizontal } from "lucide-react";
import axios from "../../utils/axiosConfig";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

export default function BillingSystem() {
  const { user } = useAuth();
  const hostId = user?.id; // Lấy hostId từ user.id
  const [revenueData, setRevenueData] = useState({
    weekly: [],
    monthly: [],
    yearly: [],
  });
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const [paginatedInvoices, setPaginatedInvoices] = useState([]); // Danh sách hóa đơn trong trang hiện tại
  const pageSize = 5; // Số hóa đơn mỗi trang

  // Hàm gọi API doanh thu
  const fetchRevenue = async (range) => {
    try {
      const response = await axios.get(`/api/reports/revenue`, {
        params: { hostId, range },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy doanh thu ${range}:`, error.message);
      toast.error(`Không thể lấy doanh thu ${range}: ${error.response?.data?.message || error.message}`);
      return [];
    }
  };

  // Hàm gọi API danh sách hóa đơn của host
  const fetchInvoices = async () => {
    if (!user || (user.role !== "HOST" && user.role !== "ADMIN")) {
      console.warn("Không có quyền HOST hoặc ADMIN để lấy danh sách hóa đơn");
      toast.error("Bạn cần quyền HOST hoặc ADMIN để xem hóa đơn.");
      return [];
    }
    try {
      const response = await axios.get(`/api/bookings/host/${hostId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy hóa đơn:", error.message);
      toast.error(`Không thể lấy hóa đơn: ${error.response?.data?.message || error.message}`);
      return [];
    }
  };

  // Tải dữ liệu khi component mount
  useEffect(() => {
    console.log("hostId:", hostId);
    const loadData = async () => {
      setLoading(true);
      const [weekly, monthly, yearly, invoiceData] = await Promise.all([
        fetchRevenue("day"),
        fetchRevenue("month"),
        fetchRevenue("year"),
        fetchInvoices(),
      ]);
      setRevenueData({ weekly, monthly, yearly });
      setInvoices(invoiceData || []);
      setLoading(false);
    };
    if (user && hostId) {
      loadData();
    } else {
      toast.error("Vui lòng đăng nhập để xem hóa đơn.");
      setLoading(false);
    }
  }, [hostId, user]);

  // Xử lý phân trang phía client
  useEffect(() => {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    setPaginatedInvoices(invoices.slice(startIndex, endIndex));
  }, [invoices, currentPage, pageSize]);

  // Tính tổng doanh thu
  const calculateTotalRevenue = (data) => {
    return data
      .reduce((sum, item) => sum + Number(item.totalRevenue || 0), 0)
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  };

  // Tính doanh thu đã thanh toán
  const calculatePaidRevenue = () => {
    return invoices
      .filter((invoice) => invoice.status === "CONFIRMED")
      .reduce((sum, item) => sum + Number(item.totalAmount || 0), 0)
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  };

  // Tính doanh thu đang chờ xử lý
  const calculatePendingRevenue = () => {
    return invoices
      .filter((invoice) => invoice.status === "PENDING")
      .reduce((sum, item) => sum + Number(item.totalAmount || 0), 0)
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  };

  // Hàm xử lý chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Tính tổng số trang
  const totalPages = Math.ceil(invoices.length / pageSize);

  return (
    <div className="container py-4">
      {loading ? (
        <div>Đang tải...</div>
      ) : (
        <>
          <div className="row mb-4">
            {[
              {
                icon: <CreditCard className="text-primary" />,
                label: "Tổng Doanh Thu",
                value: calculateTotalRevenue(revenueData.monthly),
                change: "+12% so với tháng trước",
              },
              {
                icon: <DollarSign className="text-success" />,
                label: "Hóa Đơn Đã Thanh Toán",
                value: calculatePaidRevenue(),
                change: `${Math.round(
                  (invoices.filter((inv) => inv.status === "CONFIRMED").length /
                    (invoices.length || 1)) * 100
                )}% tổng số`,
              },
              {
                icon: <Clock className="text-warning" />,
                label: "Thanh Toán Đang Chờ",
                value: calculatePendingRevenue(),
                change: `${Math.round(
                  (invoices.filter((inv) => inv.status === "PENDING").length /
                    (invoices.length || 1)) * 100
                )}% tổng số`,
              },
            ].map((item, idx) => (
              <div className="col-md-4" key={idx}>
                <Card className="text-center">
                  <Card.Body>
                    <div className="mb-3">{item.icon}</div>
                    <div className="text-muted">{item.label}</div>
                    <h4>{item.value}</h4>
                    <div className="text-success">{item.change}</div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>

          <Card>
            <Card.Body>
              <h5 className="mb-3">Hóa Đơn Gần Đây</h5>
              <div className="table-responsive">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>MÃ HÓA ĐƠN</th>
                      <th>KHÁCH</th>
                      <th>NGÀY</th>
                      <th>SỐ TIỀN</th>
                      <th>TRẠNG THÁI</th>
                      <th>HÀNH ĐỘNG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedInvoices.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">
                          Không có hóa đơn nào.
                        </td>
                      </tr>
                    ) : (
                      paginatedInvoices.map((invoice, index) => (
                        <tr key={index}>
                          <td>{invoice.id}</td>
                          <td>{invoice.userFullName}</td>
                          <td>
                            {new Date(invoice.checkInDate).toLocaleDateString("vi-VN")}
                          </td>
                          <td>
                            {Number(invoice.totalAmount).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </td>
                          <td>
                            <Badge
                              bg={
                                invoice.status === "CONFIRMED"
                                  ? "success"
                                  : invoice.status === "PENDING"
                                  ? "warning"
                                  : "danger"
                              }
                            >
                              {invoice.status}
                            </Badge>
                          </td>
                          <td>
                            <Button variant="outline-secondary" size="sm">
                              <MoreHorizontal size={16} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
              {/* Phân trang */}
              {totalPages > 1 && (
                <Pagination className="justify-content-center mt-3">
                  <Pagination.First
                    onClick={() => handlePageChange(0)}
                    disabled={currentPage === 0}
                  />
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                  />
                  {[...Array(totalPages).keys()].map((page) => (
                    <Pagination.Item
                      key={page}
                      active={page === currentPage}
                      onClick={() => handlePageChange(page)}
                    >
                      {page + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                  />
                  <Pagination.Last
                    onClick={() => handlePageChange(totalPages - 1)}
                    disabled={currentPage === totalPages - 1}
                  />
                </Pagination>
              )}
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
}
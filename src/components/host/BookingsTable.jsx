import { useState } from "react";
import {
  Card,
  Button,
  Form,
  Table,
  Row,
  Col,
} from "react-bootstrap";
import { Search } from "lucide-react";

const bookingData = [
  {
    id: 1,
    name: "Sally Graham",
    roomType: "Queen",
    checkIn: "12/03/2024",
    checkOut: "17/03/2024",
    paidAmount: "$1550",
    dueAmount: "$0",
    paymentStatus: "Success",
  },
  {
    id: 2,
    name: "Frank Baker",
    roomType: "Single",
    checkIn: "12/03/2024",
    checkOut: "13/03/2024",
    paidAmount: "$0",
    dueAmount: "$230",
    paymentStatus: "Pending",
  },
  {
    id: 3,
    name: "Phil Glover",
    roomType: "Studio",
    checkIn: "12/03/2024",
    checkOut: "21/03/2024",
    paidAmount: "$0",
    dueAmount: "$450",
    paymentStatus: "Pending",
  },
  {
    id: 4,
    name: "Rya Randall",
    roomType: "Deluxe",
    checkIn: "12/03/2024",
    checkOut: "24/03/2024",
    paidAmount: "$0",
    dueAmount: "$430",
    paymentStatus: "Pending",
  },
  {
    id: 5,
    name: "Victor Rampling",
    roomType: "Junior Suite",
    checkIn: "12/03/2024",
    checkOut: "16/03/2024",
    paidAmount: "$0",
    dueAmount: "$530",
    paymentStatus: "Pending",
  },
];

export function BookingsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });

  // Lọc dữ liệu dựa trên từ khóa tìm kiếm
  const filteredData = bookingData.filter((booking) =>
    booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.roomType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sắp xếp dữ liệu
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    // Chuyển đổi số tiền thành số để sắp xếp
    if (sortConfig.key === "paidAmount" || sortConfig.key === "dueAmount") {
      aValue = parseFloat(aValue.replace("$", "").replace(",", ""));
      bValue = parseFloat(bValue.replace("$", "").replace(",", ""));
    }

    // Sắp xếp ngày
    if (sortConfig.key === "checkIn" || sortConfig.key === "checkOut") {
      aValue = new Date(aValue.split("/").reverse().join("-"));
      bValue = new Date(bValue.split("/").reverse().join("-"));
    }

    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Phân trang
  const totalEntries = sortedData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  // Xử lý sắp xếp
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Xử lý thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Card className="mb-4">
      <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
        <div>
          Today's Booking List <small className="text-muted">(5 entries today)</small>
        </div>
      </Card.Header>
      <Card.Body>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Control
              as="select"
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </Form.Control>
            <span className="ms-2">entries</span>
          </Col>
          <Col md={6}></Col>
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Search:"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="me-3"
            />
          </Col>
        </Row>
        <div className="table-responsive">
          <Table hover bordered>
            <thead>
              <tr>
                <th onClick={() => requestSort("name")}>
                  NAME 
                </th>
                <th onClick={() => requestSort("roomType")}>
                  ROOM TYPE 
                </th>
                <th onClick={() => requestSort("checkIn")}>
                  CHECK IN 
                </th>
                <th onClick={() => requestSort("checkOut")}>
                  CHECK OUT 
                </th>
                <th onClick={() => requestSort("paidAmount")}>
                  PAID AMOUNT 
                </th>
                <th onClick={() => requestSort("dueAmount")}>
                  DUE AMOUNT 
                </th>
                <th onClick={() => requestSort("paymentStatus")}>
                  PAYMENT STATUS 
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.name}</td>
                  <td>{booking.roomType}</td>
                  <td>{booking.checkIn}</td>
                  <td>{booking.checkOut}</td>
                  <td>{booking.paidAmount}</td>
                  <td>{booking.dueAmount}</td>
                  <td>
                    <Button
                      variant={booking.paymentStatus === "Success" ? "success" : "warning"}
                      size="sm"
                      disabled
                    >
                      {booking.paymentStatus}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Row className="mt-3">
          <Col md={6}>
            <span>
              Showing {startIndex + 1} to {Math.min(endIndex, totalEntries)} of {totalEntries} entries
            </span>
          </Col>
          <Col md={6} className="text-end">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="mx-2">{currentPage} of {totalPages}</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
import { useState, useEffect } from "react";
import { Card, Button, Row, Col, Form, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const initialRooms = [
    { id: 2, roomNumber: "102", type: "Deluxe", status: "Available", bed: "Queen Bed", guest: null, occupancy: "2 Người lớn" },
    { id: 3, roomNumber: "103", type: "Standard", status: "Booked", bed: "Double Bed", guest: null, occupancy: "1 Người lớn" },
    { id: 5, roomNumber: "105", type: "Suite", status: "Booked", bed: "King Bed", guest: null, occupancy: "2 Người lớn, 1 Trẻ em" },
    { id: 6, roomNumber: "201", type: "Family Suite", status: "Available", bed: "King Bed", guest: null, occupancy: "2 Người lớn, 3 Trẻ em" },
    { id: 7, roomNumber: "202", type: "Business Room", status: "Available", bed: "Single Bed", guest: null, occupancy: "1 Người lớn" },
    { id: 8, roomNumber: "204", type: "Super Deluxe", status: "Booked", bed: "Queen Bed", guest: null, occupancy: "1 Người lớn" },
    { id: 9, roomNumber: "206", type: "Deluxe", status: "Available", bed: "Double Bed", guest: null, occupancy: "2 Người lớn" },
    { id: 10, roomNumber: "301", type: "Deluxe", status: "Booked", bed: "King Bed", guest: null, occupancy: "2 Người lớn, 2 Trẻ em" },
    { id: 11, roomNumber: "303", type: "Super Deluxe", status: "Available", bed: "Queen Bed", guest: null, occupancy: "2 Người lớn" },
    { id: 12, roomNumber: "305", type: "Business Room", status: "Booked", bed: "Double Bed", guest: null, occupancy: "1 Người lớn" },
    { id: 13, roomNumber: "306", type: "Family Suite", status: "Available", bed: "Queen Bed", guest: null, occupancy: "2 Người lớn, 1 Trẻ em" },
    { id: 14, roomNumber: "402", type: "Deluxe", status: "Booked", bed: "King Bed", guest: null, occupancy: "2 Người lớn, 2 Trẻ em" },
];

export default function Occupancy() {
    const [rooms] = useState(initialRooms);
    const [statusFilter, setStatusFilter] = useState("All");
    const [roomTypeFilter, setRoomTypeFilter] = useState("All");
    const [bedSizeFilter, setBedSizeFilter] = useState("All");
    const [error, setError] = useState(null);

    // Kiểm tra dữ liệu phòng
    useEffect(() => {
        if (!rooms.length) {
            setError("Không có dữ liệu phòng để hiển thị.");
        } else {
            setError(null);
        }
    }, [rooms]);

    const filteredRooms = rooms.filter((room) => {
        const statusMatch = statusFilter === "All" || room.status === statusFilter;
        const typeMatch = roomTypeFilter === "All" || room.type === roomTypeFilter;
        const bedMatch = bedSizeFilter === "All" || room.bed.includes(bedSizeFilter);
        return statusMatch && typeMatch && bedMatch;
    });

    return (
        <div className="p-3">
            <h2 className="mb-4">Tình trạng phòng</h2>
            {error && (
                <Alert variant="danger" onClose={() => setError(null)} dismissible>
                    {error}
                </Alert>
            )}
            <Row className="mb-3">
                <Col md={3}>
                    <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="All">Tất cả</option>
                        <option value="Available">Trống</option>
                        <option value="Booked">Đã đặt</option>
                    </Form.Select>
                </Col>
                <Col md={3}>
                    <Form.Select value={roomTypeFilter} onChange={(e) => setRoomTypeFilter(e.target.value)}>
                        <option value="All">Tất cả loại phòng</option>
                        {[...new Set(rooms.map((r) => r.type))].map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={3}>
                    <Form.Select value={bedSizeFilter} onChange={(e) => setBedSizeFilter(e.target.value)}>
                        <option value="All">Tất cả kích thước giường</option>
                        {[...new Set(rooms.map((r) => r.bed))].map((bed) => (
                            <option key={bed} value={bed}>{bed}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={3}>
                    <Button variant="secondary" onClick={() => {
                        setStatusFilter("All");
                        setRoomTypeFilter("All");
                        setBedSizeFilter("All");
                    }}>Xóa bộ lọc</Button>
                </Col>
            </Row>

            <Row>
                {filteredRooms.length === 0 ? (
                    <Alert variant="info">
                        Không tìm thấy phòng phù hợp với bộ lọc.
                    </Alert>
                ) : (
                    filteredRooms.map((room) => (
                        <Col key={room.id} md={3} className="mb-4">
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <div className="d-flex justify-content-between">
                                        <strong>Phòng</strong>
                                        <span className={room.status === "Available" ? "text-success" : "text-danger"}>
                                            {room.status === "Available" ? "Trống" : "Đã đặt"}
                                        </span>
                                    </div>
                                    <h4 className="mt-2">#{room.roomNumber}</h4>
                                    <div className="mb-2">{room.type}</div>
                                    <div className="mb-1"><small>{room.bed}</small></div>
                                    <div><small>{room.occupancy}</small></div>
                                    <Button variant="link" size="sm" className="p-0 mt-2">Thêm khách</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </div>
    );
}
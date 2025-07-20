import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Button,
  Table,
  Modal,
  Badge,
} from "react-bootstrap";

export function BookingsTable({ hostId = 21 }) {
  const [bookings, setBookings] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userServices, setUserServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!hostId) return;

    axios
      .get("http://localhost:8080/api/reports/bookings/by-user", {
        params: { hostId },
      })
      .then((res) => {
        const updated = autoUpdateCheckOut(res.data);
        setBookings(updated);
      })
      .catch(() => setError("Failed to load bookings"));
  }, [hostId]);

  const handleRowClick = async (booking) => {
    setSelectedUser(booking);
    setShowModal(true);

    try {
      const res = await axios.get("http://localhost:8080/api/reports/bookings/user-service-detail", {
        params: {
          hostId,
          userId: booking.userId,
        },
      });
      setUserServices(res.data);
    } catch (err) {
      console.error("Error fetching service detail", err);
      setUserServices([]);
    }
  };

  const autoUpdateCheckOut = (data) => {
    const today = new Date();
    return data.map((item) => {
      const checkOut = new Date(item.checkOutDate);
      if (item.status === "Booked" && checkOut < today) {
        return { ...item, status: "Check Out" };
      }
      return item;
    });
  };

  const updateStatus = (newStatus) => {
    const updated = bookings.map((item) =>
      item.userId === selectedUser.userId ? { ...item, status: newStatus } : item
    );
    setBookings(updated);
    setSelectedUser({ ...selectedUser, status: newStatus });
  };

  return (
    <>
      <Card className="mb-4">
        <Card.Header as="h5">Booking List</Card.Header>
        <Card.Body>
          {error && <div className="text-danger">{error}</div>}

          <Table hover bordered responsive>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Room Type</th>
                <th>Room Price</th>
                <th>Total People</th>
                <th>Total Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(item)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{item.userId}</td>
                  <td>{item.userName}</td>
                  <td>{item.email}</td>
                  <td>{item.checkInDate}</td>
                  <td>{item.checkOutDate}</td>
                  <td>{item.roomType}</td>
                  <td>{item.roomPrice?.toLocaleString()}</td>
                  <td>{item.totalPeople}</td>
                  <td>{item.totalAmount?.toLocaleString()}</td>
                  <td>
                    <Badge
                      bg={
                        item.status === "Check In"
                          ? "warning"
                          : item.status === "Booked"
                          ? "primary"
                          : item.status === "Check Out"
                          ? "secondary"
                          : "danger"
                      }
                    >
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Booking Detail - {selectedUser?.fullName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>User ID:</strong> {selectedUser?.userId}</p>
          <p><strong>Email:</strong> {selectedUser?.email}</p>
          <p><strong>Full Name:</strong> {selectedUser?.userName}</p>
          <p><strong>Check In:</strong> {selectedUser?.checkInDate}</p>
          <p><strong>Check Out:</strong> {selectedUser?.checkOutDate}</p>
          <p><strong>Room Type:</strong> {selectedUser?.roomType}</p>
          <p><strong>Room Price:</strong> {selectedUser?.roomPrice?.toLocaleString()}</p>
          <p><strong>Total People:</strong> {selectedUser?.totalPeople}</p>
          <p><strong>Total Amount:</strong> {selectedUser?.totalAmount?.toLocaleString()}</p>
          <p><strong>Status:</strong> <Badge bg="info">{selectedUser?.status}</Badge></p>

          <h5 className="mt-3">Services Used:</h5>
          {userServices.length === 0 ? (
            <p>No services found</p>
          ) : (
            <ul>
              {userServices.map((s, idx) => (
                <li key={idx}>
                  {s.serviceName} - {s.price} x {s.quantity} = {(s.price * s.quantity).toLocaleString()}
                </li>
              ))}
            </ul>
          )}

          <div className="d-flex gap-2 mt-3">
            {selectedUser?.status === "Check In" && (
              <>
                <Button variant="primary" onClick={() => updateStatus("Booked")}>Chấp nhận (Booked)</Button>
                <Button variant="danger" onClick={() => updateStatus("Cancelled")}>Từ chối</Button>
              </>
            )}
            {selectedUser?.status === "Booked" && (
              <Button variant="secondary" disabled>Booked</Button>
            )}
            {selectedUser?.status === "Check Out" && (
              <Button variant="success" disabled>Đã hoàn tất</Button>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Đóng</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

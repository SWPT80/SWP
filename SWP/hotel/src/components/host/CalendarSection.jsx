import { useState } from "react";
import { Card, Button, Image, Alert } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import 'bootstrap/dist/css/bootstrap.min.css';

const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const calendarDays = [
  { day: 31, isCurrentMonth: false },
  { day: 1, isCurrentMonth: true },
  { day: 2, isCurrentMonth: true, hasBooking: true },
  { day: 3, isCurrentMonth: true },
  { day: 4, isCurrentMonth: true },
  { day: 5, isCurrentMonth: true },
  { day: 6, isCurrentMonth: true },
  { day: 7, isCurrentMonth: true, hasBooking: true },
  { day: 8, isCurrentMonth: true },
  { day: 9, isCurrentMonth: true },
  { day: 10, isCurrentMonth: true },
  { day: 11, isCurrentMonth: true },
  { day: 12, isCurrentMonth: true },
  { day: 13, isCurrentMonth: true },
  { day: 14, isCurrentMonth: true },
];

const bookingsList = [
  {
    name: "Bindu Sharma",
    nights: 3,
    guests: 2,
    avatar: "https://via.placeholder.com/32",
  },
  {
    name: "Carl Larson II",
    nights: 2,
    guests: 2,
    avatar: "https://via.placeholder.com/32",
  },
  {
    name: "Mrs. Emmett Morar",
    nights: 1,
    guests: 1,
    avatar: "https://via.placeholder.com/32",
  },
];

export function CalendarSection() {
  const [currentDate, setCurrentDate] = useState("Tháng 8 2023");
  const [error, setError] = useState(null);

  // Kiểm tra dữ liệu lịch
  useEffect(() => {
    if (!calendarDays.length || !bookingsList.length) {
      setError("Không có dữ liệu lịch hoặc danh sách đặt phòng.");
    } else {
      setError(null);
    }
  }, []);

  return (
    <Card className="p-3">
      <Card.Body>
        {error && (
          <Alert variant="danger" onClose={() => setError(null)} dismissible>
            {error}
          </Alert>
        )}
        <h5 className="mb-4">Lịch</h5>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button variant="light" size="sm">
            <ChevronLeft size={16} />
          </Button>
          <h6 className="m-0">{currentDate}</h6>
          <Button variant="light" size="sm">
            <ChevronRight size={16} />
          </Button>
        </div>
        <div className="d-grid" style={{ gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", textAlign: "center" }}>
          {daysOfWeek.map((day) => (
            <div key={day} className="text-muted fw-bold">{day}</div>
          ))}
          {calendarDays.map((date, index) => (
            <div
              key={index}
              className={`p-2 rounded ${date.isCurrentMonth
                  ? date.hasBooking
                    ? "bg-primary text-white"
                    : ""
                  : "text-muted"
                }`}
            >
              {date.day}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h6 className="fw-semibold mb-1">Danh sách đặt phòng ngày 02/08/2023</h6>
          <div className="text-muted small mb-3">({bookingsList.length} đặt phòng)</div>
          {bookingsList.length === 0 ? (
            <p>Không có đặt phòng nào</p>
          ) : (
            bookingsList.map((booking, index) => (
              <div key={index} className="d-flex align-items-center mb-3">
                <Image
                  src={booking.avatar}
                  roundedCircle
                  width={32}
                  height={32}
                  alt={booking.name}
                  className="me-3"
                />
                <div>
                  <div className="fw-medium">{booking.name}</div>
                  <div className="text-muted small">
                    {booking.nights} đêm | {booking.guests} khách
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
import { Container, Row, Col, Card, Badge, Button, Table } from "react-bootstrap";
import { Home, Edit, MoreHorizontal } from "lucide-react";
import { DashboardHeader } from '../components/host/DashboardHeader';


export default function Rooms() {
  const roomData = [
    {
      number: "101",
      type: "Standard",
      status: "Occupied",
      guest: "John Smith",
      rate: "Rs.2,500",
    },
    {
      number: "102",
      type: "Deluxe",
      status: "Available",
      guest: "-",
      rate: "Rs.3,500",
    },
    {
      number: "103",
      type: "Suite",
      status: "Maintenance",
      guest: "-",
      rate: "Rs.5,000",
    },
  ];

  const getStatusVariant = (status) => {
    switch (status) {
      case "Available":
        return "success";
      case "Occupied":
        return "warning";
      case "Maintenance":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Container fluid className="flex-grow-1 py-4">

        <Row className="g-4 mb-4">
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <div className="bg-primary bg-opacity-10 rounded-circle p-3 mx-auto mb-3" style={{ width: "48px", height: "48px" }}>
                  <Home className="text-primary" />
                </div>
                <Card.Subtitle className="mb-2 text-muted">Total Rooms</Card.Subtitle>
                <Card.Title>50</Card.Title>
                <small className="text-muted">All room types</small>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <div className="bg-success bg-opacity-10 rounded-circle p-3 mx-auto mb-3" style={{ width: "48px", height: "48px" }}>
                  <Home className="text-success" />
                </div>
                <Card.Subtitle className="mb-2 text-muted">Available</Card.Subtitle>
                <Card.Title>18</Card.Title>
                <small className="text-success">Ready for booking</small>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <div className="bg-warning bg-opacity-10 rounded-circle p-3 mx-auto mb-3" style={{ width: "48px", height: "48px" }}>
                  <Home className="text-warning" />
                </div>
                <Card.Subtitle className="mb-2 text-muted">Occupied</Card.Subtitle>
                <Card.Title>25</Card.Title>
                <small className="text-warning">Currently in use</small>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <div className="bg-danger bg-opacity-10 rounded-circle p-3 mx-auto mb-3" style={{ width: "48px", height: "48px" }}>
                  <Home className="text-danger" />
                </div>
                <Card.Subtitle className="mb-2 text-muted">Maintenance</Card.Subtitle>
                <Card.Title>7</Card.Title>
                <small className="text-danger">Under repair</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card>
          <Card.Body>
            <h4 className="mb-4">Room List</h4>
            <div className="table-responsive">
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>ROOM NUMBER</th>
                    <th>TYPE</th>
                    <th>STATUS</th>
                    <th>GUEST</th>
                    <th>RATE</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {roomData.map((room, index) => (
                    <tr key={index}>
                      <td>{room.number}</td>
                      <td>{room.type}</td>
                      <td>
                        <Badge bg={getStatusVariant(room.status)}>
                          {room.status}
                        </Badge>
                      </td>
                      <td>{room.guest}</td>
                      <td>{room.rate}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button size="sm" variant="outline-secondary">
                            <Edit size={16} />
                          </Button>
                          <Button size="sm" variant="outline-secondary">
                            <MoreHorizontal size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import RoomForm from "../../../components/host/RoomForm";
import axios from "axios";

export default function EditRoom() {
  const { id } = useParams(); // id = "10_R101"
  const [homestayId, roomId] = id.split("_");
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (location.state) {
      const room = location.state;
      setFormData({
        roomId: room.roomId,
        roomType: room.roomType || "",
        roomCapacity: room.roomCapacity || 0,
        roomPrice: room.roomPrice || 0,
        rating: room.rating || 0,
        status: room.status === true ? true : false,
        homestayId: room.homestayId,
        roomImages: room.roomImages || [],
        file: null
      });
    } else {
      // Truy cập trực tiếp, gọi API để lấy dữ liệu phòng
      axios.get(`http://localhost:8080/api/rooms/by-id/${homestayId}/${roomId}`)
        .then(res => {
          const room = res.data;
          setFormData({
            roomId: room.roomId,
            roomType: room.roomType || "",
            roomCapacity: room.roomCapacity || 0,
            roomPrice: room.roomPrice || 0,
            rating: room.rating || 0,
            status: room.status === true ? true : false,
            homestayId: room.homestayId,
            roomImages: room.roomImages || [],
            file: null
          });
        })
        .catch(err => {
          console.error("Failed to fetch room:", err);
          alert("Room not found.");
          navigate("/host/rooms");
        });
    }
  }, [location.state, homestayId, roomId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) return;

    const {
      roomType,
      roomCapacity,
      roomPrice,
      rating,
      status,
      file
    } = formData;

    try {
      // Cập nhật thông tin phòng
      await axios.put(`http://localhost:8080/api/rooms/${homestayId}/${roomId}`, {
        roomType,
        roomCapacity: parseInt(roomCapacity),
        roomPrice: parseFloat(roomPrice),
        rating: parseFloat(rating),
        status: status === "true" || status === true
      });

      // Upload ảnh nếu có
      if (file) {
        const formDataImg = new FormData();
        formDataImg.append("images", file);
        formDataImg.append("homestayId", homestayId);
        formDataImg.append("roomId", roomId);

        await axios.post(`http://localhost:8080/api/rooms/room-images/upload`, formDataImg);
      }

      alert("Room updated successfully!");
      navigate("/host/rooms");
    } catch (err) {
      console.error("Update error:", err);
      alert("An error occurred while updating room.");
    }
  };

  if (!formData) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <RoomForm
        title="Edit Room"
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/host/rooms")}
      />
    </div>
  );
}

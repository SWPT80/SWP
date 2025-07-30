import { useState } from "react";
import RoomForm from "../../../components/host/RoomForm"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddRoom() {
  const [errors, setErrors] = useState({
    roomId: "",
  });

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    roomId: "",
    roomType: "",
    roomCapacity: "",
    roomPrice: "",
    rating: "",
    status: "true",
    mobile: "",
    note: "",
    file: null,
    homestayId: 11,
    hostId: 21, // bạn có thể lấy từ state / context sau này
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Nếu là file
    if (name === "file") {
      setFormData((prev) => ({ ...prev, file: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra roomId đúng định dạng R + số
    const roomIdPattern = /^R\d+$/;
    if (!roomIdPattern.test(formData.roomId)) {
      setErrors({ roomId: "Room ID must start with 'R' followed by digits (e.g., R101)" });
      return;
    }

    setErrors({}); // clear errors if passed

    const body = {
      roomId: formData.roomId,
      roomType: formData.roomType,
      roomCapacity: parseInt(formData.roomCapacity),
      roomPrice: parseFloat(formData.roomPrice),
      rating: parseFloat(formData.rating),
      status: formData.status === "true" || formData.status === true,
      homestayId: formData.homestayId,
      hostId: formData.hostId, // ✅ thêm dòng này
    };

    try {
      await axios.post("http://localhost:8080/api/rooms", body);

      if (formData.file) {
        const imageForm = new FormData();
        imageForm.append("images", formData.file);
        imageForm.append("homestayId", formData.homestayId);
        imageForm.append("roomId", formData.roomId);

        await axios.post("http://localhost:8080/api/rooms/room-images/upload", imageForm);
      }

      alert("Room added successfully!");
      navigate("/host/rooms");
    } catch (err) {
      console.error("Error creating room:", err);
      alert("Failed to create room");
    }
  };


  return (
    <RoomForm
      title="Add Room"
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={() => navigate("/rooms/allroom")}
    />
  );
}

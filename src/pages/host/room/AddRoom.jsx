import { useEffect, useState } from "react";
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
    homestayId: "",
  });
  const [hostId, setHostId] = useState(() => localStorage.getItem("hostId"));
  const [homestays, setHomestays] = useState([]);
  useEffect(() => {
    if (hostId) {
      axios.get(`http://localhost:8080/api/homestays/by-host/${hostId}`)
        .then(res => {
          console.log("Fetched homestays:", res.data); // ✅ debug
          setHomestays(res.data);
          if (res.data.length === 1) {
            const hId = res.data[0].id;
            setFormData(prev => ({ ...prev, homestayId: hId }));
            console.log("Set homestayId:", hId);
          }
        })
        .catch(err => console.error("Failed to fetch homestays", err));
    }
  }, [hostId]);



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
      return;
    }
    // Nếu chưa có hostId => gọi /me
    if (!hostId) {
      axios.get("http://localhost:8080/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          const user = res.data;
          if (user.role !== 'HOST') {
            navigate("/", { replace: true });
            return;
          }
          localStorage.setItem("hostId", user.id);
          setHostId(user.id);
        })
        .catch(() => navigate("/", { replace: true }));
    }
  }, [navigate, hostId]);
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
      hostId: hostId, // ✅ thêm dòng này
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
      errors={errors}
      homestays={homestays}
    />

  );
}

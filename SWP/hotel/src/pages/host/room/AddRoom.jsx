import { useEffect, useState } from "react";
import RoomForm from "../../../components/host/RoomForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toast, ToastContainer } from "react-bootstrap";

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

  // Toast states
  const [toasts, setToasts] = useState([]);

  // Function to show toast
  const showToast = (message, type = 'success', duration = 4000) => {
    const id = Date.now();
    const newToast = {
      id,
      message,
      type, // 'success', 'error', 'warning', 'info'
      show: true,
      duration,
      startTime: Date.now(),
      progress: 0
    };
    setToasts(prev => [...prev, newToast]);

    // Update progress bar
    const progressInterval = setInterval(() => {
      setToasts(prev => prev.map(toast => {
        if (toast.id === id) {
          const elapsed = Date.now() - toast.startTime;
          const progress = Math.min((elapsed / duration) * 100, 100);
          return { ...toast, progress };
        }
        return toast;
      }));
    }, 50);

    // Auto hide after duration
    setTimeout(() => {
      clearInterval(progressInterval);
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration);
  };

  const hideToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const getToastVariant = (type) => {
    switch (type) {
      case 'success': return 'success';
      case 'error': return 'danger';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'primary';
    }
  };

  const getToastIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

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
          showToast("Homestays loaded successfully", "success", 2000);
        })
        .catch(err => {
          console.error("Failed to fetch homestays", err);
          showToast("Failed to load homestays", "error");
        });
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
      showToast("Verifying authentication...", "info", 2000);
      axios.get("http://localhost:8080/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          const user = res.data;
          if (user.role !== 'HOST') {
            showToast("Access denied. Host role required.", "error");
            navigate("/", { replace: true });
            return;
          }
          localStorage.setItem("hostId", user.id);
          setHostId(user.id);
          showToast(`Welcome back, ${user.name || 'Host'}!`, "success");
        })
        .catch(() => {
          showToast("Authentication failed", "error");
          navigate("/", { replace: true });
        });
    }
  }, [navigate, hostId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Nếu là file
    if (name === "file") {
      setFormData((prev) => ({ ...prev, file: value }));
      if (value) {
        showToast("Image selected successfully", "info", 2000);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.homestayId) {
      showToast("Please select a homestay", "warning");
      return;
    }

    // Kiểm tra roomId đúng định dạng R + số
    const roomIdPattern = /^R\d+$/;
    if (!roomIdPattern.test(formData.roomId)) {
      setErrors({ roomId: "Room ID must start with 'R' followed by digits (e.g., R101)" });
      showToast("Invalid Room ID format", "error");
      return;
    }

    // Validate required fields
    const requiredFields = ['roomType', 'roomCapacity', 'roomPrice'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      showToast(`Please fill in: ${missingFields.join(', ')}`, "warning");
      return;
    }

    setErrors({}); // clear errors if passed
    showToast("Creating room...", "info", 2000);

    const body = {
      roomId: formData.roomId,
      roomType: formData.roomType,
      roomCapacity: parseInt(formData.roomCapacity),
      roomPrice: parseFloat(formData.roomPrice),
      rating: parseFloat(formData.rating) || 0,
      status: formData.status === "true" || formData.status === true,
      homestayId: formData.homestayId,
      hostId: hostId,
    };

    try {
      await axios.post("http://localhost:8080/api/rooms", body);
      showToast("🏠 Room created successfully!", "success");

      if (formData.file) {
        showToast("Uploading image...", "info", 2000);
        const imageForm = new FormData();
        imageForm.append("images", formData.file);
        imageForm.append("homestayId", formData.homestayId);
        imageForm.append("roomId", formData.roomId);

        try {
          await axios.post("http://localhost:8080/api/rooms/room-images/upload", imageForm);
          showToast("📸 Image uploaded successfully!", "success");
        } catch (imgErr) {
          console.error("Image upload error:", imgErr);
          showToast("Room created but image upload failed", "warning");
        }
      }

      // Navigate after a short delay to let user see the success message
      setTimeout(() => {
        navigate("/host/rooms");
      }, 1500);

    } catch (err) {
      console.error("Error creating room:", err);
      const errorMessage = err.response?.data?.message || "Failed to create room";
      showToast(errorMessage, "error");
    }
  };

  return (
    <div className="pt-5">
      <RoomForm
        title="➕ Thêm Phòng Mới"
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => {
          showToast("Operation cancelled", "info", 2000);
          navigate("/host/rooms");
        }}
        errors={errors}
        homestays={homestays}
      />

      {/* Toast Container */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        {toasts.map((toast) => (
          <div key={toast.id} className="position-relative">
            <Toast
              show={toast.show}
              onClose={() => hideToast(toast.id)}
              bg={getToastVariant(toast.type)}
              className="text-white"
              style={{ minWidth: '320px' }}
            >
              <Toast.Header>
                <span className="me-2">{getToastIcon(toast.type)}</span>
                <strong className="me-auto">
                  {toast.type === 'success' && 'Success'}
                  {toast.type === 'error' && 'Error'}
                  {toast.type === 'warning' && 'Warning'}
                  {toast.type === 'info' && 'Information'}
                </strong>
                <small className="text-muted">now</small>
              </Toast.Header>
              <Toast.Body>
                {toast.message}
                {/* Progress Bar */}
                <div className="mt-2">
                  <div
                    className="progress"
                    style={{
                      height: '3px',
                      backgroundColor: 'rgba(255,255,255,0.3)',
                      borderRadius: '2px'
                    }}
                  >
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${toast.progress}%`,
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        transition: 'width 0.05s linear',
                        borderRadius: '2px'
                      }}
                    />
                  </div>
                </div>
              </Toast.Body>
            </Toast>
          </div>
        ))}
      </ToastContainer>
    </div>
  );
}
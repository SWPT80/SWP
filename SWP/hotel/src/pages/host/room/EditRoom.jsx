import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { 
  Snackbar, 
  Alert, 
  LinearProgress, 
  Box,
  CircularProgress,
  Typography 
} from "@mui/material";
import RoomForm from "../../../components/host/RoomForm";
import axios from "axios";

export default function EditRoom() {
  const { id } = useParams();
  const [homestayId, roomId] = id.split("_");
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  // Toast states - sử dụng MUI Snackbar
  const [snackbars, setSnackbars] = useState([]);

  // Function to show snackbar
  const showSnackbar = (message, severity = 'success', duration = 4000) => {
    const id = Date.now();
    const newSnackbar = {
      id,
      message,
      severity, // 'success', 'error', 'warning', 'info'
      open: true,
      duration,
      startTime: Date.now(),
      progress: 0
    };
    
    setSnackbars(prev => [...prev, newSnackbar]);
    
    // Update progress bar
    const progressInterval = setInterval(() => {
      setSnackbars(prev => prev.map(snackbar => {
        if (snackbar.id === id) {
          const elapsed = Date.now() - snackbar.startTime;
          const progress = Math.min((elapsed / duration) * 100, 100);
          return { ...snackbar, progress };
        }
        return snackbar;
      }));
    }, 50);
    
    // Auto hide after duration
    setTimeout(() => {
      clearInterval(progressInterval);
      setSnackbars(prev => prev.filter(snackbar => snackbar.id !== id));
    }, duration);
  };

  const hideSnackbar = (id) => {
    setSnackbars(prev => prev.filter(snackbar => snackbar.id !== id));
  };

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
        file: null
      });
    } else {
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
            file: null
          });
          showSnackbar("Room data loaded successfully!", "info");
        })
        .catch(err => {
          console.error("Failed to fetch room:", err);
          showSnackbar("Room not found!", "error");
          setTimeout(() => navigate("/host/rooms"), 2000);
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
      showSnackbar("Updating room...", "info", 10000);

      await axios.put(`http://localhost:8080/api/rooms/${homestayId}/${roomId}`, {
        roomType,
        roomCapacity: parseInt(roomCapacity),
        roomPrice: parseFloat(roomPrice),
        rating: parseFloat(rating),
        status: status === "true" || status === true
      });

      if (file) {
        showSnackbar("Uploading images...", "info", 8000);
        
        const formDataImg = new FormData();
        formDataImg.append("images", file);
        formDataImg.append("homestayId", homestayId);
        formDataImg.append("roomId", roomId);

        await axios.post(`http://localhost:8080/api/rooms/room-images/upload`, formDataImg);
      }

      showSnackbar("Room updated successfully!", "success");
      setTimeout(() => navigate("/host/rooms"), 1500);
      
    } catch (err) {
      console.error("Update error:", err);
      if (err.response?.status === 400) {
        showSnackbar("Invalid data provided!", "error");
      } else if (err.response?.status === 404) {
        showSnackbar("Room not found!", "error");
      } else if (err.response?.status >= 500) {
        showSnackbar("Server error occurred!", "error");
      } else {
        showSnackbar("An error occurred while updating room!", "error");
      }
    }
  };

  if (!formData) return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '50vh' 
    }}>
      <CircularProgress size={60} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Loading room data...
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ mt: 4, mx: 2 }}>
      <RoomForm
        title="Edit Room"
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/host/rooms")}
      />

      {/* Material-UI Snackbars */}
      {snackbars.map((snackbar, index) => (
        <Snackbar
          key={snackbar.id}
          open={snackbar.open}
          anchorOrigin={{ 
            vertical: 'top', 
            horizontal: 'right' 
          }}
          sx={{ 
            mt: index * 7, // Stack multiple snackbars
            maxWidth: '400px'
          }}
        >
          <Alert 
            severity={snackbar.severity}
            onClose={() => hideSnackbar(snackbar.id)}
            sx={{ 
              width: '100%',
              '& .MuiAlert-message': {
                width: '100%'
              }
            }}
          >
            <Box>
              <Typography variant="body2">
                {snackbar.message}
              </Typography>
              {/* Progress Bar */}
              <LinearProgress 
                variant="determinate" 
                value={snackbar.progress}
                sx={{ 
                  mt: 1,
                  height: 3,
                  borderRadius: 1,
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: 'rgba(255,255,255,0.8)'
                  }
                }}
              />
            </Box>
          </Alert>
        </Snackbar>
      ))}
    </Box>
  );
}
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Custom Toast Component
const ToastContainer = ({ toasts, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        maxWidth: "400px",
      }}
    >
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className={`alert alert-${toast.type} alert-dismissible fade show mb-2`}
          role="alert"
          style={{
            minWidth: "300px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            border: "none",
            marginTop: index > 0 ? "10px" : "0",
          }}
        >
          <div className="d-flex align-items-center">
            <span className="me-2" style={{ fontSize: "18px" }}>
              {toast.type === "success" && "✅"}
              {toast.type === "danger" && "❌"}
              {toast.type === "warning" && "⚠️"}
              {toast.type === "info" && "ℹ️"}
            </span>
            <div className="flex-grow-1">
              {toast.message}
              {/* Progress bar */}
              <div
                className="progress mt-2"
                style={{
                  height: "3px",
                  backgroundColor: "rgba(255,255,255,0.3)",
                }}
              >
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${toast.progress}%`,
                    backgroundColor: "rgba(255,255,255,0.8)",
                    transition: "width 0.05s linear",
                  }}
                />
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={() => onClose(toast.id)}
            style={{ fontSize: "12px" }}
          />
        </div>
      ))}
    </div>
  );
};

export default function RoomPricing() {
  const [homestays, setHomestays] = useState([]);
  const [selectedHomestay, setSelectedHomestay] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [seasonalPrices, setSeasonalPrices] = useState([]);
  const [allSeasons, setAllSeasons] = useState([]);
  const navigate = useNavigate();
  const [hostId, setHostId] = useState(() => localStorage.getItem("hostId"));

  // Toast states
  const [toasts, setToasts] = useState([]);

  // Add debounce function to prevent rapid duplicate calls
  const [lastToastMessage, setLastToastMessage] = useState("");
  const [lastToastTime, setLastToastTime] = useState(0);

  const showToastDebounced = (message, type = "success", duration = 4000) => {
    const now = Date.now();
    // Prevent same message within 1 second
    if (message === lastToastMessage && now - lastToastTime < 1000) {
      return;
    }

    setLastToastMessage(message);
    setLastToastTime(now);
    showToast(message, type, duration);
  };
  const showToast = (message, type = "success", duration = 4000) => {
    // Create unique ID using timestamp + random number to avoid duplicates
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast = {
      id,
      message,
      type, // 'success', 'danger', 'warning', 'info'
      progress: 0,
      startTime: Date.now(),
      duration,
    };

    // Prevent duplicate messages - check if same message already exists
    setToasts((prev) => {
      const existingToast = prev.find(
        (toast) => toast.message === message && toast.type === type
      );
      if (existingToast) {
        return prev; // Don't add duplicate
      }
      return [...prev, newToast];
    });

    // Update progress bar - use the unique ID
    const progressInterval = setInterval(() => {
      setToasts((prev) =>
        prev.map((toast) => {
          if (toast.id === id) {
            const elapsed = Date.now() - toast.startTime;
            const progress = Math.min((elapsed / duration) * 100, 100);
            return { ...toast, progress };
          }
          return toast;
        })
      );
    }, 50);

    // Auto hide after duration - use the unique ID
    setTimeout(() => {
      clearInterval(progressInterval);
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  };

  const hideToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
      return;
    }
    // Nếu chưa có hostId => gọi /me
    if (!hostId) {
      axios
        .get("http://localhost:8080/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const user = res.data;
          if (user.role !== "HOST") {
            navigate("/", { replace: true });
            return;
          }
          localStorage.setItem("hostId", user.id);
          setHostId(user.id);
          // Remove duplicate toast here since it shows on every auth check
        })
        .catch(() => {
          showToast("Authentication failed!", "danger");
          navigate("/", { replace: true });
        });
    }
  }, [navigate, hostId]);

  const [pricingList, setPricingList] = useState([]);
  const [newPricing, setNewPricing] = useState({
    startDate: "",
    endDate: "",
    price: "",
    label: "",
  });

  const [checkIn, setCheckIn] = useState(new Date().toISOString().slice(0, 10));
  const [checkOut, setCheckOut] = useState(
    new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10)
  );

  // Add loading states to prevent duplicate toasts
  const [loadingStates, setLoadingStates] = useState({
    homestays: false,
    roomTypes: false,
    allSeasons: false,
  });

  useEffect(() => {
    if (!hostId) return;

    // Load homestays - only if not already loading/loaded
    if (!loadingStates.homestays && homestays.length === 0) {
      setLoadingStates((prev) => ({ ...prev, homestays: true }));
      axios
        .get(`http://localhost:8080/api/homestays/by-host/${hostId}`)
        .then((res) => {
          setHomestays(res.data);
          if (res.data.length > 0) {
            showToastDebounced("Homestays loaded successfully!", "info");
          }
        })
        .catch((err) => {
          console.error("Lỗi homestays:", err);
          showToastDebounced("Failed to load homestays!", "danger");
        })
        .finally(() => {
          setLoadingStates((prev) => ({ ...prev, homestays: false }));
        });
    }

    // Load room types - only if not already loading/loaded
    if (!loadingStates.roomTypes && roomTypes.length === 0) {
      setLoadingStates((prev) => ({ ...prev, roomTypes: true }));
      axios
        .get(
          `http://localhost:8080/api/seasonal-pricing/room-types?hostId=${hostId}`
        )
        .then((res) => {
          setRoomTypes(res.data);
          if (res.data.length > 0) {
            showToastDebounced("Room types loaded successfully!", "info");
          }
        })
        .catch((err) => {
          console.error("Lỗi room types:", err);
          showToastDebounced("Failed to load room types!", "danger");
        })
        .finally(() => {
          setLoadingStates((prev) => ({ ...prev, roomTypes: false }));
        });
    }

    // Load all seasons - only if not already loading/loaded
    if (!loadingStates.allSeasons && allSeasons.length === 0) {
      setLoadingStates((prev) => ({ ...prev, allSeasons: true }));
      axios
        .get(`http://localhost:8080/api/seasonal-pricing/all`, {
          params: { hostId },
        })
        .then((res) => {
          setAllSeasons(res.data);
          if (res.data.length > 0) {
            showToastDebounced("Seasonal pricing loaded successfully!", "info");
          }
        })
        .catch((err) => {
          console.error("Lỗi allSeasons:", err);
          showToastDebounced("Failed to load seasonal pricing!", "danger");
        })
        .finally(() => {
          setLoadingStates((prev) => ({ ...prev, allSeasons: false }));
        });
    }
  }, [
    hostId,
    homestays.length,
    roomTypes.length,
    allSeasons.length,
    loadingStates,
  ]);

  useEffect(() => {
    if (selectedHomestay && selectedRoomType && checkIn && checkOut) {
      axios
        .get(`http://localhost:8080/api/seasonal-pricing/room-price`, {
          params: {
            homestayId: selectedHomestay,
            roomType: selectedRoomType,
            checkIn,
            checkOut,
          },
        })
        .then((res) => {
          setSeasonalPrices(res.data);
          // Only show toast if there are results, don't spam on every change
          if (res.data.length > 0) {
            showToast(
              `Found ${res.data.length} seasonal prices!`,
              "info",
              2000
            );
          }
        })
        .catch((err) => {
          console.error("Lỗi seasonal-pricing:", err);
          showToast("Failed to load seasonal prices!", "danger");
        });
    } else {
      // Clear seasonal prices when inputs are incomplete
      setSeasonalPrices([]);
    }
  }, [selectedHomestay, selectedRoomType, checkIn, checkOut]);

  const handleAdd = () => {
    if (
      !newPricing.startDate ||
      !newPricing.endDate ||
      !newPricing.price ||
      parseFloat(newPricing.price) < 1
    ) {
      showToast(
        "Vui lòng nhập đầy đủ và hợp lệ. Hệ số tăng phải >= 1.",
        "warning"
      );
      return;
    }
    setPricingList((prev) => [...prev, { ...newPricing, id: Date.now() }]);
    setNewPricing({ startDate: "", endDate: "", price: "", label: "" });
    showToast("Pricing added to list!", "success");
  };

  const handleDelete = (id) => {
    setPricingList((prev) => prev.filter((item) => item.id !== id));
    showToast("Pricing removed from list!", "info");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPricing((prev) => ({ ...prev, [name]: value }));
  };

  const handleViewSeasonalPrices = () => {
    if (!selectedHomestay || !selectedRoomType) {
      showToast(
        "Vui lòng chọn đầy đủ Homestay và loại phòng trước khi xem giá.",
        "warning"
      );
      return;
    }

    axios
      .get(`http://localhost:8080/api/seasonal-pricing/room-price`, {
        params: {
          homestayId: selectedHomestay,
          roomType: selectedRoomType,
          checkIn,
          checkOut,
        },
      })
      .then((res) => {
        setSeasonalPrices(res.data);
        if (res.data.length > 0) {
          showToast(`Found ${res.data.length} seasonal prices!`, "success");
        } else {
          showToast("No seasonal prices found for this period.", "info");
        }
      })
      .catch((err) => {
        console.error(err);
        showToast("Failed to load seasonal prices!", "danger");
      });
  };

  const handleSavePricing = async () => {
    if (!selectedHomestay || !selectedRoomType) {
      showToast(
        "Vui lòng chọn Homestay và loại phòng trước khi lưu.",
        "warning"
      );
      return;
    }

    if (pricingList.length === 0) {
      showToast("Không có dữ liệu để lưu!", "warning");
      return;
    }

    showToast("Saving pricing data...", "info", 10000);

    let successCount = 0;
    let errorCount = 0;

    for (const item of pricingList) {
      const dto = {
        homestayId: parseInt(selectedHomestay),
        roomType: selectedRoomType,
        season: item.label || "Mùa đặc biệt",
        increaseRate: parseFloat(item.price),
        startDate: item.startDate,
        endDate: item.endDate,
      };

      try {
        const res = await axios.post(
          "http://localhost:8080/api/seasonal-pricing",
          dto
        );
        console.log("Đã lưu:", res.data);
        successCount++;
      } catch (err) {
        console.error("Lỗi khi lưu:", err.response?.data || err.message);
        errorCount++;
      }
    }

    if (errorCount === 0) {
      showToast(`✅ Đã lưu thành công ${successCount} bảng giá!`, "success");
    } else if (successCount > 0) {
      showToast(
        `⚠️ Lưu thành công ${successCount}, thất bại ${errorCount} bảng giá!`,
        "warning"
      );
    } else {
      showToast(`❌ Không thể lưu bảng giá!`, "danger");
    }

    setPricingList([]);

    // Reload all seasons
    try {
      const res = await axios.get(
        `http://localhost:8080/api/seasonal-pricing/all`,
        {
          params: { hostId },
        }
      );
      setAllSeasons(res.data);
      showToast("Danh sách giá theo mùa đã được cập nhật!", "info");
    } catch (err) {
      console.error("Lỗi cập nhật allSeasons:", err);
      showToast("Không thể cập nhật danh sách!", "danger");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">🛏️ Cài đặt giá phòng theo mùa</h3>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Chọn Homestay</label>
          <select
            className="form-select"
            value={selectedHomestay}
            onChange={(e) => setSelectedHomestay(e.target.value)}
          >
            <option value="">-- Chọn --</option>
            {homestays.map((h) => (
              <option key={h.id} value={h.id}>
                {h.homestayName}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Loại phòng</label>
          <select
            className="form-select"
            value={selectedRoomType}
            onChange={(e) => setSelectedRoomType(e.target.value)}
          >
            <option value="">-- Chọn --</option>
            {roomTypes.map((r, idx) => (
              <option key={idx} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row align-items-end mb-4">
        <div className="col-md-4">
          <label className="form-label">Check-in</label>
          <input
            type="date"
            className="form-control"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            max={checkOut || ""}
            min={new Date().toISOString().slice(0, 10)} // thêm dòng này
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Check-out</label>
          <input
            type="date"
            className="form-control"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn || new Date().toISOString().slice(0, 10)} // thêm min
          />
        </div>
        <div className="col-md-4">
          <button
            className="btn btn-outline-primary w-100"
            onClick={handleViewSeasonalPrices}
          >
            Xem giá theo mùa
          </button>
        </div>
      </div>

      {seasonalPrices.length > 0 && (
        <div className="mb-4">
          <h5>Kết quả giá theo mùa:</h5>
          {seasonalPrices.map((item, i) => (
            <div key={i} className="alert alert-info">
              <strong>{item.roomNumber}</strong> | Giá gốc:{" "}
              {item.basePrice.toLocaleString()} ₫ →{" "}
              <strong>{item.finalPrice.toLocaleString()} ₫</strong> | Mùa:{" "}
              <em>{item.seasonApplied}</em> (x{item.increaseRate})
            </div>
          ))}
        </div>
      )}

      <h5 className="mt-4">🔧 Bảng giá tùy chỉnh</h5>
      <div className="row mb-3">
        <div className="col-md-3">
          <input
            type="date"
            name="startDate"
            className="form-control"
            value={newPricing.startDate}
            onChange={handleChange}
            max={newPricing.endDate || ""}
            min={new Date().toISOString().slice(0, 10)} // thêm min
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            name="endDate"
            className="form-control"
            value={newPricing.endDate}
            onChange={handleChange}
            min={newPricing.startDate || new Date().toISOString().slice(0, 10)} // thêm min
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            step="0.1"
            name="price"
            className="form-control"
            placeholder="Hệ số tăng (vd: 1.2)"
            value={newPricing.price}
            onChange={handleChange}
            min="1"
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="label"
            className="form-control"
            placeholder="Tên mùa (vd: Mùa du lịch hoặc Ngày Lễ)"
            value={newPricing.label}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-1">
          <button className="btn btn-success w-100" onClick={handleAdd}>
            +
          </button>
        </div>
      </div>

      {pricingList.map((item, i) => (
        <div
          key={item.id}
          className="alert alert-secondary d-flex justify-content-between align-items-center"
        >
          {item.startDate} → {item.endDate} |{" "}
          <strong>x{parseFloat(item.price)}</strong> | {item.label}
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(item.id)}
          >
            X
          </button>
        </div>
      ))}

      <div className="mt-3">
        <button className="btn btn-primary" onClick={handleSavePricing}>
          💾 Lưu bảng giá
        </button>
      </div>

      <h5 className="mt-5">📋 Danh sách toàn bộ giá theo mùa</h5>
      {allSeasons.map((s, i) => (
        <div key={i} className="alert alert-light border">
          <strong>Homestay:</strong> {s.homestayName} | <strong>Phòng:</strong>{" "}
          {s.roomName}
          <br />
          <strong>Mùa:</strong> {s.seasonName} | <strong>Hệ số:</strong> x
          {s.price}
          <br />
          <strong>Thời gian:</strong> {s.startDate} → {s.endDate}
          <br />
          <strong>Giá gốc:</strong> {Number(s.basePrice).toLocaleString()} ₫ →{" "}
          <strong>Giá sau khi tăng:</strong>{" "}
          {Number(s.finalPrice).toLocaleString()} ₫
        </div>
      ))}

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={hideToast} />
    </div>
  );
}

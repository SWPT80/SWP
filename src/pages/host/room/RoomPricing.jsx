import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function RoomPricing() {
  const [homestays, setHomestays] = useState([]);
  const [selectedHomestay, setSelectedHomestay] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [seasonalPrices, setSeasonalPrices] = useState([]);
  const [allSeasons, setAllSeasons] = useState([]);
   const navigate = useNavigate();
  const [hostId, setHostId] = useState(() => localStorage.getItem("hostId"));

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

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/homestays/by-host/${hostId}`)
      .then((res) => setHomestays(res.data))
      .catch((err) => console.error("Lỗi homestays:", err));

    axios
      .get(`http://localhost:8080/api/seasonal-pricing/room-types?hostId=${hostId}`)
      .then((res) => setRoomTypes(res.data))
      .catch((err) => console.error("Lỗi room types:", err));

    axios
      .get(`http://localhost:8080/api/seasonal-pricing/all`, {
        params: { hostId },
      })
      .then((res) => setAllSeasons(res.data))
      .catch((err) => console.error("Lỗi allSeasons:", err));
  }, [hostId]);

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
        .then((res) => setSeasonalPrices(res.data))
        .catch((err) => console.error("Lỗi seasonal-pricing:", err));
    }
  }, [selectedHomestay, selectedRoomType, checkIn, checkOut]);

  const handleAdd = () => {
    if (
      !newPricing.startDate ||
      !newPricing.endDate ||
      !newPricing.price ||
      parseFloat(newPricing.price) < 1
    ) {
      alert("Vui lòng nhập đầy đủ và hợp lệ. Hệ số tăng phải >= 1.");
      return;
    }
    setPricingList((prev) => [...prev, { ...newPricing, id: Date.now() }]);
    setNewPricing({ startDate: "", endDate: "", price: "", label: "" });
  };

  const handleDelete = (id) => {
    setPricingList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPricing((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-4">
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
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Check-out</label>
          <input
            type="date"
            className="form-control"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn || ""}
          />
        </div>
        <div className="col-md-4">
          <button
            className="btn btn-outline-primary w-100"
            onClick={() => {
              if (!selectedHomestay || !selectedRoomType) {
                alert("Vui lòng chọn đầy đủ Homestay và loại phòng trước khi xem giá.");
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
                .then((res) => setSeasonalPrices(res.data))
                .catch((err) => console.error(err));
            }}
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
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            name="endDate"
            className="form-control"
            value={newPricing.endDate}
            onChange={handleChange}
            min={newPricing.startDate || ""}
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
        <button
          className="btn btn-primary"
          onClick={async () => {
            if (!selectedHomestay || !selectedRoomType) {
              alert("Vui lòng chọn Homestay và loại phòng trước khi lưu.");
              return;
            }

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
                const res = await axios.post("http://localhost:8080/api/seasonal-pricing", dto);
                console.log("Đã lưu:", res.data);
              } catch (err) {
                console.error("Lỗi khi lưu:", err.response?.data || err.message);
              }
            }

            alert("Đã lưu toàn bộ bảng giá!");
            setPricingList([]);

            // 🔁 GỌI LẠI API LẤY DANH SÁCH
            await axios
              .get(`http://localhost:8080/api/seasonal-pricing/all`, {
                params: { hostId },
              })
              .then((res) => setAllSeasons(res.data))
              .catch((err) => console.error("Lỗi cập nhật allSeasons:", err));
          }}
        >
          💾 Lưu bảng giá
        </button>

      </div>

      <h5 className="mt-5">📋 Danh sách toàn bộ giá theo mùa</h5>
      {allSeasons.map((s, i) => (
        <div key={i} className="alert alert-light border">
          <strong>Homestay:</strong> {s.homestayName} |{" "}
          <strong>Phòng:</strong> {s.roomName}
          <br />
          <strong>Mùa:</strong> {s.seasonName} |{" "}
          <strong>Hệ số:</strong> x{s.price}
          <br />
          <strong>Thời gian:</strong> {s.startDate} → {s.endDate}
          <br />
          <strong>Giá gốc:</strong> {Number(s.basePrice).toLocaleString()} ₫ →{" "}
          <strong>Giá sau khi tăng:</strong> {Number(s.finalPrice).toLocaleString()} ₫
        </div>

      ))}

    </div>
  );
}

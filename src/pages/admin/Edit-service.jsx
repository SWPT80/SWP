import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditService = () => {
  const { id } = useParams(); // 👈 Lấy ID từ URL
  const navigate = useNavigate();

  const [service, setService] = useState({
    id: "",
    homestayId: "",
    serviceType: { id: "", serviceName: "" },
    price: "",
    specialNotes: "",
    status: true,
  });

  const [imageFile, setImageFile] = useState(null);

  // 👇 Fetch service từ API
  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://localhost:8080/api/services/${id}`)
      .then((res) => setService(res.data))
      .catch((err) => {
        console.error("Lỗi lấy service:", err);
        alert("Không thể tải dữ liệu dịch vụ");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const body = {
      ...service,
      typeId: service.serviceType?.id,
    };
    axios
      .put(`http://localhost:8080/api/services/${id}`, body)
      .then(() => {
        alert("Cập nhật thành công");
        navigate("/allServices");
      })
      .catch((err) => {
        console.error("Lỗi khi cập nhật service:", err);
        alert("Cập nhật thất bại");
      });
  };

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title mt-5">Edit Service</h3>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <form>
                <div className="row formtype">

                  {/* Service ID */}
                  <div className="col-md-4">
                    <label>Service ID</label>
                    <input className="form-control" value={service.id} disabled />
                  </div>

                  {/* Homestay ID */}
                  <div className="col-md-4">
                    <label>Homestay ID</label>
                    <input className="form-control" value={service.homestayId} disabled />
                  </div>

                  {/* Homestay Name (optional) */}
                  <div className="col-md-4">
                    <label>Homestay Name</label>
                    <input className="form-control" value={service.homestayName || "N/A"} disabled />
                  </div>

                  {/* Service Name */}
                  <div className="col-md-4">
                    <label>Service Name</label>
                    <input className="form-control" value={service.serviceType?.serviceName || ""} disabled />
                  </div>

                  {/* Option */}
                  <div className="col-md-4">
                    <label>Option / Notes</label>
                    <input
                      className="form-control"
                      name="specialNotes"
                      value={service.specialNotes || ""}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Price */}
                  <div className="col-md-4">
                    <label>Price</label>
                    <input
                      className="form-control"
                      name="price"
                      type="number"
                      value={service.price}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Type (readonly) */}
                  <div className="col-md-4">
                    <label>Type Service</label>
                    <input
                      className="form-control"
                      value={service.serviceType?.serviceName || ""}
                      disabled
                    />
                  </div>

                  {/* File Upload (chưa xử lý lưu ảnh) */}
                  <div className="col-md-4">
                    <label>File Image Upload</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                  </div>
                </div>
              </form>
              <button
                type="button"
                className="btn btn-primary buttonedit ml-2"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditService;

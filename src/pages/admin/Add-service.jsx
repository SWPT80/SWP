import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddService = () => {
  const navigate = useNavigate();

  const [service, setService] = useState({
    homestayId: "",
    typeId: "",
    serviceName: "",
    specialNotes: "",
    price: "",
    status: true
  });

  const [imageFile, setImageFile] = useState(null);
  const [serviceTypes, setServiceTypes] = useState([]);

  useEffect(() => {
    // Lấy danh sách loại dịch vụ
    axios
      .get("http://localhost:8080/api/service-types")
      .then((res) => setServiceTypes(res.data))
      .catch((err) => console.error("Lỗi khi load service types:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    const payload = {
      homestayId: parseInt(service.homestayId),
      typeId: parseInt(service.typeId),
      price: parseFloat(service.price),
      specialNotes: service.specialNotes,
      status: true,
      images: imageFile
        ? [{ imageUrl: "/uploads/" + imageFile.name, status: true }] // chỉ demo
        : [],
    };

    axios
      .post("http://localhost:8080/api/services", payload)
      .then(() => {
        alert("Thêm dịch vụ thành công");
        navigate("/allServices");
      })
      .catch((err) => {
        console.error("Lỗi khi thêm dịch vụ:", err);
        alert("Thêm thất bại");
      });
  };

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title mt-5">Add Service</h3>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <form>
                <div className="row formtype">
                  <div className="col-md-4">
                    <label>Homestay ID</label>
                    <input
                      className="form-control"
                      type="number"
                      name="homestayId"
                      value={service.homestayId}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4">
                    <label>Service Type</label>
                    <select
                      className="form-control"
                      name="typeId"
                      value={service.typeId}
                      onChange={handleChange}
                    >
                      <option value="">Chọn loại dịch vụ</option>
                      {serviceTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.serviceName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label>Service Name</label>
                    <input
                      className="form-control"
                      type="text"
                      value={service.serviceName}
                      disabled
                      placeholder="Sẽ được xác định từ loại dịch vụ"
                    />
                  </div>

                  <div className="col-md-4">
                    <label>Option</label>
                    <input
                      className="form-control"
                      name="specialNotes"
                      value={service.specialNotes}
                      onChange={handleChange}
                    />
                  </div>

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

                  <div className="col-md-4">
                    <label>Image Upload</label>
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
                onClick={handleAdd}
              >
                Add Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;

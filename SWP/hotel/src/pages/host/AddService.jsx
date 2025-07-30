import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosConfig'; // axios config sẵn
import { useNavigate } from 'react-router-dom';

const AddService = () => {
    const navigate = useNavigate();

    const [service, setService] = useState({
        homestayId: '',
        typeId: '',
        serviceName: '',
        specialNotes: '',
        price: '',
        status: true
    });

    const [imageFile, setImageFile] = useState(null);
    const [serviceTypes, setServiceTypes] = useState([]);
    const [homestays, setHomestays] = useState([]);

    useEffect(() => {
        const hostId = localStorage.getItem('hostId');
        console.log('Host ID from localStorage:', hostId);

        if (!hostId) {
            alert('Không tìm thấy Host ID. Vui lòng đăng nhập lại.');
            return;
        }

        // Load service types
        axios
            .get('/api/service-types')
            .then((res) => {
                console.log('Service types loaded:', res.data);
                setServiceTypes(res.data);
            })
            .catch((err) => {
                console.error('Lỗi khi load service types:', err);
                alert('Không thể tải danh sách loại dịch vụ.');
            });

        // Load homestays của host
        axios
            .get(`/api/homestays/by-host/${hostId}`)
            .then((res) => {
                console.log('Homestays loaded:', res.data);
                setHomestays(res.data);

                if (res.data.length === 0) {
                    alert('Bạn chưa có homestay nào. Vui lòng tạo homestay trước.');
                }
            })
            .catch((err) => {
                console.error('Lỗi khi load homestays:', err);
                alert('Không thể tải danh sách homestay.');
            });
    }, []);

    // Cập nhật form
    const handleChange = (e) => {
        const { name, value } = e.target;

        console.log(`handleChange: ${name} = ${value} (type: ${typeof value})`);

        setService((prev) => {
            const updatedService = {
                ...prev,
                [name]: value,
            };

            // Xử lý đặc biệt cho typeId để cập nhật serviceName
            if (name === 'typeId' && value) {
                const typeIdInt = parseInt(value, 10);
                console.log(`Looking for service type with ID: ${typeIdInt}`);

                const selectedType = serviceTypes.find((t) => t.id === typeIdInt);
                if (selectedType) {
                    updatedService.serviceName = selectedType.serviceName;
                    console.log(`Set serviceName to: ${selectedType.serviceName}`);
                } else {
                    console.warn(`Service type not found for ID: ${typeIdInt}`);
                    updatedService.serviceName = '';
                }
            }

            console.log('Updated service state:', updatedService);
            return updatedService;
        });
    };

    const handleAdd = () => {
        // Validate form data trước khi parse
        if (!service.homestayId || !service.typeId || !service.price) {
            alert("Vui lòng điền đầy đủ thông tin bắt buộc.");
            return;
        }

        console.log("=== FORM SUBMISSION DEBUG ===");
        console.log("Raw form values:", {
            homestayId: service.homestayId,
            typeId: service.typeId,
            price: service.price
        });

        console.log("Data types:", {
            homestayIdType: typeof service.homestayId,
            typeIdType: typeof service.typeId,
            priceType: typeof service.price
        });

        // Parse với validation tốt hơn
        const homestayId = parseInt(service.homestayId, 10);
        const typeId = parseInt(service.typeId, 10);
        const price = parseFloat(service.price);

        console.log("Parsed values:", {
            homestayId,
            typeId,
            price
        });

        // Kiểm tra parse có thành công không
        if (isNaN(homestayId) || homestayId <= 0) {
            console.error("Homestay ID parse failed:", {
                original: service.homestayId,
                parsed: homestayId,
                isString: typeof service.homestayId === 'string',
                isNumber: !isNaN(Number(service.homestayId))
            });
            alert(`Homestay ID không hợp lệ: "${service.homestayId}" (type: ${typeof service.homestayId})`);
            return;
        }

        if (isNaN(typeId) || typeId <= 0) {
            alert("Service Type ID không hợp lệ: " + service.typeId);
            return;
        }

        if (isNaN(price) || price <= 0) {
            alert("Giá không hợp lệ: " + service.price);
            return;
        }

        const payload = {
            homestayId: homestayId,
            typeId: typeId,
            price: price,
            specialNotes: service.specialNotes || "",
            status: 'pending',
            images: imageFile
                ? [{ imageUrl: '/uploads/' + imageFile.name, status: true }]
                : [],
        };

        console.log("Final payload:", payload);

        axios
            .post('/api/services', payload)
            .then((response) => {
                console.log("Success response:", response.data);
                alert('Thêm dịch vụ thành công, chờ admin duyệt');
                navigate('/host/services');
            })
            .catch((err) => {
                console.error('Full error object:', err);
                console.error('Error response:', err.response);

                let errorMessage = 'Thêm thất bại';
                if (err.response?.data) {
                    if (typeof err.response.data === 'string') {
                        errorMessage += ': ' + err.response.data;
                    } else if (err.response.data.message) {
                        errorMessage += ': ' + err.response.data.message;
                    } else {
                        errorMessage += ': ' + JSON.stringify(err.response.data);
                    }
                } else if (err.message) {
                    errorMessage += ': ' + err.message;
                }

                alert(errorMessage);
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
                            <div className="card">
                                <div className="card-body">
                                    <form>
                                        {/* Hàng 1: Homestay và Service Type */}
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Homestay <span className="text-danger">*</span></label>
                                                    <select
                                                        className="form-control"
                                                        name="homestayId"
                                                        value={service.homestayId}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="">-- Chọn Homestay --</option>
                                                        {homestays.map((h) => {
                                                            // Debug log để xem cấu trúc dữ liệu
                                                            console.log('Homestay option:', h);

                                                            // Thử các trường có thể là ID
                                                            const homestayId = h.homestayId || h.id || h.homestay_id;
                                                            const homestayName = h.homestayName || h.name || h.homestay_name;

                                                            return (
                                                                <option key={homestayId} value={homestayId}>
                                                                    {homestayName} (ID: {homestayId})
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                    {/* Debug info hiển thị trong UI */}
                                                    {homestays.length > 0 && (
                                                        <small className="text-muted">
                                                            Debug: {homestays.length} homestays loaded.
                                                            First homestay ID: {homestays[0].homestayId || homestays[0].id || 'undefined'}
                                                        </small>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Service Type <span className="text-danger">*</span></label>
                                                    <select
                                                        className="form-control"
                                                        name="typeId"
                                                        value={service.typeId}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="">-- Chọn loại dịch vụ --</option>
                                                        {serviceTypes.map((type) => (
                                                            <option key={type.id} value={type.id}>
                                                                {type.serviceName}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hàng 2: Service Name và Price */}
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Service Name</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={service.serviceName}
                                                        disabled
                                                        placeholder="Tự động theo loại dịch vụ"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Giá (VND) <span className="text-danger">*</span></label>
                                                    <input
                                                        className="form-control"
                                                        name="price"
                                                        type="number"
                                                        min="0"
                                                        step="1000"
                                                        value={service.price}
                                                        onChange={handleChange}
                                                        placeholder="Nhập giá dịch vụ"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hàng 3: Special Notes */}
                                        <div className="row mb-3">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label className="form-label">Ghi chú</label>
                                                    <textarea
                                                        className="form-control"
                                                        name="specialNotes"
                                                        value={service.specialNotes}
                                                        onChange={handleChange}
                                                        rows="3"
                                                        placeholder="Nhập ghi chú đặc biệt cho dịch vụ..."
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hàng 4: Upload Image */}
                                        <div className="row mb-4">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Upload Ảnh (tùy chọn)</label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        accept="image/*"
                                                        onChange={(e) => setImageFile(e.target.files[0])}
                                                    />
                                                    <small className="text-muted">Chỉ chấp nhận file ảnh (.jpg, .png, .gif)</small>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="d-flex justify-content-end">
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary me-2"
                                                        onClick={() => navigate('/host/services')}
                                                    >
                                                        Hủy
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        onClick={handleAdd}
                                                    >
                                                        <i className="fas fa-plus me-2"></i>
                                                        Add Service
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddService;
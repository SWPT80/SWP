import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddService = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
        console.log('Host ID từ localStorage:', hostId);

        if (!hostId) {
            setError('Không tìm thấy Host ID. Vui lòng đăng nhập lại.');
            return;
        }

        axios
            .get('/api/service-types')
            .then((res) => {
                console.log('Loại dịch vụ đã tải:', res.data);
                setServiceTypes(res.data);
                setError('');
            })
            .catch((err) => {
                console.error('Lỗi khi tải danh sách loại dịch vụ:', err);
                setError('Không thể tải danh sách loại dịch vụ.');
            });

        axios
            .get(`/api/homestays/by-host/${hostId}`)
            .then((res) => {
                console.log('Homestay đã tải:', res.data);
                setHomestays(res.data);
                setError('');
                if (res.data.length === 0) {
                    setError('Bạn chưa có homestay nào. Vui lòng tạo homestay trước.');
                }
            })
            .catch((err) => {
                console.error('Lỗi khi tải danh sách homestay:', err);
                setError('Không thể tải danh sách homestay.');
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        console.log(`handleChange: ${name} = ${value} (type: ${typeof value})`);

        setService((prev) => {
            const updatedService = {
                ...prev,
                [name]: value,
            };

            if (name === 'typeId' && value) {
                const typeIdInt = parseInt(value, 10);
                console.log(`Tìm loại dịch vụ với ID: ${typeIdInt}`);

                const selectedType = serviceTypes.find((t) => t.id === typeIdInt);
                if (selectedType) {
                    updatedService.serviceName = selectedType.serviceName;
                    console.log(`Đặt serviceName thành: ${selectedType.serviceName}`);
                } else {
                    console.warn(`Không tìm thấy loại dịch vụ với ID: ${typeIdInt}`);
                    updatedService.serviceName = '';
                }
            }

            console.log('Trạng thái dịch vụ đã cập nhật:', updatedService);
            return updatedService;
        });
    };

    const handleAdd = () => {
        if (!service.homestayId || !service.typeId || !service.price) {
            setError("Vui lòng điền đầy đủ thông tin bắt buộc.");
            setSuccess('');
            return;
        }

        console.log("=== GỬI FORM ===");
        console.log("Giá trị form:", {
            homestayId: service.homestayId,
            typeId: service.typeId,
            price: service.price
        });

        console.log("Kiểu dữ liệu:", {
            homestayIdType: typeof service.homestayId,
            typeIdType: typeof service.typeId,
            priceType: typeof service.price
        });

        const homestayId = parseInt(service.homestayId, 10);
        const typeId = parseInt(service.typeId, 10);
        const price = parseFloat(service.price);

        console.log("Giá trị sau khi parse:", {
            homestayId,
            typeId,
            price
        });

        if (isNaN(homestayId) || homestayId <= 0) {
            console.error("Lỗi parse Homestay ID:", {
                original: service.homestayId,
                parsed: homestayId,
                isString: typeof service.homestayId === 'string',
                isNumber: !isNaN(Number(service.homestayId))
            });
            setError(`Homestay ID không hợp lệ: "${service.homestayId}"`);
            setSuccess('');
            return;
        }

        if (isNaN(typeId) || typeId <= 0) {
            setError("ID loại dịch vụ không hợp lệ: " + service.typeId);
            setSuccess('');
            return;
        }

        if (isNaN(price) || price <= 0) {
            setError("Giá không hợp lệ: " + service.price);
            setSuccess('');
            return;
        }

        const payload = {
            homestayId: homestayId,
            typeId: typeId,
            price: price,
            specialNotes: service.specialNotes || "",
            status: 'pending',
            images: imageFile
                ? [{ imageUrl: '/Uploads/' + imageFile.name, status: true }]
                : [],
        };

        console.log("Payload cuối cùng:", payload);

        axios
            .post('/api/services', payload)
            .then((response) => {
                console.log("Phản hồi thành công:", response.data);
                setSuccess('Thêm dịch vụ thành công, chờ admin duyệt.');
                setError('');
                navigate('/host/services');
            })
            .catch((err) => {
                console.error('Đối tượng lỗi:', err);
                console.error('Phản hồi lỗi:', err.response);

                let errorMessage = 'Thêm dịch vụ thất bại';
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

                setError(errorMessage);
                setSuccess('');
            });
    };

    return (
        <div className="main-wrapper">
            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="page-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title mt-5">Thêm dịch vụ</h3>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <Alert variant="danger" onClose={() => setError('')} dismissible>
                            {error}
                        </Alert>
                    )}
                    {success && (
                        <Alert variant="success" onClose={() => setSuccess('')} dismissible>
                            {success}
                        </Alert>
                    )}

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <form>
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
                                                            console.log('Tùy chọn homestay:', h);
                                                            const homestayId = h.homestayId || h.id || h.homestay_id;
                                                            const homestayName = h.homestayName || h.name || h.homestay_name;
                                                            return (
                                                                <option key={homestayId} value={homestayId}>
                                                                    {homestayName} (ID: {homestayId})
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                    {homestays.length > 0 && (
                                                        <small className="text-muted">
                                                            Debug: Đã tải {homestays.length} homestay.
                                                            ID homestay đầu tiên: {homestays[0]?.homestayId || homestays[0]?.id || 'không xác định'}
                                                        </small>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Loại dịch vụ <span className="text-danger">*</span></label>
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

                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Tên dịch vụ</label>
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
                                                    <label className="form-label">Giá (đ) <span className="text-danger">*</span></label>
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

                                        <div className="row mb-4">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Tải ảnh lên (tùy chọn)</label>
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
                                                        Thêm dịch vụ
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
import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../utils/axiosConfig';

const EditService = () => {
    const [formData, setFormData] = useState({
        typeId: '',
        price: '',
        specialNotes: '',
    });
    const [serviceTypes, setServiceTypes] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get('/api/service-types')
            .then((res) => setServiceTypes(res.data))
            .catch(() => setError('Lỗi khi tải loại dịch vụ.'));

        axios.get(`/api/services/${id}`)
            .then((res) => {
                const data = res.data;
                setFormData({
                    typeId: data.typeId,
                    price: data.price,
                    specialNotes: data.specialNotes || '',
                });
            })
            .catch(() => setError('Không tìm thấy dịch vụ.'));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/services/${id}`, {
                ...formData,
                status: 'pending',
                homestayId: localStorage.getItem('hostId')
            });
            setSuccess('Cập nhật thành công, chờ admin duyệt lại.');
            setError('');
            setTimeout(() => navigate('/host/services'), 1500);
        } catch {
            setError('Cập nhật thất bại.');
            setSuccess('');
        }
    };

    return (
        <Container className="my-4">
            <Card className="p-4">
                <h4>Chỉnh sửa Dịch Vụ</h4>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Loại dịch vụ</Form.Label>
                        <Form.Select name="typeId" value={formData.typeId} onChange={handleChange} required>
                            <option value="">-- Chọn loại dịch vụ --</option>
                            {serviceTypes.map((type) => (
                                <option key={type.id} value={type.id}>{type.serviceName}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Giá (VND)</Form.Label>
                        <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Ghi chú</Form.Label>
                        <Form.Control as="textarea" rows={3} name="specialNotes" value={formData.specialNotes} onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Cập nhật</Button>
                </Form>
            </Card>
        </Container>
    );
};

export default EditService;

import React, { useEffect, useState } from "react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import axios from "../../utils/axiosConfig";
import { useAuth } from "../../context/AuthContext";

export default function HostAccountSettings() {
    const { user, checkAuth } = useAuth();
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        if (user) {
            setFullName(user.fullName || user.name || "");
            setPhone(user.phone || "");
            setAvatarUrl(user.avatarUrl || "");
        }
    }, [user]);

    const handleUpdateInfo = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({});

        try {
            await axios.put("/api/hosts/account/update", {
                fullName,
                phone,
                avatarUrl,
            });
            setMessage({ type: "success", text: "Cập nhật thông tin thành công." });
            checkAuth();
        } catch (err) {
            setMessage({ type: "danger", text: "Cập nhật thất bại." });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({});

        try {
            await axios.put("/api/hosts/account/change-password", {
                currentPassword,
                newPassword,
            });
            setMessage({ type: "success", text: "Đổi mật khẩu thành công." });
            setCurrentPassword("");
            setNewPassword("");
        } catch (err) {
            setMessage({ type: "danger", text: "Đổi mật khẩu thất bại." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: 700 }}>
            <h2 className="mb-4">Cài đặt tài khoản</h2>

            {message.text && (
                <Alert variant={message.type} onClose={() => setMessage({})} dismissible>
                    {message.text}
                </Alert>
            )}

            <Card className="mb-4">
                <Card.Header>Thông tin cá nhân</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleUpdateInfo}>
                        <Form.Group className="mb-3">
                            <Form.Label>Họ và tên</Form.Label>
                            <Form.Control
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

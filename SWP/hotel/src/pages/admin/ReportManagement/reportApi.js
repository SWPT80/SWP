import axios from '../../../utils/axiosConfig'; // hoặc import axios từ config của bạn

export const fetchAdminReports = () => {
    return axios.get('/api/host-reports/admin'); // bạn có thể thay đổi endpoint nếu khác
};

export const resolveReport = (reportId, data) => {
    return axios.put(`/api/host-reports/${reportId}/resolve`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // hoặc lấy từ context
        }
    });
};
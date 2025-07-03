import React, { useEffect, useState } from 'react';
import { Statistic, Card } from 'antd';
import { getVisitorStats } from '../services/visitorService';

const VisitorCounter = () => {
    const [stats, setStats] = useState({ totalVisitors: 0 });

    useEffect(() => {
        const loadData = async () => {
            // Lấy thống kê 30 ngày gần nhất
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(endDate.getDate() - 30);

            const data = await getVisitorStats(startDate, endDate);
            setStats(data);
        };
        loadData();
    }, []);

    return (
        <Card title="Lượt truy cập">
            <Statistic
                value={stats.totalVisitors}
                prefix={<i className="fas fa-users" />}
            />
        </Card>
    );
};

export default VisitorCounter;

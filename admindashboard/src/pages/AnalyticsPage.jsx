import React, { useEffect, useState } from 'react';
import { Row, Col, DatePicker, Card } from 'antd';
import VisitorCounter from '../components/VisitorCounter';
import VisitorTrendChart from '../components/VisitorTrendChart';
import { getVisitorStats } from '../services/visitorService';

const { RangePicker } = DatePicker;

const AnalyticsPage = () => {
    const [stats, setStats] = useState(null);
    const [dateRange, setDateRange] = useState([
        new Date(new Date().setDate(new Date().getDate() - 30)),
        new Date()
    ]);

    useEffect(() => {
        const loadData = async () => {
            const data = await getVisitorStats(dateRange[0], dateRange[1]);
            setStats(data);
        };
        loadData();
    }, [dateRange]);

    useEffect(() => {
        // Theo dõi lượt truy cập khi trang được load
        trackVisit();
    }, []);

    return (
        <div className="analytics-page">
            <Row gutter={16}>
                <Col span={24}>
                    <Card title="Bộ lọc">
                        <RangePicker
                            onChange={(dates) => setDateRange(dates)}
                            style={{ width: '100%' }}
                        />
                    </Card>
                </Col>

                <Col span={8}>
                    <VisitorCounter stats={stats} />
                </Col>

                <Col span={16}>
                    <Card title="Xu hướng truy cập">
                        {stats && <VisitorTrendChart data={stats.dailyCounts} />}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AnalyticsPage;

import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import axios from "axios";

const LineChartDashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/chart/revenue")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error loading revenue data:", error);
            });
    }, []);

    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <LineChart data={data}>
                    <Line type="monotone" dataKey="doanhThu" stroke="#4CAF50" strokeWidth={2} />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChartDashboard;

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RevenueTrend = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip
        formatter={(value) => [`$${value.toLocaleString()}`, "Doanh thu"]}
        labelFormatter={(date) => new Date(date).toLocaleDateString()}
      />
      <Line
        type="monotone"
        dataKey="revenue"
        stroke="#8884d8"
        strokeWidth={2}
      />
    </LineChart>
  </ResponsiveContainer>
);

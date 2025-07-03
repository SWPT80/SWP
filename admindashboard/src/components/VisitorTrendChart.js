import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const VisitorTrendChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip formatter={(value) => [value, "Lượt truy cập"]} />
      <Area type="monotone" dataKey="count" stroke="#4f46e5" fill="#c7d2fe" />
    </AreaChart>
  </ResponsiveContainer>
);

export default VisitorTrendChart;

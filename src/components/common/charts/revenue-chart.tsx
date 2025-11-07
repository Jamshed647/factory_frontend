"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", revenue: 450000 },
  { name: "Feb", revenue: 520000 },
  { name: "Mar", revenue: 480000 },
  { name: "Apr", revenue: 610000 },
  { name: "May", revenue: 720000 },
  { name: "Jun", revenue: 680000 },
];

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value) => [
            `৳${Number(value).toLocaleString()}`,
            "Revenue",
          ]}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: "#1D4ED8" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

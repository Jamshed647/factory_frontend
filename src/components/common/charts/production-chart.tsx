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

interface ProductionChartProps {
  data: { day: string; production: number }[];
}

export function ProductionChart({ data }: ProductionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip formatter={(value) => [value, "Production Units"]} />
        <Line
          type="monotone"
          dataKey="production"
          stroke="#8B5CF6"
          strokeWidth={2}
          dot={{ fill: "#8B5CF6", r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

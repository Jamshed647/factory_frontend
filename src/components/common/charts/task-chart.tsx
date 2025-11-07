"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface TaskChartProps {
  data: { day: string; completed: number; assigned: number }[];
}

export function TaskChart({ data }: TaskChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="completed"
          fill="#10B981"
          name="Completed"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="assigned"
          fill="#3B82F6"
          name="Assigned"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

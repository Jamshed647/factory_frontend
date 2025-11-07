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

const data = [
  { name: "Mon", sales: 12000, expenses: 8000 },
  { name: "Tue", sales: 19000, expenses: 12000 },
  { name: "Wed", sales: 15000, expenses: 10000 },
  { name: "Thu", sales: 25000, expenses: 18000 },
  { name: "Fri", sales: 22000, expenses: 15000 },
  { name: "Sat", sales: 30000, expenses: 22000 },
  { name: "Sun", sales: 28000, expenses: 20000 },
];

export function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value) => [`৳${Number(value).toLocaleString()}`, ""]}
        />
        <Legend />
        <Bar dataKey="sales" fill="#10B981" name="Sales" />
        <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
      </BarChart>
    </ResponsiveContainer>
  );
}

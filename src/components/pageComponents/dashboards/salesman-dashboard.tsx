import { MetricCard } from "@/components/ui/metric-card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { TrendingUp, Target, Users, DollarSign } from "lucide-react";
import { salesmanData } from "@/lib/data/demo-data";

export function SalesmanDashboard() {
  const achievementPercentage =
    (salesmanData.summary.achieved / salesmanData.summary.target) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Sales Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John! 👋</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Sales"
          value={`৳${salesmanData.summary.totalSales.toLocaleString()}`}
          description="This month"
          icon={<TrendingUp className="w-4 h-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Target Achievement"
          value={`${achievementPercentage.toFixed(1)}%`}
          description={`৳${salesmanData.summary.achieved.toLocaleString()} / ৳${salesmanData.summary.target.toLocaleString()}`}
          icon={<Target className="w-4 h-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Total Clients"
          value={salesmanData.summary.totalClients.toString()}
          description="Active customers"
          icon={<Users className="w-4 h-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Commission"
          value={`৳${salesmanData.summary.commissionEarned.toLocaleString()}`}
          description="Earned this month"
          icon={<DollarSign className="w-4 h-4 text-muted-foreground" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="mb-4 text-lg font-semibold">Monthly Sales Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesmanData.salesTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip
                formatter={(value) => [
                  `৳${Number(value).toLocaleString()}`,
                  "Sales",
                ]}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3B82F6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="mb-4 text-lg font-semibold">Product-wise Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salesmanData.productSales}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ product, sales }) =>
                  `${product}: ৳${((sales as number) / 1000).toFixed(0)}k`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="sales"
              >
                <Cell fill="#3B82F6" />
                <Cell fill="#10B981" />
                <Cell fill="#8B5CF6" />
                <Cell fill="#F59E0B" />
              </Pie>
              <Tooltip
                formatter={(value) => [
                  `৳${Number(value).toLocaleString()}`,
                  "Sales",
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

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
import { Factory, Users, UserCheck, TrendingUp } from "lucide-react";
import { superAdminData } from "@/lib/data/demo-data";

export function CompanyDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Company Overview</h1>
          <p className="text-muted-foreground">Muri Master Company Ltd.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Factories"
          value={superAdminData.summary.totalFactories.toString()}
          description="Production units"
          icon={<Factory className="w-4 h-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Total Employees"
          value={superAdminData.summary.totalEmployees.toString()}
          description="Across all factories"
          icon={<Users className="w-4 h-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Managers"
          value={superAdminData.summary.totalManagers.toString()}
          description="Factory administrators"
          icon={<UserCheck className="w-4 h-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Monthly Revenue"
          value={`৳${(superAdminData.summary.monthlyRevenue / 100000).toFixed(1)}L`}
          description="Total company revenue"
          icon={<TrendingUp className="w-4 h-4 text-muted-foreground" />}
          trend={{ value: 12, isPositive: true }}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Factory Production */}
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="mb-4 text-lg font-semibold">
            Factory-wise Production
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={superAdminData.factoryProduction}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="factory" />
              <YAxis />
              <Tooltip formatter={(value) => [value, "Production Units"]} />
              <Bar dataKey="production" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Employee Distribution */}
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="mb-4 text-lg font-semibold">Employee Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={superAdminData.employeeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ role, count }) => `${role}: ${count}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                <Cell fill="#3B82F6" />
                <Cell fill="#10B981" />
                <Cell fill="#8B5CF6" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend */}
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="mb-4 text-lg font-semibold">Monthly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={superAdminData.revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
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
                stroke="#10B981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

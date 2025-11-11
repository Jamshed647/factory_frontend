/* eslint-disable @typescript-eslint/no-explicit-any */
import { MetricCard } from "@/components/ui/metric-card";
import { Users, UserCheck, Package, TrendingUp } from "lucide-react";
import { factoryAdminData } from "@/lib/data/demo-data";
import { AttendanceChart } from "@/components/common/charts/attendance-chart";
import { ProductionChart } from "@/components/common/charts/production-chart";

export function ManagerDashboard({ cash }: { cash: any }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Factory Dashboard</h1>
          <p className="text-muted-foreground">Muri Master - Dhaka Factory</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          link={`/factory/employees`}
          title="Total Employees"
          value={factoryAdminData.summary.totalEmployees.toString()}
          description="Working in factory"
          icon={<Users className="w-4 h-4 text-muted-foreground" />}
        />
        <MetricCard
          link={`/factory/salesman`}
          title="Active Salesmen"
          value={factoryAdminData.summary.activeSalesmen.toString()}
          description="Currently active"
          icon={<UserCheck className="w-4 h-4 text-muted-foreground" />}
        />
        <MetricCard
          link={`/factory/product`}
          title="Daily Production"
          value={factoryAdminData.summary.dailyProduction.toString()}
          description="Units produced today"
          icon={<Package className="w-4 h-4 text-muted-foreground" />}
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard
          title="Current Stock"
          value={cash?.balance}
          description="Available units"
          icon={<TrendingUp className="w-4 h-4 text-muted-foreground" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="mb-4 text-lg font-semibold">Daily Production Trend</h3>
          <ProductionChart data={factoryAdminData.productionTrend} />
        </div>
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="mb-4 text-lg font-semibold">Attendance Overview</h3>
          <AttendanceChart data={factoryAdminData.attendanceOverview} />
        </div>
      </div>
    </div>
  );
}

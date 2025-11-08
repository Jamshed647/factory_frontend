import { MetricCard } from "@/components/ui/metric-card";
import { Building2, Factory, Users, TrendingUp } from "lucide-react";
import { jangosoftData } from "@/lib/data/demo-data";
import { CompanyGrowthChart } from "@/components/common/charts/company-growth-chart";
import { CompanyStatusChart } from "@/components/common/charts/company-status-chart";

export function ProjectOwnerDashboard() {
  const targetProgress =
    (jangosoftData.summary.totalMonthlySales / 3000000) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">System Overview</h1>
        <div className="text-sm text-muted-foreground">
          Global System Performance
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          link="company"
          title="Total Companies"
          value={jangosoftData.summary.totalCompanies.toString()}
          description="Registered companies"
          icon={<Building2 className="w-4 h-4 text-muted-foreground" />}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          link="factory"
          title="Total Factories"
          value={jangosoftData.summary.totalFactories.toString()}
          description="Across all companies"
          icon={<Factory className="w-4 h-4 text-muted-foreground" />}
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard
          link="user"
          title="Active Users"
          value={jangosoftData.summary.totalActiveUsers.toString()}
          description="Currently active"
          icon={<Users className="w-4 h-4 text-muted-foreground" />}
          trend={{ value: 15, isPositive: true }}
        />
        <MetricCard
          title="Monthly Sales"
          value={`৳${(jangosoftData.summary.totalMonthlySales / 100000).toFixed(1)}L`}
          description={`${targetProgress.toFixed(1)}% of target`}
          icon={<TrendingUp className="w-4 h-4 text-muted-foreground" />}
          trend={{ value: 18, isPositive: true }}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="mb-4 text-lg font-semibold">Company Growth</h3>
          <CompanyGrowthChart data={jangosoftData.companyGrowth} />
        </div>
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="mb-4 text-lg font-semibold">Company Status</h3>
          <CompanyStatusChart data={jangosoftData.companyStatus} />
        </div>
      </div>
    </div>
  );
}

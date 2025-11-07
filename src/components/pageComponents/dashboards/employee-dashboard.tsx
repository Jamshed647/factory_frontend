import { MetricCard } from "@/components/ui/metric-card";
import { CheckCircle, ClipboardList, Calendar, Star } from "lucide-react";
import { employeeData } from "@/lib/data/demo-data";
import { TaskChart } from "@/components/common/charts/task-chart";
import { AttendanceChart } from "@/components/common/charts/attendance-chart";

export function EmployeeDashboard() {
  const taskCompletion =
    (employeeData.summary.tasksCompleted / employeeData.summary.totalAssigned) *
    100;
  const attendancePercentage = (employeeData.summary.attendanceDays / 26) * 100;

  return (
    <div className="space-y-6">
      <div className="p-8 text-center text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
        <h1 className="text-2xl font-bold">Welcome, Rahman! 👋</h1>
        <p className="opacity-90">Production Department - Worker</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Tasks Completed"
          value={employeeData.summary.tasksCompleted.toString()}
          description={`${taskCompletion.toFixed(1)}% completion rate`}
          icon={<CheckCircle className="w-4 h-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Total Assigned"
          value={employeeData.summary.totalAssigned.toString()}
          description="Tasks this week"
          icon={<ClipboardList className="w-4 h-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Attendance Days"
          value={employeeData.summary.attendanceDays.toString()}
          description={`${attendancePercentage.toFixed(1)}% attendance`}
          icon={<Calendar className="w-4 h-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Performance"
          value={employeeData.summary.performanceRating.toString()}
          description="Out of 5.0 rating"
          icon={<Star className="w-4 h-4 text-muted-foreground" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="mb-4 text-lg font-semibold">Task Completion Trend</h3>
          <TaskChart data={employeeData.taskTrend} />
        </div>
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="mb-4 text-lg font-semibold">Attendance Ratio</h3>
          <AttendanceChart data={employeeData.attendanceRatio} />
        </div>
      </div>
    </div>
  );
}

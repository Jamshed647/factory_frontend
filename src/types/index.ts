/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

export interface DashboardStats {
  todaySales: number;
  todayExpenses: number;
  cashBalance: number;
  customerDues: number;
  supplierDues: number;
  monthlyProfit: number;
}

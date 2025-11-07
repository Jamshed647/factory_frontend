// JangoSoft (Project Owner) Data
export const jangosoftData = {
  summary: {
    totalCompanies: 24,
    totalFactories: 48,
    totalActiveUsers: 342,
    totalMonthlySales: 2450000,
  },
  companyGrowth: [
    { month: "Jan", companies: 5 },
    { month: "Feb", companies: 8 },
    { month: "Mar", companies: 12 },
    { month: "Apr", companies: 15 },
    { month: "May", companies: 18 },
    { month: "Jun", companies: 24 },
  ],
  companyStatus: [
    { name: "Active", value: 18 },
    { name: "Inactive", value: 6 },
  ],
};

// Super Admin (Company Owner) Data
export const superAdminData = {
  summary: {
    totalFactories: 3,
    totalEmployees: 45,
    totalManagers: 5,
    monthlyRevenue: 1250000,
  },
  factoryProduction: [
    { factory: "Factory A", production: 45000 },
    { factory: "Factory B", production: 38000 },
    { factory: "Factory C", production: 52000 },
  ],
  employeeDistribution: [
    { role: "Managers", count: 5 },
    { role: "Salesmen", count: 15 },
    { role: "Workers", count: 25 },
  ],
  revenueTrend: [
    { month: "Jan", revenue: 980000 },
    { month: "Feb", revenue: 1120000 },
    { month: "Mar", revenue: 1050000 },
    { month: "Apr", revenue: 1250000 },
    { month: "May", revenue: 1180000 },
    { month: "Jun", revenue: 1320000 },
  ],
};

// Factory Admin (Manager) Data
export const factoryAdminData = {
  summary: {
    totalEmployees: 25,
    activeSalesmen: 8,
    dailyProduction: 450,
    currentStock: 1250,
  },
  productionTrend: [
    { day: "Mon", production: 380 },
    { day: "Tue", production: 420 },
    { day: "Wed", production: 450 },
    { day: "Thu", production: 410 },
    { day: "Fri", production: 480 },
    { day: "Sat", production: 320 },
  ],
  attendanceOverview: [
    { status: "Present", count: 22 },
    { status: "Absent", count: 3 },
  ],
};

// Salesman Data
export const salesmanData = {
  summary: {
    totalSales: 185000,
    target: 300000,
    achieved: 185000,
    totalClients: 45,
    commissionEarned: 18500,
  },
  salesTrend: [
    { week: "Week 1", sales: 42000 },
    { week: "Week 2", sales: 38000 },
    { week: "Week 3", sales: 45000 },
    { week: "Week 4", sales: 60000 },
  ],
  productSales: [
    { product: "Muri Regular", sales: 65000 },
    { product: "Muri Spicy", sales: 45000 },
    { product: "Muri Masala", sales: 40000 },
    { product: "Muri Premium", sales: 35000 },
  ],
};

// Employee Data
export const employeeData = {
  summary: {
    tasksCompleted: 12,
    totalAssigned: 15,
    attendanceDays: 22,
    performanceRating: 4.5,
  },
  taskTrend: [
    { day: "Mon", completed: 2, assigned: 3 },
    { day: "Tue", completed: 3, assigned: 3 },
    { day: "Wed", completed: 2, assigned: 3 },
    { day: "Thu", completed: 3, assigned: 3 },
    { day: "Fri", completed: 2, assigned: 3 },
  ],
  attendanceRatio: [
    { status: "Present", count: 22 },
    { status: "Absent", count: 4 },
  ],
};

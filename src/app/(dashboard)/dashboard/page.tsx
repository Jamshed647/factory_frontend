import UserTable from "./_assets/components/UserTable";

export default function DashboardPage() {
  // TODO: API Dashboard Content
  const stats = [
    { title: "Total Super Admins", value: 10 },
    { title: "Total Factories", value: 10 },
    { title: "Total Managers", value: 10 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Overview */}
      <div className="grid grid-cols-1 gap-6 my-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.title}
            className={`bg-white dark:bg-gray-900  p-6 rounded-2xl shadow-lg border transition-shadow duration-300 
`}
          >
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {item.title}
            </h4>
            <p className="mt-1 text-3xl font-bold text-gray-600 dark:text-gray-300">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* User Table */}
      <div className="mt-10">
        <UserTable />
      </div>
    </div>
  );
}

"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { ProjectOwnerDashboard } from "@/components/pageComponents/dashboards/projectowner-dashboard";
import React from "react";

export default function DashboardPage() {
  const { data, isLoading } = useFetchData({
    method: "GET",
    path: "dashboard/project-owner",
    queryKey: "getProjectOwnerDashboard",
  });

  return (
    <div>
      {/*       <h1 className="text-3xl font-bold">Dashboard</h1> */}
      {/*       {isLoading ? ( */}
      {/*         <div className="flex flex-col gap-3 justify-center items-center min-h-screen text-gray-500"> */}
      {/*           <p>Loading dashboard...</p> */}
      {/*         </div> */}
      {/*       ) : ( */}
      {/*         <div className="grid grid-cols-1 gap-6 my-6 sm:grid-cols-2 lg:grid-cols-3"> */}
      {/*           <div */}
      {/*             className={`bg-white dark:bg-gray-900  p-6 rounded-2xl shadow-lg border transition-shadow duration-300  */}
      {/* `} */}
      {/*           > */}
      {/*             <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100"> */}
      {/*               Total Super Admins */}
      {/*             </h4> */}
      {/*             <p className="mt-1 text-3xl font-bold text-gray-600 dark:text-gray-300"> */}
      {/*               {data?.data?.totalCompanies} */}
      {/*             </p> */}
      {/*           </div> */}
      {/**/}
      {/*           <div */}
      {/*             className={`bg-white dark:bg-gray-900  p-6 rounded-2xl shadow-lg border transition-shadow duration-300  */}
      {/* `} */}
      {/*           > */}
      {/*             <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100"> */}
      {/*               Total Factories */}
      {/*             </h4> */}
      {/*             <p className="mt-1 text-3xl font-bold text-gray-600 dark:text-gray-300"> */}
      {/*               {data?.data?.totalFactories} */}
      {/*             </p> */}
      {/*           </div> */}
      {/**/}
      {/*           <div */}
      {/*             className={`bg-white dark:bg-gray-900  p-6 rounded-2xl shadow-lg border transition-shadow duration-300  */}
      {/* `} */}
      {/*           > */}
      {/*             <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100"> */}
      {/*               Total Managers */}
      {/*             </h4> */}
      {/*             <p className="mt-1 text-3xl font-bold text-gray-600 dark:text-gray-300"> */}
      {/*               {data?.data?.totalManagers} */}
      {/*             </p> */}
      {/*           </div> */}
      {/**/}
      {/*           <div */}
      {/*             className={`bg-white dark:bg-gray-900  p-6 rounded-2xl shadow-lg border transition-shadow duration-300  */}
      {/* `} */}
      {/*           > */}
      {/*             <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100"> */}
      {/*               Total Employees */}
      {/*             </h4> */}
      {/*             <p className="mt-1 text-3xl font-bold text-gray-600 dark:text-gray-300"> */}
      {/*               {data?.data?.totalEmployees} */}
      {/*             </p> */}
      {/*           </div> */}
      {/**/}
      {/*           <div */}
      {/*             className={`bg-white dark:bg-gray-900  p-6 rounded-2xl shadow-lg border transition-shadow duration-300  */}
      {/* `} */}
      {/*           > */}
      {/*             <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100"> */}
      {/*               Total Salesmen */}
      {/*             </h4> */}
      {/*             <p className="mt-1 text-3xl font-bold text-gray-600 dark:text-gray-300"> */}
      {/*               {data?.data?.totalSalesmen} */}
      {/*             </p> */}
      {/*           </div> */}
      {/*         </div> */}
      {/*       )} */}
      <ProjectOwnerDashboard />
    </div>
  );
}

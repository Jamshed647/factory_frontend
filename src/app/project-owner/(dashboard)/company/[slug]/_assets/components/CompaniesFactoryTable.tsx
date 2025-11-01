"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import CreateFactoryModal from "./create/createFactoryModal";
import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import { StatusWithIcon } from "@/components/common/Badge/status_point";
import UpdateFactoryModal from "./update/updateFactoryModal";
import Link from "next/link";

const CompaniesFactoryTable = ({ id }: { id: string }) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data: factories, isLoading: isLoadingFactories } = useFetchData({
    path: `auth/factory/company/${id}`,
    queryKey: "fetchSingleCompanyFactories",
  });

  return (
    <Card className="mt-6 shadow-md">
      <CardHeader>
        <CardTitle className="flex justify-between text-lg font-bold">
          <h3>All Factories</h3>
          <CreateFactoryModal companyOwnerId={id} />
        </CardTitle>
      </CardHeader>
      <DynamicTableWithPagination
        data={factories?.data}
        isLoading={isLoadingFactories}
        pagination={factories?.pagination}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        config={{
          columns: [
            {
              key: "name",
              header: "Name",
              render: (user) => (
                <Link href={`/project-owner/factory/${user.id}`}>
                  {user.name}
                </Link>
              ),
            },
            { key: "address", header: "Address" },
            { key: "phone", header: "Contact Info" },
            {
              key: "status",
              header: "Status",
              render: (user) => <StatusWithIcon status={user.status} />,
            },
            {
              key: "companyOwner",
              header: "Company Owner",
              render: (user) => (
                <span className="capitalize">{user.companyOwner?.name}</span>
              ),
            },
            {
              key: "action",
              header: "Action",
              render: (user) => <UpdateFactoryModal data={user} />,
            },
          ],
        }}
      />
    </Card>
  );
};

export default CompaniesFactoryTable;

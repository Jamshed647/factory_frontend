"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import ActionButton from "@/components/common/button/actionButton";
import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import { CustomField } from "@/components/common/fields/cusField";
import { useAuth } from "@/hooks/hooks";
import { ArrowRightFromLine } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ProductionComponents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const { user } = useAuth();
  const factoryId = user?.factoryId;

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/production/factory/${factoryId}`,
    queryKey: "getProductionDataByFactory",
    filterData: {
      search: searchText,
      page: currentPage,
    },
  });

  return (
    <div>
      <div className="bg-white rounded-md border shadow-sm">
        <div className="flex justify-between py-4 px-2">
          <div>
            <CustomField.CommonSearch
              placeholder="Search Production"
              searchText={searchText}
              setSearchText={setSearchText}
              width="full"
            />
          </div>
          <Link href="production/addProduction">
            <ActionButton
              type="button"
              variant="outline"
              handleOpen={() => console.log("open")}
              buttonContent="Add Production"
              lastIcon={<ArrowRightFromLine />}
              className="py-2 px-4 font-bold text-white bg-blue-400 rounded hover:bg-blue-300"
            />
          </Link>
        </div>

        <DynamicTableWithPagination
          data={data?.data}
          isLoading={isLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pagination={data?.pagination}
          config={{
            columns: [
              {
                key: "name",
                header: "Name",
              },
              {
                key: "batchNo",
                header: "Batch No",
              },
              {
                key: "totalProductionAmount",
                header: "Total Production Amount",
              },
              {
                key: "extraCost",
                header: "Extra Cost",
              },
              {
                key: "status",
                header: "Status",
              },
              {
                key: "note",
                header: "Note",
              },
              {
                key: "factory",
                header: "Factory",
                render: (row) => row.factory?.name || "—",
              },
              {
                key: "items",
                header: "Total Items",
                render: (row) => row.items?.length ?? 0,
              },
              // {
              //   key: "action",
              //   header: "Action",
              //   className: "text-right",
              //   render: (row) => (
              //     <Link
              //       href={`/production/addProduct/${row.id}`}
              //       className="text-blue-600 hover:underline"
              //     >
              //       Edit
              //     </Link>
              //   ),
              // },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default ProductionComponents;

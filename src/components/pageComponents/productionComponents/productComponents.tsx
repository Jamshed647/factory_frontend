"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import ActionButton from "@/components/common/button/actionButton";
import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import { CustomField } from "@/components/common/fields/cusField";
import { useAuth } from "@/hooks/hooks";
import { ArrowRightFromLine } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ProductionUpdateModal from "./addProduction/update/updateProductModal";
import dateFormat from "@/utils/formatter/DateFormatter";
import { StatusWithIcon } from "@/components/common/Badge/status_point";

const ProductionComponents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const { user } = useAuth();
  const factoryId = user?.factoryId;

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/production/factory/${factoryId}`,
    queryKey: "getProductionDataByFactory",
    filterData: {
      type: status,
      search: searchText,
      page: currentPage,
    },
  });

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setCurrentPage(1);
  };

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

          <div className="flex gap-2 justify-between">
            <CustomField.SingleSelectField
              name="status"
              options={["COMPLETE", "QUICK"]}
              placeholder="Select Status"
              onValueChange={handleStatusChange}
              defaultValue={status}
            />

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
                key: "date",
                header: "Date",
                render: (row) =>
                  dateFormat.fullDateTime(row?.createdAt, { showTime: false }),
              },
              {
                key: "batchNo",
                header: "Batch No",
              },

              // {
              //   key: "extraCost",
              //   header: "Extra Cost",
              // },
              {
                key: "totalProductionAmount",
                header: "Total Production Cost",
              },
              {
                key: "totalWeight",
                header: "Total Weight",
              },
              {
                key: "totalAmount",
                header: "Total Amount",
                render: (row) => row?.totalProductionAmount + row?.extraCost,
              },
              // {
              //   key: "status",
              //   header: "Status",
              //   render: (row) => <StatusWithIcon status={row?.status} />,
              // },
              // {
              //   key: "note",
              //   header: "Note",
              // },
              // {
              //   key: "factory",
              //   header: "Factory",
              //   render: (row) => row.factory?.name || "—",
              // },
              // {
              //   key: "items",
              //   header: "Total Items",
              //   render: (row) => row.items?.length ?? 0,
              // },
              {
                key: "action",
                header: "Action",
                className: "text-right",
                render: (row) => (
                  <div
                    className={`flex gap-3 justify-end items-center ${row.status === "COMPLETE" ? "opacity-60 pointer-events-none select-none" : ""}`}
                  >
                    <ProductionUpdateModal
                      factoryId={factoryId as string}
                      productData={row}
                    />
                    <Link
                      href={`production/addProduct/${row.id}`}
                      className="py-1 px-2 rounded-md border"
                    >
                      Production to Product
                    </Link>
                  </div>
                ),
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default ProductionComponents;

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
import { useLanguage } from "@/hooks/useLanguage";

const ProductionComponents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const { user } = useAuth();
  const factoryId = user?.factoryId;
  const { t } = useLanguage();

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
              placeholder={t.searchProduction}
              searchText={searchText}
              setSearchText={setSearchText}
              width="full"
            />
          </div>

          <div className="flex gap-2 justify-between">
            <CustomField.SingleSelectField
              name="status"
              options={["COMPLETE", "QUICK"]}
              placeholder={t.selectStatus}
              onValueChange={handleStatusChange}
              defaultValue={status}
            />

            <Link href="production/addProduction">
              <ActionButton
                type="button"
                variant="outline"
                handleOpen={() => console.log("open")}
                buttonContent={t.addProduction}
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
                header: t.date,
                render: (row) =>
                  dateFormat.fullDateTime(row?.createdAt, { showTime: false }),
              },
              {
                key: "batchNo",
                header: t.batchNo,
              },
              {
                key: "totalProductionAmount",
                header: t.totalProductionCost,
              },
              {
                key: "totalWeight",
                header: t.totalWeight,
              },
              {
                key: "totalAmount",
                header: t.totalAmount,
                render: (row) => row?.totalProductionAmount + row?.extraCost,
              },
              {
                key: "action",
                header: t.action,
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
                      {t.productionToProduct}
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

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CreateSupplierModal from "@/app/factory/supplier/_assets/components/create/createSupplierModal";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
// import ActionButton from "@/components/common/button/actionButton";
// import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import { CustomField } from "@/components/common/fields/cusField";
import { Card } from "@/components/ui/card";
import { CookieCart } from "@/utils/cookie/cart-utils";
// import { Edit2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SelectSupplier = ({
  factoryId,
  enabled = false,
}: {
  factoryId: string;
  enabled?: boolean;
}) => {
  // const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const cart = CookieCart("supplierInfo");

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/supplier/factory/${factoryId}`,
    queryKey: "getSupplierDataByFactory",
    filterData: {
      search: searchTerm,
    },
  });

  const handleCustomerId = (c: any) => {
    cart.set(c);
  };

  return (
    <>
      {/* <DialogWrapper */}
      {/*   triggerContent={ */}
      {/*     <ActionButton */}
      {/*       btnStyle="bg-blue-500 text-white" */}
      {/*       icon={<Edit2Icon className="w-5 h-5" />} */}
      {/*       buttonContent="Select Customer" */}
      {/*     /> */}
      {/*   } */}
      {/*   open={open} */}
      {/*   handleOpen={setOpen} */}
      {/*   title="Select Customer" */}
      {/* > */}

      <div className="mb-4 space-y-2">
        <div>
          <CustomField.CommonSearch
            placeholder="Search bank"
            width="w-full"
            searchText={searchTerm}
            setSearchText={setSearchTerm}
          />
        </div>

        <CreateSupplierModal factoryId={factoryId} />
      </div>

      {/* Customer List */}
      <div
        className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 ${
          enabled ? "" : "opacity-50 pointer-events-none"
        }`}
      >
        {data?.data?.map((c: any) => (
          <Link
            key={c?.id}
            href={`/factory/purchase/cart`}
            onClick={() => handleCustomerId(c)}
          >
            <Card className="flex flex-col gap-2 p-2 cursor-pointer">
              <h3 className="text-base font-semibold break-words">
                Name: {c?.name}
              </h3>

              <p className="text-sm text-gray-700 break-words">📞 {c?.phone}</p>

              <div className="flex gap-2 justify-between items-start">
                <span className="text-xs text-gray-500 break-words max-w-[70%]">
                  📍 {c?.address}
                </span>
                {/* <StatusWithIcon status={c?.status} /> */}

                <p>৳{c?.totalDueAmount}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      {/* </DialogWrapper> */}
    </>
  );
};

export default SelectSupplier;

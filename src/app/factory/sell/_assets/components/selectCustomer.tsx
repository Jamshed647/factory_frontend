/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CreateCustomerModal from "@/app/factory/customer/_assets/components/create/createCustomerModal";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { CustomField } from "@/components/common/fields/cusField";
import { Card } from "@/components/ui/card";
import { CookieCart } from "@/utils/cookie/cart-utils";
// import { Edit2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SelectCustomer = ({
  factoryId,
  enabled = false,
}: {
  factoryId: string;
  enabled?: boolean;
}) => {
  // const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const cart = CookieCart("customerInfo");

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/customer/factory/${factoryId}`,
    queryKey: "getCustomerData",
    filterData: {
      search: searchTerm,
    },
  });

  const handleCustomerId = (c: any) => {
    cart.set(c);
  };

  return (
    <>
      <div className="mb-4 space-y-2">
        <div>
          <CustomField.CommonSearch
            placeholder="Search bank"
            width="w-full"
            searchText={searchTerm}
            setSearchText={setSearchTerm}
          />
        </div>

        <div className="flex justify-between items-center">
          <CreateCustomerModal factoryId={factoryId} />

          <Link
            href={`cart`}
            className={`${enabled ? "" : "opacity-50 pointer-events-none "} p-2 text-blue-500 rounded border border-blue-500 hover:text-white hover:border-white`}
            onClick={() => cart.remove()}
          >
            Quick Sell
          </Link>
        </div>
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
            href={`/factory/sell/cart`}
            onClick={() => handleCustomerId(c)}
          >
            <Card>
              <div className="flex justify-between items-center px-4">
                <div className="flex flex-col gap-2 p-2 cursor-pointer">
                  <h3 className="text-base font-semibold break-words">
                    Name: {c?.name}
                  </h3>

                  <p className="text-sm text-gray-700 break-words">
                    📞 {c?.phone}
                  </p>

                  <div className="flex gap-2 justify-between items-start">
                    <span className="text-xs text-gray-500 break-words max-w-[70%]">
                      📍 {c?.address}
                    </span>
                  </div>
                </div>
                <p>৳{c?.totalDueAmount}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default SelectCustomer;

"use client";

import CustomerTable from "./_assets/components/customarTable";
import { useFactory } from "@/utils/factoryInfo";

const CustomerPage = () => {
  const { factory } = useFactory();
  return (
    <div>
      <CustomerTable factoryId={factory?.id as string} />
    </div>
  );
};

export default CustomerPage;

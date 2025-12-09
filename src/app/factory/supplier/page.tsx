"use client";

import SupplierTable from "./_assets/components/supplierTable";
import { useFactory } from "@/utils/factoryInfo";

const SupplierPage = () => {
  const { factory } = useFactory();

  return (
    <div>
      <SupplierTable factoryId={factory?.id as string} />
    </div>
  );
};

export default SupplierPage;

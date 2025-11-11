"use client";

import { useAuth } from "@/hooks/hooks";
import SupplierTable from "./_assets/components/supplierTable";
import { getFactoryId } from "@/utils/cookie/companyFactoryCookie";

const SupplierPage = () => {
  const { user } = useAuth();

  const switchedFactory = getFactoryId();
  const factoryId = user?.factoryId ? user?.factoryId : switchedFactory;

  return (
    <div>
      <SupplierTable factoryId={factoryId as string} />
    </div>
  );
};

export default SupplierPage;

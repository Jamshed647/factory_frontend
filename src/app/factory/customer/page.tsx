"use client";

import { getFactoryId } from "@/utils/cookie/companyFactoryCookie";
import CustomerTable from "./_assets/components/customarTable";
import { useAuth } from "@/hooks/hooks";

const CustomerPage = () => {
  const { user } = useAuth();

  const switchedFactory = getFactoryId();
  const factoryId = user?.factoryId ? user?.factoryId : switchedFactory;

  return (
    <div>
      <h1>Customer Page</h1>
      <CustomerTable factoryId={factoryId as string} />
    </div>
  );
};

export default CustomerPage;

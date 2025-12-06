"use client";

import { useAuth } from "@/hooks/hooks";
import { getFactoryId } from "@/utils/cookie/companyFactoryCookie";
import AccountingComponents from "./_assets/components/accountingComponents";

//const factoryId = getFactoryId();

const AccountingPage = () => {
  const { user } = useAuth();
  const factoryId = user?.factoryId;

  return (
    <div>
      <AccountingComponents factoryId={factoryId as string} />
    </div>
  );
};

export default AccountingPage;

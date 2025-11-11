"use client";

// import { useAuth } from "@/hooks/hooks";
import { getFactoryId } from "@/utils/cookie/companyFactoryCookie";
import BankTable from "./_assets/components/bankTable";

const factoryId = getFactoryId();

const BankPage = () => {
  // const { user } = useAuth();

  return (
    <div>
      <BankTable factoryId={factoryId as string} />
    </div>
  );
};

export default BankPage;

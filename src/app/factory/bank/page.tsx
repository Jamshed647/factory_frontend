"use client";

import BankTable from "./_assets/components/bankTable";
import { useFactory } from "@/utils/factoryInfo";

const BankPage = () => {
  const { factory } = useFactory();

  return (
    <div>
      <BankTable factoryId={factory?.id as string} />
    </div>
  );
};

export default BankPage;

"use client";

import PurchaseTable from "@/components/pageComponents/purchaseProduct/purchaseTable";
import { useFactory } from "@/utils/factoryInfo";

const PurchasePage = () => {
  const { factory } = useFactory();

  return <PurchaseTable factoryId={factory?.id as string} />;
};

export default PurchasePage;

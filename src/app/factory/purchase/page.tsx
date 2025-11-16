"use client";

import PurchaseTable from "@/components/pageComponents/purchaseProduct/purchaseTable";
import { useAuth } from "@/hooks/hooks";

const PurchasePage = () => {
  const { user } = useAuth();

  return <PurchaseTable factoryId={user?.factoryId as string} />;
};

export default PurchasePage;

"use client";

import SellsTable from "@/components/pageComponents/sellProduct/sellsTable";
import { useAuth } from "@/hooks/hooks";

const SellPage = () => {
  const { user } = useAuth();

  return <SellsTable factoryId={user?.factoryId as string} />;
};

export default SellPage;

"use client";

import SellsTable from "@/components/pageComponents/sellProduct/sellsTable";
import { useFactory } from "@/utils/factoryInfo";

const SellPage = () => {
  const { factory } = useFactory();
  // console.log("factory", factory);

  return <SellsTable factoryId={factory?.id as string} />;
};

export default SellPage;

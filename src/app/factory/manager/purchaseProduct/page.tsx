"use client";
import PurchaseProductTable from "@/components/pageComponents/productComponents/purchaseProduct/PurchaseProductTable";
import { useFactory } from "@/utils/factoryInfo";

const ProductPage = () => {
  const { factory } = useFactory();

  return (
    <div>
      <PurchaseProductTable id={factory?.id as string} />
    </div>
  );
};

export default ProductPage;

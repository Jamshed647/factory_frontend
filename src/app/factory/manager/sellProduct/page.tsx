"use client";
import SellProductTable from "@/components/pageComponents/productComponents/sellProduct/SellProductTable";
import { useFactory } from "@/utils/factoryInfo";

const ProductPage = () => {
  const { factory } = useFactory();

  return (
    <div>
      <SellProductTable id={factory?.id as string} />
    </div>
  );
};

export default ProductPage;

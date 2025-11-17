"use client";
import SellProductTable from "@/components/pageComponents/productComponents/sellProduct/SellProductTable";
import { useAuth } from "@/hooks/hooks";
import { getFactoryId } from "@/utils/cookie/companyFactoryCookie";

const ProductPage = () => {
  const { user } = useAuth();
  const factoryId = getFactoryId();

  const id =
    user?.role === "PROJECT_OWNER" || user?.role === "COMPANY_OWNER"
      ? factoryId
      : user?.factory?.id;

  return (
    <div>
      <SellProductTable id={id as string} />
    </div>
  );
};

export default ProductPage;

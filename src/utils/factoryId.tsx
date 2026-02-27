import { useAuth } from "@/hooks/hooks";
import { getFactoryId } from "./cookie/companyFactoryCookie";

const findFactoryId = () => {
  // const { user } = useAuth();
  const factoryId = getFactoryId();

  // const id =
  //   user?.role === "PROJECT_OWNER" || user?.role === "COMPANY_OWNER"
  //     ? factoryId
  //     : user?.factory?.id;

  return "";
};

export default findFactoryId;

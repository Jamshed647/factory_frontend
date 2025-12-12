"use client";
import { useForm } from "react-hook-form";
import { ProductionFormType, productionSchema } from "../schema/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { productionDefaultValue } from "../schema/productDefaultValue";
import AddProductForm from "../form/addProductForm";
import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { useRouter } from "next/navigation";
import { useFactory } from "@/utils/factoryInfo";

const CreateProductToProductionModal = ({
  productionId,
}: {
  productionId: string;
}) => {
  const router = useRouter();
  const { factory } = useFactory();

  const form = useForm<ProductionFormType>({
    resolver: zodResolver(productionSchema),
    defaultValues: productionDefaultValue({
      factoryId: factory?.id as string,
      productionId: productionId,
    }),
  });

  if (factory?.id) {
    form.setValue("factoryId", factory?.id);
  }

  const addProduct = useApiMutation({
    path: `factory/production-to-product`,
    method: "POST",
    onSuccess: (data) => {
      //console.log("SUCCESS:", data);
      showToast("success", data);
      form.reset({});
      router.push(`/factory/manager/production`);
    },
  });

  const onSubmit = (data: ProductionFormType) => {
    addProduct.mutate(data);
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">
        Create Production To Product
      </h2>

      <AddProductForm
        form={form}
        onSubmit={onSubmit}
        //  factoryId={factoryId}
        isPending={addProduct.isPending}
      />
    </div>
  );
};

export default CreateProductToProductionModal;

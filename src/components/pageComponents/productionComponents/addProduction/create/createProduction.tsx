/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { ProductionFormType, productionSchema } from "../schema/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { productionDefaultValue } from "../schema/productDefaultValue";
import { useAuth } from "@/hooks/hooks";
import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { Product, SelectedProduct } from "../schema/product-type";
import CreateProductionForm from "../form/createProductionForm";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ProductionModalProps {
  product?: Product[];
  setSelectedProducts: (items: SelectedProduct[]) => void;
  setOpen: (open: boolean) => void;
}

const CreateProduction = ({
  setOpen,
  product,
  setSelectedProducts,
}: ProductionModalProps) => {
  const { user } = useAuth();
  const factoryId = user?.factoryId;
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<ProductionFormType>({
    resolver: zodResolver(productionSchema),
    defaultValues: productionDefaultValue({ factoryId, items: [] }),
  });

  // Update form when product changes
  useEffect(() => {
    const items = (product ?? []).map((p: any) => ({
      productId: p.productId,
      productionQuantity: p.productionQuantity,
      buyPrice: Number(p.buyPrice),
      totalPrice: Number(p.totalPrice),
    }));

    const totalProductionAmount = items.reduce(
      (sum, p) => sum + (Number(p.totalPrice) || 0),
      0,
    );

    form.reset(
      productionDefaultValue({
        factoryId,
        items,
        totalProductionAmount,
      }),
    );
  }, [product, factoryId, form]);

  const addProduct = useApiMutation({
    path: `factory/production`,
    method: "POST",
    onSuccess: (data) => {
      showToast("success", data);
      setOpen(false);
      setSelectedProducts([]);
      form.reset({});
      queryClient.invalidateQueries({
        queryKey: ["getProductionDataByFactory"],
      });
      router.push("/factory/manager/production");
    },
  });

  const onSubmit = (data: ProductionFormType) => {
    // console.log("🚀 onSubmit ", data);
    addProduct.mutate(data);
  };

  return (
    <div>
      <CreateProductionForm
        form={form}
        onSubmit={onSubmit}
        isPending={addProduct.isPending}
      />
    </div>
  );
};

export default CreateProduction;

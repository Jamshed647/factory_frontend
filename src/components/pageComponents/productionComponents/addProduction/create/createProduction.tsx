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

interface ProductionModalProps {
  product?: Product[];
  setSelectedProducts: (items: SelectedProduct[]) => void;
  setOpen: (open: boolean) => void;
}

const CreateProductionModal = ({
  setOpen,
  product,
  setSelectedProducts,
}: ProductionModalProps) => {
  const { user } = useAuth();
  const factoryId = user?.factoryId;
  const queryClient = useQueryClient();

  const form = useForm<ProductionFormType>({
    resolver: zodResolver(productionSchema),
    defaultValues: productionDefaultValue({
      factoryId,
      items: (product ?? []).map((p: any) => ({
        productId: p.productId,
        quantity: p.limit,
        buyPrice: Number(p.buyPrice),
        totalPrice: Number(p.totalPrice),
      })),
      totalProductionAmount: (product ?? []).reduce(
        (sum, p) => sum + Number(p?.totalPrice),
        0,
      ),
    }),
  });

  const addProduct = useApiMutation({
    path: `factory/production`,
    method: "POST",
    onSuccess: (data) => {
      showToast("success", data);
      queryClient.invalidateQueries({ queryKey: ["getProductDataByFactory"] });
      setOpen(false);
      setSelectedProducts([]);
      form.reset({});
    },
  });

  const onSubmit = (data: ProductionFormType) => {
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

export default CreateProductionModal;

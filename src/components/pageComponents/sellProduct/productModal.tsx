import ActionButton from "@/components/common/button/actionButton";
import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import { CustomField } from "@/components/common/fields/cusField";
import { Form } from "@/components/ui/custom_ui/form";
import onFormError from "@/utils/formError";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface Item {
  id: string;
  limit: number;
  name: string;
  sellPrice: number;
  stock: number;
  buyPrice?: number;
  updateSellPrice?: number;
}

interface CreateSalesmanModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  productData: Item | undefined;
  updateLimit: (
    id: string,
    limit: number,
    name: string,
    stock: number,
    sellPrice: number,
    buyPrice?: number,
    updateSellPrice?: number,
  ) => void;
}

const productModalSchema = z.object({
  id: z.string(),
  name: z.string(),
  stock: z.number(),
  sellPrice: z.number(),
  limit: z.number(),
  buyPrice: z.coerce.number(),
  updateSellPrice: z.number().optional(),
});

const ProductModal = ({
  open,
  setOpen,
  productData,
  updateLimit,
}: CreateSalesmanModalProps) => {
  const { id, limit, name, sellPrice, stock, buyPrice, updateSellPrice } =
    productData || {};

  const form = useForm({
    resolver: zodResolver(productModalSchema),
    defaultValues: {
      id: id || "",
      name: name || "",
      stock: stock || 0,
      limit: Math.min(limit || 0, stock || 0),
      sellPrice: sellPrice || 0,
      buyPrice: buyPrice || 0,
      updateSellPrice: updateSellPrice || sellPrice || 0,
    },
  });

  // console.log("text-white", form.getValues());

  // Fixed: Use useEffect to set form values when productData changes
  useEffect(() => {
    if (!productData) return;

    form.reset({
      id: id,
      name: name,
      stock: Number(productData?.stock ?? 0),
      limit: Math.min(limit ?? 0, stock ?? 0),
      sellPrice: productData?.updateSellPrice ?? productData?.sellPrice,
      buyPrice: productData?.buyPrice ?? 0,
      updateSellPrice: productData?.updateSellPrice ?? productData?.sellPrice,
    });
  }, [productData, id, name, sellPrice, stock, limit, form]);

  const onSubmit = async (data: z.infer<typeof productModalSchema>) => {
    // console.log("TEst updateLimit", data);

    updateLimit(
      id as string,
      data.limit,
      data?.name,
      data?.stock,
      productData?.sellPrice as number,
      data?.buyPrice as number,
      data?.updateSellPrice,
    );
    setOpen(false);
  };

  // Helper functions for increment/decrement
  const handleDecrease = () => {
    const currentLimit = form.getValues("limit") || 0;
    if (currentLimit > 0) {
      form.setValue("limit", currentLimit - 1);
    }
  };

  const handleIncrease = () => {
    const currentLimit = form.getValues("limit") || 0;
    form.setValue("limit", currentLimit + 1);
  };

  return (
    <DialogWrapper open={open} handleOpen={setOpen} title="Update order">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Update Sell Price */}
          <div className="space-y-2 text-sm">
            <CustomField.Number
              form={form}
              name="updateSellPrice"
              placeholder="Enter sell price"
              labelName="Sell Price"
            />

            {/* Quantity Buttons */}
            <div className="flex justify-between items-end">
              <CustomField.Number
                form={form}
                name="limit"
                placeholder="Enter quantity"
                labelName="Limit"
              />

              <ActionButton
                icon={<MinusIcon className="w-5 h-5" />}
                tooltipContent="Decrease"
                handleOpen={handleDecrease}
                btnStyle="bg-red-500 text-white"
                type="button"
              />

              <ActionButton
                type="button"
                icon={<PlusIcon className="w-5 h-5" />}
                tooltipContent="Increase"
                handleOpen={handleIncrease}
                btnStyle="bg-green-500 text-white"
              />
            </div>

            {/* Add submit button */}
            <div className="pt-4">
              <ActionButton
                buttonContent="Update"
                btnStyle="w-full bg-blue-500 text-white"
                handleOpen={form.handleSubmit(onSubmit, onFormError)}
              />
            </div>
          </div>
        </form>
      </Form>
    </DialogWrapper>
  );
};

export default ProductModal;

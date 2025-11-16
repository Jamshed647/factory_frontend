import ActionButton from "@/components/common/button/actionButton";
import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import { CustomField } from "@/components/common/fields/cusField";
import { Form } from "@/components/ui/custom_ui/form";
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
  updateSellPrice?: number;
  stock: number;
}

interface CreateSalesmanModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  productData: Item | undefined;
  updateLimit: (
    id: string,
    limit: number,
    name: string,
    sellPrice: number,
    stock: number,
  ) => void;
}

const productModalSchema = z
  .object({
    id: z.string().min(1, "Product ID is required"),
    name: z.string().min(1, "Product name is required"),
    sellPrice: z.number().min(0.01, "Sell price must be at least 0.01"),
    stock: z.number().min(0, "Stock must be positive"),
    limit: z.number().min(1, "Quantity must be at least 1"),
    updateSellPrice: z
      .number()
      .min(0.01, "Sell price must be at least 0.01")
      .optional(),
  })
  .refine((data) => data.limit <= data.stock, {
    message: "Quantity cannot exceed available stock",
    path: ["limit"],
  });

const ProductModal = ({
  open,
  setOpen,
  productData,
  updateLimit,
}: CreateSalesmanModalProps) => {
  const { id, limit, name, sellPrice, stock } = (productData as Item) || {};

  const form = useForm<z.infer<typeof productModalSchema>>({
    resolver: zodResolver(productModalSchema),
    defaultValues: {
      id: id,
      name: name,
      sellPrice: sellPrice || 0,
      stock: stock || 0,
      limit: Math.min(limit || 0, stock || 0),
      updateSellPrice: sellPrice || 0,
    },
  });

  // Fixed: Use useEffect to set form values when productData changes
  useEffect(() => {
    if (productData) {
      form.setValue("limit", limit);
      form.setValue("updateSellPrice", sellPrice);
      form.setValue("name", name);
      form.setValue("id", id);
      form.setValue("stock", stock);
    }
  }, [productData, limit, sellPrice, form, name, id, stock]);

  const onSubmit = async (data: z.infer<typeof productModalSchema>) => {
    console.log(data);
    updateLimit(id, data.limit, name, sellPrice, stock);
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
                handleOpen={form.handleSubmit(onSubmit)}
              />
            </div>
          </div>
        </form>
      </Form>
    </DialogWrapper>
  );
};

export default ProductModal;

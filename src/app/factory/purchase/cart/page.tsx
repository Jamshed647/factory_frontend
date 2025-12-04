/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CustomField } from "@/components/common/fields/cusField";
import { CookieCart } from "@/utils/cookie/cart-utils";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import cartSchema, { CartFormType } from "./_assets/schema/cartSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ActionButton from "@/components/common/button/actionButton";
import onFormError from "@/utils/formError";
import { useAuth } from "@/hooks/hooks";
import cartDefaultValue from "./_assets/utils/cartDefaultValue";
import DataFetcher from "@/hooks/fetchDataCollection/hooksExport";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import { useRouter } from "next/navigation";
import usePurchaseInvoiceStore from "@/store/invoiceStore";
import { SelectProductComponent } from "@/components/pageComponents/purchaseProduct/SelectProductComponent";

const CartPage = () => {
  const router = useRouter();
  const cart = CookieCart("purchase_products");
  const supplierCart = CookieCart("supplierInfo");
  const supplier = supplierCart.get();
  const { user } = useAuth();

  const { options: bankOptions, isLoading: isLoadingBank } =
    DataFetcher.fetchBankAccounts({});

  const [selectedProducts, setSelectedProducts] = useState<
    {
      id: string;
      limit: number;
      name: string;
      buyPrice: number;
      stock: number;
      updateBuyPrice?: number;
    }[]
  >(cart.get() || []);

  const products = selectedProducts.map((item) => ({
    productId: item.id,
    quantity: item.limit,
    buyPrice: item.buyPrice,
    updateBuyPrice: item?.updateBuyPrice ?? item.buyPrice,
    totalPrice: item.buyPrice * item.limit,
  }));

  const form = useForm<CartFormType>({
    resolver: zodResolver(cartSchema),
    defaultValues: cartDefaultValue({
      factoryId: user?.factoryId,
      supplierId: supplier?.id,
      purchaserId: user?.id,
      purchaserName: user?.name,
      items: products,
    }),
  });

  const values = form.watch();

  // Total Price
  const totalPrice = selectedProducts?.reduce((sum, item) => {
    const price =
      item.updateBuyPrice != null ? item.updateBuyPrice : (item.buyPrice ?? 0);

    const quantity = item.limit ?? 0;
    return sum + price * quantity;
  }, 0);

  // Discount logic
  const discountAmount =
    values.discountType === "PERCENTAGE"
      ? (totalPrice * (Number(values.discountPercentage) || 0)) / 100
      : Number(values.discountAmount) || 0;

  const purchasePrice = totalPrice - discountAmount;

  const total = purchasePrice + Number(values.extraCharge || 0);

  const isBigAmount =
    Math.abs(total) < Math.abs(supplier?.totalDueAmount || 0) &&
    supplier?.totalDueAmount < 0;

  // Grand total
  // const grandTotal = total + Number(bank?.totalDueAmount || 0);
  const grandTotal = isBigAmount
    ? total
    : total + Number(supplier?.totalDueAmount || 0);

  // Due
  // const due = Number(grandTotal - Number(values.paidAmount || 0) || 0);
  const due = Math.max(0, Number(grandTotal) - Number(values.paidAmount || 0));

  // update values AFTER user/bank loads
  useEffect(() => {
    form.setValue("totalPurchaseAmount", purchasePrice);
    form.setValue("totalAmount", grandTotal);
    form.setValue("currentDueAmount", due);
    form.setValue("discountAmount", discountAmount);
    // if (isBigAmount) {
    //   form.setValue("paidAmount", total);
    // }
    if (user) {
      form.setValue("factoryId", user.factoryId as string);
      form.setValue("purchaserId", user.id as string);
      form.setValue(
        "purchaserName",
        user?.name ??
          (user?.firstName
            ? user.lastName
              ? `${user.firstName} ${user.lastName}`
              : user.firstName
            : (user?.lastName ?? "")),
      );
    }
  }, [
    user,
    form,
    values.discountType,
    discountAmount,
    grandTotal,
    due,
    total,
    totalPrice,
    isBigAmount,
    purchasePrice,
  ]);

  const sellProduct = useApiMutation({
    path: "factory/purchase",
    method: "POST",
    onSuccess: (data: any) => {
      showToast("success", data);
      form.reset({});
      cart.remove();
      supplierCart.remove();
      usePurchaseInvoiceStore.getState().setAll(data.data);
      router.push(`invoice/${data?.data?.invoiceNo}`);
    },
  });

  const handleSubmit = (data: CartFormType) => {
    const { discountPercentage, ...restData } = data;

    //    console.log("TanstackQueries", data);

    if (data?.discountType === "CASH") {
      sellProduct.mutate(restData);
    } else {
      sellProduct.mutate(data);
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit((data) => handleSubmit(data))}
          className="grid grid-cols-1 gap-10 p-8 bg-white rounded-2xl border shadow-lg lg:grid-cols-2"
        >
          {/* Left Fields */}
          <div className="-mt-4 space-y-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Purchase Price Calculation
              </h2>
              {/* <p className="text-sm text-gray-600"> */}
              {/*   Extra charge, discount & advance */}
              {/* </p> */}
            </div>

            {/* Extra Charge */}
            <CustomField.Number
              form={form}
              name="extraCharge"
              labelName="Extra Charge"
              placeholder="Enter extra charge"
            />

            {/* Discount */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Discount</label>

              <div className="flex gap-3 items-center">
                {/* Discount Type */}
                <div className="flex-shrink-0 w-36">
                  <CustomField.SelectField
                    placeholder="Select discount type"
                    form={form}
                    name="discountType"
                    options={[
                      { value: "PERCENTAGE", label: "Percent (%)" },
                      { value: "CASH", label: "Cash (৳)" },
                    ]}
                  />
                </div>

                {/* Discount Value */}
                <div className="flex-grow">
                  {values.discountType === "PERCENTAGE" ? (
                    <CustomField.Number
                      form={form}
                      name="discountPercentage"
                      labelName=""
                      placeholder="Enter discount"
                    />
                  ) : (
                    <CustomField.Number
                      form={form}
                      name="discountAmount"
                      labelName=""
                      placeholder="Enter discount"
                      numberType="float"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Advance */}
            <CustomField.SelectField
              placeholder="Select payment method"
              form={form}
              name="paymentMethod"
              options={[
                { value: "CASH", label: "Cash" },
                { value: "BANK", label: "Bank" },
              ]}
            />

            {/* Bank Account */}
            {form.watch("paymentMethod") === "BANK" && (
              <CustomField.SelectField
                form={form}
                name="bankId"
                isLoading={isLoadingBank}
                options={bankOptions}
                placeholder="Select bank account"
              />
            )}

            <CustomField.Number
              form={form}
              name="paidAmount"
              labelName="Advance"
              placeholder="Enter advance"
            />
            <CustomField.Text
              form={form}
              name="note"
              labelName="Note"
              placeholder="Enter note"
            />
          </div>

          {/* Summary Box */}
          <div className="p-6 space-y-4 rounded-2xl border border-gray-200 shadow-sm h-fit bg-gray-50/70">
            <h3 className="pb-3 text-xl font-semibold border-b">Summary</h3>

            <div className="space-y-3 text-sm">
              <SummaryItem label="Total Product Price" value={purchasePrice} />
              <SummaryItem
                label="Extra Charge"
                value={values.extraCharge || 0}
              />

              <SummaryItem
                label={`Discount ${
                  values.discountType === "PERCENTAGE"
                    ? `(${values.discountPercentage || 0}%)`
                    : ""
                }`}
                value={`-${discountAmount}`}
              />

              <SummaryItem label="Advance" value={values.paidAmount || 0} />
              <SummaryItem
                label="Previous Due"
                value={supplier?.totalDueAmount || 0}
              />

              <SummaryItem label="Total Sell Price" value={grandTotal} />
            </div>

            <hr className="my-2" />

            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Due (Bokeya)</span>
              {/* <span>{due.toFixed(2)}</span> */}
              <span>৳{due}</span>
            </div>

            <ActionButton
              isPending={sellProduct.isPending}
              buttonContent="Sell"
              btnStyle="w-full font-medium text-white bg-blue-600 rounded-lg transition hover:bg-blue-400 !cursor-pointer"
              handleOpen={() =>
                form.handleSubmit((data) => handleSubmit(data), onFormError)
              }
            />
          </div>
        </form>
      </FormProvider>

      {/* Product Selection */}
      <div className="mt-8">
        <SelectProductComponent
          products={selectedProducts}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          isClickable={true}
        />
      </div>
    </>
  );
};

// Summary Item Component
const SummaryItem = ({ label, value }: { label: string; value: any }) => (
  <div className="flex justify-between">
    <span className="text-gray-600">{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);

export default CartPage;

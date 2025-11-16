/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CustomField } from "@/components/common/fields/cusField";
import { SelectProductComponent } from "@/components/pageComponents/sellProduct/SelectProductComponent";
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

const CartPage = () => {
  const cart = CookieCart("selected_products");
  const customerCart = CookieCart("customerInfo");
  const customer = customerCart.get();
  const { user } = useAuth();

  const { options: bankOptions, isLoading: isLoadingBank } =
    DataFetcher.fetchBankAccounts({});

  const [selectedProducts, setSelectedProducts] = useState<
    {
      id: string;
      limit: number;
      name: string;
      sellPrice: number;
      stock: number;
      updateSellPrice?: number;
    }[]
  >(cart.get() || []);

  const products = selectedProducts.map((item) => ({
    productId: item.id,
    quantity: item.limit,
    sellPrice: item.sellPrice,
    updateSellPrice: item?.updateSellPrice ?? item.sellPrice,
    totalPrice: item.sellPrice * item.limit,
  }));

  const form = useForm<CartFormType>({
    resolver: zodResolver(cartSchema),
    defaultValues: cartDefaultValue({
      factoryId: user?.factoryId,
      customerId: customer?.id,
      sellerId: user?.id,
      sellerName: user?.name,
      items: products,
    }),
  });

  const values = form.watch();

  // Total Price
  const totalPrice = selectedProducts?.reduce((sum, item) => {
    const price =
      item.updateSellPrice != null
        ? item.updateSellPrice
        : (item.sellPrice ?? 0);
    const quantity = item.limit ?? 0;
    return sum + price * quantity;
  }, 0);

  // Discount logic
  const discountAmount =
    values.discountType === "PERCENTAGE"
      ? (totalPrice * (Number(values.discountPercentage) || 0)) / 100
      : Number(values.discountAmount) || 0;

  // Grand total
  const grandTotal =
    totalPrice + Number(values.extraCharge || 0) - discountAmount;

  // Due
  const due =
    grandTotal - Number(values.paidAmount || 0) + customer?.totalDueAmount || 0;

  // update values AFTER user/customer loads
  useEffect(() => {
    if (user) {
      form.setValue("factoryId", user.factoryId as string);
      form.setValue("discountAmount", discountAmount);
      form.setValue("sellerId", user.id as string);
      form.setValue("totalSaleAmount", grandTotal);
      form.setValue(
        "sellerName",
        user?.name || user?.firstName + " " + user?.lastName,
      );
    }
  }, [user, form, values.discountType, discountAmount, grandTotal]);

  const sellProduct = useApiMutation({
    path: "factory/sale",
    method: "POST",
    onSuccess: (data: any) => {
      showToast("success", data);
    },
  });

  const handleSubmit = (data: CartFormType) => {
    const { discountPercentage, ...restData } = data;

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
          <div className="space-y-7">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Price Calculation
              </h2>
              <p className="text-sm text-gray-600">
                Extra charge, discount & advance
              </p>
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
                name="bankAccount"
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
          </div>

          {/* Summary Box */}
          <div className="p-6 space-y-4 rounded-2xl border border-gray-200 shadow-sm h-fit bg-gray-50/70">
            <h3 className="pb-3 text-xl font-semibold border-b">Summary</h3>

            <div className="space-y-3 text-sm">
              <SummaryItem label="Total Product Price" value={totalPrice} />
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
                value={customer?.totalDueAmount || 0}
              />

              <SummaryItem label="Total Sell Price" value={grandTotal} />
            </div>

            <hr className="my-2" />

            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Due (Bokeya)</span>
              <span>{due}</span>
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

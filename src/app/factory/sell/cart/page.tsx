/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CustomField } from "@/components/common/fields/cusField";
import { SelectProductComponent } from "@/components/pageComponents/sellProduct/SelectProductComponent";
import { CookieCart } from "@/utils/cookie/cart-utils";
import { useEffect, useMemo, useState } from "react";
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

const CartPage = () => {
  const cart = CookieCart("selected_products");
  const customerCart = CookieCart("customerInfo");
  const customerInfo = customerCart.get();
  const customer = Array.isArray(customerInfo)
    ? customerInfo.length === 0
      ? null
      : customerInfo
    : customerInfo && typeof customerInfo === "object" && customerInfo;

  const { user } = useAuth();
  const router = useRouter();

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

  const products = useMemo(
    () =>
      selectedProducts.map((item) => ({
        productId: item.id,
        quantity: item.limit,
        sellPrice: item.sellPrice,
        updateSellPrice: item?.updateSellPrice ?? item.sellPrice,
        totalPrice: item.sellPrice * item.limit,
      })),
    [selectedProducts],
  );

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

  const totalPrice = useMemo(
    () =>
      selectedProducts?.reduce((sum, item) => {
        const price =
          item.updateSellPrice != null
            ? item.updateSellPrice
            : (item.sellPrice ?? 0);
        const quantity = item.limit ?? 0;
        return sum + price * quantity;
      }, 0),
    [selectedProducts],
  );

  const discountAmount = useMemo(
    () =>
      values.discountType === "PERCENTAGE"
        ? (totalPrice * (Number(values.discountPercentage) || 0)) / 100
        : Number(values.discountAmount) || 0,
    [
      totalPrice,
      values.discountType,
      values.discountPercentage,
      values.discountAmount,
    ],
  );

  const sellPrice = useMemo(
    () => totalPrice - discountAmount,
    [totalPrice, discountAmount],
  );

  const total = useMemo(
    () => sellPrice + Number(values.extraCharge || 0),
    [sellPrice, values.extraCharge],
  );

  const isBigAmount = useMemo(
    () =>
      Math.abs(total) < Math.abs(customer?.totalDueAmount || 0) &&
      customer?.totalDueAmount < 0,
    [total, customer?.totalDueAmount],
  );

  const grandTotal = useMemo(
    () => (isBigAmount ? total : total + Number(customer?.totalDueAmount || 0)),
    [isBigAmount, total, customer?.totalDueAmount],
  );

  const due = useMemo(
    () =>
      customer
        ? Math.max(0, Number(grandTotal) - Number(values.paidAmount || 0))
        : 0,
    [customer, grandTotal, values.paidAmount],
  );

  // Effect 1: Initialize user data on mount only
  useEffect(() => {
    if (user && !form.getValues("sellerId")) {
      form.setValue("factoryId", user.factoryId as string);
      form.setValue("sellerId", user.id as string);

      form.setValue(
        "sellerName",
        user?.name?.trim() ||
          [user?.firstName, user?.lastName].filter(Boolean).join(" "),
      );
    }
  }, [user, form]);

  // Effect 2: Set initial paidAmount for empty customer
  useEffect(() => {
    if (!customer || customer === "empty") {
      form.setValue("paidAmount", total);
    }
  }, [customer, total, form]);

  const sellProduct = useApiMutation({
    path: "factory/sale",
    method: "POST",
    onSuccess: (data: any) => {
      showToast("success", data);
      form.reset({});
      cart.remove();
      customerCart.remove();
      router.push(`invoice/${data?.data?.id}`);
    },
  });

  const onSubmit = (data: CartFormType) => {
    const { discountPercentage, ...restData } = data;

    const submissionData = {
      ...restData,
      sellerName:
        user?.name?.trim() ||
        [user?.firstName, user?.lastName].filter(Boolean).join(" "),
      totalSaleAmount: sellPrice,
      totalAmount: grandTotal,
      currentDueAmount: due,
      discountAmount: discountAmount,
      items: products,
    };

    // console.log("Test SelectProductComponent", selectedProducts);

    if (data?.discountType === "CASH") {
      sellProduct.mutate(submissionData);
    } else {
      sellProduct.mutate({ ...submissionData, discountPercentage });
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-10 p-8 bg-white rounded-2xl border shadow-lg lg:grid-cols-2"
        >
          {/* Left Fields */}
          <div className="-mt-4 space-y-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Sell Price Calculation
              </h2>
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

            {/* Payment Method */}
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
              <SummaryItem label="Total Product Price" value={sellPrice} />
              <SummaryItem
                label="Extra Charge"
                value={values.extraCharge || 0}
              />

              <SummaryItem
                label={`Discount ${values.discountType === "PERCENTAGE" ? `(${values.discountPercentage || 0}%)` : ""}`}
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
              <span>৳{due}</span>
            </div>

            <ActionButton
              isPending={sellProduct.isPending}
              buttonContent="Sell"
              btnStyle="w-full font-medium text-white bg-blue-600 rounded-lg transition hover:bg-blue-400 !cursor-pointer"
              type="submit"
              handleOpen={form.handleSubmit(onSubmit, onFormError)}
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

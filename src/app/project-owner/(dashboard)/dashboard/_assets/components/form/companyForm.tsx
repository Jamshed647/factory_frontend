/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ActionButton from "@/components/common/button/actionButton";
import { CustomField } from "@/components/common/fields/cusField";
import onFormError from "@/utils/formError";
import { FormProvider, UseFormReturn } from "react-hook-form";

interface CompanyFormComponentProps<T extends Record<string, any>> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  isPending: boolean;
  operation?: "update" | "create";
}
export default function CompanyFormComponent<T extends Record<string, any>>({
  form,
  onSubmit,
  isPending,
  operation = "create",
}: CompanyFormComponentProps<T>) {
  // const [isOtpSent, setIsOtpSent] = useState(data ? true : false);

  // const isPhoneChanged = companyForm.formState.dirtyFields.phone;

  // const submitOTP = useApiMutation({
  //   path: "api/v1/auth/company/otp",
  //   method: "POST",
  //   onSuccess: (data) => {
  //     showToast("success", data);
  //     setIsOtpSent(true);
  //   },
  // });

  // useEffect(() => {
  //   if (isPhoneChanged) {
  //     setIsOtpSent(false);
  //   }
  // }, [isPhoneChanged]);

  // const handleSendOtp = async () => {
  //   const isValid = await companyForm.trigger("phone");
  //   if (!isValid) return;
  //
  //   const phone = companyForm.getValues("phone");
  //   //submitOTP.mutate({ phone });
  //   setIsOtpSent(true);
  // };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onFormError)}
        className="space-y-6 w-full"
      >
        <CustomField.Text
          name="name"
          labelName="Company Name"
          placeholder="Enter your company name"
          form={form}
          optional={false}
        />
        <CustomField.Text
          name="address"
          labelName="Address"
          placeholder="Enter your address"
          form={form}
        />
        <CustomField.Text
          name="email"
          labelName="Email"
          placeholder="Enter your email"
          form={form}
        />
        <CustomField.Text
          name="phone"
          labelName="Phone Number"
          placeholder="Enter your phone number"
          form={form}
          optional={false}
        />
        {operation === "create" && (
          <>
            <CustomField.NumberText
              name="pinCode"
              maxLength={4}
              labelName="Pin-code"
              placeholder="Enter your pin-code"
              form={form}
              optional={false}
            />

            <CustomField.NumberText
              name="confirmPinCode"
              maxLength={4}
              labelName="Confirm Pin-code"
              placeholder="Enter your confirm pin-code"
              form={form}
              optional={false}
            />
          </>
        )}

        <ActionButton
          buttonContent={operation}
          type="submit"
          isPending={isPending}
          handleOpen={form.handleSubmit(onSubmit)}
          btnStyle="w-full bg-green-500 text-white"
        />

        {/* {isOtpSent && ( */}
        {/*   <> */}
        {/*     {(!data || isPhoneChanged) && ( */}
        {/*       <CustomField.OTP */}
        {/*         name="pincode" */}
        {/*         maxLength={4} */}
        {/*         labelName="Pin-code" */}
        {/*         placeholder="Enter your pin-code" */}
        {/*         form={companyForm} */}
        {/*         optional={false} */}
        {/*       /> */}
        {/*     )} */}
        {/**/}
        {/*     <ActionButton */}
        {/*       buttonContent="Create" */}
        {/*       type="submit" */}
        {/*       isPending={createUser.isPending} */}
        {/*       handleOpen={companyForm.handleSubmit(onSubmit)} */}
        {/*       btnStyle="w-full bg-green-500 text-white" */}
        {/*     /> */}
        {/*   </> */}
        {/* )} */}

        {/* {!isOtpSent && ( */}
        {/*   <ActionButton */}
        {/*     buttonContent="Send OTP" */}
        {/*     type="button" */}
        {/*     isPending={submitOTP.isPending} */}
        {/*     handleOpen={handleSendOtp} */}
        {/*     btnStyle="w-full bg-blue-500 text-white" */}
        {/*   /> */}
        {/* )} */}
      </form>
    </FormProvider>
  );
}

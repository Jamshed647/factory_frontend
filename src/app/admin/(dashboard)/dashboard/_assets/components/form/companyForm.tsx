"use client";

import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import ActionButton from "@/components/common/button/actionButton";
import { CustomField } from "@/components/common/fields/cusField";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import onFormError from "@/utils/formError";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { CompanyFormType, companySchema } from "../../schema/companySchema";
import { companyDefaultValue } from "../../utils/companyDefaultValue";
import { useEffect, useState } from "react";

export default function CompanyFormComponent({
  data,
}: {
  data?: CompanyFormType;
}) {
  const [isOtpSent, setIsOtpSent] = useState(data ? true : false);
  const companyForm = useForm<CompanyFormType>({
    resolver: zodResolver(companySchema),
    defaultValues: companyDefaultValue(data),
  });

  const isPhoneChanged = companyForm.formState.dirtyFields.phone;

  const createUser = useApiMutation({
    path: "api/v1/auth/company",
    method: "POST",
    onSuccess: (data) => {
      showToast("success", data);
    },
  });

  const submitOTP = useApiMutation({
    path: "api/v1/auth/company/otp",
    method: "POST",
    onSuccess: (data) => {
      showToast("success", data);
      setIsOtpSent(true);
    },
  });

  useEffect(() => {
    if (isPhoneChanged) {
      setIsOtpSent(false);
    }
  }, [isPhoneChanged]);

  const handleSendOtp = async () => {
    const isValid = await companyForm.trigger("phone");
    if (!isValid) return;

    const phone = companyForm.getValues("phone");
    //submitOTP.mutate({ phone });
    setIsOtpSent(true);
  };

  const onSubmit = (data: CompanyFormType) => {
    createUser.mutate(data);
  };

  return (
    <FormProvider {...companyForm}>
      <form
        onSubmit={companyForm.handleSubmit(onSubmit, onFormError)}
        className="space-y-6 w-full"
      >
        <CustomField.Text
          name="name"
          labelName="Company Name"
          placeholder="Enter your company name"
          form={companyForm}
          optional={false}
        />
        <CustomField.Text
          name="address"
          labelName="Address"
          placeholder="Enter your address"
          form={companyForm}
        />
        <CustomField.Text
          name="email"
          labelName="Email"
          placeholder="Enter your email"
          form={companyForm}
        />
        <CustomField.Text
          name="phone"
          labelName="Phone Number"
          placeholder="Enter your phone number"
          form={companyForm}
          optional={false}
        />
        {isOtpSent && (
          <>
            {(!data || isPhoneChanged) && (
              <CustomField.OTP
                name="pincode"
                maxLength={4}
                labelName="Pin-code"
                placeholder="Enter your pin-code"
                form={companyForm}
                optional={false}
              />
            )}

            <ActionButton
              buttonContent="Create"
              type="submit"
              isPending={createUser.isPending}
              handleOpen={companyForm.handleSubmit(onSubmit)}
              btnStyle="w-full bg-green-500 text-white"
            />
          </>
        )}

        {!isOtpSent && (
          <ActionButton
            buttonContent="Send OTP"
            type="button"
            isPending={submitOTP.isPending}
            handleOpen={handleSendOtp}
            btnStyle="w-full bg-blue-500 text-white"
          />
        )}
      </form>
    </FormProvider>
  );
}

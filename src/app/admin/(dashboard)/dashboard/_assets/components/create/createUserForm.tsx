"use client";

import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import {
  RegisterFormType,
  registerSchema,
} from "@/components/auth/schema/register-schema";
import ActionButton from "@/components/common/button/actionButton";
import { CustomField } from "@/components/common/fields/cusField";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { Form } from "@/components/ui/custom_ui/form";
import onFormError from "@/utils/formError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

type RegisterFormData = RegisterFormType;

export default function CreateUser() {
  const registerForm = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
  });

  const createUser = useApiMutation({
    path: "api/v1/auth/company",
    method: "POST",
    onSuccess: (data) => {
      showToast("success", data);
    },
  });

  const phone = useWatch({ name: "phone" });

  const submitOTP = async (phone: string) => {
    console.log("pincode", phone);
  };

  const onSubmit = (data: RegisterFormData) => {
    const { confirmPassword, ...payload } = data;
    createUser.mutate(payload);
  };

  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(onSubmit, onFormError)}
        className="space-y-6 w-full"
      >
        <CustomField.Text
          name="name"
          labelName="Company Name"
          placeholder="Enter your company name"
          form={registerForm}
          optional={false}
        />
        <CustomField.Text
          name="address"
          labelName="Address"
          placeholder="Enter your address"
          form={registerForm}
        />
        <CustomField.Text
          name="email"
          labelName="Email"
          placeholder="Enter your email"
          form={registerForm}
        />
        <div>
          <CustomField.Text
            name="phone"
            labelName="Phone Number"
            placeholder="Enter your phone number"
            form={registerForm}
            optional={false}
          />

          {phone && (
            <ActionButton
              buttonContent="Send OTP"
              type="submit"
              isPending={createUser.isPending}
              handleOpen={registerForm.handleSubmit(onSubmit)}
              btnStyle="w-full bg-green-500 text-white"
            />
          )}
        </div>

        <CustomField.OTP
          name="pincode"
          maxLength={4}
          labelName="Pin-code"
          placeholder="Enter your pin-code"
          form={registerForm}
          optional={false}
        />

        <CustomField.Password
          name="password"
          labelName="Password"
          placeholder="Enter your password"
          form={registerForm}
          optional={false}
        />
        <CustomField.Password
          name="confirmPassword"
          labelName="Confirm Password"
          placeholder="Confirm your password"
          form={registerForm}
          optional={false}
        />

        <ActionButton
          buttonContent="Create"
          type="submit"
          isPending={createUser.isPending}
          handleOpen={registerForm.handleSubmit(onSubmit)}
          btnStyle="w-full bg-green-500 text-white"
        />
      </form>
    </Form>
  );
}

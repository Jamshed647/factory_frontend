"use client";

import {
  RegisterFormType,
  registerSchema,
} from "@/components/auth/schema/register-schema";
import ActionButton from "@/components/common/button/actionButton";
import { CustomField } from "@/components/common/fields/cusField";
import { Form } from "@/components/ui/custom_ui/form";
import { useAuth } from "@/hooks/hooks";
import onFormError from "@/utils/formError";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

type RegisterFormData = RegisterFormType;

export default function RegisterPage() {
  const { register, isLoading } = useAuth();

  const registerForm = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    const { confirmPassword, ...payload } = data;
    register(payload);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-400 to-teal-500">
      <Form {...registerForm}>
        <form
          onSubmit={registerForm.handleSubmit(onSubmit, onFormError)}
          className="p-8 space-y-6 w-full max-w-sm bg-white rounded-xl shadow-lg"
        >
          <h1 className="mb-6 text-2xl font-bold text-center">Register</h1>

          <CustomField.Text
            name="firstName"
            labelName="First Name"
            placeholder="Enter your first name"
            form={registerForm}
            optional={false}
          />
          <CustomField.Text
            name="lastName"
            labelName="Last Name"
            placeholder="Enter your last name"
            form={registerForm}
          />
          <CustomField.Text
            name="email"
            labelName="Email"
            placeholder="Enter your email"
            form={registerForm}
          />
          <CustomField.Text
            name="phone"
            labelName="Phone Number"
            placeholder="Enter your phone number"
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
            buttonContent="Register"
            type="submit"
            isPending={isLoading}
            handleOpen={registerForm.handleSubmit(onSubmit)}
            btnStyle="w-full bg-green-500 text-white"
          />

          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-green-500 underline">
              Login
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}

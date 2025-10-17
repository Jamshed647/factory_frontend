"use client";

import { useAuth } from "@/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  LoginFormType,
  loginSchema,
} from "@/components/auth/schema/login-schema";
import { Form } from "@/components/ui/custom_ui/form";
import { CustomField } from "@/components/common/fields/cusField";
import ActionButton from "@/components/common/button/actionButton";
import onFormError from "@/utils/formError";
import Link from "next/link";

export default function LoginPage() {
  const { login, isLoggingIn } = useAuth();

  const loginForm = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormType) => {
    login(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-500">
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmit, onFormError)}
          className="p-8 space-y-4 w-full max-w-sm bg-white rounded-xl shadow-lg"
        >
          <h1 className="mb-6 text-2xl font-bold text-center">Login</h1>

          <CustomField.Text
            name="phone"
            labelName="Phone Number"
            placeholder="Enter your phone number"
            form={loginForm}
          />
          <CustomField.Text
            name="password"
            labelName="Password"
            placeholder="Enter your password"
            form={loginForm}
          />
          <ActionButton
            buttonContent="Login"
            type="submit"
            isPending={isLoggingIn}
            handleOpen={loginForm.handleSubmit(onSubmit)}
            btnStyle="w-full bg-blue-500 text-white"
          />

          <p className="mt-4 text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-500 underline">
              Register
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}

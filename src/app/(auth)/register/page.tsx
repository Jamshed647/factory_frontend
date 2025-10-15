"use client";

import {
  RegisterFormType,
  registerSchema,
} from "@/components/auth/schema/register-schema";
import { useAuth } from "@/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type RegisterFormData = RegisterFormType;

export default function RegisterPage() {
  const { register: registerUser, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("Registering user...", data);
    // registerUser({
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   email: data.email,
    //   password: data.password,
    // });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-400 to-teal-500">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 w-full max-w-sm bg-white rounded-xl shadow-lg"
      >
        <h1 className="mb-6 text-2xl font-bold text-center">Register</h1>

        <input
          type="text"
          placeholder="First Name"
          {...register("firstName")}
          className="p-3 mb-2 w-full rounded border focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
        {errors.firstName && (
          <p className="mb-2 text-sm text-red-500">
            {errors.firstName.message}
          </p>
        )}

        <input
          type="text"
          placeholder="Last Name (optional)"
          {...register("lastName")}
          className="p-3 mb-2 w-full rounded border focus:ring-2 focus:ring-green-400 focus:outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="p-3 mb-2 w-full rounded border focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
        {errors.email && (
          <p className="mb-2 text-sm text-red-500">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="p-3 mb-2 w-full rounded border focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
        {errors.password && (
          <p className="mb-2 text-sm text-red-500">{errors.password.message}</p>
        )}

        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          className="p-3 mb-2 w-full rounded border focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
        {errors.confirmPassword && (
          <p className="mb-2 text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="p-3 w-full text-white bg-green-500 rounded transition hover:bg-green-600"
        >
          {isLoading ? "Loading..." : "Register"}
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-green-500 underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

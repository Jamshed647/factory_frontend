"use client";

import { useAuth } from "@/hooks/hooks";
import { getFactoryInfo } from "./cookie/companyFactoryCookie";

export type IFactoryInfo = {
  id: string;
  name?: string;
  address?: string;
  status?: "ACTIVE" | "INACTIVE";
};

export type UseFactoryReturn = {
  factory: IFactoryInfo;
  isLoading: boolean;
};

export const useFactory = (): UseFactoryReturn => {
  const { user, isLoading: authLoading } = useAuth();

  if (authLoading || !user)
    return {
      factory: { id: "", name: "", address: "", status: "INACTIVE" },
      isLoading: true,
    };

  const factoryInfo = getFactoryInfo();

  const factory = ["PROJECT_OWNER", "COMPANY_OWNER"].includes(user.role)
    ? factoryInfo
    : user.factory;

  return { factory, isLoading: false };
};

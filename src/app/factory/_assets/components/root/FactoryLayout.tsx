/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import LayoutContainer from "@/components/layout/LayoutContainer";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import Link from "next/link";
import { PieChartOutlined } from "@ant-design/icons";
import { BanknoteX, Factory, PackageOpen, PackageSearch } from "lucide-react";
import { Protected } from "@/components/auth/protected-route";
import { useAuth } from "@/hooks/hooks";
import { UserRole } from "@/types/user";
import type { MenuProps } from "antd";
import { getSwitchedRole } from "@/utils/cookie/companyFactoryCookie";
import { isAccessRole, isAdminRole } from "@/utils/roleUtils";

// Use a distinct type alias name to avoid conflict
type AntdMenuItem = Exclude<
  Required<MenuProps>["items"][number],
  null | undefined
>;

export default function FactoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const switchedRole = getSwitchedRole();

  const role = isAdminRole(user?.role)
    ? (switchedRole as UserRole)
    : (user?.role as UserRole);

  // Use AntdMenuItem instead of MenuItem
  const menuItems: AntdMenuItem[] = [
    ...(isAccessRole(role)
      ? ([
          {
            key: "/factory/manager/dashboard",
            icon: <PieChartOutlined />,
            label: <Link href="/factory/manager/dashboard">Dashboard</Link>,
          },
          {
            key: "/factory/manager",
            icon: <Factory />,
            label: (
              <Link href="/factory/manager/managerList">Manager List</Link>
            ),
          },
          {
            key: "/factory/manager/sellProduct",
            icon: <PackageSearch />,
            label: (
              <Link href="/factory/manager/sellProduct">Sell Product</Link>
            ),
          },
          {
            key: "/factory/manager/purchaseProduct",
            icon: <PackageSearch />,
            label: (
              <Link href="/factory/manager/purchaseProduct">
                Purchase Product
              </Link>
            ),
          },
          {
            key: "/factory/manager/employee",
            icon: <PieChartOutlined />,
            label: <Link href="/factory/manager/employee">Employees</Link>,
          },
          {
            key: "/factory/manager/salesman",
            icon: <Factory />,
            label: <Link href="/factory/manager/salesman">Salesman</Link>,
          },
          {
            key: "/factory/manager/production",
            icon: <PackageOpen />,
            label: <Link href="/factory/manager/production">Production</Link>,
          },
        ] as AntdMenuItem[])
      : []),

    {
      key: "/factory/bank",
      icon: <BanknoteX />,
      label: <Link href="/factory/bank">Bank</Link>,
    },
    {
      key: "/factory/customer",
      icon: <Factory />,
      label: <Link href="/factory/bank">Customer</Link>,
    },
    {
      key: "/factory/supplier",
      icon: <Factory />,
      label: <Link href="/factory/supplier">Supplier</Link>,
    },
    {
      key: "/factory/sell",
      icon: <Factory />,
      label: <Link href="/factory/sell">Sell</Link>,
    },
    {
      key: "/factory/purchase",
      icon: <Factory />,
      label: <Link href="/factory/purchase">Purchase</Link>,
    },

    ...(role === "EMPLOYEE"
      ? ([
          {
            key: "/factory/employee/dashboard",
            icon: <PieChartOutlined />,
            label: <Link href="/factory/employee/dashboard">Dashboard</Link>,
          },
          {
            key: "/factory/employee-work",
            icon: <PieChartOutlined />,
            label: <Link href="/factory/employee/work">Employee Work</Link>,
          },
        ] as AntdMenuItem[])
      : []),
    ...(role === "SALESMAN"
      ? ([
          {
            key: "/factory/salesman/dashboard",
            icon: <PieChartOutlined />,
            label: <Link href="/factory/salesman/dashboard">Dashboard</Link>,
          },
          {
            key: "/factory/salesman/work",
            icon: <PieChartOutlined />,
            label: <Link href="/factory/salesman/work">Salesman Work</Link>,
          },
        ] as AntdMenuItem[])
      : []),
  ];

  return (
    <Protected roles={role as UserRole}>
      <LayoutContainer
        Sidebar={Sidebar}
        HeaderBar={<HeaderBar />}
        // Type cast once here to avoid type mismatch
        menuItems={menuItems as any}
      >
        {children}
      </LayoutContainer>
    </Protected>
  );
}

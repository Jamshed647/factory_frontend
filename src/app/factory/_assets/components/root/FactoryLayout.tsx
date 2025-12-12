"use client";
import LayoutContainer from "@/components/layout/LayoutContainer";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import Link from "next/link";
import { PieChartOutlined } from "@ant-design/icons";
import {
  BadgeDollarSign,
  BanknoteX,
  Factory,
  HandCoins,
  Landmark,
  PackageOpen,
  PackageSearch,
} from "lucide-react";
import { Protected } from "@/components/auth/protected-route";
import { useAuth } from "@/hooks/hooks";
import { UserRole } from "@/types/user";
import type { MenuProps } from "antd";
import { getSwitchedRole } from "@/utils/cookie/companyFactoryCookie";
import { isAccessRole, isAdminRole } from "@/utils/roleUtils";
import { useLanguage } from "@/hooks/useLanguage";

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
  const { t } = useLanguage();

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
            label: <Link href="/factory/manager/dashboard">{t.dashboard}</Link>,
          },
          {
            key: "/factory/manager/managerList",
            icon: <Factory />,
            label: (
              <Link href="/factory/manager/managerList">{t.managerList}</Link>
            ),
          },
          {
            key: "/factory/manager/sellProduct",
            icon: <PackageSearch />,
            label: (
              <Link href="/factory/manager/sellProduct">{t.sellProduct}</Link>
            ),
          },
          {
            key: "/factory/manager/purchaseProduct",
            icon: <PackageSearch />,
            label: (
              <Link href="/factory/manager/purchaseProduct">
                {t.purchaseProduct}
              </Link>
            ),
          },
          {
            key: "/factory/manager/employee",
            icon: <PieChartOutlined />,
            label: <Link href="/factory/manager/employee">{t.employees}</Link>,
          },
          {
            key: "/factory/manager/salesman",
            icon: <Factory />,
            label: <Link href="/factory/manager/salesman">{t.salesman}</Link>,
          },
          {
            key: "/factory/manager/production",
            icon: <PackageOpen />,
            label: (
              <Link href="/factory/manager/production">{t.production}</Link>
            ),
          },
        ] as AntdMenuItem[])
      : []),

    {
      key: "/factory/accounting",
      icon: <BanknoteX />,
      label: <Link href="/factory/accounting">{t.accounting}</Link>,
    },
    {
      key: "/factory/bank",
      icon: <Landmark />,
      label: <Link href="/factory/bank">{t.bank}</Link>,
    },
    {
      key: "/factory/cash",
      icon: <HandCoins />,
      label: <Link href="/factory/cash">{t.cash}</Link>,
    },
    {
      key: "/factory/expense",
      icon: <BadgeDollarSign />,
      label: <Link href="/factory/expense">{t.expense}</Link>,
    },
    {
      key: "/factory/customer",
      icon: <Factory />,
      label: <Link href="/factory/customer">{t.customer}</Link>,
    },
    {
      key: "/factory/supplier",
      icon: <Factory />,
      label: <Link href="/factory/supplier">{t.supplier}</Link>,
    },
    {
      key: "/factory/sell",
      icon: <Factory />,
      label: <Link href="/factory/sell">{t.sell}</Link>,
    },
    {
      key: "/factory/purchase",
      icon: <Factory />,
      label: <Link href="/factory/purchase">{t.purchase}</Link>,
    },

    ...(role === "EMPLOYEE"
      ? ([
          {
            key: "/factory/employee/dashboard",
            icon: <PieChartOutlined />,
            label: (
              <Link href="/factory/employee/dashboard">{t.dashboard}</Link>
            ),
          },
          {
            key: "/factory/employee-work",
            icon: <PieChartOutlined />,
            label: <Link href="/factory/employee/work">{t.employeeWork}</Link>,
          },
        ] as AntdMenuItem[])
      : []),
    ...(role === "SALESMAN"
      ? ([
          {
            key: "/factory/salesman/dashboard",
            icon: <PieChartOutlined />,
            label: (
              <Link href="/factory/salesman/dashboard">{t.dashboard}</Link>
            ),
          },
          {
            key: "/factory/salesman/work",
            icon: <PieChartOutlined />,
            label: <Link href="/factory/salesman/work">{t.salesmanWork}</Link>,
          },
        ] as AntdMenuItem[])
      : []),
  ];

  return (
    <Protected roles={role as UserRole}>
      <LayoutContainer
        Sidebar={Sidebar}
        HeaderBar={<HeaderBar />}
        menuItems={menuItems}
      >
        {children}
      </LayoutContainer>
    </Protected>
  );
}

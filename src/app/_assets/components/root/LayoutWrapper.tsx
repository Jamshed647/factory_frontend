/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import LayoutContainer from "@/components/layout/LayoutContainer";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import Link from "next/link";
import { PieChartOutlined } from "@ant-design/icons";
import { Factory } from "lucide-react";
import { useAuth } from "@/hooks/hooks";
import type { MenuProps } from "antd";
import { useLanguage } from "@/hooks/useLanguage";

// Use a distinct type alias name to avoid conflict
type AntdMenuItem = Exclude<
  Required<MenuProps>["items"][number],
  null | undefined
>;

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const { t } = useLanguage();

  // Use AntdMenuItem instead of MenuItem
  const menuItems: AntdMenuItem[] = [
    {
      key: "/dashboard",
      icon: <PieChartOutlined />,
      label: <Link href="/dashboard">{t.dashboard}</Link>,
    },
    ...(user?.role === "MANAGER"
      ? ([
        {
          key: "/factory/manager",
          icon: <Factory />,
          label: <Link href="/factory/manager">Manager</Link>,
        },
        {
          key: "/factory/employees",
          icon: <PieChartOutlined />,
          label: <Link href="/factory/employees">{t.employees}</Link>,
        },
        {
          key: "/factory/salesman",
          icon: <Factory />,
          label: <Link href="/factory/salesman">{t.salesman}</Link>,
        },
      ] as AntdMenuItem[])
      : []),
    ...(user?.role === "EMPLOYEE"
      ? ([
        {
          key: "/factory/employee-work",
          icon: <PieChartOutlined />,
          label: <Link href="/factory/employee-work">{t.employeeWork}</Link>,
        },
      ] as AntdMenuItem[])
      : []),
    ...(user?.role === "SALESMAN"
      ? ([
        {
          key: "/factory/salesman-work",
          icon: <PieChartOutlined />,
          label: <Link href="/factory/salesman-work">{t.salesmanWork}</Link>,
        },
      ] as AntdMenuItem[])
      : []),
  ];

  return (
    <LayoutContainer
      Sidebar={Sidebar}
      HeaderBar={<HeaderBar />}
      // Type cast once here to avoid type mismatch
      menuItems={menuItems as any}
    >
      {children}
    </LayoutContainer>
  );
}

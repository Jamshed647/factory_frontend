/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import LayoutContainer from "@/components/layout/LayoutContainer";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import Link from "next/link";
import { PieChartOutlined } from "@ant-design/icons";
import { Factory } from "lucide-react";
import { Protected } from "@/components/auth/protected-route";
import { useAuth } from "@/hooks/hooks";
import { UserRole } from "@/types/user";
import type { MenuProps } from "antd";

// ✅ Use a distinct type alias name to avoid conflict
type AntdMenuItem = Exclude<
  Required<MenuProps>["items"][number],
  null | undefined
>;

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  // ✅ Use AntdMenuItem instead of MenuItem
  const menuItems: AntdMenuItem[] = [
    {
      key: "/factory/dashboard",
      icon: <PieChartOutlined />,
      label: <Link href="/factory/dashboard">Dashboard</Link>,
    },
    ...(user?.role === "MANAGER"
      ? ([
          {
            key: "/factory/employees",
            icon: <PieChartOutlined />,
            label: <Link href="/factory/employees">Employees</Link>,
          },
          {
            key: "/factory/salesman",
            icon: <Factory />,
            label: <Link href="/factory/salesman">Salesman</Link>,
          },
        ] as AntdMenuItem[])
      : []),
    ...(user?.role === "EMPLOYEE"
      ? ([
          {
            key: "/factory/employee-work",
            icon: <PieChartOutlined />,
            label: <Link href="/factory/employee-work">Employee Work</Link>,
          },
        ] as AntdMenuItem[])
      : []),
    ...(user?.role === "SALESMAN"
      ? ([
          {
            key: "/factory/salesman-work",
            icon: <PieChartOutlined />,
            label: <Link href="/factory/salesman-work">Salesman Work</Link>,
          },
        ] as AntdMenuItem[])
      : []),
  ];

  return (
    <Protected roles={user?.role as UserRole}>
      <LayoutContainer
        Sidebar={Sidebar}
        HeaderBar={<HeaderBar role="manager" />}
        // ✅ Type cast once here to avoid type mismatch
        menuItems={menuItems as any}
      >
        {children}
      </LayoutContainer>
    </Protected>
  );
}

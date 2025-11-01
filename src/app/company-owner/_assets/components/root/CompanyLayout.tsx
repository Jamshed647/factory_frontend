"use client";
import LayoutContainer from "@/components/layout/LayoutContainer";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import Link from "next/link";
import { PieChartOutlined } from "@ant-design/icons";
import { Factory, Users } from "lucide-react";
import { Protected } from "@/components/auth/protected-route";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = [
    {
      key: "/company-owner/dashboard",
      icon: <PieChartOutlined />,
      label: <Link href="/company-owner/dashboard">Dashboard</Link>,
    },
    {
      key: "/company-owner/factory",
      icon: <Factory />,
      label: <Link href="/company-owner/factory">Factory</Link>,
    },
    {
      key: "/company-owner/manager",
      icon: <Factory />,
      label: <Link href="/company-owner/manager">Manager</Link>,
    },
    {
      key: "/company-owner/user-management",

      icon: <Users />,
      label: "User Management",
      children: [
        {
          key: "/company-owner/user-management/employee",
          label: (
            <Link href="/company-owner/user-management/employee">Employee</Link>
          ),
        },
        {
          key: "/company-owner/user-management/salesman",
          label: (
            <Link href="/company-owner/user-management/salesman">Salesman</Link>
          ),
        },
      ],
    },
  ];

  return (
    <Protected roles="COMPANY_OWNER">
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

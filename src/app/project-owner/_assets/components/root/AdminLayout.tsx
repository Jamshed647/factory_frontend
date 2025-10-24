"use client";
import LayoutContainer from "@/components/layout/LayoutContainer";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import Link from "next/link";
import { PieChartOutlined } from "@ant-design/icons";
import { CircleQuestionMark, Cog, Factory, Users } from "lucide-react";
import { Protected } from "@/components/auth/protected-route";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = [
    {
      key: "/project-owner/dashboard",
      icon: <PieChartOutlined />,
      label: <Link href="/project-owner/dashboard">Dashboard</Link>,
    },
    {
      key: "/project-owner/company",
      icon: <Factory />,
      label: <Link href="/project-owner/company">Company</Link>,
    },
    {
      key: "/project-owner/factory",
      icon: <Factory />,
      label: <Link href="/project-owner/factory">Factory</Link>,
    },
    {
      key: "/project-owner/manager",
      icon: <Factory />,
      label: <Link href="/project-owner/manager">Manager</Link>,
    },

    {
      key: "/project-owner/user-management",

      icon: <Users />,
      label: "User Management",
      children: [
        {
          key: "/project-owner/user-management/employee",
          label: (
            <Link href="/project-owner/user-management/employee">Employee</Link>
          ),
        },
        {
          key: "/project-owner/user-management/salesman",
          label: (
            <Link href="/project-owner/user-management/salesman">Salesman</Link>
          ),
        },
      ],
    },
  ];

  return (
    <Protected roles="PROJECT_OWNER">
      <LayoutContainer
        Sidebar={Sidebar}
        HeaderBar={<HeaderBar role="admin" />}
        menuItems={menuItems}
      >
        {children}
      </LayoutContainer>
    </Protected>
  );
}

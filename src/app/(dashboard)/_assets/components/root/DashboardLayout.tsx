"use client";
import LayoutContainer from "@/components/layout/LayoutContainer";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";

import Link from "next/link";
import { PieChartOutlined } from "@ant-design/icons";
import { CircleQuestionMark, Cog, Factory } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = [
    {
      key: "/dashboard",
      icon: <PieChartOutlined />,
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      key: "/factories-overview",
      icon: <Factory />,
      label: <Link href="/factories-overview">Factories Overview</Link>,
    },
    {
      key: "/settings",
      icon: <Cog />,
      label: "Settings",
      children: [
        {
          key: "/settings/general",
          label: <Link href="/settings/general">General</Link>,
        },
        {
          key: "/settings/users",
          label: <Link href="/settings/users">Users</Link>,
        },
      ],
    },
    {
      key: "/support",
      icon: <CircleQuestionMark />,
      label: <Link href="/support">Support</Link>,
    },
  ];

  return (
    <LayoutContainer
      Sidebar={Sidebar}
      HeaderBar={<HeaderBar />}
      menuItems={menuItems}
    >
      {children}
    </LayoutContainer>
  );
}

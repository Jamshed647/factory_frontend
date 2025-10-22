"use client";
import LayoutContainer from "@/components/layout/LayoutContainer";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import Link from "next/link";
import { PieChartOutlined } from "@ant-design/icons";
import { CircleQuestionMark, Cog, Factory } from "lucide-react";
import { Protected } from "@/components/auth/protected-route";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = [
    {
      key: "/admin/dashboard",
      icon: <PieChartOutlined />,
      label: <Link href="/company-owner/dashboard">Dashboard</Link>,
    },
    {
      key: "/manager",
      icon: <Factory />,
      label: <Link href="/company-owner/manager">Manager</Link>,
    },
    {
      key: "/admin/settings",
      icon: <Cog />,
      label: "Settings",
      children: [
        {
          key: "/admin/settings/general",
          label: <Link href="/admin/settings/general">General</Link>,
        },
        {
          key: "/admin/settings/users",
          label: <Link href="/admin/settings/users">Users</Link>,
        },
      ],
    },
    {
      key: "/admin/support",
      icon: <CircleQuestionMark />,
      label: <Link href="/admin/support">Support</Link>,
    },
  ];

  return (
    <Protected roles="COMPANY_OWNER">
      <LayoutContainer
        Sidebar={Sidebar}
        HeaderBar={<HeaderBar role="company-owner" />}
        menuItems={menuItems}
      >
        {children}
      </LayoutContainer>
    </Protected>
  );
}

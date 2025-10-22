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
      key: "/manager/employees",
      icon: <PieChartOutlined />,
      label: <Link href="/manager/employees">Employees</Link>,
    },
    {
      key: "/manager/salesman",
      icon: <Factory />,
      label: <Link href="/manager/salesman">Sales Man</Link>,
    },
    // {
    //   key: "/admin/settings",
    //   icon: <Cog />,
    //   label: "Settings",
    //   children: [
    //     {
    //       key: "/admin/settings/general",
    //       label: <Link href="/admin/settings/general">General</Link>,
    //     },
    //     {
    //       key: "/admin/settings/users",
    //       label: <Link href="/admin/settings/users">Users</Link>,
    //     },
    //   ],
    // },
    // {
    //   key: "/admin/support",
    //   icon: <CircleQuestionMark />,
    //   label: <Link href="/admin/support">Support</Link>,
    // },
  ];

  return (
    <Protected roles="MANAGER">
      <LayoutContainer
        Sidebar={Sidebar}
        HeaderBar={<HeaderBar role="manager" />}
        menuItems={menuItems}
      >
        {children}
      </LayoutContainer>
    </Protected>
  );
}

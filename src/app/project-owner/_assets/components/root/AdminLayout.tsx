"use client";
import LayoutContainer from "@/components/layout/LayoutContainer";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import Link from "next/link";
import { PieChartOutlined } from "@ant-design/icons";
import { Factory, Users } from "lucide-react";
import { Protected } from "@/components/auth/protected-route";
import { useLanguage } from "@/hooks/useLanguage";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useLanguage();
  const menuItems = [
    {
      key: "/project-owner/dashboard",
      icon: <PieChartOutlined />,
      label: <Link href="/project-owner/dashboard">{t.dashboard}</Link>,
    },
    {
      key: "/project-owner/company",
      icon: <Factory />,
      label: <Link href="/project-owner/company">{t.company}</Link>,
    },
    {
      key: "/project-owner/factory",
      icon: <Factory />,
      label: <Link href="/project-owner/factory">{t.factory}</Link>,
    },
    {
      key: "/project-owner/manager",
      icon: <Factory />,
      label: <Link href="/project-owner/manager">Manager</Link>,
    },

    {
      key: "/project-owner/user-management",

      icon: <Users />,
      label: t.userManagement,
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
            <Link href="/project-owner/user-management/salesman">{t.salesman}</Link>
          ),
        },
      ],
    },
  ];

  return (
    <Protected roles="PROJECT_OWNER">
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

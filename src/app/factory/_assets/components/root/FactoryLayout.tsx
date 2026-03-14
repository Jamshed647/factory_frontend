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
            key: "production",
            icon: <PackageOpen />,
            label: "উৎপাদান",
            children: [
              {
                key: "/factory/manager/production",
                label: (
                  <Link href="/factory/manager/production">{t.production}</Link>
                ),
              },
            ],
          },

          {
            key: "product",
            icon: <PackageSearch />,
            label: "পণ্য ক্রয় বিক্রয়",
            children: [
              {
                key: "/factory/manager/purchaseProduct",
                label: (
                  <Link href="/factory/manager/purchaseProduct">
                    {t.purchaseProduct}
                  </Link>
                ),
              },
              {
                key: "/factory/manager/sellProduct",
                label: (
                  <Link href="/factory/manager/sellProduct">
                    {t.sellProduct}
                  </Link>
                ),
              },
              {
                key: "/factory/purchase",
                label: <Link href="/factory/purchase">{t.purchase}</Link>,
              },
              {
                key: "/factory/sell",
                label: <Link href="/factory/sell">{t.sell}</Link>,
              },
            ],
          },

          {
            key: "customerSupplier",
            icon: <Factory />,
            label: "কাস্টমার - সাপ্লায়ার",
            children: [
              {
                key: "/factory/customer",
                label: <Link href="/factory/customer">{t.customer}</Link>,
              },
              {
                key: "/factory/supplier",
                label: <Link href="/factory/supplier">{t.supplier}</Link>,
              },
            ],
          },

          {
            key: "users",
            icon: <Factory />,
            label: "ব্যবহারকারী",
            children: [
              {
                key: "/factory/manager/managerList",
                label: (
                  <Link href="/factory/manager/managerList">
                    {t.managerList}
                  </Link>
                ),
              },
              {
                key: "/factory/manager/employee",
                label: (
                  <Link href="/factory/manager/employee">{t.employees}</Link>
                ),
              },
              {
                key: "/factory/manager/salesman",
                label: (
                  <Link href="/factory/manager/salesman">{t.salesman}</Link>
                ),
              },
            ],
          },
        ] as AntdMenuItem[])
      : []),
    {
      key: "reports",
      icon: <PieChartOutlined />,
      label: "রিপোর্ট",
      children: [
        {
          key: "/factory/report/purchase",
          label: <Link href="/factory/report/purchase">ক্রয় রিপোর্ট</Link>,
        },
        {
          key: "/factory/report/sell",
          label: <Link href="/factory/report/sell">বিক্রয় রিপোর্ট</Link>,
        },
        {
          key: "/factory/report/expense",
          label: <Link href="/factory/report/expense">ব্যয় রিপোর্ট</Link>,
        },
        {
          key: "/factory/report/factory",
          label: <Link href="/factory/report/factory">ফ্যাক্টরি রিপোর্ট</Link>,
        },
      ],
    },

    {
      key: "accounts",
      icon: <BanknoteX />,
      label: "হিসাব খাতা",
      children: [
        {
          key: "/factory/accounting",
          label: <Link href="/factory/accounting">{t.accounting}</Link>,
        },
        {
          key: "/factory/bank",
          label: <Link href="/factory/bank">{t.bank}</Link>,
        },
        {
          key: "/factory/cash",
          label: <Link href="/factory/cash">{t.cash}</Link>,
        },
        {
          key: "/factory/expense",
          label: <Link href="/factory/expense">{t.expense}</Link>,
        },
      ],
    },

    ...(role === "EMPLOYEE"
      ? ([
          {
            key: "employee",
            icon: <PieChartOutlined />,
            label: "কর্মচারী",
            children: [
              {
                key: "/factory/employee/dashboard",
                label: (
                  <Link href="/factory/employee/dashboard">{t.dashboard}</Link>
                ),
              },
              {
                key: "/factory/employee/work",
                label: (
                  <Link href="/factory/employee/work">{t.employeeWork}</Link>
                ),
              },
            ],
          },
        ] as AntdMenuItem[])
      : []),

    ...(role === "SALESMAN"
      ? ([
          {
            key: "salesman",
            icon: <PieChartOutlined />,
            label: "বিক্রয় কর্মী",
            children: [
              {
                key: "/factory/salesman/dashboard",
                label: (
                  <Link href="/factory/salesman/dashboard">{t.dashboard}</Link>
                ),
              },
              {
                key: "/factory/salesman/work",
                label: (
                  <Link href="/factory/salesman/work">{t.salesmanWork}</Link>
                ),
              },
            ],
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

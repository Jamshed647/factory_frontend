"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PieChartOutlined } from "@ant-design/icons";
import { Menu, Button } from "antd";
import {
  CircleChevronRight,
  CircleQuestionMark,
  Cog,
  Factory,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  // TODO: Remove Hardcoded Paths & Items
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
    <div
      style={{
        height: "100%",
        background: "#ffffff",
        color: "#0a192f",
        borderRadius: 8,
        paddingTop: 5,
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.25)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ==== Collapse / Expand Button ==== */}
      <div style={{ margin: "0 auto" }}>
        <Button
          type="text"
          onClick={onToggle}
          shape="circle"
          icon={
            <CircleChevronRight
              size={26}
              color="#0a192f"
              className={`transition-transform duration-200 ${
                !collapsed ? "rotate-180" : ""
              }`}
            />
          }
        />
      </div>

      {/* ==== Sidebar Menu ==== */}
      <div style={{ flex: 1, overflowY: "auto", paddingTop: 10 }}>
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          style={{
            background: "transparent",
            borderRight: 0,
          }}
        />
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Menu, Button } from "antd";
import { CircleChevronRight, LogOut } from "lucide-react";
import ActionButton from "../common/button/actionButton";

interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label: React.ReactNode;
  children?: MenuItem[];
}

interface SidebarProps {
  menuItems: MenuItem[];
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({
  menuItems,
  collapsed,
  onToggle,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      style={{
        height: "100%",
        background: "#fff",
        color: "#0a192f",
        borderRadius: 8,
        boxShadow: "0 0 20px rgba(0,0,0,0.25)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: 5,
      }}
    >
      {/* ==== Top Section ==== */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Collapse / Expand Button */}
        <div style={{ margin: "0 auto" }}>
          <Button
            type="text"
            onClick={onToggle}
            shape="circle"
            icon={
              <CircleChevronRight
                size={26}
                color="#0a192f"
                className={`transition-transform duration-200 ${!collapsed ? "rotate-180" : ""}`}
              />
            }
          />
        </div>

        {/* Menu */}
        <div style={{ flex: 1, overflowY: "auto", paddingTop: 10 }}>
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            items={menuItems.map((item) => ({
              key: item.key,
              icon: item.icon,
              label: item.label,
              children: item.children?.map((child) => ({
                key: child.key,
                label: child.label,
              })),
            }))}
            style={{
              background: "transparent",
              borderRight: 0,
              paddingInline: 8,
            }}
          />
        </div>
      </div>

      {/* ==== Bottom Section (Logout Button) ==== */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <ActionButton
          icon={<LogOut size={18} />}
          buttonContent={collapsed ? "" : "Logout"}
          tooltipContent={!collapsed ? "" : "Logout"}
          variant="ghost"
        />
      </div>
    </div>
  );
}

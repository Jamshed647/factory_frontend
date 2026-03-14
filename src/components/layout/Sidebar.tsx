"use client";

import React, { useState, useEffect } from "react";
import { Menu, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/hooks";
import SignOutConfirmation from "./SignOutDialog";
import type { MenuProps } from "antd";

export interface SidebarMenuItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: SidebarMenuItem[];
}

interface SidebarProps {
  menuItems: SidebarMenuItem[];
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({
  menuItems,
  collapsed,
  onToggle,
}: SidebarProps) {
  const { isLoading } = useAuth();
  const pathname = usePathname();

  // --- Helpers ---
  const findActiveKey = (items: SidebarMenuItem[]): string | null => {
    const path = pathname.split("?")[0];
    for (const item of items) {
      if (path === item.key || path.startsWith(item.key + "/")) return item.key;
      if (item.children) {
        const childKey = findActiveKey(item.children);
        if (childKey) return childKey;
      }
    }
    return null;
  };

  const findOpenKey = (
    items: SidebarMenuItem[],
    activeKey: string,
  ): string | undefined => {
    for (const item of items) {
      if (item.children?.some((child) => child.key === activeKey))
        return item.key;
      if (item.children) {
        const openChild = findOpenKey(item.children, activeKey);
        if (openChild) return item.key;
      }
    }
    return undefined;
  };

  const selectedKey = findActiveKey(menuItems);
  const initialOpenKey = selectedKey
    ? findOpenKey(menuItems, selectedKey)
    : undefined;

  // --- State for open submenu ---
  const [openKeys, setOpenKeys] = useState<string[]>(
    initialOpenKey ? [initialOpenKey] : [],
  );

  // Update openKeys when pathname changes
  useEffect(() => {
    if (selectedKey) {
      const newOpenKey = findOpenKey(menuItems, selectedKey);
      setOpenKeys(newOpenKey ? [newOpenKey] : []);
    }
  }, [pathname]);

  // Map custom type to Ant Design Menu type
  const mapMenuItems = (items: SidebarMenuItem[]): MenuProps["items"] =>
    items.map((item) => ({
      key: item.key,
      label: item.label,
      icon: item.icon,
      children: item.children ? mapMenuItems(item.children) : undefined,
    }));

  const antdMenuItems = mapMenuItems(menuItems);

  if (isLoading) {
    return (
      <div className="flex flex-col h-full border-r">
        <div className="p-4 h-10 bg-gray-200 rounded border-b animate-pulse" />
        <div className="overflow-auto flex-1 p-2 space-y-1">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex gap-3 items-center p-3">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: 16, borderBottom: "1px solid #f0f0f0" }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ flex: 1, overflow: "hidden" }}>
        <Menu
          mode="inline"
          items={antdMenuItems}
          selectedKeys={selectedKey ? [selectedKey] : []}
          openKeys={openKeys}
          onOpenChange={(keys) => setOpenKeys(keys as string[])} // allow user to open/close submenus
          style={{
            border: "none",
            background: "transparent",
            height: "100%",
            overflow: "auto",
          }}
        />
      </div>

      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <SignOutConfirmation collapsed={collapsed} />
      </div>
    </div>
  );
}

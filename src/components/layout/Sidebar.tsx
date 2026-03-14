/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Menu, Button, Drawer } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/hooks";
import SignOutConfirmation from "./SignOutDialog";
import { useEffect } from "react";

interface SidebarProps {
  menuItems: any[];
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
  isDesktop?: boolean;
}

export default function Sidebar({
  menuItems,
  collapsed,
  onToggle,
  mobileOpen,
  setMobileOpen,
  isDesktop = false,
}: SidebarProps) {
  const pathname = usePathname();
  const { isLoading } = useAuth();

  const getSelectedKey = () => {
    const cleanPath = pathname.split("?")[0];
    for (const item of menuItems) {
      if (cleanPath === item.key || cleanPath.startsWith(item.key + "/"))
        return item.key;
      if (
        item.children?.some(
          (c: any) => cleanPath === c.key || cleanPath.startsWith(c.key + "/"),
        )
      )
        return item.children.find(
          (c: any) => cleanPath === c.key || cleanPath.startsWith(c.key + "/"),
        )?.key;
    }
    return null;
  };

  const selectedKey = getSelectedKey();

  const getOpenKey = () => {
    if (!selectedKey) return undefined;
    for (const item of menuItems) {
      if (item.children?.some((c: any) => c.key === selectedKey))
        return item.key;
    }
    return undefined;
  };

  const openKey = getOpenKey();

  const menuJSX = (
    <Menu
      items={menuItems}
      selectedKeys={selectedKey ? [selectedKey] : []}
      defaultOpenKeys={openKey ? [openKey] : []}
      mode="inline"
      style={{
        border: "none",
        background: "transparent",
        height: "100%",
        overflow: "auto",
      }}
      onClick={() => {
        if (!isDesktop && setMobileOpen) {
          setMobileOpen(false);
        }
      }}
    />
  );

  // Close drawer on route change
  useEffect(() => {
    if (!isDesktop && mobileOpen && setMobileOpen) {
      setMobileOpen(false);
    }
  }, [pathname, isDesktop]);

  if (isLoading) {
    return (
      <div className="flex flex-col h-full border-r">
        <div className="p-4 border-b">
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
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

  // Drawer View (for tablets and mobile)
  if (!isDesktop && mobileOpen !== undefined && setMobileOpen) {
    return (
      <Drawer
        placement="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        width={220}
        styles={{ body: { padding: 0, overflow: "hidden" } }}
        closable={false}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ padding: "16px", borderBottom: "1px solid #f0f0f0" }}>
            <Button
              type="text"
              icon={<MenuFoldOutlined />}
              onClick={() => setMobileOpen(false)}
              style={{ width: "100%" }}
            >
              Close Menu
            </Button>
          </div>

          <div style={{ flex: 1, overflow: "auto" }}>{menuJSX}</div>

          <div
            style={{
              padding: "12px 16px",
              borderTop: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <SignOutConfirmation collapsed={false} />
          </div>
        </div>
      </Drawer>
    );
  }

  // Desktop Sidebar View
  if (isDesktop) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div
          style={{ padding: "16px 12px", borderBottom: "1px solid #f0f0f0" }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={onToggle}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ flex: 1, overflow: "hidden" }}>{menuJSX}</div>

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

  // Return null if no condition matches (shouldn't happen)
  return null;
}

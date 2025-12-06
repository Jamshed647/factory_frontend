/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Menu, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/hooks";

interface SidebarProps {
  menuItems: any[];
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({
  menuItems,
  collapsed,
  onToggle,
}: SidebarProps) {
  const pathname = usePathname();

  const { isLoading } = useAuth();

  // This handles nested paths and query parameters
  // Examples: /factory/bank?page=1 -> /factory/bank, /factory/cash/yuidsoc5 -> /factory/cash
  const getActiveKey = () => {
    const parts = pathname.split("/");

    // For paths like /factory/bank, /factory/cash, /factory/employee/dashboard
    if (parts.length >= 3) {
      // Check if this matches any menu item key exactly
      const exactMatch = menuItems.find((item) => item.key === pathname);
      if (exactMatch) return pathname;

      // Try to match the first two segments (e.g., /factory/bank from /factory/bank?page=1)
      const basePath = `/${parts[1]}/${parts[2]}`;
      const baseMatch = menuItems.find((item) => item.key === basePath);
      if (baseMatch) return basePath;

      // For deeper paths, try matching just the first three segments
      // This handles cases like /factory/cash/yuidsoc5 matching /factory/cash
      if (parts.length > 3) {
        // Try three-segment paths first
        for (let i = 3; i < parts.length; i++) {
          const partialPath = `/${parts[1]}/${parts[2]}`;
          const match = menuItems.find((item) => item.key === partialPath);
          if (match) return partialPath;
          break;
        }
      }
    }

    return null;
  };

  const selectedKey = getActiveKey();

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col h-full border-r">
          {/* Toggle button skeleton */}
          <div className="p-4 border-b">
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Menu items skeleton */}
          <div className="overflow-auto flex-1 p-2 space-y-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex gap-3 items-center p-3">
                <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          {/* Collapse Toggle Button */}
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

          {/* Menu - scrollable content */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            <Menu
              items={menuItems}
              selectedKeys={selectedKey ? [selectedKey] : []}
              mode="inline"
              style={{
                border: "none",
                background: "transparent",
                height: "100%",
                overflow: "auto",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

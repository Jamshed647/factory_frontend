/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Layout, Grid, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

const { Sider, Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

interface LayoutContainerProps {
  Sidebar: React.ComponentType<any>;
  HeaderBar?: React.ReactNode;
  menuItems: any[];
  children: React.ReactNode;
}

export default function LayoutContainer({
  Sidebar,
  HeaderBar,
  menuItems,
  children,
}: LayoutContainerProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const screens = useBreakpoint();

  // Show sidebar on lg (large) devices and above (992px and above)
  // Use drawer for md (medium) and below (768px and below)
  const showDesktopSidebar = screens.lg;
  const sidebarWidth = collapsed ? 80 : 250;

  useEffect(() => {
    if (showDesktopSidebar && mobileOpen) {
      setMobileOpen(false);
    }
  }, [showDesktopSidebar, mobileOpen]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header */}
      {HeaderBar && (
        <Header
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 64,
            padding: 0,
            background: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            {!showDesktopSidebar && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setMobileOpen(true)}
                style={{
                  fontSize: "18px",
                  marginLeft: "16px",
                  marginRight: "8px",
                }}
              />
            )}
            <div style={{ flex: 1 }}>{HeaderBar}</div>
          </div>
        </Header>
      )}

      {/* Desktop Sidebar - Only show on large screens */}
      {showDesktopSidebar && (
        <Sider
          collapsible
          trigger={null}
          collapsed={collapsed}
          width={sidebarWidth}
          style={{
            background: "#fff",
            position: "fixed",
            top: 64,
            bottom: 0,
            left: 0,
            overflowY: "auto",
            transition: "all 0.3s",
            borderRight: "1px solid #f0f0f0",
            zIndex: 999,
          }}
        >
          <Sidebar
            menuItems={menuItems}
            collapsed={collapsed}
            onToggle={() => setCollapsed(!collapsed)}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            isDesktop={true}
          />
        </Sider>
      )}

      {/* Mobile Sidebar (Drawer) - Only show on medium and below */}
      {!showDesktopSidebar && (
        <Sidebar
          menuItems={menuItems}
          collapsed={false}
          onToggle={() => {}}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          isDesktop={false}
        />
      )}

      {/* Main Content */}
      <Layout
        style={{
          marginLeft: showDesktopSidebar ? (collapsed ? 80 : sidebarWidth) : 0,
          marginTop: 64,
          minHeight: "100vh",
          transition: "margin-left 0.2s",
        }}
      >
        <Content
          style={{
            padding: 24,
            minHeight: "calc(100vh - 64px)",
            overflowY: "auto",
          }}
        >
          {children}
        </Content>

        <Footer
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "#888",
            padding: "12px 16px",
          }}
        >
          © {new Date().getFullYear()} Ant Design Layout Example
        </Footer>
      </Layout>
    </Layout>
  );
}

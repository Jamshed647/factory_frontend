"use client";

import { Layout } from "antd";
import React, { useState } from "react";

const { Sider, Header, Content, Footer } = Layout;

// Menu item type
interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label: React.ReactNode;
  children?: MenuItem[];
}

// Layout container props
interface LayoutContainerProps {
  children: React.ReactNode;
  Sidebar: React.ComponentType<{
    collapsed: boolean;
    onToggle: () => void;
    menuItems: MenuItem[];
  }>;
  HeaderBar?: React.ReactNode;
  menuItems: MenuItem[];
}

function LayoutContainer({
  children,
  Sidebar,
  HeaderBar,
  menuItems,
}: LayoutContainerProps) {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 110 : 200;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        collapsible
        trigger={null}
        collapsed={collapsed}
        width={sidebarWidth}
        style={{
          background: "#fff",
          position: "fixed",
          top: 80,
          bottom: 20,
          left: 16,
          borderRadius: 8,
          overflow: "hidden",
          transition: "all 0.3s ease",
        }}
      >
        <Sidebar
          menuItems={menuItems}
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
      </Sider>

      {/* Main Layout */}
      <Layout
        style={{
          marginLeft: sidebarWidth + (!collapsed ? 40 : 10),
          transition: "margin-left 0.2s",
          minHeight: "100vh",
          overflow: "auto",
        }}
      >
        {HeaderBar && (
          <Header
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 100,
              background: "#fff",
              height: 64,
              paddingInline: 16,
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            }}
          >
            {HeaderBar}
          </Header>
        )}

        <Content
          style={{
            marginTop: HeaderBar ? 80 : 16,
            marginRight: 10,
            marginBottom: 40,
            background: "#fff",
            borderRadius: 8,
            padding: 24,
            minHeight: `calc(100vh - ${HeaderBar ? 80 : 16}px - 40px)`, // header + footer
            overflow: "auto",
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

export default LayoutContainer;

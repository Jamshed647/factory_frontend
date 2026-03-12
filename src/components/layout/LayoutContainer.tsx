/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Layout } from "antd";
import React, { useState } from "react";

const { Sider, Header, Content, Footer } = Layout;

// Menu item type

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
  const sidebarWidth = collapsed ? 80 : 250;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header - Full Width */}
      {HeaderBar && (
        <Header
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 64,
            padding: "0 16px",
            background: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            zIndex: 100,
          }}
        >
          {HeaderBar}
        </Header>
      )}

      {/* Sidebar */}
      <Sider
        collapsible
        trigger={null}
        collapsed={collapsed}
        width={sidebarWidth}
        style={{
          background: "#fff",
          position: "fixed",
          top: 64, // start under the header
          bottom: 0,
          left: 0,
          overflowY: "auto",
          transition: "all 0.3s",
          borderRight: "1px solid #f0f0f0",
        }}
      >
        <Sidebar
          menuItems={menuItems}
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
      </Sider>

      {/* Main Content */}
      <Layout
        style={{
          marginLeft: collapsed ? 80 : sidebarWidth, // adjust if sidebar collapsed
          marginTop: 64, // leave space for header
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

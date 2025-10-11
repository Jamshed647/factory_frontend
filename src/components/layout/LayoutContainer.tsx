"use client";

import { Layout } from "antd";
import { useState } from "react";
import Sidebar from "./Sidebar";
import HeaderBar from "./HeaderBar";

const { Sider, Header, Content, Footer } = Layout;

export default function LayoutContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* ===== Sidebar ===== */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={220}
        style={{
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
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
      </Sider>

      {/* ===== Main Layout ===== */}
      <Layout
        style={{
          marginLeft: collapsed ? 110 : 250,
          transition: "margin-left 0.2s ease-in-out",
        }}
      >
        {/* Fixed Header */}
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
          <HeaderBar />
        </Header>

        {/* Scrollable Content */}
        <Content
          style={{
            marginTop: 80,
            marginRight: 16,
            marginBottom: 40,
            background: "#fff",
            borderRadius: 8,
            padding: 24,
            overflow: "auto",
            minHeight: "calc(100vh - 120px)",
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

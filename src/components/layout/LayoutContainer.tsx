"use client";

import { Layout } from "antd";
import { useState } from "react";

const { Sider, Header, Content, Footer } = Layout;

export default function LayoutContainer({
  sidebar,
  header,
  children,
}: {
  sidebar: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        collapsedWidth="70"
        style={{
          background: "#001529",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        {sidebar}
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Fixed Header */}
        {header && (
          <Header
            style={{
              background: "#fff",
              padding: 0,
              position: "fixed",
              top: 0,
              right: 0,
              left: collapsed ? 80 : 200,
              zIndex: 100,
              height: 64,
              transition: "left 0.2s ease-in-out",
            }}
          >
            {header}
          </Header>
        )}

        {/* Scrollable Content under Header */}
        <Content
          style={{
            margin: "80px 16px 0 16px",
            transition: "margin-left 0.2s ease-in-out",
            background: "#fff",
            borderRadius: 8,
            padding: 24,
            minHeight: "calc(100vh - 120px)",
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
            marginLeft: collapsed ? 80 : 200,
            transition: "margin-left 0.2s ease-in-out",
          }}
        >
          © {new Date().getFullYear()} Ant Design Layout Example
        </Footer>
      </Layout>
    </Layout>
  );
}

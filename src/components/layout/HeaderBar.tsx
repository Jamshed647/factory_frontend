"use client";

import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

export default function HeaderBar() {
  return (
    <div
      style={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        borderBottom: "1px solid #f0f0f0",
        background: "#fff",
        position: "relative",
        zIndex: 101,
      }}
    >
      <h2 style={{ margin: 0, fontSize: 18 }}>Dashboard</h2>
      <Button type="text" icon={<MenuOutlined />} />
    </div>
  );
}

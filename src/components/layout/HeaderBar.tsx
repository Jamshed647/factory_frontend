"use client";

import { Button } from "antd";
import { Bell, CircleUserRound } from "lucide-react";

export default function HeaderBar() {
  return (
    <div
      style={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 4px",
        background: "#fff",
        position: "relative",
        zIndex: 101,
      }}
    >
      <h2 style={{ margin: 0, fontSize: 18 }}>Jangosoft</h2>

      <div className="flex gap-3">
        <Button type="text" icon={<Bell />} />

        <Button type="text" icon={<CircleUserRound />} />
      </div>
    </div>
  );
}

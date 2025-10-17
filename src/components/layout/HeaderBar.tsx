"use client";
import { Bell, CircleUserRound } from "lucide-react";
import Link from "next/link";
import ActionButton from "../common/button/actionButton";

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
      }}
    >
      <Link href="/">
        <h2 style={{ margin: 0, fontSize: 18 }}>Jangosoft</h2>
      </Link>

      <div className="flex gap-3">
        <ActionButton icon={<Bell />} tooltipContent="Notifications" />

        <ActionButton icon={<CircleUserRound />} />
      </div>
    </div>
  );
}

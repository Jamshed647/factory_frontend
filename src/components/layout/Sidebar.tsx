// components/layout/Sidebar.tsx
"use client";

import { Menu } from "antd";
import type { MenuProps } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons";
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return { key, icon, children, label } as MenuItem;
}

const menuItemsByRole: Record<string, MenuItem[]> = {
  admin: [
    getItem(
      <Link href="/dashboard">Dashboard</Link>,
      "1",
      <DashboardOutlined />,
    ),
    getItem("Users", "sub1", <UserOutlined />, [
      getItem(<Link href="/dashboard/users/tom">Tom</Link>, "3"),
      getItem(<Link href="/dashboard/users/bill">Bill</Link>, "4"),
    ]),
    getItem("Teams", "sub2", <TeamOutlined />, [
      getItem(<Link href="/dashboard/team/1">Team 1</Link>, "6"),
      getItem(<Link href="/dashboard/team/2">Team 2</Link>, "8"),
    ]),
    getItem("Files", "9", <FileOutlined />),
  ],
  agent: [
    getItem(
      <Link href="/agent">Agent Dashboard</Link>,
      "1",
      <DashboardOutlined />,
    ),
  ],
  user: [
    getItem(<Link href="/user/profile">Profile</Link>, "1", <UserOutlined />),
  ],
};

export default function Sidebar({
  role,
}: {
  role: keyof typeof menuItemsByRole;
}) {
  const items = menuItemsByRole[role] || menuItemsByRole.user;
  return (
    <div>
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 600,
          letterSpacing: 1,
          fontSize: 18,
        }}
      >
        {role.toUpperCase()}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
      />
    </div>
  );
}

"use client";

import { Protected } from "@/components/auth/protected-route";
import { useAuth, usePermission } from "@/hooks/hooks";

export default function AdminPage() {
  const { user, logout } = useAuth();
  const { isAdmin } = usePermission();

  return (
    <Protected roles={["ADMIN"]}>
      <h1>Admin Dashboard</h1>
      <p>Welcome {user?.name}</p>
      {isAdmin() && <button>Admin Only Action</button>}
      <button onClick={() => logout()}>Logout</button>
    </Protected>
  );
}

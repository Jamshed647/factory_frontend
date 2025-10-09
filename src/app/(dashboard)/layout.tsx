// app/(dashboard)/layout.tsx
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import { getUserRole } from "@/lib/auth";
import LayoutContainer from "@/components/layout/LayoutContainer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await getUserRole(); // e.g. "admin", "agent", "user"

  return (
    <LayoutContainer sidebar={<Sidebar role={role} />} header={<HeaderBar />}>
      {children}
    </LayoutContainer>
  );
}

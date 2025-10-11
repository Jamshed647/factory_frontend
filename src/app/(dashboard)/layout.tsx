import LayoutContainer from "@/components/layout/LayoutContainer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutContainer>{children}</LayoutContainer>;
}

import SidebarProvider from "@/providers/sidebar-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SidebarProvider>{children}</SidebarProvider>;
}

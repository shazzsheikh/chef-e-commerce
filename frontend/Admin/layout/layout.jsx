import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebar";
import Header from "./header";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="w-full">
        <SidebarTrigger />
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
}

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebar";
import Header from "./header";
import { AdminProvider } from "../admincontextapi/productfetch";

export default function Layout({ children }) {
  return (
    <AdminProvider>
      <SidebarProvider>
        <AppSidebar />

        <main className="w-full">
          <SidebarTrigger />
          <Header />
          {children}
        </main>
      </SidebarProvider>
    </AdminProvider>
  );
}

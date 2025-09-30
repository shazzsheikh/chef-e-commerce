import {
  Calendar,
  Home,
  BaggageClaim,
  Search,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router-dom";

export function AppSidebar() {
  const navigate = useNavigate(); // ✅ now inside component

  const handleLogout = () => {
    localStorage.removeItem("admintoken");
    navigate("/");
  };

  const items = [
    {
      title: "Dashboard",
      url: "/admin/home",
      icon: Home,
    },
    {
      title: "products",
      url: "/admin/products",
      icon: BaggageClaim,
    },
    {
      title: "orders",
      url: "/admin/orders",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      title: "Logout",
      url: "#",
      icon: LogOut,
      onClick: handleLogout,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      onClick={(e) => {
                        if (item.onClick) {
                          e.preventDefault(); // 🔒 prevent default if logout
                          item.onClick();
                        }
                      }}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

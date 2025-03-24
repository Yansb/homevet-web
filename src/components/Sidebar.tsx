import { Calendar, Dog, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "./ui/sidebar";
import { useStores } from "@/store";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router";

const items = [
  {
    title: "Minha Area",
    buttons: [
      {
        title: "Inicio",
        icon: Home,
        url: "/home",
      },
      {
        title: "Agendamentos",
        icon: Calendar,
        url: "/agendamentos",
      },
      {
        title: "Perfil",
        icon: Dog,
        url: "/perfil",
      },
    ],
  },
];

export function AppSidebar() {
  const {
    authStore: { user },
  } = useStores();

  return (
    <Sidebar variant="sidebar">
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        {items.map((group) => (
          <SidebarGroup key={group.title} title={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.buttons.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={user?.photoURL ?? ""} />
            <AvatarFallback>{user?.displayName?.at(0) ?? "D"}</AvatarFallback>
          </Avatar>
          <span>{user?.displayName}</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

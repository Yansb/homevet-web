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
import { Link } from "react-router";
import { SidebarDropdownMenu } from "./SidebarMenu";

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
        <SidebarDropdownMenu />
      </SidebarFooter>
    </Sidebar>
  );
}

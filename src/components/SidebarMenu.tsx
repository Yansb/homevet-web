import { ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { useStores } from "@/store";
import { DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { useNavigate } from "react-router";

export function SidebarDropdownMenu() {
  const {
    authStore: { user, logout },
  } = useStores();
  const navigate = useNavigate();

  const splittedUserName = user?.displayName?.split(" ") ?? [""];
  const fallBackName =
    splittedUserName[0][0] + splittedUserName[splittedUserName.length - 1][0];
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user?.photoURL ?? ""}
                  alt={user?.displayName ?? ""}
                />
                <AvatarFallback className="rounded-lg">
                  {fallBackName}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user?.displayName}
                </span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side="right"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={async () => {
                await logout();
                navigate("/login");
              }}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

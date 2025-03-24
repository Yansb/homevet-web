import React from "react";
import { isMobile } from "react-device-detect";
import { Footer } from "../Footer";
import { SidebarProvider, SidebarTrigger, useSidebar } from "../ui/sidebar";
import { AppSidebar } from "../Sidebar";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

function ChildrenWithSidebar({ children }: AuthenticatedLayoutProps) {
  const { open } = useSidebar();
  return (
    <div className="flex flex-grow flex-col">
      <AppSidebar />
      {!open && <SidebarTrigger />}

      <div className="flex-grow overflow-auto">{children}</div>
      {isMobile && <Footer />}
    </div>
  );
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <div className="flex max-h-screen flex-col">
      <SidebarProvider>
        <ChildrenWithSidebar>{children}</ChildrenWithSidebar>
      </SidebarProvider>
    </div>
  );
}

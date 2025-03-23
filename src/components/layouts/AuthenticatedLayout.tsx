import React from "react";
import { isMobile } from "react-device-detect";
import { Footer } from "../Footer";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <div className="flex max-h-screen flex-col">
      <div className="flex-grow overflow-auto">{children}</div>
      {isMobile && <Footer />}
    </div>
  );
}

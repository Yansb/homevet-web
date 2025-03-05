import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

interface ProtectedRoutesProps {
  children?: ReactNode;
}

export function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children ? <>{children}</> : <Outlet />;
}

import { useStores } from "@/store";
import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRoutesProps {
  children?: ReactNode;
}

export function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const {
    authStore: { user },
  } = useStores();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

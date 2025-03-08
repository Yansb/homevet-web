import { AuthenticatedLayout } from "@/components/AuthenticatedLayout";
import { ProtectedRoutes } from "@/components/utils/ProtectedRoutes";
import { LoginPage } from "@/modules/auth/page";
import { HomePage } from "@/modules/home/page";
import { SignUpPage } from "@/modules/signup/page";
import { BrowserRouter, Route, Routes } from "react-router";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<SignUpPage />} />

        <Route
          element={
            <AuthenticatedLayout>
              <ProtectedRoutes />
            </AuthenticatedLayout>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

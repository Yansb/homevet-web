import { ProtectedRoutes } from "@/router/ProtectedRoutes";
import { LoginPage } from "@/modules/auth/page";
import { HomePage } from "@/modules/home/page";
import { SignUpPage } from "@/modules/signup/page";
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthenticatedLayout } from "@/components/layouts/AuthenticatedLayout";

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

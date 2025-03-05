import { LoginPage } from "@/modules/auth/page";
import { BrowserRouter, Route, Routes } from "react-router";

export function Router(){
  return <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />}/>
    </Routes>
   </BrowserRouter>
}

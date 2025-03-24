import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Home, Calendar, Dog } from "lucide-react";
export function Footer() {
  const navigate = useNavigate();

  return (
    <footer>
      <div className="flex min-h-10 items-center justify-between bg-[#FFFFFF] p-4 pb-6">
        <Button
          variant="ghost"
          className="flex-col"
          onClick={() => navigate("/")}
        >
          <Home /> Inicio
        </Button>
        <Button
          variant="ghost"
          className="flex-col"
          onClick={() => navigate("/agendamentos")}
        >
          <Calendar />
          Agendamentos
        </Button>
        <Button
          variant="ghost"
          className="flex-col"
          onClick={() => navigate("/perfil")}
        >
          <Dog />
          Perfil
        </Button>
      </div>
    </footer>
  );
}

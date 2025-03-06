import { Button } from "./ui/button";
import { Home, Calendar, Dog } from "lucide-react";
export function Footer() {
  return (
    <footer>
      <div className="flex min-h-10 items-center justify-between bg-[#FFFFFF] p-4 pb-6">
        <Button variant="ghost" className="flex-col">
          <Home /> Inicio
        </Button>
        <Button variant="ghost" className="flex-col">
          <Calendar />
          Agendamentos
        </Button>
        <Button variant="ghost" className="flex-col">
          <Dog />
          Perfil
        </Button>
      </div>
    </footer>
  );
}

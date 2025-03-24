import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createDoctor, createDoctorDTO } from "./services/doctorService";

export function useDoctors() {
  const createDoctorMutation = useMutation({
    mutationFn: (data: createDoctorDTO) => createDoctor(data),
    onSuccess: () => {
      toast.success("Conta criada com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao criar conta. Tente novamente.");
      console.error("Error creating user:", error);
    },
  });

  return { createDoctorMutation };
}
